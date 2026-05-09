const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const apiKey = "AIzaSyDZXYGpTHbxjf98wAWyICT7c-NzJLPJ4ZY";
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const modelList = await genAI.listModels();
    console.log("Available models:");
    modelList.models.forEach((m) => {
      console.log(`${m.name} (methods: ${m.supportedGenerationMethods.join(", ")})`);
    });
  } catch (error) {
    console.error("Error listing models:", error);
    if (error.status) console.error("Status:", error.status);
    if (error.statusText) console.error("Status Text:", error.statusText);
  }
}

listModels();
