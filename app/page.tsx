import { QuizApp } from '@/components/quiz-app'
import { ArrowDown, BookOpen, CircleHelp, Sparkles } from 'lucide-react'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-12 text-foreground sm:px-6">
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between py-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary"><BookOpen className="size-4" />Jornada de caráter</div>
        <div className="absolute left-1/2 -translate-x-1/2 font-serif text-xl font-semibold tracking-[0.28em] text-primary sm:text-2xl">ÉOQHÁ</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><CircleHelp className="size-4" />Salmo 21 · ARA</div>
      </header>
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-5 px-2 pb-10 pt-12 text-center sm:pt-20"><div className="flex items-center gap-2 rounded-full border border-primary/10 bg-card/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm"><Sparkles className="size-3 text-accent-foreground" />Aprender para viver melhor</div><h1 className="max-w-3xl font-serif text-5xl leading-[0.98] text-primary sm:text-7xl">A verdade também forma o <em className="text-accent-foreground">coração.</em></h1><p className="max-w-xl text-pretty leading-7 text-muted-foreground">Uma experiência de estudo para ler com atenção, responder com intenção e transformar conhecimento em caráter.</p><a href="#quiz" className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-5 py-3 text-sm font-semibold text-primary backdrop-blur transition hover:-translate-y-0.5">Começar jornada <ArrowDown className="size-4" /></a></section>
      <div id="quiz" className="relative z-10"><QuizApp /></div>
      <footer className="relative z-10 mx-auto flex max-w-3xl justify-center pt-8 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Estudo contemplativo · Conhecimento que se torna prática</footer>
    </main>
  )
}
