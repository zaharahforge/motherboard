'use client';
import { useEffect, useState } from 'react';
const CREW = ['EMBERLIN','RELAY','SIGNAL','SCOUT','ANCHOR','WARDEN'];
export default function Constellation() {
  const [states, setStates] = useState({ EMBERLIN: 'LIVE' });
  useEffect(() => {
    function onViz(e) { const cue = e.detail || ''; const m = cue.match(/\[VIZ:\s*([A-Z"' ]+?)\s*—\s*([A-Z]+)/); if (!m) return; const who = m[1].replace(/["']/g,'').trim().split(' ')[0]; const st = m[2]; if (CREW.includes(who)) setStates(s => ({ ...s, [who]: st })); if (who === 'MOTHERSHIP') setStates(s => ({ ...s, EMBERLIN: st })); }
    window.addEventListener('emberlin:viz', onViz); return () => window.removeEventListener('emberlin:viz', onViz);
  }, []);
  return <div className="constellation">{CREW.map(n => { const st = states[n] || 'IDLE'; return <div key={n} className={'node ' + st.toLowerCase()}><i></i><b>{n}</b><span>{st}</span></div>; })}</div>;
}
