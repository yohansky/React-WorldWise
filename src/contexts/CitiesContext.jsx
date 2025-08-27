import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000';

function CitiesPovider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setisLoading(true);
        const res = await axios.get(`${BASE_URL}/cities`);
        setCities(res.data);
      } catch (error) {
        alert(`There was an error loading data...`);
      } finally {
        setisLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesPovider };
