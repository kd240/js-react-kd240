import React from 'react';
import { observer } from 'mobx-react';

import styles from './ShowPanel.module.scss';

function ShowPanelContainer({ title, data: dataSet, component: Component }) {
  const [slicePosition, setSlicePosition] = React.useState(0);

  function handleShowView() {
    return {
      left: () => {
        if (slicePosition < 4) {
          setSlicePosition(0);
        } else {
          setSlicePosition((prevState) => prevState - 4);
        }
      },
      right: () => {
        if (slicePosition > dataSet.length - 5) {
          setSlicePosition(dataSet.length - 4);
        } else {
          setSlicePosition((prevState) => prevState + 4);
        }
      },
    };
  }

  return (
    <div className={styles.showPanel}>
      {title && <h1>{title}</h1>}
      <div>
        <div
          className={styles.arrowLeft}
          role="presentation"
          onClick={handleShowView().left}
        />
        {dataSet.slice(slicePosition, slicePosition + 4).map((data) => (
          <Component key={data.id} info={data} />
        ))}
        <div
          className={styles.arrowRight}
          role="presentation"
          onClick={handleShowView().right}
        />
      </div>
    </div>
  );
}

export const ShowPanel = observer(ShowPanelContainer);
