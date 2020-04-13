import React, { useCallback, useState } from 'react';
import useSize from 'react-use/lib/useSize';
import P from 'prop-types';

import Element from './Element';

import './styles.scss';

const sns = 'rw-carousel';

const elementWidth = 250;

const S = {
  container: `${sns}-container`,
  inner: `${sns}-inner`,

  elementsScroll: `${sns}-elementsScroll`,
  elements: `${sns}-elements`,
  elementWrapper: `${sns}-elementWrapper`,

  nav: `${sns}-nav`,
  navButtonHolder: `${sns}-navButtonHolder`,
  navButton: `${sns}-navButton`,
  navButtonPrev: `${sns}-navButton-prev`,
  navButtonNext: `${sns}-navButton-next`

};

const Navigation = ({ onClick, index, length }) => (
  <div className={S.nav}>
    <div className={S.navButtonHolder}>
      {index > 0 ? (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span className={`${S.navButton} ${S.navButtonPrev}`} onClick={() => onClick('prev')} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" style={{ fill: 'currentColor' }}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>

      ) : null}
    </div>
    <div className={S.navButtonHolder}>
      {index < (length - 1) ? (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span className={`${S.navButton} ${S.navButtonNext}`} onClick={() => onClick('next')} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" style={{ fill: 'currentColor' }}>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      ) : null}
    </div>

  </div>
);

Navigation.propTypes = {
  onClick: P.func,
  index: P.number,
  length: P.number
};

const Carousel = ({ message }) => {
  const elements = message.get('elements').toJS();
  const [index, setIndex] = useState(0);
  const length = elements.length;

  const onClickNavigation = useCallback((direction) => {
    if (direction === 'prev') {
      setIndex(index > 0 ? index - 1 : index);
    }
    if (direction === 'next') {
      setIndex(index < elements.length - 1 ? index + 1 : index);
    }
  }, [index, setIndex]);

  const [elementsEl] = useSize(
    ({ width }) => {
      const offset = (index === length - 1) ? `${(-1 * length * elementWidth) + width}px` : `${-1 * index * elementWidth}px`;

      return (
        <div
          className={S.elementsScroll}
        >
          <div className={S.elements} style={{ left: offset }}>
            {elements.map((v, k) => (
              <div className={S.elementWrapper} key={k} >
                <Element item={v} />
              </div>))}
          </div>
        </div>

      );
    },
    { width: 0, height: 0 }
  );

  return (
    <div className={S.container}>
      <div className={S.inner}>
        <Navigation onClick={onClickNavigation} index={index} length={length} />
        {elementsEl}
      </div>
    </div>
  );
};


Carousel.propTypes = {
  message: P.shape({})
};

export default Carousel;
