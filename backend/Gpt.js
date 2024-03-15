import {  OpenAI } from 'openai';
import dotenv from "dotenv";
dotenv.config({path: 'backend/.env'});

export  async function getChatGPTResponse(prompt) {

  const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
    // apiKey:'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'
  });
  console.log(process.env.OPENAI_API_KEY);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `${prompt} give answer in just 1-2 line about whats your opinion about this message` }],
      model: "gpt-3.5-turbo",
    });
  
    let answer  = completion.choices[0].message.content;
    return answer;
}