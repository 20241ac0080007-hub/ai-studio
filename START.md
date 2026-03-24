# 🚀 INICIAR A APLICAÇÃO

## Primeiro: Preparar Backend

```bash
cd backend
npm install
npm start
```

Aguarde até ver:
```
🚀 Servidor rodando em: http://localhost:3000
```

## Segundo: Abrir Frontend (novo terminal)

```bash
cd frontend
python -m http.server 8000
```

Ou abra `frontend/index.html` no navegador.

## Terceiro: Acessar

```
http://localhost:8000
```

---

## ⚠️ Se não funcionar

**Erro: "Cannot find module"**
```bash
cd backend
npm install
npm start
```

**Erro: "ERR_CONNECTION_REFUSED"**
- Verifique se o backend está rodando (Terminal 1)
- Verifique se mostra "Servidor rodando em: http://localhost:3000"
- Se não mostra, volte ao passo anterior

**Erro: "Blank page"**
- F5 para refresh
- Verifique console (F12) para mensagens de erro

---

## ✅ Quando funcionar

Você verá a interface web com:
- Campo para digitar pergunta
- Botão "Perguntar"
- Área onde a IA responde

Pronto! 🎉
