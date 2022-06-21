import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category } from "./Category";
import CategoryDetail from "./CategoryDetail";

function CategoryPage(props: any) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:5000/categories/${id}`);
        let category: Category = {
          id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          deleted: response.data.deleted
        };
        setCategory(category);
        setLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          setLoading(false);
        }
      }
    }

    fetchCategory();
  }, [id])

  return (
    <div>
      <>
        <h1>Category Details</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary" />
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse"></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {category && <CategoryDetail category={category} />}
      </>
    </div>
  )
}

export default CategoryPage;