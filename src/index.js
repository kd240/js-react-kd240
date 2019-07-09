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
  const [showData, setShowData] = React.useState(fetchedData);
  const [searchValue, setSearchValue] = React.useState("");
  const [details, setDetails] = React.useState({ selected: false });
  const [selectedItem, setSelectedItem] = React.useState('name');

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

  React.useEffect(() => setShowData(fetchedData), [fetchedData]);

  function onSearchInputChange(e) {
    setSearchValue(e.target.value);
    setShowData(fetchedData.filter(item => item[selectedItem].includes(e.target.value)));
  }

  function onSelectChange(e) {
    setSelectedItem(e.target.value);
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
    const id = Number(ReactDOM.findDOMNode(e.target).parentNode.childNodes[0].innerHTML);
    fetchedData.forEach(item => {
      if (item.id === id) {
        let newDetails = item;
        newDetails.selected = true;
        setDetails(newDetails);
      }
    });
  }

  function clearInfo() {
    setDetails({ selected: false })
  }

  function formatDate(date) {
    // flys_at: "2019-03-05T08:35:28.958Z"
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const hours = date.substring(11, 13);
    const minutes = date.substring(14, 16);
    return `${hours}:${minutes}, ${day}. ${month}. ${year}`;
  }

  return (
    <div>
      <span>
        Search for 
        <select value={selectedItem} onChange={onSelectChange}>
          <option value="name">flight name</option>
          <option value="company_name">company name</option>
        </select> 
        &rarr;
      </span>
      <input value={searchValue} placeholder="Flight name" onChange={onSearchInputChange} />
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
          {showData.map(item => (
            <tr key={item.id} onClick={getInfo}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.company_name}#{item.company_id}</td>
              <td>{formatDate(item.flys_at)}</td>
              <td>{formatDate(item.lands_at)}</td>
              <td>{item.current_price}</td>
              <td>
                <button onClick={addToLocalStorage} title={favorites.includes(item) ? "Remove form favorites" : "Add to favorites"}>
                  {favorites.includes(item) ? "❤️" : "️💔"}
                </button>
              </td>
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
                <th colSpan="2">{details.name}#{details.id}</th>
                <th className="close" onClick={clearInfo}>&times;</th>
              </tr>
              <tr>
                <td>ID</td>
                <td>{details.id}</td>
                <td></td>
              </tr>
              <tr>
                <td>Flight's name</td>
                <td>{details.name}</td>
                <td></td>
              </tr>
              <tr>
                <td>Company's info</td>
                <td>{details.company_name}#{details.company_id}</td>
                <td></td>
              </tr>
              <tr>
                <td>Flys info</td>
                <td>{formatDate(details.flys_at)}</td>
                <td></td>
              </tr>
              <tr>
                <td>Lads info</td>
                <td>{formatDate(details.lands_at)}</td>
                <td></td>
              </tr>
              <tr>
                <td>Seats (free/booked)</td>
                <td>
                  <span>{details.no_of_seats - details.no_of_booked_seats}</span>/
                <span>{details.no_of_booked_seats}</span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Price (base/current)</td>
                <td>{details.base_price}/{details.current_price}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
