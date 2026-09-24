import mariadb from 'mariadb'
import { getConfig } from './config.js'
const pool = mariadb.createPool(getConfig().database)
export async function saveContact({ name,email,notes,ipAddress,userAgent }) {
  const result = await pool.query(`INSERT INTO contact_submissions (name,email,contact_notes,submitted_at,ip_address,user_agent) VALUES (?,?,?,UTC_TIMESTAMP(),?,?)`,[name,email,notes,ipAddress,userAgent])
  return Number(result.insertId)
}
export async function markEmailSent(id) { await pool.query('UPDATE contact_submissions SET email_sent_at=UTC_TIMESTAMP() WHERE id=?',[id]) }
export async function checkDatabase() { await pool.query('SELECT 1') }
