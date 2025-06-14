export enum EthereumChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  Injective = 888,
  Sepolia = 11155111,
  Ganache = 1337,
  HardHat = 31337,
}

export enum ChainId {
  Mainnet = 'injective-1',
  Testnet = 'injective-888',
  Devnet = 'injective-777',
}

export enum MsgType {
  // Authz
  MsgExec = 'cosmos.authz.v1beta1.MsgExec',
  MsgGrant = 'cosmos.authz.v1beta1.MsgGrant',
  MsgRevoke = 'cosmos.authz.v1beta1.MsgRevoke',

  // Bank
  MsgSend = 'cosmos.bank.v1beta1.MsgSend',
  MsgMultiSend = 'cosmos.bank.v1beta1.MsgMultiSend',

  // Distribution
  MsgSetWithdrawAddress = 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
  MsgWithdrawDelegatorReward = 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  MsgWithdrawValidatorCommission = 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',

  // Feegrant
  MsgGrantAllowance = 'cosmos.feegrant.v1beta1.MsgGrantAllowance',
  MsgRevokeAllowance = 'cosmos.feegrant.v1beta1.MsgRevokeAllowance',

  // Governance
  MsgVote = 'cosmos.gov.v1beta1.MsgVote',
  MsgDepositCosmos = 'cosmos.gov.v1beta1.MsgDeposit',
  MsgSubmitProposal = 'cosmos.gov.v1beta1.MsgSubmitProposal',

  // Slashing
  MsgUnjail = 'cosmos.slashing.v1beta1.MsgUnjail',

  // Staking
  MsgDelegate = 'cosmos.staking.v1beta1.MsgDelegate',
  MsgUndelegate = 'cosmos.staking.v1beta1.MsgUndelegate',
  MsgEditValidator = 'cosmos.staking.v1beta1.MsgEditValidator',
  MsgBeginRedelegate = 'cosmos.staking.v1beta1.MsgBeginRedelegate',
  MsgCreateValidator = 'cosmos.staking.v1beta1.MsgCreateValidator',
  MsgCancelUnbondingDelegation = 'cosmos.staking.v1beta1.MsgCancelUnbondingDelegation',

  MsgStoreCode = 'cosmwasm.wasm.v1.MsgStoreCode',
  MsgUpdateAdmin = 'cosmwasm.wasm.v1.MsgUpdateAdmin',
  MsgExecuteContract = 'cosmwasm.wasm.v1.MsgExecuteContract',
  MsgMigrateContract = 'cosmwasm.wasm.v1.MsgMigrateContract',
  MsgInstantiateContract = 'cosmwasm.wasm.v1.MsgInstantiateContract',
  MsgInstantiateContract2 = 'cosmwasm.wasm.v1.MsgInstantiateContract2',

  // Transfer
  MsgTransfer = 'ibc.applications.transfer.v1.MsgTransfer',

  // Channel
  MsgTimeout = 'ibc.core.channel.v1.MsgTimeout',
  MsgRecvPacket = 'ibc.core.channel.v1.MsgRecvPacket',
  MsgChannelOpenAck = 'ibc.core.channel.v1.MsgChannelOpenAck',
  MsgChannelOpenTry = 'ibc.core.channel.v1.MsgChannelOpenTry',
  MsgAcknowledgement = 'ibc.core.channel.v1.MsgAcknowledgement',
  MsgChannelOpenInit = 'ibc.core.channel.v1.MsgChannelOpenInit',
  MsgChannelOpenConfirm = 'ibc.core.channel.v1.MsgChannelOpenConfirm',

  // Client
  MsgCreateClient = 'ibc.core.client.v1.MsgCreateClient',
  MsgUpdateClient = 'ibc.core.client.v1.MsgUpdateClient',

  // Connection
  MsgConnectionOpenAck = 'ibc.core.connection.v1.MsgConnectionOpenAck',
  MsgConnectionOpenTry = 'ibc.core.connection.v1.MsgConnectionOpenTry',
  MsgConnectionOpenInit = 'ibc.core.connection.v1.MsgConnectionOpenInit',
  MsgConnectionOpenConfirm = 'ibc.core.connection.v1.MsgConnectionOpenConfirm',

  // Auction
  MsgBid = 'injective.auction.v1beta1.MsgBid',
  MsgAuctionUpdateParams = 'injective.auction.v1beta1.MsgUpdateParams',

  // ERC20
  MsgErc20UpdateParams = 'injective.erc20.v1beta1.MsgUpdateParams',
  MsgCreateTokenPair = 'injective.erc20.v1beta1.MsgCreateTokenPair',
  MsgDeleteTokenPair = 'injective.erc20.v1beta1.MsgDeleteTokenPair',

  // EVM
  LegacyTx = 'injective.evm.v1.LegacyTx',
  AccessListTx = 'injective.evm.v1.AccessListTx',
  DynamicFeeTx = 'injective.evm.v1.DynamicFeeTx',
  MsgEthereumTx = 'injective.evm.v1.MsgEthereumTx',
  MsgEvmUpdateParams = 'injective.evm.v1.MsgUpdateParams',
  ExtensionOptionsEthereumTx = 'injective.evm.v1.ExtensionOptionsEthereumTx',

  // Exchange
  OrderData = 'injective.exchange.v1beta1.OrderData',
  MsgDeposit = 'injective.exchange.v1beta1.MsgDeposit',
  MsgSignDoc = 'injective.exchange.v1beta1.MsgSignDoc',
  MsgSignData = 'injective.exchange.v1beta1.MsgSignData',
  MsgWithdraw = 'injective.exchange.v1beta1.MsgWithdraw',
  MsgRewardsOptOut = 'injective.exchange.v1beta1.MsgRewardsOptOut',
  MsgCancelSpotOrder = 'injective.exchange.v1beta1.MsgCancelSpotOrder',
  MsgExchangeUpdateParams = 'injective.exchange.v1beta1.MsgUpdateParams',
  MsgExternalTransfer = 'injective.exchange.v1beta1.MsgExternalTransfer',
  MsgUpdateSpotMarket = 'injective.exchange.v1beta1.MsgUpdateSpotMarket',
  MsgBatchUpdateOrders = 'injective.exchange.v1beta1.MsgBatchUpdateOrders',
  MsgLiquidatePosition = 'injective.exchange.v1beta1.MsgLiquidatePosition',
  MsgActivateStakeGrant = 'injective.exchange.v1beta1.MsgActivateStakeGrant',
  MsgReclaimLockedFunds = 'injective.exchange.v1beta1.MsgReclaimLockedFunds',
  MsgSubaccountTransfer = 'injective.exchange.v1beta1.MsgSubaccountTransfer',
  SpotMarketOrderResults = 'injective.exchange.v1beta1.SpotMarketOrderResults',
  MsgAuthorizeStakeGrants = 'injective.exchange.v1beta1.MsgAuthorizeStakeGrants',
  MsgCreateSpotLimitOrder = 'injective.exchange.v1beta1.MsgCreateSpotLimitOrder',
  MsgBatchCancelSpotOrders = 'injective.exchange.v1beta1.MsgBatchCancelSpotOrders',
  MsgCancelDerivativeOrder = 'injective.exchange.v1beta1.MsgCancelDerivativeOrder',
  MsgCreateSpotMarketOrder = 'injective.exchange.v1beta1.MsgCreateSpotMarketOrder',
  MsgEmergencySettleMarket = 'injective.exchange.v1beta1.MsgEmergencySettleMarket',
  MsgDecreasePositionMargin = 'injective.exchange.v1beta1.MsgDecreasePositionMargin',
  MsgIncreasePositionMargin = 'injective.exchange.v1beta1.MsgIncreasePositionMargin',
  MsgUpdateDerivativeMarket = 'injective.exchange.v1beta1.MsgUpdateDerivativeMarket',
  MsgInstantSpotMarketLaunch = 'injective.exchange.v1beta1.MsgInstantSpotMarketLaunch',
  MsgCancelBinaryOptionsOrder = 'injective.exchange.v1beta1.MsgCancelBinaryOptionsOrder',
  DerivativeMarketOrderResults = 'injective.exchange.v1beta1.DerivativeMarketOrderResults',
  MsgBatchExchangeModification = 'injective.exchange.v1beta1.MsgBatchExchangeModification',
  MsgPrivilegedExecuteContract = 'injective.exchange.v1beta1.MsgPrivilegedExecuteContract',
  MsgBatchCreateSpotLimitOrders = 'injective.exchange.v1beta1.MsgBatchCreateSpotLimitOrders',
  MsgCreateDerivativeLimitOrder = 'injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder',
  MsgBatchCancelDerivativeOrders = 'injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders',
  MsgCreateDerivativeMarketOrder = 'injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder',
  MsgInstantPerpetualMarketLaunch = 'injective.exchange.v1beta1.MsgInstantPerpetualMarketLaunch',
  MsgCreateBinaryOptionsLimitOrder = 'injective.exchange.v1beta1.MsgCreateBinaryOptionsLimitOrder',
  MsgAdminUpdateBinaryOptionsMarket = 'injective.exchange.v1beta1.MsgAdminUpdateBinaryOptionsMarket',
  MsgBatchCancelBinaryOptionsOrders = 'injective.exchange.v1beta1.MsgBatchCancelBinaryOptionsOrders',
  MsgCreateBinaryOptionsMarketOrder = 'injective.exchange.v1beta1.MsgCreateBinaryOptionsMarketOrder',
  MsgInstantExpiryFuturesMarketLaunch = 'injective.exchange.v1beta1.MsgInstantExpiryFuturesMarketLaunch',
  MsgBatchCreateDerivativeLimitOrders = 'injective.exchange.v1beta1.MsgBatchCreateDerivativeLimitOrders',
  MsgInstantBinaryOptionsMarketLaunch = 'injective.exchange.v1beta1.MsgInstantBinaryOptionsMarketLaunch',

  // Exchange V2
  OrderDataV2 = 'injective.exchange.v2.OrderData',
  MsgDepositV2 = 'injective.exchange.v2.MsgDeposit',
  MsgSignDocV2 = 'injective.exchange.v2.MsgSignDoc',
  MsgSignDataV2 = 'injective.exchange.v2.MsgSignData',
  MsgWithdrawV2 = 'injective.exchange.v2.MsgWithdraw',
  MsgFeeDiscountV2 = 'injective.exchange.v2.MsgFeeDiscount',
  MsgUpdateParamsV2 = 'injective.exchange.v2.MsgUpdateParams',
  MsgRewardsOptOutV2 = 'injective.exchange.v2.MsgRewardsOptOut',
  MsgExchangeEnableV2 = 'injective.exchange.v2.MsgExchangeEnable',
  MsgCancelSpotOrderV2 = 'injective.exchange.v2.MsgCancelSpotOrder',
  MsgExternalTransferV2 = 'injective.exchange.v2.MsgExternalTransfer',
  MsgSpotMarketLaunchV2 = 'injective.exchange.v2.MsgSpotMarketLaunch',
  MsgUpdateSpotMarketV2 = 'injective.exchange.v2.MsgUpdateSpotMarket',
  MsgBatchUpdateOrdersV2 = 'injective.exchange.v2.MsgBatchUpdateOrders',
  MsgLiquidatePositionV2 = 'injective.exchange.v2.MsgLiquidatePosition',
  MsgActivateStakeGrantV2 = 'injective.exchange.v2.MsgActivateStakeGrant',
  MsgReclaimLockedFundsV2 = 'injective.exchange.v2.MsgReclaimLockedFunds',
  MsgSubaccountTransferV2 = 'injective.exchange.v2.MsgSubaccountTransfer',
  SpotMarketOrderResultsV2 = 'injective.exchange.v2.SpotMarketOrderResults',
  MsgAuthorizeStakeGrantsV2 = 'injective.exchange.v2.MsgAuthorizeStakeGrants',
  MsgCreateSpotLimitOrderV2 = 'injective.exchange.v2.MsgCreateSpotLimitOrder',
  MsgBatchCancelSpotOrdersV2 = 'injective.exchange.v2.MsgBatchCancelSpotOrders',
  MsgCancelDerivativeOrderV2 = 'injective.exchange.v2.MsgCancelDerivativeOrder',
  MsgCreateSpotMarketOrderV2 = 'injective.exchange.v2.MsgCreateSpotMarketOrder',
  MsgEmergencySettleMarketV2 = 'injective.exchange.v2.MsgEmergencySettleMarket',
  MsgPerpetualMarketLaunchV2 = 'injective.exchange.v2.MsgPerpetualMarketLaunch',
  MsgSpotMarketParamUpdateV2 = 'injective.exchange.v2.MsgSpotMarketParamUpdate',
  MsgDecreasePositionMarginV2 = 'injective.exchange.v2.MsgDecreasePositionMargin',
  MsgIncreasePositionMarginV2 = 'injective.exchange.v2.MsgIncreasePositionMargin',
  MsgMarketForcedSettlementV2 = 'injective.exchange.v2.MsgMarketForcedSettlement',
  MsgUpdateDerivativeMarketV2 = 'injective.exchange.v2.MsgUpdateDerivativeMarket',
  MsgBatchCommunityPoolSpendV2 = 'injective.exchange.v2.MsgBatchCommunityPoolSpend',
  MsgInstantSpotMarketLaunchV2 = 'injective.exchange.v2.MsgInstantSpotMarketLaunch',
  MsgCancelBinaryOptionsOrderV2 = 'injective.exchange.v2.MsgCancelBinaryOptionsOrder',
  DerivativeMarketOrderResultsV2 = 'injective.exchange.v2.DerivativeMarketOrderResults',
  MsgBatchExchangeModificationV2 = 'injective.exchange.v2.MsgBatchExchangeModification',
  MsgBinaryOptionsMarketLaunchV2 = 'injective.exchange.v2.MsgBinaryOptionsMarketLaunch',
  MsgExpiryFuturesMarketLaunchV2 = 'injective.exchange.v2.MsgExpiryFuturesMarketLaunch',
  MsgPrivilegedExecuteContractV2 = 'injective.exchange.v2.MsgPrivilegedExecuteContract',
  MsgBatchCreateSpotLimitOrdersV2 = 'injective.exchange.v2.MsgBatchCreateSpotLimitOrders',
  MsgCreateDerivativeLimitOrderV2 = 'injective.exchange.v2.MsgCreateDerivativeLimitOrder',
  MsgBatchCancelDerivativeOrdersV2 = 'injective.exchange.v2.MsgBatchCancelDerivativeOrders',
  MsgCreateDerivativeMarketOrderV2 = 'injective.exchange.v2.MsgCreateDerivativeMarketOrder',
  MsgDerivativeMarketParamUpdateV2 = 'injective.exchange.v2.MsgDerivativeMarketParamUpdate',
  MsgTradingRewardCampaignLaunchV2 = 'injective.exchange.v2.MsgTradingRewardCampaignLaunch',
  MsgTradingRewardCampaignUpdateV2 = 'injective.exchange.v2.MsgTradingRewardCampaignUpdate',
  MsgInstantPerpetualMarketLaunchV2 = 'injective.exchange.v2.MsgInstantPerpetualMarketLaunch',
  MsgCreateBinaryOptionsLimitOrderV2 = 'injective.exchange.v2.MsgCreateBinaryOptionsLimitOrder',
  MsgAdminUpdateBinaryOptionsMarketV2 = 'injective.exchange.v2.MsgAdminUpdateBinaryOptionsMarket',
  MsgBatchCancelBinaryOptionsOrdersV2 = 'injective.exchange.v2.MsgBatchCancelBinaryOptionsOrders',
  MsgBinaryOptionsMarketParamUpdateV2 = 'injective.exchange.v2.MsgBinaryOptionsMarketParamUpdate',
  MsgCreateBinaryOptionsMarketOrderV2 = 'injective.exchange.v2.MsgCreateBinaryOptionsMarketOrder',
  MsgBatchCreateDerivativeLimitOrdersV2 = 'injective.exchange.v2.MsgBatchCreateDerivativeLimitOrders',
  MsgInstantBinaryOptionsMarketLaunchV2 = 'injective.exchange.v2.MsgInstantBinaryOptionsMarketLaunch',
  MsgInstantExpiryFuturesMarketLaunchV2 = 'injective.exchange.v2.MsgInstantExpiryFuturesMarketLaunch',
  MsgTradingRewardPendingPointsUpdateV2 = 'injective.exchange.v2.MsgTradingRewardPendingPointsUpdate',
  MsgAtomicMarketOrderFeeMultiplierScheduleV2 = 'injective.exchange.v2.MsgAtomicMarketOrderFeeMultiplierSchedule',

  // Insurance
  MsgUnderwrite = 'injective.insurance.v1beta1.MsgUnderwrite',
  MsgInsuranceUpdateParams = 'injective.insurance.v1beta1.MsgUpdateParams',
  MsgRequestRedemption = 'injective.insurance.v1beta1.MsgRequestRedemption',
  MsgCreateInsuranceFund = 'injective.insurance.v1beta1.MsgCreateInsuranceFund',

  // Oracle
  MsgRelayBandRates = 'injective.oracle.v1beta1.MsgRelayBandRates',
  MsgRelayPythPrices = 'injective.oracle.v1beta1.MsgRelayPythPrices',
  MsgOracleUpdateParams = 'injective.oracle.v1beta1.MsgUpdateParams',
  MsgRelayStorkPrices = 'injective.oracle.v1beta1.MsgRelayStorkPrices',
  MsgRelayProviderPrices = 'injective.oracle.v1beta1.MsgRelayProviderPrices',
  MsgRelayPriceFeedPrice = 'injective.oracle.v1beta1.MsgRelayPriceFeedPrice',
  MsgRequestBandIBCRates = 'injective.oracle.v1beta1.MsgRequestBandIBCRates',
  MsgRelayCoinbaseMessages = 'injective.oracle.v1beta1.MsgRelayCoinbaseMessages',

  // OCR
  MsgTransmit = 'injective.ocr.v1beta1.MsgTransmit',
  MsgSetPayees = 'injective.ocr.v1beta1.MsgSetPayees',
  MsgCreateFeed = 'injective.ocr.v1beta1.MsgCreateFeed',
  MsgUpdateFeed = 'injective.ocr.v1beta1.MsgUpdateFeed',
  MsgOcrUpdateParams = 'injective.ocr.v1beta1.MsgUpdateParams',
  MsgAcceptPayeeship = 'injective.ocr.v1beta1.MsgAcceptPayeeship',
  MsgTransferPayeeship = 'injective.ocr.v1beta1.MsgTransferPayeeship',
  MsgFundFeedRewardPool = 'injective.ocr.v1beta1.MsgFundFeedRewardPool',
  MsgWithdrawFeedRewardPool = 'injective.ocr.v1beta1.MsgWithdrawFeedRewardPool',

  // Peggy (Bridge)
  MsgSendToEth = 'injective.peggy.v1.MsgSendToEth',
  MsgConfirmBatch = 'injective.peggy.v1.MsgConfirmBatch',
  MsgDepositClaim = 'injective.peggy.v1.MsgDepositClaim',
  MsgRequestBatch = 'injective.peggy.v1.MsgRequestBatch',
  MsgValsetConfirm = 'injective.peggy.v1.MsgValsetConfirm',
  MsgWithdrawClaim = 'injective.peggy.v1.MsgWithdrawClaim',
  MsgERC20DeployedClaim = 'injective.peggy.v1.MsgERC20DeployedClaim',
  MsgValsetUpdatedClaim = 'injective.peggy.v1.MsgValsetUpdatedClaim',
  MsgRevokeEthereumBlacklist = 'injective.peggy.v1.MsgRevokeEthereumBlacklist',
  MsgSetOrchestratorAddresses = 'injective.peggy.v1.MsgSetOrchestratorAddresses',
  MsgBlacklistEthereumAddresses = 'injective.peggy.v1.MsgBlacklistEthereumAddresses',

  // Permissions
  MsgClaimVoucher = 'injective.permissions.v1beta1.MsgClaimVoucher',
  MsgCreateNamespace = 'injective.permissions.v1beta1.MsgCreateNamespace',
  MsgDeleteNamespace = 'injective.permissions.v1beta1.MsgDeleteNamespace',
  MsgUpdateNamespace = 'injective.permissions.v1beta1.MsgUpdateNamespace',
  MsgUpdateActorRoles = 'injective.permissions.v1beta1.MsgUpdateActorRoles',
  MsgPermissionsUpdateParams = 'injective.permissions.v1beta1.MsgUpdateParams',
  MsgUpdateNamespaceRoles = 'injective.permissions.v1beta1.MsgUpdateNamespaceRoles',
  MsgRevokeNamespaceRoles = 'injective.permissions.v1beta1.MsgRevokeNamespaceRoles',
  MsgSetWasmHook = 'injective.permissions.v1beta1.MsgUpdateNamespace.MsgSetWasmHook',
  MsgSetMintsPaused = 'injective.permissions.v1beta1.MsgUpdateNamespace.MsgSetMintsPaused',
  MsgSetSendsPaused = 'injective.permissions.v1beta1.MsgUpdateNamespace.MsgSetSendsPaused',
  MsgSetBurnsPaused = 'injective.permissions.v1beta1.MsgUpdateNamespace.MsgSetBurnsPaused',
  MsgUpdateNamespaceSetContractHook = 'injective.permissions.v1beta1.MsgUpdateNamespace.SetContractHook',

  // TokenFactory
  MsgBurn = 'injective.tokenfactory.v1beta1.MsgBurn',
  MsgMint = 'injective.tokenfactory.v1beta1.MsgMint',
  MsgCreateDenom = 'injective.tokenfactory.v1beta1.MsgCreateDenom',
  MsgChangeAdmin = 'injective.tokenfactory.v1beta1.MsgChangeAdmin',
  MsgSetDenomMetadata = 'injective.tokenfactory.v1beta1.MsgSetDenomMetadata',
  MsgTokenFactoryUpdateParams = 'injective.tokenfactory.v1beta1.MsgUpdateParams',
  MsgSetDenomMetadataAdminBurnDisabled = 'injective.tokenfactory.v1beta1.MsgSetDenomMetadata.AdminBurnDisabled',

  // Wasmx
  MsgUpdateContract = 'injective.wasmx.v1.MsgUpdateContract',
  MsgWasmxUpdateParams = 'injective.wasmx.v1.MsgUpdateParams',
  MsgActivateContract = 'injective.wasmx.v1.MsgActivateContract',
  MsgRegisterContract = 'injective.wasmx.v1.MsgRegisterContract',
  MsgDeactivateContract = 'injective.wasmx.v1.MsgDeactivateContract',
  MsgExecuteContractCompat = 'injective.wasmx.v1.MsgExecuteContractCompat',

  // TxFees
  MsgTxFeesUpdateParams = 'injective.txfees.v1beta1.MsgUpdateParams',
}

export enum MsgStatus {
  Success = 'success',
  Fail = 'fail',
}

export enum EIP712Version {
  V1 = 'v1',
  V2 = 'v2',
}
