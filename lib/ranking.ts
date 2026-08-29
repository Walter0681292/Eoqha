import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function getTopRanking() {
  const result = await pool.query<{ id: number; participant_name: string; score: number }>('SELECT id, participant_name, score FROM official_ranking ORDER BY score DESC, created_at ASC LIMIT 3')
  return result.rows
}

export async function participantExists(participantName: string) {
  const result = await pool.query('SELECT 1 FROM official_ranking WHERE lower(participant_name) = lower($1) LIMIT 1', [participantName])
  return result.rowCount > 0
}

export async function saveRankingEntry(participantName: string, score: number) {
  await pool.query('INSERT INTO official_ranking (participant_name, score) VALUES ($1, $2)', [participantName, score])
}
