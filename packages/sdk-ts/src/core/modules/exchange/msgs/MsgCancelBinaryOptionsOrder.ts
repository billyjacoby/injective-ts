import {
  InjectiveExchangeV1Beta1Exchange,
  InjectiveExchangeV1Beta1Tx,
} from '@injectivelabs/core-proto-ts'
import snakecaseKeys from 'snakecase-keys'
import { MsgBase } from '../../MsgBase.js'

export declare namespace MsgCancelBinaryOptionsOrder {
  export interface Params {
    marketId: string
    subaccountId: string
    injectiveAddress: string
    orderHash?: string
    orderMask?: InjectiveExchangeV1Beta1Exchange.OrderMask
    cid?: string
  }

  export type Proto = InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder
}

/**
 * @category Messages
 */
export default class MsgCancelBinaryOptionsOrder extends MsgBase<
  MsgCancelBinaryOptionsOrder.Params,
  MsgCancelBinaryOptionsOrder.Proto
> {
  static fromJSON(
    params: MsgCancelBinaryOptionsOrder.Params,
  ): MsgCancelBinaryOptionsOrder {
    return new MsgCancelBinaryOptionsOrder(params)
  }

  public toProto() {
    const { params } = this

    const message = new InjectiveExchangeV1Beta1Tx.MsgCancelBinaryOptionsOrder()

    message.setSender(params.injectiveAddress)
    message.setMarketId(params.marketId)
    message.setSubaccountId(params.subaccountId)

    if (params.orderHash) {
      message.setOrderHash(params.orderHash)
    }

    // TODO: Send order.orderMask instead when chain handles order mask properly.
    message.setOrderMask(InjectiveExchangeV1Beta1Exchange.OrderMask.ANY)

    if (params.cid) {
      message.setCid(params.cid)
    }

    return message
  }

  public toData() {
    const message = this.toProto()
    return Object.assign(message, {
      '@type': '/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder',
    })
  }

  public toAmino() {
    const proto = this.toProto()
    const message = {
      ...snakecaseKeys(proto),
    }

    return {
      type: 'exchange/MsgCancelBinaryOptionsOrder',
      value: message,
    }
  }

  public toWeb3Gw() {
    const amino = this.toAmino()
    const { value } = amino

    return {
      '@type': '/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder',
      ...value,
    }
  }

  public toDirectSign() {
    const proto = this.toProto()

    return {
      type: '/injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder',
      message: proto,
    }
  }

  public toBinary(): Uint8Array {
    return this.toProto().serializeBinary()
  }
}
