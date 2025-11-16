import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Tu es un assistant intelligent spécialisé dans la gestion d'écoles fondamentales belges. Tu aides les directeurs et le personnel administratif dans toutes les facettes de la gestion scolaire.

Tes domaines d'expertise incluent :

**ÉLÈVES :**
- Gestion des inscriptions et dossiers élèves
- Suivi des absences et retards
- Organisation des classes et répartition
- Suivi des résultats scolaires
- Gestion des besoins spécifiques (dyslexie, TDAH, etc.)
- Communication avec les parents

**ENSEIGNANTS :**
- Gestion des dossiers du personnel enseignant
- Attribution des classes et matières
- Suivi des formations continues (IFC)
- Évaluation et accompagnement pédagogique
- Gestion des remplacements

**PERSONNEL :**
- Gestion du personnel administratif et d'entretien
- Contrats de travail et statuts
- Congés et absences
- Évaluations et entretiens

**PERSONNES RESPONSABLES :**
- Base de données des parents/tuteurs
- Coordonnées et contacts d'urgence
- Autorisations diverses
- Communication (réunions, bulletins)

**HORAIRES DES COURS :**
- Élaboration des grilles horaires
- Respect des normes de la Fédération Wallonie-Bruxelles
- Organisation des cours (primaire/maternelle)
- Gestion des activités parascolaires
- Récréations et surveillance

**HORAIRES DE TRAVAIL :**
- Planning du personnel
- Gestion des prestations
- Horaires variables et temps partiels
- Congés et récupérations

**FINANCES :**
- Budget annuel de l'école
- Subventions (FWB, commune)
- Frais scolaires et voyages
- Comptabilité et factures
- Caisse de l'école
- Gratuité scolaire (respect des règles)

**FOURNITURES :**
- Liste du matériel nécessaire
- Commandes groupées
- Gestion des stocks
- Fournisseurs et devis
- Respect du principe de gratuité

Tu donnes des conseils pratiques, respectes la législation belge (décrets de la FWB), et proposes des solutions concrètes. Tu es professionnel, précis et bienveillant.`;

interface Message {
  role: string;
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Simulate AI response for demo purposes
    // In production, this would call an AI API like OpenAI, Anthropic, etc.
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content.toLowerCase();

    let response = '';

    // Pattern matching for common queries
    if (userQuery.includes('élève') || userQuery.includes('eleve')) {
      response = `Je peux vous aider avec la gestion des élèves. Voici ce que je peux faire :

📋 **Inscriptions** : Aide à l'inscription de nouveaux élèves, constitution des dossiers
📊 **Suivi** : Organisation du suivi des présences, absences justifiées/non justifiées
🏫 **Classes** : Répartition des élèves par niveau et classe (maternel/primaire)
📈 **Résultats** : Aide au suivi des bulletins et résultats scolaires
🎯 **Besoins spécifiques** : Gestion des PAI, aménagements raisonnables

Que souhaitez-vous faire précisément ?`;
    } else if (userQuery.includes('enseignant') || userQuery.includes('professeur')) {
      response = `Pour la gestion des enseignants, je peux vous assister sur :

👥 **Personnel** : Gestion des dossiers enseignants (nominations, désignations)
📚 **Attribution** : Répartition des classes et matières selon les compétences
⏰ **Horaires** : Organisation des prestations (24h/semaine primaire, charges)
📖 **Formations** : Suivi des formations continues IFC obligatoires
🔄 **Remplacements** : Gestion des absences et organisation des remplaçants

Quel aspect souhaitez-vous gérer ?`;
    } else if (userQuery.includes('horaire')) {
      response = `Pour l'organisation des horaires :

⏰ **Cours** : Création de grilles horaires conformes (28 périodes/semaine)
🎨 **Activités** : Organisation des cours de gym, néerlandais, religion/morale
🔔 **Récréations** : Planning des récréations et surveillance de cour
🏃 **Parascolaire** : Organisation des activités avant/après l'école
📅 **Personnel** : Planning des prestations du personnel

Que voulez-vous organiser ?`;
    } else if (userQuery.includes('finance') || userQuery.includes('budget') || userQuery.includes('euro')) {
      response = `Pour la gestion financière de l'école :

💰 **Budget** : Élaboration du budget annuel (fonctionnement, investissements)
📥 **Subventions** : Suivi des dotations FWB et subsides communaux
💳 **Frais** : Gestion des frais scolaires (respect du plafond légal)
📄 **Factures** : Traitement des factures fournisseurs
🎒 **Gratuité** : Respect de la gratuité scolaire en primaire et maternel
💵 **Caisse** : Gestion de la caisse de l'école

Sur quel point avez-vous besoin d'aide ?`;
    } else if (userQuery.includes('fourniture') || userQuery.includes('commande') || userQuery.includes('matériel')) {
      response = `Pour la gestion des fournitures scolaires :

📦 **Commandes** : Organisation des commandes groupées de fournitures
📋 **Listes** : Établissement des listes de matériel par niveau
📊 **Stock** : Gestion des stocks (papier, crayons, manuels)
💼 **Fournisseurs** : Recherche de fournisseurs et comparaison de devis
✅ **Gratuité** : Respect du principe de gratuité (fournitures collectives)
📚 **Manuels** : Gestion de la bibliothèque de manuels scolaires

Que souhaitez-vous commander ou gérer ?`;
    } else if (userQuery.includes('responsable') || userQuery.includes('parent') || userQuery.includes('tuteur')) {
      response = `Pour la gestion des personnes responsables :

👨‍👩‍👧 **Contacts** : Base de données des parents/tuteurs légaux
📞 **Urgence** : Gestion des numéros d'urgence et personnes autorisées
📝 **Autorisations** : Gestion des autorisations (photos, sorties, médicaments)
💬 **Communication** : Organisation des réunions de parents, envoi d'infos
📧 **Courriers** : Rédaction et envoi de courriers aux familles

Quel aspect souhaitez-vous gérer ?`;
    } else if (userQuery.includes('rapport') || userQuery.includes('statistique')) {
      response = `Je peux générer différents types de rapports :

📊 **Statistiques** : Effectifs, taux de présence, réussite scolaire
📈 **Évolution** : Évolution des inscriptions sur plusieurs années
💰 **Financier** : Rapports budgétaires et utilisation des subventions
👥 **Personnel** : Rapports sur le personnel (ETP, absences)
📋 **Administratif** : Rapports pour la FWB ou les autorités communales

Quel type de rapport souhaitez-vous ?`;
    } else if (userQuery.includes('bonjour') || userQuery.includes('salut') || userQuery.includes('hello')) {
      response = `Bonjour ! Je suis votre assistant pour la gestion de l'école fondamentale.

Je peux vous aider dans tous les aspects de la gestion :
- 👨‍🎓 Élèves et inscriptions
- 👩‍🏫 Enseignants et personnel
- 📅 Horaires et plannings
- 💰 Finances et budget
- 📦 Commandes de fournitures
- 👨‍👩‍👧 Relations avec les parents

Comment puis-je vous assister aujourd'hui ?`;
    } else {
      response = `Je suis là pour vous aider dans la gestion de votre école fondamentale belge.

Voici ce que je peux faire pour vous :

🎓 **Gestion des élèves** : inscriptions, suivi, répartition
👨‍🏫 **Personnel enseignant** : dossiers, attributions, formations
👥 **Personnel administratif** : contrats, horaires, congés
👪 **Personnes responsables** : contacts, autorisations, communication
📅 **Horaires des cours** : grilles conformes FWB
⏰ **Horaires de travail** : planning du personnel
💰 **Finances** : budget, subventions, frais scolaires
📦 **Fournitures** : commandes, stocks, fournisseurs

Posez-moi une question spécifique ou dites-moi ce que vous souhaitez gérer !`;
    }

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors du traitement de votre demande.' },
      { status: 500 }
    );
  }
}
