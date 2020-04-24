import React, { useCallback, useState, useRef } from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';
import useClickAway from 'react-use/lib/useClickAway';

import { addUserMessage, emitUserMessage, setQuickReply } from 'actions';

import './style.scss';

const sns = 'rw-persistentMenu';

const S = {
  container: `${sns}-container`,
  trigger: `${sns}-trigger`,
  items: `${sns}-items`,
  item: `${sns}-item`,

  bubbleWrapper: `${sns}-bubbleWrapper`,
  bubble: `${sns}-bubble`,
  bubbleArrowWrapper: `${sns}-bubbleArrowWrapper`,
  bubbleArrow: `${sns}-bubbleArrow`,

  button: `${sns}-button`,
  buttonInner: `${sns}-buttonInner`
};


const Button = ({ item, onClickPayload }) => {
  if (item.type === 'web_url') {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={S.button}>
        <span className={S.buttonInner}>
          {item.title}
        </span>
      </a>);
  }

  if (item.type === 'phone_number') {
    return (
      <a href={`tel:${item.payload}`} target="_blank" rel="noopener noreferrer" className={S.button}>
        <span className={S.buttonInner}>
          {item.title}
        </span>
      </a>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={S.button} onClick={() => onClickPayload(item.payload, item.title, item.title)}>
      <span className={S.buttonInner}>
        {item.title}
      </span>
    </div>
  );
};


Button.propTypes = {
  item: P.shape({}),
  onClickPayload: P.func
};


const PersistentMenu = ({
  items,
  onChoosePayload: onChoosePayloadOriginal
}) => {
  const [showItems, setShowItems] = useState(false);
  const onClickTrigger = useCallback(() => {
    setShowItems(!showItems);
  }, [showItems, setShowItems]);

  const onChoosePayload = useCallback((...args) => {
    onChoosePayloadOriginal(...args);
    setShowItems(false);
  }, [setShowItems, onChoosePayloadOriginal]);

  const ref = useRef();

  useClickAway(ref, () => {
    setShowItems(false);
  });

  return (
    <div className={S.container} ref={ref} >
      <button className={S.trigger} onClick={onClickTrigger} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>
      {showItems ? (
        <div className={S.bubbleWrapper}>
          <div className={S.bubble}>
            <div className={S.items}>
              {items.map((v, k) => (
                <Button item={v} key={k} onClickPayload={onChoosePayload} />
              ))}
            </div>
          </div>
          <div className={S.bubbleArrowWrapper} >
            <div className={S.bubbleArrow} />
          </div>
        </div>
      ) : null}
    </div>
  );
};


PersistentMenu.propTypes = {
  items: P.list,
  onChoosePayload: P.func
};

const mapStateToProps = state => ({
  items: state.persistentMenu.items
});


const mapDispatchToProps = dispatch => ({
  onChoosePayload: (payload, title, id) => {
    dispatch(setQuickReply(id, title));
    dispatch(addUserMessage(title));
    dispatch(emitUserMessage(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PersistentMenu);
