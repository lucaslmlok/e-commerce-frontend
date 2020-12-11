import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as productActions from "../store/actions/productActions";
import ProductItem from "../components/ProductItem";

const HomeScreen = (props) => {
  const { products, loading, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.listProduct());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
};

export default HomeScreen;
