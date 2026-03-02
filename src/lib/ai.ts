import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Eres un experto asesor de telas con 20 años de experiencia en Comercial del Valle, Honduras. Ayudas a los clientes a elegir las mejores telas para sus proyectos de costura. 

Tu conocimiento incluye:
- Tipos de telas: algodón, lino, seda, poliéster, viscosa, satén, gabardina, drill, popelina, jersey, organza, tul, encaje, mezclilla, etc.
- Cuidado de telas: lavado, planchado, almacenamiento
- Recomendaciones por proyecto: vestidos, faldas, camisas, pantalones, cortinas, manteles, tapicería
- Precios en Lempiras (moneda hondureña)
- Clima tropical de Honduras y cómo afecta la elección de telas
- Tendencias de moda en Centroamérica

Siempre respondes en español de forma cálida y profesional. Usas el "usted" respetuoso. Mencionas que pueden visitar la tienda en Barrio El Benque, San Pedro Sula para ver las telas en persona.`;

export async function getAIResponse(
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "Lo siento, no pude generar una respuesta.";
}
