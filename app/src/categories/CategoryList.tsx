import React from "react";
import { Category } from "./Category";
import CategoryCard from "./CategoryCard";
import CategoryForm from "./CategoryForm";

interface CategoryListProps {
  categories: Category[];
}

function CategoryList({ categories }: CategoryListProps) {
  const [categoryBeingEdited, setCategoryBeingEdited] = React.useState({});

  const handleEdit = (category: Category) => {
    setCategoryBeingEdited(category);
  }

  const cancelEditing = () => {
    setCategoryBeingEdited({});
  }

  return (
    <div className="row">
      {categories.map(category => (
        <div key={category.id} className="cols-sm">
          {
            categoryBeingEdited === category ?
              <CategoryForm category={category} onCancel={cancelEditing} />
              :
              <CategoryCard category={category} onEdit={handleEdit} />
          }
        </div>
      ))}
    </div>
  );
}

export default CategoryList;