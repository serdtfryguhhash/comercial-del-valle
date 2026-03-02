import { NextRequest, NextResponse } from "next/server";
import { getAIResponse } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Se requieren mensajes para el asesor." },
        { status: 400 }
      );
    }

    const response = await getAIResponse(messages);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error en el asesor IA:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud del asesor." },
      { status: 500 }
    );
  }
}
