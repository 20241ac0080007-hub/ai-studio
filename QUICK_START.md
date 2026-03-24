# ⚡ INÍCIO RÁPIDO - Agente IA Web

## 🚀 3 Passos para Começar

### Passo 1: Instalar Dependências do Backend

```bash
cd backend
npm install
```

**Resultado esperado:**
```
added X packages
```

### Passo 2: Iniciar o Backend

```bash
cd backend
npm start
```

**Resultado esperado:**
```
╔════════════════════════════════════════╗
║  🤖 AGENTE IA - BACKEND               ║
║  Powered by Google Gemini API          ║
╚════════════════════════════════════════╝

🚀 Servidor rodando em: http://localhost:3000
```

✅ **Backend está pronto!** Deixe este terminal aberto.

### Passo 3: Abrir o Frontend

Abra um **novo terminal** e escolha UMA opção:

**Opção A - Live Server (Recomendado)**
- Clique com botão direito em `frontend/index.html`
- Selecione "Open with Live Server"

**Opção B - Python**
```bash
cd frontend
python -m http.server 8000
```

Acesse: http://localhost:8000

**Opção C - Abrir arquivo direto**
```bash
# Windows
cd frontend && start index.html

# macOS
cd frontend && open index.html

# Linux
cd frontend && xdg-open index.html
```

## ✅ Pronto!

Você agora tem uma aplicação funcionando com:
- ✨ Interface web moderna
- 🎨 Modo claro/escuro
- 🧠 IA sarcástica respondendo
- 📱 Responsivo em qualquer tela

## 💡 Dicas Rápidas

| Feature | Como Usar |
|---------|-----------|
| **Enviar Pergunta** | Digite e clique "Perguntar" |
| **Atalho Teclado** | Ctrl+Enter |
| **Mudar Tema** | Clique o botão 🌙/☀️ no canto superior direito |
| **Limpar Chat** | Ctrl+Shift+L |
| **Ver Status** | Acesse http://localhost:3000/saude |

## 🐛 Algo Deu Errado?

### Backend não inicia
```
✗ "EADDRINUSE: address already in use :::3000"
```
**Solução:** Outra aplicação usa a porta 3000
```bash
# Windows - Liberar porta
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# macOS/Linux
lsof -i :3000
kill -9 <pid>
```

### Frontend não conecta ao backend
- Verifique se o backend está rodando
- Abra o console do navegador (F12)
- Veja a mensagem de erro exata

### "Cannot find module"
```bash
# Reinstalar tudo
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📖 Documentação Completa

Para entender melhor toda a aplicação, leia [WEB_README.md](WEB_README.md)

---

Pronto! Agora pergunte ao professor maluco qualquer coisa sobre programação! 🤖😄
