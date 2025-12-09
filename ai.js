// ai.js
// Example client-side call to OpenAI. DO NOT use this in production with a real key in client JS.
export async function analyseWithAI(activities) {
  // prepare prompt
  const lines = activities.map(a => `${a.title} (${a.category || 'General'}) - ${a.minutes} min`);
  const prompt = `You are a friendly assistant. Summarize this user's day and give 3 improvement suggestions in simple language.\n\nActivities:\n${lines.join('\n')}\n\nReturn a short summary and 3 suggestions.`;

  // Replace below with your server endpoint that proxies the OpenAI/Gemini call.
  // For demo only: calling OpenAI directly (NOT recommended).
  const OPENAI_KEY = 'PASTE_YOUR_OPENAI_API_KEY_HERE'; // insecure in client
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization':'Bearer ' + OPENAI_KEY },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // example model
      messages: [{ role:'user', content: prompt }],
      max_tokens: 250,
      temperature: 0.7
    })
  });
  const j = await resp.json();
  return j.choices?.[0]?.message?.content || 'No AI response';
}
