import type { Window as KeplrWindow } from '@keplr-wallet/types'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {
    leap: KeplrWindow['keplr']
    keplr: KeplrWindow['keplr']
    ninji: KeplrWindow['ninji']
    owallet?: KeplrWindow['owallet']
  }
}
