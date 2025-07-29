import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import universitiesData from "../lib/universities.json";
import { Search } from "lucide-react";

interface GroupModalProps {
  show: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<GroupModalProps> = ({ show, onClose }) => {
  const { createGroup, joinGroup, getAllGroups, allGroups } = useChat();

  const [activeTab, setActiveTab] = useState<"create" | "join">("join");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [universityQuery, setUniversityQuery] = useState("");
  const [showUniversitySuggestions, setShowUniversitySuggestions] = useState(false);

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [classQuery, setClassQuery] = useState("");
  const [showClassSuggestions, setShowClassSuggestions] = useState(false);

  const universityNames = Object.keys(universitiesData);

  const filteredUniversities = universityNames.filter((u) =>
    u.toLowerCase().includes(universityQuery.toLowerCase())
  );

  const filteredClasses = allGroups.filter((group) =>
    group.name.toLowerCase().includes(classQuery.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createGroup(newName, newDesc);
    setNewName("");
    setNewDesc("");
    onClose();
  };

  const handleJoin = async () => {
    if (!selectedGroupId || !universityQuery.trim()) return;
    await joinGroup(selectedGroupId);
    setSelectedGroupId(null);
    setClassQuery("");
    onClose();
  };

  const handleUniversitySelect = (university: string) => {
    setUniversityQuery(university);
    setShowUniversitySuggestions(false);
  };

  useEffect(() => {
    if (show) {
      getAllGroups()
        .catch((err) => console.error("Failed to fetch groups:", err));
    }
  }, [show, getAllGroups]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <ul className="flex border-b mb-6">
          {["join", "create"].map((tab) => (
            <li key={tab} className="flex-1 text-center">
              <button
                onClick={() => setActiveTab(tab as "create" | "join")}
                className={`inline-flex items-center justify-center w-full p-3 border-b-2 ${
                  activeTab === tab
                    ? "text-blue-600 border-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300"
                }`}
              >
                {tab === "join" ? "Join Group" : "Create Group"}
              </button>
            </li>
          ))}
        </ul>

        {activeTab === "create" && (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Group</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Group Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter a name"
                  className="w-full px-3 py-2 border bg-gray-50 text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Enter a description"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim()}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </>
        )}

        {activeTab === "join" && (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Join your class</h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">University</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
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
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-500 rounded-md shadow-lg z-50">
                      {filteredUniversities.length > 0 ? (
                        filteredUniversities.map((name) => (
                          <button
                            key={name}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => handleUniversitySelect(name)}
                          >
                            {name}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No universities found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">Course Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={classQuery}
                    onChange={(e) => {
                      setClassQuery(e.target.value);
                      setShowClassSuggestions(true);
                    }}
                    placeholder="Search class..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 text-sm border border-gray-200 rounded-md"
                  />
                  {showClassSuggestions && classQuery && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-500 rounded-md shadow-lg z-50">
                      {filteredClasses.length > 0 ? (
                        filteredClasses.map((group) => (
                          <button
                            key={group.id}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => {
                              setClassQuery(group.name);
                              setSelectedGroupId(group.id);
                              setShowClassSuggestions(false);
                            }}
                          >
                            {group.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No classes found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button
                onClick={handleJoin}
                disabled={!selectedGroupId || !universityQuery.trim()}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Join
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateGroupModal;
