import { NetworkEndpoints } from '@injectivelabs/networks'
import { TxResponse, ChainGrpcTendermintApi } from '@injectivelabs/sdk-ts'

export const getTransactionTimeElapsed = async ({
  endpoints,
  txResponse,
}: {
  txResponse: TxResponse
  endpoints: NetworkEndpoints
}) => {
  const endTimeTx = txResponse.timestamp
    ? new Date(txResponse.timestamp).getTime()
    : 0

  const txBlock = await new ChainGrpcTendermintApi(endpoints.grpc).fetchBlock(
    txResponse.height,
  )

  const endTimeTxBlock = txBlock?.header?.time
    ? new Date(txBlock?.header?.time).getTime()
    : 0

  const timeElapsed = endTimeTxBlock - endTimeTx

  return timeElapsed
}
