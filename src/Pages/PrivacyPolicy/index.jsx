import React from "react";
import PageLayout from "../../components/global/PageLayout";

export default function PrivacyPolicy() {
    return (
        <PageLayout>
            <section className="max-w-5xl mx-auto py-20 px-6 lg:px-32 text-white bg-gradient-to-br from-blue-700 to-purple-800 rounded-3xl shadow-lg">
                <h1 className="text-5xl font-extrabold mb-8">Privacy Policy</h1>
                <p className="mb-6 text-lg leading-relaxed">
                    Your privacy is critically important to us. At CalcPro, we are committed to protecting your data and using it responsibly.
                </p>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <p className="mb-6">
                    We collect only the information necessary to provide and improve our services, including account details, usage data, and preferences.
                </p>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="mb-6">
                    Your data is used to deliver services, improve functionality, and communicate important updates. We never sell your personal information to third parties.
                </p>
                <h2 className="text-2xl font-bold mb-4">Security</h2>
                <p className="mb-6">
                    We implement strong security measures to safeguard your information from unauthorized access.
                </p>
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <p>
                    For any privacy concerns, please contact us through the Contact Us page.
                </p>
            </section>
        </PageLayout>
    );
}
