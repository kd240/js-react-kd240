import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { useLocalStorage } from 'react-use';

const url = 'https://flighter-hw7.herokuapp.com/api/flights';
const options = {
  method: 'GET',
  headers: {
    "Authorization": "TeKxQ77XeoW6hooF5H3L2opQ",
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
}

function HelloWorld() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [fetchedData, setFetchedData] = React.useState(favorites);
  const [searchValue, setSearchValue] = React.useState("");
  const [details, setDetails] = React.useState({ selected: false });

  React.useEffect(() => {
    async function fetchData() {
      await fetch(url, options)
        .then(res => res.ok ? res.json() : new Error("Fetch failed"))
        .then(data => {
          let newData = [...fetchedData];
          data.flights
            .filter(flight => !fetchedData.map(item => item.id).includes(flight.id))
            .forEach(flight => newData = [...newData, flight]);
          setFetchedData(newData);
        }).catch(err => console.error(err));
    }
    fetchData();
  }, [])

  function onSearchInputChange(e) {
    setSearchValue(e.target.value);
  }

  function addToLocalStorage(e) {
    const id = Number(ReactDOM.findDOMNode(e.target).parentNode.parentNode.childNodes[0].innerHTML);
    fetchedData
      .filter(item => item.id === id)
      .forEach(item => {
        if (favorites.map(item => item.id).includes(id)) {
          setFavorites(favorites.filter(item => item.id !== id));
        } else {
          setFavorites([...favorites, item]);
        }
      });
  }

  function getInfo(e) {
    const id = ReactDOM.findDOMNode(e.target).parentNode.childNodes[0].innerHTML;
    fetchedData.forEach(item => {
      if (item.id == id) {
        let newDetails = item;
        newDetails.selected = true;
        setDetails(newDetails);
      }
    });
  }

  return (
    <div>
      <input value={searchValue} onChange={onSearchInputChange} />
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Flight name</th>
            <th>Company Name#ID</th>
            <th>Flys at</th>
            <th>Lands at</th>
            <th>Current price</th>
            <th>Favorite</th>
          </tr>
          {fetchedData.map(item => (
            <tr key={item.id} onClick={getInfo}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.company_name}#{item.company_id}</td>
              <td>{item.flys_at}</td>
              <td>{item.lands_at}</td>
              <td>{item.current_price}</td>
              <td><button onClick={addToLocalStorage} title="Add to favorites">{favorites.includes(item) ? "❤️" : "️💔"}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="info">
        {!details.selected && (
          <div>
            <h1>No flight selected!</h1>
            <p>Please select flight from the table.</p>
          </div>
        )}
        {details.selected && (
          <table>
            <tbody>
              <tr>
                <th colspan="2">{details.name}#{details.id}</th>
              </tr>
              <tr>
                <td>ID</td>
                <td>{details.id}</td>
              </tr>
              <tr>
                <td>Flight's name</td>
                <td>{details.name}</td>
              </tr>
              <tr>
                <td>Company's info</td>
                <td>{details.company_name}#{details.company_id}</td>
              </tr>
              <tr>
                <td>Flys info</td>
                <td>{details.flys_at}</td>
              </tr>
              <tr>
                <td>Lads info</td>
                <td>{details.lands_at}</td>
              </tr>
              <tr>
                <td>Seats (free/booked)</td>
                <td>
                  <span>{details.no_of_seats - details.no_of_booked_seats}</span>/
                <span>{details.no_of_booked_seats}</span>
                </td>
              </tr>
              <tr>
                <td>Price (base/current)</td>
                <td>{details.base_price}/{details.current_price}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <hr />
      {JSON.stringify(fetchedData)}
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
