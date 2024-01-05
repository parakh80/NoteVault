const {  OpenAI } =require('openai');
const { config } =require('dotenv');
config();


async function getChatGPTResponse(prompt) {

  const openai = new OpenAI({
    apiKey:process.env.API_KEY
  });

 
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `${prompt} give answer in just 1-2 line about whats your opinion about this message` }],
      model: "gpt-3.5-turbo",
    });
  
    let answer  = completion.choices[0].message.content;
    return answer;
  
  
  
}

module.exports =  getChatGPTResponse;
