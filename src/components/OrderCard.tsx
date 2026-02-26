import React from 'react';
import { Store, ChevronRight, MessageCircle } from 'lucide-react';
import { OrderData } from '../App';

interface OrderCardProps {
  order: OrderData;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm mt-4 text-sm">
      {/* Header */}
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-medium text-slate-700">{order.date}</span>
          <span>订单号: {order.orderId}</span>
          <div className="flex items-center gap-1 text-slate-700 hover:text-blue-600 cursor-pointer">
            <Store className="w-3.5 h-3.5" />
            <span>{order.shopName}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="font-medium text-blue-600">
          {order.status}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row">
        {/* Items List */}
        <div className="flex-1 flex flex-col">
          {order.items.map((item, index) => (
            <div 
              key={index} 
              className={`flex p-4 gap-4 ${index !== order.items.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-20 h-20 object-cover rounded border border-slate-100 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-700 hover:text-blue-600 cursor-pointer line-clamp-2 leading-snug mb-1">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-xs mb-2">{item.sku}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 border border-orange-200 text-orange-500 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-24 text-right shrink-0">
                <div className="text-slate-700 font-medium">¥{item.price}</div>
                {item.originalPrice && (
                  <div className="text-slate-400 text-xs line-through">¥{item.originalPrice}</div>
                )}
                <div className="text-slate-500 mt-1">x{item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment & Actions */}
        <div className="flex flex-row md:flex-col border-t md:border-t-0 md:border-l border-slate-100 w-full md:w-48 shrink-0">
          <div className="flex-1 p-4 border-r md:border-r-0 md:border-b border-slate-100 flex flex-col justify-center items-center md:items-start">
            <div className="text-slate-500 text-xs mb-1">实付款</div>
            <div className="text-slate-800 font-bold text-base">¥{order.totalAmount}</div>
            <div className="text-slate-400 text-xs mt-1">含运费: ¥{order.shippingFee}</div>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center items-center gap-2">
            {order.actions.map((action, i) => (
              <button 
                key={i}
                className={`w-full py-1.5 px-3 rounded text-xs font-medium transition-colors ${
                  i === 0 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {action}
              </button>
            ))}
            <button className="text-slate-500 hover:text-blue-600 text-xs flex items-center gap-1 mt-1">
              <MessageCircle className="w-3 h-3" />
              联系卖家
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
