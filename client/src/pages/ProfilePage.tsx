import { ArrowLeft, Camera, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import React, {useState, useEffect, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

interface MockClass {
  id: number;
  name: string;
  role: "student" | "professor";
}

const mockClasses: MockClass[] = [
  { id: 1, name: "Computer Science 101", role: "student" },
  { id: 2, name: "Data Structures", role: "student" },
  { id: 3, name: "Web Development", role: "professor" },
  { id: 4, name: "Machine Learning", role: "student" },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const {user, updateProfile, logout} = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    bio: "",
    university: "",
  });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  // populate form when user is loaded
  useEffect(() => {
    if(user){
      setForm({
        username: user.username,
        email: user.email,
        bio: user.bio,
        university: user.university,
      });
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSave = async(e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback("");
    try{
      await updateProfile(form);
      setFeedback("Profile updated!");
    }catch {
      setFeedback("Failed to update profile");
    }finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50  text-gray-800">
      {/* Header */}
      <div className="flex flex-row justify-center gap-5 items-center bg-gray-50 border-gray-300 px-6 py-5 shadow-sm">
        <div className="hover:bg-gray-200 p-2 rounded-xl">
            <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
            >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
            </button>
        </div>
        <h1 className="text-lg font-semibold">Profile Settings</h1>
      </div>

      {/* Content */}
      <form onSubmit={handleSave} className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture Card */}
          <div className="lg:col-span-1 bg-white px-6 py-10 rounded-lg shadow-sm">
            <h2 className="font-medium mb-4">Profile Picture</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500">
                  <img
                    src={placeholder}
                    alt="Profile"
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-white shadow rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="p-2 hover:bg-gray-100 rounded-xl w-full flex justify-center">
                <button className="text-sm text-black">
                    Change Picture
                </button>
              </div>
            </div>
          </div>

          {/* Profile Information Card */}
          <div className="lg:col-span-2 bg-white px-6 py-10 rounded-lg shadow-sm min-h-80">
            <div className="flex flex-row items-center justify-between mb-4">
              <h2 className="font-medium">Profile Information</h2>
              <button className="text-sm text-black flex items-center gap-1 hover:underline">
                <Edit className="h-4 w-4" />
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="text-semibold text-sm text-gray-600">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring focus:ring-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300  rounded-lg text-sm focus:ring focus:ring-gray-300"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="bio" className="text-sm text-gray-600">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300  rounded-lg text-sm focus:ring focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Classes Card */}
          <div className="lg:col-span-3 bg-white px-6 py-10 rounded-lg shadow-sm">
            <h2 className="font-medium mb-4">Your Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockClasses.map(ci => (
                <div
                  key={ci.id}
                  className="p-4 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm">{ci.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        ci.role === "professor"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {ci.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {ci.role === "professor" ? "Teaching" : "Enrolled"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={async () => { await logout(); navigate("/login", { replace: true }); }}
            className="text-sm text-red-600 hover:underline"
          >
            Log out
          </button>
          <div className="flex items-center gap-4">
            {feedback && <span className="text-sm text-green-600">{feedback}</span>}
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-black text-sm text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
