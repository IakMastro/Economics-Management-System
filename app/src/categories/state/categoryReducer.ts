import { Category } from "../Category";
import { CategoryActionTypes, CategoryState, DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, LOAD_CATEGORIES_FAILURE, LOAD_CATEGORIES_REQUEST, LOAD_CATEGORIES_SUCCESS, SAVE_CATEGORY_FAILURE, SAVE_CATEGORY_REQUEST, SAVE_CATEGORY_SUCCESS } from "./categoryTypes";

export const initialCategoryState: CategoryState = {
  categories: [],
  page: 1,
  error: undefined,
  loading: false
};

export function categoryReducer(
  state = initialCategoryState,
  action: CategoryActionTypes
) {
  switch (action.type) {
    case LOAD_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case LOAD_CATEGORIES_SUCCESS:
      let categories: Category[];
      const { page } = action.payload;
      if (page === 1) {
        categories = action.payload.categories;
      } else {
        categories = [...state.categories, ...action.payload.categories];
      }

      return {
        ...state,
        categories: categories,
        page: page,
        loading: false,
        error: ''
      };

    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SAVE_CATEGORY_REQUEST:
      return {...state}

    case SAVE_CATEGORY_SUCCESS:
      if (action.payload.id) {
        return {
          ...state,
          categories: [...state.categories, action.payload]
        };
      } else {
        return {
          ...state,
          categories: state.categories.map((category: Category) => {
            return category.id === action.payload.id
              ? Object.assign({}, category, action.payload)
              : category;
          }),
        }
      }

    case SAVE_CATEGORY_FAILURE:
      return { ...state, error: action.payload.message };

    case DELETE_CATEGORY_REQUEST:
      return { ...state };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category: Category) => category.id !== action.payload.id
        ),
      };

    case DELETE_CATEGORY_FAILURE:
      return { ...state, error: action.payload.message };

    default:
      return state;
  }
}