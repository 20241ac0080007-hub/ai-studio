# 📡 TESTE DA API - Agente IA Backend

## 🧪 Como Testar a API

Após iniciar o backend (`npm start` na pasta `backend/`), você pode testar os endpoints usando:

- ✅ **curl** (linha de comando)
- ✅ **Postman** (aplicação)
- ✅ **Thunder Client** (VS Code)
- ✅ **Python requests**
- ✅ **JavaScript fetch**

---

## 1️⃣ POST /perguntar - Enviar Pergunta

### cURL (Windows CMD)
```cmd
curl -X POST http://localhost:3000/perguntar ^
  -H "Content-Type: application/json" ^
  -d "{\"pergunta\": \"O que é uma API REST?\"}"
```

### cURL (macOS/Linux)
```bash
curl -X POST http://localhost:3000/perguntar \
  -H "Content-Type: application/json" \
  -d '{"pergunta": "O que é uma API REST?"}'
```

### PowerShell
```powershell
$body = @{
    pergunta = "O que é uma API REST?"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/perguntar" `
  -Method POST `
  -Headers @{"Content-Type" = "application/json"} `
  -Body $body
```

### Python
```python
import requests
import json

url = "http://localhost:3000/perguntar"
headers = {"Content-Type": "application/json"}
data = {"pergunta": "O que é uma API REST?"}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

### JavaScript (Node.js)
```javascript
const fetch = require('node-fetch');

const pergunta = "O que é uma API REST?";

fetch('http://localhost:3000/perguntar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pergunta })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### Response (Sucesso - 200)
```json
{
  "resposta": "Ah, você quer saber sobre API REST? Que pergunta óbvia...\n\nMas tudo bem, vou explicar de forma bem didática:\n\nAPI REST é um padrão arquitetural de web que...",
  "timestamp": "2026-03-24T10:35:42.123Z"
}
```

### Response (Erro - 400)
```json
{
  "erro": "Pergunta vazia. Digite algo para o professor responder!"
}
```

### Response (Erro - 401)
```json
{
  "erro": "❌ Erro de autenticação! Verifique a configuração da API key."
}
```

### Response (Erro - 500)
```json
{
  "erro": "❌ Erro ao conectar com a IA: ..."
}
```

---

## 2️⃣ GET /saude - Verificar Status

### cURL
```bash
curl http://localhost:3000/saude
```

### PowerShell
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/saude" -Method GET
```

### Python
```python
import requests
response = requests.get("http://localhost:3000/saude")
print(response.json())
```

### Response
```json
{
  "status": "🟢 Agente IA rodando normalmente",
  "timestamp": "2026-03-24T10:35:42.123Z",
  "modelo": "gemini-2.5-flash"
}
```

---

## 3️⃣ GET / - Informações do Servidor

### cURL
```bash
curl http://localhost:3000/
```

### Python
```python
import requests
response = requests.get("http://localhost:3000/")
print(response.json())
```

### Response
```json
{
  "mensagem": "🤖 Bem-vindo ao Agente IA Backend!",
  "versao": "1.0.0",
  "endpoints": {
    "/perguntar": "POST - Envie uma pergunta",
    "/saude": "GET - Verificar status do servidor",
    "/": "GET - Este endpoint"
  }
}
```

---

## 🔧 Postman Collection

### Importar para Postman

1. Abra **Postman**
2. Clique em **Import**
3. Escolha **Paste Raw Text**
4. Cole o JSON abaixo
5. Clique **Import**

```json
{
  "info": {
    "name": "Agente IA API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Perguntar",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"pergunta\": \"O que é uma API REST?\"}"
        },
        "url": {
          "raw": "http://localhost:3000/perguntar",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["perguntar"]
        }
      }
    },
    {
      "name": "Saúde",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/saude",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["saude"]
        }
      }
    },
    {
      "name": "Home",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": [""]
        }
      }
    }
  ]
}
```

---

## 🧪 Script de Teste Automático

### test.sh (macOS/Linux)
```bash
#!/bin/bash

echo "🧪 Testando Agente IA API..."
echo ""

# 1. Teste /saude
echo "1️⃣  Testando GET /saude"
curl http://localhost:3000/saude
echo ""
echo ""

# 2. Teste / (Home)
echo "2️⃣  Testando GET /"
curl http://localhost:3000/
echo ""
echo ""

# 3. Teste /perguntar
echo "3️⃣  Testando POST /perguntar"
curl -X POST http://localhost:3000/perguntar \
  -H "Content-Type: application/json" \
  -d '{"pergunta": "O que é JavaScript?"}'
echo ""
echo ""

echo "✅ Testes completos!"
```

### test.bat (Windows)
```batch
@echo off
echo 🧪 Testando Agente IA API...
echo.

echo 1️⃣  Testando GET /saude
curl http://localhost:3000/saude
echo.
echo.

echo 2️⃣  Testando GET /
curl http://localhost:3000/
echo.
echo.

echo 3️⃣  Testando POST /perguntar
curl -X POST http://localhost:3000/perguntar ^
  -H "Content-Type: application/json" ^
  -d "{\"pergunta\": \"O que é JavaScript?\"}"
echo.
echo.

echo ✅ Testes completos!
pause
```

---

## 📊 Códigos HTTP Esperados

| Código | Significado | Exemplo |
|--------|-------------|---------|
| **200** | OK | Pergunta processada com sucesso |
| **400** | Bad Request | Pergunta vazia ou JSON malformado |
| **401** | Unauthorized | API key inválida |
| **429** | Too Many Requests | Rate limit atingido |
| **500** | Server Error | Erro interno do servidor |
| **404** | Not Found | Rota não existe |

---

## 💡 Dicas para Testar

1. **Comece simples**: Teste `/saude` primeiro
2. **Valide JSON**: Use [jsonlint.com](https://jsonlint.com)
3. **Verifique encoding**: Use UTF-8 para acentos
4. **Mire logs**: Veja o terminal do backend para erros
5. **Incremente complexidade**: Comece com perguntas simples

---

## 🚀 Exemplo de Integração

Se você está integrando com outro frontend/app:

```javascript
// Função utilitária
async function perguntarAIA(pergunta) {
  try {
    const response = await fetch('http://localhost:3000/perguntar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const { resposta, timestamp } = await response.json();
    return { resposta, timestamp };

  } catch (error) {
    console.error('Erro ao conectar com a IA:', error);
    throw error;
  }
}

// Usar
perguntarAIA('Explique closures em JavaScript')
  .then(({ resposta }) => console.log(resposta))
  .catch(err => console.error(err));
```

---

Sucesso nos testes! 🎉
