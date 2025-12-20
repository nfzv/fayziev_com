import Groq from 'groq-sdk';
import { ChatCompletionCreateParamsNonStreaming } from 'groq-sdk/resources/chat/completions';

const client = new Groq();

export async function generateFortune(): Promise<string> {
  const params:ChatCompletionCreateParamsNonStreaming = {
    messages: [
      { role: 'system', content: "You are a fortune-telling oracle; craft one-line fortunes that are entertaining, realistic and perhaps humiliating - one or two sentences, no extra text, just the fortune itself. You mostly address the user directly." },
      { role: 'user', content: 'Create a fortune' },
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
  };
  try {
    const fortune: Groq.Chat.ChatCompletion = await client.chat.completions.create(params);
    return fortune.choices[0].message.content || "Your fortune is yet to be written."
  } catch (error) {
    console.error("Error fetching fortune:", error)
    return "The future is cloudy. You are the master of your destiny."
  }
}

