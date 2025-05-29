import { ConcreteException } from '../base.js'
import { ErrorContext, ErrorType } from '../types/index.js'
import { mapMetamaskMessage } from '../utils/maps.js'

const removeMetamaskFromErrorString = (message: string): string =>
  message
    .replaceAll('Rainbow', '')
    .replaceAll('RainBow', '')
    .replaceAll('Rainbow:', '')

export class RainbowWalletException extends ConcreteException {
  public static errorClass: string = 'RainbowWalletException'

  constructor(error: Error, context?: ErrorContext) {
    super(error, context)

    this.type = ErrorType.WalletError
  }

  public parse(): void {
    const { message } = this

    this.setMessage(mapMetamaskMessage(removeMetamaskFromErrorString(message)))

    this.setName(RainbowWalletException.errorClass)
  }
}
