export interface ChakraInfo {
  id: number;
  nameZh: string;
  nameEn: string;
  sanskrit: string;
  color: string;
  location: string;
  description: string;
  // 三种状态的详细描述
  statusOpen: string;
  statusUnder: string;
  statusOver: string;
  // 冥想信息
  demon: string;      // 阻塞情绪
  right: string;      // 对应权利
  sound: string;      // 冥想声音
  meditation: string; // 冥想方法
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
    statusOpen: "你感到踏实、稳定和安全，不会不必要地不信任他人。你感到活在当下，与身体连接，有足够的安全感。",
    statusUnder: "你容易感到恐惧或紧张，觉得自己不受欢迎。建议练习接地冥想（关注脊椎底部），吟诵声音 LAM，通过面对恐惧来开启此脉轮。",
    statusOver: "你可能过于物质和贪婪，可能沉迷于安全感而抗拒改变。建议先不要直接减少海底轮的能量，而是检查是否有其他脉轮不活跃导致它过度补偿。练习内观冥想（Vipassana）来平衡。",
    demon: "恐惧",
    right: "存在的权利",
    sound: "LAM",
    meditation: "关注生殖器和肛门之间的位置。手印：拇指和食指指尖相触。",
  },
  {
    id: 2,
    nameZh: "本我轮",
    nameEn: "Sacral Chakra",
    sanskrit: "Svadhisthana",
    color: "var(--chakra-sacral)",
    location: "下腹部",
    description: "主管情感、创造力、感官享受。",
    statusOpen: "你的情感自由流动并自然表达，不会过度情绪化。你对亲密关系开放，可以充满热情和活力。",
    statusUnder: "你倾向于僵硬和缺乏情感，或者面无表情。你不很愿意对人敞开心扉。建议练习感受冥想（关注骶骨），吟诵声音 VAM，通过面对内疚感来开启此脉轮。",
    statusOver: "你可能时刻处于情绪化状态，对他人情感依赖过强，可能过度沉迷于性。建议练习觉察冥想，关注内在感受而非外在刺激，以平衡此脉轮。",
    demon: "内疚",
    right: "感受的权利",
    sound: "VAM",
    meditation: "关注骶骨（下背部）。手印：双手放于腿上，掌心朝上，左手在下，拇指指尖相触。",
  },
  {
    id: 3,
    nameZh: "太阳神经丛",
    nameEn: "Solar Plexus Chakra",
    sanskrit: "Manipura",
    color: "var(--chakra-solar)",
    location: "胃部上方",
    description: "主管自信、意志力和行动力。",
    statusOpen: "你感到有掌控力，拥有足够的自尊和自信。",
    statusUnder: "你倾向于被动和犹豫不决，可能胆怯，不容易得到自己想要的东西。建议练习力量冥想（关注脊柱肚脐稍上方），吟诵声音 RAM，通过面对羞耻感来建立自信。",
    statusOver: "你可能专横甚至具有攻击性。建议练习慈悲冥想，学会倾听他人，以平衡权力和温柔。",
    demon: "羞耻",
    right: "行动的权利",
    sound: "RAM",
    meditation: "关注脊柱肚脐稍上方的位置。手印：双手置于胃前，手指顶部相接指向外方，交叉拇指。",
  },
  {
    id: 4,
    nameZh: "心轮",
    nameEn: "Heart Chakra",
    sanskrit: "Anahata",
    color: "var(--chakra-heart)",
    location: "胸口中央",
    description: "主管爱、同理心和人际关系。",
    statusOpen: "你富有同情心和友善，努力维护和谐的关系。",
    statusUnder: "你冷漠而疏离，不容易与人建立亲密关系。建议练习慈悲冥想（关注脊柱与心脏齐平处），吟诵声音 YAM，通过面对悲伤来开启心轮。",
    statusOver: "你可能用爱令人窒息，而你的爱可能带有自私的动机。建议学习给予空间和自由，无条件地爱。",
    demon: "悲伤",
    right: "爱与被爱的权利",
    sound: "YAM",
    meditation: "关注脊柱与心脏齐平处。手印：左手放于左膝，右手置于胸骨下方，食指和拇指指尖相触。",
  },
  {
    id: 5,
    nameZh: "喉轮",
    nameEn: "Throat Chakra",
    sanskrit: "Vishuddha",
    color: "var(--chakra-throat)",
    location: "喉咙",
    description: "主管沟通、表达和真实声音。",
    statusOpen: "你能够自如地表达自己，可能以艺术家的方式表达。",
    statusUnder: "你倾向于不多说话，可能内向害羞。不说真话可能会阻塞此脉轮。建议练习真实表达冥想（关注喉咙底部），吟诵声音 HAM，勇敢说出真话。",
    statusOver: "你可能说话过多，通常为了控制局面和与人保持距离。你可能是个糟糕的倾听者。建议练习静默冥想和深度倾听，学会在表达和倾听之间取得平衡。",
    demon: "谎言",
    right: "说真话和听真话的权利",
    sound: "HAM",
    meditation: "关注喉咙底部。手印：双手手指交叉于内侧，拇指在顶部相触并稍微向上拉。",
  },
  {
    id: 6,
    nameZh: "眉心轮",
    nameEn: "Third Eye Chakra",
    sanskrit: "Ajna",
    color: "var(--chakra-third-eye)",
    location: "两眉之间",
    description: "主管直觉、洞察力和内在智慧。",
    statusOpen: "你拥有良好的直觉，可能倾向于想象和幻想。",
    statusUnder: "你不太善于独立思考，可能倾向于依赖权威。你可能思维僵化，过于依赖信念，甚至容易困惑。建议练习直觉冥想（关注两眉之间稍上方），吟诵声音 OM，通过面对幻觉来开启。",
    statusOver: "你可能过多地生活在幻想世界中，在极端情况下可能出现幻觉。建议练习内观禅修（Zen），关注当下现实，脚踏实地。",
    demon: "幻觉",
    right: "看见的权利",
    sound: "OM",
    meditation: "关注两眉之间稍上方的位置。手印：双手置于胸前，中指伸直在顶部相触，其他手指弯曲。",
  },
  {
    id: 7,
    nameZh: "顶轮",
    nameEn: "Crown Chakra",
    sanskrit: "Sahasrara",
    color: "var(--chakra-crown)",
    location: "头顶",
    description: "主管灵性连接、觉知和宇宙意识。",
    statusOpen: "你没有偏见，对世界和自己有深刻的觉知。",
    statusUnder: "你对灵性不太觉察，可能思维相当僵化。建议练习开放冥想（关注头顶），吟诵声音 NG，通过放下执念来开启顶轮。",
    statusOver: "你可能过度理性化事物，可能沉迷于灵性而忽视身体需求。建议先确保海底轮（根轮）足够强大，再进行顶轮冥想。平衡灵性与日常生活。",
    demon: "执念",
    right: "认知的权利",
    sound: "NG",
    meditation: "关注头顶。手印：双手置于胃前，无名指向上在顶部相触，交叉其他手指。注意：除非海底轮足够强大，否则不要进行此冥想。",
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

// 5 级评分（匹配原站：-2, -1, 0, 1, 2）
export const SCORE_OPTIONS = [-2, -1, 0, 1, 2];
export const SCORE_LABELS = ["完全没有", "偏弱", "一般", "偏强", "感觉强烈"];
export const MAX_SCORE = 2;
export const QUESTIONS_PER_CHAKRA = 8;

// 计算某脉轮的得分（含反向题反转）
// 原站：正向题直接取值，反向题取反
// 每个脉轮分数范围：-16 到 +16
export function calcChakraScore(chakraId: number, answers: Record<number, number>): number {
  const qs = QUESTIONS.filter(q => q.chakraId === chakraId);
  let total = 0;
  for (const q of qs) {
    const raw = answers[q.id];
    if (raw === undefined || raw === null) continue;
    total += q.reverse ? -raw : raw;
  }
  return total;
}

// 获取脉轮状态
// 分数范围 -16 到 +16
// 不活跃：< -4 (约 < 25%)
// 过度活跃：> 8 (约 > 50%)
// 适度活跃：中间
export function getChakraStatus(score: number, answered: number): { label: string; level: "low" | "mid" | "high" } {
  if (answered < QUESTIONS_PER_CHAKRA) return { label: "未完成", level: "mid" };
  if (score < -4) return { label: "不活跃", level: "low" };
  if (score > 8) return { label: "过度活跃", level: "high" };
  return { label: "适度活跃", level: "mid" };
}
