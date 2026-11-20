# Site de download — NOVA OS

Site estático para apresentar o NOVA OS 1.1.0 e oferecer os dois executáveis.

## Abrir localmente

Abra `index.html` no navegador. Não precisa de servidor, npm ou build.

Os botões de download apontam para:

- `downloads/NOVA OS.exe`
- `downloads/NOVA OS Setup.exe`

O clique baixa direto para o PC.

## Trocar os links para GitHub Releases

Quando publicar os arquivos em uma Release, edite **apenas** o objeto `SITE` no topo de `js/site.js`:

```js
var SITE = {
  version: '1.1.0',
  downloads: {
    portable: 'https://github.com/USUARIO/nova-os/releases/latest/download/NOVA-OS-Portable.exe',
    setup: 'https://github.com/USUARIO/nova-os/releases/latest/download/NOVA-OS-Setup.exe'
  },
  ...
};
```

Recomendação: nomear os assets da Release sem espaços (`NOVA-OS-Portable.exe`, `NOVA-OS-Setup.exe`) para evitar encoding de URL. Os arquivos locais mantêm os nomes originais.

O `site.js` detecta automaticamente se o link é externo e aplica `target="_blank"` + `rel="noopener noreferrer"`. Para links locais, aplica o atributo `download`.

## Atualizar versão

1. Trocar `version` em `js/site.js`.
2. Trocar a lista do changelog em `index.html`.
3. Rodar `npm run dist` na raiz do projeto.
4. Copiar os novos `.exe` para `downloads/`.
5. Gerar de novo o `SHA256SUMS.txt`:

```powershell
$a = (Get-FileHash 'downloads\NOVA OS.exe' -Algorithm SHA256).Hash.ToLowerInvariant()
$b = (Get-FileHash 'downloads\NOVA OS Setup.exe' -Algorithm SHA256).Hash.ToLowerInvariant()
Set-Content -Path 'downloads\SHA256SUMS.txt' -Value @("$a  NOVA OS.exe", "$b  NOVA OS Setup.exe") -Encoding UTF8
```

6. Atualizar os hashes em `js/site.js` (`SITE.checksums`).
7. Atualizar os tamanhos em `js/site.js` (`SITE.sizes`) se mudarem.

## Screenshots

As imagens em `assets/screenshots/` foram capturadas do executável empacotado via CDP, em 1440×900, convertidas para WebP.

Para recapturar:

1. Rodar `dist\NOVA OS.exe --remote-debugging-port=9222`.
2. Usar `Page.captureScreenshot` via CDP nos estados desejados.
3. Converter para WebP com `sharp` (qualidade 85).

## Regras

- HTML5 + CSS3 + JavaScript vanilla.
- Sem framework, sem CDN, sem npm, sem build.
- Sem `alert()`, `prompt()`, `confirm()`, `eval()` ou `new Function()`.
- Sem analytics, cookies ou coleta de dados.
- Nenhum arquivo do NOVA OS em `index.html`, `css/`, `js/` ou `Sons/` foi modificado.
