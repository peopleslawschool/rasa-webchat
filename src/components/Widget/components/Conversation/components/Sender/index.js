import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import send from 'assets/send_button.svg';
import './style.scss';
import PersistentMenu from './PersistentMenu';

const Sender = ({
  sendMessage,
  inputTextFieldHint,
  disabledInput,
  userInput,
  showPersistentMenu
}) => {
  if (userInput === 'hide') return <div />;
  const disabledComposer = showPersistentMenu;
  return (
    <form className="rw-sender" onSubmit={sendMessage}>
      {showPersistentMenu ? (
        <PersistentMenu />
      ) : null}

      {disabledComposer ? (
        <input
          type="text"
          className="rw-new-message"
          name="message"
          placeholder={'You cannot reply to this conversation.'}
          disabled
          autoFocus
          autoComplete="off"
          style={{ opacity: 0.5 }}
        />
      ) : (
        <><input
          type="text"
          className="rw-new-message"
          name="message"
          placeholder={inputTextFieldHint}
          disabled={disabledInput || userInput === 'disable'}
          autoFocus
          autoComplete="off"
        /><button type="submit" className="rw-send">
          <img src={send} className="rw-send-icon" alt="send" />
        </button></>
      )}


    </form>
  );
};

const mapStateToProps = state => ({
  inputTextFieldHint: state.behavior.get('inputTextFieldHint'),
  userInput: state.metadata.get('userInput'),
  showPersistentMenu: state.persistentMenu.items.length > 0

});

Sender.propTypes = {
  sendMessage: PropTypes.func,
  inputTextFieldHint: PropTypes.string,
  disabledInput: PropTypes.bool,
  userInput: PropTypes.string,
  showPersistentMenu: PropTypes.bool
};

export default connect(mapStateToProps)(Sender);
