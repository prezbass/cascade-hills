import nodemailer from 'nodemailer'
import { getConfig } from './config.js'
const config=getConfig()
const transporter=nodemailer.createTransport(config.smtp)
const escapeHtml=(value)=>value.replace(/[&<>'"]/g,(character)=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[character])
export async function sendContactEmail({ name,email,notes }) {
  await transporter.sendMail({ from:config.from,to:config.contactTo,replyTo:{name,address:email},subject:`Cascade Hills website inquiry from ${name}`,text:`Name: ${name}\nEmail: ${email}\n\n${notes}`,html:`<h2>New Cascade Hills website inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Contact notes:</strong></p><p>${escapeHtml(notes).replace(/\n/g,'<br>')}</p>` })
}
