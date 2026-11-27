import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getProducts, getByCategory } from "../../services/productsService";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
  const loadProducts = async () => {
    setLoading(true);
    setErrors(null);

    try {
      const data = category
        ? await getByCategory(category)
        : await getProducts();

      setProducts(data);
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, [category]);

  if (loading) return <p>Cargando...</p>;
  if (errors) return <p>{errors}</p>;

return (
  <section>
    <h1>{category ? `Productos: ${category}` : "Productos"}</h1>
    <ItemList products={products} />
  </section>
);
};
