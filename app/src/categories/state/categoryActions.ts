import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Category } from "../Category";
import { CategoryState, LOAD_CATEGORIES_FAILURE, LOAD_CATEGORIES_REQUEST, LOAD_CATEGORIES_SUCCESS, SAVE_CATEGORY_FAILURE, SAVE_CATEGORY_REQUEST, SAVE_CATEGORY_SUCCESS } from "./categoryTypes";

export function loadCategories(
  page: number
): ThunkAction<void, CategoryState, null, Action<string>> {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CATEGORIES_REQUEST });
    try {
      const response = await axios.get(`http://localhost:5000/categories/`);

      let categories: Category[] = response.data.map((c: any) => {
        return {
          id: c._id,
          name: c.name,
          description: c.description,
          deleted: c.deleted,
        }
      });

      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        categories: { categories, page }
      })
    } catch (e) {
      if (e instanceof Error) {
        dispatch({
          type: LOAD_CATEGORIES_FAILURE,
          categories: { error: e }
        });
      }
    }
  }
}

export function saveCategory(
  category: Category
): ThunkAction<void, CategoryState, null, Action<string>> {
  return async (dispatch: any) => {
    dispatch({ type: SAVE_CATEGORY_REQUEST });
    try {
      const response = await axios.put(`http://localhost:5000/categories/${category.id}`, {
        name: category.name,
        description: category.description,
        deleted: category.deleted,
        _id: category.id,
      });

      dispatch({
        type: SAVE_CATEGORY_SUCCESS,
        payload: response.data
      })
    } catch (e) {
      if (e instanceof Error) {
        dispatch({
          type: SAVE_CATEGORY_FAILURE,
          payload: { error: e }
        });
      }
    }
  }
}