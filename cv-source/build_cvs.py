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
  'summary': "Étudiant ingénieur en informatique à l'ENSEEIHT, orienté intelligence artificielle et traitement automatique du langage. Après un stage en fine-tuning de LLM open-source chez CPMS, j'y développe depuis octobre 2026 des solutions d'IA et de machine learning en freelance.",
  'skills_title': 'COMPÉTENCES',
  'skills': [
   ('IA / NLP', 'Transformers, modèles de type BERT, classification documentaire, fine-tuning supervisé de LLM, LoRA, QLoRA, évaluation.'),
   ('Bibliothèques', 'PyTorch, Hugging Face (Transformers, Datasets, PEFT, TRL), Unsloth, bitsandbytes.'),
   ('Programmation / outils', 'Python, C, OCaml, Ada, SQL, Linux ; préparation de données, tokenisation, optimisation GPU.'),
  ],
  'experience_title': 'EXPÉRIENCE PROFESSIONNELLE',
  'experience': [
   ('Freelance IA & Machine Learning | CPMS', "Oct. 2026 - Aujourd'hui", 'Centre de Prévoyance Médico-Sociale | Toulouse | À distance', [
    "Développement de solutions de classification de documents à l'aide du machine learning et de modèles NLP de type BERT.",
    "Adaptation de modèles de langage par fine-tuning, évaluation des performances et analyse des erreurs.",
    "Préparation et traitement de datasets, participation à l'intégration des modèles d'IA dans des applications.",
   ]),
   ('Stagiaire IA générative / Fine-tuning de LLM | CPMS', 'Juin - Juil. 2026', 'Centre de Prévoyance Médico-Sociale | Paris | Sur site', [
    'Étude des architectures Transformer et adaptation de LLM open-source à un cas d’usage métier impliquant des documents médicaux sensibles et des enjeux RGPD.',
    'Constitution de datasets instruction-réponse, nettoyage, normalisation, tokenisation et gestion des chat templates.',
    'Expérimentations de fine-tuning supervisé avec LoRA / QLoRA et quantification 4/8 bits pour optimiser l’utilisation GPU.',
    'Réglage des hyperparamètres : learning rate, batch size, epochs, accumulation des gradients et warmup.',
    'Comparaison prompting / fine-tuning, analyses d’erreurs, itérations et prise en compte du surapprentissage, des hallucinations et de la généralisation.',
   ]),
  ],
  'education_title': 'FORMATION',
  'education': [
   ("Diplôme d'ingénieur en informatique | ENSEEIHT - Toulouse INP", '2025 - 2028', 'Toulouse | Formation en cours'),
   ('Classes préparatoires (CPGE MP2I / MPI) | Lycée Janson-de-Sailly', '2022 - 2025', 'Paris'),
  ],
  'projects_title': 'PROJETS TECHNIQUES',
  'projects': [
   ('2025', "Conception d'un modèle de prédiction de l'expansion urbaine."),
   ('2024', "Développement d'un simulateur de match de football en 2D."),
   ('2023', "Développement d'un jeu vidéo."),
  ],
  'activities_title': 'LANGUES & ENGAGEMENTS',
  'activities': [
   ('Langues', 'Français (natif), anglais (C1), espagnol (intermédiaire).'),
   ('Bénévolat', 'Service et distribution de repas aux Restaurants du Cœur (2016-2022).'),
   ("Centres d'intérêt", 'Force athlétique, football, programmation.'),
  ]
 },
 'en': {
  'subtitle': 'AI & Machine Learning | NLP, LLM Fine-tuning',
  'linkedin': 'LinkedIn profile',
  'summary_title': 'SUMMARY',
  'summary': 'Engineering student in computer science at ENSEEIHT, focused on artificial intelligence and natural language processing. After a 2026 internship on open-source LLM fine-tuning at CPMS, now developing AI and machine learning solutions for the same organization as a freelancer.',
  'skills_title': 'SKILLS',
  'skills': [
   ('AI / NLP', 'Transformers, BERT-family models, document classification, supervised LLM fine-tuning, LoRA, QLoRA, model evaluation.'),
   ('Libraries', 'PyTorch, Hugging Face (Transformers, Datasets, PEFT, TRL), Unsloth, bitsandbytes.'),
   ('Programming / tools', 'Python, C, OCaml, Ada, SQL, Linux; data preparation, tokenization, GPU optimization.'),
  ],
  'experience_title': 'PROFESSIONAL EXPERIENCE',
  'experience': [
   ('Freelance AI & Machine Learning Engineer | CPMS', 'Oct 2026 - Present', 'Centre de Prévoyance Médico-Sociale | Toulouse, France | Remote', [
    'Developing document-classification solutions with machine learning and BERT-family NLP models.',
    'Fine-tuning language models for domain-specific needs; evaluating performance and analyzing errors.',
    'Preparing and processing datasets, and contributing to AI model integration into applications.',
   ]),
   ('AI / LLM Fine-tuning Intern | CPMS', 'Jun 2026 - Jul 2026', 'Centre de Prévoyance Médico-Sociale | Paris, France | On-site', [
    'Studied Transformer architectures and adapted open-source LLMs to a specific business use case involving sensitive medical documents and privacy / GDPR requirements.',
    'Built instruction-response datasets; performed cleaning, normalization, tokenization and prompt / chat-template formatting.',
    'Ran supervised fine-tuning experiments using LoRA / QLoRA and 4-/8-bit quantization to optimize GPU memory use.',
    'Tuned training settings (learning rate, batch size, epochs, gradient accumulation and warmup).',
    'Compared prompted and fine-tuned models through evaluation and error analysis; studied overfitting, hallucinations and generalization.',
   ]),
  ],
  'education_title': 'EDUCATION',
  'education': [
   ('Engineering Degree in Computer Science | ENSEEIHT - Toulouse INP', '2025 - 2028', 'Toulouse, France | Currently enrolled'),
   ('Preparatory Classes (CPGE MP2I / MPI) | Lycée Janson-de-Sailly', '2022 - 2025', 'Paris, France'),
  ],
  'projects_title': 'SELECTED PROJECTS',
  'projects': [
   ('2025', 'Machine learning model for predicting urban expansion.'),
   ('2024', 'Development of a 2D football match simulator.'),
   ('2023', 'Video game development.'),
  ],
  'activities_title': 'LANGUAGES & ACTIVITIES',
  'activities': [
   ('Languages', 'French (native), English (C1), Spanish (intermediate).'),
   ('Volunteering', 'Meal service and distribution at Les Restaurants du Cœur (2016-2022).'),
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
    c.drawRightString(w-margin-58,h-55,'Toulouse, France')
    c.setFillColor(accent)
    c.drawRightString(w-margin-58,h-71,data['linkedin'])
    tw=pdfmetrics.stringWidth(data['linkedin'],FONT,9.5)
    c.linkURL(LINKEDIN,(w-margin-58-tw,h-74,w-margin-58,h-62),relative=0)
    code=qr.QrCodeWidget(LINKEDIN)
    x1,y1,x2,y2=code.getBounds()
    d=Drawing(47,47,transform=[47/(x2-x1),0,0,47/(y2-y1),0,0])
    d.add(code)
    renderPDF.draw(d,c,w-margin-47,h-87)
    c.linkURL(LINKEDIN,(w-margin-47,h-87,w-margin,h-40),relative=0)
    c.setStrokeColor(accent)
    c.setLineWidth(1.3)
    c.line(margin,h-100,w-margin,h-100)
    y=h-109
    body=ParagraphStyle('body',fontName=FONT,fontSize=9.8,leading=12.6,textColor=ink,spaceAfter=0)
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
        para(escape(name),title,width=content-date_width-14,gap=1)
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
        para(f'<b>{year}</b> | {escape(value)}',gap=2)
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
