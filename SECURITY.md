# 🔐 SEGURANÇA - Agente IA Web

## ✅ O Que Foi Implementado

### 1. **Proteção de API Key**
- ✓ Chave armazenada APENAS em `backend/.env`
- ✓ Arquivo `.env` no `.gitignore` (não versionado)
- ✓ Frontend NUNCA acessa a chave diretamente
- ✓ Validação ao iniciar o servidor

### 2. **CORS (Cross-Origin Resource Sharing)**
- ✓ Habilitado para permitir requisições do frontend
- ✓ Simples apenas para localhost (seguro)
- ✓ Previne ataques de outras origens

### 3. **Validação de Entrada**
- ✓ Backend valida se a pergunta não está vazia
- ✓ Proteção contra requisições malformadas
- ✓ Limites de tamanho (máx 500 caracteres recomendado)

### 4. **Tratamento de Erros**
- ✓ Erros sensatos sem expor detalhes internos
- ✓ Logs no servidor, não no cliente
- ✓ Mensagens amigáveis no frontend

### 5. **Comunicação**
- ✓ HTTPS não necessário em localhost
- ✓ Production: adicione HTTPS + certificado SSL
- ✓ Validação de resposta JSON

## 🚫 O Que NÃO Fazer

| ❌ ERRADO | ✅ CORRETO |
|-----------|-----------|
| `var apiKey = "AIza...";` no código | Usar `process.env.GEMINI_API_KEY` |
| Expor chave em console.log() | Nunca logar dados sensíveis |
| Fazer commit de `.env` | `.env` sempre em `.gitignore` |
| Confiar em validação do frontend | Validar sempre no backend |
| Deixar CORS aberto para qualquer site | Restringir a URLs conhecidas |

## 🔧 Para Produção (Importante!)

### Antes de publicar:

#### 1. HTTPS Obrigatório
```javascript
// Adicionar middleware de redirecionamento
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
```

#### 2. CORS Restritivo
```javascript
// Em vez de aceitar tudo:
const cors = require('cors');
app.use(cors({
  origin: ['https://seu-dominio.com'],
  credentials: true
}));
```

#### 3. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requisições
});

app.use('/perguntar', limiter);
```

#### 4. Variáveis de Ambiente
```bash
# .env (NUNCA comitar!)
GEMINI_API_KEY=AIza...
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://seu-dominio.com
```

#### 5. Helmet.js para Headers de Segurança
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 🔍 Checklist de Segurança

- [ ] `.env` está em `.gitignore`?
- [ ] Nenhuma chave exposta em logs?
- [ ] Backend valida todas as entradas?
- [ ] CORS restrito em produção?
- [ ] HTTPS habilitado em produção?
- [ ] Rate limiting implementado?
- [ ] Dependências atualizadas? (`npm audit`)
- [ ] Variáveis sensíveis nunca no frontend?

## 📊 Verificar Vulnerabilidades

```bash
# Auditoria de segurança npm
npm audit

# Atualizar pacotes seguros
npm audit fix
```

## 🛡️ Boas Práticas

1. **Nunca confiar no cliente**
   - Validar SEMPRE no backend
   - Frontend é só interface

2. **Princípio do Menor Privilégio**
   - API key com permissões mínimas
   - Criar chaves separadas por ambiente

3. **Logging Seguro**
   - Logar erros, NÃO dados sensíveis
   - Exemplo: ❌ `console.log(apiKey)` → ✅ `console.log("API Key configurada")`

4. **Atualizações Constantes**
   - Manter Node.js atualizado
   - Manter dependências seguras
   - `npm audit` regularmente

5. **Monitoramento**
   - Alertas para erros da API
   - Registros de tentativas fracassadas
   - Rate limiting ativo

## 📚 Recursos Importantes

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Google Gemini Security](https://ai.google.dev/docs)

---

**Segurança não é um recurso, é um requisito!** 🔐

