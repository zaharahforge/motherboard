import Link from 'next/link';
import EmberlinConsole from './EmberlinConsole';
import { MOTHERSHIP as C } from './config';
export const metadata = { title: 'The Mothership — Motherboard Live', description: 'Motherboard’s livestream hub. Build in public with T. Evans and Emberlin, the live AI co-host.' };
export default function Mothership(){
  const embed = C.youtubeChannelId ? `https://www.youtube.com/embed/live_stream?channel=${C.youtubeChannelId}&autoplay=1` : null;
  return <main className="ship">
    <div className="topbar shipbar">THE MOTHERSHIP • BOARDING OPEN • MASTERCLASS TUESDAY 5:30 PM PT</div>
    <nav className="shipnav"><Link className="logo" href="/">MOTHER<span>BOARD</span></Link><div className="navlinks"><Link href="/masterclass">Masterclass</Link><Link href="/academy">Academy</Link><a href={`https://www.youtube.com/${C.youtubeHandle}`} target="_blank" rel="noreferrer">YouTube</a><a href={`https://www.tiktok.com/${C.tiktokHandle}`} target="_blank" rel="noreferrer">TikTok</a></div><a className="button small" href={C.registerUrl} target="_blank" rel="noreferrer">Save my seat</a></nav>
    <section className="shiphero">
      <div className="rings"><i></i><i></i><i></i></div>
      <p className="eyebrow">MOTHERBOARD LIVE • HOME BASE</p>
      <h1>The <em>Mothership.</em></h1>
      <p className="lede">We do not come to the Mothership to consume. We come to ship. Watch the build in real time, ask Emberlin anything, and board the room before Tuesday.</p>
      <div className="signal"><i></i> IN ORBIT: BUILDING MOTHERBOARD IN PUBLIC UNTIL THE MASTERCLASS.</div>
    </section>
    <section className="deck">
      <div className="screen">
        <p className="eyebrow">LIVE FEED</p>
        {embed ? <iframe src={embed} title="Motherboard live" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <div className="offair"><b>NEXT BOARDING</b><h3>{C.schedule[0].title}</h3><p>{C.schedule[0].day} · {C.schedule[0].time}</p><div className="actions"><a className="button" href={`https://www.youtube.com/${C.youtubeHandle}/live`} target="_blank" rel="noreferrer">Watch on YouTube <span>↗</span></a><a className="textlink lighttext" href={`https://www.tiktok.com/${C.tiktokHandle}/live`} target="_blank" rel="noreferrer">TikTok Live →</a></div></div>}
      </div>
      <div className="side">
        <p className="eyebrow">CO-HOST</p>
        <EmberlinConsole registerUrl={C.registerUrl} />
      </div>
    </section>
    <section className="manifest">
      <p className="eyebrow">FLIGHT MANIFEST</p>
      <h2>Boarding schedule.</h2>
      <div className="manifestlist">{C.schedule.map((s,i)=><div key={i} className={i===C.schedule.length-1?'row hot':'row'}><b>{String(i+1).padStart(2,'0')}</b><span className="when">{s.day}<br/>{s.time}</span><span className="what"><h3>{s.title}</h3><p>{s.note}</p></span></div>)}</div>
    </section>
    <section className="crew">
      <p className="eyebrow">ON DECK</p>
      <h2>The Digital Workforce.</h2>
      <div className="crewgrid">{[['EMBERLIN','Command core + live co-host','Holds the room. Answers the chat. Routes the crew.'],['RELAY','Mothership chat agent','Clusters questions, drops duplicates, hands Emberlin the next best one.'],['SIGNAL','Content agent','Reels, carousels, captions, emails — in Taylor’s voice.'],['SCOUT','Lead qualifier','Scores registrants by fit, intent, urgency.'],['ANCHOR','Follow-up agent','No engaged lead goes 72 hours without a touch.'],['WARDEN','Scheduling agent','Protects deep work like revenue.']].map(([n,r,d])=><article key={n}><b>{n}</b><h3>{r}</h3><p>{d}</p></article>)}</div>
    </section>
    <section className="cta shipcta"><p className="eyebrow">{C.masterclass.when.toUpperCase()}</p><h2>Board before<br/>Tuesday.</h2><p>{C.masterclass.label}. Free, live, on Google Meet. Enrollment for the founding Academy cohort opens in the room.</p><div className="actions"><a className="button light" href={C.registerUrl} target="_blank" rel="noreferrer">Save my seat <span>↗</span></a><Link className="textlink lighttext" href="/academy">See the Academy →</Link></div></section>
    <footer><Link className="logo" href="/">MOTHER<span>BOARD</span></Link><p>Build power around real life.</p><div><Link href="/legal">Terms + Privacy</Link><Link href="/about">About</Link></div></footer>
  </main>;
}
