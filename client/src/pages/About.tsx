import { Users, MessageSquare, Shield, Zap } from "lucide-react";
import Header from "../components/header";

const About = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Connect instantly with students and professors through our modern chat interface."
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Build study groups, share resources, and work together on projects seamlessly."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations and data are protected with end-to-end encryption."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with instant message delivery and minimal latency."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Universities" },
    { number: "50,000+", label: "Messages Daily" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold text-foreground mb-6">
                    Connecting Students & Educators
                </h1>
                <p className="text-gray-500 text-md max-w-3xl mx-auto leading-relaxed">
                    We're building the future of educational communication. Our platform brings students, 
                    professors, and educational institutions together in a secure, efficient, and 
                    user-friendly environment designed specifically for academic collaboration.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center bg-white border border-gray-200 rounded-xl">
                        <div className="p-6">
                            <div className="text-2xl font-bold text-black mb-2">{stat.number}</div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-black text-center mb-12">
                    Why Choose Our Platform?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                    <div key={index} className="text-center bg-white border border-gray-200 rounded-xl p-5">
                        <div>
                        <div className="mx-auto mb-4 p-3 bg-gray-200 rounded-full w-fit">
                            <feature.icon className="h-6 w-6 text-foreground" />
                        </div>
                        <h1 className="text-md font-semibold pb-4">{feature.title}</h1>
                        </div>
                        <div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="mb-16 bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl text-center pb-5">Our Mission</h2>
                <p className="text-gray-500 text-center text-md leading-relaxed max-w-4xl mx-auto">
                    To transform the way students and educators communicate by providing a platform that 
                    fosters meaningful connections, enhances learning experiences, and builds stronger 
                    academic communities. We believe that great education happens when communication 
                    barriers are removed and collaboration is made simple.
                </p>
            </div>

            {/* Team Section */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                    Built by Educators, for Educators
                </h2>
                <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto text-md mb-8">
                    Our team combines decades of experience in education technology, software development, 
                    and user experience design. We understand the unique challenges facing modern education 
                    because we've lived them ourselves.
                </p>
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-8">
                    <h3 className="text-xl font-semibold text-black mb-4">
                    Join Our Community
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Ready to experience the future of educational communication?
                    </p>
                    <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Get Started Today
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;