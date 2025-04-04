// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PaymentMethod: React.FC = () => {
//   const navigate = useNavigate();
//   const [paymentMethod, setPaymentMethod] = useState<string>("");
//   const [showContactPaymentMessage, setShowContactPaymentMessage] = useState<boolean>(false);

//   const handlePaymentSelection = (method: string) => {
//     setPaymentMethod(method);
//     setShowContactPaymentMessage(false);
//   };

//   const handleProceedToPayment = () => {
//     if (paymentMethod === "contact") {
//       setShowContactPaymentMessage(true);
//     } else {
//       navigate("/checkout");
//     }
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
//       <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden">
//         <div className="p-6">
//           {paymentMethod === "card" ? (
//             <>
//               <h3 className="text-xl font-bold mb-4">Card Payment</h3>
//               <p className="text-sm mb-6 text-gray-600">
//                 You have selected Card Payment. Please proceed with your payment.
//               </p>
//               <button
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//                 onClick={handleProceedToPayment}
//               >
//                 Proceed to Payment
//               </button>
//             </>
//           ) : showContactPaymentMessage ? (
//             <>
//               <h3 className="text-xl font-bold mb-4 text-red-500">Payment Processing</h3>
//               <p className="text-sm mb-6 text-gray-600">
//                 Please reach out to the Admin for further instructions to complete your payment securely.
//               </p>
//             </>
//           ) : (
//             <>
//               <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
//               <div className="space-y-4 mb-6">
//                 <label className="flex items-center space-x-3 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     className="hidden"
//                     onChange={() => handlePaymentSelection("contact")}
//                   />
//                   <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
//                     {paymentMethod === "contact" && <div className="w-3 h-3 bg-green-600 rounded-full"></div>}
//                   </div>
//                   <span className="text-gray-700">Contact for Payment</span>
//                 </label>
//                 <label className="flex items-center space-x-3 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="payment"
//                     className="hidden"
//                     onChange={() => handlePaymentSelection("card")}
//                   />
//                   <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
//                     {paymentMethod === "card" && <div className="w-3 h-3 bg-green-600 rounded-full"></div>}
//                   </div>
//                   <span className="text-gray-700">Card Payment</span>
//                 </label>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h4 className="font-semibold mb-2">Bank Information</h4>
//                 <p className="text-sm text-gray-600">Please transfer the total amount to the following account:</p>
//                 <ul className="mt-2 text-sm space-y-1 text-gray-700">
//                   <li><span className="font-semibold">Bank Name: </span>Example Bank</li>
//                   <li><span className="font-semibold">Account Name: </span>Your Company Name</li>
//                   <li><span className="font-semibold">Account Number: </span>1234567890</li>
//                   <li><span className="font-semibold">Sort Code: </span>12-34-56</li>
//                   <li><span className="font-semibold">Reference: </span>Your Order Number</li>
//                 </ul>
//               </div>
//               <button
//                 className="w-full bg-green-600 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
//                 onClick={handleProceedToPayment}
//               >
//                 Proceed with Contact Payment
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethod: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  // const cartTotal = 100; // Replace with actual cart total fetched from context or state

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
  };

  const handleProceedToPayment = () => {
    if (paymentMethod === "paypal") {
      const paypalUrl = "https://www.paypal.com/webapps/hermes?token=5MC46650049923032&useraction=commit&wpsFlowRedirectToXorouterSkipHermesStartTime=1741790725443&flowType=WPS&mfid=1741790725214_f12051256869f";
      window.location.href = paypalUrl; // Redirects to PayPal in the same tab
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
          <div className="space-y-4 mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                className="hidden"
                onChange={() => handlePaymentSelection("card")}
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                {paymentMethod === "card" && <div className="w-3 h-3 bg-green-600 rounded-full"></div>}
              </div>
              <span className="text-gray-700">Card Payment</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                className="hidden"
                onChange={() => handlePaymentSelection("paypal")}
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                {paymentMethod === "paypal" && <div className="w-3 h-3 bg-green-600 rounded-full"></div>}
              </div>
              <span className="text-gray-700">PayPal Payment</span>
            </label>
            {/* <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                className="hidden"

                onChange={() => handlePaymentSelection("card")}
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                {paymentMethod === "card" && <div className="w-3 h-3 bg-green-600 rounded-full"></div>}
              </div>
              <span className="text-gray-700">Card Payment</span>
            </label> */}
          </div>
          {/* <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Bank Information</h4>
            <p className="text-sm text-gray-600">Please transfer the total amount to the following account:</p>
            <ul className="mt-2 text-sm space-y-1 text-gray-700">
              <li><span className="font-semibold">Bank Name: </span>Example Bank</li>
              <li><span className="font-semibold">Account Name: </span>Your Company Name</li>
              <li><span className="font-semibold">Account Number: </span>1234567890</li>
              <li><span className="font-semibold">Sort Code: </span>12-34-56</li>
              <li><span className="font-semibold">Reference: </span>Your Order Number</li>
            </ul>
          </div> */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;