import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the beers based on the search term
  const filteredBeers = beers.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="App">
        <h1>Punk API Beers</h1>
        <input
            type="text"
            placeholder="Search for a beer..."
            value={searchTerm}
            onChange={handleSearch}
        />
        <div className="beer-list">
          {filteredBeers.map((beer) => (
              <div key={beer.id} className="beer-card">
                <img src={beer.image_url} alt={beer.name} />
                <h2>{beer.name}</h2>
                <p>{beer.tagline}</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;
