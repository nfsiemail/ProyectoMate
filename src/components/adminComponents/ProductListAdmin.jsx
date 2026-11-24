import "./ProductListAdmin.css";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
} from "../../services/productsService";

export const ProductListAdmin = () => {
  const { mode } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProducts = async () => {
    setLoading(true);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Querés eliminar "${product.name}"?`
    );

    if (!confirmed) return;

    try{
      
      await deleteProduct(product.id);
      navigate(`/admin/products/success/${product.id}`, { replace: true });
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    );
  }

  return (
  <section className="product-list-admin">
    <h2>
      {mode === "edit"
        ? "Seleccioná un producto para modificar"
        : "Seleccioná un producto para eliminar"}
    </h2>

    {products.length === 0 && <p>No hay productos cargados.</p>}

    <div className="product-grid">
      {products.map((product) => (
        <article
          key={product.id}
          className="product-admin-card"
        >
          <img src={product.image} alt={product.name} />

          <div className="product-admin-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-admin-price">${product.price}</p>
          </div>

          <div className="product-admin-actions">
            {mode === "edit" && (
              <Link
                className="btn btn-primary"
                to={`/admin/products/edit/${product.id}`}
              >
                Modificar
              </Link>
            )}

            {mode === "delete" && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(product)}
              >
                Eliminar
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
);
}