import React from 'react';
import { connect } from 'react-redux';
import P from 'prop-types';

import { addUserMessage, emitUserMessage, setQuickReply } from 'actions';

import './styles.scss';

const sns = 'rw-carouselElement';

const S = {
  container: `${sns}-container`,
  media: `${sns}-media`,
  caption: `${sns}-caption`,
  image: `${sns}-image`,
  title: `${sns}-title`,
  subtitle: `${sns}-subtitle`,

  buttons: `${sns}-buttons`,
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

const Element = ({ item, onChoosePayload }) => {
  const buttons = item.buttons;
  return (
    <div className={S.container}>
      <div className={S.media}>
        <img className={S.image} src={item.image_url} alt={item.title} />
      </div>
      <div className={S.caption}>
        <div className={S.title}>
          {item.title}
        </div>
        <div className={S.subtitle}>
          {item.subtitle}
        </div>
      </div>
      <div className={S.buttons}>
        {buttons.map((v, k) => (
          <Button item={v} key={k} onClickPayload={onChoosePayload} />
        ))}
      </div>
    </div>
  );
};


Element.propTypes = {
  item: P.shape({}),
  onChoosePayload: P.func
};


const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  onChoosePayload: (payload, title, id) => {
    dispatch(setQuickReply(id, title));
    dispatch(addUserMessage(title));
    dispatch(emitUserMessage(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Element);
