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
  UserCircle,
  Volume2,
  BookOpen,
  Clock,
  MessageCircle
} from 'lucide-react';

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

  const classes: Class[] = [
    { id: 'CS101', name: 'Computer Science 101', channel: "#general", unread: 3, isActive: true },
    { id: 'MATH201', name: 'Calculus II', channel: "#homework-help", unread: 0, isActive: false },
    { id: 'PHYS101', name: 'Physics Fundamentals', channel: "#lab-reports", unread: 7, isActive: false },
    { id: 'ENG102', name: 'English Composition', channel: "#discussions", unread: 1, isActive: false },
    { id: 'HIST150', name: 'World History', channel: "#study-group", unread: 0, isActive: false },
  ];

  const messages: Message[] = [
    {
      id: '1',
      user: 'Sarah Chen',
      content: 'Has anyone started working on the final project yet?',
      timestamp: '2:34 PM'
    },
    {
      id: '2',
      user: 'Mike Johnson',
      content: 'I\'m planning to start this weekend. Want to form a study group?',
      timestamp: '2:35 PM'
    },
    {
      id: '3',
      user: 'Emily Davis',
      content: 'Count me in! I found some great resources we could use.',
      timestamp: '2:37 PM'
    },
    {
      id: '4',
      user: 'Alex Rodriguez',
      content: 'The professor mentioned office hours tomorrow at 3 PM if anyone has questions.',
      timestamp: '2:40 PM'
    },
  ];

  const onlineUsers: OnlineUser[] = [
    { id: '1', name: 'Sarah Chen', status: 'online' },
    { id: '2', name: 'Mike Johnson', status: 'online' },
    { id: '3', name: 'Emily Davis', status: 'away' },
    { id: '4', name: 'Alex Rodriguez', status: 'online' },
    { id: '5', name: 'Jessica Kim', status: 'busy' },
    { id: '6', name: 'David Wilson', status: 'online' },
    { id: '7', name: 'Lisa Thompson', status: 'away' },
  ];

  const recentActivity = [
    { action: 'New assignment posted', class: 'CS101', time: '1h ago' },
    { action: 'Study group created', class: 'MATH201', time: '3h ago' },
    { action: 'Reminder: Quiz tomorrow', class: 'PHYS101', time: '5h ago' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-screen bg-white flex">
      {/* Left Sidebar - 20% */}
      <div className="w-1/5 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* University Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div>
              <h1 className="font-semibold text-lg text-gray-900">Stanford University</h1>
              <p className="text-sm text-gray-600">Fall 2025</p>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div className="overflow-y-auto">
          <div className="px-4 grid h-full grid-rows-[auto_1fr_auto]">
            <div className="row-start-1 flex items-center justify-between mb-3 pt-5">
              <h2 className=" text-gray-600">Your Classes</h2>
              <Plus className="w-4 h-4 text-gray-800 cursor-pointer hover:text-gray-700" />
            </div>
            
            <div className=" row-start-2 space-y-2">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  onClick={() => setActiveClass(classItem.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    classItem.isActive
                      ? 'bg-gray-200 text-black'
                      : 'hover:bg-gray-100 text-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4" />
                      <div className='flex flex-col '>
                        <span className="font-medium text-sm">{classItem.name}</span>
                        <span className='text-[0.7rem] text-gray-600'>{classItem.channel}</span>
                      </div>
                      
                    </div>
                    {classItem.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {classItem.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="row-start-3 flex flex-row w-full p-4 gap-3 items-center border-t border-gray-200">
                <Settings className='w-4 h-4' />
                <p className='text-sm'>Settings</p>
            </button>
          </div>
        </div>
      
      </div>

      {/* Main Chat Area - 60% */}
      <div className="w-3/5 flex flex-col">
        {/* Header - 10% of column height */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5 text-black" />
              <h2 className="font-semibold text-lg">Computer Science 101</h2>
            </div>
            <span className="text-gray-500">|</span>
            <p className="text-gray-600 text-sm">General Discussion</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Area - 80% of column height */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  <span className="font-semibold text-gray-900">{msg.user}</span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-gray-700 mt-1">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input - 10% of column height */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - 20% */}
      <div className="w-1/5 bg-gray-50 border-l border-gray-200 flex flex-col">
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-600">Computer Science</p>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Online Users */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Online ({onlineUsers.filter(u => u.status === 'online').length})
              </h3>
            </div>
            
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <UserCircle className="w-6 h-6 text-gray-600" />
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
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-100 rounded-lg">
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Start Group Chat</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-100 rounded-lg">
              <Volume2 className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Voice Channel</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-100 rounded-lg">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;