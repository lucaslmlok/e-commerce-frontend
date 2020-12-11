const CheckoutSteps = (props) => {
  const steps = ["Sign-In", "Shipping", "Payment", "Place Order"];

  return (
    <div className="checkout-steps">
      {steps.map((step, stepIndex) => (
        <div
          key={step}
          className={props.currentStep >= stepIndex ? "active" : ""}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
