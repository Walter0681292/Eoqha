import { QuizApp } from '@/components/quiz-app'

export default function Page() {
  return <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 sm:py-10"><div className="mx-auto max-w-[600px]"><header className="mb-6 text-center"><p className="text-2xl font-extrabold tracking-[0.2em] text-sky-400">ÉOQHÁ</p><p className="mt-1 text-sm tracking-[0.12em] text-slate-400">JORNADA ÉOQHÁ SALMOS</p></header><QuizApp /><p className="mt-5 text-center text-xs uppercase tracking-[0.16em] text-slate-500">Estudo, reflexão e prática</p></div></main>
}
