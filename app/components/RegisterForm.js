'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SUPABASE_URL = 'https://kmqqnljkpsnkokmmygti.supabase.co';
const SUPABASE_KEY = 'sb_publishable_2l2yib-DKtmTGFNzZFPYuA_7-41fPLt';
const EVENT = 'masterclass_2026_09_29';

async function insert(table, body) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  });
  return r;
}

export default function RegisterForm({ light = false, compact = false }) {
  const router = useRouter();
  const [state, setState] = useState('idle');
  const [utm, setUtm] = useState({});
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const u = { utm_source: p.get('utm_source') || p.get('src') || document.referrer.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] || 'direct', utm_medium: p.get('utm_medium') || 'social', utm_campaign: p.get('utm_campaign') || 'masterclass_0929' };
    setUtm(u);
  }, []);
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email') || '').trim().toLowerCase();
    const first_name = String(f.get('first_name') || '').trim();
    const building = String(f.get('building') || '').trim();
    if (!email.includes('@')) return;
    setState('sending');
    // Primary table; falls back to the shared subscriber list if not yet provisioned.
    let r = await insert('motherboard_registrations', { email, first_name, building, source: utm.utm_source, ...utm, event: EVENT });
    if (!r.ok && r.status !== 409) {
      r = await insert('transmission_subscribers', { email, source: `motherboard:${utm.utm_source}`, product_interest: EVENT, what_brought_you: [first_name, building].filter(Boolean).join(' — ') });
    }
    if (r.ok || r.status === 409) {
      try { localStorage.setItem('mb_registered', email); } catch (_) {}
      router.push(`/thank-you?n=${encodeURIComponent(first_name)}`);
    } else { setState('error'); }
  }
  return (
    <form className={`regform${light ? ' regform-light' : ''}`} onSubmit={submit}>
      {!compact && <p className="eyebrow">SAVE YOUR SEAT • FREE</p>}
      <div className="regrow"><input name="first_name" placeholder="First name" autoComplete="given-name" required /><input name="email" type="email" placeholder="Email" autoComplete="email" required /></div>
      {!compact && <input name="building" placeholder="What are you building (or want to build)?" />}
      <button className="button" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Saving…' : 'Save my seat'} <span>↗</span></button>
      {state === 'error' && <p className="formnote">Something slipped. Try again or email hello@forgeaeon.com.</p>}
      <p className="formnote">Tuesday, September 29 · 5:30 PM PT (8:30 PM ET) · Live on Google Meet · Replay for registrants.</p>
    </form>
  );
}
