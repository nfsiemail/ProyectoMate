import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productsService";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setItemDetail(null);
    setLoading(true);
    setError(null);

    /*borrar cuando esté listo firebase
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((product) => String(product.id) === id);
        if (item) {
          setItemDetail(item);
          return;
        }
        throw new Error("Elemento no encontrado");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);*/

  //Con firebase
  //Usamos la funcion del productsService.js
    getProductById(id)
      .then((data) => setItemDetail(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);//


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!itemDetail) return <p>Producto no encontrado</p>;

  return (
    <section>
      <h1>Detalles del producto</h1>
      <div className="products-container">
        <ItemDetail item={itemDetail} />
      </div>
    </section>
  );
};
