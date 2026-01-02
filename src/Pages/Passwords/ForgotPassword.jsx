import { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Forgot password email:", email);
        // Navigate to Reset Password page after submission
        navigate("/reset-password");
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                        <img src="/favicon-32x32.png" alt="Calculator Logo" className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Forgot Password
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Enter your email to reset your password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Remembered your password?
                    <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer hover:underline ml-1">
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}
