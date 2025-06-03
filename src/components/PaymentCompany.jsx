import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axios/axiosConfig';
import NavbarCompany from './shared/NavbarCompany';
import { toast } from 'sonner';
import { CreditCard, Calendar, CheckCircle } from "lucide-react";
import Navbar from './shared/Navbar';

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

const plans = [
    { id: 1, name: "Starter", price: 499, features: ["Access to 5 Top-Rated Students", "Basic Support"] },
    { id: 2, name: "Standard", price: 999, features: ["Access to 15 Top-Rated Students", "Priority Support", "Early Access to New Candidates"] },
    { id: 3, name: "Pro", price: 1999, features: ["Access to 40 Top-Rated Students", "Candidate Shortlisting Assistance", "Dedicated Support Manager"] },
    { id: 4, name: "Premium", price: 2999, features: ["Unlimited Access to Top-Rated Students", "Premium Branding on Portal", "Priority Shortlisting"] },
    { id: 5, name: "Elite", price: 4999, features: ["Unlimited Access + Exclusive Talent Pool", "Custom Hiring Solutions", "Dedicated Account Manager & Advanced Analytics"] },
];


const PaymentCompany = () => {
    const [loading, setLoading] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState([]);

    const fetchApi = async () => {
        try {
            const res = await axiosInstance.get('payment/get-payment-history');
            console.log(res.data); // or set your data into a state if needed
            setPaymentHistory(res.data.data || []);
        } catch (err) {
            console.error('Error fetching payment history', err);
            // Handle error properly, maybe show a toast or set error state
        }
    };
    
    useEffect(() => {
        fetchApi();
    }, []);

    const handlePayment = async (amount) => {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            alert("Failed to load Razorpay SDK. Please try again.");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axiosInstance.post("payment/create-order", { amount: amount });
            const order = data.data;
            
            const options = {
                key: "rzp_test_8QaSVEOkXKJiK9",
                amount: order.amount,
                currency: "INR",
                name: "HireHustle",
                description: "Subscription Payment",
                order_id: order.id,
                handler: async function (response) {
                    // Send amount along with other payment details to verify API
                    const result = await axiosInstance.post("payment/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        amount: order.amount/100,   // Add amount here
                    });
                    toast.success(result?.data?.message);
                },
                prefill: {
                    name: "Student",
                    email: "student@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#4f46e5",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", async function (response) {
                await axiosInstance.post("payment/payment-failed", {
                    orderId: response.error.metadata.order_id,
                    status: "failed",
                    reason: response.error.description,
                });
                alert("Payment failed: " + response.error.description);
            });

            rzp1.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavbarCompany />
            <div className="bg-gray-50 min-h-screen p-2 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-4">Subscription Plans</h1>

                <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">

                    {/* Payment History */}
                    <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border p-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-500" />
                            Payment History
                        </h2>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {paymentHistory.length === 0 ? (
                                <p className="text-gray-500 text-sm">No payment records found.</p>
                            ) : (
                                paymentHistory.map((payment) => (
                                    <div key={payment._id} className="p-2 bg-gray-50 rounded-xl border flex flex-col gap-1">
                                        <p className="text-sm text-gray-700 flex items-center gap-1">
                                            <CreditCard className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium">Order ID:</span> {payment.orderId}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Amount:</span> ₹{payment.amount / 100}
                                        </p>
                                        <p className={`text-sm font-medium ${payment.status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                            {payment.status === 'success' ? "✓ Successful" : "✕ Failed"}
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(payment.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Plans */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
                                <p className="text-3xl font-bold text-gray-700 mb-4">₹{plan.price}</p>
                                <ul className="text-gray-600 text-sm mb-6 space-y-2">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center justify-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handlePayment(plan.price)}
                                    disabled={loading}
                                    className="bg-[#645087] hover:bg-[#756e81] text-white py-2 px-6 rounded-lg font-medium transition disabled:opacity-50"
                                >
                                    {loading ? "Processing..." : "Choose Plan"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentCompany;
