import React, { useEffect, useState } from 'react';
import SEO from '@/components/SEO.jsx';
import { Input } from '@/components/ui/input.jsx';
import { adminLogin, adminLogout, listFormsAsAdmin } from '@/lib/landingLeads.js';

const SESSION_KEY = 'lots_adm_session_token';

function formatDate(value) {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function readStoredToken() {
  try {
    return sessionStorage.getItem(SESSION_KEY) || '';
  } catch {
    return '';
  }
}

function writeStoredToken(token) {
  try {
    if (token) sessionStorage.setItem(SESSION_KEY, token);
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore storage failures
  }
}

export default function AdmPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);

  const loadWithToken = async (sessionToken) => {
    setLoading(true);
    setError('');
    try {
      const data = await listFormsAsAdmin(sessionToken);
      setRows(Array.isArray(data) ? data : []);
      setAuthed(true);
      setToken(sessionToken);
      writeStoredToken(sessionToken);
    } catch (err) {
      setAuthed(false);
      setRows([]);
      setToken('');
      writeStoredToken('');
      setError(err?.message || 'Sessão inválida. Entre novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = readStoredToken();
    if (saved) loadWithToken(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pwd = password.trim();
    if (!pwd) {
      setError('Informe a senha.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const session = await adminLogin(pwd);
      setPassword(''); // never keep password in React state after login
      await loadWithToken(session.token);
    } catch (err) {
      setAuthed(false);
      setRows([]);
      setToken('');
      writeStoredToken('');
      setError(err?.message || 'Não foi possível entrar.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const current = token || readStoredToken();
    await adminLogout(current);
    setAuthed(false);
    setRows([]);
    setToken('');
    setPassword('');
    writeStoredToken('');
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-8">
      <SEO
        title="Admin — Formulários"
        description="Área interna de formulários da landing."
        url="/adm"
        noindex
      />
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Área interna</p>
            <h1 className="mt-2 font-display text-3xl font-black tracking-tight md:text-4xl">Formulários</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Envios da landing · tabela <code className="text-foreground/80">forms</code> no Supabase Lots BI
            </p>
          </div>
          {authed ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => loadWithToken(token || readStoredToken())}
                className="min-h-11 rounded-lg border border-white/15 px-4 text-sm font-medium hover:bg-white/5"
              >
                Atualizar
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="min-h-11 rounded-lg border border-white/15 px-4 text-sm font-medium hover:bg-white/5"
              >
                Sair
              </button>
            </div>
          ) : null}
        </header>

        {!authed ? (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6" autoComplete="off">
            <label htmlFor="adm-password" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Senha
            </label>
            <Input
              id="adm-password"
              type="password"
              name="adm-password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 rounded-xl border-white/10 bg-background/40"
            />
            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-gradient px-6 text-sm font-semibold text-white disabled:opacity-70"
            >
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {loading ? (
              <p className="p-6 text-sm text-muted-foreground">Carregando…</p>
            ) : rows.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">Nenhum envio ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Quando</th>
                      <th className="px-4 py-3 font-medium">Nome</th>
                      <th className="px-4 py-3 font-medium">E-mail</th>
                      <th className="px-4 py-3 font-medium">Instagram</th>
                      <th className="px-4 py-3 font-medium">Origem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id} className="border-b border-white/5 last:border-0">
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(row.created_at)}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{row.nome}</td>
                        <td className="px-4 py-3">
                          <a className="text-foreground underline decoration-white/20 underline-offset-2" href={`mailto:${row.email}`}>
                            {row.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-foreground">{row.instagram}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.source || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {error ? (
              <p className="border-t border-white/10 p-4 text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
