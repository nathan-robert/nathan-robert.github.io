/* Nathan Robert — progressive enhancements for a portable, static portfolio. */
(function () {
  'use strict';

  function init() {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const storageKey = 'nathan-portfolio-language';
    const config = window.PORTFOLIO_CONFIG || {};
    const translatedText = $$('[data-fr]').map(element => ({
      element,
      en: element.textContent,
      fr: element.dataset.fr
    }));
    const translatedLabels = $$('[data-aria-fr]').map(element => {
      // Images in this document use the same translation marker for their alt text.
      const attribute = element.tagName === 'IMG' ? 'alt' : 'aria-label';
      return {
        element,
        attribute,
        en: element.getAttribute(attribute) || '',
        fr: element.dataset.ariaFr
      };
    });
    const languageButtons = $$('[data-lang]');
    let language = 'en';

    const projects = {
      'document-ai': {
        tags: ['Python', 'OCR', 'NLP', 'BERT', 'FastAPI'],
        en: {
          eyebrow: 'Applied AI · CPMS',
          title: 'From documents to structured decisions.',
          intro: 'A document classification workflow connecting text extraction, language models and application integration.',
          sections: [
            ['The challenge', 'Medical and administrative documents arrive in different formats. The goal is to turn their text into a useful document category while handling scanned pages, variable layouts and long content.'],
            ['My contribution', 'I work on dataset preparation, OCR and text extraction, BERT-family document classification, performance evaluation and integration through a FastAPI interface. The workflow brings the successive steps together, from an input file to a predicted class.'],
            ['What I learned', 'Building an applied AI workflow means paying attention to the data as well as the model: consistent labels, reliable text extraction, meaningful evaluation and a clear interface for the application that will use it.']
          ]
        },
        fr: {
          eyebrow: 'IA appliquée · CPMS',
          title: 'Des documents aux décisions structurées.',
          intro: 'Une chaîne de classification documentaire qui relie extraction de texte, modèles de langage et intégration applicative.',
          sections: [
            ['Le défi', 'Les documents médicaux et administratifs se présentent sous des formats variés. L’objectif est de déterminer leur catégorie à partir du texte, en tenant compte des pages numérisées, des mises en page différentes et des contenus longs.'],
            ['Ma contribution', 'Je travaille sur la préparation des jeux de données, l’OCR et l’extraction de texte, la classification par des modèles de la famille BERT, l’évaluation des performances et l’intégration via une interface FastAPI. Cette chaîne relie les différentes étapes, du fichier d’entrée à la classe prédite.'],
            ['Ce que j’en retiens', 'Construire une solution d’IA appliquée demande autant d’attention aux données qu’au modèle : des annotations cohérentes, une extraction fiable, une évaluation pertinente et une interface claire pour l’application qui utilisera les prédictions.']
          ]
        }
      },
      football: {
        tags: ['Python', 'Pygame', 'Simulation', 'AI'],
        source: 'https://github.com/nathan-robert/Football-Match-simulation',
        en: {
          eyebrow: 'Simulation · Personal project',
          title: 'Football strategy, made visible.',
          intro: 'A visual five-a-side football simulator that brings together my interest in programming and my experience of the game.',
          sections: [
            ['The challenge', 'How can different strategies be explored for a given team? This project models a match between two teams using the individual player levels entered into the simulation.'],
            ['My contribution', 'I developed a graphical simulation to observe how matches unfold and explore AI-based strategies for five-a-side football. The visual interface makes player interactions and the progression of a match easier to follow.'],
            ['What I learned', 'Turning a real-world activity into a simulation helped me connect algorithmic thinking, modeling and game development. It also taught me to distinguish the behavior of a model from the complexity of a real match.']
          ],
          sourceLabel: 'Explore the source on GitHub'
        },
        fr: {
          eyebrow: 'Simulation · Projet personnel',
          title: 'Rendre la stratégie de jeu visible.',
          intro: 'Un simulateur visuel de football à cinq, à la rencontre de mon intérêt pour la programmation et de ma pratique du football.',
          sections: [
            ['Le défi', 'Comment explorer différentes stratégies pour une équipe donnée ? Ce projet modélise un match entre deux équipes en prenant en compte les niveaux individuels renseignés pour les joueurs.'],
            ['Ma contribution', 'J’ai développé une simulation graphique pour observer le déroulement des rencontres et explorer des stratégies fondées sur l’IA pour le football à cinq. L’interface permet de suivre les interactions entre les joueurs et la progression du match.'],
            ['Ce que j’en retiens', 'Traduire une activité réelle en simulation m’a permis de relier algorithmique, modélisation et développement de jeux. Ce travail m’a aussi appris à distinguer le comportement d’un modèle de la complexité d’un véritable match.']
          ],
          sourceLabel: 'Consulter le code sur GitHub'
        }
      },
      pymon: {
        tags: ['Python', 'Pygame', '2D game'],
        source: 'https://github.com/nathan-robert/Pymon',
        en: {
          eyebrow: 'Game development · In progress',
          title: 'Pymon, a world built in Python.',
          intro: 'A Pokémon-inspired fan game and an ongoing personal playground for learning how a two-dimensional game comes together.',
          sections: [
            ['The challenge', 'Build a playable 2D world with Python and Pygame, connecting the map, characters and game interactions into a coherent experience.'],
            ['My contribution', 'I develop the game using Pygame, working on the world, player interactions and the organization of the code. This personal project is still under development and has no announced release date.'],
            ['What I learned', 'A game requires many small systems to work together. This project gives me a practical way to improve code organization, reason about interactions and iterate on an experience I can immediately see and use.']
          ],
          sourceLabel: 'Explore the source on GitHub'
        },
        fr: {
          eyebrow: 'Développement de jeux · En cours',
          title: 'Pymon, un univers construit en Python.',
          intro: 'Un fan game inspiré de Pokémon et un terrain d’apprentissage personnel pour comprendre la construction d’un jeu en deux dimensions.',
          sections: [
            ['Le défi', 'Créer un univers jouable en 2D avec Python et Pygame, en reliant la carte, les personnages et les interactions dans une expérience cohérente.'],
            ['Ma contribution', 'Je développe le jeu avec Pygame, en travaillant sur son univers, les interactions du joueur et l’organisation du code. Ce projet personnel est toujours en développement et aucune date de sortie n’est annoncée.'],
            ['Ce que j’en retiens', 'Un jeu repose sur de nombreux petits systèmes qui doivent fonctionner ensemble. Ce projet me permet de progresser dans l’organisation du code, de raisonner sur les interactions et d’améliorer une expérience directement visible et utilisable.']
          ],
          sourceLabel: 'Consulter le code sur GitHub'
        }
      },
      urban: {
        tags: ['Python', 'Deep learning', 'New Delhi'],
        source: 'https://github.com/nathan-robert/prediction-of-the-urbanization-of-New-Delhi',
        en: {
          eyebrow: 'Deep learning · Urban modeling',
          title: 'Exploring the growth of New Delhi.',
          intro: 'An exploration of deep-learning models for predicting urban expansion, using New Delhi as a case study.',
          sections: [
            ['The challenge', 'Investigate how learning-based models can represent urban growth and produce visual predictions that can be inspected and compared.'],
            ['My contribution', 'I explored different deep-learning approaches to the prediction of urban expansion in New Delhi, with an emphasis on interpreting the results visually.'],
            ['What I learned', 'This project connected machine learning with a concrete spatial question. It reinforced the importance of understanding the data, explaining modeling choices and treating predictions as estimates with limitations.']
          ],
          sourceLabel: 'Explore the source on GitHub'
        },
        fr: {
          eyebrow: 'Deep learning · Modélisation urbaine',
          title: 'Explorer la croissance de New Delhi.',
          intro: 'Une exploration de modèles de deep learning pour prévoir l’expansion urbaine, avec New Delhi comme cas d’étude.',
          sections: [
            ['Le défi', 'Étudier comment des modèles d’apprentissage peuvent représenter la croissance d’une ville et produire des prévisions visuelles que l’on peut examiner et comparer.'],
            ['Ma contribution', 'J’ai exploré différentes approches de deep learning pour la prévision de l’expansion urbaine à New Delhi, en accordant une place importante à la lecture visuelle des résultats.'],
            ['Ce que j’en retiens', 'Ce projet relie l’apprentissage automatique à une question spatiale concrète. Il m’a sensibilisé à l’importance de comprendre les données, d’expliciter les choix de modélisation et de considérer les prédictions comme des estimations avec leurs limites.']
          ],
          sourceLabel: 'Consulter le code sur GitHub'
        }
      }
    };

    const projectDialog = $('#project-dialog');
    const projectContent = $('#project-dialog-content');
    let activeProject = null;
    const dialogOpeners = new Map();
    const openDialogs = new Set();
    let previousOverflow = '';

    function node(tag, className, text) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    }

    function renderProject(key) {
      const project = projects[key];
      if (!project || !projectContent) return;
      const copy = project[language];
      const fragment = document.createDocumentFragment();
      fragment.append(node('p', 'dialog-eyebrow', copy.eyebrow));
      const heading = node('h2', 'dialog-title', copy.title);
      heading.id = 'project-dialog-title';
      fragment.append(heading, node('p', 'dialog-intro', copy.intro));
      const tags = node('ul', 'tag-list');
      tags.setAttribute('aria-label', language === 'fr' ? 'Technologies et sujet' : 'Technologies and topic');
      project.tags.forEach(tag => {
        let label = tag;
        if (language === 'fr' && tag === '2D game') label = 'Jeu 2D';
        if (language === 'fr' && tag === 'AI') label = 'IA';
        tags.append(node('li', '', label));
      });
      fragment.append(tags);
      copy.sections.forEach(([title, text]) => {
        const section = node('section', 'dialog-section');
        section.append(node('h3', '', title), node('p', '', text));
        fragment.append(section);
      });
      if (project.source) {
        const link = node('a', 'button button-secondary dialog-source', copy.sourceLabel);
        link.href = project.source;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        fragment.append(link);
      }
      projectContent.replaceChildren(fragment);
      if (projectDialog) projectDialog.setAttribute('aria-labelledby', heading.id);
    }

    function openDialog(dialog, opener) {
      if (!dialog || dialog.open) return;
      closeMenu();
      closeDropdowns();
      dialogOpeners.set(dialog, opener || document.activeElement);
      if (!openDialogs.size) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      openDialogs.add(dialog);
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.dataset.fallbackDialog = 'true';
      }
      const firstButton = $('button', dialog);
      if (firstButton) firstButton.focus({ preventScroll: true });
    }

    function finishClosingDialog(dialog) {
      if (!openDialogs.has(dialog)) return;
      openDialogs.delete(dialog);
      if (!openDialogs.size) document.body.style.overflow = previousOverflow;
      const opener = dialogOpeners.get(dialog);
      dialogOpeners.delete(dialog);
      if (dialog === projectDialog) activeProject = null;
      if (opener && opener.isConnected && typeof opener.focus === 'function') {
        opener.focus({ preventScroll: true });
      }
    }

    function closeDialog(dialog) {
      if (!dialog || !dialog.open) return;
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      finishClosingDialog(dialog);
    }

    function wireDialog(dialog, closeButton) {
      if (!dialog) return;
      if (closeButton) closeButton.addEventListener('click', () => closeDialog(dialog));
      dialog.addEventListener('close', () => finishClosingDialog(dialog));
      dialog.addEventListener('cancel', event => {
        event.preventDefault();
        closeDialog(dialog);
      });
      // A click on empty space inside the dialog is not a backdrop click.
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const outside = event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom;
        if (outside) closeDialog(dialog);
      });
      dialog.addEventListener('keydown', event => {
        if (dialog.dataset.fallbackDialog !== 'true') return;
        if (event.key === 'Escape') {
          event.preventDefault();
          closeDialog(dialog);
        }
        if (event.key !== 'Tab') return;
        const focusable = $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]', dialog)
          .filter(element => !element.hidden && element.getClientRects().length);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      });
    }

    wireDialog(projectDialog, $('#project-dialog-close'));
    $$('[data-project]').forEach(button => {
      button.addEventListener('click', () => {
        const key = button.dataset.project;
        if (!projects[key] || !projectDialog || !projectContent) return;
        activeProject = key;
        renderProject(key);
        openDialog(projectDialog, button);
      });
    });

    const creditsDialog = $('#credits-dialog');
    wireDialog(creditsDialog, $('#credits-close'));
    const creditsButton = $('#credits-open');
    if (creditsButton) creditsButton.addEventListener('click', () => openDialog(creditsDialog, creditsButton));

    function setLanguage(nextLanguage, save) {
      language = nextLanguage === 'fr' ? 'fr' : 'en';
      document.documentElement.lang = language;
      translatedText.forEach(item => {
        item.element.textContent = item[language];
      });
      translatedLabels.forEach(item => {
        item.element.setAttribute(item.attribute, item[language]);
      });
      languageButtons.forEach(button => {
        const selected = button.dataset.lang === language;
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('is-active', selected);
      });
      document.title = language === 'fr'
        ? 'Nathan Robert — IA & ingénierie logicielle'
        : 'Nathan Robert — AI & Software Engineering';
      const description = $('meta[name="description"]');
      if (description) description.content = language === 'fr'
        ? 'E-portfolio de Nathan Robert, élève ingénieur à l’ENSEEIHT et freelance en IA et machine learning. Projets, expériences chez CPMS et ambitions internationales.'
        : 'Nathan Robert’s e-portfolio. ENSEEIHT engineering student and AI & machine learning freelancer. Projects, experience at CPMS and international ambitions.';
      const openGraphTitle = $('meta[property="og:title"]');
      const openGraphDescription = $('meta[property="og:description"]');
      if (openGraphTitle) openGraphTitle.content = document.title;
      if (openGraphDescription && description) openGraphDescription.content = description.content;
      updateMenuLabel();
      if (activeProject && projectDialog && projectDialog.open) renderProject(activeProject);
      if (save) {
        try { window.localStorage.setItem(storageKey, language); } catch (_) { /* Storage may be unavailable on file:// or in private mode. */ }
      }
      document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
    }

    languageButtons.forEach(button => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang, true));
    });

    const menuToggle = $('#menu-toggle');
    const mainNav = $('#main-nav');
    function updateMenuLabel() {
      if (!menuToggle) return;
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-label', language === 'fr'
        ? (open ? 'Fermer le menu' : 'Ouvrir le menu')
        : (open ? 'Close menu' : 'Open menu'));
    }
    function closeMenu(returnFocus) {
      if (!menuToggle || !mainNav) return;
      const wasOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
      updateMenuLabel();
      if (returnFocus && wasOpen) menuToggle.focus();
    }
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        const open = menuToggle.getAttribute('aria-expanded') !== 'true';
        menuToggle.setAttribute('aria-expanded', String(open));
        mainNav.classList.toggle('is-open', open);
        updateMenuLabel();
      });
      $$('a', mainNav).forEach(link => link.addEventListener('click', () => closeMenu()));
      const desktop = window.matchMedia('(min-width: 801px)');
      if (desktop.addEventListener) desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });
    }

    const dropdowns = $$('details.cv-dropdown');
    function closeDropdowns(except) {
      dropdowns.forEach(dropdown => { if (dropdown !== except) dropdown.open = false; });
    }
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('toggle', () => { if (dropdown.open) closeDropdowns(dropdown); });
      $$('a', dropdown).forEach(link => link.addEventListener('click', () => { dropdown.open = false; }));
    });

    document.addEventListener('click', event => {
      if (mainNav && menuToggle && !mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
      dropdowns.forEach(dropdown => { if (!dropdown.contains(event.target)) dropdown.open = false; });
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      closeMenu(true);
      dropdowns.forEach(dropdown => {
        const returnFocus = dropdown.open && dropdown.contains(document.activeElement);
        dropdown.open = false;
        const summary = $('summary', dropdown);
        if (returnFocus && summary) summary.focus();
      });
    });

    const filterButtons = $$('[data-filter]');
    const projectCards = $$('[data-project-card]');
    const projectGrid = $('#project-grid');
    function filterProjects(filter) {
      const selected = ['all', 'ai', 'software'].includes(filter) ? filter : 'all';
      filterButtons.forEach(button => {
        const active = button.dataset.filter === selected;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('is-active', active);
      });
      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').split(/\s+/);
        card.hidden = selected !== 'all' && !categories.includes(selected);
      });
      if (projectGrid) projectGrid.dataset.activeFilter = selected;
    }
    filterButtons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
    if (filterButtons.length) filterProjects('all');

    // An optional GitHub account is shown only when an explicit valid URL is supplied.
    const githubValue = config.github || (config.links && config.links.github) || '';
    let githubUrl = null;
    if (typeof githubValue === 'string' && githubValue.trim()) {
      try {
        const url = new URL(githubValue);
        if (url.protocol === 'https:' && /^(www\.)?github\.com$/i.test(url.hostname) && url.pathname.replace(/\//g, '')) {
          githubUrl = url.href;
        }
      } catch (_) { /* Leave optional links hidden when configuration is incomplete. */ }
    }
    $$('[data-config-link="github"]').forEach(link => {
      link.hidden = !githubUrl;
      if (githubUrl) {
        link.href = githubUrl;
        link.rel = 'noopener noreferrer';
      } else {
        link.removeAttribute('href');
      }
    });

    // Keep the editable configuration effective without requiring a build step.
    function safeConfiguredLink(value, localAllowed) {
      if (typeof value !== 'string' || !value.trim()) return null;
      try {
        const url = new URL(value, document.baseURI);
        if (['https:', 'http:'].includes(url.protocol) || (localAllowed && url.protocol === 'file:' && window.location.protocol === 'file:')) {
          return value.trim();
        }
      } catch (_) { /* The original document link remains in place. */ }
      return null;
    }
    const configuredLinkedIn = safeConfiguredLink(config.linkedin, false);
    if (configuredLinkedIn) {
      $$('a[href="https://www.linkedin.com/in/nathan-robert-b9423a320/"]').forEach(link => {
        link.setAttribute('href', configuredLinkedIn);
      });
    }
    [
      [config.cvFrench, './documents/cv-nathan-robert-fr.pdf'],
      [config.cvEnglish, './documents/cv-nathan-robert-en.pdf']
    ].forEach(([value, originalHref]) => {
      const configured = safeConfiguredLink(value, true);
      if (!configured) return;
      $$('a').filter(link => link.getAttribute('href') === originalHref).forEach(link => {
        link.setAttribute('href', configured);
      });
    });
    if (typeof config.siteUrl === 'string' && config.siteUrl.trim()) {
      try {
        const siteUrl = new URL(config.siteUrl.trim());
        if (['https:', 'http:'].includes(siteUrl.protocol)) {
          siteUrl.hash = '';
          siteUrl.search = '';
          if (!siteUrl.pathname.endsWith('/') && !/\.html?$/i.test(siteUrl.pathname)) siteUrl.pathname += '/';
          let canonical = $('link[rel="canonical"]');
          if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.append(canonical);
          }
          canonical.href = siteUrl.href;
          let openGraphUrl = $('meta[property="og:url"]');
          if (!openGraphUrl) {
            openGraphUrl = document.createElement('meta');
            openGraphUrl.setAttribute('property', 'og:url');
            document.head.append(openGraphUrl);
          }
          openGraphUrl.content = siteUrl.href;
          const openGraphImage = $('meta[property="og:image"]');
          if (openGraphImage) openGraphImage.content = new URL('./assets/nathan-robert.jpg', siteUrl).href;
        }
      } catch (_) { /* A published URL is optional, including when opened locally. */ }
    }

    const reveals = $$('.reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reducedMotion) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.05, rootMargin: '0px 0px 32px 0px' });
      reveals.forEach(element => revealObserver.observe(element));
    } else {
      reveals.forEach(element => element.classList.add('is-visible'));
    }
    document.body.classList.add('js');

    const sections = ['about', 'projects', 'experience', 'mobility', 'beyond', 'contact']
      .map(id => document.getElementById(id)).filter(Boolean);
    const sectionIds = new Set(sections.map(section => section.id));
    const navLinks = mainNav ? $$('a[href^="#"]', mainNav).filter(link => sectionIds.has(link.hash.slice(1))) : [];
    let scrollQueued = false;
    function updateActiveSection() {
      scrollQueued = false;
      if (!sections.length) return;
      const marker = Math.min(window.innerHeight * 0.35, 240);
      let active = sections[0].id;
      sections.forEach(section => { if (section.getBoundingClientRect().top <= marker) active = section.id; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) active = sections[sections.length - 1].id;
      navLinks.forEach(link => {
        const selected = link.hash === '#' + active;
        link.classList.toggle('is-active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function queueSectionUpdate() {
      if (scrollQueued) return;
      scrollQueued = true;
      window.requestAnimationFrame(updateActiveSection);
    }
    window.addEventListener('scroll', queueSectionUpdate, { passive: true });
    window.addEventListener('resize', queueSectionUpdate, { passive: true });
    window.addEventListener('hashchange', queueSectionUpdate);
    window.addEventListener('load', queueSectionUpdate, { once: true });

    let storedLanguage = 'en';
    try { storedLanguage = window.localStorage.getItem(storageKey) || 'en'; } catch (_) { /* English remains the default. */ }
    setLanguage(storedLanguage, false);
    updateActiveSection();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
