import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPPage({ onVerify }) {
    const navigate=useNavigate()
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const inputsRef = useRef([]);

    // Handle input change
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // allow only digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // only last digit
        setOtp(newOtp);
        setError("");

        // Move focus to next input if digit entered
        if (value && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 4) {
            setError("Please enter all 4 digits");
            return;
        }

        // Replace with your verification logic
        if (enteredOtp === "1234") {
            alert("OTP Verified!");
            if (onVerify) onVerify();
        } else {
            setError("Invalid OTP");
        }
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div onClick={e=>navigate("/login")} className="cursor-pointer inline-flex items-center justify-center w-16 h-16 mb-4">
                        <img src="/favicon-32x32.png" alt="Calculator Logo" className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h1>
                    <p className="text-gray-500">Enter the 4-digit code sent to your email</p>
                </div>

                {/* OTP Inputs */}
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                    <div className="flex justify-between w-full max-w-xs gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputsRef.current[index] = el)}
                                className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition mt-4"
                    >
                        Verify OTP
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Didn't receive the code?
                    <span className="text-blue-500 font-semibold cursor-pointer hover:underline ml-1">
                        Resend
                    </span>
                </p>
            </div>
        </div>
    );
}
