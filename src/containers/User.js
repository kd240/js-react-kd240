import React from 'react';
import { observer } from 'mobx-react';
import { Header } from './Header';
import { UserInfo } from '../components/UserInfo';
import { useAsync } from 'react-use';

function UserContainer() {
  const { loading, value } = useAsync(() => {

  });
  
  return (
    <div>
      <Header />
      <UserInfo />
    </div>
  );
}

export const User = observer(UserContainer);
