import React from 'react';
import { PackageSearch, ChevronRight } from 'lucide-react';
import { OrderSummaryData } from '../App';

interface OrderSummaryCardProps {
  data: OrderSummaryData;
}

export default function OrderSummaryCard({ data }: OrderSummaryCardProps) {
  return (
    <div 
      className="w-full max-w-sm bg-white border border-blue-100 rounded-xl p-4 mt-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group flex items-center justify-between"
      onClick={() => alert('即将跳转至完整订单列表页面...')}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <PackageSearch className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-slate-800 font-medium text-sm mb-0.5">查看全部 {data.total} 笔订单</h4>
          <p className="text-slate-400 text-xs">查询范围：{data.dateRange}</p>
        </div>
      </div>
      <div className="text-slate-300 group-hover:text-blue-500 transition-colors flex items-center gap-1">
        <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">去查看</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
