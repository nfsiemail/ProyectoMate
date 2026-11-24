import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import { createProduct, updateProduct } from "../../../services/productsService";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    //validar inputs
    const newErrors = validateProduct({ ...product, file });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      //subir la imagen
      const imageUrl = await uploadImage(file);
      //armar la estructura del producto
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      let productID = id;
      if (productID) { //si se le manda un id, es porque estamos editando un producto existente
        //editar
        await updateProduct(productID, productData);
      } else {
        //alta
        productID = await createProduct(productData);
      }
      //vaciar formulario
      setProduct({ name: "", price: "", category: "", description: "" });
      setFile(null);
      //navegar a la pagina de exito
      navigate(`/admin/products/success/${productID}`, { replace: true });

    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
