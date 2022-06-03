import MsgBid from './auction/msgs/MsgBid'
import MsgGrant from './authz/msgs/MsgGrant'
import MsgRevoke from './authz/msgs/MsgRevoke'
import MsgSend from './bank/msgs/MsgSend'
import MsgWithdrawDelegatorReward from './distribution/msgs/MsgWithdrawDelegatorReward'
import MsgBatchCancelDerivativeOrders from './exchange/msgs/MsgBatchCancelDerivativeOrders'
import MsgBatchCancelSpotOrders from './exchange/msgs/MsgBatchCancelSpotOrders'
import MsgCancelDerivativeOrder from './exchange/msgs/MsgCancelDerivativeOrder'
import MsgCancelSpotOrder from './exchange/msgs/MsgCancelSpotOrder'
import MsgCreateDerivativeLimitOrder from './exchange/msgs/MsgCreateDerivativeLimitOrder'
import MsgCreateDerivativeMarketOrder from './exchange/msgs/MsgCreateDerivativeMarketOrder'
import MsgCreateSpotLimitOrder from './exchange/msgs/MsgCreateSpotLimitOrder'
import MsgCreateSpotMarketOrder from './exchange/msgs/MsgCreateSpotMarketOrder'
import MsgDeposit from './exchange/msgs/MsgDeposit'
import MsgIncreasePositionMargin from './exchange/msgs/MsgIncreasePositionMargin'
import MsgInstantSpotMarketLaunch from './exchange/msgs/MsgInstantSpotMarketLaunch'
import MsgWithdraw from './exchange/msgs/MsgWithdraw'
import MsgGovDeposit from './gov/msgs/MsgDeposit'
import MsgSubmitProposalExpiryFuturesMarketLaunch from './gov/msgs/MsgSubmitProposalExpiryFuturesMarketLaunch'
import MsgSubmitProposalPerpetualMarketLaunch from './gov/msgs/MsgSubmitProposalPerpetualMarketLaunch'
import MsgSubmitProposalSpotMarketLaunch from './gov/msgs/MsgSubmitProposalSpotMarketLaunch'
import MsgSubmitProposalSpotMarketParamUpdate from './gov/msgs/MsgSubmitProposalSpotMarketParamUpdate'
import MsgSubmitTextProposal from './gov/msgs/MsgSubmitTextProposal'
import MsgVote from './gov/msgs/MsgVote'
import MsgTransfer from './ibc/msgs/MsgTransfer'
import MsgCreateInsuranceFund from './insurance/msgs/MsgCreateInsuranceFund'
import MsgRequestRedemption from './insurance/msgs/MsgRequestRedemption'
import MsgUnderwrite from './insurance/msgs/MsgUnderwrite'
import MsgSendToEth from './peggy/msgs/MsgSendToEth'
import MsgDelegate from './staking/msgs/MsgDelegate'
import MsgUndelegate from './staking/msgs/MsgUndelegate'
import MsgBeginRedelegate from './staking/msgs/MsgBeginRedelegate'
import MsgExecuteContract from './wasm/msgs/MsgExecuteContract'
import MsgExec from './wasm/msgs/MsgExec'

export type Msgs =
  | MsgBid
  | MsgGrant
  | MsgRevoke
  | MsgSend
  | MsgWithdrawDelegatorReward
  | MsgBatchCancelDerivativeOrders
  | MsgBatchCancelSpotOrders
  | MsgCancelDerivativeOrder
  | MsgCancelSpotOrder
  | MsgCreateDerivativeLimitOrder
  | MsgCreateDerivativeMarketOrder
  | MsgCreateSpotLimitOrder
  | MsgCreateSpotMarketOrder
  | MsgDeposit
  | MsgIncreasePositionMargin
  | MsgInstantSpotMarketLaunch
  | MsgWithdraw
  | MsgGovDeposit
  | MsgSubmitProposalExpiryFuturesMarketLaunch
  | MsgSubmitProposalPerpetualMarketLaunch
  | MsgSubmitProposalSpotMarketLaunch
  | MsgSubmitProposalSpotMarketParamUpdate
  | MsgSubmitTextProposal
  | MsgVote
  | MsgTransfer
  | MsgCreateInsuranceFund
  | MsgRequestRedemption
  | MsgUnderwrite
  | MsgSendToEth
  | MsgDelegate
  | MsgUndelegate
  | MsgBeginRedelegate
  | MsgExecuteContract
  | MsgExec

export type ExchangeMsgs =
  | MsgBatchCancelDerivativeOrders
  | MsgBatchCancelSpotOrders
  | MsgCancelDerivativeOrder
  | MsgCancelSpotOrder
  | MsgCreateDerivativeLimitOrder
  | MsgCreateDerivativeMarketOrder
  | MsgCreateSpotLimitOrder
  | MsgCreateSpotMarketOrder
  | MsgDeposit
  | MsgIncreasePositionMargin
  | MsgInstantSpotMarketLaunch
  | MsgWithdraw
  | MsgExec