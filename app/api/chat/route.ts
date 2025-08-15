import axios, { Axios } from "axios";

const openai = new Axios ({
  apiKey:process.env.OPENROUTER_API_KEY;
});

export async function POST(request){
  try {
    const {message}= await request.json();

  } catch (error) {
    
  }
}