import { call, apply, all, takeEvery, put } from 'typed-redux-saga'
import { PayloadAction } from '@reduxjs/toolkit'

import { certificatesActions } from './certificates.reducer'
import { createUserCsr } from '../../pkijs/generatePems/requestCertificate'
// import { createUserCert } from '../../pkijs/generatePems/generateUserCertificate'
// import { dataFromRootPems } from '../../../shared/static'
import electronStore from '../../../shared/electronStore'
import { registrationServiceAddress } from '../../../shared/static'

export function* responseGetCertificates(
  action: PayloadAction<ReturnType<typeof certificatesActions.responseGetCertificates>['payload']>
): Generator {
  const certificates = action.payload
  yield* put(certificatesActions.setUsersCertificates(certificates.certificates))
}

export const getDate = (date?: string) => date ? new Date(date) : new Date()

export function* createOwnCertificate(
  action: PayloadAction<ReturnType<typeof certificatesActions.createOwnCertificate>['payload']>
): Generator {
  interface HiddenServicesType {
    libp2pHiddenService?: {
      onionAddress: string
      privateKey: string
    }
  }

  const hiddenServices: HiddenServicesType = yield* apply(
    electronStore,
    electronStore.get,
    ['hiddenServices']
  )

  let peerIdAddress = yield* apply(electronStore, electronStore.get, ['peerId'])
  if (!peerIdAddress) {
    peerIdAddress = 'unknown'
  }

  const userData = {
    zbayNickname: action.payload,
    commonName: hiddenServices.libp2pHiddenService.onionAddress,
    peerId: peerIdAddress
  }

  console.log('Creating user csr', userData)

  const user = yield* call(createUserCsr, userData)

  console.log('After creating user csr')

  // sending csr
  yield put(
    certificatesActions.registerUserCertificate({
      serviceAddress: registrationServiceAddress,
      userCsr: user
    })
  )

  console.log('After registering csr')

  yield* put(certificatesActions.setOwnCertKey(user.userKey))
}

export function* certificatesSaga(): Generator {
  yield* all([
    takeEvery(certificatesActions.responseGetCertificates.type, responseGetCertificates),
    takeEvery(certificatesActions.createOwnCertificate.type, createOwnCertificate)
  ])
}
