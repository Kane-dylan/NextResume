import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.COHERE_API_KEY,
});

export async function POST(request) {
  try {
    const {message} = await request.json();

    const completion = await openai.chat.completions.create({
      module: "command-r-plus",
      message: [{ role: "user" , content: message}],
      stream: true,
    })

    const encoder= new TextEncoder();

    const readable= new ReadableStream({
      async start(controller){
        for await (const chunk of stream){
          const content =chunk.choices[0]?.delta?.content || ""
          if(content){
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({content})}`))
          }
        }
        controller.close();
      }
    });
  } catch (error) {
    
  }
}