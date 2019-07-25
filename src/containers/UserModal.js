import React from 'react';
import { observer } from 'mobx-react';

function UserModalContainer() {

  return (
    <h1>
      User Modal
    </h1>
  );
}

export const UserModal = observer(UserModalContainer);
