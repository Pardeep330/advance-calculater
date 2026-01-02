import React from "react";
import PageLayout from "../../components/global/PageLayout";

export default function AboutUs() {
    return (
        <PageLayout>
            <section className="max-w-5xl mx-auto py-20 px-6 lg:px-32 text-white bg-gradient-to-br from-blue-700 to-purple-800 rounded-3xl shadow-lg">
                <h1 className="text-5xl font-extrabold mb-8">About Us</h1>
                <p className="text-lg leading-relaxed mb-6">
                    Welcome to CalcPro, your trusted partner in professional calculations.
                    We specialize in providing advanced, precise, and lightning-fast calculation tools for experts across various fields including finance, engineering, and science.
                </p>
                <p className="text-lg leading-relaxed">
                    Our mission is to empower professionals with intuitive interfaces and powerful algorithms, ensuring accurate results every time.
                    We prioritize security and privacy to keep your data safe while delivering a seamless user experience.
                </p>
            </section>
        </PageLayout>
    );
}
