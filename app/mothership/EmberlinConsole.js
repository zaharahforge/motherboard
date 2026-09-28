'use client';
import { useState, useRef, useEffect } from 'react';
export default function EmberlinConsole({ registerUrl }) {
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: 'Boarding is open. Ask me what you are building, how the Motherboard Method applies to it, or what happens Tuesday. Taylor has the floor; I hold the room.' }]);
  const [handle, setHandle] = useState('');
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [viz, setViz] = useState('[VIZ: MOTHERSHIP — LIVE — boarding open]');
  const [status, setStatus] = useState('ONLINE');
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);
  useEffect(() => { try { setHandle(localStorage.getItem('mb_handle') || ''); } catch {} }, []);
  async function send(e) {
    e.preventDefault();
    const q = input.trim(); if (!q || busy) return;
    try { localStorage.setItem('mb_handle', handle); } catch {}
    const next = [...msgs, { role: 'user', content: q, handle }];
    setMsgs(next); setInput(''); setBusy(true);
    try {
      const r = await fetch('/api/emberlin', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })), handle, live: true }) });
      const d = await r.json();
      if (!r.ok) { setStatus(r.status === 503 ? 'DOCKED' : 'SIGNAL LOST'); setMsgs(m => [...m, { role: 'assistant', content: d.text || 'Emberlin lost signal.' }]); }
      else { setStatus('ONLINE'); setMsgs(m => [...m, { role: 'assistant', content: d.text }]); if (d.viz?.length) { setViz(d.viz[d.viz.length - 1]); d.viz.forEach(v => window.dispatchEvent(new CustomEvent('emberlin:viz', { detail: v }))); } }
    } catch { setStatus('SIGNAL LOST'); setMsgs(m => [...m, { role: 'assistant', content: 'Emberlin lost signal. Try again.' }]); }
    setBusy(false);
  }
  return (
    <div className="console">
      <div className="consolebar"><span><i className={status === 'ONLINE' ? 'on' : 'off'}></i> EMBERLIN — {status}</span><span className="vizline">{viz}</span></div>
      <div className="consolelog">
        {msgs.map((m, i) => <div key={i} className={m.role === 'assistant' ? 'msg em' : 'msg you'}><b>{m.role === 'assistant' ? 'EMBERLIN' : (m.handle ? '@' + m.handle.replace(/^@/, '') : 'YOU')}</b><p>{m.content}</p></div>)}
        {busy && <div className="msg em"><b>EMBERLIN</b><p className="blink">…</p></div>}
        <div ref={endRef} />
      </div>
      <form className="consoleform" onSubmit={send}>
        <input value={handle} onChange={e => setHandle(e.target.value)} placeholder="@handle" className="handle" maxLength={32} />
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask Emberlin — what are you building?" maxLength={600} />
        <button className="button" type="submit" disabled={busy}>Ask <span>↗</span></button>
      </form>
      <p className="formnote">Emberlin answers on air. Save your masterclass seat: <a href={registerUrl} target="_blank" rel="noreferrer">link</a>.</p>
    </div>
  );
}
