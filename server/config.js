const required = ['DB_HOST','DB_PORT','DB_NAME','DB_USER','DB_PASSWORD','SMTP_HOST','SMTP_PORT','SMTP_USERNAME','SMTP_PASSWORD','FROM_EMAIL_ADDRESS','FROM_EMAIL_NAME','CONTACT_TO_EMAIL','TURNSTILE_SECRET_KEY']
export function getConfig() {
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  return {
    port:Number(process.env.PORT || 3001),
    database:{ host:process.env.DB_HOST, port:Number(process.env.DB_PORT), database:process.env.DB_NAME, user:process.env.DB_USER, password:process.env.DB_PASSWORD, connectionLimit:Number(process.env.DB_CONNECTION_LIMIT || 5) },
    smtp:{ host:process.env.SMTP_HOST, port:Number(process.env.SMTP_PORT), secure:String(process.env.SMTP_USESSL).toLowerCase()==='true', auth:{ user:process.env.SMTP_USERNAME, pass:process.env.SMTP_PASSWORD } },
    from:{ address:process.env.FROM_EMAIL_ADDRESS, name:process.env.FROM_EMAIL_NAME }, contactTo:process.env.CONTACT_TO_EMAIL,
    turnstileSecretKey:process.env.TURNSTILE_SECRET_KEY,
  }
}
