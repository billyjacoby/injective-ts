import { MsgCreateInsuranceFund as BaseMsgCreateInsuranceFund } from '@injectivelabs/chain-api/injective/insurance/v1beta1/tx_pb'
import { Coin } from '@injectivelabs/chain-api/cosmos/base/v1beta1/coin_pb'
import { OracleTypeMap } from '@injectivelabs/chain-api/injective/oracle/v1beta1/oracle_pb'
import { MsgBase } from '../../MsgBase'

export declare namespace MsgCreateInsuranceFund {
  export interface Params {
    fund: {
      ticker: string
      quoteDenom: string
      oracleBase: string
      oracleQuote: string
      oracleType: OracleTypeMap[keyof OracleTypeMap]
      expiry?: number
    }
    deposit: {
      amount: string
      denom: string
    }
    injectiveAddress: string
  }

  export interface DirectSign {
    type: '/injective.insurance.v1beta1.MsgCreateInsuranceFund'
    message: BaseMsgCreateInsuranceFund
  }

  export interface Data extends BaseMsgCreateInsuranceFund.AsObject {
    '@type': '/injective.insurance.v1beta1.MsgCreateInsuranceFund'
  }

  export interface Web3 extends BaseMsgCreateInsuranceFund.AsObject {
    '@type': '/injective.insurance.v1beta1.MsgCreateInsuranceFund'
  }

  export type Proto = BaseMsgCreateInsuranceFund
}

export default class MsgCreateInsuranceFund extends MsgBase<
  MsgCreateInsuranceFund.Params,
  MsgCreateInsuranceFund.Data,
  MsgCreateInsuranceFund.Proto,
  MsgCreateInsuranceFund.Web3,
  MsgCreateInsuranceFund.DirectSign
> {
  static fromJSON(
    params: MsgCreateInsuranceFund.Params,
  ): MsgCreateInsuranceFund {
    return new MsgCreateInsuranceFund(params)
  }

  toProto(): MsgCreateInsuranceFund.Proto {
    const { params } = this

    const amountCoin = new Coin()
    amountCoin.setAmount(params.deposit.amount)
    amountCoin.setDenom(params.deposit.denom)

    const message = new BaseMsgCreateInsuranceFund()
    message.setTicker(params.fund.ticker)
    message.setQuoteDenom(params.fund.quoteDenom)
    message.setOracleBase(params.fund.oracleBase)
    message.setOracleQuote(params.fund.oracleQuote)
    message.setOracleType(params.fund.oracleType)
    message.setSender(params.injectiveAddress)
    message.setInitialDeposit(amountCoin)
    message.setExpiry(params.fund.expiry ? params.fund.expiry : -1)

    return message
  }

  toData(): MsgCreateInsuranceFund.Data {
    const proto = this.toProto()

    return {
      '@type': '/injective.insurance.v1beta1.MsgCreateInsuranceFund',
      ...proto.toObject(),
    }
  }

  toWeb3(): MsgCreateInsuranceFund.Web3 {
    const proto = this.toProto()

    return {
      '@type': '/injective.insurance.v1beta1.MsgCreateInsuranceFund',
      ...proto.toObject(),
    }
  }

  toDirectSign(): MsgCreateInsuranceFund.DirectSign {
    const proto = this.toProto()

    return {
      type: '/injective.insurance.v1beta1.MsgCreateInsuranceFund',
      message: proto,
    }
  }
}