import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import * as productActions from "../store/actions/productActions";

interface ParamTypes {
  id: string;
}

const ProductScreen = (props) => {
  const { id: paramId } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    props.history.push(`/cart/${paramId}?qty=${qty}`);
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
        <Link to="/">Back to result</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>${product.price}</b>
            </li>
            <li>
              <div>{product.desc}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: ${product.price}</li>
            <li>
              Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
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
                  <button className="button primary" onClick={handleAddToCart}>
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
