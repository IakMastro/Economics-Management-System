import { Category } from "./Category";

interface CategoryDetailProps {
  category: Category;
}

export default function CategoryDetail({ category }: CategoryDetailProps) {
  return (
    <div className="row">
      <div className="cols-sm-6">
        <div className="card large">
          <section className="section dark">
            <h3>
              <strong>{category.name}</strong>
            </h3>
            <p>{category.description}</p>
            <p>
              <mark className="active">
                {category.deleted ? "Deleted" : "Active"}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}