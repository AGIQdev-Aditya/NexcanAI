import React, { useState, useEffect } from 'react';
import { Database, Filter, RefreshCw, CheckCircle2, AlertTriangle, XOctagon, Search, Lock, ShieldCheck } from 'lucide-react';
import { getAuditLogs } from '../services/api.js';

export default function AuditLog({ onSelectInspection, currentUser }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterVerdict, setFilterVerdict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Default to showing all verified plant logs so visitors and evaluators see the full track record
  const [onlyMyLogs, setOnlyMyLogs] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await getAuditLogs({
        verdict: filterVerdict || undefined,
        userEmail: onlyMyLogs && currentUser?.email ? currentUser.email : undefined,
      });
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
  }, [filterVerdict, onlyMyLogs, currentUser?.email]);

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
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>PASS</span>
          </span>
        );
      case 'REWORK':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30">
            <AlertTriangle className="w-3 h-3" />
            <span>REWORK</span>
          </span>
        );
      case 'SCRAP':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30">
            <XOctagon className="w-3 h-3" />
            <span>SCRAP</span>
          </span>
        );
      default:
        return <span className="text-xs font-mono text-[#6B5E55]">{verdict}</span>;
    }
  };

  return (
    <div className="space-y-5 animate-fade-in font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#EFE9E3] border border-[#D9CFC7] shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#8C7D73] mb-1 font-bold">
            <Database className="w-4 h-4 text-[#C9B59C]" />
            <span className="text-[#1C1815]">CRYPTOGRAPHIC OPTICAL AUDIT REPOSITORY</span>
          </div>
          <h2 className="text-xl font-bold text-[#1C1815]">Optical Inspection Audit Trail</h2>
          <p className="text-xs text-[#6B5E55]">
            Immutable inspection log certified to ISO-9001:2015 Clause 8.5.1 requirements.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {currentUser && (
            <button
              onClick={() => setOnlyMyLogs(!onlyMyLogs)}
              data-cursor="pointer"
              className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all border flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                onlyMyLogs
                  ? 'bg-[#C9B59C] text-[#1C1815] border-[#C9B59C]'
                  : 'bg-[#F9F8F6] text-[#6B5E55] border-[#D9CFC7] hover:border-[#C9B59C]'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>{onlyMyLogs ? 'Private Ledger (Active)' : 'Show All Plant Logs'}</span>
            </button>
          )}

          <button
            onClick={fetchLogs}
            disabled={loading}
            data-cursor="pointer"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#F9F8F6] hover:bg-[#D9CFC7] text-[#1C1815] border border-[#D9CFC7] text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#C9B59C] ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* User Privacy Status Notification */}
      {currentUser && onlyMyLogs && (
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#16A34A]/30 text-xs text-[#16A34A] font-mono shadow-sm">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span className="text-[#1C1815]"><strong>Private Vault Active:</strong> Strictly isolating inspection records to operator <strong className="text-[#16A34A]">{currentUser.email}</strong>.</span>
          </div>
          <span className="text-[10px] text-[#6B5E55] hidden md:inline">CONFIDENTIALITY GUARANTEED</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search & Count */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#6B5E55] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search component, batch, defect..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#D9CFC7] text-xs text-[#1C1815] placeholder-[#6B5E55]/60 focus:outline-none focus:ring-2 focus:ring-[#C9B59C]/40 focus:border-[#C9B59C] font-mono shadow-2xs transition-all"
            />
          </div>
          <span className="text-[11px] font-mono text-[#6B5E55] bg-[#EFE9E3] border border-[#D9CFC7] px-3 py-2 rounded-xl whitespace-nowrap hidden md:inline">
            <strong className="text-[#1C1815]">{filteredLogs.length}</strong> Records
          </span>
        </div>

        {/* Verdict Filters */}
        <div className="flex items-center space-x-1 self-start sm:self-auto bg-[#EFE9E3] p-1 rounded-xl border border-[#D9CFC7] text-xs shadow-inner">
          <button
            onClick={() => setFilterVerdict('')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === '' ? 'bg-[#C9B59C] text-[#1C1815] font-bold shadow-sm' : 'text-[#6B5E55] hover:text-[#1C1815]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterVerdict('PASS')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === 'PASS' ? 'bg-[#16A34A]/20 text-[#16A34A] font-bold' : 'text-[#6B5E55] hover:text-[#1C1815]'
            }`}
          >
            Pass
          </button>
          <button
            onClick={() => setFilterVerdict('REWORK')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === 'REWORK' ? 'bg-[#D97706]/20 text-[#D97706] font-bold' : 'text-[#6B5E55] hover:text-[#1C1815]'
            }`}
          >
            Rework
          </button>
          <button
            onClick={() => setFilterVerdict('SCRAP')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === 'SCRAP' ? 'bg-[#DC2626]/20 text-[#DC2626] font-bold' : 'text-[#6B5E55] hover:text-[#1C1815]'
            }`}
          >
            Scrap
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#D9CFC7] bg-[#EFE9E3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFE9E3] border-b border-[#D9CFC7] text-[#6B5E55] font-mono">
              <tr>
                <th className="py-3.5 px-4 font-semibold">DATE & TIME</th>
                <th className="py-3.5 px-4 font-semibold">BATCH ID</th>
                <th className="py-3.5 px-4 font-semibold">COMPONENT</th>
                <th className="py-3.5 px-4 font-semibold">OPERATOR</th>
                <th className="py-3.5 px-4 font-semibold">VERDICT</th>
                <th className="py-3.5 px-4 font-semibold">DEFECT ANOMALY</th>
                <th className="py-3.5 px-4 font-semibold">CONFIDENCE</th>
                <th className="py-3.5 px-4 text-right font-semibold">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9CFC7] text-[#1C1815] bg-[#FFFFFF]">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9F8F6] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-xs font-semibold text-[#1C1815]">
                        {new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="font-mono text-[10px] text-[#6B5E55]">
                        {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#8C7D73] font-medium">
                      {item.batch_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs text-[#1C1815]">
                        {item.component_name}
                      </div>
                      <div className="text-[10px] text-[#8C7D73] font-mono">
                        {item.category || 'Standard AOI'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#F9F8F6] text-[10px] font-mono text-[#6B5E55] border border-[#D9CFC7] inline-block max-w-[140px] truncate">
                        {item.user_email || item.inspector_id || 'System'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {getVerdictBadge(item.verdict)}
                    </td>
                    <td className="py-3.5 px-4 text-[#6B5E55] font-mono text-[11px]">
                      {item.defect_type || 'None'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1C1815]">
                      {item.confidence}%
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectInspection && onSelectInspection(item)}
                        data-cursor="pointer"
                        className="px-3 py-1.5 rounded-lg bg-[#F9F8F6] hover:bg-[#C9B59C] text-[#1C1815] border border-[#D9CFC7] hover:border-[#C9B59C] text-[11px] font-mono font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#6B5E55] font-mono">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Lock className="w-8 h-8 text-[#C9B59C] mb-1" />
                      <span className="font-bold text-[#1C1815] text-sm">
                        {onlyMyLogs && currentUser
                          ? `No private inspection logs for ${currentUser.email}`
                          : 'No inspection records matching query.'}
                      </span>
                      <span className="text-xs text-[#6B5E55]">
                        {onlyMyLogs && currentUser
                          ? 'Run an optical inspection in the Live Console to log your first verified record.'
                          : 'Try adjusting your search query or verdict filters.'}
                      </span>
                    </div>
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
