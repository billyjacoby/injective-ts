import { QueryAllContractStateResponse } from '@injectivelabs/chain-api/cosmwasm/wasm/v1/query_pb'
import {
  ContractAccountBalance,
  ContractAccountsBalanceWithPagination,
} from '../types/wasm'
import { grpcPaginationToPagination } from './../../../utils/pagination'

export class ChainGrpcWasmTransformer {
  static allContractStateResponseToContractAccountsBalanceWithPagination(
    response: QueryAllContractStateResponse,
  ): ContractAccountsBalanceWithPagination {
    const contractAccountsBalance = response
      .getModelsList()
      .map((model) => {
        return {
          account: Buffer.from(model.getKey_asB64(), 'base64')
            .toString('utf-8')
            .split('balance')
            .pop(),
          balance: Buffer.from(model.getValue_asB64(), 'base64')
            .toString('utf-8')
            .replace(/['"]+/g, ''),
        }
      })
      .filter(({ account }) => {
        return account && account.startsWith('inj')
      }) as ContractAccountBalance[]

    return {
      contractAccountsBalance,
      pagination: grpcPaginationToPagination(response.getPagination()),
    }
  }
}
