import MsgBatchCancelDerivativeOrders from './MsgBatchCancelDerivativeOrders.js'
import snakecaseKeys from 'snakecase-keys'
import { mockFactory, prepareEip712 } from '@injectivelabs/utils/test-utils'
import {
  getEip712TypedData,
  getEip712TypedDataV2,
} from '../../../tx/eip712/eip712.js'
import { IndexerGrpcWeb3GwApi } from './../../../../client/indexer/grpc/IndexerGrpcWeb3GwApi.js'
import { EIP712Version } from '@injectivelabs/ts-types'

const params: MsgBatchCancelDerivativeOrders['params'] = {
  injectiveAddress: mockFactory.injectiveAddress,
  orders: [
    {
      marketId: mockFactory.injUsdtDerivativeMarket.marketId,
      orderHash: mockFactory.orderHash,
      subaccountId: mockFactory.subaccountId,
      cid: 'order-123',
    },
    {
      marketId: mockFactory.injUsdtDerivativeMarket.marketId,
      orderHash: mockFactory.orderHash2,
      subaccountId: mockFactory.subaccountId,
      cid: 'order-124',
    },
  ],
}

const protoType = '/injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders'
const protoTypeShort = 'exchange/MsgBatchCancelDerivativeOrders'

const ordersWithOrderMask = params.orders.map((order) => ({
  ...order,
  orderMask: 1,
}))

const protoParams = {
  sender: params.injectiveAddress,
  data: ordersWithOrderMask,
}

const protoParamsAmino = {
  sender: params.injectiveAddress,
  data: snakecaseKeys(ordersWithOrderMask),
}

const message = MsgBatchCancelDerivativeOrders.fromJSON(params)

describe('MsgBatchCancelDerivativeOrders', () => {
  it('generates proper proto', () => {
    const proto = message.toProto()

    expect(proto).toStrictEqual(protoParams)
  })

  it('generates proper data', () => {
    const data = message.toData()

    expect(data).toStrictEqual({
      '@type': protoType,
      ...protoParams,
    })
  })

  it('generates proper amino', () => {
    const amino = message.toAmino()

    expect(amino).toStrictEqual({
      type: protoTypeShort,
      value: protoParamsAmino,
    })
  })

  it('generates proper web3Gw', () => {
    const web3 = message.toWeb3Gw()

    expect(web3).toStrictEqual({
      '@type': protoType,
      ...protoParamsAmino,
    })
  })

  describe('generates proper EIP712 compared to the Web3Gw (chain)', () => {
    const { endpoints, eip712Args, prepareEip712Request } = prepareEip712({
      messages: message,
    })

    it('EIP712 v1', async () => {
      const eip712TypedData = getEip712TypedData(eip712Args)

      const txResponse = await new IndexerGrpcWeb3GwApi(
        endpoints.indexer,
      ).prepareEip712Request({
        ...prepareEip712Request,
        eip712Version: EIP712Version.V1,
      })

      expect(eip712TypedData).toStrictEqual(JSON.parse(txResponse.data))
    })

    it('EIP712 v2', async () => {
      const eip712TypedData = getEip712TypedDataV2(eip712Args)

      const txResponse = await new IndexerGrpcWeb3GwApi(
        endpoints.indexer,
      ).prepareEip712Request({
        ...prepareEip712Request,
        eip712Version: EIP712Version.V2,
      })

      expect(eip712TypedData).toStrictEqual(JSON.parse(txResponse.data))
    })
  })
})
