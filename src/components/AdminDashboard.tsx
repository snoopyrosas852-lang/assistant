import React from 'react';
import { Users, MessageSquare, FileText, Activity, Settings, Database, ArrowUpRight, ArrowDownRight, Search, Filter, MoreVertical, ShieldCheck, Zap } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#f3f5f9] overflow-y-auto">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            管理后台
          </h1>
          <p className="text-sm text-slate-500 mt-1">系统运行状态与数据监控</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            导出报告
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" />
            系统设置
          </button>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<MessageSquare className="w-5 h-5" />} 
            title="今日对话数" 
            value="1,284" 
            trend="+12.5%" 
            isPositive={true} 
            color="bg-blue-50 text-blue-600"
          />
          <StatCard 
            icon={<Users className="w-5 h-5" />} 
            title="活跃用户" 
            value="342" 
            trend="+5.2%" 
            isPositive={true} 
            color="bg-indigo-50 text-indigo-600"
          />
          <StatCard 
            icon={<FileText className="w-5 h-5" />} 
            title="处理文件数" 
            value="89" 
            trend="-2.1%" 
            isPositive={false} 
            color="bg-orange-50 text-orange-600"
          />
          <StatCard 
            icon={<Database className="w-5 h-5" />} 
            title="API调用次数" 
            value="45.2k" 
            trend="+18.4%" 
            isPositive={true} 
            color="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Logs Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-800">最近系统日志</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="搜索日志..." 
                    className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-48 transition-all"
                  />
                </div>
                <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors border border-slate-200">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 font-medium">时间</th>
                    <th className="px-6 py-3 font-medium">用户</th>
                    <th className="px-6 py-3 font-medium">操作类型</th>
                    <th className="px-6 py-3 font-medium">状态</th>
                    <th className="px-6 py-3 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  <LogItem time="10:42:15" user="张三 (采购部)" action="触发了【订单查询】工具" status="success" />
                  <LogItem time="10:38:22" user="李四 (销售部)" action="上传了文件【Q3报价单.xlsx】" status="success" />
                  <LogItem time="10:15:05" user="王五 (运营部)" action="知识库查询：商品四级类目" status="success" />
                  <LogItem time="09:55:12" user="赵六 (仓储部)" action="API调用超时 (ERP接口)" status="error" />
                  <LogItem time="09:30:45" user="系统自动" action="同步最新供应链数据" status="success" />
                  <LogItem time="09:12:33" user="张三 (采购部)" action="触发了【文件处理】工具" status="success" />
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看全部日志</button>
            </div>
          </div>

          {/* Quick Actions & System Health */}
          <div className="flex flex-col gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">快捷管理</h3>
              <div className="grid grid-cols-2 gap-3">
                <QuickActionButton icon={<Database className="w-4 h-4" />} label="知识库管理" />
                <QuickActionButton icon={<Zap className="w-4 h-4" />} label="提示词配置" />
                <QuickActionButton icon={<FileText className="w-4 h-4" />} label="工具箱设置" />
                <QuickActionButton icon={<Users className="w-4 h-4" />} label="权限管理" />
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1">
              <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center justify-between">
                <span>系统健康度</span>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">正常</span>
              </h3>
              <div className="space-y-4">
                <HealthBar label="CPU 使用率" value={32} color="bg-blue-500" />
                <HealthBar label="内存使用率" value={68} color="bg-indigo-500" />
                <HealthBar label="API 响应延迟" value={15} color="bg-emerald-500" suffix="ms" />
                <HealthBar label="存储空间" value={85} color="bg-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, isPositive, color }: any) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-orange-600'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trend}
        </div>
      </div>
      <div>
        <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function LogItem({ time, user, action, status }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{time}</td>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">{user}</td>
      <td className="px-6 py-4 text-slate-600">{action}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {status === 'success' ? (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            成功
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            失败
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button className="text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

function QuickActionButton({ icon, label }: any) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all text-slate-600 group">
      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function HealthBar({ label, value, color, suffix = '%' }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="text-slate-500">{value}{suffix}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
