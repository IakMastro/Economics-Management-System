import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import { categoryReducer, initialCategoryState } from "./categories/state/categoryReducer";
import { CategoryState } from "./categories/state/categoryTypes";

const reducer = combineReducers({
  categoryState: categoryReducer,
});

export default function configureStore(preloadedState: any) {
  const middlewares = [ReduxThunk];
  const middlewaresEnchancer = applyMiddleware(...middlewares);
  const enhancer = composeWithDevTools(middlewaresEnchancer);
  const store = createStore(reducer, preloadedState, enhancer);
  return store;
}

export interface AppState {
  categoryState: CategoryState;
};

export const initialAppState: AppState = {
  categoryState: initialCategoryState
};

export const store = configureStore(initialAppState);
