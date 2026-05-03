import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CHAKRAS, QUESTIONS, SCORE_OPTIONS, SCORE_LABELS } from "@/types/chakra";

const TOTAL = QUESTIONS.length;

export default function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / TOTAL) * 100);

  const handleChange = useCallback((qId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qId]: score }));
  }, []);

  const handleSubmit = () => {
    if (answeredCount < TOTAL) return;
    sessionStorage.setItem("chakra_answers", JSON.stringify(answers));
    navigate("/lead");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 顶部固定栏 */}
      <nav className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md px-3 py-2.5">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="h-6 w-auto rounded" />
          <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
            脉轮测试
          </span>
          <span className="ml-auto text-xs" style={{ color: "var(--muted-foreground)" }}>
            {answeredCount}/{TOTAL}
          </span>
        </div>
        <div className="mt-2">
          <Progress value={progress} className="h-1.5" />
        </div>
      </nav>

      {/* 说明 */}
      <section className="px-3 pt-4 pb-2">
        <FadeIn>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            共 {TOTAL} 题，从「完全没有」到「感觉强烈」选择最符合你的程度。诚实作答才能获得准确结果。
          </p>
        </FadeIn>
      </section>

      {/* 题目列表 */}
      <section className="px-3 pb-40">
        <div className="space-y-3">
          {CHAKRAS.map((chakra) => {
            const chakraQuestions = QUESTIONS.filter(q => q.chakraId === chakra.id);
            return (
              <div key={chakra.id}>
                {/* 脉轮分组标题 */}
                <div
                  className="mb-2 mt-4 flex items-center gap-2 rounded-lg px-2 py-1.5"
                  style={{ backgroundColor: `color-mix(in oklch, ${chakra.color} 12%, var(--background))` }}
                >
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: chakra.color }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                    {chakra.nameZh}
                  </span>
                </div>

                {chakraQuestions.map((q) => (
                  <div
                    id={`q-${q.id}`}
                    key={q.id}
                    className="mb-2 rounded-xl border border-border bg-card p-3"
                  >
                    <p className="mb-2.5 text-sm font-medium leading-relaxed" style={{ color: "var(--foreground)" }}>
                      {q.id}. {q.text}
                    </p>
                    {/* 5 级评分 - 匹配原站风格 */}
                    <div className="flex items-center gap-1">
                      <span className="shrink-0 text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                        完全没有
                      </span>
                      <div className="flex flex-1 justify-center gap-2">
                        {SCORE_OPTIONS.map((score, idx) => {
                          const checked = answers[q.id] === score;
                          return (
                            <button
                              key={score}
                              type="button"
                              onClick={() => handleChange(q.id, score)}
                              className="cursor-pointer transition-all"
                              title={SCORE_LABELS[idx]}
                            >
                              <div
                                className="flex size-7 items-center justify-center rounded-full border-2 sm:size-8"
                                style={{
                                  borderColor: checked ? "var(--primary)" : "var(--border)",
                                  backgroundColor: checked ? "var(--primary)" : "transparent",
                                  transition: "all 150ms",
                                }}
                              >
                                {checked && (
                                  <div className="text-[10px] font-bold text-white">
                                    {SCORE_LABELS[idx]}
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <span className="shrink-0 text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                        感觉强烈
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* 底部固定提交栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/90 backdrop-blur-md px-3 py-3">
        {answeredCount < TOTAL && (
          <p className="mb-2 text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
            已完成 {answeredCount}/{TOTAL} 题
          </p>
        )}
        <Button
          size="lg"
          className="w-full cursor-pointer text-base"
          style={{
            backgroundColor: answeredCount >= TOTAL ? "var(--primary)" : "var(--muted)",
            color: answeredCount >= TOTAL ? "var(--primary-foreground)" : "var(--muted-foreground)",
          }}
          disabled={answeredCount < TOTAL}
          onClick={handleSubmit}
        >
          查看结果
        </Button>
      </div>
    </main>
  );
}
