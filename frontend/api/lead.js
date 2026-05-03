// Vercel Serverless Function - 收集用户信息并发邮件通知
// 使用 Resend 邮件 API

const RESEND_KEY = process.env.RESEND_KEY || 're_Lne7JFxb_MwJFEMiVAreVX7jQHXvc6uzZ';
const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO || 'soulmate32122@gmail.com';

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

  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  const label = contactType === 'wechat' ? '微信' : '邮箱';

  console.log(`[Lead] ${name} | ${label}: ${contact}`);

  // 发邮件通知
  try {
    const emailResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: 'Chakra Test <onboarding@resend.dev>',
        to: LEAD_EMAIL_TO,
        subject: `[脉轮测试] ${name} | ${label}: ${contact}`,
        html: `
          <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
            <h2 style="color: #4a1d96;">新用户完成脉轮测试</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">称呼</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">联系方式</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${label}: ${contact}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: #f5f5f5;">时间</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${timestamp}</td>
              </tr>
            </table>
          </div>
        `,
      }),
    });
    const emailResult = await emailResp.json();
    console.log('[Lead] Email result:', JSON.stringify(emailResult));
  } catch (err) {
    console.error('[Lead] Email failed:', err);
  }

  return res.status(200).json({ result: 'ok', name, contactType, contact });
}
