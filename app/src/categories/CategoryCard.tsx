import { Category } from "./Category";
import { Link } from 'react-router-dom';

function formatDescription(description?: string): string {
  return description ? description.substring(0, 60) + '...' : '';
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
}

function CategoryCard(props: CategoryCardProps) {
  const {
    category,
    onEdit
  } = props;

  const handleEditClick = (categoryBeingEdited: Category) => {
    onEdit(categoryBeingEdited);
  }

  return (
    <div className="card">
      <section className="section dark">
        <Link to={'/categories/' + category.id}>
          <h5 className="strong">
            <strong>{ category.name }</strong>
          </h5>
          <p>{ formatDescription(category.description) }</p>
          <button
            className="bordered"
            onClick={() => {
              handleEditClick(category);
            }}
          >
            <span className="icon-edit"></span>
            Edit
          </button>
        </Link>
      </section>
    </div>
  );
}

export default CategoryCard;