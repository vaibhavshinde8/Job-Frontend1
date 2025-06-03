import React from 'react';
import axiosInstance from '@/axios/axiosConfig';
import { toast } from 'sonner'

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RazorpayButton = () => {
  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Please try again.");
      return;
    }

    const amount = 500;

    const { data } = await axiosInstance.post("payment/create-order", { amount });
    const order = data.data;  // FIXED HERE
    
    const options = {
      key: "rzp_test_8QaSVEOkXKJiK9",
      amount: order.amount,
      currency: "INR",
      name: "HireHustle",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
        console.log(response)
        const result = await axiosInstance.post("payment/verify", {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
    
        alert(result.data.message);
      },
      prefill: {
        name: "Abhishek",
        email: "abhishek@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    
    

    rzp1.on("payment.failed", async function (response) {
      await axiosInstance.post("payment/payment-failed", {
        orderId: response.error.metadata.order_id,
        status: "failed",
        reason: response.error.description,
      });
      alert("Payment failed: " + response.error.description);
    });

    rzp1.open();
  };

  return <button onClick={handlePayment}>Pay ₹5</button>;
};

export default RazorpayButton;
