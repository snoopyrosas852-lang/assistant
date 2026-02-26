import React from 'react';
import { Download, FileText, FileSpreadsheet, FileIcon, Search, Filter, MoreVertical } from 'lucide-react';

const mockFiles = [
  { id: 1, name: '2024年第一季度销售报表.xlsx', size: '2.4 MB', date: '2024-03-15 14:30', type: 'excel', status: 'completed' },
  { id: 2, name: '供应商合作协议模板_v2.pdf', size: '1.1 MB', date: '2024-03-14 09:15', type: 'pdf', status: 'completed' },
  { id: 3, name: '商品类目映射表_最新版.csv', size: '856 KB', date: '2024-03-12 16:45', type: 'csv', status: 'completed' },
  { id: 4, name: '华东大区采购需求汇总.xlsx', size: '3.2 MB', date: '2024-03-10 11:20', type: 'excel', status: 'completed' },
  { id: 5, name: '新员工入职培训手册.pdf', size: '5.6 MB', date: '2024-03-08 15:00', type: 'pdf', status: 'completed' },
];

export default function TaskCenter() {
  const getFileIcon = (type: string, className = "w-8 h-8") => {
    switch (type) {
      case 'excel':
      case 'csv':
        return <FileSpreadsheet className={`${className} text-emerald-500`} />;
      case 'pdf':
        return <FileText className={`${className} text-rose-500`} />;
      default:
        return <FileIcon className={`${className} text-blue-500`} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 md:bg-white">
      {/* Header */}
      <div className="px-4 md:px-8 py-4 md:py-6 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">任务中心</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">查看和下载您的文件处理结果</p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索文件..." 
              className="w-full md:w-64 bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow"
            />
          </div>
          <button className="flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors shrink-0">
            <Filter className="w-4 h-4" />
            <span className="hidden md:inline">筛选</span>
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        
        {/* Mobile View (Cards) */}
        <div className="md:hidden flex flex-col gap-3 pb-24">
          {mockFiles.map((file) => (
            <div key={file.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  {getFileIcon(file.type, "w-6 h-6")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-800 text-sm truncate">{file.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                  已完成
                </span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-xs font-medium transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    下载
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                <th className="px-6 py-4">文件名称</th>
                <th className="px-6 py-4">大小</th>
                <th className="px-6 py-4">生成时间</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <span className="font-medium text-slate-700 truncate max-w-[300px]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{file.size}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{file.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      已完成
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        下载
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
