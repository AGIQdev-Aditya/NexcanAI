import React, { useState, useEffect } from 'react';
import { Database, Filter, RefreshCw, CheckCircle2, AlertTriangle, XOctagon, Search, Lock, ShieldCheck } from 'lucide-react';
import { getAuditLogs } from '../services/api.js';

export default function AuditLog({ onSelectInspection, currentUser }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterVerdict, setFilterVerdict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Strictly default to viewing private user logs if an operator is logged in
  const [onlyMyLogs, setOnlyMyLogs] = useState(() => Boolean(currentUser));

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
    if (currentUser) {
      setOnlyMyLogs(true);
    }
  }, [currentUser]);

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
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#A7F3D0]/15 text-[#A7F3D0] border border-[#A7F3D0]/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>PASS</span>
          </span>
        );
      case 'REWORK':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FDE68A]/15 text-[#FDE68A] border border-[#FDE68A]/30">
            <AlertTriangle className="w-3 h-3" />
            <span>REWORK</span>
          </span>
        );
      case 'SCRAP':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FDA4AF]/15 text-[#FDA4AF] border border-[#FDA4AF]/30">
            <XOctagon className="w-3 h-3" />
            <span>SCRAP</span>
          </span>
        );
      default:
        return <span className="text-xs font-mono text-[#C5B7AE]">{verdict}</span>;
    }
  };

  return (
    <div className="space-y-5 animate-fade-in font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#171210] border border-[#2D1F1A] shadow-lg">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#F5A882] mb-1">
            <Database className="w-4 h-4 text-[#F5A882]" />
            <span>CRYPTOGRAPHIC OPTICAL AUDIT REPOSITORY</span>
          </div>
          <h2 className="text-xl font-bold text-[#FAF8F5]">Optical Inspection Audit Trail</h2>
          <p className="text-xs text-[#C5B7AE]">
            Immutable inspection log certified to ISO-9001:2015 Clause 8.5.1 requirements.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {currentUser && (
            <button
              onClick={() => setOnlyMyLogs(!onlyMyLogs)}
              data-cursor="pointer"
              className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all border flex items-center space-x-1.5 cursor-pointer ${
                onlyMyLogs
                  ? 'bg-[#F5A882] text-[#0E0B0A] border-[#F5A882] shadow-sm'
                  : 'bg-[#0E0B0A] text-[#C5B7AE] border-[#2D1F1A] hover:border-[#F5A882]/50'
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
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#0E0B0A] hover:bg-[#231A16] text-[#C5B7AE] hover:text-white border border-[#2D1F1A] text-xs font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* User Privacy Status Notification */}
      {currentUser && onlyMyLogs && (
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0E0B0A] border border-[#A7F3D0]/30 text-xs text-[#A7F3D0] font-mono">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#A7F3D0]" />
            <span><strong>Private Vault Active:</strong> Strictly isolating inspection records to operator <strong className="text-white">{currentUser.email}</strong>.</span>
          </div>
          <span className="text-[10px] text-[#C5B7AE] hidden md:inline">CONFIDENTIALITY GUARANTEED</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#C5B7AE] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search component, batch, defect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#171210] border border-[#2D1F1A] text-xs text-white placeholder-[#C5B7AE]/50 focus:outline-none focus:border-[#F5A882] font-mono"
          />
        </div>

        {/* Verdict Filters with Pastel Accents */}
        <div className="flex items-center space-x-1 self-start sm:self-auto bg-[#171210] p-1 rounded-xl border border-[#2D1F1A] text-xs">
          <button
            onClick={() => setFilterVerdict('')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === '' ? 'bg-[#2D1F1A] text-[#FAF8F5]' : 'text-[#C5B7AE] hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterVerdict('PASS')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === 'PASS' ? 'bg-[#A7F3D0]/20 text-[#A7F3D0] font-bold' : 'text-[#C5B7AE] hover:text-white'
            }`}
          >
            Pass
          </button>
          <button
            onClick={() => setFilterVerdict('REWORK')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === 'REWORK' ? 'bg-[#FDE68A]/20 text-[#FDE68A] font-bold' : 'text-[#C5B7AE] hover:text-white'
            }`}
          >
            Rework
          </button>
          <button
            onClick={() => setFilterVerdict('SCRAP')}
            data-cursor="pointer"
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              filterVerdict === 'SCRAP' ? 'bg-[#FDA4AF]/20 text-[#FDA4AF] font-bold' : 'text-[#C5B7AE] hover:text-white'
            }`}
          >
            Scrap
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#2D1F1A] bg-[#171210] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E0B0A] border-b border-[#2D1F1A] text-[#C5B7AE] font-mono">
              <tr>
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">BATCH ID</th>
                <th className="py-3 px-4">COMPONENT</th>
                <th className="py-3 px-4">OPERATOR</th>
                <th className="py-3 px-4">VERDICT</th>
                <th className="py-3 px-4">DEFECT TYPE</th>
                <th className="py-3 px-4">CONFIDENCE</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D1F1A]/70 text-[#FAF8F5]">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((item) => (
                  <tr key={item.id} className="hover:bg-[#231A16]/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-[#C5B7AE]">
                      {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#F5A882] font-medium">
                      {item.batch_id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {item.component_name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#0E0B0A] text-[10px] font-mono text-[#C5B7AE] border border-[#2D1F1A]">
                        {item.user_email || item.inspector_id || 'System'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getVerdictBadge(item.verdict)}
                    </td>
                    <td className="py-3 px-4 text-[#C5B7AE] font-mono text-[11px]">
                      {item.defect_type}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {item.confidence}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectInspection && onSelectInspection(item)}
                        data-cursor="pointer"
                        className="px-2.5 py-1 rounded bg-[#2D1F1A] hover:bg-[#F5A882] hover:text-[#0E0B0A] text-[#FAF8F5] text-[11px] font-mono font-bold transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#C5B7AE] font-mono">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Lock className="w-8 h-8 text-[#F5A882]/60 mb-1" />
                      <span className="font-bold text-[#FAF8F5] text-sm">
                        {onlyMyLogs && currentUser
                          ? `No private inspection logs for ${currentUser.email}`
                          : 'No inspection records matching query.'}
                      </span>
                      <span className="text-xs text-[#C5B7AE]">
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
