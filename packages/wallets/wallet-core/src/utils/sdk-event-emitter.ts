// note: soon to decide for the removal of this file
import { EventEmitter } from 'events'

type SdkEvents = {
  'transaction-signed': Record<string, any>
  'transaction-fail': Record<string, any>
}

class TypedEventEmitter extends EventEmitter {
  emit<key extends keyof SdkEvents>(
    event: key,
    payload?: SdkEvents[key],
  ): boolean {
    return super.emit(event, payload)
  }

  on<key extends keyof SdkEvents>(
    event: key,
    listener: (payload?: SdkEvents[key]) => void,
  ): this {
    return super.on(event, listener)
  }

  off<key extends keyof SdkEvents>(
    event: key,
    listener: (payload?: SdkEvents[key]) => void,
  ): this {
    return super.off(event, listener)
  }
}

export class SdkEventEmitter {
  private static instance: TypedEventEmitter

  static getInstance(): TypedEventEmitter {
    if (!SdkEventEmitter.instance) {
      SdkEventEmitter.instance = new TypedEventEmitter()
    }

    return SdkEventEmitter.instance
  }
}
