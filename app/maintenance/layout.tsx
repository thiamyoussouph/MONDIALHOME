export const metadata = {
  title: 'Site en maintenance',
  description: 'Nous revenons très vite. Merci de votre patience.',
}

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout minimal : pas de header/footer globaux
  return <>{children}</>
}
