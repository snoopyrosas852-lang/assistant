import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MobileLayout from './components/MobileLayout';
import { Smartphone, Monitor } from 'lucide-react';

export type TabType = 'xiaoxian' | 'tasks';

export interface OrderItem {
  image: string;
  title: string;
  sku: string;
  price: string;
  originalPrice?: string;
  quantity: number;
  tags?: string[];
}

export interface OrderData {
  date: string;
  orderId: string;
  shopName: string;
  status: string;
  items: OrderItem[];
  totalAmount: string;
  shippingFee: string;
  actions: string[];
}

export interface OrderSummaryData {
  total: number;
  dateRange: string;
  categories: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'text' | 'order_card' | 'order_summary';
  orderData?: OrderData;
  orderSummaryData?: OrderSummaryData;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('xiaoxian');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'pc' | 'mobile'>('pc');

  const resetChat = () => {
    setCurrentSessionId(null);
    setActiveTab('xiaoxian');
  };

  const currentSession = chatSessions.find(s => s.id === currentSessionId) || null;

  const handleSendMessage = (content: string, tool: string | null = null) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let aiResponse: Message;

    if (tool === '订单查询' || content.includes('订单')) {
      if (content.includes('最新') || content.includes('详情') || content.includes('单个')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '为您查询到最新的订单信息：',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'order_card',
          orderData: {
            date: '2026-02-18',
            orderId: '5074394691916891024',
            shopName: 'JEEP SPIRIT品牌福建总店',
            status: '买家已付款',
            items: [
              {
                image: 'https://picsum.photos/seed/jeep1/80/80',
                title: 'JEEPSPIRIT吉普纯棉运动套装男春秋款加绒立领中老年休闲跑步服 [交易快照]',
                sku: 'XL[【推荐120-140斤】];黑色【直筒套装】',
                price: '135.00',
                originalPrice: '169.00',
                quantity: 1,
                tags: ['退货宝', '极速退款', '7天无理由退货']
              },
              {
                image: 'https://picsum.photos/seed/jeep2/80/80',
                title: 'JEEPSPIRIT吉普纯棉运动套装男春秋款加绒立领中老年休闲跑步服 [交易快照]',
                sku: 'XL[【推荐120-140斤】];深蓝色【直筒套装】',
                price: '139.00',
                originalPrice: '169.00',
                quantity: 1,
                tags: ['退货宝', '极速退款', '7天无理由退货']
              }
            ],
            totalAmount: '274.00',
            shippingFee: '0.00',
            actions: ['修改地址']
          }
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '为您查询到近期共有 15 笔相关订单，主要集中在办公用品和劳保用品类目。您可以点击下方卡片跳转至订单中心查看完整列表。',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'order_summary',
          orderSummaryData: {
            total: 15,
            dateRange: '近3个月',
            categories: ['办公用品', '劳保用品']
          }
        };
      }
    } else if (!tool) {
      aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '您好！为了更高效、准确地为您服务，建议您先在输入框下方选择对应的专属工具（如“订单查询”或“文件处理”），然后再告诉我您的具体需求哦~',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    } else {
      // Simulate AI response for other tools
      aiResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `您已选择【${tool}】工具，请告诉我您的具体需求，或上传相关文件。`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    if (currentSessionId) {
      // Update existing session
      setChatSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, newMessage, aiResponse],
            updatedAt: Date.now()
          };
        }
        return session;
      }));
    } else {
      // Create new session
      const newSessionId = Date.now().toString();
      const newSession: ChatSession = {
        id: newSessionId,
        title: content.slice(0, 20) + (content.length > 20 ? '...' : ''),
        messages: [newMessage, aiResponse],
        updatedAt: Date.now()
      };
      setChatSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSessionId);
    }
  };

  const handleSelectSession = (id: string) => {
    setCurrentSessionId(id);
    setActiveTab('xiaoxian');
  };

  return (
    <div className="flex h-screen w-full bg-[#f3f5f9] text-slate-800 font-sans overflow-hidden relative items-center justify-center">
      {/* View Mode Toggle */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full shadow-md border border-slate-200 p-1 flex items-center gap-1">
        <button
          onClick={() => setViewMode('pc')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            viewMode === 'pc' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Monitor className="w-4 h-4" />
          PC端
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            viewMode === 'mobile' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          移动端
        </button>
      </div>

      {viewMode === 'pc' ? (
        <div className="flex h-full w-full">
          <Sidebar 
            onReset={resetChat} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            chatSessions={chatSessions}
            currentSessionId={currentSessionId}
            onSelectSession={handleSelectSession}
          />
          <MainContent 
            onReset={resetChat}
            activeTab={activeTab}
            currentSession={currentSession}
            onSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className="h-[844px] w-[390px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-slate-800 overflow-hidden relative my-auto shrink-0">
          {/* iPhone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-3xl z-50"></div>
          
          <div className="h-full w-full pt-6">
            <MobileLayout
              onReset={resetChat}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              chatSessions={chatSessions}
              currentSessionId={currentSessionId}
              onSelectSession={handleSelectSession}
              currentSession={currentSession}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
