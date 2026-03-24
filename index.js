import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// ==================== CONFIGURAÇÃO ====================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.5-flash";
const SYSTEM_PROMPT = `Você é um professor de programação maluco, impaciente e sarcástico.
Você explica conceitos técnicos de forma rápida e direta, com muito humor e sarcasmo leve.
Seus tópicos favoritos: API, JavaScript, Banco de Dados, Node.js, Web Development.
Seja breve, mas mantenha o tom divertido e descontraído.
Quando alguém faz uma pergunta óbvia, reclame com sarcasmo antes de responder.`;

// ==================== VALIDAÇÃO ====================
/**
 * Valida se a API key foi configurada corretamente
 */
function validateApiKey() {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "COLOQUE_AQUI_SUA_CHAVE_API_GEMINI") {
    console.error("❌ ERRO: Chave da API Gemini não configurada!");
    console.error(
      '📝 Configure a variável GEMINI_API_KEY no arquivo .env'
    );
    process.exit(1);
  }
}

// ==================== INICIALIZAÇÃO ====================
/**
 * Inicializa o cliente da API Gemini
 */
function initializeGeminiClient() {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    return genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_PROMPT,
    });
  } catch (error) {
    console.error("❌ ERRO ao inicializar cliente Gemini:", error.message);
    process.exit(1);
  }
}

// ==================== FUNÇÕES PRINCIPAIS ====================
/**
 * Envia uma pergunta para a IA e retorna a resposta
 * @param {string} userMessage - Mensagem do usuário
 * @param {Object} model - Modelo Gemini configurado
 * @returns {Promise<string>} Resposta da IA
 */
async function askGemini(userMessage, model) {
  try {
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (error.message.includes("API key")) {
      return "❌ Erro de autenticação! Verifique sua API key do Gemini.";
    } else if (error.message.includes("rate limit")) {
      return "⏳ Você atingiu o limite de requisições. Tente novamente em alguns segundos.";
    } else {
      return `❌ Erro ao conectar com a IA: ${error.message}`;
    }
  }
}

/**
 * Cria uma interface para ler entrada do usuário no terminal
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Faz uma pergunta ao usuário e retorna a resposta
 * @param {Object} rl - Interface readline
 * @param {string} prompt - Prompt a exibir
 * @returns {Promise<string>} Resposta do usuário
 */
function askUser(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Exibe a mensagem de boas-vindas
 */
function displayWelcome() {
  console.clear();
  console.log("╔════════════════════════════════════════╗");
  console.log("║  🤖 AGENTE IA - GEMINI CLI             ║");
  console.log("║  Powered by Google Gemini API          ║");
  console.log("╚════════════════════════════════════════╝");
  console.log("");
  console.log("👨‍🏫 Professor maluco e impaciente aguardando suas perguntas...");
  console.log('💡 Digite "sair" para encerrar o programa');
  console.log("━".repeat(42));
  console.log("");
}

/**
 * Loop principal da aplicação - interação com o usuário
 */
async function main() {
  // Validar API key
  validateApiKey();

  // Inicializar cliente Gemini
  const model = initializeGeminiClient();

  // Criar interface de entrada
  const rl = createReadlineInterface();

  // Exibir boas-vindas
  displayWelcome();

  // Loop interativo
  let shouldContinue = true;

  while (shouldContinue) {
    try {
      // Solicitar input do usuário
      const userInput = await askUser(rl, "📝 Você: ");

      // Verificar se usuário quer sair
      if (userInput.toLowerCase() === "sair") {
        console.log("\n👋 Até logo! Obrigado por usar o Agente IA!");
        shouldContinue = false;
        break;
      }

      // Ignorar linhas vazias
      if (!userInput) {
        console.log("⚠️  Digite algo! Não leia a mente minha não...\n");
        continue;
      }

      // Exibir que está processando
      console.log("\n⏳ Processando sua pergunta...\n");

      // Enviar para IA e obter resposta
      const aiResponse = await askGemini(userInput, model);

      // Exibir resposta
      console.log("🧠 Professor IA:\n");
      console.log(aiResponse);
      console.log("\n" + "━".repeat(42) + "\n");

    } catch (error) {
      console.error("❌ Erro inesperado:", error.message);
      console.log("Tente novamente.\n");
    }
  }

  // Fechar interface readline
  rl.close();
  process.exit(0);
}

// ==================== EXECUÇÃO ====================
// Executar a aplicação
main().catch((error) => {
  console.error("❌ Erro fatal:", error.message);
  process.exit(1);
});
