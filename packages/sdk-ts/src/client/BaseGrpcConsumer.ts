import { grpc } from '@improbable-eng/grpc-web'
import { ReactNativeTransport } from '@improbable-eng/grpc-web-react-native-transport'
import { GrpcUnaryRequestException } from '@injectivelabs/exceptions'
import { isBrowser } from '../utils/helpers'
import { getGrpcTransport } from '../utils/grpc'

if (!isBrowser()) {
  grpc.setDefaultTransport(getGrpcTransport() as grpc.TransportFactory)
}

/**
 * @hidden
 */
export default class BaseGrpcConsumer {
  protected module: string = ''

  protected endpoint: string

  constructor(endpoint: string, options?: { RNTransport?: boolean }) {
    this.endpoint = endpoint

    if (options?.RNTransport) {
      grpc.setDefaultTransport(ReactNativeTransport({ withCredentials: true }))
    }
  }

  protected request<
    TRequest extends grpc.ProtobufMessage,
    TResponse extends grpc.ProtobufMessage,
    S extends grpc.UnaryMethodDefinition<TRequest, TResponse>,
  >(request: TRequest, service: S): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      grpc.unary(service, {
        request,
        host: this.endpoint,
        onEnd: (res) => {
          const { statusMessage, status, message } = res

          if (status === grpc.Code.OK && message) {
            return resolve(message as TResponse)
          }

          return reject(
            new GrpcUnaryRequestException(
              new Error(statusMessage || 'The request failed.'),
              {
                code: status,
                contextModule: this.module,
              },
            ),
          )
        },
      })
    })
  }
}
