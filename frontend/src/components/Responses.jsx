import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Responses() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/responses`);
      const data = await res.json();
      setRows(data || []);
    } catch (err) {
      console.error(err);
      alert("Could not load responses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div>Loading...</div>;
  if (!rows.length) return <div>No responses yet.</div>;

  // Build table headers: time + all question keys inside answers
  const first = rows[0];
  const questionKeys = first && first.answers ? Object.keys(first.answers) : [];

  return (
    <div className="card full">
      <h2>Responses</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            {questionKeys.map(k => <th key={k}>{k}</th>)}
            <th>timestamp</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id || idx}>
              <td>{idx+1}</td>
              {questionKeys.map(k => <td key={k}>{r.answers[k] ?? ""}</td>)}
              <td>{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10 }}>
        <button onClick={load}>Refresh</button>
      </div>
    </div>
  );
}
