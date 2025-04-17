import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000"; // Change to your backend URL

function Verify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]); // 4-digit OTP input
  const [timer, setTimer] = useState(600); // 10 minutes (600 seconds)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = localStorage.getItem("email") || ""; // Retrieve email

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const code = otp.join(""); // Convert OTP array to string

    // Validate OTP length
    if (code.length !== 4) {
      alert("Please enter the full 4-digit verification code.");
      setIsSubmitting(false);
      return;
    }

    console.log("Sending:", { email, code: parseInt(code, 10) });

    try {
      // Send OTP verification request
      const response = await axios.post(
        `${API_URL}/api/verify-email`,
        {
          email: email,
          code: parseInt(code, 10), // Convert code to integer
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("✅ Response from server:", response.data);

      if (response.data.message === "Email verified successfully. You can now log in.") {
        alert("✅ OTP verified successfully!");
        navigate("/login/Home"); // Redirect to home page
      } else {
        alert("❌ Invalid email or verification code.");
      }
    } catch (error) {
      console.error("❌ Error:", error.response?.data);

      // Display server error message
      alert(error.response?.data?.error || "OTP verification failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
        <p className="text-gray-600 mb-6">
          We have sent a 4-digit OTP to <span className="font-semibold"></span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex gap-2 my-4">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-green-500 mb-4">{formatTime(timer)}</p>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={otp.includes("") || isSubmitting}
          className="mt-4 px-6 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Verifying..." : "Verify & Login"}
        </button>
      </div>
    </div>
  );
}

export default Verify;
