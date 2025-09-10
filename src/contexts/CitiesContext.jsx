import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unknown action type');
  }
}

function CitiesPovider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await axios.get(`${BASE_URL}/cities`);
        dispatch({ type: 'cities/loaded', payload: res.data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: `There was an error loading data...`,
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return;

    dispatch({ type: 'loading' });
    try {
      const res = await axios.get(`${BASE_URL}/cities/${id}`);
      dispatch({ type: 'city/loaded', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: `There was an error loading data...`,
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await axios.post(`${BASE_URL}/cities`, newCity, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data;
      console.log(data);

      dispatch({ type: 'city/created', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: `There was an error creating a city...`,
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await axios.delete(`${BASE_URL}/cities/${id}`);

      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: `There was an error deleting a city...`,
      });
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
