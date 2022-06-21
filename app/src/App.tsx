import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CategoriesPage from './categories/CategoriesPage';
import CategoryPage from './categories/CategoryPage';
import HomePage from './home/HomePage';
import { store } from './state';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <header className='sticky'>
          <span className="logo">
            <img src="logo.svg" alt="logo" width="49" height="99" />
          </span>
          <NavLink to="/" className="button rounder">
            <span className="icon-home"></span>
            Home
          </NavLink>
          <NavLink to="/categories" className="button rounder">
            <span className="icon-list"></span>
            Categories
          </NavLink>
        </header>
        <div className='container'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="categories/:id" element={<CategoryPage />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
