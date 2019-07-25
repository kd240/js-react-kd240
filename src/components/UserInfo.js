import React from 'react';
import { observer } from 'mobx-react';

function UserInfoComponent() {

  return (
    <div>
      <div>Image</div>
      <h1>Name</h1>
      <p>Email</p>
      <button>Edit</button>
    </div>
  );
}

export const UserInfo = observer(UserInfoComponent);
