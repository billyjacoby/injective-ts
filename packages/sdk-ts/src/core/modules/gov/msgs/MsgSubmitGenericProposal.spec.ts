import { BigNumberInBase } from '@injectivelabs/utils'
import MsgSubmitGenericProposal from './MsgSubmitGenericProposal.js'
import { mockFactory, prepareEip712 } from '@injectivelabs/utils/test-utils'
import {
  getEip712TypedData,
  getEip712TypedDataV2,
} from '../../../tx/eip712/eip712.js'
import { IndexerGrpcWeb3GwApi } from './../../../../client/indexer/grpc/IndexerGrpcWeb3GwApi.js'
import { EIP712Version } from '@injectivelabs/ts-types'
import { MsgSend } from '../../bank/index.js'

const params: MsgSubmitGenericProposal['params'] = {
  title: 'Test Proposal',
  summary: 'Test Summary',
  expedited: false,
  proposer: mockFactory.injectiveAddress,
  metadata: 'Test Metadata',
  messages: [
    MsgSend.fromJSON({
      srcInjectiveAddress: mockFactory.injectiveAddress,
      dstInjectiveAddress: mockFactory.injectiveAddress,
      amount: {
        amount: new BigNumberInBase(1).toFixed(),
        denom: 'inj',
      },
    }),
  ],
  deposit: {
    amount: new BigNumberInBase(1).toFixed(),
    denom: 'inj',
  },
}

const message = MsgSubmitGenericProposal.fromJSON(params)

describe('MsgSubmitGenericProposal', () => {
  describe('generates proper EIP712 compared to the Web3Gw (chain)', () => {
    const { endpoints, eip712Args, prepareEip712Request } = prepareEip712({
      messages: message,
    })

    it('EIP712 v1', async () => {
      const eip712TypedData = getEip712TypedData(eip712Args)

      const txResponse = await new IndexerGrpcWeb3GwApi(
        endpoints.indexer,
      ).prepareEip712Request({
        ...prepareEip712Request,
        eip712Version: EIP712Version.V1,
      })

      expect(eip712TypedData).toStrictEqual(JSON.parse(txResponse.data))
    })

    it('EIP712 v2', async () => {
      const eip712TypedData = getEip712TypedDataV2(eip712Args)

      const txResponse = await new IndexerGrpcWeb3GwApi(
        endpoints.indexer,
      ).prepareEip712Request({
        ...prepareEip712Request,
        eip712Version: EIP712Version.V2,
      })

      expect(eip712TypedData).toStrictEqual(JSON.parse(txResponse.data))
    })
  })
})
