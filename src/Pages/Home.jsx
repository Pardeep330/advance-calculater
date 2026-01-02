import { Calculator, Zap, Shield, TrendingUp, Star, ArrowRight } from "lucide-react";
import PageLayout from "../components/global/PageLayout";

export default function HomePage() {
  const features = [
    {
      icon: <Calculator className="w-10 h-10 text-white" />,
      title: "Advanced Calculations",
      description: "Scientific, financial, and statistical operations with precision.",
    },
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: "Lightning Fast",
      description: "Instant results with optimized calculation engine.",
    },
    {
      icon: <Shield className="w-10 h-10 text-white" />,
      title: "Secure & Private",
      description: "Your data remains private with end-to-end encryption.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      title: "Smart Analytics",
      description: "Track history, patterns, and export results effortlessly.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Financial Analyst",
      company: "Goldman Tech",
      image: "https://i.pravatar.cc/150?img=1",
      content: "This platform has revolutionized how I handle complex financial modeling.",
      rating: 5,
    },
    {
      name: "Dr. James Chen",
      role: "Research Scientist",
      company: "MIT Labs",
      image: "https://i.pravatar.cc/150?img=13",
      content: "Precision and reliability for advanced statistical analysis.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Engineering Manager",
      company: "SpaceX",
      image: "https://i.pravatar.cc/150?img=5",
      content: "Batch processing hundreds of calculations flawlessly.",
      rating: 5,
    },
  ];

  return (
    <PageLayout>
      <div className="w-full bg-gradient-to-br from-blue-600 to-purple-700 text-white">

        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center text-center py-32 px-6 md:px-12 lg:px-24 xl:px-32 bg-gradient-to-br from-blue-700 to-purple-800">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Professional Calculator
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              For Experts
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            From simple arithmetic to advanced algorithms, CalcPro gives you lightning-fast, accurate calculations with a beautiful, intuitive interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-purple-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              Start Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 border-2 border-white rounded-xl hover:bg-white hover:text-purple-700 transition font-semibold"
            >
              Explore Features
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-32 bg-gradient-to-tr from-purple-700 to-blue-700">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 xl:px-32 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
              Powerful Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 bg-purple-800 rounded-3xl shadow-2xl hover:scale-105 transition transform"
                >
                  <div className="mb-6 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-32 bg-gradient-to-br from-blue-800 to-purple-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 xl:px-32 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
              Trusted by Professionals
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="bg-purple-800 p-8 rounded-3xl shadow-2xl hover:scale-105 transition transform"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-200 mb-6">"{t.content}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full" />
                    <div className="text-left">
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-gray-300 text-sm">{t.role} at {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-32 bg-gradient-to-r from-yellow-400 to-pink-500 text-purple-900 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Elevate Your Calculations?
          </h2>
          <p className="text-lg md:text-xl mb-10">
            Join thousands of professionals using CalcPro for precise and efficient calculations.
          </p>
          <a
            href="/signup"
            className="px-12 py-5 bg-purple-900 text-white rounded-3xl font-bold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            Get Started Now
          </a>
        </section>

      </div>
    </PageLayout>
  );
}
