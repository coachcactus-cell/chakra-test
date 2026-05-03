import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LeadCapture() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState<"wechat" | "email">("wechat");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !contact.trim()) return;

    const userInfo = { name: name.trim(), contactType, contact: contact.trim(), timestamp: new Date().toISOString() };
    sessionStorage.setItem("chakra_user_info", JSON.stringify(userInfo));

    // 提交到后端 API
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
    } catch {
      // 网络失败也不影响用户查看结果
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <FadeIn>
          <div className="text-center">
            <div className="mb-4 text-4xl">✨</div>
            <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
              感谢你，{name}！
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
              你的专属脉轮报告已准备就绪
            </p>
            <Button
              className="mt-6 cursor-pointer px-8 text-white"
              style={{ backgroundColor: "var(--primary)" }}
              onClick={() => navigate("/result")}
            >
              查看结果
            </Button>
          </div>
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* 顶部 */}
      <nav className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="h-6 w-auto rounded" />
          <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
            脉轮测试
          </span>
        </div>
      </nav>

      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <FadeIn>
          <div className="mx-auto max-w-sm">
            <div className="text-center">
              <div className="mb-3 text-3xl">🔮</div>
              <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                获取你的专属脉轮报告
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                填写以下信息，即可查看你的七个脉轮能量分析及改善建议
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {/* 姓名 */}
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  你的称呼
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入你的名字"
                  className="text-sm"
                />
              </div>

              {/* 联系方式类型切换 */}
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  联系方式
                </label>
                <div className="mb-2 flex gap-2">
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-all"
                    style={{
                      borderColor: contactType === "wechat" ? "var(--primary)" : "var(--border)",
                      backgroundColor: contactType === "wechat" ? "color-mix(in oklch, var(--primary) 12%, var(--background))" : "transparent",
                      color: contactType === "wechat" ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                    onClick={() => { setContactType("wechat"); setContact(""); }}
                  >
                    微信号
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-all"
                    style={{
                      borderColor: contactType === "email" ? "var(--primary)" : "var(--border)",
                      backgroundColor: contactType === "email" ? "color-mix(in oklch, var(--primary) 12%, var(--background))" : "transparent",
                      color: contactType === "email" ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                    onClick={() => { setContactType("email"); setContact(""); }}
                  >
                    邮箱
                  </button>
                </div>
                <Input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={contactType === "wechat" ? "请输入微信号" : "请输入邮箱地址"}
                  type={contactType === "email" ? "email" : "text"}
                  className="text-sm"
                />
              </div>

              {/* 提交按钮 */}
              <Button
                size="lg"
                className="w-full cursor-pointer text-base text-white"
                style={{
                  backgroundColor: name.trim() && contact.trim() ? "var(--primary)" : "var(--muted)",
                  color: name.trim() && contact.trim() ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
                disabled={!name.trim() || !contact.trim()}
                onClick={handleSubmit}
              >
                查看我的脉轮报告
              </Button>

              <p className="text-center text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                你的信息仅用于提供个性化脉轮分析，不会分享给第三方
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
