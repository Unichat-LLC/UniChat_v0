import React, { useState } from 'react';
import {
  Search,
  Settings,
  Hash,
  Users,
  Bell,
  Plus,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  ArrowRightFromLine
} from 'lucide-react';
import placeholder from '../assets/placeholder.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const ChatDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    groups,
    activeGroup,
    members,
    messages,
    setActiveGroup,
    sendMessage,
    createGroup
  } = useChat();

  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleSend = () => {
    if (!messageText.trim() || !activeGroup) return;
    sendMessage(activeGroup.id, messageText);
    setMessageText('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away':   return 'bg-yellow-500';
      case 'busy':   return 'bg-red-500';
      default:       return 'bg-gray-400';
    }
  };

  async function handleCreate() {
    await createGroup(newName, newDesc);
    setShowModal(false);
  }

  return (
    <div className="h-screen bg-white flex">
        {/* Left Sidebar */}
        <div className="w-1/5 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-lg text-gray-900">University of Cincinnati</h1>
            <p className="text-sm text-gray-600">Fall 2025</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-600">Your Classes</h2>
              <button onClick={() => setShowModal(true)}>
                <Plus className="w-4 h-4 text-gray-800 cursor-pointer hover:text-gray-700" />
              </button>
              
            </div>
            <div className="space-y-2">
              {groups.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setActiveGroup(g)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    g.id === activeGroup?.id
                      ? 'bg-gray-200 text-black'
                      : 'hover:bg-gray-100 text-black'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4" />
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{g.name}</span>
                      <span className="text-[0.7rem] text-gray-600">{g.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <Hash className="w-4 h-4 text-gray-700" />
              <div className="flex flex-col">
                <h2 className="text-md font-medium">{activeGroup?.name ?? '—'}</h2>
                <p className="text-[0.75rem] text-gray-500">{activeGroup?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-6 py-2 text-sm border border-gray-300 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <Bell className="w-4 h-4 text-gray-600 hover:text-gray-800 cursor-pointer" />
              <Settings className="w-4 h-4 text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <div className="p-6 space-y-4 overflow-y-auto h-full">
              {messages.map((message) => {
                const isOwn = message.sender_id === user?.id;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                  >
                    <img
                      src={placeholder}
                      alt="avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <div
                      className={`flex flex-col ${
                        isOwn ? 'items-end' : 'items-start'
                      } max-w-[70%]`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {isOwn ? user?.username : `User ${message.sender_id}`}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.uploaded_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          isOwn ? 'bg-black text-white' : 'bg-gray-100 text-black'
                        }`}
                      >
                        <p className="text-[0.85rem]">{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowModal(false)}>
                  <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Create New Group
                      </h3>
                      <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900">
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

                    {/* Form */}
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="group-name" className="block mb-1 text-sm font-medium text-gray-700"> Group Name </label>
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
                        <label htmlFor="group-desc" className="block mb-1 text-sm font-medium text-gray-700"> Description </label>
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
                      <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                        Cancel
                      </button>
                      <button onClick={handleCreate} disabled={!newName.trim()} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
          {/* Input */}
          <div className="p-4 border-t border-gray-200 flex items-center space-x-3">
            <Paperclip className="w-4 h-4 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full px-4 py-3 border border-gray-300 text-sm rounded-lg focus:outline-none bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
              <Smile className="w-4 h-4 text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-gray-800" />
            </div>
            <button
              onClick={handleSend}
              className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/5 bg-gray-50 border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img src={placeholder} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{user?.username}</h3>
                <p className="text-[0.85rem] text-gray-500">{user?.university}</p>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex-1 p-2 bg-white rounded-xl text-center hover:bg-gray-200"
              >
                Profile
              </button>
              <button
                onClick={async () => {
                  await logout();
                  navigate('/login', { replace: true });
                }}
                className="p-2 rounded-xl text-gray-700 hover:bg-gray-200"
              >
                <ArrowRightFromLine />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-semibold text-gray-500 text-sm flex items-center mb-3">
              <Users className="w-4 h-4 mr-2" />
              ONLINE — {members.filter((m) => m.is_active).length}
            </h3>
            <div className="space-y-2">
              {members.map((mem) => (
                <div
                  key={mem.id}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <div className="relative">
                    <img src={placeholder} className="w-8 h-8 rounded-full" />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        getStatusColor(mem.is_active ? 'online' : 'away')
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">User {mem.user_id}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {mem.is_active ? 'online' : 'away'}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatDashboard;
