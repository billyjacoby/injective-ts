import { StreamOperation } from '../../../types'
import { StreamPricesResponse } from '@injectivelabs/exchange-api/injective_oracle_rpc_pb'

export class ExchangeOracleStreamTransformer {
  static pricesStreamCallback = (response: StreamPricesResponse) => ({
    price: response.getPrice(),
    operation: StreamOperation.Update as StreamOperation,
    timestamp: response.getTimestamp(),
  })
}