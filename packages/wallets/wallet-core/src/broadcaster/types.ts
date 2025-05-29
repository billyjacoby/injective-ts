import { Msgs } from '@injectivelabs/sdk-ts'
import { ChainId, EthereumChainId } from '@injectivelabs/ts-types'
import { Network, NetworkEndpoints } from '@injectivelabs/networks'
import BaseWalletStrategy from '../strategy/BaseWalletStrategy.js'

export interface MsgBroadcasterTxOptions {
  memo?: string
  ethereumAddress?: string
  injectiveAddress?: string
  msgs: Msgs | Msgs[]
  gas?: {
    gasPrice?: string
    gas?: number /** gas limit */
    feePayer?: string
    granter?: string
  }
}

export interface MsgBroadcasterTxOptionsWithAddresses
  extends MsgBroadcasterTxOptions {
  ethereumAddress: string
  injectiveAddress: string
}

export interface MsgBroadcasterOptions {
  network: Network
  endpoints?: NetworkEndpoints
  chainId?: ChainId
  ethereumChainId?: EthereumChainId
  feePayerPubKey?: string
  simulateTx?: boolean
  txTimeoutOnFeeDelegation?: boolean
  txTimeout?: number // blocks to wait for tx to be included in a block
  walletStrategy: BaseWalletStrategy
  gasBufferCoefficient?: number
  httpHeaders?: Record<string, string>
}

export enum WalletStrategyEmitterType {
  TransactionFail = 'transaction-fail',
  TransactionSigned = 'transaction-signed',
  DoneTelemetryToast = 'done-telemetry-toast',
  StartTelemetryToast = 'start-telemetry-toast',
  WalletStrategyDisconnect = 'wallet-strategy-disconnect',
}

export type WalletStrategyEmitterEvents = {
  [WalletStrategyEmitterType.TransactionFail]: Record<string, any>
  [WalletStrategyEmitterType.TransactionSigned]: Record<string, any>
  [WalletStrategyEmitterType.DoneTelemetryToast]: Record<string, any>
  [WalletStrategyEmitterType.StartTelemetryToast]: Record<string, any>
  [WalletStrategyEmitterType.WalletStrategyDisconnect]: Record<string, any>
}
