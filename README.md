# 🤖 Agente IA CLI - Google Gemini

Um agente de IA inteligente que roda no terminal, conectado à API do Google Gemini. Personificado como um professor maluco, impaciente e sarcástico que explica conceitos técnicos de forma rápida e divertida.

## 📋 Pré-requisitos

- **Node.js** v18 ou superior
- **Chave de API do Google Gemini** (obtenha em: https://ai.google.dev)

## 🚀 Instalação e Configuração

### 1. Clonar ou baixar o projeto
```bash
cd seu-diretorio-do-projeto
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar a API Key

Abra o arquivo `.env` e substitua o valor placeholder:

```env
GEMINI_API_KEY=COLOQUE_AQUI_SUA_CHAVE_API_GEMINI
```

Por sua chave real do Google Gemini:

```env
GEMINI_API_KEY=ABC123XYZ...seu_token_aqui...
```

⚠️ **IMPORTANTE**: Nunca compartilhe sua chave de API! O arquivo `.env` está no `.gitignore`, então não será versionado.

## ▶️ Como Usar

### Iniciar o agente:
```bash
npm start
```

ou

```bash
node index.js
```

### Interface do terminal:
```
╔════════════════════════════════════════╗
║  🤖 AGENTE IA - GEMINI CLI             ║
║  Powered by Google Gemini API          ║
╚════════════════════════════════════════╝

👨‍🏫 Professor maluco e impaciente aguardando suas perguntas...
💡 Digite "sair" para encerrar o programa
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Você: 
```

### Exemplos de perguntas:
```
📝 Você: O que é uma API REST?
🧠 Professor IA: [resposta sarcástica e informativa]

📝 Você: Como usar async/await em JavaScript?
🧠 Professor IA: [explicação rápida com humor]

📝 Você: sair
👋 Até logo! Obrigado por usar o Agente IA!
```

## 📁 Estrutura do Projeto

```
├── index.js           # Arquivo principal com toda a lógica
├── package.json       # Dependências do projeto
├── .env              # Variáveis de ambiente (NÃO COMITAR!)
├── .gitignore        # Arquivos a ignorar no git
└── README.md         # Este arquivo
```

## ⚙️ Configuração Técnica

- **Linguagem**: Node.js (ES Modules)
- **Modelo IA**: `gemini-2.5-flash`
- **Dependências principais**:
  - `@google/generative-ai` - SDK oficial do Google Gemini
  - `dotenv` - Gerenciamento de variáveis de ambiente
  - `readline` - Interface de entrada do terminal

## 🧠 Persona do Professor IA

O agente foi configurado com as seguintes características:

- 👨‍🏫 Professor especializado em programação
- ⚡ Rápido, impaciente e sarcástico
- 😄 Engraçado com humor leve
- 🎯 Direto ao ponto nas explicações
- 📚 Especialista em: API, JavaScript, Banco de Dados, Node.js, Web Dev

## 🔒 Segurança

✅ **O que foi feito**:
- Chave de API em arquivo `.env` (não versionado)
- Validação de API key antes de iniciar
- Tratamento de erros de autenticação
- Jamais expõe dados sensíveis no console

❌ **O que NÃO fazer**:
- Compartilhar o arquivo `.env` contendo a chave
- Fazer commit da chave no repositório
- Deixar a chave em logs ou mensagens de erro

## 🐛 Tratamento de Erros

O programa trata automaticamente:

- ❌ API Key não configurada → Erro claro com instruções
- ❌ Problema de autenticação → Mensagem específica
- ❌ Limite de requisições atingido → Aviso de rate limit
- ❌ Conexão com a API → Mensagem amigável

## 💡 Exemplos de Uso

### Pergunta sobre API REST
```
📝 Você: O que é API REST?
⏳ Processando sua pergunta...

🧠 Professor IA:
Ah, finalmente uma pergunta decente! API REST é uma forma de comunicação 
entre servidores baseada em HTTP... [resposta completa com sarcasmo]
```

### Pergunta óbvia
```
📝 Você: O que é JavaScript?
⏳ Processando sua pergunta...

🧠 Professor IA:
Sério que você tá me perguntando O QUE é JavaScript?! Tá bom, deixa eu 
explicar de forma bem didática... [resposta condescendente mas útil]
```

## 🚫 Saindo do Programa

Digite `sair` e pressione Enter:

```
📝 Você: sair
👋 Até logo! Obrigado por usar o Agente IA!
```

## 🔧 Troubleshooting

### Erro: "Chave da API não configurada"
- Veja se o arquivo `.env` existe
- Verifique se a variável `GEMINI_API_KEY` está preenchida corretamente

### Erro: "API key inválida"
- Gere uma nova chave em: https://ai.google.dev
- Atualize a variável no arquivo `.env`
- Tenha certeza de que não há espaços extras

### Erro: "Cannot find module"
- Execute `npm install` novamente
- Verifique se Node.js está instalado (v18+)

## 📄 Licença

MIT - Sinta-se livre para usar, modificar e distribuir!

---

**Criado com ❤️ e muita paciência do professor maluco** 🧠
