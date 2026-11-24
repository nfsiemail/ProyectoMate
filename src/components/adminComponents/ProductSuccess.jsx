import { Link, useParams } from "react-router-dom";
import "./ProductSuccess.css";

export const ProductSuccess = () => {
  const { id } = useParams();

  return (
    <section className="success-page">
      <div className="success-icon">✅</div>

      <h2>¡Operación realizada con exito!</h2>
      <p>ID de producto: {id}</p>
      <p>Puede volver al menú haciendo click en el boton.</p>

      <div className="success-actions">
        <Link className="btn bg-success primary" to="/admin">
          Volver al dashboard
        </Link>
      </div>
    </section>
  );
};
