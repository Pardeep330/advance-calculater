import React from "react";
import PageLayout from "../../components/global/PageLayout";

const plans = [
    {
        title: "Basic",
        price: "$9.99/mo",
        features: [
            "Standard calculations",
            "Limited history",
            "Email support",
        ],
    },
    {
        title: "Pro",
        price: "$29.99/mo",
        features: [
            "Advanced scientific & financial calculations",
            "Unlimited history",
            "Priority support",
            "Data export",
        ],
    },
    {
        title: "Enterprise",
        price: "Custom Pricing",
        features: [
            "Team collaboration",
            "Custom integrations",
            "Dedicated support",
            "On-premise deployment",
        ],
    },
];

export default function Plans() {
    return (
        <PageLayout>
            <section className="max-w-7xl mx-auto py-20 px-6 lg:px-32 text-white bg-gradient-to-br from-blue-700 to-purple-800 rounded-3xl shadow-lg">
                <h1 className="text-5xl font-extrabold mb-12 text-center">Plans & Pricing</h1>
                <div className="grid md:grid-cols-3 gap-10">
                    {plans.map((plan, i) => (
                        <div key={i} className="bg-purple-900 rounded-3xl p-8 shadow-xl hover:scale-105 transition transform">
                            <h2 className="text-3xl font-bold mb-4">{plan.title}</h2>
                            <p className="text-yellow-400 font-extrabold text-2xl mb-6">{plan.price}</p>
                            <ul className="mb-6 space-y-2 text-gray-300">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>• {feature}</li>
                                ))}
                            </ul>
                            <button className="w-full bg-yellow-400 text-purple-900 font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
