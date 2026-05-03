import { useMemo, useCallback } from "react";
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
      const answered = qs.filter((q) => answers[q.id] != null && answers[q.id] > 0).length;
      const score = calcChakraScore(chakra.id, answers);
      const percentage = answered > 0 ? Math.round((score / MAX_PER_CHAKRA) * 100) : 0;
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
        `${r.chakra.nameZh}（${r.chakra.sanskrit}）: ${r.status.label} ${r.percentage}% (${r.score}/${MAX_PER_CHAKRA})`
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

  // 分享（调用系统分享功能）
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "我的脉轮能量测试结果",
          text: resultText,
          url: "https://chakra-test-seven.vercel.app/",
        });
      } catch {
        // 用户取消分享，忽略
      }
    } else {
      // 不支持系统分享，走复制
      handleCopy();
    }
  }, [resultText, handleCopy]);

  // 保存为图片（截图结果区域）
  const handleSaveImage = useCallback(() => {
    const resultArea = document.getElementById("result-content");
    if (!resultArea) return;

    // 使用 html2canvas 替代方案：生成一个 canvas 截图
    // 为了不引入额外依赖，用 SVG foreignObject 方式
    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="${200 + results.length * 60}">
        <style>
          text { font-family: -apple-system, sans-serif; }
        </style>
        <rect width="400" height="${200 + results.length * 60}" fill="#faf9fc"/>
        <text x="200" y="35" text-anchor="middle" font-size="20" font-weight="bold" fill="#2d1b69">脉轮能量测试结果</text>
        <text x="200" y="58" text-anchor="middle" font-size="12" fill="#666">${testDate}${userName ? " | " + userName : ""}</text>
        <line x1="30" y1="70" x2="370" y2="70" stroke="#e5e5e5" stroke-width="1"/>
        ${results
          .map(
            (r, i) => `
          <circle cx="50" cy="${100 + i * 55}" r="6" fill="${r.chakra.color}"/>
          <text x="65" y="${105 + i * 55}" font-size="14" font-weight="bold" fill="#333">${r.chakra.nameZh}</text>
          <text x="160" y="${105 + i * 55}" font-size="11" fill="#999">${r.chakra.sanskrit}</text>
          <text x="340" y="${105 + i * 55}" text-anchor="end" font-size="12" font-weight="bold" fill="${
              r.status.level === "low" ? "#3b82f6" : r.status.level === "high" ? "#f59e0b" : "#22c55e"
            }">${r.status.label}</text>
          <rect x="65" y="${115 + i * 55}" width="280" height="8" rx="4" fill="#eee"/>
          <rect x="65" y="${115 + i * 55}" width="${(r.percentage / 100) * 280}" height="8" rx="4" fill="${
              r.chakra.color
            }" opacity="0.85"/>
          <text x="350" y="${122 + i * 55}" text-anchor="end" font-size="10" fill="#999">${r.score}/${MAX_PER_CHAKRA}</text>
        `
          )
          .join("")}
        <text x="200" y="${140 + results.length * 55}" text-anchor="middle" font-size="10" fill="#999">chakra-test-seven.vercel.app</text>
      </svg>
    `;

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    // 下载 SVG
    const link = document.createElement("a");
    link.href = url;
    link.download = `脉轮测试结果_${new Date().toISOString().slice(0, 10)}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [results, testDate, userName]);

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
