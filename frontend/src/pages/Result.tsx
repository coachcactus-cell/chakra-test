import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FadeIn, Stagger } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CHAKRAS, QUESTIONS, calcChakraScore, getChakraStatus, MAX_SCORE, QUESTIONS_PER_CHAKRA } from "@/types/chakra";

// 分数范围 -16 到 +16，映射到 0-100%
const MIN_SCORE = QUESTIONS_PER_CHAKRA * (-MAX_SCORE); // -16
const MAX_SCORE_TOTAL = QUESTIONS_PER_CHAKRA * MAX_SCORE; // +16

interface ChakraResult {
  chakra: (typeof CHAKRAS)[number];
  score: number;
  percentage: number;
  status: { label: string; level: "low" | "mid" | "high" };
}

export default function Result() {
  const navigate = useNavigate();

  const userName = useMemo(() => {
    const raw = sessionStorage.getItem("chakra_user_info");
    if (!raw) return "";
    const info = JSON.parse(raw);
    return info.name || "";
  }, []);

  const testDate = useMemo(() => {
    return new Date().toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const results: ChakraResult[] = useMemo(() => {
    const raw = sessionStorage.getItem("chakra_answers");
    if (!raw) return [];
    const answers: Record<number, number> = JSON.parse(raw);

    return CHAKRAS.map((chakra) => {
      const qs = QUESTIONS.filter((q) => q.chakraId === chakra.id);
      const answered = qs.filter((q) => answers[q.id] !== undefined && answers[q.id] !== null).length;
      const score = calcChakraScore(chakra.id, answers);
      // 将 -16~+16 映射到 0~100%
      const percentage = answered > 0 ? Math.round(((score - MIN_SCORE) / (MAX_SCORE_TOTAL - MIN_SCORE)) * 100) : 0;
      const status = getChakraStatus(score, answered);
      return { chakra, score, percentage, status };
    });
  }, []);

  // 生成纯文本结果（用于分享/复制）
  const resultText = useMemo(() => {
    const lines = [
      `🔮 脉轮能量测试结果`,
      `📅 ${testDate}`,
      userName ? `👤 ${userName}` : "",
      "",
      ...results.map((r) =>
        `${r.chakra.nameZh}（${r.chakra.sanskrit}）: ${r.status.label} ${r.percentage}% (得分: ${r.score})`
      ),
      "",
      "📊 详细分析：",
      ...results
        .filter((r) => r.status.level === "low" || r.status.level === "high")
        .map((r) => {
          if (r.status.level === "low") return `⚠️ ${r.chakra.nameZh} 不活跃 — ${r.chakra.advice}`;
          return `⚠️ ${r.chakra.nameZh} 过度活跃 — 建议练习呼吸法与静坐`;
        }),
      "",
      `🔗 再测一次: https://chakra-test-seven.vercel.app/`,
    ];
    return lines.filter(Boolean).join("\n");
  }, [results, testDate, userName]);

  // 复制结果到剪贴板
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      alert("结果已复制到剪贴板！");
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = resultText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("结果已复制到剪贴板！");
    }
  }, [resultText]);

  // 生成 PNG Blob（保存和分享共用）
  const generateImageBlob = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const width = 600;
      const rowHeight = 52;
      const headerHeight = 90;
      const footerHeight = 50;
      const height = headerHeight + results.length * rowHeight + footerHeight;

      const canvas = document.createElement("canvas");
      canvas.width = width * 2; // 2x for retina
      canvas.height = height * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(null); return; }

      ctx.scale(2, 2);

      // 背景
      ctx.fillStyle = "#faf9fc";
      ctx.fillRect(0, 0, width, height);

      // 标题
      ctx.fillStyle = "#2d1b69";
      ctx.font = "bold 22px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("脉轮能量测试结果", width / 2, 35);

      // 日期和姓名
      ctx.fillStyle = "#888";
      ctx.font = "12px -apple-system, sans-serif";
      ctx.fillText(`${testDate}${userName ? " | " + userName : ""}`, width / 2, 58);

      // 分割线
      ctx.strokeStyle = "#e5e5e5";
      ctx.beginPath();
      ctx.moveTo(30, 72);
      ctx.lineTo(width - 30, 72);
      ctx.stroke();

      // 每个脉轮
      results.forEach((r, i) => {
        const y = headerHeight + i * rowHeight;

        // 圆点
        ctx.beginPath();
        ctx.arc(45, y + 8, 5, 0, Math.PI * 2);
        ctx.fillStyle = r.chakra.color;
        ctx.fill();

        // 脉轮名
        ctx.fillStyle = "#333";
        ctx.font = "bold 14px -apple-system, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(r.chakra.nameZh, 58, y + 12);

        // 梵文名
        ctx.fillStyle = "#aaa";
        ctx.font = "10px -apple-system, sans-serif";
        ctx.fillText(r.chakra.sanskrit, 120, y + 12);

        // 状态标签
        ctx.fillStyle = r.status.level === "low" ? "#3b82f6" : r.status.level === "high" ? "#f59e0b" : "#22c55e";
        ctx.font = "bold 11px -apple-system, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(r.status.label, width - 45, y + 12);

        // 能量条背景
        ctx.fillStyle = "#eee";
        ctx.beginPath();
        ctx.roundRect(58, y + 22, width - 130, 8, 4);
        ctx.fill();

        // 能量条
        ctx.fillStyle = r.chakra.color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.roundRect(58, y + 22, Math.max(4, ((width - 130) * r.percentage) / 100), 8, 4);
        ctx.fill();
        ctx.globalAlpha = 1;

        // 分数
        ctx.fillStyle = "#999";
        ctx.font = "10px -apple-system, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(`${r.percentage}%`, width - 45, y + 30);
      });

      // 底部
      ctx.fillStyle = "#bbb";
      ctx.font = "10px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("chakra-test-seven.vercel.app", width / 2, height - 20);

      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  }, [results, testDate, userName]);

  // 分享（优先分享图片，fallback 到纯文字复制）
  const handleShare = useCallback(async () => {
    // 检查是否支持 Web Share API
    if (typeof navigator.share === "function") {
      try {
        // 尝试生成图片并分享
        const blob = await generateImageBlob();
        if (blob && typeof navigator.canShare === "function") {
          const file = new File([blob], "脉轮测试结果.png", { type: "image/png" });
          const shareDataWithImage = {
            title: "我的脉轮能量测试结果",
            text: resultText,
            files: [file],
          };
          // 检查是否支持分享文件
          if (navigator.canShare(shareDataWithImage)) {
            await navigator.share(shareDataWithImage);
            return;
          }
        }
        // 不支持图片分享，尝试纯文字分享
        await navigator.share({
          title: "我的脉轮能量测试结果",
          text: resultText,
        });
        return;
      } catch (err: unknown) {
        // 用户主动取消
        if (err instanceof Error && err.name === "AbortError") return;
        // 其他错误，走复制
      }
    }
    // 不支持 Web Share API，走复制
    handleCopy();
  }, [resultText, handleCopy, generateImageBlob]);

  // 保存为 PNG 图片
  const handleSaveImage = useCallback(async () => {
    const blob = await generateImageBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `脉轮测试_${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [generateImageBlob]);

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

      <div id="result-content" className="px-3 pt-4 pb-48">
        <FadeIn>
          <h1 className="text-center text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            你的脉轮能量分析
          </h1>
        </FadeIn>

        {/* 日期和姓名 */}
        <FadeIn delay={0.05}>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <span>{testDate}</span>
            {userName && (
              <>
                <span>|</span>
                <span>{userName}</span>
              </>
            )}
          </div>
        </FadeIn>

        {/* 图例 */}
        <FadeIn delay={0.1}>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs">
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

                <div className="mt-1.5 flex items-end justify-between">
                  <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {r.chakra.description}
                  </p>
                  <span className="text-[10px] tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                    {r.chakra.nameZh} {r.percentage}%
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
              详细分析与建议
            </h2>

            {results.every((r) => r.status.level === "mid") && (
              <p className="mt-2 text-xs" style={{ color: "var(--success)" }}>
                恭喜！你的七个脉轮皆处于适度活跃的状态，请持续保持身心平衡。
              </p>
            )}

            <div className="mt-3 space-y-4">
              {results
                .filter((r) => r.status.level !== "mid")
                .map((r) => (
                  <div key={r.chakra.id} className="rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="size-2.5 rounded-full" style={{ backgroundColor: r.chakra.color }} />
                      <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                        {r.chakra.nameZh}
                      </span>
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
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {r.status.level === "low" ? r.chakra.statusUnder : r.chakra.statusOver}
                    </p>
                  </div>
                ))}
            </div>

            {/* 冥想提示 */}
            {results.some((r) => r.status.level === "low") && (
              <div className="mt-4 rounded-lg border border-border bg-background p-3">
                <h3 className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                  冥想指引
                </h3>
                <div className="mt-2 space-y-2">
                  {results
                    .filter((r) => r.status.level === "low")
                    .map((r) => (
                      <div key={r.chakra.id} className="text-[11px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        <span className="font-medium" style={{ color: "var(--foreground)" }}>{r.chakra.nameZh}</span>：
                        关注{r.chakra.location}，吟诵声音 <span style={{ color: "var(--primary)", fontWeight: 600 }}>{r.chakra.sound}</span>，
                        阻塞情绪为{r.chakra.demon}。{r.chakra.meditation}
                      </div>
                    ))}
                </div>
              </div>
            )}

            <p className="mt-3 text-[10px]" style={{ color: "var(--muted-foreground)" }}>
              提示：过度活跃的脉轮通常是补偿不活跃的脉轮。建议优先开启不活跃的脉轮，而非直接抑制过度活跃的脉轮。开启顺序建议从下往上：海底轮 → 本我轮 → 太阳神经丛 → 心轮 → 喉轮 → 眉心轮 → 顶轮。
            </p>
          </div>
        </FadeIn>
      </div>

      {/* 底部固定操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/90 backdrop-blur-md px-3 py-3">
        <div className="space-y-2">
          {/* 保存/分享按钮行 */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer text-xs"
              onClick={handleSaveImage}
            >
              保存结果
            </Button>
            <Button
              variant="outline"
              className="flex-1 cursor-pointer text-xs"
              onClick={handleShare}
            >
              转发分享
            </Button>
            <Button
              variant="outline"
              className="flex-1 cursor-pointer text-xs"
              onClick={handleCopy}
            >
              复制文字
            </Button>
          </div>
          {/* 重新测试 */}
          <Button
            variant="outline"
            className="w-full cursor-pointer text-xs"
            onClick={() => {
              sessionStorage.removeItem("chakra_answers");
              sessionStorage.removeItem("chakra_user_info");
              navigate("/quiz");
            }}
          >
            重新测试
          </Button>
        </div>
      </div>
    </main>
  );
}
