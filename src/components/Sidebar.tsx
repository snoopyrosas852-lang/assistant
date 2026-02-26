import React from 'react';
import { Search, Plus, Sparkles, Hexagon, Briefcase, FileText, MessageSquare, Settings, User } from 'lucide-react';
import { TabType, ChatSession } from '../App';

function XianHengLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Seal */}
      <div className="w-10 h-10 bg-[#a31515] rounded-md flex p-[3px] relative items-center justify-center shrink-0">
        <div className="w-full h-full border-[1.5px] border-white rounded-[3px] flex">
          <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
            <span className="text-white text-[11px] font-serif leading-none tracking-tighter" style={{ transform: 'scaleY(1.1)' }}>国</span>
            <span className="text-white text-[11px] font-serif leading-none tracking-tighter" style={{ transform: 'scaleY(1.1)' }}>际</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
            <span className="text-white text-[11px] font-serif leading-none tracking-tighter" style={{ transform: 'scaleY(1.1)' }}>咸</span>
            <span className="text-white text-[11px] font-serif leading-none tracking-tighter" style={{ transform: 'scaleY(1.1)' }}>亨</span>
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col justify-center mt-0.5">
        <span className="text-[#a31515] text-[22px] font-serif font-bold tracking-[0.15em] leading-none mb-1.5">咸亨国际</span>
        <span className="text-[#a31515] text-[7px] tracking-[0.08em] uppercase font-sans font-bold leading-none">Xian Heng International</span>
      </div>
    </div>
  );
}

interface SidebarProps {
  onReset?: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  chatSessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
}

export default function Sidebar({ onReset, activeTab, setActiveTab, chatSessions, currentSessionId, onSelectSession }: SidebarProps) {
  return (
    <div className="w-64 bg-white h-full flex flex-col border-r border-slate-200 shrink-0">
      {/* Header */}
      <div className="p-4 pb-2">
        <XianHengLogo className="mb-6" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索" 
            className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow"
          />
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-2 mt-2 flex-1 overflow-y-auto">
        <div 
          className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer mb-1 transition-colors ${
            activeTab === 'xiaoxian' && !currentSessionId ? 'bg-red-50 text-[#a31515]' : 'hover:bg-slate-50 text-slate-700'
          }`}
          onClick={() => {
            setActiveTab('xiaoxian');
            if (onReset) onReset();
          }}
        >
          <div className="w-6 h-6 rounded-md bg-[#a31515] flex items-center justify-center text-white shadow-sm">
            <span className="text-[12px] font-serif leading-none">仙</span>
          </div>
          <span className="text-sm font-medium">小仙</span>
        </div>
        <div 
          className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors mb-6 ${
            activeTab === 'tasks' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
          }`}
          onClick={() => setActiveTab('tasks')}
        >
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-sm">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">任务中心</span>
        </div>

        {/* Chat History */}
        {chatSessions.length > 0 && (
          <>
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">对话记录</span>
            </div>
            <div className="flex flex-col gap-0.5">
              {chatSessions.map(session => (
                <div 
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors group ${
                    currentSessionId === session.id && activeTab === 'xiaoxian' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <MessageSquare className={`w-4 h-4 transition-colors ${
                    currentSessionId === session.id && activeTab === 'xiaoxian'
                      ? 'text-blue-500'
                      : 'text-slate-400 group-hover:text-blue-500'
                  }`} />
                  <span className="text-sm truncate">{session.title}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Admin Profile / Settings */}
      <div className="p-4 border-t border-slate-100 shrink-0">
        <div 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
            activeTab === 'admin' 
              ? 'bg-slate-100 text-slate-900 border border-slate-200 shadow-sm' 
              : 'hover:bg-slate-50 text-slate-600 border border-transparent'
          }`}
          onClick={() => setActiveTab('admin')}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shrink-0 border border-slate-300">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate leading-tight">管理员</p>
            <p className="text-xs text-slate-400 truncate mt-0.5">admin@xianheng.com</p>
          </div>
          <Settings className={`w-4 h-4 transition-colors ${activeTab === 'admin' ? 'text-slate-600' : 'text-slate-400'}`} />
        </div>
      </div>
    </div>
  );
}
