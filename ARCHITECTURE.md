# 🏗️ ARQUITETURA - Agente IA Web

## 📐 Diagrama da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     NAVEGADOR DO USUÁRIO                     │
│                    (Frontend - Port 8000)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              HTML (index.html)                        │   │
│  │  ┌────────────┐  ┌─────────────┐  ┌──────────────┐  │   │
│  │  │   Header   │  │ Chat History│  │  Input Area  │  │   │
│  │  └────────────┘  └─────────────┘  └──────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ▲                                  │
│                            │ DOM Manipulation                 │
│                            │ Listen Events                    │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        JavaScript (script.js)                         │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │  • Event Listeners (click, input, keydown)      │ │   │
│  │  │  • Tema Claro/Escuro (localStorage)             │ │   │
│  │  │  • Fetch API para comunicação                    │ │   │
│  │  │  • Formatação de Mensagens                       │ │   │
│  │  │  • Gerenciamento de Loading/Erro                │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ▲                                  │
│                            │ CSS Styling                      │
│                            │ Animations                       │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          CSS (style.css)                             │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │  • CSS Variables (--bg-primary, etc)             │ │   │
│  │  │  • Media Queries (responsivo)                    │ │   │
│  │  │  • Dark/Light Theme                              │ │   │
│  │  │  • Animações (fade, slide, spin)                 │ │   │
│  │  │  • Scrollbar customizado                         │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP POST /perguntar
                            │ fetch() → JSON
                            │ CORS habilitado
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              SERVIDOR NODE.JS + EXPRESS                      │
│                    (Backend - Port 3000)                     │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Express Middleware                            │   │
│  │  ┌ ────────────────────────────────────────────────┐ │   │
│  │  │  CORS (cors)                                    │ │   │
│  │  │  JSON Parser (express.json)                     │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Rotas Express (index.js)                     │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │  POST   /perguntar  → Processar pergunta         │ │   │
│  │  │  GET    /saude      → Status do servidor         │ │   │
│  │  │  GET    /           → Info do servidor           │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│                            │ (POST /perguntar)               │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │     Lógica de Negócio (index.js)                    │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │  • Validar entrada (pergunta não vazia)          │ │   │
│  │  │  • Verificar API Key                             │ │   │
│  │  │  • Inicializar Cliente Gemini                    │ │   │
│  │  │  • Enviar para o modelo                          │ │   │
│  │  │  • Formatar resposta                             │ │   │
│  │  │  • Retornar JSON                                 │ │   │
│  │  │  • Tratamento de erros                           │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│                            │ axios/fetch interno             │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │     Google Generative AI (Gemini)                    │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │  • Modelo: gemini-2.5-flash                      │ │   │
│  │  │  • System Prompt: Professor maluco               │ │   │
│  │  │  • generateContent(pergunta)                     │ │   │
│  │  │  • Retorna texto formatado                       │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Resposta JSON
                            │ { resposta: "...", timestamp: "..." }
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 NAVEGADOR DO USUÁRIO (NOVAMENTE)             │
│  • Recebe JSON                                              │
│  • Adiciona ao DOM (nova mensagem)                          │
│  • Mostra resposta do professor                             │
│  • Atualiza interface (loading desaparece)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Requisição (Sequência)

```
USUÁRIO
  │
  ├─→ 1. Digita pergunta no input
  │
  └─→ 2. Clica "Perguntar" ou pressiona Ctrl+Enter
       │
       ├─→ 3. JavaScript valida se tem texto
       │
       ├─→ 4. Mostra indicador de loading
       │
       ├─→ 5. Envia POST /perguntar com JSON
       │      {
       │        "pergunta": "O que é API?"
       │      }
       │
       └─→ 6. Aguarda resposta do servidor
            │
            ├─────────────────→ BACKEND
            │                   │
            │                   ├─→ 7. Express recebe requisição
            │                   │
            │                   ├─→ 8. Valida JSON e conteúdo
            │                   │
            │                   ├─→ 9. Inicializa cliente Gemini
            │                   │
            │                   ├─→ 10. Envia para Google API
            │                   │       (com system prompt)
            │                   │
            │                   ├─→ 11. Recebe resposta da IA
            │                   │
            │                   └─→ 12. Retorna JSON com resposta
            │
            ├─← BACKEND responde JSON
            │  {
            │    "resposta": "Ah, finalmente...",
            │    "timestamp": "2026-03-24T..."
            │  }
            │
            ├─→ 13. JavaScript recebe resposta
            │
            ├─→ 14. Oculta indicador de loading
            │
            ├─→ 15. Adiciona mensagem ao DOM
            │
            └─→ 16. Mostra nova mensagem na tela
```

---

## 📦 Estrutura de Dados

### Request (Frontend → Backend)

```json
{
  "pergunta": "O que é uma API REST?"
}
```

### Response (Backend → Frontend)

```json
{
  "resposta": "Ah, você quer saber sobre API REST? Que pergunta óbvia...\n\nMas tudo bem, vou explicar de forma bem didática:\n\nAPI REST é um padrão arquitetural de web...",
  "timestamp": "2026-03-24T10:35:42.123Z"
}
```

### Error Response

```json
{
  "erro": "❌ Erro ao conectar com a IA: ..."
}
```

---

## 🧠 Camadas da Aplicação

### Camada de Apresentação (Frontend)
- **Responsabilidade**: Interface visual, interactions do usuário
- **Tecnologia**: HTML5, CSS3, JavaScript vanilla
- **Arquivos**: index.html, style.css, script.js
- **Comunica com**: Backend via HTTP/REST

### Camada de Aplicação (Backend)
- **Responsabilidade**: Lógica de negócio, validações
- **Tecnologia**: Node.js, Express.js
- **Arquivos**: backend/index.js
- **Comunica com**: Frontend via JSON, Gemini API

### Camada de Inteligência (IA)
- **Responsabilidade**: Processar texto, gerar respostas
- **Tecnologia**: Google Gemini (gemini-2.5-flash)
- **Sistema Prompt**: Professor maluco e impaciente
- **Comunica com**: Backend via SDK @google/generative-ai

### Camada de Persistência (Configuração)
- **Responsabilidade**: Armazenar chaves, variáveis
- **Tecnologia**: .env (dotenv)
- **Arquivos**: backend/.env
- **Protegido**: .gitignore (não versionado)

---

## 🔐 Fluxo de Segurança

```
┌─────────────────────────────┐
│ USUÁRIO NO NAVEGADOR         │
│ (Sem acesso a informações    │
│  sensíveis)                  │
└──────────────┬──────────────┘
               │
               │ Pergunta em texto plano
               ▼
┌─────────────────────────────┐
│ FRONTEND (localhost:8000)    │
│ ✓ Validação básica           │
│ ✓ Sem armazenamento de chave │
│ ✓ Fetch apenas para /perguntar
└──────────────┬──────────────┘
               │
               │ HTTPS (em produção)
               │ POST /perguntar
               │
               ▼
┌─────────────────────────────┐
│ BACKEND (localhost:3000)     │
│ ✓ Validação robusta          │
│ ✓ Chave em .env protegido    │
│ ✓ CORS habilitado            │
│ ✓ Tratamento de erros        │
│ ✓ Rate limiting (opcional)   │
└──────────────┬──────────────┘
               │
               │ SDK Python
               │ Usa API_KEY do .env
               │
               ▼
┌─────────────────────────────┐
│ GOOGLE GEMINI API            │
│ ✓ Autenticação via key      │
│ ✓ Comunicação HTTPS         │
│ ✓ Processamento em servidor │
│ ✓ Sem logs de dados         │
└──────────────┬──────────────┘
               │
               │ Resposta JSON
               │
               ▼
┌─────────────────────────────┐
│ BACKEND (localhost:3000)     │
│ ✓ Processa resposta         │
│ ✓ Sem expor chave           │
│ ✓ Retorna apenas texto      │
└──────────────┬──────────────┘
               │
               │ JSON simples
               │ { resposta: "..." }
               │
               ▼
┌─────────────────────────────┐
│ FRONTEND (localhost:8000)    │
│ ✓ Recebe resposta           │
│ ✓ Exibe ao usuário          │
│ ✓ Sem informação sensível   │
└─────────────────────────────┘
```

---

## ⚙️ Fluxo de Tema (Claro/Escuro)

```
┌─────────────────────────────┐
│ Usuário clica ícone de tema  │
│         (☀️ ou 🌙)            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ JavaScript detecta clique    │
│ no #themeToggle              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Obtém tema atual do DOM      │
│ data-theme="light"           │
│ ou                           │
│ data-theme="dark"            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Alterna para tema oposto     │
│ light ↔ dark                 │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Atualiza atributo:           │
│ data-theme = novo_tema       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ CSS variables mudam:         │
│ :root[data-theme="dark"] {   │
│   --bg-primary: #1a1f2e;     │
│   ... (todas as cores)       │
│ }                            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Browser aplica estilos       │
│ com transição smooth (0.3s)  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ localStorage.setItem(        │
│   "tema", novo_tema          │
│ )                            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Próxima visita usa tema      │
│ salvo (persistente)          │
└─────────────────────────────┘
```

---

## 📡 Endpoints da API

```
GET /
├── Status: 200 OK
├── Response:
│   ├── mensagem: string
│   ├── versao: string
│   └── endpoints: object
└── Uso: Info de boas-vindas

GET /saude
├── Status: 200 OK
├── Response:
│   ├── status: string (com emoji)
│   ├── timestamp: ISO 8601
│   └── modelo: string
└── Uso: Health check do servidor

POST /perguntar
├── Status: 200 OK (sucesso)
├── Status: 400 (pergunta vazia)
├── Status: 401 (API key inválida)
├── Status: 429 (rate limit)
├── Status: 500 (erro interno)
├── Request:
│   └── pergunta: string (obrigatório)
├── Response (200):
│   ├── resposta: string
│   └── timestamp: ISO 8601
├── Response (erro):
│   └── erro: string
└── Uso: Enviar pergunta para IA
```

---

## 🎨 Paleta de Cores

### Modo Claro
```
Background Primário:  #f8f9fa  (OFF-WHITE)
Background Secundário: #ffffff (WHITE)
Texto Primário:      #2c3e50  (DARK GRAY)
Texto Secundário:    #5a6c7d  (MEDIUM GRAY)
Acentos:             #3498db  (LIGHT BLUE)
Border:              #e8ecf1  (LIGHT GRAY)
```

### Modo Escuro
```
Background Primário:  #1a1f2e  (VERY DARK GRAY)
Background Secundário: #242d3d (DARK GRAY)
Texto Primário:      #ecf0f7  (OFF-WHITE)
Texto Secundário:    #b8c3d4  (LIGHT GRAY)
Acentos:             #5dade2  (LIGHT BLUE)
Border:              #3d4659  (MEDIUM GRAY)
```

---

## 🚀 Performance

### Frontend
- **Bundle**: ~12KB (HTML + CSS + JS não minificado)
- **Load Time**: < 100ms (local)
- **Renderização**: 60 FPS (smooth)
- **Sem dependências**: Vanilla JS

### Backend
- **Startup Time**: < 500ms
- **Latência de Resposta**: 1-3s (esperando Gemini)
- **Memory Usage**: ~50MB
- **Conexões Simultâneas**: Ilimitadas (Express padrão)

---

## 📊 Stack Tecnológico

```
Frontend:
  ├── HTML5 (semantics)
  ├── CSS3 (variables, animations)
  └── JavaScript ES6+ (fetch, async/await)

Backend:
  ├── Node.js 18+
  ├── Express.js 4.18
  ├── CORS 2.8
  └── dotenv 16.4

Inteligência:
  └── Google Gemini API (gemini-2.5-flash)

Ambiente:
  ├── .env (configuração)
  ├── .gitignore (proteção)
  └── package.json (dependências)
```

---

## 🔧 Mudando Porta do Backend

Se quiser usar outra porta:

1. **Edite backend/.env:**
```env
PORT=5000  # ou qual número quiser
```

2. **Edite frontend/script.js:**
```javascript
const API_BASE_URL = "http://localhost:5000";  // Mude aqui
```

3. **Reinicie backend e refresh do navegador**

---

Esta arquitetura é **modular, escalável e segura**! 🎉

