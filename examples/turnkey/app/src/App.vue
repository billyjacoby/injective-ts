<script setup lang="ts">
import { BaseWalletStrategy, MsgBroadcaster } from '@injectivelabs/wallet-core'
import {
  TurnkeyWallet,
  TurnkeyWalletStrategy,
} from '@injectivelabs/wallet-turnkey/src/index.ts'
import { injectiveClients } from './injective-clients'
import { computed, onMounted, watch } from 'vue'
import { Wallet } from '@injectivelabs/wallet-base'
import LoginForm from './components/LoginForm.vue'
import Connected from './components/Connected.vue'
import {
  turnkeyStatus,
  turnkeyStrategy,
  address,
  broadcaster,
  oidcToken,
} from './reactives'
import { exchangeCodeForIdToken } from './utils'

const turnkeyAuthIframeContainerId = 'turnkey-auth-iframe-container-id'
const turnkeyReadyAndLoggedIn = computed(() => {
  return turnkeyStatus.value === 'logged-in' && turnkeyStrategy.value
})

onMounted(async () => {
  const _turnkeyStrategy = new TurnkeyWallet({
    onStatusChange(status) {
      turnkeyStatus.value = status
    },
    chainId: injectiveClients.chainId,
    ethereumOptions: {
      ethereumChainId: injectiveClients.ethereumChainId!,
    },
    metadata: {
      turnkeyAuthIframeContainerId,
      defaultOrganizationId: import.meta.env
        .VITE_TURNKEY_DEFAULT_ORGANIZATION_ID,
      apiBaseUrl: 'https://api.turnkey.com',
    },
  })

  turnkeyStrategy.value = _turnkeyStrategy
})

onMounted(async () => {
  const searchParams = new URLSearchParams(window.location.search)
  const code = searchParams.get('code')

  if (code) {
    try {
      const idToken = await exchangeCodeForIdToken(code)
      oidcToken.value = idToken
      // Clear the code from the URL
      window.history.replaceState({}, '', window.location.pathname)
    } catch (error) {
      console.error('Failed to exchange code for token:', error)
    }
  }
})

watch(turnkeyReadyAndLoggedIn, async (_ready) => {
  if (!_ready) {
    return
  }

  const _walletStrategy = new BaseWalletStrategy({
    strategies: {
      [Wallet.Turnkey]: turnkeyStrategy.value as TurnkeyWalletStrategy,
    },
    chainId: injectiveClients.chainId,
    wallet: Wallet.Turnkey,
  })

  broadcaster.value = new MsgBroadcaster({
    network: injectiveClients.network,
    walletStrategy: _walletStrategy,
    ethereumChainId: injectiveClients.ethereumChainId!,
    endpoints: injectiveClients.endpoints,
  })

  const addresses = await _walletStrategy?.getAddresses()
  address.value = addresses[0]
})
</script>

<template>
  <h1>Injective + Turnkey</h1>
  <div v-if="turnkeyStatus === 'initializing'">Loading...</div>
  <div v-else>
    <LoginForm
      v-if="turnkeyStrategy && turnkeyStatus && turnkeyStatus !== 'logged-in'"
    />
    <Connected v-if="address && turnkeyStatus === 'logged-in'" />
  </div>
  <div :id="turnkeyAuthIframeContainerId" style="display: none"></div>
</template>

<style>
input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
