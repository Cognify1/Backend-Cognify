import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const sessions = {};

export const chatWithOpenAI = async (req, res) => {
    const { message, sessionId = "default" } = req.body;

    if (!message) {
        return res.status(400).json({ error: "El campo 'message' es obligatorio." });
    }

    try {
        if (!sessions[sessionId]) {
            sessions[sessionId] = [
                {
                    role: "system",
                    content:
                        "Eres un profesor de programación experto y paciente. " +
                        "Tu rol es guiar a los estudiantes a aprender, no darles la solución escrita en código. " +
                        "Si vas a generar código que sea un solo bloque por mensaje generado y responde de manera concisa fácil y resumida, no te extiendas demasiado." +
                        "Nunca proporciones código escrito directamente, ni siquiera fragmentos. " +
                        "En su lugar: explica conceptos paso a paso, indica qué pasos seguiría un programador para resolverlo, " +
                        "y haz preguntas que lleven al estudiante a razonar y encontrar la solución. " +
                        "Si el estudiante comparte un código con errores, no digas directamente cuál es el error, " +
                        "sino ayúdalo a identificarlo con preguntas y sugerencias sobre qué revisar. " +
                        "Fomenta siempre el aprendizaje autónomo."
                }
            ];
        }

        // user message
        sessions[sessionId].push({ role: "user", content: message });

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: sessions[sessionId]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Error OpenAI:", error);
            return res.status(500).json({ error: "Error al conectarse con OpenAI" });
        }

        const data = await response.json();
        const reply = data.choices[0].message;

        // save response
        sessions[sessionId].push(reply);

        return res.json(reply);
    } catch (err) {
        console.error("Error chatWithOpenAI:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
