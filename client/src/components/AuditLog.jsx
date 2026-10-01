import React, { useState, useEffect } from 'react';
import { Database, Filter, RefreshCw, CheckCircle2, AlertTriangle, XOctagon, Search } from 'lucide-react';
import { getAuditLogs } from '../services/api.js';

export default function AuditLog({ onSelectInspection }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterVerdict, setFilterVerdict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await getAuditLogs({ verdict: filterVerdict || undefined });
      if (res?.data) {
        setLogs(res.data);
      }
    } catch (err) {
      console.warn('Audit fetch note:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filterVerdict]);

  const filteredLogs = logs.filter((log) => {
    const q = searchQuery.toLowerCase();
    return (
      log.component_name?.toLowerCase().includes(q) ||
      log.batch_id?.toLowerCase().includes(q) ||
      log.defect_type?.toLowerCase().includes(q) ||
      log.category?.toLowerCase().includes(q)
    );
  });

  const getVerdictBadge = (verdict) => {
    switch (verdict) {
      case 'PASS':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>PASS</span>
          </span>
        );
      case 'REWORK':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" />
            <span>REWORK</span>
          </span>
        );
      case 'SCRAP':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            <XOctagon className="w-3 h-3" />
            <span>SCRAP</span>
          </span>
        );
      default:
        return <span className="text-xs font-mono text-slate-400">{verdict}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-1">
            <Database className="w-4 h-4" />
            <span>SUPABASE CLOUD POSTGRESQL AUDIT REPOSITORY</span>
          </div>
          <h2 className="text-xl font-bold text-white">Optical Inspection Audit Trail</h2>
          <p className="text-xs text-slate-400">
            Immutable inspection log certified to ISO-9001:2015 Clause 8.5.1 requirements.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync DB</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search component, batch, defect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        {/* Verdict Filters */}
        <div className="flex items-center space-x-1 self-start sm:self-auto bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterVerdict('')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterVerdict === '' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterVerdict('PASS')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterVerdict === 'PASS' ? 'bg-emerald-600/30 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pass
          </button>
          <button
            onClick={() => setFilterVerdict('REWORK')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterVerdict === 'REWORK' ? 'bg-amber-600/30 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rework
          </button>
          <button
            onClick={() => setFilterVerdict('SCRAP')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filterVerdict === 'SCRAP' ? 'bg-red-600/30 text-red-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Scrap
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
              <tr>
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">BATCH ID</th>
                <th className="py-3 px-4">COMPONENT</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">VERDICT</th>
                <th className="py-3 px-4">DEFECT TYPE</th>
                <th className="py-3 px-4">CONFIDENCE</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-medium">
                      {item.batch_id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {item.component_name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getVerdictBadge(item.verdict)}
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                      {item.defect_type}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {item.confidence}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectInspection && onSelectInspection(item)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-500 font-mono">
                    No inspection logs matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
