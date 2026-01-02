import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const [tab, setTab] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        address: "",
        cityState: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateTab1 = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be 6+ chars";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords must match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateTab2 = () => {
        const newErrors = {};
        if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.cityState.trim()) newErrors.cityState = "City / State is required";
        if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
        else if (!/^\d{5,6}$/.test(form.pincode)) newErrors.pincode = "Pincode is invalid";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateTab1()) setTab(1);
    };

    const handleBack = () => {
        setTab(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateTab2()) {
            console.log("Signup Data:", form);
            alert("Signup Successful!");
            // Add redirect or API call here
        }
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                        <img src="/favicon-32x32.png" alt="Calculator Logo" className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
                    <p className="text-gray-500">Create your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Tab 1 */}
                    {tab === 0 && (
                        <>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${errors.firstName ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${errors.lastName ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 pr-12 ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                />
                                <span
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 pr-12 ${errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                />
                                <span
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition"
                            >
                                Next
                            </button>
                        </>
                    )}

                    {/* Tab 2 */}
                    {tab === 1 && (
                        <>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={form.mobile}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${errors.mobile ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${errors.address ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                            <input
                                type="text"
                                name="cityState"
                                placeholder="City / State"
                                value={form.cityState}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${errors.cityState ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.cityState && <p className="text-red-500 text-sm">{errors.cityState}</p>}

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={form.pincode}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${errors.pincode ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                                    }`}
                            />
                            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}

                            <div className="flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 py-3 bg-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-400 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </>
                    )}
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <span onClick={e => navigate("/login")} className="text-blue-500 font-semibold cursor-pointer hover:underline ml-1">
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}
