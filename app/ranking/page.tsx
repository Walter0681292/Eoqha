import Link from 'next/link'
import { ArrowLeft, Crown } from 'lucide-react'
import { getTopRanking } from '@/lib/ranking'

export const dynamic = 'force-dynamic'

export default async function RankingPage() {
  const ranking = await getTopRanking()
  return <main className="min-h-screen px-5 py-8 sm:px-8"><div className="mx-auto flex w-full max-w-2xl flex-col gap-8"><Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft data-icon="inline-start" />Voltar à jornada</Link><header className="flex flex-col gap-3"><p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Classificação oficial</p><h1 className="font-serif text-5xl text-primary">Ranking</h1><p className="leading-7 text-muted-foreground">Os três participantes com melhor desempenho na jornada oficial do Salmo 14.</p></header><section className="flex flex-col gap-3 rounded-[2rem] border border-primary/10 bg-card/85 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-8">{ranking.length === 0 ? <p className="py-8 text-center text-muted-foreground">Ainda não há participantes classificados.</p> : ranking.map((entry, index) => <div key={entry.id} className="flex items-center justify-between gap-4 rounded-2xl bg-muted/70 p-4"><div className="flex items-center gap-4"><div className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><Crown /></div><div><p className="font-semibold text-primary">{index + 1}. {entry.participant_name}</p><p className="text-sm text-muted-foreground">Jornada oficial</p></div></div><p className="font-mono text-xl text-primary">{entry.score}/10</p></div>)}</section></div></main>
}
