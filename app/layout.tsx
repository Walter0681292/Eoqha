import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'ÉOQHÁ · Jornada ÉOQHÁ Salmos', description: 'Quiz interativo de estudo do Salmo 37.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#0f172a', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html> }
