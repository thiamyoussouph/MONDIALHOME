import { Suspense } from 'react';
import CallbackClient from './CallbackClient';

// Optionnel mais pratique pour éviter le prerender strict
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Chargement…</div>}>
      <CallbackClient />
    </Suspense>
  );
}
