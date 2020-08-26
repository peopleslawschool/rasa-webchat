import React, { useCallback, useState } from 'react';
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
  showPersistentMenu,
  disableComposer,
  counterText
}) => {
  if (userInput === 'hide') return <div />;
  const [value, onChange] = useState('');
  const onSubmit = useCallback((e) => {
    sendMessage(e);
    onChange('');
  });
  const showError = value.length >= 80;

  const counterMessage = typeof counterText === 'function' ? counterText(value.length) : counterText;

  return (
    <form className="rw-sender" onSubmit={onSubmit}>
      {showPersistentMenu ? (
        <PersistentMenu />
      ) : null}

      {disableComposer ? (
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
        <><div className="rw-input-holder">
          <input
            type="text"
            className="rw-new-message"
            name="message"
            placeholder={inputTextFieldHint}
            disabled={disabledInput || userInput === 'disable'}
            autoFocus
            autoComplete="off"
            onChange={e => onChange(e.target.value)}
            value={value}
          />
          <div className={`rw-counter ${showError ? 'rw-counterError' : ''}`}>
            {counterMessage}
          </div>
        </div><button type="submit" className="rw-send">
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
  showPersistentMenu: PropTypes.bool,
  disableComposer: PropTypes.bool,
  counterText: PropTypes.oneOf([PropTypes.func, PropTypes.string])
};

export default connect(mapStateToProps)(Sender);
