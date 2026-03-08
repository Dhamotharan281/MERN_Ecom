//  import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// const PaypalButton = ({ amount, onSuccess, onError }) => {
//   return (
//     <PayPalScriptProvider
//       options={{
//        }}
//     >
//       <PayPalButtons
//         style={{ layout: "vertical" }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: { value: amount },
//               },
//             ],
//           });
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then(onSuccess);
//         }}
//         onError={onError}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PaypalButton;
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log("Payment Success:", details);
            onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
