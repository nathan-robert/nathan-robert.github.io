"""Build the portfolio CVs from verified, previously supplied career information.

Requires reportlab. The editable LaTeX sources are preserved next to this file.
Run from any directory: python build_cvs.py
"""
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

ROOT = Path(__file__).resolve().parents[1]
SITE_ROOT = ROOT / "dist" if (ROOT / "dist" / "index.html").exists() else ROOT
OUT = SITE_ROOT / "documents"
LINKEDIN = "https://www.linkedin.com/in/nathan-robert-b9423a320/"
PORTFOLIO = "https://nathan-robert.github.io/"
CPMS = "https://www.cpms.fr/"
PROJECT_URLS = {
    '2025': 'https://github.com/nathan-robert/prediction-of-the-urbanization-of-New-Delhi',
    '2024': 'https://github.com/nathan-robert/Football-Match-simulation',
    '2023': 'https://github.com/nathan-robert/Pymon',
}
FONT = "Helvetica"
BOLD = "Helvetica-Bold"
font_dir = Path('/usr/share/fonts/truetype/liberation')
if (font_dir / 'LiberationSans-Regular.ttf').exists():
    FONT, BOLD = 'LiberationSans', 'LiberationSans-Bold'
    pdfmetrics.registerFont(TTFont(FONT, str(font_dir / 'LiberationSans-Regular.ttf')))
    pdfmetrics.registerFont(TTFont(BOLD, str(font_dir / 'LiberationSans-Bold.ttf')))
    pdfmetrics.registerFontFamily(FONT, normal=FONT, bold=BOLD)

DATA = {
 'fr': {
  'subtitle': 'IA & Machine Learning | NLP, Fine-tuning de LLM',
  'linkedin': 'Profil LinkedIn',
  'summary_title': 'PROFIL',
  'summary': "Étudiant ingénieur en 2e année à l'ENSEEIHT (filière HPC & Big Data), avec une expérience pratique en NLP et en fine-tuning de LLM. Après un stage chez CPMS, j'y développe depuis octobre 2026 des solutions de classification documentaire et d'adaptation de modèles de langage en freelance.",
  'skills_title': 'COMPÉTENCES',
  'skills': [
   ('IA / NLP', 'Transformers, modèles de type BERT, classification documentaire, fine-tuning supervisé de LLM, LoRA, QLoRA, évaluation.'),
   ('Bibliothèques', 'PyTorch, Hugging Face (Transformers, Datasets, PEFT, TRL), Unsloth, bitsandbytes.'),
   ('Programmation / outils', 'Python, C, OCaml, Ada, SQL, Linux ; préparation de données, tokenisation, optimisation GPU.'),
  ],
  'experience_title': 'EXPÉRIENCE PROFESSIONNELLE',
  'experience': [
   ('Freelance IA & Machine Learning | CPMS', "Oct. 2026 - Aujourd'hui", 'Gestion d’assurance santé | Toulouse | À distance', [
    "Développement d'une chaîne de classification documentaire : extraction de texte/OCR, préparation des données et modèles NLP de type BERT.",
    "Adaptation de modèles de langage par fine-tuning, évaluation des performances et analyse des erreurs.",
    "Intégration des modèles dans des applications via une interface FastAPI.",
   ]),
   ('Stagiaire IA générative / Fine-tuning de LLM | CPMS', 'Juin - Juil. 2026', 'Gestion d’assurance santé | Paris | Sur site', [
    'Étude des architectures Transformer et adaptation de LLM open source à un cas d’usage métier sur des contenus médicaux, avec des contraintes de confidentialité.',
    'Constitution de datasets instruction-réponse : nettoyage, normalisation, tokenisation et mise en forme des échanges.',
    'Expérimentations de fine-tuning supervisé avec LoRA / QLoRA, réglage des hyperparamètres et quantification 4/8 bits pour maîtriser la mémoire GPU.',
    'Comparaison prompting / fine-tuning et analyse des erreurs, du surapprentissage, des hallucinations et de la généralisation.',
   ]),
  ],
  'education_title': 'FORMATION',
  'education': [
   ("Diplôme d'ingénieur en informatique | ENSEEIHT - Toulouse INP", '2025 - 2028', 'Toulouse | 2e année - Filière HPC & Big Data (en cours)'),
   ('Classes préparatoires (CPGE MP2I / MPI) | Lycée Janson-de-Sailly', '2022 - 2025', 'Paris'),
  ],
  'projects_title': 'PROJETS TECHNIQUES',
  'projects': [
   ('2025', 'Expansion urbaine à New Delhi : exploration de modèles de deep learning.'),
   ('2024', 'Simulateur de football à cinq en 2D : Python, Pygame et stratégies de jeu.'),
   ('2023', 'Pymon : fan game 2D en Python avec Pygame (projet en cours).'),
  ],
  'activities_title': 'LANGUES & ENGAGEMENTS',
  'activities': [
   ('Langues', 'Français (natif), anglais (C1), espagnol (intermédiaire).'),
   ('Bénévolat', 'Service et distribution de repas aux Restos du Cœur.'),
   ("Centres d'intérêt", 'Force athlétique, football, programmation.'),
  ]
 },
 'en': {
  'subtitle': 'AI & Machine Learning | NLP, LLM Fine-tuning',
  'linkedin': 'LinkedIn profile',
  'summary_title': 'SUMMARY',
  'summary': 'Second-year engineering student at ENSEEIHT in the HPC & Big Data track, with hands-on experience in NLP and LLM fine-tuning. After an internship at CPMS, I have been developing document-classification and language-model adaptation solutions as a freelancer since October 2026.',
  'skills_title': 'SKILLS',
  'skills': [
   ('AI / NLP', 'Transformers, BERT-family models, document classification, supervised LLM fine-tuning, LoRA, QLoRA, model evaluation.'),
   ('Libraries', 'PyTorch, Hugging Face (Transformers, Datasets, PEFT, TRL), Unsloth, bitsandbytes.'),
   ('Programming / tools', 'Python, C, OCaml, Ada, SQL, Linux; data preparation, tokenization, GPU optimization.'),
  ],
  'experience_title': 'PROFESSIONAL EXPERIENCE',
  'experience': [
   ('Freelance AI & Machine Learning | CPMS', 'Oct 2026 - Present', 'Medical plan TPA | Toulouse, France | Remote', [
    'Developing a document-classification workflow: text extraction/OCR, data preparation and BERT-family NLP models.',
    'Fine-tuning language models for domain-specific needs; evaluating performance and analyzing errors.',
    'Integrating models into applications through a FastAPI interface.',
   ]),
   ('AI / LLM Fine-tuning Intern | CPMS', 'Jun 2026 - Jul 2026', 'Medical plan TPA | Paris, France | On-site', [
    'Studied Transformer architectures and adapted open-source LLMs to a business use case involving medical content and privacy constraints.',
    'Built instruction-response datasets: cleaning, normalization, tokenization and chat-template formatting.',
    'Ran supervised fine-tuning experiments with LoRA / QLoRA, hyperparameter tuning and 4-/8-bit quantization to manage GPU memory use.',
    'Compared prompting and fine-tuning through error analysis, examining overfitting, hallucinations and generalization.',
   ]),
  ],
  'education_title': 'EDUCATION',
  'education': [
   ('Engineering Degree in Computer Science | ENSEEIHT - Toulouse INP', '2025 - 2028', 'Toulouse, France | Year 2 - HPC & Big Data track (in progress)'),
   ('Preparatory Classes (CPGE MP2I / MPI) | Lycée Janson-de-Sailly', '2022 - 2025', 'Paris, France'),
  ],
  'projects_title': 'SELECTED PROJECTS',
  'projects': [
   ('2025', 'Urban expansion in New Delhi: exploring deep learning models.'),
   ('2024', '2D five-a-side football simulator: Python, Pygame and game strategies.'),
   ('2023', 'Pymon: a 2D fan game built with Python and Pygame (ongoing).'),
  ],
  'activities_title': 'LANGUAGES & ACTIVITIES',
  'activities': [
   ('Languages', 'French (native), English (C1), Spanish (intermediate).'),
   ('Volunteering', 'Meal service and distribution with Les Restos du Cœur.'),
   ('Interests', 'Powerlifting, football, programming.'),
  ]
 }
}


def build(lang):
    data=DATA[lang]
    OUT.mkdir(parents=True,exist_ok=True)
    path=OUT/f'cv-nathan-robert-{lang}.pdf'
    c=canvas.Canvas(str(path),pagesize=A4)
    c.setTitle(f'CV - Nathan Robert - {lang.upper()}')
    c.setAuthor('Nathan Robert')
    c.setSubject(data['subtitle'])
    w,h=A4
    margin=46
    content=w-2*margin
    ink=HexColor('#17222a')
    gray=HexColor('#4c5660')
    accent=HexColor('#1c5b69')
    c.setFillColor(ink)
    c.setFont(BOLD,24)
    c.drawString(margin,h-66,'Nathan ROBERT')
    c.setFont(FONT,10.8)
    c.drawString(margin,h-84,data['subtitle'])
    c.setFillColor(gray)
    c.setFont(FONT,9.5)
    text_right=w-margin-70
    c.drawRightString(text_right,h-48,'Toulouse, France')
    c.setFillColor(accent)
    c.drawRightString(text_right,h-64,data['linkedin'])
    tw=pdfmetrics.stringWidth(data['linkedin'],FONT,9.5)
    c.linkURL(LINKEDIN,(text_right-tw,h-67,text_right,h-55),relative=0)
    portfolio_label='nathan-robert.github.io'
    c.setFont(FONT,9.3)
    c.drawRightString(text_right,h-80,portfolio_label)
    tw=pdfmetrics.stringWidth(portfolio_label,FONT,9.3)
    c.linkURL(PORTFOLIO,(text_right-tw,h-83,text_right,h-71),relative=0)
    code=qr.QrCodeWidget(PORTFOLIO,barBorder=4,barLevel='M')
    x1,y1,x2,y2=code.getBounds()
    qr_size=58
    qr_left=w-margin-qr_size
    qr_bottom=h-92
    d=Drawing(qr_size,qr_size,transform=[qr_size/(x2-x1),0,0,qr_size/(y2-y1),0,0])
    d.add(code)
    c.setFillColor(HexColor('#ffffff'))
    c.rect(qr_left-2,qr_bottom-2,qr_size+4,qr_size+4,fill=1,stroke=0)
    renderPDF.draw(d,c,qr_left,qr_bottom)
    c.linkURL(PORTFOLIO,(qr_left,qr_bottom,w-margin,qr_bottom+qr_size),relative=0)
    c.setFillColor(gray)
    c.setFont(FONT,8)
    c.drawCentredString(qr_left+qr_size/2,h-102,'PORTFOLIO')
    c.setStrokeColor(accent)
    c.setLineWidth(1.3)
    c.line(margin,h-113,w-margin,h-113)
    y=h-122
    body=ParagraphStyle('body',fontName=FONT,fontSize=10,leading=13,textColor=ink,spaceAfter=0)
    bullet_style=ParagraphStyle('bullet',parent=body,leftIndent=10,firstLineIndent=0,bulletIndent=0)
    meta=ParagraphStyle('meta',fontName=FONT,fontSize=9,leading=11.7,textColor=gray)
    title=ParagraphStyle('role',fontName=BOLD,fontSize=9.8,leading=12.2,textColor=ink)
    def para(text,style=body,width=content,gap=2,bullet=False):
        nonlocal y
        p=Paragraph(text,style,bulletText='•' if bullet else None)
        _,ph=p.wrap(width,900)
        p.drawOn(c,margin,y-ph)
        y-=ph+gap
        return ph
    def section(text):
        nonlocal y
        y-=9
        c.saveState()
        c.setFillColor(accent)
        t=c.beginText(margin,y-11)
        t.setFont(BOLD,10.1)
        t.setCharSpace(0.9)
        t.textOut(text)
        c.drawText(t)
        c.restoreState()
        y-=18
        c.setStrokeColor(HexColor('#d1d8dc'))
        c.setLineWidth(.5)
        c.line(margin,y,w-margin,y)
        y-=6
    def role(name,date,location):
        nonlocal y
        date_width=pdfmetrics.stringWidth(date,FONT,9)
        c.setFillColor(gray)
        c.setFont(FONT,9)
        c.drawRightString(w-margin,y-10,date)
        linked_name=escape(name).replace('CPMS', f'<link href="{CPMS}" color="#1c5b69">CPMS</link>')
        para(linked_name,title,width=content-date_width-14,gap=1)
        para(escape(location),meta,gap=3)
    section(data['summary_title'])
    para(escape(data['summary']),gap=1)
    section(data['skills_title'])
    for name,value in data['skills']:
        para(f'<b>{escape(name)} :</b> {escape(value)}' if lang=='fr' else f'<b>{escape(name)}:</b> {escape(value)}',gap=2)
    section(data['experience_title'])
    for idx,(name,date,location,bullets) in enumerate(data['experience']):
        if idx:
            y-=5
        role(name,date,location)
        for text in bullets:
            para(escape(text),bullet_style,gap=1.4,bullet=True)
    section(data['education_title'])
    for idx,row in enumerate(data['education']):
        if idx:
            y-=2
        role(*row)
    section(data['projects_title'])
    for year,value in data['projects']:
        project_title,project_detail=value.split(':',1)
        project_link=f'<link href="{PROJECT_URLS[year]}" color="#1c5b69">{escape(project_title.rstrip())}</link>'
        separator=' :' if lang=='fr' else ':'
        para(f'<b>{year}</b> | {project_link}{separator}{escape(project_detail)}',gap=2)
    section(data['activities_title'])
    for name,value in data['activities']:
        para(f'<b>{escape(name)} :</b> {escape(value)}' if lang=='fr' else f'<b>{escape(name)}:</b> {escape(value)}',gap=2)
    if y < 35:
        raise RuntimeError(f'CV {lang} content too low: {y}')
    c.save()
    print(f'{path}: bottom y={y:.2f} pt')


if __name__=='__main__':
    for lang in ('fr','en'):
        build(lang)
