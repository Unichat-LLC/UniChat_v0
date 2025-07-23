import { Book, Video, Download, ExternalLink, FileText, Headphones } from "lucide-react";
import Header from "../components/header";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Getting Started",
      description: "Essential guides to help you begin your journey",
      icon: Book,
      badge: "New User",
      resources: [
        { name: "Platform Overview", type: "guide", icon: FileText },
        { name: "Setting Up Your Profile", type: "tutorial", icon: Video },
        { name: "First Steps Checklist", type: "download", icon: Download },
        { name: "Quick Start Video", type: "video", icon: Video }
      ]
    },
    {
      title: "For Students",
      description: "Resources tailored for student success",
      icon: Book,
      badge: "Students",
      resources: [
        { name: "Study Group Best Practices", type: "guide", icon: FileText },
        { name: "Collaboration Tips", type: "tutorial", icon: Video },
        { name: "Assignment Templates", type: "download", icon: Download },
        { name: "Time Management Guide", type: "external", icon: ExternalLink }
      ]
    },
    {
      title: "For Educators",
      description: "Tools and guides for teaching excellence",
      icon: Book,
      badge: "Educators",
      resources: [
        { name: "Classroom Management", type: "guide", icon: FileText },
        { name: "Assessment Strategies", type: "tutorial", icon: Video },
        { name: "Grading Rubrics", type: "download", icon: Download },
        { name: "Engagement Techniques", type: "external", icon: ExternalLink }
      ]
    },
    {
      title: "Technical Support",
      description: "Technical documentation and troubleshooting",
      icon: Book,
      badge: "Support",
      resources: [
        { name: "Troubleshooting Guide", type: "guide", icon: FileText },
        { name: "System Requirements", type: "tutorial", icon: Video },
        { name: "API Documentation", type: "external", icon: ExternalLink },
        { name: "Contact Support", type: "external", icon: Headphones }
      ]
    }
  ];

  const popularResources = [
    {
      title: "Complete User Manual",
      description: "Comprehensive guide covering all platform features",
      type: "PDF Guide",
      downloads: "2.5k",
      icon: FileText
    },
    {
      title: "Video Tutorial Series",
      description: "Step-by-step video tutorials for common tasks",
      type: "Video Series",
      downloads: "1.8k",
      icon: Video
    },
    {
      title: "Best Practices Handbook",
      description: "Proven strategies for effective online learning",
      type: "eBook",
      downloads: "3.2k",
      icon: Download
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold text-black mb-6">
                    Everything You Need to Succeed
                </h1>
                <p className="text-gray-500 text-md max-w-3xl mx-auto leading-relaxed">
                    Access our comprehensive library of guides, tutorials, templates, and tools 
                    designed to help you make the most of our platform and enhance your educational experience.
                </p>
            </div>

            {/* Popular Resources */}
            <div className="mb-16">
                <h2 className="text-xl font-bold text-black mb-8">Most Popular Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {popularResources.map((resource, index) => (
                    <div key={index} className="hover:shadow-md transition-shadow bg-white p-10 rounded-xl border border-gray-200 shadow-md">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-200 rounded-lg">
                                    <resource.icon className="h-5 w-5 text-foreground" />
                                </div>
                                <div>
                                    <div  className="text-xs p-1 bg-gray-200 rounded-md">
                                        {resource.type}
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-md pt-5">{resource.title}</h1>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                {resource.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                {resource.downloads} downloads
                                </span>
                                <button className="text-sm text-black hover:text-primary/80 transition-colors">
                                Access Resource
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Resource Categories */}
            <div className="mb-16">
                <h2 className="text-xl font-bold text-black mb-8">Browse by Category</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {resourceCategories.map((category, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 shadow-md ">
                        <div className="">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-gray-200 rounded-lg">
                                <category.icon className="h-5 w-5 text-foreground" />
                                </div>
                                <div className="text-xs p-1 bg-gray-200 rounded-lg">{category.badge}</div>
                            </div>
                            <h1 className="text-xl pt-4">{category.title}</h1>
                            <p className="text-gray-500 text-sm pb-4">
                                {category.description}
                            </p>
                        </div>
                        <div>
                        <div className="space-y-3">
                            {category.resources.map((resource, resourceIndex) => (
                            <div 
                                key={resourceIndex}
                                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-accent/50 transition-colors cursor-pointer"
                            >
                                <resource.icon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-foreground font-medium">
                                {resource.name}
                                </span>
                                <ExternalLink className="h-3 w-3 text-gray-500 ml-auto" />
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Help Section */}
            <div className="text-center bg-white border border-gray-200 rounded-xl p-8 shadow-md">
                <h2 className="text-xl font-bold text-foreground mb-4">
                Need Additional Help?
                </h2>
                <p className="text-gray-500 text-md leading-relaxed max-w-2xl mx-auto mb-8">
                Can't find what you're looking for? Our support team is ready to assist you 
                with personalized guidance and answers to your specific questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer transition-colors font-md">
                        Contact Support
                    </button>
                    <button className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors font-md">
                        Browse FAQ
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Resources;