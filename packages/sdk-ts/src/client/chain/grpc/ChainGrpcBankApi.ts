import { CosmosBankV1BetaQueryServiceClient } from '@injectivelabs/core-proto-ts'
import {
  grpcErrorCodeToErrorCode,
  GrpcUnaryRequestException,
  UnspecifiedErrorCode,
} from '@injectivelabs/exceptions'
import {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
  QueryDenomOwnersRequest,
  QueryDenomOwnersResponse,
  QueryDenomsMetadataRequest,
  QueryDenomsMetadataResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QuerySupplyOfRequest,
  QuerySupplyOfResponse,
  QueryTotalSupplyRequest,
  QueryTotalSupplyResponse,
} from '../../../../../../proto/core/proto-ts/proto/cosmos/bank/v1beta1/query_pb.js'
import { PaginationOption } from '../../../types/pagination.js'
import {
  fetchAllWithPagination,
  paginationRequestFromPagination,
} from '../../../utils/pagination.js'
import BaseGrpcConsumer from '../../base/BaseGrpcConsumer.js'
import { ChainGrpcBankTransformer } from '../transformers/index.js'
import { ChainModule } from '../types/index.js'

const MAX_LIMIT_FOR_SUPPLY = 10000

/**
 * @category Chain Grpc API
 */
export class ChainGrpcBankApi extends BaseGrpcConsumer {
  protected module: string = ChainModule.Bank

  protected client: CosmosBankV1BetaQueryServiceClient.QueryClient

  constructor(endpoint: string) {
    super(endpoint)

    this.client = new CosmosBankV1BetaQueryServiceClient.QueryClient(endpoint)
  }

  private getMetadata(): null {
    // The client expects null for metadata
    return null
  }

  async fetchModuleParams() {
    const request = new QueryParamsRequest()

    try {
      const response = await this.retry<QueryParamsResponse>(() =>
        this.client.params(request, this.getMetadata()),
      )

      return ChainGrpcBankTransformer.moduleParamsResponseToModuleParams(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'Params',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'Params',
        contextModule: this.module,
      })
    }
  }

  async fetchBalance({
    accountAddress,
    denom,
  }: {
    accountAddress: string
    denom: string
  }) {
    const request = new QueryBalanceRequest()
    request.setAddress(accountAddress)
    request.setDenom(denom)

    try {
      const response = await this.retry<QueryBalanceResponse>(() =>
        this.client.balance(request, this.getMetadata()),
      )

      return ChainGrpcBankTransformer.balanceResponseToBalance(response)
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'Balance',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'Balance',
        contextModule: this.module,
      })
    }
  }

  async fetchBalances(address: string, pagination?: PaginationOption) {
    const request = new QueryAllBalancesRequest()
    request.setAddress(address)

    const paginationForRequest = paginationRequestFromPagination(pagination)
    if (paginationForRequest) {
      request.setPagination(paginationForRequest)
    }

    try {
      const response = await this.retry<QueryAllBalancesResponse>(() =>
        this.client.allBalances(request, this.getMetadata()),
      )

      return ChainGrpcBankTransformer.balancesResponseToBalances(response)
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'AllBalances',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'AllBalances',
        contextModule: this.module,
      })
    }
  }

  async fetchTotalSupply(pagination?: PaginationOption) {
    const request = new QueryTotalSupplyRequest()
    const paginationForRequest = paginationRequestFromPagination(pagination)

    if (paginationForRequest) {
      request.setPagination(paginationForRequest)
    }

    try {
      const response = await this.retry<QueryTotalSupplyResponse>(() =>
        this.client.totalSupply(request, this.getMetadata()),
      )

      return ChainGrpcBankTransformer.totalSupplyResponseToTotalSupply(response)
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'TotalSupply',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'TotalSupply',
        contextModule: this.module,
      })
    }
  }

  /** a way to ensure all total supply is fully fetched */
  async fetchAllTotalSupply(
    pagination: PaginationOption = { limit: MAX_LIMIT_FOR_SUPPLY },
  ) {
    return fetchAllWithPagination(pagination, this.fetchTotalSupply.bind(this))
  }

  async fetchSupplyOf(denom: string) {
    const request = new QuerySupplyOfRequest()
    request.setDenom(denom)

    try {
      const response = await this.retry<QuerySupplyOfResponse>(() =>
        this.client.supplyOf(request, this.getMetadata()),
      )

      const amount = response.getAmount()
      if (!amount) {
        throw new Error('Amount not found in response')
      }

      return ChainGrpcBankTransformer.grpcCoinToCoin(amount)
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'fetchSupplyOf',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'fetchSupplyOf',
        contextModule: this.module,
      })
    }
  }

  async fetchDenomsMetadata(pagination?: PaginationOption) {
    const request = new QueryDenomsMetadataRequest()
    const paginationForRequest = paginationRequestFromPagination(pagination)

    if (paginationForRequest) {
      request.setPagination(paginationForRequest)
    }

    try {
      const response = await this.retry<QueryDenomsMetadataResponse>(() =>
        this.client.denomsMetadata(request, this.getMetadata()),
      )

      return ChainGrpcBankTransformer.denomsMetadataResponseToDenomsMetadata(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'DenomsMetadata',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'DenomsMetadata',
        contextModule: this.module,
      })
    }
  }

  async fetchDenomMetadata(denom: string) {
    const request = new QueryDenomMetadataRequest()
    request.setDenom(denom)

    try {
      const response = await this.retry<QueryDenomMetadataResponse>(() =>
        this.client.denomMetadata(request, this.getMetadata()),
      )

      const metadata = response.getMetadata()
      if (!metadata) {
        throw new Error('Metadata not found in response')
      }

      return ChainGrpcBankTransformer.metadataToMetadata(metadata)
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'DenomMetadata',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'DenomMetadata',
        contextModule: this.module,
      })
    }
  }

  async fetchDenomOwners(denom: string, pagination?: PaginationOption) {
    const request = new QueryDenomOwnersRequest()
    request.setDenom(denom)

    const paginationForRequest = paginationRequestFromPagination(pagination)

    if (paginationForRequest) {
      request.setPagination(paginationForRequest)
    }

    try {
      const response = await this.retry<QueryDenomOwnersResponse>(() =>
        this.client.denomOwners(request, this.getMetadata()),
      )

      return ChainGrpcBankTransformer.denomOwnersResponseToDenomOwners(response)
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        throw new GrpcUnaryRequestException(e, {
          code: grpcErrorCodeToErrorCode((e as { code: number }).code),
          context: 'DenomOwners',
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        context: 'DenomOwners',
        contextModule: this.module,
      })
    }
  }
}
