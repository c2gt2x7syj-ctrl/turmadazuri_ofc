# Turma da Zuri — site

Site da série infantil Turma da Zuri: a turma, o episódio mais recente, desenhos para colorir em PDF e atividades para fazer em casa.

## Estrutura

```
index.html               página única do site
css/style.css            estilos, cores e a tipografia com contorno
js/main.js               menu do celular e o jogo "Quem sou eu?"
img/                     imagens do site (WebP)
colorir/                 PDFs A4 para baixar e imprimir
fonts/                   coloque aqui os arquivos da Armin Soft
```

## Fonte Armin Soft

A Armin Soft é uma fonte paga (W Type Foundry). Depois de comprar a licença para web, coloque os arquivos na pasta `fonts/` com estes nomes:

- `ArminSoft-Black.woff2` (títulos)
- `ArminSoft-SemiBold.woff2` (destaques)
- `ArminSoft-Regular.woff2` (textos)

Também funciona com `.otf` de mesmo nome. Enquanto os arquivos não estiverem lá, o site usa a Nunito, uma fonte gratuita parecida.

## Publicar no GitHub Pages

1. Envie todos os arquivos desta pasta para o repositório `turmadazuri` (a `index.html` precisa ficar na raiz).
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`. Salve.
4. Em alguns minutos o site fica no ar em `https://c2gt2x7syj-ctrl.github.io/turmadazuri/`.

Para usar um domínio próprio (por exemplo `turmadazuri.com.br`), registre o domínio e informe-o no campo **Custom domain** da mesma página.

## Links das redes

O YouTube aponta para `@turmadazuri-b1l`; Instagram e TikTok, para `@turmadazuri`. Se algum @ for diferente, troque no arquivo.

## Vozes dos jogos

Os jogos tocam um áudio por fala, com a voz de cada personagem, a partir de `audio/<personagem>/<nome>.mp3`. A lista completa de falas fica em `js/vozes.js`. Quando um áudio não existe, o site usa a voz do navegador só naquela fala.

O roteiro do que falta gravar está em `audio/ROTEIRO-DE-VOZES.md`. Para cortar uma gravação longa em um arquivo por frase:

```
python3 ferramentas/dividir_vozes.py zuri zuri-falas.wav audio js/vozes.js
```

## Publicar na Vercel

1. No GitHub, abra o repositório `turmadazuri` → **Add file → Upload files** e arraste **tudo o que está dentro** da pasta `site` (não a pasta em si: o `index.html` precisa ficar na raiz). Clique em **Commit changes**.
2. Em vercel.com, entre com a conta do GitHub → **Add New… → Project** → escolha `turmadazuri` → **Import**.
3. Framework Preset: **Other**. Não precisa de comando de build. Clique em **Deploy**.
4. Pronto: o site fica em `turmadazuri.vercel.app` (ou parecido). Toda vez que você subir arquivos novos no GitHub, a Vercel publica sozinha em ~1 minuto.

O arquivo `vercel.json` deixa as imagens e os áudios em cache e garante que mudanças em CSS/JS apareçam na hora.
