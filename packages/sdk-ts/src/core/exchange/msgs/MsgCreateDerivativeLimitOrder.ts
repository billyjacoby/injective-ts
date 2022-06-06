import { MsgCreateDerivativeLimitOrder as BaseMsgCreateDerivativeLimitOrder } from '@injectivelabs/chain-api/injective/exchange/v1beta1/tx_pb'
import {
  DerivativeOrder,
  OrderInfo,
  OrderTypeMap,
} from '@injectivelabs/chain-api/injective/exchange/v1beta1/exchange_pb'
import { MsgBase } from '../../MsgBase'
import { amountToCosmosSdkDecAmount } from '../../../utils/numbers'

export declare namespace MsgCreateDerivativeLimitOrder {
  export interface Params {
    marketId: string
    subaccountId: string
    injectiveAddress: string
    orderType: OrderTypeMap[keyof OrderTypeMap]
    triggerPrice?: string
    feeRecipient: string
    price: string
    margin: string
    quantity: string
  }

  export interface DirectSign {
    type: '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder'
    message: BaseMsgCreateDerivativeLimitOrder
  }

  export interface Data extends BaseMsgCreateDerivativeLimitOrder.AsObject {
    '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder'
  }

  export interface Web3 extends BaseMsgCreateDerivativeLimitOrder.AsObject {
    '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder'
  }

  export type Proto = BaseMsgCreateDerivativeLimitOrder
}

const createLimitOrder = (params: MsgCreateDerivativeLimitOrder.Params) => {
  const orderInfo = new OrderInfo()
  orderInfo.setSubaccountId(params.subaccountId)
  orderInfo.setFeeRecipient(params.feeRecipient)
  orderInfo.setPrice(params.price)
  orderInfo.setQuantity(params.quantity)

  const derivativeOrder = new DerivativeOrder()
  derivativeOrder.setMarketId(params.marketId)
  derivativeOrder.setOrderType(params.orderType)
  derivativeOrder.setOrderInfo(orderInfo)
  derivativeOrder.setMargin(params.margin)

  if (params.triggerPrice) {
    derivativeOrder.setTriggerPrice(params.triggerPrice)
  }

  const message = new BaseMsgCreateDerivativeLimitOrder()
  message.setSender(params.injectiveAddress)
  message.setOrder(derivativeOrder)

  return message
}

export default class MsgCreateDerivativeLimitOrder extends MsgBase<
  MsgCreateDerivativeLimitOrder.Params,
  MsgCreateDerivativeLimitOrder.Data,
  MsgCreateDerivativeLimitOrder.Proto,
  MsgCreateDerivativeLimitOrder.Web3,
  MsgCreateDerivativeLimitOrder.DirectSign
> {
  static fromJSON(
    params: MsgCreateDerivativeLimitOrder.Params,
  ): MsgCreateDerivativeLimitOrder {
    return new MsgCreateDerivativeLimitOrder(params)
  }

  toProto(): MsgCreateDerivativeLimitOrder.Proto {
    const { params: initialParams } = this
    const params = {
      ...initialParams,
      price: amountToCosmosSdkDecAmount(initialParams.price).toFixed(),
      margin: amountToCosmosSdkDecAmount(initialParams.margin).toFixed(),
      triggerPrice: amountToCosmosSdkDecAmount(
        initialParams.triggerPrice || 0,
      ).toFixed(),
      quantity: amountToCosmosSdkDecAmount(initialParams.quantity).toFixed(),
    } as MsgCreateDerivativeLimitOrder.Params

    return createLimitOrder(params)
  }

  toData(): MsgCreateDerivativeLimitOrder.Data {
    const proto = this.toProto()

    return {
      '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder',
      ...proto.toObject(),
    }
  }

  toWeb3(): MsgCreateDerivativeLimitOrder.Web3 {
    const { params } = this
    const proto = createLimitOrder(params)

    return {
      '@type': '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder',
      ...proto.toObject(),
    }
  }

  toDirectSign(): MsgCreateDerivativeLimitOrder.DirectSign {
    const proto = this.toProto()

    return {
      type: '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder',
      message: proto,
    }
  }
}