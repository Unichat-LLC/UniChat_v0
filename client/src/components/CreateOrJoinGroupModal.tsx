import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

interface GroupModalProps {
  show: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<GroupModalProps> = ({
  show,
  onClose
}) => {

    const { createGroup, joinGroup } = useChat();

    const [activeTab, setActiveTab] = useState<"create" | "join">("join");

    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [existingGroupId, setExistingGroupId] = useState<number | null>(null);
    const [university, setUniversity] = useState("");

    const handleCreate = async () => {
        if (!newName.trim()) return;
        await createGroup(newName, newDesc);
        setNewName("");
        setNewDesc("");
        onClose();
    };

    const handleJoin = async () => {
        if (!existingGroupId) return;
        await joinGroup(existingGroupId);
        setExistingGroupId(null);
        onClose();
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
            >
            <div
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-900 flex">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                
                {/* Tab header  */}
                <ul className="flex border-b mb-6">
                    <li className="flex-1 text-center">
                        <button
                            className={`inline-flex items-center justify-center w-full p-3 border-b-2 ${
                                activeTab === "join"
                                ? "text-blue-600 border-blue-600 font-medium"
                                : "text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300"
                            }`}
                            onClick={() => setActiveTab("join")}
                            >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Join Group
                        </button>
                    </li>
                    <li className="flex-1 text-center">
                        <button
                            onClick={() => setActiveTab("create")}
                            className={`inline-flex items-center justify-center w-full p-3 border-b-2 ${
                                activeTab === "create"
                                ? "text-blue-600 border-blue-600 font-medium"
                                : "text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300"
                            }`}
                            >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                            >
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                            Create Group
                        </button>
                    </li>
                </ul>
                
                {activeTab === "create" && (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">Create New Group</h3>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                        <div>
                            <label
                            htmlFor="group-name"
                            className="block mb-1 text-sm font-medium text-gray-700"
                            >
                            Group Name
                            </label>
                            <input
                            id="group-name"
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Enter a name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                            htmlFor="group-desc"
                            className="block mb-1 text-sm font-medium text-gray-700"
                            >
                            Description
                            </label>
                            <textarea
                            id="group-desc"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            placeholder="Enter a description"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
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
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">Join your class</h3>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="group-name"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                    Course Name
                                </label>
                                <input
                                    id="course-name"
                                    type="number"
                                    value={existingGroupId ?? ""}
                                    onChange={(e) => setExistingGroupId(Number(e.target.value) || null)}
                                    placeholder="Enter Group ID"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="university"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                    University
                                    </label>
                                    <input
                                    id="university"
                                    value={university}
                                    onChange={(e) => setUniversity(e.target.value)}
                                    placeholder="Enter a description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleJoin}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                Create
                            </button>
                        </div>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default CreateGroupModal;
