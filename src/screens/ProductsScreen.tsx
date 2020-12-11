import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as productActions from "../store/actions/productActions";

const ProductsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [desc, setDesc] = useState("");

  const { loading, success, error, products } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const openModal = (product = null) => {
    setModalVisible(true);
    if (!product) return;

    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDesc(product.desc);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productActions.saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        desc,
      })
    );
  };

  const deleteProduct = (product) => {
    dispatch(productActions.deleteProduct(product._id));
  };

  const resetForm = () => {
    setId("");
    setName("");
    setPrice("");
    setImage("");
    setBrand("");
    setCategory("");
    setCountInStock("");
    setDesc("");
  };

  useEffect(() => {
    if (success) {
      dispatch(productActions.listProduct());
      dispatch(productActions.resetSuccess());

      setModalVisible(false);
      resetForm();
    }
  }, [success]);

  useEffect(() => {
    dispatch(productActions.listProduct());
  }, []);

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        {!modalVisible && (
          <button className="button primary" onClick={() => openModal()}>
            Create Product
          </button>
        )}
      </div>
      {modalVisible ? (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>{id ? "Edit" : "Create"} Product</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="desc">Description</label>
                <textarea
                  name="desc"
                  id="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Edit" : "Create"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => {
                    setModalVisible(false);
                    resetForm();
                  }}
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : (
        <div className="product-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="button primary"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="button secondary"
                      onClick={() => deleteProduct(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsScreen;
