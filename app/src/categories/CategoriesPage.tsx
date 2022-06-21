import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../state';
import CategoryList from './CategoryList';
import { loadCategories } from './state/categoryActions';
import { CategoryState } from './state/categoryTypes';

function CategoriesPage() {
  const loading = useSelector(
    (appState: AppState) => appState.categoryState.loading
  );

  const categories = useSelector(
    (appState: AppState) => appState.categoryState.categories
  );

  const error = useSelector(
    (appState: AppState) => appState.categoryState.error
  );

  const currentPage = useSelector(
    (appState: AppState) => appState.categoryState.page
  );

  const dispatch = useDispatch<ThunkDispatch<CategoryState, any, AnyAction>>();

  useEffect(() => {
    dispatch(loadCategories(1));
  }, [dispatch]);

  const handleMoreClick = () => {
    dispatch(loadCategories(currentPage + 1));
  }

  return (
    <>
      <h1>Categories Page</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <CategoryList categories={categories} />
      {!loading && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>More...</button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <div className="spinner primary"></div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default CategoriesPage;