'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supaBrowser } from '@/lib/supabase'; // chemin alias @/ si configuré

export default function CallbackClient() {
  const router = useRouter();
  const qs = useSearchParams();

  useEffect(() => {
    const run = async () => {
      try {
        const supa = supaBrowser();
        // Supabase: finalise/charge la session créée par le lien magique
        await supa.auth.getSession();

        const dest = qs.get('redirect') || '/admin';
        router.replace(dest);
      } catch (_e) {
        router.replace('/admin');
      }
    };
    run();
    // qs est stable (URLSearchParams-like), ok dans deps
  }, [qs, router]);

  return <p className="p-6">Connexion en cours…</p>;
}
