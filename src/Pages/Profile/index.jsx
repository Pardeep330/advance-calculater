import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ShieldCheck,
} from "lucide-react";
import PageLayout from "../../components/global/PageLayout";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate()
    return (
        <PageLayout>
            <div className="min-h-screen bg-gray-50 px-6 py-10">
                <div className="max-w-[1600px] mx-auto">

                    {/* Page Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                        <p className="text-gray-500 mt-1">
                            View and manage your personal information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                            <img
                                src="https://i.pravatar.cc/150?img=12"
                                alt="User"
                                className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                            />
                            <h2 className="text-xl font-bold text-gray-800">
                                Pardeep Kumar
                            </h2>
                            <p className="text-gray-500">Product Manager</p>

                            <div className="mt-6 flex justify-center gap-4">
                                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                                    Active
                                </span>
                                <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                                    Pro Plan
                                </span>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="flex items-center gap-4">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium text-gray-800">
                                            Pardeep Kumar
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-800">
                                            pardeep@example.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium text-gray-800">
                                            +1 234 567 890
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium text-gray-800">
                                            San Francisco, USA
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Joined</p>
                                        <p className="font-medium text-gray-800">
                                            January 12, 2024
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Account Type</p>
                                        <p className="font-medium text-gray-800">
                                            Verified User
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Action Buttons */}
                            <div className="mt-10 flex flex-wrap gap-4">
                                <button onClick={e => navigate("/edit/profile")} className="px-6 py-3 bg-[#1E9ABC] text-white rounded-xl font-medium hover:opacity-90 transition">
                                    Edit Profile
                                </button>
                                <button onClick={e => navigate("/change-password")} className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition">
                                    Change Password
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
