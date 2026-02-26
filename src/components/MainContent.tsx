import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, Lightbulb, Edit3, Image as ImageIcon, Heart, Zap, Globe, FileText, Users, ChevronDown, Send, Paperclip, Folder, Search, Sparkles, Code, BarChart, Calendar, FileSearch, PackageSearch, Mic, LayoutGrid, Video, X, ThumbsUp, ThumbsDown, Copy, ExternalLink, FileSpreadsheet, FileIcon, RefreshCw, Volume2, Share, ArrowRight } from 'lucide-react';
import { TabType, ChatSession } from '../App';
import TaskCenter from './TaskCenter';
import OrderCard from './OrderCard';
import OrderSummaryCard from './OrderSummaryCard';

interface MainContentProps {
  onReset: () => void;
  activeTab: TabType;
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

export default function MainContent({ onReset, activeTab, currentSession, onSendMessage }: MainContentProps) {
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
    // Reset input value so the same file can be selected again
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (activeTab === 'tasks') {
    return <TaskCenter />;
  }

  const isChatMode = currentSession !== null;

  return (
    <div className="flex-1 flex flex-col h-full relative bg-[#f3f5f9]">
      {/* Top Header */}
      <div className="absolute top-0 right-0 p-4 flex items-center gap-3 z-10">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          开启新话题
        </button>
        <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-56 flex flex-col items-center pt-8 px-8">
        
        {!isChatMode ? (
          <>
            {/* Greeting */}
            <div className="flex flex-col items-center justify-center h-full w-full mb-10 mt-16">
              <h2 className="text-3xl font-medium text-slate-800 tracking-wide text-center">我是小仙，有什么我能帮你的吗？</h2>
            </div>
          </>
        ) : (
          <div className="w-full max-w-4xl flex flex-col gap-6">
            {/* Render Messages */}
            {currentSession.messages.map((msg, index) => (
              <React.Fragment key={msg.id}>
                {msg.role === 'user' ? (
                  <div className="flex justify-end w-full mb-4">
                    <div className="bg-[#f4f4f4] text-slate-800 px-4 py-2.5 rounded-2xl max-w-[80%] text-[15px]">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full mb-8">
                    <div className="flex-1">
                      <p className="text-slate-800 mb-3 leading-relaxed text-[15px]">
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
                              className="flex items-center gap-2 px-4 py-2 bg-[#f4f4f4] hover:bg-[#ebebeb] text-slate-700 rounded-xl text-sm transition-colors"
                            >
                              {q} <ArrowRight className="w-4 h-4 text-slate-400" />
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
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#f3f5f9] via-[#f3f5f9] to-transparent pt-12 pb-6 px-8 flex flex-col items-center pointer-events-none">
        <div className="w-full max-w-4xl pointer-events-auto">
          {/* Input Box */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-2 flex flex-col gap-2 transition-shadow focus-within:shadow-md focus-within:border-blue-200">
            
            {/* File Previews */}
            {uploadedFiles.length > 0 && (
              <div className="flex items-center gap-3 px-3 pt-3 pb-1 overflow-x-auto no-scrollbar">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl shrink-0 group">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="preview" className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                        {getFileIcon(file)}
                      </div>
                    )}
                    <div className="flex flex-col pr-2">
                      <span className="text-sm font-medium text-slate-700">{truncateFileName(file.name)}</span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)} 
                      className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input 
              type="text" 
              placeholder={isChatMode ? "有问题尽管问我~" : "发消息或输入“/”选择技能"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 px-4 py-2 text-sm"
            />
            <div className="flex items-center justify-between px-2 pb-1">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {selectedTool ? (
                  <>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-sm transition-colors shrink-0 border border-blue-100">
                      {selectedTool === '订单查询' ? <PackageSearch className="w-4 h-4" /> : <FileSearch className="w-4 h-4" />}
                      <span className="font-medium">{selectedTool}</span>
                      <button 
                        onClick={() => setSelectedTool(null)}
                        className="p-0.5 hover:bg-blue-100 rounded-md transition-colors ml-0.5 text-blue-400 hover:text-blue-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <label className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-xl text-sm transition-colors shrink-0 cursor-pointer" title="上传文件">
                      <Paperclip className="w-4 h-4" />
                      <span>上传文件</span>
                      <input type="file" className="hidden" multiple onChange={handleFileChange} />
                    </label>
                  </>
                ) : (
                  <>
                    <label className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0 cursor-pointer" title="上传文件">
                      <Plus className="w-5 h-5" />
                      <input type="file" className="hidden" multiple onChange={handleFileChange} />
                    </label>
                    <div className="w-px h-4 bg-slate-200 mx-1 shrink-0"></div>
                    
                    <button 
                      onClick={() => setSelectedTool('订单查询')}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition-colors shrink-0"
                    >
                      <PackageSearch className="w-4 h-4" />
                      <span>订单查询</span>
                    </button>
                    
                    <button 
                      onClick={() => setSelectedTool('文件处理')}
                      className="flex items-center gap-1.5 px-2 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition-colors shrink-0"
                    >
                      <FileSearch className="w-4 h-4" />
                      <span>文件处理</span>
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button 
                  className="w-9 h-9 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 active:bg-blue-100 active:text-blue-600 transition-all duration-200"
                  title="语音输入"
                  onClick={() => alert('语音输入功能已激活')}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
                    inputValue.trim() || uploadedFiles.length > 0
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                      : 'bg-slate-100 text-slate-400'
                  }`}
                  title="发送"
                  onClick={handleSend}
                  disabled={!inputValue.trim() && uploadedFiles.length === 0}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Powered by 咸亨国际专属大模型</span>
            <span className="mx-1 opacity-50">|</span>
            <a href="#" className="hover:text-slate-600 transition-colors">隐私保护</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <button className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 w-48 h-36 group">
      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
        {icon}
      </div>
      <span className="text-base text-slate-700 font-medium group-hover:text-blue-700 transition-colors">{title}</span>
    </button>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 whitespace-nowrap shadow-sm transition-all">
      <span className="text-slate-400">{icon}</span>
      {label}
    </button>
  );
}
