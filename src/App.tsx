import { NavLink, Outlet, Route, Routes } from 'react-router-dom';

import Home from 'pages/home';
import Users from 'pages/users';

import './App.scss';
import logo from './assets/images/logo.webp';

const Layout = () => (
  <div className="layout-container">
    <header className="header">
      <img alt="Company Logo" className="logo" src={logo} />
      <nav>
        <NavLink to="/">
          <button type="button">Home</button>
        </NavLink>
        <NavLink to="/users">
          <button type="button">Users</button>
        </NavLink>
      </nav>
    </header>
    <Outlet />
  </div>
);

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<Home />} path="/" />
      <Route element={<Users />} path="/users" />
    </Route>
  </Routes>
);

export default App;
