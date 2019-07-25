import React from 'react';
import { observer } from 'mobx-react';

function UserInfoContainer({ history }) {

  return (
    <h1>
      User Info
      <p onClick={() => history.push('/user/edit')}>Edit</p>
    </h1>
  );
}

export const UserInfo = observer(UserInfoContainer);
