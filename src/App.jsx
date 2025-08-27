import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/product';
import { AppLayout } from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import CityList from './components/CityList';

import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesPovider } from './contexts/CitiesContext';

export default function App() {
  return (
    <CitiesPovider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesPovider>
  );
}
