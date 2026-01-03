import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
} from "lucide-react";
import PageLayout from "../../components/global/PageLayout";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate()

    return (
        <PageLayout>
            <div className="min-h-screen bg-gray-50 px-6 py-10">
                <div className="max-w-[1600px] mx-auto">

                    {/* Page Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
                        <p className="text-gray-500 mt-1">
                            Update your personal information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Avatar Section */}
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                            <div className="relative w-36 h-36 mx-auto mb-4">
                                <img
                                    src="https://i.pravatar.cc/150?img=12"
                                    alt="User"
                                    className="w-36 h-36 rounded-full object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-[#1E9ABC] p-2 rounded-full cursor-pointer">
                                    <Camera className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Pardeep Kumar
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Upload a new profile picture
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">
                                Personal Details
                            </h3>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                        <input
                                            type="text"
                                            defaultValue="Pardeep Kumar"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E9ABC]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                        <input
                                            type="email"
                                            defaultValue="pardeep@example.com"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E9ABC]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Phone
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                        <input
                                            type="text"
                                            defaultValue="+1 234 567 890"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E9ABC]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                        <input
                                            type="text"
                                            defaultValue="San Francisco, USA"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E9ABC]"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Bio
                                    </label>
                                    <textarea
                                        rows="4"
                                        defaultValue="Product manager with a passion for building scalable platforms."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E9ABC]"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="md:col-span-2 flex gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="px-8 py-3 bg-[#1E9ABC] text-white rounded-xl font-medium hover:opacity-90 transition"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={e => navigate("/profile")}
                                        type="button"
                                        className="px-8 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
