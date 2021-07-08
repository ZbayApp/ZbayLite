import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export class CertificatesState {
  usersCertificates: string[] = ['']
  ownCertificate = {
    certificate: '',
    privateKey: ''
  }
  certificateRegistrationError: string  = ''
}

export const certificates = createSlice({
  initialState: { ...new CertificatesState() },
  name: 'Certificates',
  reducers: {
    setUsersCertificates: (state, action: PayloadAction<string[]>) => {
      state.usersCertificates = action.payload
    },
    setOwnCertificate: (state, action: PayloadAction<string>) => {
      state.ownCertificate.certificate = action.payload
    },
    setOwnCertKey: (state, action: PayloadAction<string>) => {
      state.ownCertificate.privateKey = action.payload
    },
    createOwnCertificate: (state, _action: PayloadAction<string>) => {
      return state
    },
    // saveCertificate: (state, _action: PayloadAction<string>) => {
    //   return state
    // },
    registerUserCertificate: (state, _action: PayloadAction<{serviceAddress: string, userCsr: any}>) => {
      return state
    },
    responseGetCertificates: (state, _action: PayloadAction<{ certificates: string[] }>) => {
      return state
    },
    setCertificateRegistrationError: (state, action: PayloadAction<string>) => {
      state.certificateRegistrationError = action.payload
    }
  }
})

export const certificatesActions = certificates.actions
export const certificatesReducer = certificates.reducer
