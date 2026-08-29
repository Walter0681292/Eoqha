import { NextResponse } from 'next/server'
import { getTopRanking, participantExists, saveRankingEntry } from '@/lib/ranking'

export async function GET(request: Request) {
  const name = new URL(request.url).searchParams.get('participantName')?.trim()
  if (name) return NextResponse.json({ exists: await participantExists(name) })
  return NextResponse.json(await getTopRanking())
}

export async function POST(request: Request) {
  const body = await request.json()
  const participantName = typeof body.participantName === 'string' ? body.participantName.trim().slice(0, 80) : ''
  const score = Number(body.score)
  if (!participantName || !Number.isInteger(score) || score < 0 || score > 200) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }
  try {
    await saveRankingEntry(participantName, score)
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') return NextResponse.json({ error: 'Este nome já possui uma tentativa oficial.' }, { status: 409 })
    return NextResponse.json({ error: 'Não foi possível registrar a pontuação.' }, { status: 500 })
  }
}
