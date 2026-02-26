import React, { useState, useRef, useEffect } from 'react';
import { Menu, Plus, Send, Mic, PackageSearch, FileSearch, Paperclip, X, Sparkles, ChevronLeft, MessageSquare, FileText, Search, Lightbulb, ChevronDown, ThumbsUp, ThumbsDown, Copy, ExternalLink, MoreHorizontal, FileSpreadsheet, FileIcon, RefreshCw, Volume2, Share, ArrowRight } from 'lucide-react';
import { TabType, ChatSession, Message } from '../App';
import OrderCard from './OrderCard';
import OrderSummaryCard from './OrderSummaryCard';
import TaskCenter from './TaskCenter';

interface MobileLayoutProps {
  onReset: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  chatSessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  currentSession: ChatSession | null;
  onSendMessage: (content: string, tool: string | null) => void;
}

const truncateFileName = (name: string) => {
  let byteLen = 0;
  let res = '';
  for (let i = 0; i < name.length; i++) {
    const c = name.charCodeAt(i);
    byteLen += c > 255 ? 2 : 1;
    if (byteLen > 10) {
      return res + '...';
    }
    res += name[i];
  }
  return res;
};

const getFileIcon = (file: File) => {
  const name = file.name.toLowerCase();
  if (name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.csv')) {
    return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
  }
  if (name.endsWith('.pdf')) {
    return <FileText className="w-5 h-5 text-rose-500" />;
  }
  if (name.endsWith('.doc') || name.endsWith('.docx')) {
    return <FileText className="w-5 h-5 text-blue-500" />;
  }
  return <FileIcon className="w-5 h-5 text-slate-500" />;
};

export default function MobileLayout({
  onReset,
  activeTab,
  setActiveTab,
  chatSessions,
  currentSessionId,
  onSelectSession,
  currentSession,
  onSendMessage
}: MobileLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentSession?.messages]);

  const handleSend = () => {
    if (inputValue.trim() || uploadedFiles.length > 0) {
      let content = inputValue.trim();
      if (uploadedFiles.length > 0) {
        const fileNames = uploadedFiles.map(f => f.name).join(', ');
        content = content ? `${content} [已上传文件: ${fileNames}]` : `[已上传文件: ${fileNames}]`;
      }
      onSendMessage(content, selectedTool);
      setInputValue('');
      setUploadedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const isChatMode = currentSession !== null;

  return (
    <div className="flex flex-col h-full w-full bg-[#f3f5f9] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-medium text-slate-800">{activeTab === 'tasks' ? '任务中心' : '小仙'}</span>
        </div>
        <button onClick={onReset} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsDrawerOpen(false)} />
          <div className="w-64 bg-white h-full flex flex-col relative z-10 shadow-xl animate-in slide-in-from-left">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-[#a31515] tracking-widest">咸亨国际</span>
              <button onClick={() => setIsDrawerOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 flex-1 overflow-y-auto">
              <div 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer mb-1 ${
                  activeTab === 'xiaoxian' && !currentSessionId ? 'bg-red-50 text-[#a31515]' : 'text-slate-700'
                }`}
                onClick={() => {
                  setActiveTab('xiaoxian');
                  onReset();
                  setIsDrawerOpen(false);
                }}
              >
                <div className="w-6 h-6 rounded-md bg-[#a31515] flex items-center justify-center text-white">
                  <span className="text-[12px] font-serif leading-none">仙</span>
                </div>
                <span className="text-sm font-medium">小仙</span>
              </div>
              <div 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer mb-6 ${
                  activeTab === 'tasks' ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                }`}
                onClick={() => {
                  setActiveTab('tasks');
                  setIsDrawerOpen(false);
                }}
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium">任务中心</span>
              </div>

              {chatSessions.length > 0 && (
                <>
                  <div className="px-3 mb-2 mt-4">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">对话记录</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {chatSessions.map(session => (
                      <div 
                        key={session.id}
                        onClick={() => {
                          onSelectSession(session.id);
                          setIsDrawerOpen(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer ${
                          currentSessionId === session.id && activeTab === 'xiaoxian' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-slate-600'
                        }`}
                      >
                        <MessageSquare className={`w-4 h-4 ${
                          currentSessionId === session.id && activeTab === 'xiaoxian' ? 'text-blue-500' : 'text-slate-400'
                        }`} />
                        <span className="text-sm truncate">{session.title}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {activeTab === 'tasks' ? (
        <div className="flex-1 overflow-hidden">
          <TaskCenter />
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pb-48 flex flex-col items-center">
            {!isChatMode ? (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <h2 className="text-2xl font-medium text-slate-800 tracking-wide text-center">我是小仙，有什么我能帮你的吗？</h2>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                {currentSession.messages.map((msg, index) => (
                  <React.Fragment key={msg.id}>
                    {msg.role === 'user' ? (
                      <div className="flex justify-end w-full mb-2">
                        <div className="bg-[#f4f4f4] text-slate-800 px-4 py-2.5 rounded-2xl max-w-[85%] text-sm">
                          {msg.content}
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full mb-6">
                        <div className="flex-1">
                          <p className="text-slate-800 mb-3 leading-relaxed text-sm">
                            {msg.content}
                          </p>

                          {msg.type === 'order_card' && msg.orderData && (
                            <div className="mb-3">
                              <OrderCard order={msg.orderData} />
                            </div>
                          )}

                          {msg.type === 'order_summary' && msg.orderSummaryData && (
                            <div className="mb-3">
                              <OrderSummaryCard data={msg.orderSummaryData} />
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-slate-400 mb-4">
                            <button className="hover:text-slate-600 transition-colors"><Copy className="w-4 h-4" /></button>
                            <button className="hover:text-slate-600 transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                            <button className="hover:text-slate-600 transition-colors"><ThumbsDown className="w-4 h-4" /></button>
                          </div>

                          {index === currentSession.messages.length - 1 && (
                            <div className="flex flex-col gap-2 items-start">
                              {(selectedTool === '订单查询' ? [
                                '有哪些预警订单？',
                                '帮我查一下最新订单',
                                '帮我查一下某个订单详情'
                              ] : [
                                '你可以陪我聊天解闷吗？',
                                '你都有什么功能呢？',
                                '你能给我讲个笑话吗？'
                              ]).map((q, i) => (
                                <button 
                                  key={i}
                                  onClick={() => onSendMessage(q, selectedTool)}
                                  className="flex items-center gap-2 px-4 py-2 bg-[#f4f4f4] hover:bg-[#ebebeb] text-slate-700 rounded-xl text-xs transition-colors"
                                >
                                  {q} <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Input Area */}
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-3 pb-safe flex flex-col gap-2 z-10">
            
            {/* File Previews */}
            {uploadedFiles.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative flex items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-200 rounded-lg shrink-0">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="preview" className="w-8 h-8 object-cover rounded border border-slate-200" />
                    ) : (
                      <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                        {getFileIcon(file)}
                      </div>
                    )}
                    <div className="flex flex-col pr-1">
                      <span className="text-xs font-medium text-slate-700">{truncateFileName(file.name)}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)} 
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {selectedTool ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs shrink-0 border border-blue-100">
                  {selectedTool === '订单查询' ? <PackageSearch className="w-3.5 h-3.5" /> : <FileSearch className="w-3.5 h-3.5" />}
                  <span className="font-medium">{selectedTool}</span>
                  <button onClick={() => setSelectedTool(null)} className="p-0.5 text-blue-400">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <label className="flex items-center justify-center w-7 h-7 bg-slate-50 text-slate-600 rounded-full shrink-0 border border-slate-200 cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <input type="file" className="hidden" multiple onChange={handleFileChange} />
                  </label>
                  <button onClick={() => setSelectedTool('订单查询')} className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 text-slate-600 rounded-full text-xs shrink-0 border border-slate-200">
                    <PackageSearch className="w-3.5 h-3.5" />
                    <span>订单查询</span>
                  </button>
                  <button onClick={() => setSelectedTool('文件处理')} className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 text-slate-600 rounded-full text-xs shrink-0 border border-slate-200">
                    <FileSearch className="w-3.5 h-3.5" />
                    <span>文件处理</span>
                  </button>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2 bg-slate-50 rounded-full px-3 py-1.5 border border-slate-200">
              <input 
                type="text" 
                placeholder="发消息..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-slate-700 text-sm py-1"
              />
              <button className="p-1.5 text-slate-400">
                <Mic className="w-4 h-4" />
              </button>
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() && uploadedFiles.length === 0}
                className={`p-1.5 rounded-full ${inputValue.trim() || uploadedFiles.length > 0 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
