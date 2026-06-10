export const prerender = true;

export async function GET() {
  const identity = {
    name: "Eduardo Toledo",
    role: "Consultor de relevancia profesional y organizacional en la era de la IA",
    location: "Madrid, España",
    thesis: "La IA reescribe las reglas del juego. La ventaja ya no es producir más, sino rediseñar la relevancia.",
    programs: [
      { name: "El gran reajuste", url: "/programas#reframe-game", description: "Juego experiencial en 4 pasos para aprender a ganar con las nuevas reglas de la IA. Un juego para ver quién gana poder cuando la IA reescribe las reglas." },
      { name: "Reframe yourself", url: "/programas#reframe-yourself", description: "Programa individual de rediseño de relevancia profesional" },
      { name: "Reframe business", url: "/programas#reframe-business", description: "Programa para organizaciones y equipos" }
    ],
    frameworks: { url: "/marcos", description: "Mapas conceptuales para leer el trabajo, el valor y la relevancia con las nuevas reglas de la IA" },
    tools: { url: "/herramientas", description: "Diagnósticos, canvas, checklists y prompts" },
    cuaderno: {
      url: "/cuaderno",
      categories: [
        { name: "Brújula", description: "Para orientarse" },
        { name: "Estrella Polar", description: "Dirección de avance" },
        { name: "Hito", description: "Explicar conceptos" },
        { name: "Itinerario", description: "Conectando ideas" },
        { name: "Mirador", description: "Pensar conmigo" },
        { name: "Sendero", description: "Explorando ideas" }
      ]
    },
    contact: {
      email: "edutoledo@gmail.com",
      linkedin: "https://linkedin.com/in/eduardotoledo",
      twitter: "https://x.com/eduardotoledo",
      web: "https://eduardotoledo.com"
    },
    llmsTxt: "/llms.txt",
    canonical: "https://eduardotoledo.com",
    aiTwin: "https://mi-libreta.vercel.app"
  };

  return new Response(JSON.stringify(identity, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
