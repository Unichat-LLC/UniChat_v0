import React, { useState, useEffect } from 'react';
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
  Volume2,
  MessageCircle,
  ArrowRightFromLine
} from 'lucide-react';

import placeholder from '../assets/placeholder.png';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../lib/socket';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

interface Class {
  id: string;
  name: string;
  channel: string;
  unread: number;
  isActive: boolean;
}

interface OnlineUser {
  id: string;
  name: string;
  status: 'online' | 'away' | 'busy';
  avatar?: string;
}

const ChatDashboard: React.FC = () => {
  const [activeClass, setActiveClass] = useState('CS101');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const socket = getSocket();

 const { user, logout } = useAuth();

  const navigate = useNavigate();

  const onlineUsers: OnlineUser[] = [
    { id: '1', name: 'Sarah Chen', status: 'online' },
    { id: '2', name: 'Mike Johnson', status: 'online' },
    { id: '3', name: 'Emily Davis', status: 'away' },
    { id: '4', name: 'Alex Rodriguez', status: 'online' },
    { id: '5', name: 'Jessica Kim', status: 'busy' },
    { id: '6', name: 'David Wilson', status: 'online' },
    { id: '7', name: 'Lisa Thompson', status: 'away' },
  ];


  const handleSendMessage = async () => {
    if (!message.trim() || !activeClass) return;
    const res = await api.post(`/groups/${activeClass}/messages`, { message });
    setMessages(m => [res.data.newMessage, ...m]);
    setMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages(m => [msg, ...m]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket])

    useEffect(() => {
    api.get("/groups").then(r => {
      setClasses(r.data.groups);
      // default select the first group.id
      setActiveClass(r.data.groups[0].id);
    });
  }, []);

  useEffect(() => {
    if (activeClass == null) return;
    api.get(`/groups/${activeClass}/messages`)
      .then(r => setMessages(r.data.groupMessages));
  }, [activeClass]);

  return (
    <div className="h-screen bg-white flex">
      {/* Left Sidebar - 20% */}
      <div className="w-1/5 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* University Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div>
              <h1 className="text-lg text-gray-900">University of Cincinnati</h1>
              <p className="text-sm text-gray-600">Fall 2025</p>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3 ">
            <h2 className=" text-gray-600">Your Classes</h2>
            <Plus className="w-4 h-4 text-gray-800 cursor-pointer hover:text-gray-700" />
          </div>
            
          <div className=" space-y-2">
            {classes.map((c => (
              <div
                key={c.id}
                onClick={() => setActiveClass(c.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  c.id === activeClass
                    ? 'bg-gray-200 text-black'
                    : 'hover:bg-gray-100 text-black'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4" />
                    <div className='flex flex-col '>
                      <span className="font-medium text-sm">{c.name}</span>
                      <span className='text-[0.7rem] text-gray-600'>{c.channel}</span>
                    </div>
                    
                  </div>
                  {c.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            )))}
          </div>
          <button onClick={async () => { await logout(); navigate("/login", { replace: true }); }}>
            <ArrowRightFromLine/>
          </button>
        </div>

        {/* Settings Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="p-2 items-center cursor-pointer flex flex-row w-full gap-3 rounded-xl hover hover:bg-gray-200">
            <Settings className="w-4 h-4" />
            <p className="text-sm">Settings</p>
          </button>
        </div>
      </div>

      {/* Main Chat Area - 66% */}
      <div className="flex-1 flex flex-col">
        {/* Header - 10% of column height */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-700" />
              <div className='flex flex-col'>
                <h2 className="font text-md">general</h2>
                <p className='text-[0.75rem] text-gray-500'>Computer Science 101</p>
              </div>
              
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
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="h-full">
            <div className="p-6 space-y-4">
              {messages.map(message => {
                const isOwn = message.user === user?.username;
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                  >
                    <img
                      src={message.avatar ?? placeholder}
                      alt={`${message.user} avatar`}
                      className="h-8 w-8 rounded-full"
                    />
                    <div
                      className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-black">
                          {message.user}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          isOwn ? 'bg-black text-white' : 'bg-gray-100 text-black'
                        }`}
                      >
                        <p className="text-[0.85rem]">{message.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* Message Input - 10% of column height */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Paperclip className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full px-4 py-3 border border-gray-300 text-sm rounded-lg focus:outline-none bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                <Smile className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - 20% */}
      <div className="w-1/5 bg-gray-50 border-l border-gray-200 flex flex-col">
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-1 rounded-full flex items-center justify-center">
              <img src={placeholder} className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-[0.85rem] text-gray-500">Computer Science</p>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className='pt-4 px-2 flex items-center gap-4'>
            <button 
              onClick={()=> navigate("/profile")}
              className='p-2 text-md bg-white rounded-xl cursor-pointer flex items-center w-full justify-center'>
              Profile
            </button>
            <button className='p-2 rounded-xl text-gray-700 cursor-pointer hover hover:bg-gray-200'>
              <ArrowRightFromLine className='w-4 h-4'/>
            </button>
            
          </div>
        </div>

        {/* Online Users */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-500 text-sm flex items-center">
                <Users className="w-4 h-4 mr-2" />
                ONLINE - {onlineUsers.filter(u => u.status === 'online').length}
              </h3>
            </div>
            
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <img src={placeholder} className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-100 rounded-lg">
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-500">Start Group Chat</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-100 rounded-lg">
              <Volume2 className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-500">Voice Channel</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-100 rounded-lg">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-500">Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;