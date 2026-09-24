import express from 'express'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { getConfig } from './config.js'
import { checkDatabase,markEmailSent,saveContact } from './db.js'
import { sendContactEmail } from './mailer.js'
const config=getConfig()
const app=express()
app.set('trust proxy',1); app.disable('x-powered-by'); app.use(helmet()); app.use(express.json({limit:'32kb'}))
const contactLimiter=rateLimit({windowMs:15*60*1000,limit:8,standardHeaders:'draft-8',legacyHeaders:false})
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
async function verifyTurnstile(token,remoteip) {
  if(!token) return false
  const body=new URLSearchParams({secret:config.turnstileSecretKey,response:token})
  if(remoteip) body.set('remoteip',remoteip)
  try {
    const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body,signal:AbortSignal.timeout(8000)})
    if(!verification.ok) return false
    const result=await verification.json()
    return result.success===true
  } catch(error) {
    console.error('Turnstile verification failed:',error.message)
    return false
  }
}
app.get('/api/health',async(_request,response)=>{ try { await checkDatabase(); response.json({status:'ok'}) } catch { response.status(503).json({status:'unavailable'}) } })
app.post('/api/contact',contactLimiter,async(request,response)=>{
  const name=String(request.body.name||'').trim(),email=String(request.body.email||'').trim().toLowerCase(),notes=String(request.body.notes||'').trim(),turnstileToken=String(request.body.turnstileToken||'')
  if(!name||name.length>120||!emailPattern.test(email)||email.length>254||!notes||notes.length>4000) return response.status(400).json({message:'Please complete all fields with valid information.'})
  if(!(await verifyTurnstile(turnstileToken,request.ip?.slice(0,45)))) return response.status(400).json({message:'The security check failed or expired. Please try again.'})
  try {
    const id=await saveContact({name,email,notes,ipAddress:request.ip?.slice(0,45),userAgent:request.get('user-agent')?.slice(0,500)})
    try { await sendContactEmail({name,email,notes}); await markEmailSent(id) } catch(error) { console.error(`Contact ${id} was saved, but email delivery failed:`,error.message) }
    return response.status(201).json({message:'Your message was received.'})
  } catch(error) { console.error('Contact submission failed:',error.message); return response.status(500).json({message:'We could not save your message. Please try again.'}) }
})
app.use('/api',(_request,response)=>response.status(404).json({message:'Not found.'}))
app.listen(config.port,'127.0.0.1',()=>console.log(`Cascade Hills API listening on 127.0.0.1:${config.port}`))
