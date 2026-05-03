// Vercel Serverless Function - 收集用户信息
// 使用 jsonbin.io 免费存储（国内可访问）
// 注册 https://jsonbin.io 获取 API key 即可

const JSONBIN_URL = process.env.JSONBIN_URL || '';
const JSONBIN_KEY = process.env.JSONBIN_KEY || '';

async function getLeads() {
  if (!JSONBIN_URL || !JSONBIN_KEY) return [];
  try {
    const resp = await fetch(`${JSONBIN_URL}/latest`, {
      headers: { 'X-Master-Key': JSONBIN_KEY },
    });
    const data = await resp.json();
    return data.record || [];
  } catch {
    return [];
  }
}

async function saveLeads(leads) {
  if (!JSONBIN_URL || !JSONBIN_KEY) return;
  try {
    await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY,
      },
      body: JSON.stringify(leads),
    });
  } catch (err) {
    console.error('Save failed:', err);
  }
}

// 同时发邮件通知（通过 Resend 免费 API）
const RESEND_KEY = process.env.RESEND_KEY || '';
const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO || '';

async function sendEmailNotification(lead) {
  if (!RESEND_KEY || !LEAD_EMAIL_TO) return;
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
        subject: `[脉轮测试] 新用户: ${lead.name}`,
        text: `新用户完成脉轮测试！\n\n称呼: ${lead.name}\n联系方式: ${lead.contactType === 'wechat' ? '微信' : '邮箱'} - ${lead.contact}\n时间: ${lead.timestamp}`,
      }),
    });
  } catch (err) {
    console.error('Email failed:', err);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, contactType, contact } = req.body || {};

    if (!name || !contactType || !contact) {
      return res.status(400).json({ error: '请填写完整信息' });
    }

    const lead = {
      name,
      contactType,
      contact,
      timestamp: new Date().toISOString(),
    };

    // 保存到 JSONBin
    const leads = await getLeads();
    leads.push(lead);
    await saveLeads(leads);

    // 发邮件通知
    await sendEmailNotification(lead);

    return res.status(200).json({ result: 'ok' });
  }

  if (req.method === 'GET') {
    const leads = await getLeads();
    return res.status(200).json({ total: leads.length, leads });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
