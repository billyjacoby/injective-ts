import { Subscription } from 'rxjs'
import { InjectiveTradingRpc } from '@injectivelabs/indexer-proto-ts'
import { StreamStatusResponse } from '../types/index.js'
import { getGrpcIndexerWebImpl } from '../../base/BaseIndexerGrpcWebConsumer.js'

/**
 * @category Indexer Grid Strategy Grpc Stream
 */
export class IndexerGrpcTradingStream {
  protected client: InjectiveTradingRpc.InjectiveTradingRPCClientImpl

  constructor(endpoint: string) {
    this.client = new InjectiveTradingRpc.InjectiveTradingRPCClientImpl(
      getGrpcIndexerWebImpl(endpoint),
    )
  }

  streamGridStrategies({
    marketId,
    callback,
    onEndCallback,
    accountAddresses,
    onStatusCallback,
  }: {
    marketId?: string
    accountAddresses?: string[]
    onEndCallback?: (status?: StreamStatusResponse) => void
    onStatusCallback?: (status: StreamStatusResponse) => void
    callback: (response: InjectiveTradingRpc.StreamStrategyResponse) => void
  }): Subscription {
    const request = InjectiveTradingRpc.StreamStrategyRequest.create()

    if ((!accountAddresses || accountAddresses.length === 0) && !marketId) {
      throw new Error('accountAddresses or marketId is required')
    }

    if (typeof callback !== 'function') {
      throw new Error('callback must be a function')
    }

    if (accountAddresses) {
      request.accountAddresses = accountAddresses
    }

    if (marketId) {
      request.marketId = marketId
    }

    const subscription = this.client.StreamStrategy(request).subscribe({
      next(response: InjectiveTradingRpc.StreamStrategyResponse) {
        callback(response)
      },
      error(err) {
        if (onStatusCallback) {
          onStatusCallback(err)
        }
      },
      complete() {
        if (onEndCallback) {
          onEndCallback()
        }
      },
    })

    return subscription
  }
}
