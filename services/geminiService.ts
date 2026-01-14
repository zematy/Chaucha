import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `Eres Chaucha, un asistente financiero chileno inteligente, amigable y proactivo. 
Tu tono es cercano pero profesional, usando modismos chilenos sutiles si es apropiado (como "lucas" para dinero, "pega" para trabajo, pero manteniéndolo comprensible).
Tu objetivo es ayudar al usuario a mejorar su salud financiera, analizar sus gastos y dar consejos de presupuesto.
Siempre responde de manera concisa y útil. Si el usuario pregunta sobre sus datos, asume que tienes acceso al contexto de su última cartola bancaria importada (gastos de Uber, Starbucks, suscripciones, etc.).
`;

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  try {
    // Convert internal message format to API format if needed, 
    // but for simple chat we can often just use the history in the chat session.
    // However, recreating the chat session each time for a stateless feel or persisting it is a choice.
    // Here we'll create a new chat with history to ensure context.
    
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: chatHistory
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Lo siento, no pude procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hubo un problema conectando con el servicio de IA. Por favor intenta nuevamente.";
  }
};
