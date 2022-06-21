import { Category } from "../Category";

export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST';
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE';
export const SAVE_CATEGORY_REQUEST = 'SAVE_CATEGORY_REQUEST';
export const SAVE_CATEGORY_SUCCESS = 'SAVE_CATEGORY_SUCCESS';
export const SAVE_CATEGORY_FAILURE = 'SAVE_CATEGORY_FAILURE';
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

interface LoadCategoriesRequestAction {
  type: typeof LOAD_CATEGORIES_REQUEST;
}

interface LoadCategoriesSuccessAction {
  type: typeof LOAD_CATEGORIES_SUCCESS;
  payload: { categories: Category[], page: number };
}

interface LoadCategoriesFailureAction {
  type: typeof LOAD_CATEGORIES_FAILURE;
  payload: { message: string };
}

interface SaveCategoryRequestAction {
  type: typeof SAVE_CATEGORY_REQUEST;
}

interface SaveCategorySuccessAction {
  type: typeof SAVE_CATEGORY_SUCCESS;
  payload: Category;
}

interface SaveCategoryFailureAction {
  type: typeof SAVE_CATEGORY_FAILURE;
  payload: { message: string };
}

interface DeleteCategoryRequestAction {
  type: typeof DELETE_CATEGORY_REQUEST;
}

interface DeleteCategorySuccessAction {
  type: typeof DELETE_CATEGORY_SUCCESS;
  payload: Category;
}

interface DeleteCategoryFailureAction {
  type: typeof DELETE_CATEGORY_FAILURE;
  payload: { message: string };
}

export type CategoryActionTypes =
  | LoadCategoriesRequestAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesFailureAction
  | SaveCategoryRequestAction
  | SaveCategorySuccessAction
  | SaveCategoryFailureAction
  | DeleteCategoryRequestAction
  | DeleteCategorySuccessAction
  | DeleteCategoryFailureAction;

export interface CategoryState {
  categories: Category[];
  page: number;
  loading: boolean;
  error: string | undefined;
}