'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supaBrowser } from '@/lib/supabase' // ✅ bon chemin

type Sess = {
  user: { id: string; email?: string | null } | null
} | null

export default function AdminPage() {
  const supa = supaBrowser()

  const [session, setSession] = useState<Sess>(null)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  // Charger la session + écouter les changements
  useEffect(() => {
    const init = async () => {
      const { data } = await supa.auth.getSession()
      setSession(data.session ? { user: data.session.user } : null)
    }
    init()

    const { data: sub } = supa.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess ? { user: sess.user } : null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const sendMagic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setMsg(null)
    const { error } = await supa.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    setSending(false)
    setMsg(error ? error.message : `Lien envoyé à ${email}.`)
  }

  const signOut = async () => {
    await supa.auth.signOut()
  }

  // Écran de connexion
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
        <form
          onSubmit={sendMagic}
          className="w-full max-w-md bg-white rounded-2xl shadow-primary-lg p-8 border border-gray-100"
        >
          <h1 className="text-2xl font-bold text-primary mb-6">Admin — Connexion</h1>

          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton.email@domaine.com"
            className="w-full rounded-xl border-gray-300 focus:ring-accent focus:border-accent px-4 py-3"
          />

          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full bg-accent text-white font-semibold rounded-xl py-3 shadow-accent-lg hover:brightness-95 transition"
          >
            {sending ? 'Envoi…' : 'Recevoir le lien magique'}
          </button>

          {msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}
        </form>
      </div>
    )
  }

  // Tableau de bord
  return (
    <div className="pt-24 max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Tableau de bord Admin</h1>
          <p className="text-gray-600 mt-1">Connecté : {session.user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-accent hover:text-accent transition"
        >
          Se déconnecter
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/admin/products"
          className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-primary hover:shadow-primary-lg hover:-translate-y-0.5 transition"
        >
          <h2 className="text-xl font-semibold text-primary">Produits</h2>
          <p className="text-gray-600 mt-2">Lister, ajouter, modifier, supprimer</p>
        </Link>

        <Link
          href="/admin/categories"
          className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-primary hover:shadow-primary-lg hover:-translate-y-0.5 transition"
        >
          <h2 className="text-xl font-semibold text-primary">Catégories</h2>
          <p className="text-gray-600 mt-2">Gestion optionnelle des catégories</p>
        </Link>
      </div>
    </div>
  )
}
