'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Check, ChevronRight, Clock3, Flame, Lightbulb, RotateCcw, Sparkles, Target, Trophy, X } from 'lucide-react'

const questions = [
  { prompt: 'O que o insensato diz em seu coração, segundo o versículo 1?', options: ['“Deus não se importa conosco.”', '“Não há Deus.”', '“O SENHOR está distante.”', '“A salvação nunca virá.”'], answer: 1, reference: 'Salmo 14:1a', quote: 'Diz o insensato no seu coração: Não há Deus.', tip: 'A tolice não começa nas palavras ditas ao vento, mas no sussurro silencioso do peito que nega o próprio Arquiteto.' },
  { prompt: 'O que acontece com aqueles que dizem no seu coração que “Não há Deus”?', options: ['Prosperam em suas riquezas.', 'Corrompem-se e praticam abominação.', 'Escondem-se da presença do SENHOR.', 'Buscam sabedoria humana.'], answer: 1, reference: 'Salmo 14:1b', quote: 'Corrompem-se e praticam abominação; já não há quem faça o bem.', tip: 'Quando a Fonte da Verdade é ignorada pela mente, a conduta moral perde a sua fundação.' },
  { prompt: 'De onde o SENHOR olha para os filhos dos homens para ver se há quem busque a Deus?', options: ['Do monte Sião.', 'Do seu santo templo.', 'Do céu.', 'De Jerusalém.'], answer: 2, reference: 'Salmo 14:2', quote: 'Do céu olha o SENHOR para os filhos dos homens.', tip: 'O olhar do Criador não se limita às paredes de pedra da Terra.' },
  { prompt: '[COMPLETE A FRASE] “Todos se extraviaram e juntamente se corromperam; não há quem faça o bem, ________.”', options: ['senão os justos.', 'não há nem um sequer.', 'a não ser os puros de coração.', 'apenas os que buscam a Deus.'], answer: 1, reference: 'Salmo 14:3', quote: 'Todos se extraviaram e juntamente se corromperam; não há quem faça o bem, não há nem um sequer.', tip: 'A balança da humanidade revela uma universalidade radical: a regra não deixa margem para exceções pessoais.' },
  { prompt: 'Como os obreiros da iniquidade devoram o povo do SENHOR?', options: ['Como quem devora uma presa.', 'Como quem consome o fogo.', 'Como quem come pão.', 'Como quem destrói uma vinha.'], answer: 2, reference: 'Salmo 14:4', quote: 'Devora o meu povo, como quem come pão, que não invocam o SENHOR?', tip: 'A opressão contra os inocentes tornou-se para os perversos um ato habitual.' },
  { prompt: '[VERDADE OU MENTIRA] De acordo com o versículo 4, os obreiros da iniquidade invocam o SENHOR continuamente em suas orações.', options: ['Verdade', 'Mentira'], answer: 1, reference: 'Salmo 14:4', quote: '...que devoram o meu povo, como quem come pão, que não invocam o SENHOR?', tip: 'Quem devora o rebanho do Pastor dificilmente se ajoelhará para clamar pelo Seu Santo Nome.' },
  { prompt: 'Por qual motivo os ímpios tomar-se-ão de grande pavor, segundo o versículo 5?', options: ['Porque a ira de Deus cairá sobre eles.', 'Porque Deus está com a linhagem do justo.', 'Porque os seus exércitos foram derrotados.', 'Porque os humildes prevaleceram.'], answer: 1, reference: 'Salmo 14:5', quote: 'Tomar-se-ão de grande pavor, porque Deus está com a linhagem do justo.', tip: 'O medo assola o ímpio ao perceber que o Invisível habita com os fiéis.' },
  { prompt: 'O que os ímpios tentam fazer com o conselho dos humildes?', options: ['Destruir totalmente.', 'Ignorar completamente.', 'Meter a ridículo.', 'Imitar com falsidade.'], answer: 2, reference: 'Salmo 14:6', quote: 'Meteis a ridículo o conselho dos humildes, mas o SENHOR é o seu refúgio.', tip: 'O orgulhoso tenta transformar a prudência do simples em motivo de piada.' },
  { prompt: 'De onde o salmista deseja que venha a salvação de Israel?', options: ['Dos céus.', 'De Sião.', 'Do deserto.', 'Do templo de Jerusalém.'], answer: 1, reference: 'Salmo 14:7a', quote: 'Tomara de Sião viesse já a salvação de Israel!', tip: 'A libertação almejada brota do monte sagrado escolhido para a morada do Rei.' },
  { prompt: '[COMPLETE A FRASE] “Quando o SENHOR restaurar a sorte do seu povo, então, exultará Jacó, ________.”', options: ['e Israel se alegrará.', 'e os justos cantarão.', 'e o povo louvará ao SENHOR.', 'e Sião se rejubilará.'], answer: 0, reference: 'Salmo 14:7b', quote: 'Quando o SENHOR restaurar a sorte do seu povo, então, exultará Jacó, e Israel se alegrará.', tip: 'A alegria da restauração une o patriarca e a nação em um só brado de regozijo.' },
]

export function QuizApp() {
  const [participantName, setParticipantName] = useState('')
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [hintUsed, setHintUsed] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(60)
  const [finished, setFinished] = useState(false)
  const [reflection, setReflection] = useState('')
  const question = questions[current]
  const answered = selected !== null
  const progress = ((current + (answered ? 1 : 0)) / questions.length) * 100

  useEffect(() => {
    if (!started || finished || answered) return
    const timer = window.setInterval(() => setSeconds((value) => value > 0 ? value - 1 : 0), 1000)
    return () => window.clearInterval(timer)
  }, [started, finished, answered, current])

  const feedback = useMemo(() => selected === question.answer, [selected, question.answer])

  function choose(index: number) {
    if (answered) return
    setSelected(index)
    if (index === question.answer) setScore((value) => value + 1)
  }

  async function next() {
    if (current === questions.length - 1) {
      setFinished(true)
      await fetch('/api/ranking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ participantName, score: score + (selected === question.answer ? 1 : 0) }) })
    }
    else { setCurrent((value) => value + 1); setSelected(null); setHintUsed(false); setShowHint(false); setSeconds(60) }
  }

  function useGoldenHint() {
    if (answered || hintUsed) return
    setHintUsed(true)
    setShowHint(true)
    setSeconds((value) => Math.max(0, value - 15))
  }

  function restart() { setCurrent(0); setSelected(null); setHintUsed(false); setShowHint(false); setScore(0); setSeconds(60); setFinished(false); setReflection('') }

  if (!started) return <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[2rem] border border-primary/10 bg-card/85 p-6 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-10"><div className="flex items-center justify-between gap-4"><div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground"><Trophy /></div><Link href="/ranking" className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-muted"><Trophy data-icon="inline-start" />Ranking</Link></div><div className="flex flex-col gap-2"><p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">Jornada oficial</p><h2 className="font-serif text-4xl text-primary sm:text-5xl">Antes de começar</h2><p className="max-w-xl leading-7 text-muted-foreground">Registre seu nome para participar da estatística dos três melhores classificados.</p></div><label className="flex flex-col gap-2"><span className="font-semibold text-primary">Nome do participante</span><input value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="Digite seu nome" maxLength={80} className="rounded-2xl border border-border bg-background/70 p-4 outline-none ring-ring focus:ring-2" /></label><button onClick={() => setStarted(true)} disabled={!participantName.trim()} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">Iniciar jornada<ChevronRight data-icon="inline-end" /></button></section>

  if (finished) return <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[2rem] border border-primary/10 bg-card/85 p-6 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-10">
    <div className="flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground"><Sparkles /></div>
    <div className="flex flex-col gap-2"><p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">Jornada concluída</p><h2 className="font-serif text-4xl text-primary sm:text-5xl">Seu aprendizado continua.</h2><p className="max-w-xl leading-7 text-muted-foreground">Você respondeu {score} de {questions.length} perguntas corretamente. Mais importante que a pontuação é o que a Palavra desperta em suas escolhas.</p></div>
    <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-muted/70 p-4"><Target className="mb-4 text-accent-foreground" /><p className="font-mono text-3xl text-primary">{score}/{questions.length}</p><p className="text-sm text-muted-foreground">Acertos</p></div><div className="rounded-2xl bg-muted/70 p-4"><Flame className="mb-4 text-accent-foreground" /><p className="font-mono text-3xl text-primary">{Math.round(score / questions.length * 100)}%</p><p className="text-sm text-muted-foreground">Aproveitamento</p></div><div className="rounded-2xl bg-muted/70 p-4"><BookOpen className="mb-4 text-accent-foreground" /><p className="font-mono text-3xl text-primary">Salmo 14</p><p className="text-sm text-muted-foreground">Texto estudado</p></div></div>
    <label className="flex flex-col gap-2"><span className="font-semibold text-primary">Uma atitude para praticar hoje</span><textarea value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Escreva uma pequena decisão de caráter..." className="min-h-28 rounded-2xl border border-border bg-background/70 p-4 text-sm outline-none ring-ring focus:ring-2" /></label>
    <button onClick={restart} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"><RotateCcw data-icon="inline-start" />Recomeçar jornada</button>
  </section>

  return <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-primary/10 bg-card/85 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-8">
    <div className="mb-8 flex items-center justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Pergunta {String(current + 1).padStart(2, '0')} de {questions.length}</p><div className="mt-3 h-2 w-40 overflow-hidden rounded-full bg-muted sm:w-64"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} /></div></div><div className="flex items-center gap-2 rounded-full bg-muted px-3 py-2 font-mono text-xs text-primary"><Clock3 data-icon="inline-start" />{seconds}s</div></div>
    <div className="flex flex-col gap-3"><span className="inline-flex w-fit items-center rounded-full bg-accent/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-foreground">Jornada oficial · Ranking</span><h2 className="font-serif text-3xl leading-tight text-primary sm:text-4xl">{question.prompt}</h2></div>
    <div className="mt-8 flex flex-col gap-3">{question.options.map((option, index) => { const isCorrect = answered && index === question.answer; const isWrong = answered && index === selected && !isCorrect; return <button key={option} onClick={() => choose(index)} className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left text-sm transition-all ${isCorrect ? 'border-accent bg-accent/30' : isWrong ? 'border-destructive bg-destructive/10' : 'border-border bg-background/50 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted'}`}><span>{option}</span>{isCorrect && <Check className="shrink-0 text-accent-foreground" />}{isWrong && <X className="shrink-0 text-destructive" />}</button> })}</div>
    {answered && <div className="mt-6 rounded-2xl bg-muted/75 p-5"><div className="flex items-start gap-3"><Lightbulb className="mt-1 shrink-0 text-accent-foreground" /><div className="flex flex-col gap-2"><p className="font-semibold text-primary">{feedback ? 'Boa leitura.' : 'Continue investigando.'}</p><p className="text-sm leading-6 text-muted-foreground">A resposta foi registrada. Consulte o trecho bíblico abaixo para conferir a leitura.</p><p className="font-serif text-sm italic leading-6 text-primary">“{question.quote}” <span className="font-sans not-italic text-muted-foreground">— {question.reference}</span></p></div></div></div>}
    {!answered && <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><Lightbulb className="mt-0.5 shrink-0 text-accent-foreground" /><p className="text-sm leading-6 text-muted-foreground">A dúvida também ensina. Recorra à Dica de Ouro se precisar de uma pista enigmática, mas use 15 segundos do seu tempo.</p></div><button onClick={useGoldenHint} disabled={hintUsed} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-accent bg-background/70 px-4 py-2 text-sm font-semibold text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"><Lightbulb data-icon="inline-start" />{hintUsed ? 'Dica utilizada' : 'Dica de Ouro'}</button></div>}
    {showHint && !answered && <div className="mt-3 rounded-2xl bg-accent/20 p-4"><p className="font-serif text-base italic leading-7 text-primary">{question.tip}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">A dica foi usada · 15 segundos descontados</p></div>}
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-sm text-sm leading-6 text-muted-foreground">Esta é a sua jornada oficial. Novas jornadas de estudo poderão ser adicionadas depois, sem alterar sua pontuação ou posição no ranking.</p><button disabled={!answered} onClick={next} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40">{current === questions.length - 1 ? 'Ver resultado' : 'Próxima pergunta'}<ChevronRight data-icon="inline-end" /></button></div>
  </section>
}
