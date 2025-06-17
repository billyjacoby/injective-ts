import { grpc, getGrpcTransport } from '../../utils/grpc.js'
import { GrpcWebImpl } from './IndexerGrpcWebImpl.js'

/**
 * @hidden
 */
export default class BaseIndexerGrpcWebConsumer extends GrpcWebImpl {
  protected module: string = ''

  constructor(endpoint: string, metadata: Record<string, string> = {}) {
    const _metadata = new grpc.Metadata()

    Object.keys(metadata).forEach((key) => _metadata.set(key, metadata[key]))

    super(endpoint, { transport: getGrpcTransport(), metadata: _metadata })
  }
}

export const getGrpcIndexerWebImpl = (
  endpoint: string,
  metadata?: Record<string, string>,
) => new BaseIndexerGrpcWebConsumer(endpoint, metadata)
