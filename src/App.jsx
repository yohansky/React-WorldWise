import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/product';
import { AppLayout } from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export default function App() {
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

  // useEffect(function () {
  //   async function fetchCities() {
  //     try {
  //       setisLoading(true);
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();
  //       // console.log(data);
  //       setCities(data);
  //     } catch {
  //       alert(`There was an error loading data...`);
  //     } finally {
  //       setisLoading(false);
  //     }
  //   }
  //   fetchCities();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
