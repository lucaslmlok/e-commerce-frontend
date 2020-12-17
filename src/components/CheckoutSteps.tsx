import { useHistory } from "react-router-dom";

const CheckoutSteps = (props) => {
  const steps = ["Sign-In", "Shipping", "Payment", "Place Order"];
  const { currentStep } = props;
  const history = useHistory();

  const handleOnClick = (stepIndex: number) => {
    if (currentStep > stepIndex) {
      switch (stepIndex) {
        case 1:
          history.push("/shipping");
          break;
        case 2:
          history.push("/payment");
          break;
      }
    }
  };

  return (
    <div className="checkout-steps">
      {steps.map((step, stepIndex) => (
        <div
          key={step}
          className={currentStep >= stepIndex ? "active" : ""}
          onClick={() => handleOnClick(stepIndex)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
