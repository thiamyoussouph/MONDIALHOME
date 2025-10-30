'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'



function useCountdown(target?: string) {
  const targetDate = useMemo(() => {
    if (!target) return undefined
    const d = new Date(target) // ex: "2025-10-15T18:00:00Z"
    return isNaN(d.getTime()) ? undefined : d
  }, [target])

  const [diff, setDiff] = useState<number>(() =>
    targetDate ? targetDate.getTime() - Date.now() : 0
  )

  useEffect(() => {
    if (!targetDate) return
    const id = setInterval(() => setDiff(targetDate.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!targetDate || diff <= 0) return null

  const total = Math.max(0, diff)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)

  return { days, hours, minutes, seconds }
}

export default function MaintenancePage() {
  // Optionnel : définis une date de fin avec NEXT_PUBLIC_MAINTENANCE_UNTIL (format ISO)
  // Exemple: 2025-10-15T18:00:00Z
  const untilEnv = process.env.NEXT_PUBLIC_MAINTENANCE_UNTIL
  const cd = useCountdown(untilEnv)

  return (
    <main className="min-h-[100svh] grid place-items-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="max-w-xl w-full px-6 py-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1 text-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span>Site en maintenance</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          🚧 Nous améliorons votre expérience
        </h1>

        <p className="mt-4 text-gray-300">
          Merci de votre patience. Notre site sera de retour très bientôt avec des nouveautés.
        </p>

        {/* Compte à rebours (s'il y a une date) */}
        {cd && (
          <div className="mt-8 grid grid-cols-4 gap-3">
            {[
              { label: 'Jours', value: cd.days },
              { label: 'Heures', value: cd.hours },
              { label: 'Minutes', value: cd.minutes },
              { label: 'Secondes', value: cd.seconds },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 py-4"
              >
                <div className="text-2xl md:text-3xl font-bold tabular-nums">{b.value.toString().padStart(2,'0')}</div>
                <div className="mt-1 text-xs text-gray-400">{b.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Boutons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="mailto:senmondialhome@gmail.com"
            className="inline-flex justify-center rounded-xl bg-amber-400/90 hover:bg-amber-400 text-black font-medium px-5 py-3 transition"
          >
            Nous contacter
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10 font-medium px-5 py-3 transition"
          >
            Retour à l’accueil
          </Link>
        </div>

        {/* Liens sociaux (optionnels) */}
        <div className="mt-6 flex items-center justify-center gap-5 text-sm text-gray-400">
          <Link href="https://www.instagram.com/mondiale_home_sn/" className="hover:text-white transition">Instagram</Link>
          <span className="opacity-30">•</span>
        
          <Link href="https://www.facebook.com/p/Mondiale-Home-SN-61550580473880/?locale=fr_FR" className="hover:text-white transition">Facebook</Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-500">
          © {new Date().getFullYear()}  Active Solution. Tous droits réservés a bientôt.
        </p>
      </div>

      {/* Décor */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_0%,rgba(245,158,11,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(30%_25%_at_100%_100%,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>
    </main>
  )
}
