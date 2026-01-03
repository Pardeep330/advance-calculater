import {
    TrendingUp,
    Users,
    DollarSign,
    Activity,
} from "lucide-react";
import PageLayout from "../../components/global/PageLayout";

export default function Dashboard() {
    return (
        <PageLayout>
            <div className="min-h-screen bg-gray-50 px-6 py-10">
                <div className="max-w-[1600px] mx-auto">

                    {/* Header */}
                    <div className="max-w-7xl mx-auto mb-10">
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-500 mt-1">
                            Overview of your platform performance
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Total Revenue", value: "$124,500", icon: DollarSign, color: "bg-green-500" },
                            { label: "Active Users", value: "8,420", icon: Users, color: "bg-blue-500" },
                            { label: "Growth Rate", value: "+18%", icon: TrendingUp, color: "bg-purple-500" },
                            { label: "System Usage", value: "72%", icon: Activity, color: "bg-orange-500" },
                        ].map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-sm text-gray-500">{card.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                        {card.value}
                                    </h3>
                                </div>
                                <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-white ${card.color}`}>
                                    <card.icon className="w-6 h-6" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

                        {/* Line Chart (Static SVG) */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Revenue Overview
                            </h2>
                            <svg viewBox="0 0 400 150" className="w-full h-40">
                                <polyline
                                    fill="none"
                                    stroke="#6366F1"
                                    strokeWidth="4"
                                    points="0,120 50,90 100,100 150,70 200,80 250,40 300,60 350,20"
                                />
                            </svg>
                            <p className="text-sm text-gray-500 mt-4">
                                Monthly revenue trend (static preview)
                            </p>
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                User Activity
                            </h2>
                            <div className="flex items-end gap-4 h-40">
                                {[40, 70, 55, 90, 65, 80].map((h, i) => (
                                    <div key={i} className="flex-1">
                                        <div
                                            style={{ height: `${h}%` }}
                                            className="bg-blue-500 rounded-lg w-full"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Weekly activity (static)
                            </p>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Recent Transactions
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b">
                                        <th className="py-3">User</th>
                                        <th>Plan</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: "John Doe", plan: "Pro", amount: "$49", status: "Completed" },
                                        { name: "Sarah Lee", plan: "Starter", amount: "$19", status: "Completed" },
                                        { name: "Alex Smith", plan: "Enterprise", amount: "$99", status: "Pending" },
                                    ].map((row, index) => (
                                        <tr key={index} className="border-b last:border-0">
                                            <td className="py-4 font-medium text-gray-800">{row.name}</td>
                                            <td>{row.plan}</td>
                                            <td>{row.amount}</td>
                                            <td>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${row.status === "Completed"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"}
                      `}
                                                >
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </PageLayout>
    );
}
