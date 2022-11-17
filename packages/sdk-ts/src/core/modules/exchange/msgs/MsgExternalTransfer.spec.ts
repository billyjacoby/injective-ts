import { MsgExternalTransfer as BaseMsgExternalTransfer } from '@injectivelabs/chain-api/injective/exchange/v1beta1/tx_pb'
import { BigNumberInBase } from '@injectivelabs/utils'
import MsgExternalTransfer from './MsgExternalTransfer'
import { mockFactory } from '@injectivelabs/test-utils'
import snakecaseKeys from 'snakecase-keys'

const params: MsgExternalTransfer['params'] = {
  subaccountId: mockFactory.subaccountId,
  injectiveAddress: mockFactory.injectiveAddress,
  destinationSubaccountId: mockFactory.subaccountId2,
  amount: {
    amount: new BigNumberInBase(1).toFixed(),
    denom: 'inj',
  },
}

const protoType = '/injective.exchange.v1beta1.MsgExternalTransfer'
const protoTypeAmino = 'exchange/MsgExternalTransfer'
const protoParams = {
  subaccountId: params.subaccountId,
  sender: params.injectiveAddress,
  amount: params.amount,
}

const message = MsgExternalTransfer.fromJSON(params)

describe('MsgExternalTransfer', () => {
  it('generates proper proto', () => {
    const proto = message.toProto()

    expect(proto instanceof BaseMsgExternalTransfer).toBe(true)
    expect(proto.toObject()).toStrictEqual(protoParams)
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
      type: protoTypeAmino,
      ...protoParams,
    })
  })

  it('generates proper Eip712 types', () => {
    const eip712Types = message.toEip712Types()

    expect(Object.fromEntries(eip712Types)).toStrictEqual({
      TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
      MsgValue: [
        { name: 'sender', type: 'string' },
        { name: 'subaccount_id', type: 'string' },
        { name: 'amount', type: 'TypeAmount' },
      ],
    })
  })

  it('generates proper Eip712 values', () => {
    const eip712 = message.toEip712()

    expect(eip712).toStrictEqual({
      type: protoTypeAmino,
      value: snakecaseKeys(protoParams),
    })
  })

  it('generates proper web3', () => {
    const web3 = message.toWeb3()

    expect(web3).toStrictEqual({
      '@type': protoType,
      ...protoParams,
    })
  })
})
