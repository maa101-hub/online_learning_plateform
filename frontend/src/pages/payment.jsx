import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, User, Calendar, Clock, Star, Play, CheckCircle, CreditCard, Lock, ArrowLeft  } from "lucide-react";
import api from "../utils/api";
import { useState } from "react";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  if (!course) {
    return <div className="text-center text-red-500 mt-10">Course data not found.</div>;
  }

  const loadRazorpay = async (orderData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // or use process.env in Vite/React app
      amount: orderData.amount,
      currency: orderData.currency,
      name: "EduVerse",
      description: course.title,
      order_id: orderData.order_id,
      handler: async function (response) {

        const payload = {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
    course_id: course.course_id,
    title: course.title,
    amount: orderData.amount
  };
 setLoading(true);
  await api.post('/student/payment/enroll', payload);
   
  toast.success("Payment Successful!!", { autoClose: 500 });
  
     setLoading(false);
        setTimeout(() => {
            navigate('/student/dashboard');
          }, 1000);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

 
  const orderSummary = {
    subtotal: (course.price*(1- course.offer/100)).toFixed(2),
    tax: Number(((course.price*(1- course.offer/100))* 0.08).toFixed(2)), // 8% tax
    total: Number(((course.price*(1- course.offer/100))* 1.08).toFixed(2))
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
   
      const res = await api.post(
        '/payment/create-order',
        {
          ...formData,
          course_id: course.course_id,
          amount: orderSummary.total,
          currency: 'INR',
        },
        
      );

      loadRazorpay(res.data);
    } catch (error) {
      console.error("Payment init failed", error);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full mx-auto bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-100 min-h-screen">
  {/* Navbar */}

  
  <nav className="bg-white/70 backdrop-blur border-b border-purple-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-inner">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            EduVerse
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-emerald-600" />
          <span className="text-sm text-emerald-600 font-medium">Secure Checkout</span>
        </div>
      </div>
    </div>
  </nav>

  {/* Main Content */}
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-purple-700 hover:text-purple-900 font-medium mb-6 hover:underline"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Course
    </button>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-2">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">Complete Your Purchase</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone"].map((field) => (
              <input
                key={field}
                name={field}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                placeholder={field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-300 outline-none"
              />
            ))}
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md h-28 resize-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay ₹${orderSummary.total}`}
            </button>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-24 border border-slate-200">
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Order Summary</h3>

          <div className="flex items-start space-x-4 mb-4">
            <img
              src={course.image}
              alt={course.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold text-sm text-slate-800">{course.title}</h4>
              <p className="text-xs text-gray-500">by {course.instructor}</p>
              <div className="flex gap-2 mt-1 text-xs text-gray-600">
                <span className="bg-gray-100 px-2 py-0.5 rounded">{course.level}</span>
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-700 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{orderSummary.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>₹{orderSummary.tax}</span>
            </div>
            <div className="border-t border-dashed my-2"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{orderSummary.total}</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg text-green-700 text-sm mb-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">What’s included:</span>
            </div>
            <ul className="list-disc ml-5 space-y-1">
              <li>Lifetime access to course</li>
              <li>All course materials</li>
              <li>Certificate of completion</li>
              
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-blue-700 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="h-4 w-4" />
              <span className="font-medium">Secure Payment</span>
            </div>
            <p className="text-xs">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default PaymentPage;
