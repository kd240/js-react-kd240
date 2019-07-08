import React from 'react';
import ReactDOM from 'react-dom';


function HelloWorld() {
  const [fetchedData, setFetchedData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      await fetch("https://flighter-hw7.herokuapp.com/api/flights",
        {
          headers: {
            "Authorization": "TeKxQ77XeoW6hooF5H3L2opQ",
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        }
      ).then(res => {
          console.log(res);
          if (res.ok) return res.json();
          throw new Error("Fetch failed");
        }).then(data => setFetchedData(data.flights))
        .catch(err => console.error("Error", err));
    }

    fetchData();
  }, [])

  function onSearchInputChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div>
      <input value={searchValue} onChange={onSearchInputChange} />
      
      <ul>
        {fetchedData.map(item => (
          <li key={item.id}>
            <div>
              <span>{item.id}</span>
              <span>{item.name}</span>
              <span>{item.company_name}</span>
              <span>{item.company_id}</span>
              <span>{item.flys_at}</span>
              <span>{item.lands_at}</span>
              <span>{item.current_price}</span>
              <button onClick="addToLocalStorage" >*</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
