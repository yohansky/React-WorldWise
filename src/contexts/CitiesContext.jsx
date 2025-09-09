import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000';

function CitiesPovider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/cities`);
        setCities(res.data);
      } catch (error) {
        alert(`There was an error loading data...`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/cities/${id}`);
      setCurrentCity(res.data);
    } catch (error) {
      alert(`There was an error loading data...`);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/cities`, newCity, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data;
      console.log(data);

      setCities(cities => [...cities, data]);
    } catch (error) {
      alert('There was an error creting city...');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/cities/${id}`, {});

      setCities(cities => cities.filter(city => city.id !== id));
    } catch (error) {
      alert('There was an error deleting city...');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesPovider, useCities };
