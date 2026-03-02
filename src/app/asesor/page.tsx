"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Trash2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/stores";
import { POINT_ACTIONS } from "@/lib/gamification";
import XPBar from "@/components/shared/XPBar";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Suggested prompts                                                  */
/* ------------------------------------------------------------------ */

const SUGGESTED_PROMPTS = [
  "Quiero hacer un vestido para una boda en la playa, ¿qué tela me recomienda?",
  "¿Qué tela es mejor para uniformes escolares?",
  "Necesito tela para cortinas en un clima caliente, ¿qué me sugiere?",
  "¿Cuántos metros necesito para una falda larga?",
  "¿Cuál es la diferencia entre algodón y popelina?",
  "Quiero hacer un mantel para una mesa de 6 personas.",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AsesorPage() {
  const { aiMessages, addAIMessage, clearAIMessages, addPoints } =
    useAppStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  async function handleSend(message?: string) {
    const text = message || input.trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: text,
      timestamp: new Date().toISOString(),
    };
    addAIMessage(userMessage);
    setInput("");
    setIsLoading(true);

    // Award points for using AI advisor (once per session)
    if (!hasAwardedPoints) {
      addPoints(
        POINT_ACTIONS.USE_AI_ADVISOR.action,
        POINT_ACTIONS.USE_AI_ADVISOR.points
      );
      setHasAwardedPoints(true);
    }

    try {
      // Build messages array for the API
      const conversationMessages = [
        ...aiMessages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: text },
      ];

      const response = await fetch("/api/ai/asesor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationMessages }),
      });

      if (!response.ok) throw new Error("Error en la respuesta");

      const data = await response.json();
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: data.response,
        timestamp: new Date().toISOString(),
      };
      addAIMessage(assistantMessage);
    } catch {
      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content:
          "Lo siento, hubo un error al procesar su consulta. Por favor intente de nuevo o contáctenos por WhatsApp al 9651-8484.",
        timestamp: new Date().toISOString(),
      };
      addAIMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1B3A5C] py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)",
          backgroundSize: "20px 20px", backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
        }} />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mx-auto mb-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#D4A843] to-[#E0BD6A]" />
            <motion.h1 variants={fadeUp} className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl">
              Asesor de Telas IA
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-white/80">
              Nuestro experto virtual con 20 años de experiencia le ayuda a elegir la tela perfecta
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* XP Bar */}
        <div className="mb-6 max-w-md">
          <XPBar />
        </div>

        {/* Chat Container */}
        <div className="rounded-2xl border border-[#E5E0D5] bg-white shadow-sm overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-[#E5E0D5] bg-[#FAFAF7] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3A5C]">
                <Sparkles className="h-5 w-5 text-[#D4A843]" />
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">Asesor de Telas</p>
                <p className="text-xs text-[#5C5C5C]">Comercial del Valle</p>
              </div>
            </div>
            {aiMessages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAIMessages}
                className="text-[#5C5C5C] hover:text-red-500"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Limpiar chat
              </Button>
            )}
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {aiMessages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Bot className="h-16 w-16 text-[#E5E0D5]" />
                <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1A1A1A]">
                  ¡Hola! Soy su asesor de telas
                </h3>
                <p className="mt-2 max-w-sm text-sm text-[#5C5C5C]">
                  Pregúnteme sobre cualquier proyecto de costura y le recomendaré
                  las mejores telas con instrucciones de cuidado.
                </p>

                {/* Suggested Prompts */}
                <div className="mt-6 grid gap-2 sm:grid-cols-2 max-w-lg">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="rounded-lg border border-[#E5E0D5] bg-[#FAFAF7] p-3 text-left text-xs text-[#5C5C5C] transition-colors hover:border-[#D4A843] hover:bg-[#D4A843]/5"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {aiMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B3A5C]">
                        <Bot className="h-4 w-4 text-[#D4A843]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-[#1B3A5C] text-white"
                          : "bg-[#FAFAF7] text-[#1A1A1A] border border-[#E5E0D5]"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4A843]">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B3A5C]">
                      <Bot className="h-4 w-4 text-[#D4A843]" />
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-[#E5E0D5] bg-[#FAFAF7] px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-[#1B3A5C]" />
                      <span className="text-sm text-[#5C5C5C]">Pensando...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#E5E0D5] bg-[#FAFAF7] p-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escriba su consulta sobre telas..."
                className="min-h-[44px] max-h-[120px] resize-none border-[#E5E0D5] bg-white"
                rows={1}
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="h-[44px] w-[44px] shrink-0 bg-[#1B3A5C] p-0 text-white hover:bg-[#244D78] disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
