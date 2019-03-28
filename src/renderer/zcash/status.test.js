import { DateTime } from 'luxon'

import statusCreator from './status'

describe('jrpc', () => {
  const genesis = DateTime.utc(2018, 4, 4, 12, 0, 0)
  const bestBlockHash = 'best-block-test-hash'
  const genesisBlockHash = 'genesis-block-test-hash'
  const getbestblockhash = jest.fn(() => bestBlockHash)
  const getblockhash = jest.fn(() => genesisBlockHash)
  const getblock = jest.fn((hash) => {
    if (hash === genesisBlockHash) {
      return {
        time: genesis.toSeconds(),
        height: 0
      }
    } else {
      return {
        time: genesis.plus({ minutes: 40 }).toSeconds(),
        height: 40
      }
    }
  })

  const zcashClient = {
    request: {
      getblock,
      getbestblockhash,
      getblockhash,
      getinfo: jest.fn(() => ({
        connections: 12,
        blocks: 40
      }))
    }
  }

  const status = statusCreator(zcashClient)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns node info', async () => {
    jest.spyOn(DateTime, 'utc').mockImplementationOnce(() => genesis.plus({ hours: 1 }))
    const result = await status.info()
    expect(result).toMatchSnapshot()
  })

  it('takes offset into account when calculating status', async () => {
    jest.spyOn(DateTime, 'utc').mockImplementationOnce(() => genesis.plus({ minutes: 50 }))
    const result = await status.info()
    expect(result).toMatchSnapshot()
  })
})
