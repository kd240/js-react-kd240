import React from 'react';
import { observer } from 'mobx-react';
import { useAsync, useLocalStorage } from 'react-use';
import { Header } from './Header';

import { appContext } from '../state/appContext';
import { getUserData } from '../services/user';
import { ShowPanel } from './ShowPanel';
import { UserInfo } from '../components/UserInfo';
import { MyBookingInfo } from '../components/MyBookingInfo';
import { getFlighs } from '../services/flights';
import { Wishlist } from '../components/Wishlist';
import { Loading } from '../components/Loading';

function UserContainer({ history }) {
  const { appState } = React.useContext(appContext);
  const [wishlist] = useLocalStorage('wishlist', []);

  const { loading: loadingUserData, value: userFetched } = useAsync(() =>
    getUserData(appState));

  const { loading: loadingWishlist, value: flightsFromWishlist } = useAsync(() =>
    getFlighs(appState).then((flights) =>
      flights.filter((flight) => wishlist.includes(flight.id))));

  function handleEdit() {
    history.push('/user/edit');
  }

  return (
    <div>
      <Header history={history} />
      <div>
        {loadingUserData && <Loading />}
        {appState.user && (
          <React.Fragment>
            <UserInfo user={appState.user} handleEdit={handleEdit} />
            {Boolean(userFetched && appState.user.bookings.length) && (
              <ShowPanel
                title="My bookings"
                data={appState.user.bookings}
                component={MyBookingInfo}
              />
            )}
            {wishlist.length && (
              <React.Fragment>
                {loadingWishlist && <p>Loading...</p>}
                {flightsFromWishlist && (
                  <ShowPanel
                    title="Wishlist"
                    data={flightsFromWishlist}
                    component={Wishlist}
                  />
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export const User = observer(UserContainer);
