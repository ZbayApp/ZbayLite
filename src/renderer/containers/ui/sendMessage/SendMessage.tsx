import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { withModal, actionCreators } from '../../../store/handlers/modals'
import SendMessageModalComponent from '../../../components/ui/sendMessage/SendMessageMain'
import identitySelector from '../../../store/selectors/identity'
import directMessages from '../../../store/handlers/contacts'
import userSelectors from '../../../store/selectors/users'
import directMessagesSelector from '../../../store/selectors/directMessages'

export const mapStateToProps = state => ({
  //  balanceZec: identitySelector.balance('zec')(state),
  userData: identitySelector.data(state),
  users: directMessagesSelector.users(state),
  nickname: userSelectors.registeredUser(
    identitySelector.signerPubKey(state)
  )(state)
    ? userSelectors
      .registeredUser(identitySelector.signerPubKey(state))(state)
      .nickname
    : ''
})

export const SendMessageModal = props => {
  return <SendMessageModalComponent {...props} />
}
export const mapDispatchToProps = dispatch => bindActionCreators({
  //  sendMessageHandler: (payload) => directMessages.epics.sendDirectMessage(payload),
  createNewContact: (contact) => directMessages.epics.createVaultContact(contact),
  // sendPlainTransfer: (payload) => transfers.epics.sendPlainTransfer(payload),
  openSentFundsModal: (payload) => actionCreators.openModal('sentFunds', payload)()
}, dispatch)

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  // @ts-expect-error
  withRouter,
  withModal('newMessageSeparate'),
  React.memo
  // @ts-expect-error
)(SendMessageModal)
