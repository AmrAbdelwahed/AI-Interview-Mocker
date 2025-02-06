const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_HIGH,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SEXUALLY_SUGGESTIVE,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_HIGH,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_VIOLENCE,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_HIGH,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SELF_HARM,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_HIGH,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_DEROGATORY,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_HIGH,
//     },
//   ];
  
    export const chatSession = model.startChat({
        generationConfig,
    });