import { Check, X } from "lucide-react";
import Header from "../components/header";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual students getting started",
      popular: false,
      features: [
        { name: "Up to 3 servers", included: true },
        { name: "Basic messaging", included: true },
        { name: "File sharing (100MB)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Email support", included: true },
        { name: "Advanced features", included: false },
        { name: "Priority support", included: false },
        { name: "Custom integrations", included: false }
      ]
    },
    {
      name: "Student",
      price: "$9",
      period: "month",
      description: "Ideal for active students in multiple courses",
      popular: true,
      features: [
        { name: "Unlimited servers", included: true },
        { name: "Advanced messaging", included: true },
        { name: "File sharing (1GB)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Email support", included: true },
        { name: "Study groups", included: true },
        { name: "Calendar integration", included: true },
        { name: "Custom integrations", included: false }
      ]
    },
    {
      name: "Educator",
      price: "$19",
      period: "month",
      description: "Designed for professors and teaching assistants",
      popular: false,
      features: [
        { name: "Unlimited servers", included: true },
        { name: "Advanced messaging", included: true },
        { name: "File sharing (5GB)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Priority support", included: true },
        { name: "Classroom management", included: true },
        { name: "Grade integration", included: true },
        { name: "Custom integrations", included: true }
      ]
    },
    {
      name: "Institution",
      price: "Custom",
      period: "contact us",
      description: "Comprehensive solution for universities and schools",
      popular: false,
      features: [
        { name: "Unlimited everything", included: true },
        { name: "Advanced messaging", included: true },
        { name: "Unlimited file sharing", included: true },
        { name: "Mobile app access", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Admin dashboard", included: true },
        { name: "SSO integration", included: true },
        { name: "Custom development", included: true }
      ]
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "All paid plans come with a 14-day free trial. No credit card required to start."
    },
    {
      question: "What happens if I exceed my limits?",
      answer: "We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional resources."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! Students with valid .edu email addresses get 50% off all paid plans."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold text-black mb-6">
                    Choose Your Plan
                </h1>
                <p className="text-gray-500 text-md max-w-3xl mx-auto leading-relaxed">
                    Start for free and upgrade as you grow. All plans include our core features 
                    with additional benefits for students, educators, and institutions.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {plans.map((plan, index) => (
                    <div key={index} className={`relative ${plan.popular ? 'border border-black' : 'border border-gray-200'} bg-white  rounded-xl p-8 shadow-md`}>
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <div className="bg-black text-xs px-2 py-1 rounded-xl text-white">
                                    Most Popular
                                </div>
                            </div>
                        )}
                        <div className="text-center ">
                            <h1 className="text-lg font-semibold">{plan.name}</h1>
                            <div className="mt-4 mb-2">
                                <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                                <span className="text-gray-500">/{plan.period}</span>
                            </div>
                            <p className="text-gray-500 text-sm pb-5 leading-relaxed">
                            {plan.description}
                            </p>
                        </div>
                    <div>
                        <button className={`w-full py-3 rounded-lg font-medium transition-colors mb-6 ${
                        plan.popular 
                            ? 'bg-black text-white hover:bg-gray-900 cursor-pointer' 
                            : 'border border-gray-200 hover:bg-gray-100 cursor-pointer'
                        }`}>
                        {plan.name === "Institution" ? "Contact Sales" : "Get Started"}
                        </button>
                        
                        <div className="space-y-3">
                            {plan.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-3">
                                {feature.included ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                    <X className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className={`text-sm ${
                                    feature.included ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                    {feature.name}
                                </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
                <h2 className="text-xl font-bold text-black text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                        <div className="pb-2 text-md">
                            <h1 className="text-lg">{faq.question}</h1>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Enterprise Section */}
            <div className="text-center">
                <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-black mb-4">
                    Need Something Custom?
                    </h2>
                    <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
                    We work with educational institutions to create custom solutions that fit 
                    their unique needs. Get in touch to discuss enterprise pricing and features.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-md cursor-pointer">
                        Contact Sales
                    </button>
                    <button className="px-8 py-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors font-md cursor-pointer">
                        Schedule Demo
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Pricing;