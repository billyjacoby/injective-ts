import { EventEmitter } from 'eventemitter3'
import {
  TxRaw,
  TxResponse,
  AminoSignResponse,
  DirectSignResponse,
} from '@injectivelabs/sdk-ts'
import {
  ChainId,
  AccountAddress,
  EthereumChainId,
} from '@injectivelabs/ts-types'
import { GeneralException, WalletException } from '@injectivelabs/exceptions'
import {
  Wallet,
  isEvmWallet,
  isCosmosWallet,
  WalletDeviceType,
  type WalletMetadata,
  ConcreteStrategiesArg,
  SendTransactionOptions,
  ConcreteWalletStrategy,
  onAccountChangeCallback,
  onChainIdChangeCallback,
  WalletStrategyArguments,
  CosmosWalletAbstraction,
  WalletStrategy as WalletStrategyInterface,
} from '@injectivelabs/wallet-base'
import { StdSignDoc } from '@keplr-wallet/types'
import {
  WalletStrategyEmitter,
  WalletStrategyEmitterEvents,
  WalletStrategyEmitterEventType,
} from '../broadcaster/types.js'

const getInitialWallet = (args: WalletStrategyArguments): Wallet => {
  if (args.wallet) {
    return args.wallet
  }

  const keys = Object.keys(args.strategies || {})

  if (keys.length === 0) {
    throw new GeneralException(
      new Error('No strategies provided to BaseWalletStrategy'),
    )
  }

  if (keys.includes(Wallet.Metamask) && args.ethereumOptions) {
    return Wallet.Metamask
  }

  if (keys.includes(Wallet.Keplr) && !args.ethereumOptions) {
    return Wallet.Keplr
  }

  return keys[0] as Wallet
}

export default class BaseWalletStrategy implements WalletStrategyInterface {
  public strategies: ConcreteStrategiesArg

  public wallet: Wallet

  public args: WalletStrategyArguments

  public metadata?: WalletMetadata

  public wallets?: Wallet[]

  private emitter: WalletStrategyEmitter
  public on: WalletStrategyEmitter['on']
  public off: WalletStrategyEmitter['off']
  public emit: WalletStrategyEmitter['emit']

  constructor(args: WalletStrategyArguments) {
    this.args = args
    this.strategies = args.strategies
    this.wallet = getInitialWallet(args)
    this.metadata = args.metadata

    this.emitter = new EventEmitter<WalletStrategyEmitterEvents>()
    this.on = this.emitter.on.bind(this.emitter)
    this.off = this.emitter.off.bind(this.emitter)
    this.emit = this.emitter.emit.bind(this.emitter)
  }

  public getWallet(): Wallet {
    return this.wallet
  }

  public setWallet(wallet: Wallet) {
    this.wallet = wallet
  }

  public setMetadata(metadata?: WalletMetadata) {
    this.metadata = metadata
    this.getStrategy().setMetadata?.(metadata)
  }

  public getStrategy(): ConcreteWalletStrategy {
    if (!this.strategies[this.wallet]) {
      throw new GeneralException(
        new Error(`Wallet ${this.wallet} is not enabled/available!`),
      )
    }

    return this.strategies[this.wallet] as ConcreteWalletStrategy
  }

  public getAddresses(args?: unknown): Promise<AccountAddress[]> {
    return this.getStrategy().getAddresses(args)
  }

  public getWalletDeviceType(): Promise<WalletDeviceType> {
    return this.getStrategy().getWalletDeviceType()
  }

  public getPubKey(address?: string): Promise<string> {
    return this.getStrategy().getPubKey(address)
  }

  public enable(args?: unknown): Promise<boolean> {
    return this.getStrategy().enable(args)
  }

  public async enableAndGetAddresses(
    args?: unknown,
  ): Promise<AccountAddress[]> {
    await this.getStrategy().enable(args)

    return this.getStrategy().getAddresses(args)
  }

  public getEthereumChainId(): Promise<string> {
    return this.getStrategy().getEthereumChainId()
  }

  public async getEthereumTransactionReceipt(txHash: string): Promise<void> {
    return this.getStrategy().getEthereumTransactionReceipt(txHash)
  }

  public async getSessionOrConfirm(address?: AccountAddress): Promise<string> {
    return this.getStrategy().getSessionOrConfirm(address)
  }

  public async getWalletClient<T>(): Promise<T> {
    if (this.getStrategy()?.getWalletClient) {
      const result = this.getStrategy()?.getWalletClient<T>?.()
      if (result) {
        return result
      }
    }

    throw new WalletException(
      new Error('Wallet client not found. Please check your wallet strategy.'),
    )
  }

  public async sendTransaction(
    tx: DirectSignResponse | TxRaw,
    options: SendTransactionOptions,
  ): Promise<TxResponse> {
    return this.getStrategy().sendTransaction(tx, options)
  }

  public async sendEthereumTransaction(
    tx: any /* TODO */,
    options: {
      address: AccountAddress /* Ethereum address */
      ethereumChainId: EthereumChainId
    },
  ): Promise<string> {
    return this.getStrategy().sendEthereumTransaction(tx, options)
  }

  public async signEip712TypedData(
    eip712TypedData: string,
    address: AccountAddress,
  ): Promise<string> {
    if (isCosmosWallet(this.wallet)) {
      throw new WalletException(
        new Error(`You can't sign Ethereum Transaction using ${this.wallet}`),
      )
    }

    /** Phantom wallet needs enabling before signing */
    if (this.wallet === Wallet.Phantom) {
      await this.enable()
    }

    const response = await this.getStrategy().signEip712TypedData(
      eip712TypedData,
      address,
    )

    this.emit(WalletStrategyEmitterEventType.TransactionSigned)

    return response
  }

  public async signAminoCosmosTransaction(transaction: {
    signDoc: StdSignDoc
    address: string
  }): Promise<AminoSignResponse> {
    if (isEvmWallet(this.wallet)) {
      throw new WalletException(
        new Error(`You can't sign Cosmos Transaction using ${this.wallet}`),
      )
    }

    const response = await this.getStrategy().signAminoCosmosTransaction(
      transaction,
    )

    this.emit(WalletStrategyEmitterEventType.TransactionSigned)

    return response
  }

  public async signCosmosTransaction(transaction: {
    txRaw: TxRaw
    accountNumber: number
    chainId: string
    address: string
  }): Promise<DirectSignResponse> {
    if (isEvmWallet(this.wallet)) {
      throw new WalletException(
        new Error(`You can't sign Cosmos Transaction using ${this.wallet}`),
      )
    }

    const response = await this.getStrategy().signCosmosTransaction(transaction)

    this.emit(WalletStrategyEmitterEventType.TransactionSigned)

    return response
  }

  public async signArbitrary(
    signer: string,
    data: string | Uint8Array,
  ): Promise<string | void> {
    if (this.getStrategy().signArbitrary) {
      const response = await this.getStrategy().signArbitrary!(signer, data)

      this.emit(WalletStrategyEmitterEventType.TransactionSigned)

      return response
    }
  }

  public async onAccountChange(
    callback: onAccountChangeCallback,
  ): Promise<void> {
    if (this.getStrategy().onAccountChange) {
      return this.getStrategy().onAccountChange!(callback)
    }
  }

  public async onChainIdChange(
    callback: onChainIdChangeCallback,
  ): Promise<void> {
    if (this.getStrategy().onChainIdChange) {
      return this.getStrategy().onChainIdChange!(callback)
    }
  }

  public async disconnect() {
    if (this.getStrategy().disconnect) {
      await this.getStrategy().disconnect!()

      this.emit(WalletStrategyEmitterEventType.WalletStrategyDisconnect)
    }
  }

  public getCosmosWallet(chainId: ChainId): CosmosWalletAbstraction {
    const strategy = this.getStrategy()

    if (strategy.getCosmosWallet == undefined) {
      throw new WalletException(
        new Error(
          `This method is not available for ${this.getWallet()} wallet`,
        ),
      )
    }

    return strategy.getCosmosWallet(chainId)
  }
}
