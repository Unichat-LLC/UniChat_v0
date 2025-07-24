import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { Search, GraduationCap, Users, Settings, BookOpen, ArrowRight } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  const universities = [
    "University of Cincinnati",
    "Ohio State University",
    "Stanford University",
    "Harvard University",
    "MIT",
  ];

  const [universityQuery, setUniversityQuery] = useState("");
  const [classQuery, setClassQuery] = useState("");
  const [showUniversitySuggestions, setShowUniversitySuggestions] = useState(false);

  const filteredUniversities = universities.filter((u) =>
    u.toLowerCase().includes(universityQuery.toLowerCase())
  );

  const handleUniversitySelect = (university: string) => {
    setUniversityQuery(university);
    setShowUniversitySuggestions(false);
  };

  const handleUniversitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle university search logic
  };

  const handleClassSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle class search logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 text-black rounded-full text-sm font-medium mb-4">
              Connect • Learn • Succeed
            </div>
            <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
              Group chats that actually help
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Join university group chats for your classes. Get help with coursework, 
              collaborate on projects, and build your academic community.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              {/* University Search */}
              <div className="border border-gray-200 bg-white rounded-xl shadow-md">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Find Your University</h3>
                      <p className="text-sm text-gray-500">Search for your school</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleUniversitySearch} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 " />
                      <input
                        type="text"
                        value={universityQuery}
                        onChange={(e) => {
                          setUniversityQuery(e.target.value);
                          setShowUniversitySuggestions(true);
                        }}
                        placeholder="Search your university..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 text-sm border border-gray-200 rounded-md"
                      />
                      {showUniversitySuggestions && universityQuery && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50">
                          {filteredUniversities.length > 0 ? (
                            filteredUniversities.map((university) => (
                              <button
                                key={university}
                                type="button"
                                className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm"
                                onClick={() => handleUniversitySelect(university)}
                              >
                                {university}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-muted-foreground">
                              No universities found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer px-4 py-2 rounded-lg text-sm  flex items-center justify-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Sync with Canvas
                    </button>
                  </form>
                </div>
              </div>

              {/* Class Search */}
              <div className="border border-gray-200 bg-white rounded-xl shadow-md">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Find Your Classes</h3>
                      <p className="text-sm text-gray-500">Connect with classmates</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleClassSearch} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        value={classQuery}
                        onChange={(e) => setClassQuery(e.target.value)}
                        placeholder="Search your classes..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm"
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="w-full border border-gray-200 cursor-pointer text-sm bg-gray-50 text-black hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center justify-center"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Join Group Chat
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why choose Unichat?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center bg-white border border-gray-200 rounded-xl shadow-md p-6">
                <div className="h-16 w-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-2">Connect</h3>
                <p className="text-gray-500 text-sm">
                  Find classmates and build study groups for better learning outcomes
                </p>
              </div>
              <div className="text-center bg-white border border-gray-200 rounded-xl shadow-md p-6">
                <div className="h-16 w-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-2">Learn</h3>
                <p className="text-gray-500 text-sm">
                  Get help with coursework and share knowledge with peers
                </p>
              </div>
              <div className="text-center bg-white border border-gray-200 rounded-xl shadow-md p-6">
                <div className="h-16 w-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-black mb-2">Succeed</h3>
                <p className="text-gray-500 text-sm">
                  Improve your academic performance through collaboration
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="rounded-2xl p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to get started?
              </h2>
              <p className="text-gray-500 mb-8 text-md">
                Join thousands of students already using Unichat to succeed in their studies
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-md text-md cursor-pointer flex items-center justify-center mx-auto"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}