export interface ChakraInfo {
  id: number;
  nameZh: string;
  nameEn: string;
  sanskrit: string;
  color: string;
  location: string;
  description: string;
  advice: string; // 针对此脉轮的建议
}

export interface Question {
  id: number;
  chakraId: number;
  text: string;
  reverse: boolean; // 反向题：高分=脉轮越不活跃
}

export const CHAKRAS: ChakraInfo[] = [
  {
    id: 1,
    nameZh: "海底轮",
    nameEn: "Root Chakra",
    sanskrit: "Muladhara",
    color: "var(--chakra-root)",
    location: "脊椎底部",
    description: "主管生存、安全感和稳定感。",
    advice: "建议通过接地练习（如赤脚走路、园艺）和安全感冥想来开启海底轮。",
  },
  {
    id: 2,
    nameZh: "本我轮",
    nameEn: "Sacral Chakra",
    sanskrit: "Svadhisthana",
    color: "var(--chakra-sacral)",
    location: "下腹部",
    description: "主管情感、创造力、感官享受。",
    advice: "建议通过创意活动（绘画、舞蹈）和情绪释放练习来平衡本我轮。",
  },
  {
    id: 3,
    nameZh: "太阳神经丛",
    nameEn: "Solar Plexus Chakra",
    sanskrit: "Manipura",
    color: "var(--chakra-solar)",
    location: "胃部上方",
    description: "主管自信、意志力和行动力。",
    advice: "建议通过力量体式瑜伽和自信表达练习来激活太阳神经丛。",
  },
  {
    id: 4,
    nameZh: "心轮",
    nameEn: "Heart Chakra",
    sanskrit: "Anahata",
    color: "var(--chakra-heart)",
    location: "胸口中央",
    description: "主管爱、同理心和人际关系。",
    advice: "建议通过慈悲冥想和感恩练习来开启心轮。",
  },
  {
    id: 5,
    nameZh: "喉轮",
    nameEn: "Throat Chakra",
    sanskrit: "Vishuddha",
    color: "var(--chakra-throat)",
    location: "喉咙",
    description: "主管沟通、表达和真实声音。",
    advice: "建议通过唱歌、朗诵和诚实表达来平衡喉轮。",
  },
  {
    id: 6,
    nameZh: "眉心轮",
    nameEn: "Third Eye Chakra",
    sanskrit: "Ajna",
    color: "var(--chakra-third-eye)",
    location: "两眉之间",
    description: "主管直觉、洞察力和内在智慧。",
    advice: "建议通过冥想、视觉化练习和梦境记录来开启眉心轮。",
  },
  {
    id: 7,
    nameZh: "顶轮",
    nameEn: "Crown Chakra",
    sanskrit: "Sahasrara",
    color: "var(--chakra-crown)",
    location: "头顶",
    description: "主管灵性连接、觉知和宇宙意识。",
    advice: "建议通过静坐冥想和与大自然连接来开启顶轮。",
  },
];

// 56 道题：7 个脉轮 × 8 题，含反向标记
export const QUESTIONS: Question[] = [
  // 脉轮 1 - 海底轮 (Q1-Q8)
  { id: 1,  chakraId: 1, text: "你容易毫无保留地表达自己的情感？", reverse: false },
  { id: 2,  chakraId: 1, text: "你对于自己的本能冲动感到羞耻？", reverse: true },
  { id: 3,  chakraId: 1, text: "你是个非常情绪化和热情的人？", reverse: false },
  { id: 4,  chakraId: 1, text: "处于团体中，你感觉可以掌控事情的发展？", reverse: false },
  { id: 5,  chakraId: 1, text: "你喜好谈论？", reverse: false },
  { id: 6,  chakraId: 1, text: "你是否很依赖于某些人或事？", reverse: true },
  { id: 7,  chakraId: 1, text: "你很依赖直觉？", reverse: false },
  { id: 8,  chakraId: 1, text: "你觉得不论在哪里，都感到很自在？", reverse: false },

  // 脉轮 2 - 本我轮 (Q9-Q16)
  { id: 9,  chakraId: 2, text: "你很有自信？", reverse: false },
  { id: 10, chakraId: 2, text: "你容易紧张或倾向避免让你紧张的情况？", reverse: true },
  { id: 11, chakraId: 2, text: "你能自由地表达对性方面的感觉？", reverse: false },
  { id: 12, chakraId: 2, text: "你能觉察你的喜好、厌恶和需求？", reverse: false },
  { id: 13, chakraId: 2, text: "你很难表达自己的感觉，并且很少说话？", reverse: true },
  { id: 14, chakraId: 2, text: "你通常依赖他人的洞察力？", reverse: true },
  { id: 15, chakraId: 2, text: "你担心自己的财务状况和家宅的安全？", reverse: true },
  { id: 16, chakraId: 2, text: "你是否通常觉得活在当下，生活十分踏实？", reverse: false },

  // 脉轮 3 - 太阳神经丛 (Q17-Q24)
  { id: 17, chakraId: 3, text: "你能在必要时积极主动？", reverse: false },
  { id: 18, chakraId: 3, text: "你和人们情感联系的需求很强烈？", reverse: false },
  { id: 19, chakraId: 3, text: "你对所有发生在你身上的事情接受性很高？", reverse: false },
  { id: 20, chakraId: 3, text: "你是否倾向于被动，感到寂寞，或与他人刻意保持距离？", reverse: true },
  { id: 21, chakraId: 3, text: "你很有创造性？", reverse: false },
  { id: 22, chakraId: 3, text: "你努力追求人与人关系的和谐？", reverse: false },
  { id: 23, chakraId: 3, text: "你觉得所谓巧合通常是有意义，而非全是随机发生？", reverse: false },
  { id: 24, chakraId: 3, text: "你很容易回想你的梦境？", reverse: false },

  // 脉轮 4 - 心轮 (Q25-Q32)
  { id: 25, chakraId: 4, text: "你对于未来有愿景或期待？", reverse: false },
  { id: 26, chakraId: 4, text: "你有自律的习惯？", reverse: false },
  { id: 27, chakraId: 4, text: "你对于表达示好的对象很小心，以免受到伤害？", reverse: true },
  { id: 28, chakraId: 4, text: "你倾向把发生在自己身上的事当作学习的过程？", reverse: false },
  { id: 29, chakraId: 4, text: "你对团队合作感到很轻松？", reverse: false },
  { id: 30, chakraId: 4, text: "你容易对于你所想要的事物采取行动？", reverse: false },
  { id: 31, chakraId: 4, text: "你感觉自己是背后一股更大力量的展现？", reverse: false },
  { id: 32, chakraId: 4, text: "你具有热情和同理心，可以容易延伸至自我和他人？", reverse: false },

  // 脉轮 5 - 喉轮 (Q33-Q40)
  { id: 33, chakraId: 5, text: "你总是对他人付出太多以至于忘记了自己？", reverse: true },
  { id: 34, chakraId: 5, text: "你是一个天生就很友善的人？", reverse: false },
  { id: 35, chakraId: 5, text: "你感觉到完整的自觉意识？", reverse: false },
  { id: 36, chakraId: 5, text: "是否经常有一些情况你极力想避免？", reverse: true },
  { id: 37, chakraId: 5, text: "你总是有掌控局势的强烈欲望？", reverse: true },
  { id: 38, chakraId: 5, text: "你对于亲密关系和肉体欲望，都感觉很自然？", reverse: false },
  { id: 39, chakraId: 5, text: "你透过某种形式或创作（音乐、绘画、唱歌等）表达自己？", reverse: false },
  { id: 40, chakraId: 5, text: "你有困难将事情视觉化？", reverse: true },

  // 脉轮 6 - 眉心轮 (Q41-Q48)
  { id: 41, chakraId: 6, text: "你信赖大多数的人？", reverse: false },
  { id: 42, chakraId: 6, text: "你通常觉得你的精神常驻于肉体？", reverse: false },
  { id: 43, chakraId: 6, text: "你倾向于隐藏情绪，不显露表情？", reverse: true },
  { id: 44, chakraId: 6, text: "你常常有好的、创新的点子？", reverse: false },
  { id: 45, chakraId: 6, text: "你善于用语言、符号和概念进行思考？", reverse: false },
  { id: 46, chakraId: 6, text: "你善于写作以进行沟通？", reverse: false },
  { id: 47, chakraId: 6, text: "你喜爱无拘无束的幻想？", reverse: false },
  { id: 48, chakraId: 6, text: "你在社交上有被动和犹豫不决的倾向？", reverse: true },

  // 脉轮 7 - 顶轮 (Q49-Q56)
  { id: 49, chakraId: 7, text: "如果你和他人有冲突，你会考虑到他人的感受？", reverse: false },
  { id: 50, chakraId: 7, text: "你善于沟通，能倾听也能善于表达？", reverse: false },
  { id: 51, chakraId: 7, text: "你总是很有安全感？", reverse: false },
  { id: 52, chakraId: 7, text: "你对事物有洞见？", reverse: false },
  { id: 53, chakraId: 7, text: "你觉得和身边所有围绕你的事物或宇宙间有某种联系？", reverse: false },
  { id: 54, chakraId: 7, text: "你行事比较倾向于事前规划而非随遇而安？", reverse: false },
  { id: 55, chakraId: 7, text: "你说话时的声音响亮清楚？", reverse: false },
  { id: 56, chakraId: 7, text: "你喜爱大多数的人？", reverse: false },
];

// 5 级评分（匹配原站）
export const SCORE_OPTIONS = [1, 2, 3, 4, 5];
export const SCORE_LABEL_LEFT = "完全没有";
export const SCORE_LABEL_RIGHT = "感觉强烈";
export const MAX_SCORE = 5;
export const QUESTIONS_PER_CHAKRA = 8;

// 计算某脉轮的得分（含反向题反转）
export function calcChakraScore(chakraId: number, answers: Record<number, number>): number {
  const qs = QUESTIONS.filter(q => q.chakraId === chakraId);
  let total = 0;
  for (const q of qs) {
    const raw = answers[q.id] ?? 0;
    if (raw === 0) continue; // 未作答
    total += q.reverse ? (MAX_SCORE + 1 - raw) : raw;
  }
  return total;
}

// 获取脉轮状态
export function getChakraStatus(score: number, answered: number): { label: string; level: "low" | "mid" | "high" } {
  if (answered < QUESTIONS_PER_CHAKRA) return { label: "未完成", level: "mid" };
  const maxPossible = QUESTIONS_PER_CHAKRA * MAX_SCORE; // 40
  const pct = score / maxPossible;
  if (pct < 0.4) return { label: "不活跃", level: "low" };
  if (pct > 0.7) return { label: "过度活跃", level: "high" };
  return { label: "适度活跃", level: "mid" };
}
