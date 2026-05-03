// Vercel Serverless Function - 收集用户信息并发邮件通知
// 使用 Resend 免费邮件 API（每天 100 封免费）

const RESEND_KEY = process.env.RESEND_KEY || '';
const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO || '';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contactType, contact } = req.body || {};

  if (!name || !contactType || !contact) {
    return res.status(400).json({ error: '请填写完整信息' });
  }

  const timestamp = new Date().toISOString();
  const label = contactType === 'wechat' ? '微信' : '邮箱';

  // 发邮件通知
  if (RESEND_KEY && LEAD_EMAIL_TO) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from: 'Chakra Test <onboarding@resend.dev>',
          to: LEAD_EMAIL_TO,
          subject: `[脉轮测试] 新用户: ${name}`,
          text: `新用户完成脉轮测试！\n\n称呼: ${name}\n联系方式: ${label} - ${contact}\n时间: ${timestamp}`,
        }),
      });
    } catch (err) {
      console.error('Email failed:', err);
    }
  } else {
    console.log(`[Lead] ${name} | ${label}: ${contact} (邮件未配置)`);
  }

  return res.status(200).json({ result: 'ok' });
}
