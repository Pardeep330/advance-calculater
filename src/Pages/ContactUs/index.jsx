import React from "react";
import PageLayout from "../../components/global/PageLayout";

export default function ContactUs() {
    return (
        <PageLayout>
            <section className="max-w-3xl mx-auto py-20 px-6 lg:px-32 text-white bg-gradient-to-br from-blue-700 to-purple-800 rounded-3xl shadow-lg">
                <h1 className="text-5xl font-extrabold mb-8">Contact Us</h1>
                <form className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-4 rounded-lg bg-purple-900 text-white placeholder-purple-400 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-4 rounded-lg bg-purple-900 text-white placeholder-purple-400 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="p-4 rounded-lg bg-purple-900 text-white placeholder-purple-400 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                        type="submit"
                        className="self-start px-8 py-4 bg-yellow-400 text-purple-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </PageLayout>
    );
}
