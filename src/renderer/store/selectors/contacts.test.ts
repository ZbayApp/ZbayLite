import create from '../create'
import selectors from './contacts'
import testUtils, { createMessage } from '../../testUtils'

describe('operations selectors', () => {
  const [identity1, identity2] = testUtils.identities

  let store = null
  beforeEach(async () => {
    const message = await createMessage()
    const messages = [message]
    store = create({
      contacts: {
        [identity1.address]: {
          username: identity1.username,
          address: identity1.address,
          messages,
          lastSeen: testUtils.now,
          newMessages: [1, 2, 3, 4]
        },
        [identity2.address]: {
          username: identity2.username,
          address: identity2.address
        }
      },

      certificates: {
        usersCertificates: [
          'MIIBtjCCAVwCBgF6Urb0VDAKBggqhkjOPQQDAjASMRAwDgYDVQQDEwdaYmF5IENBMB4XDTIxMDYyODEzMDIzOVoXDTMwMTIzMTIzMDAwMFowgZcxgZQwFAYKKwYBBAGDjBsCARMGZGFtaWFuMD8GA1UEAxM4YXp2eTcybmV4NXZzeWd2NW1ma3M0c2YyN2pycWRoZXpueDIzYm1xeHE3YzdtajNibW5pc3hhaWQwOwYJKwYBAgEPAwEBEy5RbVpWZnhrNWpQb2tiVmlqODNhWVV4ZXRaeWF5bnZCVlRCaGZQUlBSM3hndVZLMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAErEDIPiIQsZ020N34a+KtVLURm+68lyq0T7eklOlE6G3matt9vLKadwM4pNzJRhRigO1W0MNH3uOrwG1o2UOOX6MdMBswDAYDVR0TBAUwAwIBAzALBgNVHQ8EBAMCAAYwCgYIKoZIzj0EAwIDSAAwRQIgAocVe47k6ok0wA9vFaMRUxiD7syVPh+d3YIKLHanj5UCIQCNiXIh8DKsfkSICqzG3LxWl15W5Rq7wVij1fdM6AXo7Q=='
        ],
        ownCertificate: {
          certificate:
            'MIIBtjCCAVwCBgF6Urb0VDAKBggqhkjOPQQDAjASMRAwDgYDVQQDEwdaYmF5IENBMB4XDTIxMDYyODEzMDIzOVoXDTMwMTIzMTIzMDAwMFowgZcxgZQwFAYKKwYBBAGDjBsCARMGZGFtaWFuMD8GA1UEAxM4YXp2eTcybmV4NXZzeWd2NW1ma3M0c2YyN2pycWRoZXpueDIzYm1xeHE3YzdtajNibW5pc3hhaWQwOwYJKwYBAgEPAwEBEy5RbVpWZnhrNWpQb2tiVmlqODNhWVV4ZXRaeWF5bnZCVlRCaGZQUlBSM3hndVZLMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAErEDIPiIQsZ020N34a+KtVLURm+68lyq0T7eklOlE6G3matt9vLKadwM4pNzJRhRigO1W0MNH3uOrwG1o2UOOX6MdMBswDAYDVR0TBAUwAwIBAzALBgNVHQ8EBAMCAAYwCgYIKoZIzj0EAwIDSAAwRQIgAocVe47k6ok0wA9vFaMRUxiD7syVPh+d3YIKLHanj5UCIQCNiXIh8DKsfkSICqzG3LxWl15W5Rq7wVij1fdM6AXo7Q==',
          privateKey:
            'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgUMBHFeLut2Tyr5T5hkEtnbh4vx1XSEx2fBTwv29FytagCgYIKoZIzj0DAQehRANCAASsQMg+IhCxnTbQ3fhr4q1UtRGb7ryXKrRPt6SU6UTobeZq2328spp3Azik3MlGFGKA7VbQw0fe46vAbWjZQ45f'
        }
      }
    })
    jest.clearAllMocks()
  })

  it(' - contacts', () => {
    expect(selectors.contacts(store.getState())).toMatchSnapshot()
  })

  it(' - contact', () => {
    expect(selectors.contact(identity1.address)(store.getState())).toMatchSnapshot()
  })

  it(' - messages', () => {
    expect(selectors.messages(identity1.address)(store.getState())).toMatchSnapshot()
  })
  it(' - newMessages', () => {
    expect(selectors.newMessages(identity1.address)(store.getState())).toMatchSnapshot()
  })

  it(' - lastSeen', () => {
    expect(selectors.lastSeen(identity1.address)(store.getState())).toMatchSnapshot()
  })

  it(' - direct messages', () => {
    expect(selectors.directMessages(identity1.address)(store.getState())).toMatchSnapshot()
  })
})
