# Site Institucional — Dra. Leilane dos Santos

Website institucional completo, moderno, responsivo e elegante da **Dra. Leilane dos Santos** (Advogada — OAB/RO 11028 | OAB/SC 67136-A).

O projeto foi concebido para transmitir **seriedade, confiança, sofisticação, ética e atendimento individualizado**, sem apresentar o negócio como um grande escritório de advocacia ou sociedade de advogados. Todo o atendimento é pessoal e conduzido diretamente pela advogada.

---

## Documentação do Projeto

Antes de realizar qualquer alteração ou manutenção no projeto, consulte a documentação detalhada:

1. [Requisitos Gerais](./requisitos.md) — Diretrizes de negócio, escopo e regras fundamentais.
2. [Identidade Visual](./docs/identidade-visual.md) — Paleta de cores oficial, tipografia, símbolo e diretrizes de design.
3. [Conteúdo e Canais](./docs/conteudo.md) — Textos canônicos, áreas de atuação, OABs, contatos e conformidade ética.
4. [Referências Visuais](./docs/referencias.md) — Relação dos materiais originais e ativos derivados.
5. [Instruções para Agentes IA](./AGENTS.md) — Regras de preservação da marca e prioridades documentais.

---

## Estrutura de Diretórios

O repositório está organizado nas seguintes pastas e arquivos:

```text
Site_LeilaneAdv/
├── docs/                        # Documentação técnica e de negócio
│   ├── identidade-visual.md     # Guia de cores, tipografia e design system
│   ├── conteudo.md              # Textos canônicos, OABs e contatos oficiais
│   ├── referencias.md           # Catálogo dos materiais originais e derivados
│   ├── cartão_símbolo_adv.pdf   # Arquivo fonte do cartão de visitas original
│   └── descrição_especialização.jpeg # Arquivo fonte do perfil com retrato
│
├── public/                      # Ativos estáticos públicos servidos pelo Vite
│   ├── assets/                  # Ativos vetoriais e imagens otimizadas para web
│   │   ├── balanca.svg          # Símbolo oficial da balança da Justiça
│   │   ├── mapa-brasil.svg      # Mapa minimalista com destaque para RO e SC
│   │   ├── dra_leilane_foto_400.webp # Retrato oficial otimizado em alta definição
│   │   ├── dra_leilane_foto_400.jpg  # Retrato oficial em formato JPEG
│   │   ├── dra_leilane_circulo.png   # Retrato com transparência circular
│   │   ├── logo_transparente.png     # Logotipo completo oficial com canal alfa
│   │   └── cartao_page_1.png         # Render de alta resolução do cartão
│   ├── referencias/             # Arquivos de referência originais fornecidos
│   │   ├── cartao-visita.pdf
│   │   └── whatsapp-perfil.jpg
│   ├── screenshots/             # Capturas de tela de testes (desktop, tablet, mobile)
│   └── favicon.svg              # Favicon vetorial oficial da balança
│
├── src/                         # Código-fonte principal da aplicação
│   ├── main.js                  # Lógica interativa (navbar, menu mobile, reveal, form)
│   └── style.css                # Design system completo em Vanilla CSS moderno
│
├── scripts/                     # Scripts auxiliares e de automação
│   └── take_screenshots.js      # Captura automatizada de telas com Playwright
│
├── index.html                   # Estrutura semântica principal (One-page institucional)
├── package.json                 # Dependências e scripts do projeto
├── requisitos.md                # Requisitos de alto nível do projeto
├── AGENTS.md                    # Regras para agentes de inteligência artificial
└── README.md                    # Apresentação do projeto e instruções de uso
```

---

## Identidade Visual e Design System

- **Paleta de Cores Oficial:**
  - Azul-marinho Principal: `#08131F`
  - Azul-marinho Secundário: `#0D1B2A`
  - Dourado Nobre Principal: `#B9904A`
  - Dourado Claro: `#D2AC63`
  - Off-white Editorial: `#F7F4EE`
  - Cinza Textos Secundários: `#929AA3`
- **Tipografia:**
  - Títulos: *Cormorant Garamond* / *Playfair Display* (Google Fonts)
  - Textos & Interface: *Inter* (Google Fonts)
- **Ativos Oficiais:** Símbolo da balança da Justiça vetorizado a partir do material original do cartão profissional e fotografia oficial da advogada tratada para displays Retina/4K.

---

## Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (ou pnpm / yarn)

### Passo a Passo

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a URL exibida no terminal (normalmente `http://localhost:5173/`).

3. **Gerar a versão de produção:**
   ```bash
   npm run build
   ```
   Os arquivos finais otimizados serão gerados na pasta `/dist`.

4. **Visualizar a versão compilada de produção:**
   ```bash
   npm run preview
   ```

5. **Executar a suíte de testes automatizados (Playwright):**
   ```bash
   npm test
   ```
   Valida consentimento LGPD, honeypot anti-bot, deofuscação de contatos, CTAs dinâmicos e responsividade mobile/desktop.

6. **(Opcional) Capturar screenshots de verificação:**
   ```bash
   npm run screenshot
   ```

---

## Conformidade Ética e Deontológica (OAB)

Este projeto foi construído em observância estrita às normas do **Código de Ética e Disciplina da OAB** e do **Provimento nº 205/2021**:
- O conteúdo é puramente informativo, transparente e sóbrio;
- Não há mercantilização, promessas de causas ganhas ou captação indevida de clientela;
- Não inventa dados sobre experiência, equipe ou especializações não documentadas;
- O atendimento é pessoal, realizado e acompanhado diretamente pela **Dra. Leilane dos Santos**.

---

## Licença e Direitos
© Criado por Alliky Rodrigo
© 2026 Dra. Leilane dos Santos. Todos os direitos reservados.