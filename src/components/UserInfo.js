import React from 'react';
import { observer } from 'mobx-react';

function UserInfoComponent({ user }) {
  console.log(user);
  return (
    <div>
      <div>Image</div>
      <h1>{user.first_name} {user.last_name}</h1>
      <p>{user.email}</p>
      <button>Edit</button>
    </div>
  );
}

export const UserInfo = observer(UserInfoComponent);
