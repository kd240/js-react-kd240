import React from 'react';
import { observer } from 'mobx-react';
import { EditForm } from '../components/EditForm';
import { appContext } from '../state/appContext';

function UserModalContainer() {
  const { appState } = React.useContext(appContext);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <EditForm
      onSubmit={onSubmit}
      appState={appState}
    />
  );
}

export const UserModal = observer(UserModalContainer);
