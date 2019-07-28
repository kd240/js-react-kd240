import React from 'react';
import { observer } from 'mobx-react';

function UserInfoComponent({ user, handleEdit }) {
  return (
    <div>
      <img alt="Profile" src={user.image_url || 'http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png'} />
      <h1>{user.first_name} {user.last_name}</h1>
      <p>{user.email}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export const UserInfo = observer(UserInfoComponent);
