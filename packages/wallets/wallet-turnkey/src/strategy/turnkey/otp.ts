import { TurnkeyIndexedDbClient } from '@turnkey/sdk-browser'
import {
  ErrorType,
  WalletException,
  UnspecifiedErrorCode,
} from '@injectivelabs/exceptions'
import {
  type TurnkeyConfirmEmailOTPResponse,
  type TurnkeyOTPCredentialsResponse,
} from './../types.js'
import { type HttpRestClient } from '@injectivelabs/utils'
import {
  DEFAULT_TURNKEY_REFRESH_SECONDS,
  TURNKEY_OTP_INIT_PATH,
  TURNKEY_OTP_VERIFY_PATH,
} from '../consts.js'

export class TurnkeyOtpWallet {
  static async initEmailOTP(args: {
    email: string
    subOrgId?: string
    otpInitPath?: string
    client: HttpRestClient
    indexedDbClient: TurnkeyIndexedDbClient
    invalidateExistingSessions?: boolean
  }) {
    const { client, indexedDbClient } = args
    const indexedDbPublicKey = await indexedDbClient.getPublicKey()

    try {
      const targetPublicKey = indexedDbPublicKey

      if (!targetPublicKey) {
        throw new WalletException(new Error('Target public key not found'))
      }

      // client.$post is undefined, resorting to this for now
      const response = await client.post<{
        data?: TurnkeyOTPCredentialsResponse
      }>(args.otpInitPath || TURNKEY_OTP_INIT_PATH, {
        targetPublicKey,
        email: args.email,
        suborgId: args.subOrgId,
        invalidateExistingSessions: args.invalidateExistingSessions,
      })

      return response?.data
    } catch (e: any) {
      throw new WalletException(new Error(e.message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: 'turnkey-init-email-otp',
      })
    }
  }

  static async confirmEmailOTP(args: {
    otpCode: string
    emailOTPId: string
    client: HttpRestClient
    organizationId: string
    indexedDbClient: TurnkeyIndexedDbClient
    otpVerifyPath?: string
    expirationSeconds?: number
  }) {
    const { client, indexedDbClient, expirationSeconds } = args

    try {
      const organizationId = args.organizationId
      const emailOTPId = args.emailOTPId
      const targetPublicKey = await indexedDbClient.getPublicKey()
      const otpVerifyPath = args.otpVerifyPath || TURNKEY_OTP_VERIFY_PATH

      if (!targetPublicKey) {
        throw new WalletException(new Error('Target public key not found'))
      }

      if (!emailOTPId) {
        throw new WalletException(new Error('Email OTP ID is required'))
      }

      if (!organizationId) {
        throw new WalletException(new Error('Organization ID is required'))
      }

      const response = await client.post<{
        data?: TurnkeyConfirmEmailOTPResponse
      }>(otpVerifyPath, {
        targetPublicKey,
        otpId: emailOTPId,
        otpCode: args.otpCode,
        suborgID: organizationId,
        expirationSeconds: (
          expirationSeconds || DEFAULT_TURNKEY_REFRESH_SECONDS
        )?.toString(),
      })

      return response?.data
    } catch (e: any) {
      throw new WalletException(new Error(e.message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: 'turnkey-confirm-email-otp',
      })
    }
  }
}
