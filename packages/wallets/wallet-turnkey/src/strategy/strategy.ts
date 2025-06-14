/* eslint-disable class-methods-use-this */
import {
  TxRaw,
  TxGrpcApi,
  AminoSignResponse,
  DirectSignResponse,
} from '@injectivelabs/sdk-ts'
import {
  ErrorType,
  WalletException,
  UnspecifiedErrorCode,
  TransactionException,
  CosmosWalletException,
} from '@injectivelabs/exceptions'
import { getAddress } from 'viem'
import { HttpRestClient } from '@injectivelabs/utils'
import { AccountAddress, EthereumChainId } from '@injectivelabs/ts-types'
import { TurnkeyIframeClient } from '@turnkey/sdk-browser'
import {
  StdSignDoc,
  WalletAction,
  TurnkeyMetadata,
  WalletDeviceType,
  type WalletMetadata,
  BaseConcreteStrategy,
  ConcreteWalletStrategy,
  SendTransactionOptions,
  ConcreteEthereumWalletStrategyArgs,
} from '@injectivelabs/wallet-base'
import { TurnkeyErrorCodes } from './types.js'
import { TurnkeyWallet } from './turnkey/turnkey.js'

export class TurnkeyWalletStrategy
  extends BaseConcreteStrategy
  implements ConcreteWalletStrategy
{
  public turnkeyWallet: TurnkeyWallet | undefined

  public client: HttpRestClient

  constructor(
    args: ConcreteEthereumWalletStrategyArgs & {
      apiServerEndpoint?: string
    },
  ) {
    super(args)

    const endpoint =
      args.apiServerEndpoint || this.metadata?.turnkey?.apiServerEndpoint

    if (!endpoint) {
      throw new WalletException(new Error('apiServerEndpoint is required'))
    }

    this.client = new HttpRestClient(endpoint)
  }

  async getWalletDeviceType(): Promise<WalletDeviceType> {
    return Promise.resolve(WalletDeviceType.Browser)
  }

  setMetadata(metadata?: { turnkey?: Partial<WalletMetadata['turnkey']> }) {
    if (metadata?.turnkey) {
      this.metadata = {
        ...this.metadata,
        turnkey: {
          ...this.metadata?.turnkey,
          ...metadata.turnkey,
        } as TurnkeyMetadata,
      }
      this.turnkeyWallet?.setMetadata(this.metadata?.turnkey as TurnkeyMetadata)
    }
  }

  async enable(): Promise<boolean> {
    const turnkeyWallet = await this.getTurnkeyWallet()

    try {
      const session = await turnkeyWallet.getSession()

      if (session.session) {
        // User is already logged in, we don't need to do anything in the next steps
        if (this.metadata?.turnkey) {
          this.metadata.turnkey.session = session.session
        }

        return true
      }

      return !!(await turnkeyWallet.getIframeClient())
    } catch (e) {
      return false
    }
  }

  public async disconnect() {
    const turnkeyWallet = await this.getTurnkeyWallet()
    const turnkey = await turnkeyWallet.getTurnkey()

    const isUserLoggedIn = await turnkey.getSession()

    if (!isUserLoggedIn) {
      return
    }

    await turnkey.logout()
  }

  async getAddresses(): Promise<string[]> {
    const turnkeyWallet = await this.getTurnkeyWallet()
    await turnkeyWallet.getSession()

    try {
      return await turnkeyWallet.getAccounts()
    } catch (e: any) {
      if (e.contextCode === TurnkeyErrorCodes.UserLoggedOut) {
        await this.disconnect()

        throw e
      }

      throw new WalletException(new Error(e.message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetAccounts,
      })
    }
  }

  async getSessionOrConfirm(_address?: string): Promise<string> {
    const turnkeyWallet = await this.getTurnkeyWallet()

    return await turnkeyWallet.refreshSession()
  }

  async getWalletClient<TurnkeyWallet>(): Promise<TurnkeyWallet> {
    return (await this.getTurnkeyWallet()) as TurnkeyWallet
  }

  async sendEthereumTransaction(
    _transaction: unknown,
    _options: { address: AccountAddress; ethereumChainId: EthereumChainId },
  ): Promise<string> {
    throw new WalletException(
      new Error(
        'sendEthereumTransaction is not supported. Turnkey only supports sending cosmos transactions',
      ),
      {
        code: UnspecifiedErrorCode,
        context: WalletAction.SendEthereumTransaction,
      },
    )
  }

  async sendTransaction(
    transaction: TxRaw,
    options: SendTransactionOptions,
  ): Promise<any> {
    const { endpoints, txTimeout } = options

    if (!endpoints) {
      throw new WalletException(
        new Error(
          'You have to pass endpoints.grpc within the options for using Turnkey wallet',
        ),
      )
    }

    const txApi = new TxGrpcApi(endpoints.grpc)
    const response = await txApi.broadcast(transaction, { txTimeout })

    if (response.code !== 0) {
      throw new TransactionException(new Error(response.rawLog), {
        code: UnspecifiedErrorCode,
        contextCode: response.code,
        contextModule: response.codespace,
      })
    }

    return response
  }

  async signEip712TypedData(
    eip712json: string,
    address: AccountAddress,
  ): Promise<string> {
    const turnkeyWallet = await this.getTurnkeyWallet()
    const organizationId = await this.getOrganizationId()

    //? Turnkey expects the case sensitive address and the current impl of getChecksumAddress from sdk-ts doesn't play nice with browser envs
    const checksumAddress = getAddress(address)

    const account = await turnkeyWallet.getOrCreateAndGetAccount(
      checksumAddress,
      organizationId,
    )

    if (!account) {
      throw new WalletException(new Error('Turnkey account not found'))
    }

    let parsedData
    try {
      parsedData = JSON.parse(eip712json)
    } catch (e) {
      throw new WalletException(
        new Error('Failed to parse EIP-712 data: Invalid JSON format'),
        {
          code: UnspecifiedErrorCode,
          type: ErrorType.WalletError,
          contextModule: WalletAction.SignTransaction,
        },
      )
    }

    const signature = await account.signTypedData(parsedData)

    return signature
  }

  // eslint-disable-next-line class-methods-use-this
  async signCosmosTransaction(_transaction: {
    txRaw: TxRaw
    accountNumber: number
    chainId: string
    address: string
  }): Promise<DirectSignResponse> {
    throw new WalletException(
      new Error('This wallet does not support signing Cosmos transactions'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SignTransaction,
      },
    )
  }

  async signAminoCosmosTransaction(_transaction: {
    address: string
    signDoc: StdSignDoc
  }): Promise<AminoSignResponse> {
    throw new WalletException(
      new Error('This wallet does not support signAminoCosmosTransaction'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SignTransaction,
      },
    )
  }

  async signArbitrary(
    _signer: AccountAddress,
    _data: string | Uint8Array,
  ): Promise<string> {
    throw new WalletException(
      new Error('This wallet does not support signArbitrary'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SignTransaction,
      },
    )
  }

  async getEthereumChainId(): Promise<string> {
    throw new CosmosWalletException(
      new Error('getEthereumChainId is not supported on Turnkey wallet'),
      {
        code: UnspecifiedErrorCode,
        context: WalletAction.GetChainId,
      },
    )
  }

  async getEthereumTransactionReceipt(_txHash: string): Promise<string> {
    throw new CosmosWalletException(
      new Error('getEthereumTransactionReceipt is not supported on Turnkey'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        context: WalletAction.GetEthereumTransactionReceipt,
      },
    )
  }

  // eslint-disable-next-line class-methods-use-this
  async getPubKey(): Promise<string> {
    throw new WalletException(
      new Error('You can only fetch PubKey from Cosmos native wallets'),
    )
  }

  async getIframeClient(): Promise<TurnkeyIframeClient> {
    const turnkeyWallet = await this.getTurnkeyWallet()
    return turnkeyWallet.getIframeClient()
  }

  private async getTurnkeyWallet(): Promise<TurnkeyWallet> {
    const { metadata } = this

    if (!this.turnkeyWallet) {
      if (!metadata?.turnkey) {
        throw new WalletException(new Error('Turnkey metadata is required'))
      }

      if (!metadata.turnkey.apiBaseUrl) {
        throw new WalletException(new Error('Turnkey apiBaseUrl is required'))
      }

      if (!metadata.turnkey.apiServerEndpoint) {
        throw new WalletException(
          new Error('Turnkey apiServerEndpoint is required'),
        )
      }

      if (!metadata.turnkey.defaultOrganizationId) {
        throw new WalletException(
          new Error('Turnkey defaultOrganizationId is required'),
        )
      }

      this.turnkeyWallet = new TurnkeyWallet(
        metadata.turnkey as TurnkeyMetadata,
      )
    }

    return this.turnkeyWallet
  }

  private async getOrganizationId(): Promise<string> {
    const { metadata } = this
    const organizationId =
      metadata?.turnkey?.organizationId ||
      metadata?.turnkey?.defaultOrganizationId

    if (!organizationId) {
      throw new WalletException(new Error('Organization ID is required'))
    }

    return organizationId
  }
}
