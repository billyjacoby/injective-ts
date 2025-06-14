import { Wallet } from './../types/enums.js'

export const isEvmWallet = (wallet: Wallet): boolean =>
  [
    Wallet.Magic,
    Wallet.BitGet,
    Wallet.Ledger,
    Wallet.Phantom,
    Wallet.Rainbow,
    Wallet.Turnkey,
    Wallet.Metamask,
    Wallet.OkxWallet,
    Wallet.PrivateKey,
    Wallet.TrezorBip32,
    Wallet.TrezorBip44,
    Wallet.TrustWallet,
    Wallet.LedgerLegacy,
    Wallet.WalletConnect,
    Wallet.CosmostationEth,
  ].includes(wallet)

export const isCosmosWallet = (wallet: Wallet): boolean => !isEvmWallet(wallet)

export const isEvmBrowserWallet = (wallet: Wallet) =>
  [
    Wallet.BitGet,
    Wallet.Rainbow,
    Wallet.Phantom,
    Wallet.Turnkey,
    Wallet.Metamask,
    Wallet.OkxWallet,
    Wallet.TrustWallet,
  ].includes(wallet)

export const isCosmosBrowserWallet = (wallet: Wallet): boolean =>
  [
    Wallet.Leap,
    Wallet.Ninji,
    Wallet.Keplr,
    Wallet.OWallet,
    Wallet.Cosmostation,
  ].includes(wallet)

export const isEip712V2OnlyWallet = (wallet: Wallet): boolean =>
  [
    Wallet.Magic,
    Wallet.Metamask,
    Wallet.Phantom,
    Wallet.WalletConnect,
  ].includes(wallet)

export const isCosmosAminoOnlyWallet = (wallet: Wallet): boolean =>
  [Wallet.LedgerCosmos].includes(wallet)
