import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FadeIn, Stagger } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CHAKRAS, QUESTIONS, calcChakraScore, getChakraStatus, MAX_SCORE, QUESTIONS_PER_CHAKRA } from "@/types/chakra";

const MAX_PER_CHAKRA = QUESTIONS_PER_CHAKRA * MAX_SCORE; // 40

interface ChakraResult {
  chakra: (typeof CHAKRAS)[number];
  score: number;
  percentage: number;
  status: { label: string; level: "low" | "mid" | "high" };
}

export default function Result() {
  const navigate = useNavigate();

  const results: ChakraResult[] = useMemo(() => {
    const raw = sessionStorage.getItem("chakra_answers");
    if (!raw) return [];
    const answers: Record<number, number> = JSON.parse(raw);

    return CHAKRAS.map((chakra) => {
      const qs = QUESTIONS.filter((q) => q.chakraId === chakra.id);
      const answered = qs.filter((q) => answers[q.id] != null && answers[q.id] > 0).length;
      const score = calcChakraScore(chakra.id, answers);
      const percentage = answered > 0 ? Math.round((score / MAX_PER_CHAKRA) * 100) : 0;
      const status = getChakraStatus(score, answered);
      return { chakra, score, percentage, status };
    });
  }, []);

  if (results.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
            未找到测验结果，请先完成测验。
          </p>
          <Button onClick={() => navigate("/quiz")} className="cursor-pointer">
            前往测验
          </Button>
        </div>
      </main>
    );
  }

  const statusColor: Record<string, string> = {
    low: "var(--info)",
    mid: "var(--success)",
    high: "var(--warning)",
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 顶部固定栏 */}
      <nav className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md px-3 py-2.5">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="h-6 w-auto rounded" />
          <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
            测试结果
          </span>
        </div>
      </nav>

      <div className="px-3 pt-4 pb-36">
        <FadeIn>
          <h1 className="text-center text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            你的脉轮能量分析
          </h1>
        </FadeIn>

        {/* 图例 */}
        <FadeIn delay={0.1}>
          <div className="mt-4 flex items-center justify-center gap-3 text-xs">
            <span style={{ color: "var(--info)" }}>● 不活跃</span>
            <span style={{ color: "var(--success)" }}>● 适度活跃</span>
            <span style={{ color: "var(--warning)" }}>● 过度活跃</span>
          </div>
        </FadeIn>

        {/* 七个脉轮结果 */}
        <Stagger className="mt-6 space-y-3">
          {results.map((r) => (
            <Card key={r.chakra.id} className="overflow-hidden border-border">
              <CardContent className="p-3">
                {/* 标题行 */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full" style={{ backgroundColor: r.chakra.color }} />
                    <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {r.chakra.nameZh}
                    </span>
                    <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                      {r.chakra.sanskrit}
                    </span>
                  </div>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${statusColor[r.status.level]} 15%, transparent)`,
                      color: statusColor[r.status.level],
                    }}
                  >
                    {r.status.label}
                  </span>
                </div>

                {/* 能量条 */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-[oklch(0.92_0_0)] dark:bg-[oklch(0.22_0_0)]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${r.percentage}%`,
                      backgroundColor: r.chakra.color,
                      opacity: 0.85,
                    }}
                  />
                </div>

                {/* 分数与说明 */}
                <div className="mt-1.5 flex items-end justify-between">
                  <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {r.chakra.description}
                  </p>
                  <span className="text-[10px] tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                    {r.score}/{MAX_PER_CHAKRA}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </Stagger>

        {/* 建议区域 */}
        <FadeIn delay={0.3}>
          <div
            className="mt-8 rounded-xl border p-4"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}
          >
            <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
              改善建议
            </h2>
            <ul className="mt-2 space-y-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
              {results
                .filter((r) => r.status.level === "low")
                .map((r) => (
                  <li key={r.chakra.id}>
                    <span className="font-medium" style={{ color: "var(--info)" }}>
                      {r.chakra.nameZh}
                    </span> 目前不活跃。{r.chakra.advice}
                  </li>
                ))}
              {results
                .filter((r) => r.status.level === "high")
                .map((r) => (
                  <li key={r.chakra.id}>
                    <span className="font-medium" style={{ color: "var(--warning)" }}>
                      {r.chakra.nameZh}
                    </span> 目前过度活跃。建议练习平衡的呼吸法与静坐，让能量回到适度状态。
                  </li>
                ))}
              {results.every((r) => r.status.level === "mid") && (
                <li>恭喜！你的七个脉轮皆处于适度活跃的状态，请持续保持身心平衡。</li>
              )}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* 底部固定栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/90 backdrop-blur-md px-3 py-3">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => {
            sessionStorage.removeItem("chakra_answers");
            navigate("/quiz");
          }}
        >
          重新测试
        </Button>
      </div>
    </main>
  );
}
