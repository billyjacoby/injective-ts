import {
  CosmosBankV1Beta1Bank,
  CosmosBankV1Beta1Tx,
  CosmosBaseV1Beta1Coin,
} from '@injectivelabs/core-proto-ts'
import snakecaseKeys from 'snakecase-keys'
import { MsgBase } from '../../MsgBase.js'

export declare namespace MsgMultiSend {
  export interface Params {
    inputs: {
      address: string
      coins: {
        denom: string
        amount: string
      }[]
    }[]
    outputs: {
      address: string
      coins: {
        denom: string
        amount: string
      }[]
    }[]
  }

  export type Proto = CosmosBankV1Beta1Tx.MsgMultiSend
}

/**
 * @category Messages
 */
export default class MsgMultiSend extends MsgBase<
  MsgMultiSend.Params,
  MsgMultiSend.Proto & { '@type'?: string }
> {
  static fromJSON(params: MsgMultiSend.Params): MsgMultiSend {
    return new MsgMultiSend(params)
  }

  public toProto() {
    const { params } = this

    const message = new CosmosBankV1Beta1Tx.MsgMultiSend()

    const inputs = params.inputs.map((i) => {
      const input = new CosmosBankV1Beta1Bank.Input()
      input.setAddress(i.address)
      input.setCoinsList(
        i.coins.map((c) => {
          const coin = new CosmosBaseV1Beta1Coin.Coin()
          coin.setDenom(c.denom)
          coin.setAmount(c.amount)
          return coin
        }),
      )
      return input
    })

    const outputs = params.outputs.map((o) => {
      const output = new CosmosBankV1Beta1Bank.Output()
      output.setAddress(o.address)
      output.setCoinsList(
        o.coins.map((c) => {
          const coin = new CosmosBaseV1Beta1Coin.Coin()
          coin.setDenom(c.denom)
          coin.setAmount(c.amount)
          return coin
        }),
      )
      return output
    })

    message.setInputsList(inputs)
    message.setOutputsList(outputs)

    return message
  }

  public toData() {
    const message = this.toProto()
    Object.defineProperty(message, '@type', {
      enumerable: true,
      value: '/cosmos.bank.v1beta1.MsgMultiSend',
    })
    return message as MsgMultiSend.Proto & { '@type': string }
  }

  public toAmino() {
    const message = this.toProto()
    const messageObject = message.toObject()
    const messageJson = {
      ...snakecaseKeys(messageObject),
    }

    return {
      type: 'cosmos-sdk/MsgMultiSend',
      value: messageJson,
    }
  }

  public toWeb3Gw() {
    const amino = this.toAmino()
    const { value } = amino

    return {
      '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
      ...value,
    }
  }

  public toDirectSign() {
    const message = this.toProto()

    return {
      type: '/cosmos.bank.v1beta1.MsgMultiSend',
      message: message,
    }
  }

  public toBinary(): Uint8Array {
    return this.toProto().serializeBinary()
  }
}
