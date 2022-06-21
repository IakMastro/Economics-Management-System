import React from "react";
import { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Category } from "./Category";
import { saveCategory } from "./state/categoryActions";
import { CategoryState } from "./state/categoryTypes";

interface CategoryFormProps {
  category: Category;
  onCancel: () => void;
}

function CategoryForm({ category: initialCategory, onCancel }: CategoryFormProps) {
  const [category, setCategory] = React.useState(initialCategory);
  const [errors, setErrors] = React.useState({ name: '' });

  const dispatch = useDispatch<ThunkDispatch<CategoryState, any, AnyAction>>();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    dispatch(saveCategory(category));
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === 'checkbox' ? checked : value;

    if (type === 'number') {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedCategory: Category;

    setCategory((c) => {
      updatedCategory = new Category({ ...c, ...change });
      return updatedCategory;
    });

    setErrors(() => validate(updatedCategory));
  };

  function validate(category: Category) {
    let errors: any = { name: '' }

    if (category.name.length === 0) {
      errors.name = 'Name is required';
    }

    else if (category.name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Category Name</label>
      <input type="text" name="name" placeholder="Enter Category Name" value={category.name} onChange={handleChange} />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Category Description</label>
      <textarea name="description" placeholder="Enter Category Description" value={category.description} onChange={handleChange} />
      <label htmlFor="isDeleted">Deleted?</label>
      <input type="checkbox" name="isDeleted" checked={category.deleted} onChange={handleChange} />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <button type="button" className="bordered medium" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
