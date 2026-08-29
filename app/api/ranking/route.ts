import { NextResponse } from 'next/server'
import { getTopRanking, saveRankingEntry } from '@/lib/ranking'

export async function GET() {
  return NextResponse.json(await getTopRanking())
}

export async function POST(request: Request) {
  const body = await request.json()
  const participantName = typeof body.participantName === 'string' ? body.participantName.trim().slice(0, 80) : ''
  const score = Number(body.score)
  if (!participantName || !Number.isInteger(score) || score < 0 || score > 10) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }
  await saveRankingEntry(participantName, score)
  return NextResponse.json({ ok: true })
}
