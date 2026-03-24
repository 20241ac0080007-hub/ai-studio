# 🚀 DEPLOY - Agente IA Web

Guia para publicar sua aplicação em produção (opcional).

---

## 📍 Resumo das Opções

| Opção | Frontend | Backend | Dificuldade | Custo |
|-------|----------|---------|-------------|-------|
| **Local** | localhost:8000 | localhost:3000 | ⭐ Fácil | Grátis |
| **Vercel + Railway** | Vercel (FREE) | Railway (FREE) | ⭐⭐ Médio | Grátis |
| **Netlify + Heroku** | Netlify (FREE) | Heroku (PAGO) | ⭐⭐ Médio | ~$5/mês |
| **AWS** | CloudFront/S3 | EC2/Lambda | ⭐⭐⭐ Difícil | Variável |
| **Full Stack** | Vercel | Railway | ⭐⭐ Médio | Grátis |

**Recomendado: Vercel + Railway (ambos grátis e fáceis)** ✅

---

## 🎯 Opção 1: Vercel + Railway (RECOMENDADO)

### Parte 1: Deploy Frontend no Vercel

#### 1. Prepare o Frontend

```bash
# Você só precisa dos arquivos:
# frontend/index.html
# frontend/style.css
# frontend/script.js
```

#### 2. Crie conta no Vercel

1. Acesse https://vercel.com
2. Clique "Sign Up"
3. Use GitHub, GitLab, GitBucket ou email

#### 3. Deploy do Frontend

**Opção A: Via GitHub (Recomendado)**

```bash
# Crie repositório Git local
cd seu-projeto
git init
git add .
git commit -m "Initial commit"

# Crie repo no GitHub
# https://github.com/new

# Push para GitHub
git remote add origin https://github.com/seu_usuario/seu_repo.git
git branch -M main
git push -u origin main
```

Depois no Vercel:
1. Clique "New Project"
2. Selecion seu repositório GitHub
3. Configure raiz do projeto: `frontend`
4. Clique "Deploy"

**Opção B: Via Upload Direto**

1. No Vercel, clique "Create"
2. Selecione "Other"
3. Upload arquivos `frontend/`

#### 4. Configure Variável de Environment

1. Vá em Project Settings
2. Clique "Environment Variables"
3. Adicione: `VITE_API_URL=https://seu-backend.railway.app`
4. Atualize `frontend/script.js`:

```javascript
// Detectar se está em produção
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3000";
```

#### 5. Resultado

Frontend estará em:
```
https://seu-projeto.vercel.app
```

---

### Parte 2: Deploy Backend no Railway

#### 1. Prepare o Backend

```bash
# Arquivo: Procfile (crie na raiz do backend/)
web: node index.js

# Se não fez, crie:
cd backend
echo "web: node index.js" > Procfile
```

#### 2. Crie Conta Railway

1. Acesse https://railway.app
2. Clique "Start Project"
3. Use GitHub

#### 3. Deploy Backend

**Via GitHub:**

```bash
# Make sure código está no GitHub
git add backend/
git commit -m "Add backend"
git push
```

No Railway:
1. Clique "New Project"
2. Selecione "Deploy from GitHub"
3. Escolha seu repositório
4. Railway detectará Node.js automaticamente

**Adicionar Variáveis de Ambiente:**

1. Em Railway, vá para seu projeto
2. Clique em "Backend Service"
3. Vá para "Variables"
4. Adicione:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   PORT=3000
   NODE_ENV=production
   ```

#### 4. Resultado

Backend estará em:
```
https://seu-backend.railway.app
```

#### 5. Conectar Frontend + Backend

Atualize `frontend/script.js`:

```javascript
const API_BASE_URL = "https://seu-backend.railway.app";
```

Em produção, redeploye o frontend no Vercel.

---

## 🔄 Opção 2: Netlify + Heroku

### Fork Fork Fork

Netlify (Frontend) + Heroku (Backend)

**Netlify:**
1. https://netlify.com → Sign up
2. "New site from Git" → conecte GitHub
3. Build command: deixe vazio (é só HTML/CSS/JS)
4. Publish directory: `frontend`
5. Deploy!

**Heroku:**
1. https://heroku.com → Sign up
2. "New" → "Create new app"
3. Conecte GitHub
4. Autorize Heroku
5. Deploy!

⚠️ **Heroku ficou pago**, portanto Railway é melhor opção.

---

## 🔒 Checklist Antes de Deploy

- [ ] Testes locais passando
- [ ] Sem console.log com dados sensíveis
- [ ] API Key **não** está em código
- [ ] CORS configurado para seu domínio
- [ ] HTTPS habilitado (automático em Vercel/Railway)
- [ ] Variáveis de ambiente configuradas
- [ ] Buffer de erro tratado
- [ ] Rate limiting implementado (opcional)

---

## 🔐 Configuração de Produção

### Backend (index.js) - Adicione ao topo:

```javascript
// Aceitar produção
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// CORS em produção
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

// Desabilitar x-powered-by header
app.disable('x-powered-by');
```

### Frontend (script.js) - Atualize:

```javascript
// Detectar ambiente
const isDev = !window.location.hostname.includes('.') || 
              window.location.hostname === 'localhost';

const API_BASE_URL = isDev 
  ? "http://localhost:3000"
  : "https://seu-backend.railway.app";
```

---

## 📊 Monitoramento Pós-Deploy

### Railway Dashboard
- CPU/Memory usage
- Logs
- Analytics
- Error tracking

### Vercel Analytics
- Performance
- Web Vitals
- User analytics

### Configurar Alertas

**Railway:**
1. Project Settings
2. Notifications
3. Slack/Email

**Vercel:**
1. Project Settings
2. Integrations
3. Slack

---

## 🐛 Troubleshooting Deploy

### Erro: "Cannot find module"
```bash
# No Railway, ver logs:
cd backend && npm install
```

### Erro: "API not responding"
- Verifique `GEMINI_API_KEY` em Railway
- Verifique `API_BASE_URL` em Vercel
- Cheque timezone (pode afetar rate limit)

### CORS Error em Produção
```javascript
// Configure CORS correto
app.use(cors({
  origin: 'https://seu-frontend.vercel.app',
  credentials: true
}));
```

### Pedir demais à API
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: 100  // máx 100 requests
});

app.use('/perguntar', limiter);
```

---

## 💰 Custo Estimado

| Serviço | Preço | Observação |
|---------|-------|-----------|
| Vercel | Grátis | Incluso (~100k funções/mês) |
| Railway | Grátis | $5/project/mês depois |
| Google Gemini | Grátis | Quota mensal incluída |
| Total | **~$0-5/mês** | Muito barato! |

---

## 🎓 Documentação das Plataformas

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Heroku Docs](https://devcenter.heroku.com) (pago agora)

---

## 📱 Testar Produção Localmente

Antes de fazer deploy real, simule produção:

```bash
# Terminal 1
NODE_ENV=production npm start

# Terminal 2 - em outro diretório
cd frontend
python -m http.server 8000

# Navegador
http://localhost:8000
```

---

## 🗺️ Próximas Ideias (Após Deploy)

- [ ] Custom domain (MeuApp.com.br)
- [ ] Email notifications
- [ ] Analytics e telemetria
- [ ] Auto-backup do histórico
- [ ] Webhooks para Discord/Slack
- [ ] API pública para terceiros
- [ ] App mobile com React Native
- [ ] Suporte a múltiplos usuários

---

## ✅ Resumo

**Caminho mais rápido para produção (em 30 minutos):**

1. Criar conta Vercel
2. Deploy frontend via GitHub
3. Criar conta Railway
4. Deploy backend via GitHub
5. Configurar variáveis de ambiente
6. Testar URLs
7. Launch! 🚀

**Custo:** Grátis (até certo ponto)

**Resultado:**
```
Frontend: https://seu-app.vercel.app
Backend:  https://seu-app.railway.app
```

---

Boa sorte no deploy! 🎉

