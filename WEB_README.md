# 🤖 Agente IA Web - Google Gemini

Uma aplicação web completa (frontend + backend) que implementa um agente de IA inteligente, personificado como um **professor maluco, impaciente e sarcástico** que explica conceitos técnicos de forma rápida e divertida.

## 📋 Características

✨ **Backend Node.js + Express**
- API REST com rota `/perguntar`
- Integração com Google Gemini (gemini-2.5-flash)
- Gerenciamento seguro de API key via `.env`
- Tratamento robusto de erros
- CORS habilitado para frontend

🎨 **Frontend Moderno**
- Interface clean e minimalista
- Cores suaves (sem branco puro ou preto absoluto)
- Modo claro/escuro com localStorage
- Responsivo (mobile + desktop)
- Chat em tempo real
- Indicador de loading
- Tratamento de erros visível

🧠 **Persona IA**
- Professor especializado em programação
- Sarcástico e impaciente
- Respostas rápidas e diretas
- Especialista em: API, JavaScript, Banco de Dados, Node.js

## 📁 Estrutura do Projeto

```
├── backend/
│   ├── index.js              # Servidor Express
│   ├── package.json          # Dependências
│   ├── .env                  # Variáveis de ambiente
│   └── .gitignore            # Ignorar node_modules, .env
│
├── frontend/
│   ├── index.html            # Página principal
│   ├── style.css             # Estilos (tema claro/escuro)
│   └── script.js             # Lógica frontend
│
├── .env                       # Config da CLI original (opcional)
├── package.json              # Config da CLI original (opcional)
├── index.js                  # CLI original (opcional)
└── README.md                 # Este arquivo
```

## 🚀 Instalação e Configuração

### 1. Pré-requisitos

- **Node.js** v18 ou superior
- **Chave de API do Google Gemini** (obtenha em: https://ai.google.dev)

### 2. Configurar Backend

```bash
# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Verificar se o .env está configurado com sua chave
# (ele já deve estar pronto, mas você pode editar se necessário)
cat .env
```

### 3. Configurar Frontend

Frontend é apenas HTML/CSS/JS, nenhuma instalação necessária!

## ▶️ Como Rodar

### Terminal 1 - Iniciar Backend

```bash
cd backend
npm start
```

Você verá algo como:
```
╔════════════════════════════════════════╗
║  🤖 AGENTE IA - BACKEND               ║
║  Powered by Google Gemini API          ║
╚════════════════════════════════════════╝

🚀 Servidor rodando em: http://localhost:3000
📡 Modelo: gemini-2.5-flash
🔐 API Key: Configurada ✓

Endpoints disponíveis:
  POST   http://localhost:3000/perguntar
  GET    http://localhost:3000/saude
  GET    http://localhost:3000/
```

### Terminal 2 - Abrir Frontend

**Opção A: Using Live Server (recomendado)**
```bash
# Se tiver Live Server instalado no VS Code
# Clique com botão direito no frontend/index.html
# Selecione "Open with Live Server"
```

**Opção B: Abrir diretamente no navegador**
```bash
# Windows
cd frontend
start index.html

# macOS
cd frontend
open index.html

# Linux
cd frontend
xdg-open index.html
```

**Opção C: Python SimpleServer**
```bash
cd frontend
python -m http.server 8000

# Acessar em http://localhost:8000
```

## 🎯 Como Usar

1. 🖥️ Abra a aplicação no navegador (http://localhost:8000 ou Live Server)
2. 📝 Digite uma pergunta no campo de input
3. ✈️ Clique em "Perguntar" ou pressione `Ctrl+Enter`
4. ⏳ Aguarde o professor processar a pergunta
5. 🧠 Leia a resposta sarcástica e informativa!

### Exemplos de Perguntas

```
"Qual é a diferença entre var, let e const?"
→ Resposta com sarcasmo e explicação detalhada

"Como usar async/await em JavaScript?"
→ Explicação rápida com exemplos

"O que é uma API REST?"
→ Conceito explicado de forma divertida
```

## 🎨 Funcionalidades da Interface

### Modo Claro/Escuro
- Clique no botão de tema no canto superior direito (🌙/☀️)
- Preferência salva automaticamente no localStorage
- Transições suaves entre temas

### Contador de Caracteres
- Mostra quantos caracteres você digitou
- Aviso visual quando ultrapassar 500 caracteres

### Atalhos de Teclado
- `Ctrl+Enter` ou `Cmd+Enter` - Enviar pergunta
- `Ctrl+Shift+L` - Limpar histórico de conversa

## 🔐 Segurança

✅ **O que foi feito:**
- Chave de API exclusivamente no backend (.env)
- Frontend não acessa a chave
- CORS habilitado apenas para localhost
- .env no .gitignore
- Validação de entrada no backend
- Tratamento de erros sensato

❌ **O que NÃO fazer:**
- Compartilhar arquivo `.env`
- Fazer commit do `.env` no git
- Expor chave em logs ou console
- Deixar API key no código

## 📡 API Backend

### POST /perguntar

Envia uma pergunta e retorna a resposta da IA.

**Request:**
```json
{
  "pergunta": "O que é uma API?"
}
```

**Response (Sucesso):**
```json
{
  "resposta": "Ah, finalmente uma pergunta decente!...",
  "timestamp": "2026-03-24T10:30:00.000Z"
}
```

**Response (Erro):**
```json
{
  "erro": "❌ Erro ao conectar com a IA: ..."
}
```

### GET /saude

Verifica se o servidor está funcionando.

**Response:**
```json
{
  "status": "🟢 Agente IA rodando normalmente",
  "timestamp": "2026-03-24T10:30:00.000Z",
  "modelo": "gemini-2.5-flash"
}
```

### GET /

Informações gerais do servidor.

## 🐛 Troubleshooting

### Frontend não conecta ao backend
**Problema:** "Não consegui conectar ao servidor backend"

**Solução:**
- Verifique se o backend está rodando (`npm start` na pasta backend)
- Confirme que o porta 3000 está disponível
- Verifique o console do navegador (F12) para mais detalhes

### API Key inválida
**Problema:** "Erro de autenticação"

**Solução:**
- Gere uma nova chave em https://ai.google.dev
- Atualize o arquivo `backend/.env`
- Reinicie o servidor backend

### CORS Error no navegador
**Problema:** "Access to XMLHttpRequest blocked"

**Solução:**
- Certifique-se que o backend tem CORS habilitado (já está no código)
- Frontend e backend devem estar em URLs diferentes (frontend em 8000, backend em 3000)

### Cannot find module '@google/generative-ai'
**Problema:** Erro ao iniciar o backend

**Solução:**
```bash
cd backend
npm install
```

## 📦 Dependências

### Backend
- **@google/generative-ai** - SDK do Google Gemini
- **express** - Framework web
- **cors** - CORS middleware
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- Nenhuma dependência! (HTML/CSS/JS puro)

## 🌙 Cores e Design

### Paleta Modo Claro
- Background: `#f8f9fa` (off-white)
- Texto: `#2c3e50` (cinza escuro)
- Acentos: `#3498db` (azul suave)
- Cards: `#ffffff` (branco)

### Paleta Modo Escuro
- Background: `#1a1f2e` (cinza muito escuro)
- Texto: `#ecf0f7` (off-white)
- Acentos: `#5dade2` (azul claro)
- Cards: `#242d3d` (cinza escuro)

Ambas as paletas evitam branco puro (#ffffff) e preto absoluto (#000000) para melhor conforto visual.

## 📱 Responsividade

A aplicação funciona perfeitamente em:
- Desktop (1920x1080, 1366x768, etc)
- Tablet (iPad, etc)
- Mobile (iPhone, Android)

Layout se adapta automaticamente com media queries.

## 🚫 Limitações conhecidas

- Rate limiting da API Gemini (máx ~60 requisições/minuto)
- Contexto da conversa não é mantido entre reloads da página
- Tamanho máximo de resposta limitado pela API

## 🎓 Créditos

- **Gemini API**: Google AI
- **Framework Backend**: Express.js
- **Design**: Inspirado em modernas interfaces de chat

## 📄 Licença

MIT - Sinta-se livre para usar, modificar e distribuir!

---

## 🎯 Próximos Passos (Opcionais)

- [ ] Implementar histórico persistente com localStorage
- [ ] Adicionar suporte a múltiplas conversas
- [ ] Implementar tema automático baseado em preferência do SO
- [ ] Adicionar exportar conversa como PDF
- [ ] Deploy na Vercel (frontend) + Railway (backend)
- [ ] WebSocket para respostas em streaming

---

**Criado com ❤️ e muita paciência do professor maluco** 🧠

Qualquer dúvida, releia a documentação. O professor não tem paciência para perguntas repetidas! 😄
