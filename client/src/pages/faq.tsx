import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Header from "../components/header";

export default function FAQ () {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I create a new account?",
      answer: "To create a new account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your email, username, and password, then verify your email address through the confirmation link we'll send you."
    },
    {
      question: "How can I reset my password?",
      answer: "If you've forgotten your password, click on 'Forgot Password' on the login page. Enter your email address and we'll send you a secure link to reset your password. The link will expire after 24 hours for security purposes."
    },
    {
      question: "How do I join a server or class?",
      answer: "You can join a server by receiving an invitation link from the server administrator, or by searching for public servers in the 'Browse Servers' section. Click on the server you want to join and request access if it's private."
    },
    {
      question: "Can I customize my profile?",
      answer: "Yes! Go to your profile settings by clicking on your avatar in the sidebar. You can upload a profile picture, set a custom status, update your display name, and customize your privacy settings."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "If you encounter inappropriate content or behavior, click on the three dots menu next to the message or user, then select 'Report'. Provide a brief description of the issue and our moderation team will review it within 24 hours."
    },
    {
      question: "Is my data secure and private?",
      answer: "We take your privacy seriously. All messages are encrypted in transit, and we don't sell your personal data to third parties. You can review our full privacy policy and data handling practices in the Privacy section of our website."
    },
    {
      question: "How do I enable dark mode?",
      answer: "Currently, the application uses a light theme by default. Dark mode functionality may be added in future updates. You can check the settings page for any available theme options."
    },
    {
      question: "Can I use the platform on mobile devices?",
      answer: "Yes, our platform is responsive and works on mobile devices through your web browser. We're also working on dedicated mobile apps for iOS and Android that will be available soon."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50  ">
        <Header/>
        <div className="min-w-4xl max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
            </h1>
            <p className="text-gray-500 text-md max-w-2xl mx-auto">
                Find answers to common questions about our platform. Can't find what you're looking for? 
                Contact our support team for personalized assistance.
            </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div 
                key={index}
                className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden"
                >
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                    <h3 className="text-md font-semibold text-foreground pr-4">
                    {faq.question}
                    </h3>
                    {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                </button>
                
                {openIndex === index && (
                    <div className="px-6 pb-4 border-t border-gray-200">
                    <p className="text-gray-600 pt-4 text-sm leading-relaxed">
                        {faq.answer}
                    </p>
                    </div>
                )}
                </div>
            ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 text-center bg-gray-100 border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
                Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
                Our support team is here to help you with any questions or concerns.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Contact Support
            </button>
            </div>
        </div>
    </div>
  );
};
