import React from "react";
import PageLayout from "../../components/global/PageLayout";

export default function TermsAndConditions() {
    return (
        <PageLayout>
            <section className="max-w-5xl mx-auto py-20 px-6 lg:px-32 text-white bg-gradient-to-br from-blue-700 to-purple-800 rounded-3xl shadow-lg">
                <h1 className="text-5xl font-extrabold mb-8">Terms & Conditions</h1>
                <p className="mb-6 text-lg leading-relaxed">
                    Please read these terms and conditions carefully before using CalcPro.
                </p>
                <h2 className="text-2xl font-bold mb-4">Use of Service</h2>
                <p className="mb-6">
                    By accessing or using CalcPro, you agree to comply with these terms. You are responsible for your use of the services.
                </p>
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="mb-6">
                    All content and technology on CalcPro are owned by us and protected by intellectual property laws.
                </p>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="mb-6">
                    We provide our services "as is" without warranties. We are not liable for any damages resulting from use of CalcPro.
                </p>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p>
                    We may update these terms at any time. Continued use constitutes acceptance of changes.
                </p>
            </section>
        </PageLayout>
    );
}
