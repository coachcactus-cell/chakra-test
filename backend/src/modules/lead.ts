import { Router, Request, Response } from 'express'
import nodemailer from 'nodemailer'

export const leadRouter: Router = Router()

interface LeadData {
  name: string
  contactType: 'wechat' | 'email'
  contact: string
  timestamp: string
}

// 内存存储（简易版，重启后清空；可升级为数据库）
const leads: LeadData[] = []

leadRouter.post('/submit', async (req: Request, res: Response) => {
  const { name, contactType, contact } = req.body as Partial<LeadData>

  if (!name || !contactType || !contact) {
    return res.status(400).json({ error: '请填写完整信息' })
  }

  const lead: LeadData = {
    name,
    contactType,
    contact,
    timestamp: new Date().toISOString(),
  }

  // 保存到内存
  leads.push(lead)
  console.log(`[Lead] ${name} | ${contactType}: ${contact}`)

  // 尝试发送邮件通知（如果配置了 SMTP）
  if (process.env.SMTP_HOST && process.env.LEAD_EMAIL_TO) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.LEAD_EMAIL_TO,
        subject: `[脉轮测试] 新用户: ${name}`,
        text: `新用户完成脉轮测试！\n\n称呼: ${name}\n联系方式: ${contactType === 'wechat' ? '微信' : '邮箱'} - ${contact}\n时间: ${lead.timestamp}`,
      })
      console.log(`[Lead] 邮件通知已发送`)
    } catch (err) {
      console.error('[Lead] 邮件发送失败:', err)
      // 不影响用户提交
    }
  }

  return res.json({ result: 'ok' })
})

// 获取所有收集的数据（简易管理接口）
leadRouter.get('/list', (_req: Request, res: Response) => {
  res.json({ total: leads.length, leads })
})
