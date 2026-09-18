# Portfolio Nina Missir

Site vitrine multi-pages pour **Nina Missir** — peintre muraliste & illustratrice (Nantes).

## Stack

- [Eleventy](https://www.11ty.dev/) v3+ (SSG)
- [Decap CMS](https://decapcms.org/) v3+ (gestion de contenu Git-based)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Netlify Forms](https://docs.netlify.com/forms/setup/) (devis & contact)

## Structure

```
src/
├── content/          # Pages, services, projets (Markdown)
├── _includes/        # Layouts Nunjucks & composants
├── _data/            # site.json, navigation.json
├── assets/           # CSS, JS, images
└── admin/            # Decap CMS (/admin en local)
```

## Commandes

```bash
npm install
npm run build    # génère _site/
npm run dev      # http://localhost:43124
```

- **Site** : http://localhost:43124
- **Decap CMS** : http://localhost:43124/admin (nécessite Netlify Identity en production)

## Déploiement Netlify

1. Connecter le dépôt GitHub
2. Build : `npm run build` — Publish : `_site`
3. Activer Git Gateway pour Decap CMS (Settings → Access control)

## Contenu

Les textes placeholder reprennent les informations publiques sur Nina Missir (Nantes, fresques, vitrines, Atelier D&N). Les visuels SVG sont des placeholders à remplacer par des photos réelles via Decap CMS.
