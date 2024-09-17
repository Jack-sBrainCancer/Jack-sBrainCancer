const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Certificados SSL
const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.crt'),
    ca: fs.readFileSync('ca_bundle.crt'), // se necessário
};

const app = express();
const PORT = 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota de exemplo (opcional, você pode remover se não precisar)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicie o servidor no endereço Tailscale
https.createServer(options, app).listen(PORT, '100.92.219.65', () => {
    console.log(`Servidor executando em https://100.92.219.65:${PORT}`);
});
