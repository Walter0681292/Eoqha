import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function getTopRanking() {
  const result = await pool.query<{ id: number; participant_name: string; score: number }>(
    'SELECT id, participant_name, score FROM official_ranking ORDER BY score DESC, created_at ASC LIMIT 3',
  )
  return result.rows
}

export async function saveRankingEntry(participantName: string, score: number) {
  await pool.query('INSERT INTO official_ranking (participant_name, score) VALUES ($1, $2)', [participantName, score])
}
