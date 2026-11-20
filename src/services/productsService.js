import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const productsRef = collection(db, "products");

/* -------------------------------------------------------------------------- */
/*                               TRAER PRODUCTOS                              */
/* -------------------------------------------------------------------------- */
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsRef);

    const productsFormat = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return productsFormat;
  } catch (error) {
    console.log("Error al traer productos", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                            TRAER PRODUCTO POR ID                           */
/* -------------------------------------------------------------------------- */

export const getProductById = async (id) => {
  try {
    const productRef = doc(productsRef, id);

    const snapshot = await getDoc(productRef);

    // Verificamos si existe
    if (snapshot.exists()) {
      const product = { id: snapshot.id, ...snapshot.data() };
      console.log("Doc:", product);
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al traer producto por ID:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                          SI FILTRAMOS POR CATEGORY                         */
/* -------------------------------------------------------------------------- */
export const getByCategory = async (category) => {
  try {
    let queryRef;

    if (category) {
      queryRef = query(productsRef, where("category", "==", category));
    } else {
      queryRef = productsRef;
    }

    const snapshot = await getDocs(queryRef);
    
    const productsFormat = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return productsFormat;
  } catch (error) {
    console.error("Error al filtrar productos:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                              ALTA DE PRODUCTO                              */
/* -------------------------------------------------------------------------- */
export const createProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsRef, productData);

    return docRef.id;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                           MODIFICAR PRODUCTO                               */
/* -------------------------------------------------------------------------- */
export const updateProduct = async (id, productData) => {
  try {
    const docRef = doc(productsRef, id);
    await updateDoc(docRef, productData);
  } catch (error) {
    console.error("Error al modificar producto:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                            ELIMINAR PRODUCTO                               */
/* -------------------------------------------------------------------------- */
export const deleteProduct = async (id) => {
  try {
    const docRef = doc(productsRef, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};