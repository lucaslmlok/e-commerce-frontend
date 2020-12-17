import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

import * as productActions from "../store/actions/productActions";
import * as cartActions from "../store/actions/cartActions";

interface ParamTypes {
  id: string;
}

const ProductScreen = (props) => {
  const { id: paramId } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart(product._id, qty));
    props.history.push("/cart");
  };

  useEffect(() => {
    dispatch(productActions.detailsProduct(paramId));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <div className="back-to-result">
        <Link to="/">
          <FaAngleLeft className="mb-1 mr-1" />
          Back to result
        </Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h2>{product.name}</h2>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b className="price">${product.price}</b>
            </li>
            <li>
              <div>{product.desc}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>
              Status:{" "}
              <b>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</b>
            </li>
            {product.countInStock > 0 && (
              <>
                <li>
                  QTY:
                  <select value={qty} onChange={(e) => setQty(+e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <button
                    className="button primary mt-3"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
