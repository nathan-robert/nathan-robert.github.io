# Nathan Robert — E-portfolio

Dépôt GitHub créé : [nathan-robert/nathan-robert.github.io](https://github.com/nathan-robert/nathan-robert.github.io).
Adresse prévue après activation de GitHub Pages : **https://nathan-robert.github.io/**.
Le dépôt et l’adresse sont configurés dans les fichiers ; la réussite du déploiement doit être vérifiée dans GitHub Pages.

Un portfolio anglais/français prêt pour GitHub Pages, avec projets, expériences CPMS, mobilité et CV téléchargeables.
Le site est entièrement statique : HTML, CSS et JavaScript, sans npm, serveur applicatif ni dépendance payante.

## 1. Voir le site sur ton ordinateur

Décompresse complètement l'archive, puis double-clique sur **`index.html`**.
Garde `assets/` et `documents/` à côté de ce fichier : les photos, polices et PDF sont intégrés au dossier.
Le bouton **EN / FR** change la langue. Les liens CV ouvrent ou téléchargent les vrais PDF français et anglais.

## 2. Choisir l'adresse GitHub Pages

Crée un dépôt sur ton compte GitHub. Avec GitHub Free, choisis la visibilité **Public**.
Tu peux utiliser l'une de ces deux configurations :

| Objectif | Nom du dépôt | Adresse du portfolio |
| --- | --- | --- |
| Ton site personnel principal | `PSEUDO.github.io` | `https://PSEUDO.github.io/` |
| Un dépôt dédié au portfolio | `eportfolio` | `https://PSEUDO.github.io/eportfolio/` |

Ton identifiant GitHub confirmé est **`nathan-robert`** : remplace `PSEUDO` par cette valeur.
Les chemins relatifs du portfolio fonctionnent à la racine comme dans un sous-dossier.

## 3. Envoyer les fichiers

1. Ouvre ton dépôt GitHub, puis **Add file → Upload files**.
2. Glisse le **contenu extrait de l'archive**, avec `index.html` directement à la racine du dépôt.
3. Inclus `styles.css`, `app.js`, `site-config.js`, `assets/`, `documents/` et le fichier vide `.nojekyll`.
4. Garde tout le dossier `assets/fonts/`, avec ses fichiers de licence.
5. Enregistre avec **Commit changes**, sur la branche `main`.

Il faut envoyer les fichiers et les dossiers décompressés, pas le fichier ZIP lui-même.
Évite un dossier supplémentaire autour du site : GitHub doit voir `index.html` dès la racine.

## 4. Activer la publication

Dans le dépôt : **Settings → Pages → Build and deployment**.
Sélectionne **Deploy from a branch**, puis **main** et **/(root)**, et clique sur **Save**.
Attends que GitHub affiche l'adresse du site et termine le déploiement.
Les prochaines modifications enregistrées sur cette branche seront publiées par GitHub Pages.

Le dépôt `nathan-robert/nathan-robert.github.io` existe ; vérifier dans Pages que son déploiement a réussi avant de partager l’adresse du site.
Guide officiel : [configurer la publication](https://docs.github.com/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
Le [guide de démarrage GitHub Pages](https://docs.github.com/en/pages/quickstart) explique aussi le nom `PSEUDO.github.io`.

## Personnaliser les liens

Ouvre `site-config.js` dans un éditeur de texte.
Le LinkedIn est déjà configuré ; les CV pointent vers les PDF du dossier `documents/`.
Ton profil GitHub confirmé est déjà configuré :

```js
github: "https://github.com/nathan-robert",
```

Le site affiche le lien vers ton profil GitHub. Si tu vides le champ `github`, ce lien sera automatiquement masqué.
Le champ `siteUrl` et les métadonnées statiques du HTML sont configurés sur `https://nathan-robert.github.io/`.

## Modifier le contenu

| Fichier | À modifier |
| --- | --- |
| `index.html` | Textes anglais et traductions françaises dans les attributs `data-fr` |
| `app.js` | Détails des projets, regroupés en versions `en` et `fr` |
| `styles.css` | Couleurs, tailles, espacement et affichage mobile |
| `site-config.js` | Liens de profil et chemins des CV |
| `assets/` | Photos et captures de projets |
| `documents/` | Les deux CV PDF |

Quand tu changes une image, garde son nom ou adapte le chemin et le texte alternatif `alt` dans le HTML.
Les polices sont locales : le site n'a pas besoin d'appeler Google Fonts.
Les libellés d'accessibilité traduits se trouvent dans les attributs `data-aria-fr`.

## Mettre à jour les CV

Le plus simple est de remplacer les PDF dans `documents/` en gardant leurs noms :

- `cv-nathan-robert-fr.pdf`
- `cv-nathan-robert-en.pdf`

Les sources éditables sont fournies dans `cv-source/` avec le script `build_cvs.py`.
Après installation de `reportlab`, `python cv-source/build_cvs.py` régénère directement les CV dans `documents/`.
Les sources LaTeX sont également conservées pour une reprise dans Overleaf ou un environnement LaTeX complet.

## Contenu et crédits

Georgia Tech est un objectif de double diplôme ; le site ne présente aucune admission comme acquise.
Les nouvelles expériences sont le stage CPMS de juin-juillet 2026 et l'activité freelance depuis octobre 2026.
Les dates et descriptions des CV reprennent les documents de parcours fournis.
Les trois projets personnels sont reliés aux dépôts GitHub confirmés :

- [Pymon](https://github.com/nathan-robert/Pymon)
- [Simulateur de football](https://github.com/nathan-robert/Football-Match-simulation)
- [Expansion urbaine de New Delhi](https://github.com/nathan-robert/prediction-of-the-urbanization-of-New-Delhi)

Les photos et captures personnelles ont été fournies par Nathan Robert.
La photo de Tech Tower est de Mistercontributer / Wikimedia Commons, sous CC0.
Manrope et Instrument Serif sont distribuées sous SIL Open Font License ; les licences restent dans `assets/fonts/`.
L'illustration de croissance urbaine est conceptuelle, sans valeur de résultat scientifique.
Voir [ASSET_CREDITS.md](ASSET_CREDITS.md) pour les références.
