import { Link } from "react-router-dom";
import { FadeIn, Stagger } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";

const CHAKRA_ITEMS = [
  { zh: "海底轮", en: "Root", color: "var(--chakra-root)", desc: "生存与安全" },
  { zh: "本我轮", en: "Sacral", color: "var(--chakra-sacral)", desc: "情感与创造" },
  { zh: "太阳神经丛", en: "Solar", color: "var(--chakra-solar)", desc: "自信与意志" },
  { zh: "心轮", en: "Heart", color: "var(--chakra-heart)", desc: "爱与同理" },
  { zh: "喉轮", en: "Throat", color: "var(--chakra-throat)", desc: "沟通与表达" },
  { zh: "眉心轮", en: "Third Eye", color: "var(--chakra-third-eye)", desc: "直觉与洞察" },
  { zh: "顶轮", en: "Crown", color: "var(--chakra-crown)", desc: "灵性与连接" },
];

export default function Index() {
  return (
    <main className="min-h-screen bg-background">
      {/* 顶部导航 - 含 Logo */}
      <nav className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-auto rounded" />
          <span className="text-lg font-semibold" style={{ color: "var(--primary)" }}>
            脉轮测试
          </span>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section
        className="relative overflow-hidden px-4 py-16 text-center"
        style={{ background: "linear-gradient(135deg, var(--background), color-mix(in oklch, var(--primary) 8%, var(--background)))" }}
      >
        {/* 七色装饰 */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1">
          {CHAKRA_ITEMS.map((c, i) => (
            <div key={i} className="size-2 rounded-full opacity-40" style={{ backgroundColor: c.color }} />
          ))}
        </div>

        <FadeIn>
          <h1 className="relative z-10 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
            探索你的脉轮能量
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="relative z-10 mt-3 text-base" style={{ color: "var(--muted-foreground)" }}>
            56 道问题 · 7 个能量中心
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Link to="/quiz" className="relative z-10 mt-6 inline-block">
            <Button size="lg" className="text-base px-8 py-5 rounded-xl text-white" style={{ backgroundColor: "var(--primary)" }}>
              开始测试
            </Button>
          </Link>
        </FadeIn>
      </section>

      {/* 七脉轮介绍 */}
      <section className="px-4 py-12">
        <FadeIn>
          <h2 className="text-center text-xl font-semibold" style={{ color: "var(--foreground)" }}>
            七个脉轮
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            脉轮（Chakra）是人体的七个能量中心
          </p>
        </FadeIn>

        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {CHAKRA_ITEMS.map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border p-3 text-center"
            >
              <div className="size-6 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{c.zh}</span>
              <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{c.en}</span>
            </div>
          ))}
        </Stagger>
      </section>

      {/* 测试说明 */}
      <section className="px-4 py-12" style={{ backgroundColor: "var(--muted)" }}>
        <div className="mx-auto max-w-sm">
          <Stagger className="grid grid-cols-1 gap-4">
            {[
              { icon: "📋", title: "56 道问题", desc: "每题以不同程度作答" },
              { icon: "📊", title: "能量分析", desc: "七个脉轮的活跃状态" },
              { icon: "💡", title: "改善建议", desc: "针对不活跃脉轮的提示" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 页脚 - 含联系方式二维码 + 网站二维码 */}
      <footer className="border-t border-border px-4 py-6">
        <div className="flex flex-col items-center gap-4">
          {/* 网站二维码 - 扫码打开测试 */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <img src="/qrcode-generated.png" alt="扫码开始测试" className="h-24 w-24 rounded-lg" />
              <span className="text-[10px]" style={{ color: "var(--primary)" }}>扫码开始测试</span>
            </div>
            {/* 联系方式二维码 */}
            <div className="flex flex-col items-center gap-1">
              <img src="/qrcode.jpg" alt="联系我" className="h-24 w-24 rounded-lg" />
              <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>联系我</span>
            </div>
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            脉轮测试 · 参考 Eclectic Energies
          </p>
        </div>
      </footer>
    </main>
  );
}
