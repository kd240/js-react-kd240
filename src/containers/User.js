import React from 'react';
import { observer } from 'mobx-react';
import { useAsync } from 'react-use';
import { Header } from './Header';
import { UserInfo } from '../components/UserInfo';

import { appContext } from '../state/appContext';
import { getUserData } from '../services/user';
import { MyBookings } from '../components/MyBookings';

function UserContainer({ history }) {
  const { appState } = React.useContext(appContext);
  const { loading, value } = useAsync(() => getUserData(appState));

  function handleEdit() {
    history.push('/user/edit');
  }

  return (
    <div>
      <Header />
      <div>
        {loading && <p>Loading...</p>}
        {value && (
          <React.Fragment>
            <UserInfo user={appState.user} handleEdit={handleEdit} />
            <MyBookings bookings={appState.user.bookings} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export const User = observer(UserContainer);
