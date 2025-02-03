export enum EthereumChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  Sepolia = 11155111,
  Injective = 888,
  Ganache = 1337,
  HardHat = 31337,
}

export enum ChainId {
  Mainnet = 'injective-1',
  Testnet = 'injective-888',
  Devnet = 'injective-777',
}

export enum MsgType {
  MsgExec = 'cosmos.authz.v1beta1.MsgExec',
  MsgGrant = 'cosmos.authz.v1beta1.MsgGrant',
  MsgRevoke = 'cosmos.authz.v1beta1.MsgRevoke',
  MsgSend = 'cosmos.bank.v1beta1.MsgSend',
  MsgWithdrawDelegatorReward = 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  MsgGrantAllowance = 'cosmos.feegrant.v1beta1.MsgGrantAllowance',
  MsgRevokeAllowance = 'cosmos.feegrant.v1beta1.MsgRevokeAllowance',
  MsgDepositCosmos = 'cosmos.gov.v1beta1.MsgDeposit',
  MsgSubmitProposal = 'cosmos.gov.v1beta1.MsgSubmitProposal',
  MsgVote = 'cosmos.gov.v1beta1.MsgVote',
  MsgUnjail = 'cosmos.slashing.v1beta1.MsgUnjail',
  MsgBeginRedelegate = 'cosmos.staking.v1beta1.MsgBeginRedelegate',
  MsgCreateValidator = 'cosmos.staking.v1beta1.MsgCreateValidator',
  MsgDelegate = 'cosmos.staking.v1beta1.MsgDelegate',
  MsgEditValidator = 'cosmos.staking.v1beta1.MsgEditValidator',
  MsgUndelegate = 'cosmos.staking.v1beta1.MsgUndelegate',
  MsgCancelUnbondingDelegation = 'cosmos.staking.v1beta1.MsgCancelUnbondingDelegation',
  MsgExecuteContract = 'cosmwasm.wasm.v1.MsgExecuteContract',
  MsgInstantiateContract = 'cosmwasm.wasm.v1.MsgInstantiateContract',
  MsgInstantiateContract2 = 'cosmwasm.wasm.v1.MsgInstantiateContract2',
  MsgMigrateContract = 'cosmwasm.wasm.v1.MsgMigrateContract',
  MsgStoreCode = 'cosmwasm.wasm.v1.MsgStoreCode',
  MsgUpdateAdmin = 'cosmwasm.wasm.v1.MsgUpdateAdmin',
  MsgTransfer = 'ibc.applications.transfer.v1.MsgTransfer',
  MsgAcknowledgement = 'ibc.core.channel.v1.MsgAcknowledgement',
  MsgChannelOpenAck = 'ibc.core.channel.v1.MsgChannelOpenAck',
  MsgChannelOpenConfirm = 'ibc.core.channel.v1.MsgChannelOpenConfirm',
  MsgChannelOpenInit = 'ibc.core.channel.v1.MsgChannelOpenInit',
  MsgChannelOpenTry = 'ibc.core.channel.v1.MsgChannelOpenTry',
  MsgRecvPacket = 'ibc.core.channel.v1.MsgRecvPacket',
  MsgTimeout = 'ibc.core.channel.v1.MsgTimeout',
  MsgCreateClient = 'ibc.core.client.v1.MsgCreateClient',
  MsgUpdateClient = 'ibc.core.client.v1.MsgUpdateClient',
  MsgConnectionOpenAck = 'ibc.core.connection.v1.MsgConnectionOpenAck',
  MsgConnectionOpenConfirm = 'ibc.core.connection.v1.MsgConnectionOpenConfirm',
  MsgConnectionOpenInit = 'ibc.core.connection.v1.MsgConnectionOpenInit',
  MsgConnectionOpenTry = 'ibc.core.connection.v1.MsgConnectionOpenTry',
  MsgBid = 'injective.auction.v1beta1.MsgBid',
  MsgAdminUpdateBinaryOptionsMarket = 'injective.exchange.v1beta1.MsgAdminUpdateBinaryOptionsMarket',
  MsgBatchCancelDerivativeOrders = 'injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders',
  MsgBatchCancelSpotOrders = 'injective.exchange.v1beta1.MsgBatchCancelSpotOrders',
  MsgBatchCreateDerivativeLimitOrders = 'injective.exchange.v1beta1.MsgBatchCreateDerivativeLimitOrders',
  MsgBatchCreateSpotLimitOrders = 'injective.exchange.v1beta1.MsgBatchCreateSpotLimitOrders',
  MsgBatchUpdateOrders = 'injective.exchange.v1beta1.MsgBatchUpdateOrders',
  MsgCancelBinaryOptionsOrder = 'injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder',
  MsgCancelDerivativeOrder = 'injective.exchange.v1beta1.MsgCancelDerivativeOrder',
  MsgCancelSpotOrder = 'injective.exchange.v1beta1.MsgCancelSpotOrder',
  MsgCreateBinaryOptionsLimitOrder = 'injective.exchange.v1beta1.MsgCreateBinaryOptionsLimitOrder',
  MsgCreateBinaryOptionsMarketOrder = 'injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder',
  MsgCreateDerivativeLimitOrder = 'injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder',
  MsgCreateDerivativeMarketOrder = 'injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder',
  MsgLiquidatePosition = 'injective.exchange.v1beta1.MsgLiquidatePosition',
  MsgCreateSpotLimitOrder = 'injective.exchange.v1beta1.MsgCreateSpotLimitOrder',
  MsgCreateSpotMarketOrder = 'injective.exchange.v1beta1.MsgCreateSpotMarketOrder',
  MsgDeposit = 'injective.exchange.v1beta1.MsgDeposit',
  MsgExternalTransfer = 'injective.exchange.v1beta1.MsgExternalTransfer',
  MsgIncreasePositionMargin = 'injective.exchange.v1beta1.MsgIncreasePositionMargin',
  MsgInstantBinaryOptionsMarketLaunch = 'injective.exchange.v1beta1.MsgInstantBinaryOptionsMarketLaunch',
  MsgInstantPerpetualMarketLaunch = 'injective.exchange.v1beta1.MsgInstantPerpetualMarketLaunch',
  MsgInstantSpotMarketLaunch = 'injective.exchange.v1beta1.MsgInstantSpotMarketLaunch',
  MsgReclaimLockedFunds = 'injective.exchange.v1beta1.MsgReclaimLockedFunds',
  MsgRewardsOptOut = 'injective.exchange.v1beta1.MsgRewardsOptOut',
  MsgSubaccountTransfer = 'injective.exchange.v1beta1.MsgSubaccountTransfer',
  MsgWithdraw = 'injective.exchange.v1beta1.MsgWithdraw',
  MsgCreateInsuranceFund = 'injective.insurance.v1beta1.MsgCreateInsuranceFund',
  MsgRequestRedemption = 'injective.insurance.v1beta1.MsgRequestRedemption',
  MsgUnderwrite = 'injective.insurance.v1beta1.MsgUnderwrite',
  MsgConfirmBatch = 'injective.peggy.v1.MsgConfirmBatch',
  MsgDepositClaim = 'injective.peggy.v1.MsgDepositClaim',
  MsgERC20DeployedClaim = 'injective.peggy.v1.MsgERC20DeployedClaim',
  MsgRequestBatch = 'injective.peggy.v1.MsgRequestBatch',
  MsgSendToEth = 'injective.peggy.v1.MsgSendToEth',
  MsgSetOrchestratorAddresses = 'injective.peggy.v1.MsgSetOrchestratorAddresses',
  MsgValsetConfirm = 'injective.peggy.v1.MsgValsetConfirm',
  MsgValsetUpdatedClaim = 'injective.peggy.v1.MsgValsetUpdatedClaim',
  MsgWithdrawClaim = 'injective.peggy.v1.MsgWithdrawClaim',
  MsgBlacklistEthereumAddresses = 'injective.peggy.v1.MsgBlacklistEthereumAddresses',
  MsgRevokeEthereumBlacklist = 'injective.peggy.v1.MsgRevokeEthereumBlacklist',
  MsgBurn = 'injective.tokenfactory.v1beta1.MsgBurn',
  MsgMint = 'injective.tokenfactory.v1beta1.MsgMint',
  MsgCreateDenom = 'injective.tokenfactory.v1beta1.MsgCreateDenom',
  MsgExecuteContractCompat = 'injective.wasmx.v1.MsgExecuteContractCompat',
  MsgPrivilegedExecuteContract = 'injective.exchange.v1beta1.MsgPrivilegedExecuteContract',
  MsgRelayProviderPrices = 'injective.oracle.v1beta1.MsgRelayProviderPrices',
  MsgMultiSend = 'cosmos.bank.v1beta1.MsgMultiSend',
  MsgSetWithdrawAddress = 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
  MsgWithdrawValidatorCommission = 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
}

export enum MsgStatus {
  Success = 'success',
  Fail = 'fail',
}
