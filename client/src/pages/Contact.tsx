import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react";
import Header from "../components/header";

const ContactUs = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get in touch via email for general inquiries and support.",
      contact: "support@educonnect.com",
      response: "Response within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team during business hours.",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help through our live chat feature.",
      contact: "Available on all pages",
      response: "Real-time support"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Dedicated assistance for complex issues.",
      contact: "tech@educonnect.com",
      response: "Response within 12 hours"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Education Street, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "New York",
      address: "456 Learning Avenue, New York, NY 10001",
      phone: "+1 (555) 987-6543"
    },
    {
      city: "Austin",
      address: "789 Innovation Blvd, Austin, TX 73301",
      phone: "+1 (555) 456-7890"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
            <h1 className="text-3xl font-bold text-black mb-6">
                Get in Touch
            </h1>
            <p className="text-gray-500 text-md max-w-3xl mx-auto leading-relaxed">
                Have questions, feedback, or need support? We're here to help. Reach out to us 
                through any of the channels below and our team will get back to you as soon as possible.
            </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
                <div key={index} className="text-center bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                    <div>
                        <div className="mx-auto mb-4 p-3 bg-gray-200 rounded-full w-fit">
                        <method.icon className="h-6 w-6 text-black" />
                        </div>
                        <h1 className="text-md font-medium pb-5">{method.title}</h1>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                        {method.description}
                        </p>
                        <div className="space-y-2">
                        <p className="text-black font-medium text-sm">{method.contact}</p>
                        <p className="text-gray-500 text-xs">{method.response}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>

            {/* Contact Form and Office Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Contact Form */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md space-y-6">
                    <div>
                        <h1 className="text-xl font-semibold">Send us a Message</h1>
                        <p className="text-gray-500 text-md">
                            Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </div>
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="firstName" className="font-semibold">First Name</label>
                                <input id="firstName" placeholder="Enter your first name" className="border border-gray-200 p-2 rounded-lg" />
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="lastName" className="font-semibold">Last Name</label>
                                <input id="lastName" placeholder="Enter your last name" className="border border-gray-200 p-2 rounded-lg" />
                            </div>
                        </div>
                    
                        <div className="space-y-2 text-sm flex flex-col">
                            <label htmlFor="email" className="font-semibold ">Email</label>
                            <input id="email" type="email" placeholder="Enter your email address" className="border border-gray-200 p-2 rounded-lg" />
                        </div>
                    
                        <div className="space-y-2 text-sm flex flex-col">
                            <label htmlFor="subject" className="font-semibold">Subject</label>
                            <input id="subject" placeholder="What is this regarding?" className="border border-gray-200 p-2 rounded-lg" />
                        </div>
                    
                        <div className="space-y-2 text-sm flex flex-col">
                            <label htmlFor="message" className="font-semibold">Message</label>
                            <textarea 
                            id="message" 
                            placeholder="Tell us more about your inquiry..."
                            className="min-h-[120px] border border-gray-200 p-2 rounded-lg"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button className="text-md bg-black text-white py-2 px-4 rounded-lg font-semibold">
                                Send Message
                            </button>
                        </div>
                        
                    </div>
                </div>

                {/* Office Locations */}
                <div className="space-y-6">
                    <div>
                    <h2 className="text-xl font-bold text-black mb-4">
                        Office Locations
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Visit us at one of our office locations or reach out through any of our digital channels.
                    </p>
                    </div>
                    
                    <div className="space-y-4">
                    {offices.map((office, index) => (
                        <div key={index}>
                        <div className="">
                            <div className="flex items-start space-x-3 bg-white border border-gray-200 rounded-lg p-8 shadow-md">
                                <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-md font-semibold text-black mb-2">
                                    {office.city}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                                    {office.address}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-black text-sm">{office.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md space-y-4">
                        <div>
                            <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-black" />
                            <h1 className="text-md font-semibold">Business Hours</h1>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Monday - Friday</span>
                                <span className="text-black">9:00 AM - 6:00 PM EST</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Saturday</span>
                                <span className="text-black">10:00 AM - 4:00 PM EST</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Sunday</span>
                                <span className="text-black">Closed</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Support */}
            <div className="text-center bg-white border border-gray-200 rounded-xl p-8 shadow-md space-y-5">
                <div>
                    <h1 className="text-xl font-semibold">Need Urgent Help?</h1>
                </div>
                <div>
                    <p className="text-gray-500 text-md mb-6 max-w-2xl mx-auto">
                    For critical issues affecting your educational activities, our emergency support team 
                    is available 24/7 to ensure minimal disruption to your learning experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="cursor-pointer border border-gray-200 rounded-lg p-2 text-sm font-semibold">
                            Call Emergency Line: +1 (555) 911-HELP
                        </button>
                        <button className="bg-black text-white py-2 px-3 rounded-lg text-sm font-semibold">
                            Start Live Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactUs;