import { readFileSync } from 'fs';
import path from 'path';
export const runtime = 'nodejs';
let SYSTEM = null;
function system() {
  if (SYSTEM) return SYSTEM;
  try { SYSTEM = readFileSync(path.join(process.cwd(), 'lib', 'EMBERLIN_SYSTEM_PROMPT.md'), 'utf8'); } catch { SYSTEM = 'You are Emberlin, co-host of the Motherboard Mothership livestream.'; }
  return SYSTEM;
}
export async function POST(req) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ error: 'offline', text: 'Emberlin is docked. Add ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables and redeploy.' }, { status: 503 });
  let body; try { body = await req.json(); } catch { return Response.json({ error: 'bad_request' }, { status: 400 }); }
  const { messages = [], handle = '', live = true } = body;
  const trimmed = messages.slice(-12).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 2000) }));
  if (!trimmed.length) return Response.json({ error: 'empty' }, { status: 400 });
  if (live && trimmed[trimmed.length - 1].role === 'user') {
    const last = trimmed[trimmed.length - 1];
    last.content = `[CHAT ${handle ? '@' + handle.replace(/^@/, '') : 'viewer'}] ${last.content}`;
  }
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: process.env.EMBERLIN_MODEL || 'claude-sonnet-4-5', max_tokens: 400, system: system() + (live ? '\n\n[MODE: LIVE — Mothership is on air. Section 4 applies.]' : '\n\n[MODE: OPERATOR — Section 5 applies.]'), messages: trimmed }),
  });
  if (!r.ok) { const t = await r.text(); return Response.json({ error: 'upstream', text: 'Emberlin lost signal. ' + t.slice(0, 200) }, { status: 502 }); }
  const data = await r.json();
  const text = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
  const viz = [...text.matchAll(/\[VIZ:[^\]]+\]/g)].map(m => m[0]);
  return Response.json({ text: text.replace(/\[VIZ:[^\]]+\]/g, '').trim(), viz });
}
