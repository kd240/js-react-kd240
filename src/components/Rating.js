import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

function RatingComponent(rating) {

  return (
    <Fragment>
      {Array
        .from({ length: rating })
        .map((el, i) => (
          <span className="rating" key={i}>&#9733;</span> // eslint-disable-line
        ))}
    </Fragment>
  );
}

export const Rating = observer(RatingComponent);
