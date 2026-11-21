# Nathan Robert — E-portfolio

**[Voir le portfolio](https://nathan-robert.github.io/)**

Portfolio bilingue **anglais / français** de Nathan Robert, étudiant ingénieur en informatique à l’ENSEEIHT et freelance en IA & Machine Learning chez CPMS.

## Contenu

- **Parcours et compétences** : formation à l’ENSEEIHT, prépa MP2I / MPI, intelligence artificielle, NLP et développement logiciel.
- **Projets** : classification documentaire chez CPMS, simulation de football, Pymon et prédiction de l’expansion urbaine de New Delhi.
- **Expériences** : stage CPMS en fine-tuning de modèles de langage, puis activité freelance.
- **Mobilité** : objectif de double diplôme à Georgia Tech et intérêt pour Polytechnique Montréal.
- **Engagements** : football, force athlétique et bénévolat aux Restos du Cœur.
- **Contact** : LinkedIn, profil GitHub et CV français / anglais téléchargeables.

Le site propose une navigation adaptée au mobile, des filtres de projets et des fiches détaillées en deux langues.

## Fonctionnement

Le portfolio utilise **HTML, CSS et JavaScript**, sans compilation ni serveur applicatif.
Les images, polices et CV sont inclus dans le dépôt.

Pour le consulter localement, télécharge ou clone le dépôt, puis ouvre **`index.html`** dans un navigateur.
Garde les dossiers `assets/` et `documents/` à côté du fichier HTML.

## Organisation des fichiers

| Fichier ou dossier | Rôle |
| --- | --- |
| `index.html` | Structure, textes anglais et traductions françaises dans `data-fr` |
| `styles.css` | Mise en page, couleurs et adaptation aux écrans |
| `app.js` | Interactions, langue et fiches détaillées des projets |
| `site-config.js` | Liens de profil, adresse du site et chemins des CV |
| `assets/` | Images, icônes et polices locales avec leurs licences |
| `documents/` | CV français et anglais au format PDF |
| `cv-source/` | Sources éditables des CV et script de génération |
| `.nojekyll` | Publication des fichiers statiques sans traitement Jekyll |
| `ASSET_CREDITS.md` | Provenance et licences des ressources |

## Mettre à jour le site

GitHub Pages publie le contenu de **`main`**, depuis **`/ (root)`**.
Les modifications envoyées sur cette branche sont publiées automatiquement.
L’état du déploiement est visible dans les onglets **Actions** et **Settings → Pages** du dépôt.

Pour modifier un texte, conserve les deux versions : l’anglais dans le HTML et le français dans les attributs `data-fr`.
Les textes des fiches projets se trouvent dans `app.js`.
Si l’adresse du site change, mets à jour `siteUrl` dans `site-config.js` ainsi que les métadonnées canonical et Open Graph de `index.html`.

## Mettre à jour les CV

Remplace les PDF dans `documents/` en conservant leurs noms :

- `cv-nathan-robert-fr.pdf`
- `cv-nathan-robert-en.pdf`

Les sources LaTeX sont disponibles dans `cv-source/`.
Le script `python cv-source/build_cvs.py` régénère les deux PDF dans `documents/` ; il nécessite le paquet Python `reportlab`.

## Code des projets

- [Pymon](https://github.com/nathan-robert/Pymon)
- [Simulateur de football](https://github.com/nathan-robert/Football-Match-simulation)
- [Expansion urbaine de New Delhi](https://github.com/nathan-robert/prediction-of-the-urbanization-of-New-Delhi)

## Crédits

Les photos personnelles et captures de projets ont été fournies par Nathan Robert.
La photo de Tech Tower est de Mistercontributer / Wikimedia Commons, sous **CC0**.
Les polices **Manrope** et **Instrument Serif** sont distribuées sous **SIL Open Font License**.
L’illustration d’expansion urbaine est conceptuelle.

Les références détaillées figurent dans [ASSET_CREDITS.md](ASSET_CREDITS.md).
