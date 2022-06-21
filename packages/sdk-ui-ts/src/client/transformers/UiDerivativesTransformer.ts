import { BigNumber, BigNumberInBase } from '@injectivelabs/utils'
import { MarketType, Change } from '../types/common'
import { getDecimalsFromNumber } from '@injectivelabs/sdk-ts'
import {
  ExpiryFuturesMarketWithTokenAndSlug,
  PerpetualMarketWithTokenAndSlug,
  BinaryOptionsMarketWithTokenAndSlug,
  UiDerivativeMarketSummary,
  UiPerpetualMarketWithToken,
  UiExpiryFuturesMarketWithToken,
  UiBinaryOptionsMarketWithToken,
} from '../types/derivatives'
import { derivativeOrderTypeToGrpcOrderType } from '../../utils/derivatives'

export class UiDerivativeTransformer {
  static derivativeOrderTypeToGrpcOrderType = derivativeOrderTypeToGrpcOrderType

  static derivativeMarketToUiDerivativeMarket<
    T extends
      | PerpetualMarketWithTokenAndSlug
      | ExpiryFuturesMarketWithTokenAndSlug
      | BinaryOptionsMarketWithTokenAndSlug,
    R extends
      | UiPerpetualMarketWithToken
      | UiExpiryFuturesMarketWithToken
      | UiBinaryOptionsMarketWithToken,
  >(market: T, subType: MarketType): R {
    return {
      ...market,
      type: MarketType.Derivative,
      subType: subType,
      quantityDecimals: getDecimalsFromNumber(market.minQuantityTickSize),
      priceDecimals: getDecimalsFromNumber(
        new BigNumberInBase(market.minPriceTickSize)
          .toWei(-market.quoteToken.decimals)
          .toNumber(),
      ),
    } as unknown as R
  }

  static derivativeMarketSummaryToUiMarketSummary(
    oldSummary: UiDerivativeMarketSummary,
    newSummary: UiDerivativeMarketSummary,
  ): UiDerivativeMarketSummary {
    if (new BigNumber(oldSummary.price).eq(newSummary.price)) {
      return {
        ...newSummary,
        lastPrice: oldSummary.price,
        lastPriceChange: oldSummary.lastPriceChange || Change.NoChange,
      }
    }

    return {
      ...newSummary,
      lastPrice: oldSummary.price,
      lastPriceChange: new BigNumber(newSummary.price).gte(oldSummary.price)
        ? Change.Increase
        : Change.Decrease,
    }
  }

  static derivativeMarketsSummaryToUiMarketsSummary(
    oldSummaries: UiDerivativeMarketSummary[] = [],
    newSummaries: UiDerivativeMarketSummary[] = [],
  ): UiDerivativeMarketSummary[] {
    return oldSummaries.map((oldSummary) => {
      const newSummary = newSummaries.find(
        (m) => m.marketId === oldSummary.marketId,
      )

      // Sometimes, chronos returns zeros
      const actualNewSummary =
        newSummary && newSummary.price ? newSummary : oldSummary

      return UiDerivativeTransformer.derivativeMarketSummaryToUiMarketSummary(
        oldSummary,
        actualNewSummary,
      )
    })
  }

  static derivativeMarketsSummaryComparisons(
    newMarketSummary?: UiDerivativeMarketSummary[],
    oldMarketsSummary?: UiDerivativeMarketSummary[],
  ) {
    if (!oldMarketsSummary && !newMarketSummary) {
      return undefined
    }

    if (!newMarketSummary) {
      return oldMarketsSummary as UiDerivativeMarketSummary[]
    }

    if (!oldMarketsSummary) {
      return newMarketSummary
    }

    const marketsWithOldSummaries = oldMarketsSummary.filter((market) =>
      newMarketSummary.find((m) => m.marketId === market.marketId),
    )

    return UiDerivativeTransformer.derivativeMarketsSummaryToUiMarketsSummary(
      marketsWithOldSummaries,
      newMarketSummary,
    )
  }

  static perpetualMarketsToUiPerpetualMarkets(
    markets: Array<PerpetualMarketWithTokenAndSlug>,
  ): UiPerpetualMarketWithToken[] {
    return markets.map((m) =>
      UiDerivativeTransformer.derivativeMarketToUiDerivativeMarket(
        m,
        MarketType.Perpetual,
      ),
    )
  }

  static expiryFuturesMarketsToUiExpiryFuturesMarkets(
    markets: Array<ExpiryFuturesMarketWithTokenAndSlug>,
  ): UiExpiryFuturesMarketWithToken[] {
    return markets.map((m) =>
      UiDerivativeTransformer.derivativeMarketToUiDerivativeMarket(
        m,
        MarketType.Futures,
      ),
    )
  }

  static binaryOptionsMarketsToUiBinaryOptionsMarkets(
    markets: BinaryOptionsMarketWithTokenAndSlug[],
  ): UiBinaryOptionsMarketWithToken[] {
    return markets.map((m) =>
      UiDerivativeTransformer.derivativeMarketToUiDerivativeMarket(
        m,
        MarketType.BinaryOptions,
      ),
    )
  }
}