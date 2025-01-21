import MsgSubmitProposalSpotMarketParamUpdate from './MsgSubmitProposalSpotMarketParamUpdate.js'
import { mockFactory, prepareEip712 } from '@injectivelabs/test-utils'
import { getEip712TypedData, getEip712TypedDataV2 } from '../../../tx/index.js'
import { GrpcMarketStatusMap, IndexerGrpcWeb3GwApi } from './../../../../client'

const params: MsgSubmitProposalSpotMarketParamUpdate['params'] = {
  market: {
    marketId: '0x',
    title: 'INJ/USDT',
    description: 'Launch of INJ/USDT spot market',
    ticker: 'INJ/USDT',
    status: GrpcMarketStatusMap.Active,
    minPriceTickSize: '0.000000000000001',
    minQuantityTickSize: '1000000000000000',
    makerFeeRate: '-0.00005',
    minNotional: '1000000',
    takerFeeRate: '0.0005',
    relayerFeeShareRate: '0.0005',
  },
  proposer: mockFactory.injectiveAddress,
  deposit: {
    amount: '1000000000000000000',
    denom: 'inj',
  },
}

const message = MsgSubmitProposalSpotMarketParamUpdate.fromJSON(params)

describe('MsgSubmitProposalSpotMarketParamUpdate', () => {
  describe('generates proper EIP712 compared to the Web3Gw (chain)', () => {
    const { endpoints, eip712Args, prepareEip712Request } = prepareEip712({
      sequence: 0,
      accountNumber: 3,
      messages: message,
    })

    // TODO
    it.skip('EIP712 v1', async () => {
      const eip712TypedData = getEip712TypedData(eip712Args)

      const txResponse = await new IndexerGrpcWeb3GwApi(
        endpoints.indexer,
      ).prepareEip712Request({
        ...prepareEip712Request,
        eip712Version: 'v1',
      })

      expect(eip712TypedData).toStrictEqual(JSON.parse(txResponse.data))
    })

    it('EIP712 v2', async () => {
      const eip712TypedData = getEip712TypedDataV2(eip712Args)

      const txResponse = await new IndexerGrpcWeb3GwApi(
        endpoints.indexer,
      ).prepareEip712Request({ ...prepareEip712Request, eip712Version: 'v2' })

      expect(eip712TypedData).toStrictEqual(JSON.parse(txResponse.data))
    })
  })
})
