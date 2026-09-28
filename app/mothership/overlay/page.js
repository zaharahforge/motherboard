import EmberlinConsole from '../EmberlinConsole';
import { MOTHERSHIP as C } from '../config';
export const metadata = { title: 'Mothership Overlay', robots: { index: false } };
// OBS Browser Source: 1920x1080, transparent. ?panel=1 adds the Emberlin console (drive it via OBS "Interact").
export default function Overlay({ searchParams }) {
  const panel = searchParams?.panel === '1';
  const ticker = [`${C.masterclass.label} — ${C.masterclass.when}`, 'Free seat: bit.ly/3T5oYTq', 'Ask Emberlin anything — she is the AI co-host, answering live', 'Motherboard: AI is the workforce. Your intelligence is the asset. Ownership is the outcome.', 'Building in public tonight. Founding Academy pricing ends Sunday, Oct 4.'];
  return <div className="ovl">
    <div className="ovl-badge"><i></i><b>LIVE</b><span>MOTHERBOARD • THE MOTHERSHIP • BUILDING IN PUBLIC</span></div>
    <div className="ovl-link">bit.ly/3T5oYTq <small>SAVE YOUR MASTERCLASS SEAT</small></div>
    {panel && <div className="ovl-panel"><EmberlinConsole registerUrl={C.registerUrl} /></div>}
    <div className="ovl-lower"><div className="ovl-lower-name"><b>T. EVANS</b><span>FOUNDER, MOTHERBOARD</span></div><div className="ovl-ticker"><div className="ovl-track">{[...ticker, ...ticker].map((t, i) => <span key={i}>{t}<em>◆</em></span>)}</div></div></div>
  </div>;
}
