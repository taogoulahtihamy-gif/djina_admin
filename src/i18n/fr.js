const fr = {
  translation: {
    common: {
      dashboard: 'Tableau de bord',
      courses: 'Courses',
      drivers: 'Chauffeurs',
      documents: 'Documents',
      customers: 'Clients',
      vehicles: 'Véhicules',
      payments: 'Paiements',
      complaints: 'Réclamations',
      settings: 'Paramètres',
      myProfile: 'Mon profil',
      logout: 'Se déconnecter',
      refresh: 'Actualiser',
      loading: 'Chargement…',
      toProcess: 'à traiter',
      noNotifications: 'Aucune nouvelle notification',
      notificationsLoadError: 'Impossible de charger les notifications.',
      administrator: 'Administrateur',
      superAdmin: 'Super Admin',
      account: 'Compte principal',
    },

    topbar: {
      courses: {
        eyebrow: 'Exploitation',
        title: 'Courses',
        description:
          'Suivez et contrôlez l’ensemble des courses enregistrées sur Djina.',
      },

      drivers: {
        eyebrow: 'Exploitation',
        title: 'Chauffeurs',
        description:
          'Suivez les chauffeurs, leur disponibilité et leur activité sur Djina.',
      },

      documents: {
        eyebrow: 'Conformité',
        title: 'Documents',
        description:
          'Contrôlez et validez les documents transmis par les chauffeurs.',
      },

      customers: {
        eyebrow: 'Utilisateurs',
        title: 'Clients',
        description:
          'Consultez les clients inscrits et leur activité sur Djina.',
      },

      vehicles: {
        eyebrow: 'Exploitation',
        title: 'Véhicules',
        description:
          'Consultez les véhicules enregistrés et leur affectation aux chauffeurs.',
      },

      payments: {
        eyebrow: 'Finance',
        title: 'Paiements',
        description:
          'Suivez les paiements, les encaissements et leur état sur Djina.',
      },

      complaints: {
        eyebrow: 'Support',
        title: 'Réclamations',
        description:
          'Consultez et traitez les réclamations transmises par les clients.',
      },

      settings: {
        eyebrow: 'Configuration',
        title: 'Paramètres',
        description:
          'Personnalisez l’administration, la sécurité et vos préférences.',
      },

      dashboard: {
        eyebrow: 'Centre de pilotage',
        title: 'Pilotage de la plateforme',
        description:
          'Suivez l’activité, les courses, les chauffeurs et les opérations en temps réel.',
      },
    },

    settings: {
      language: 'Langue',
      languageDescription:
        'Choisissez la langue utilisée dans l’interface d’administration.',
      currentLanguage: 'Langue actuelle',

      french: 'Français',
      english: 'Anglais',
      arabic: 'Arabe',

      adminProfile: 'Profil administrateur',
      adminProfileDescription:
        'Informations du compte connecté.',

      name: 'Nom',
      role: 'Rôle',
      account: 'Compte',
      active: 'Actif',
      editProfile: 'Modifier le profil',

      notifications: 'Notifications',
      notificationsDescription:
        'Choisissez les événements à surveiller.',

      complaints: 'Réclamations',
      newComplaint: 'Nouvelle réclamation client',

      payments: 'Paiements',
      paymentEvent:
        'Paiement ou anomalie de transaction',

      documents: 'Documents',
      newDocument: 'Nouveau document chauffeur',

      courses: 'Courses',
      courseEvent:
        'Événements importants sur une course',

      appearance: 'Apparence',
      appearanceDescription:
        'Préférences visuelles de l’administration.',

      light: 'Clair',
      dark: 'Sombre',
      system: 'Système',

      security: 'Sécurité',
      securityDescription:
        'Gestion de l’accès au compte.',

      changePassword: 'Modifier le mot de passe',
      changePasswordDescription:
        'Mettre à jour les identifiants du compte',

      activeSessions: 'Sessions actives',
      activeSessionsDescription:
        'Vérifier les connexions au compte',

      about: 'À propos',
      aboutDescription:
        'Informations sur l’administration Djina.',

      application: 'Application',
      version: 'Version',
      environment: 'Environnement',
      development: 'Développement',
      commission: {
        title: 'Commission Djina', description: 'Configuration du taux appliqué aux courses terminées.',
        currentRate: 'Taux actuel', save: 'Enregistrer',
        note: 'Ce taux est appliqué aux prochaines courses terminées.',
        saved: 'Le taux de commission a été enregistré.',
        readOnly: 'Seul un super administrateur peut modifier ce taux.',
        loadError: 'Impossible de charger le taux de commission.', saveError: 'Impossible d’enregistrer le taux.', forbidden: 'Seul un super administrateur peut modifier ce taux.',
      },
    },

    commission: {
      grossRevenue: 'Chiffre d’affaires brut', djinaCommission: 'Commission Djina',
      driverNet: 'Revenu net chauffeur', coursePrice: 'Prix de la course',
      rate: 'Taux de commission Djina', rateApplied: 'Taux appliqué', status: 'Statut de la commission',
      totalGenerated: 'Commission totale générée', toSettle: 'Commission à reverser à Djina', paid: 'Commission versée',
      paidAt: 'Date du versement', reference: 'Référence du versement',
      statuses: { pending: 'En attente', paid: 'Versée' },
    },

    dashboard: {
      createAdministrator:
        'Créer un administrateur',
      commission: {
        gross: 'Volume total des courses', generated: 'Commissions générées', collected: 'Revenus Djina encaissés',
        pending: 'Commissions en attente', driverNet: 'Revenus nets chauffeurs', aria: 'Indicateurs financiers',
        note: 'Les revenus Djina correspondent uniquement aux commissions dont le versement a été confirmé.',
      },

      primaryStats: {
        customers: {
          title: 'Clients',
          description:
            'Utilisateurs inscrits',
        },

        drivers: {
          title: 'Chauffeurs',
          description:
            'Chauffeurs enregistrés',
        },

        rides: {
          title: 'Courses',
          description:
            'Courses enregistrées',
        },

        revenue: {
          title: 'Volume total des courses',
          description:
            'Courses terminées',
        },
      },

      operationalStats: {
        activeDrivers:
          'Chauffeurs actifs',
        pendingRides:
          'Courses en attente',
        pendingDocuments:
          'Documents à valider',
        pendingComplaints:
          'Réclamations en attente',
      },

      activityCard: {
        title: 'Activité des courses',
        description:
          "Évolution de l'activité de la plateforme",
        period: '7 derniers jours',
        periodAria:
          'Période affichée : 7 derniers jours',
        chartAria:
          "Emplacement du graphique d'activité",
        placeholder:
          "Les données d'activité seront affichées ici",
      },

      distributionCard: {
        title: 'Répartition des courses',
        description:
          'Vue d’ensemble par statut',

        status: {
          pending: 'En attente',
          active: 'En cours',
          completed: 'Terminées',
          cancelled: 'Annulées',
        },
      },

      pendingActions: {
        title: 'À traiter',
        description:
          'Actions nécessitant votre attention',
        documents:
          'Documents chauffeurs en attente',
        complaints:
          'Réclamations en attente',
        payments:
          'Paiements à vérifier',
      },

      recentCourses: {
        title: 'Dernières courses',
        description:
          'Courses enregistrées récemment',

        columns: {
          course: 'Course',
          customer: 'Client',
          driver: 'Chauffeur',
          route: 'Trajet',
          status: 'Statut',
          amount: 'Montant',
        },
      },

      aria: {
        primaryIndicators:
          'Indicateurs principaux',
        operationalIndicators:
          'Indicateurs opérationnels',
        rideAnalysis:
          'Analyse des courses',
        recentActivity:
          'Activité récente et actions à traiter',
      },
    },

    courses: {
      stats: {
        total: 'Toutes les courses',
        pending: 'En attente',
        active: 'En cours',
        completed: 'Terminées',
      },

      searchPlaceholder:
        'Rechercher une course, un client, un chauffeur...',
      searchLabel: 'Rechercher une course',
      filterLabel: 'Filtrer par statut',
      refresh: 'Actualiser',
      retry: 'Réessayer',

      filters: {
        all: 'Tous les statuts',
      },

      status: {
        requested: 'En attente',
        accepted: 'Acceptée',
        arriving: 'En approche',
        picked_up: 'En course',
        completed: 'Terminée',
        cancelled: 'Annulée',
      },

      service: {
        economy: 'Économie',
        confort: 'Confort',
        confort_plus: 'Confort +',
      },

      table: {
        course: 'Course',
        customer: 'Client',
        driver: 'Chauffeur',
        route: 'Trajet',
        service: 'Service',
        status: 'Statut',
        amount: 'Montant',
        requestedAt: 'Demandée le',
        actions: 'Actions',
      },

      empty: {
        noCourses: 'Aucune course enregistrée',
        noCoursesDescription:
          'Les nouvelles courses apparaîtront ici.',
        noResults: 'Aucun résultat',
        noResultsDescription:
          'Modifiez votre recherche ou vos filtres.',
      },

      errors: {
        title: 'Chargement impossible',
        load:
          'Impossible de charger les courses pour le moment.',
      },

      fallback: {
        customer: 'Client',
        unassigned: 'Non attribué',
        departure: 'Départ',
        destination: 'Destination',
      },

      viewCourse: 'Voir {{course}}',
    },

    courseDetails: {
      back: 'Retour aux courses',

      errors: {
        load:
          'Impossible de charger cette course.',
        notFound: 'Course introuvable',
      },

      cancel: {
        trigger: 'Annuler la course',
        title: 'Annuler cette course',
        description:
          'Cette action changera immédiatement le statut de la course.',
        close: 'Fermer',
        reasonLabel: 'Motif de l’annulation',
        placeholder:
          'Ex. demande du client, incident, course créée par erreur...',
        reasonRequired:
          'Indiquez le motif de l’annulation.',
        error:
          'Impossible d’annuler la course pour le moment.',
        back: 'Retour',
        cancelling: 'Annulation...',
        confirm: 'Confirmer l’annulation',
      },

      summary: {
        course: 'Course',
        departure: 'Départ',
        destination: 'Destination',
        service: 'Service',
        distance: 'Distance',
        amount: 'Montant',
      },

      customer: {
        title: 'Client',
        description:
          'Informations du demandeur',
      },

      driver: {
        title: 'Chauffeur',
        description:
          'Chauffeur affecté à la course',
      },

      fields: {
        name: 'Nom',
        phone: 'Téléphone',
        email: 'E-mail',
        rating: 'Note',
      },

      route: {
        title: 'Trajet',
        description:
          'Repères et coordonnées',
        coordinatesUnavailable:
          'Coordonnées non disponibles',
      },

      pricing: {
        title: 'Tarification',
        description:
          'Montants de la course',
        estimated: 'Prix estimé',
        final: 'Prix final',
        notDefined: 'Non défini',
      },
      financial: {
        title: 'Répartition financière', description: 'Commission Djina et revenu du chauffeur',
        pending: 'La commission sera générée lorsque la course sera terminée.',
        unavailable: 'Aucune commission n’est encore disponible pour cette course.', loadError: 'Impossible de charger la commission.', forbidden: 'Accès réservé aux administrateurs.',
      },

      cancellation: {
        title:
          'Informations d’annulation',
        description:
          'Détails enregistrés lors de l’annulation',
        by: 'Annulée par',
        reason: 'Motif',
        date: 'Date',
        noReason:
          'Aucun motif renseigné',
      },

      timeline: {
        title:
          'Historique de la course',
        description:
          'Étapes enregistrées par la plateforme',
        requested: 'Course demandée',
        accepted: 'Course acceptée',
        arriving:
          'Chauffeur en approche',
        pickedUp:
          'Client pris en charge',
        completed: 'Course terminée',
        cancelled: 'Course annulée',
        empty:
          'Aucun événement enregistré.',
      },

      fallback: {
        notProvidedMasculine:
          'Non renseigné',
        notProvidedFeminine:
          'Non renseignée',
      },
    },

    drivers: {
      stats: {
        total: 'Total chauffeurs',
        enabled: 'Chauffeurs actifs',
        online: 'En ligne',
        averageRating: 'Note moyenne',
      },

      searchPlaceholder:
        'Rechercher un chauffeur, téléphone, e-mail...',
      searchLabel: 'Rechercher un chauffeur',
      filterLabel: 'Filtrer les chauffeurs',
      refresh: 'Actualiser',
      retry: 'Réessayer',

      filters: {
        all: 'Tous les chauffeurs',
      },

      status: {
        online: 'En ligne',
        offline: 'Hors ligne',
        enabled: 'Actif',
        disabled: 'Désactivé',
        enabledPlural: 'Actifs',
        disabledPlural: 'Désactivés',
      },

      table: {
        driver: 'Chauffeur',
        contact: 'Contact',
        availability: 'Disponibilité',
        account: 'Compte',
        rating: 'Note',
        ratings: 'Évaluations',
        actions: 'Actions',
      },

      empty: {
        noDrivers:
          'Aucun chauffeur enregistré',
        noDriversDescription:
          'Les chauffeurs inscrits apparaîtront ici.',
        noResults: 'Aucun résultat',
        noResultsDescription:
          'Modifiez votre recherche ou vos filtres.',
      },

      errors: {
        title: 'Chargement impossible',
        load:
          'Impossible de charger les chauffeurs pour le moment.',
      },

      fallback: {
        driver: 'Chauffeur',
      },

      driverNumber:
        'Chauffeur #{{id}}',
      viewDriver: 'Voir {{name}}',
    },

    driverDetails: {
      back: 'Retour aux chauffeurs',
      driverNumber:
        'Chauffeur #{{id}}',
      profileDescription:
        'Profil chauffeur enregistré sur Djina.',

      errors: {
        load:
          'Impossible de charger ce chauffeur.',
        notFound:
          'Chauffeur introuvable',
      },

      account: {
        active: 'Compte actif',
        disabled: 'Compte désactivé',
      },

      summary: {
        rating: 'Note',
        ratings: 'Évaluations',
        availability: 'Disponibilité',
      },

      personal: {
        title:
          'Informations personnelles',
        description:
          'Coordonnées du chauffeur',
      },

      state: {
        title: 'État du chauffeur',
        description:
          'Disponibilité et accès',
      },

      fields: {
        name: 'Nom',
        phone: 'Téléphone',
        email: 'E-mail',
        availability: 'Disponibilité',
        account: 'Compte',
        averageRating: 'Note moyenne',
      },

      noRating: 'Aucune note',

      vehicle: {
        title: 'Véhicule',
        description:
          'Véhicule associé au chauffeur',
        model: 'Modèle',
        type: 'Type',
        licensePlate: 'Immatriculation',
        confort: 'Confort',
        state: 'État',
        active: 'Actif',
        inactive: 'Inactif',
        none: 'Aucun véhicule associé',
        noneDescription:
          'Aucun véhicule n’est actuellement rattaché à ce chauffeur.',
      },

      vehicleTypes: {
        car: 'Voiture',
        motorcycle: 'Moto',
        bike: 'Moto',
      },

      common: {
        yes: 'Oui',
        no: 'Non',
      },

      activity: {
        title: 'Activité',
        description:
          'Activité du chauffeur sur Djina',
        noCourses: 'Aucune course',
        noCoursesDescription:
          'Ce chauffeur n’a encore aucune course enregistrée.',
        total: 'Total',
        completed: 'Terminées',
        active: 'En cours',
        cancelled: 'Annulées',
        latestCourse: 'Dernière course',
      },
      commission: {
        title: 'Revenus et commissions', description: 'Répartition financière des courses terminées',
        history: 'Historique des commissions', empty: 'Aucune course terminée ne génère encore de commission.',
        columns: { course: 'Course', date: 'Date', route: 'Trajet', price: 'Prix de la course', rate: 'Taux' },
        confirmSettlement: 'Confirmer un versement', settlementSuccess: 'Le versement a été confirmé.',
        errors: { load: 'Impossible de charger les commissions.', settlement: 'Impossible de confirmer le versement.', forbidden: 'Action réservée au super administrateur.' },
      },
      settlement: {
        title: 'Confirmer un versement', close: 'Fermer', pendingCount: 'Commissions sélectionnées', total: 'Montant total à verser',
        courses: 'Courses concernées', mode: 'Mode de versement', reference: 'Référence du versement', date: 'Date du versement',
        confirm: 'Confirmer le versement', cancel: 'Annuler',
        modes: { cash: 'Espèces', airtel: 'Airtel Money', moov: 'Moov Money', bank: 'Virement' },
      },
    },

    documents: {
      stats: {
        total: 'Total documents',
        pending: 'En attente',
        approved: 'Validés',
        rejected: 'Rejetés',
      },

      searchPlaceholder:
        'Rechercher un document, chauffeur...',
      searchLabel:
        'Rechercher un document',
      filterLabel:
        'Filtrer les documents',
      refresh: 'Actualiser',
      retry: 'Réessayer',

      filters: {
        all: 'Tous les statuts',
      },

      types: {
        driving_license:
          'Permis de conduire',
        insurance: 'Assurance',
        id_card: 'Pièce d’identité',
        other: 'Autre',
      },

      status: {
        pending: 'En attente',
        approved: 'Validé',
        rejected: 'Rejeté',
        approvedPlural: 'Validés',
        rejectedPlural: 'Rejetés',
      },

      table: {
        driver: 'Chauffeur',
        document: 'Document',
        status: 'Statut',
        sentAt: 'Envoyé le',
        reviewedAt: 'Traité le',
        actions: 'Actions',
      },

      driverNumber:
        'Chauffeur #{{id}}',

      approve: 'Valider',
      reject: 'Rejeter',
      processing: 'Traitement...',
      processed: 'Traité',

      empty: {
        noDocuments:
          'Aucun document enregistré',
        noDocumentsDescription:
          'Les documents transmis par les chauffeurs apparaîtront ici.',
        noResults: 'Aucun résultat',
        noResultsDescription:
          'Modifiez votre recherche ou vos filtres.',
      },

      errors: {
        title: 'Chargement impossible',
        load:
          'Impossible de charger les documents pour le moment.',
        approve:
          'Impossible de valider ce document.',
        reject:
          'Impossible de rejeter ce document.',
        reasonRequired:
          'Indiquez le motif du rejet.',
      },

      fallback: {
        driver: 'Chauffeur',
        document: 'Document',
      },

      rejectDialog: {
        title: 'Rejeter ce document',
        description:
          'Indiquez la raison du rejet. Elle sera enregistrée avec le document.',
        reasonLabel: 'Motif du rejet',
        placeholder:
          'Ex. document illisible, expiré ou incomplet...',
        cancel: 'Annuler',
        rejecting: 'Rejet...',
        confirm: 'Confirmer le rejet',
      },
    },

    customers: {
      stats: {
        total: 'Total clients',
        profiles: 'Profils enregistrés',
      },

      searchPlaceholder:
        'Rechercher un client, téléphone, e-mail...',
      searchLabel:
        'Rechercher un client',
      refresh: 'Actualiser',
      retry: 'Réessayer',

      table: {
        customer: 'Client',
        phone: 'Téléphone',
        email: 'E-mail',
        registeredAt: 'Inscrit le',
        actions: 'Actions',
      },

      empty: {
        noCustomers:
          'Aucun client enregistré',
        noCustomersDescription:
          'Les clients inscrits sur Djina apparaîtront ici.',
        noResults: 'Aucun résultat',
        noResultsDescription:
          'Modifiez votre recherche.',
      },

      errors: {
        title: 'Chargement impossible',
        load:
          'Impossible de charger les clients pour le moment.',
      },

      fallback: {
        customer: 'Client',
      },

      customerNumber:
        'Client #{{id}}',
      viewCustomer: 'Voir {{name}}',
    },

    customerDetails: {
      back: 'Retour aux clients',
      customerNumber:
        'Client #{{id}}',
      profileDescription:
        'Profil client enregistré sur Djina.',

      errors: {
        load:
          'Impossible de charger ce client.',
        notFound: 'Client introuvable',
      },

      summary: {
        courses: 'Courses',
        completed: 'Terminées',
        cancelled: 'Annulées',
      },

      personal: {
        title:
          'Informations personnelles',
        description:
          'Coordonnées du client',
      },

      fields: {
        name: 'Nom',
        phone: 'Téléphone',
        email: 'E-mail',
        registeredAt: 'Inscrit le',
      },

      activity: {
        title: 'Activité',
        description:
          'Activité du client sur Djina',
        total: 'Total',
        completed: 'Terminées',
        active: 'En cours',
        cancelled: 'Annulées',
      },

      history: {
        title:
          'Historique des courses',
        description:
          'Courses enregistrées pour ce client',
        empty:
          'Aucune course enregistrée',
        emptyDescription:
          'Ce client n’a pas encore effectué de course sur Djina.',
      },

      latest: {
        course: 'Dernière course',
        route: 'Trajet',
        view: 'Voir la course',
      },
    },

    vehicles: {
      stats: {
        total: 'Total véhicules',
        active: 'Actifs',
        inactive: 'Inactifs',
        comfort: 'Avec confort',
      },

      searchPlaceholder:
        'Rechercher un véhicule, chauffeur, immatriculation...',
      searchLabel:
        'Rechercher un véhicule',
      filterLabel:
        'Filtrer les véhicules',
      refresh: 'Actualiser',
      retry: 'Réessayer',

      filters: {
        all: 'Tous les véhicules',
      },

      status: {
        active: 'Actif',
        inactive: 'Inactif',
        activePlural: 'Actifs',
        inactivePlural: 'Inactifs',
      },

      types: {
        car: 'Voiture',
        motorbike: 'Moto',
        motorcycle: 'Moto',
        bike: 'Moto',
        van: 'Fourgon',
        other: 'Autre',
      },

      common: {
        yes: 'Oui',
        no: 'Non',
      },

      table: {
        vehicle: 'Véhicule',
        licensePlate: 'Immatriculation',
        driver: 'Chauffeur',
        comfort: 'Confort',
        state: 'État',
        actions: 'Actions',
      },

      empty: {
        noVehicles:
          'Aucun véhicule enregistré',
        noVehiclesDescription:
          'Les véhicules enregistrés sur Djina apparaîtront ici.',
        noResults: 'Aucun résultat',
        noResultsDescription:
          'Modifiez votre recherche ou vos filtres.',
      },

      errors: {
        title: 'Chargement impossible',
        load:
          'Impossible de charger les véhicules pour le moment.',
      },

      fallback: {
        vehicle: 'Véhicule',
        driver: 'Chauffeur',
        unassigned: 'Non attribué',
      },

      driverNumber:
        'Chauffeur #{{id}}',
      viewVehicle: 'Voir {{name}}',
    },

    vehicleDetails: {
      back: 'Retour aux véhicules',
      vehicleNumber:
        'Véhicule #{{id}}',

      errors: {
        load:
          'Impossible de charger ce véhicule.',
        notFound:
          'Véhicule introuvable',
      },

      summary: {
        type: 'Type',
        comfort: 'Confort',
        state: 'État',
      },

      information: {
        title:
          'Informations véhicule',
        description:
          'Caractéristiques enregistrées',
      },

      fields: {
        model: 'Modèle',
        type: 'Type',
        licensePlate: 'Immatriculation',
        comfort: 'Confort',
        registeredAt: 'Enregistré le',
        name: 'Nom',
        phone: 'Téléphone',
        email: 'E-mail',
        driver: 'Chauffeur',
      },

      driver: {
        title: 'Chauffeur associé',
        description:
          'Conducteur affecté au véhicule',
        none:
          'Aucun chauffeur associé',
        noneDescription:
          'Ce véhicule n’est actuellement attribué à aucun chauffeur.',
      },

      image: {
        title: 'Photo du véhicule',
        description:
          'Visuel associé au véhicule',
        none: 'Aucune photo',
        noneDescription:
          'Aucune image n’a encore été enregistrée pour ce véhicule.',
      },
    },

    payments: {
      stats: {
        total: 'Total paiements',
        pending: 'En attente',
        paid: 'Payés',
        failed: 'Annulés / échoués',
      },

      collectedAmount:
        'Montant encaissé',

      searchPlaceholder:
        'Rechercher un paiement, course, transaction...',
      searchLabel:
        'Rechercher un paiement',
      filterLabel:
        'Filtrer les paiements',
      refresh: 'Actualiser',

      filters: {
        all: 'Tous les statuts',
      },

      status: {
        pending: 'En attente',
        paid: 'Payé',
        cancelled: 'Annulé',
        failed: 'Échoué',
        paidPlural: 'Payés',
        cancelledPlural: 'Annulés',
        failedPlural: 'Échoués',
      },

      modes: {
        cash: 'Espèces',
        mobile_money: 'Mobile Money',
        visa: 'Visa',
      },

      table: {
        payment: 'Paiement',
        course: 'Course',
        mode: 'Mode',
        amount: 'Montant brut',
        commission: 'Commission',
        driverNet: 'Net chauffeur',
        commissionStatus: 'Statut de commission',
        status: 'Statut',
        date: 'Date',
        actions: 'Actions',
      },

      errors: {
        title: 'Chargement impossible',
        load:
          'Impossible de charger les paiements pour le moment.',
        markPaid:
          'Impossible de marquer ce paiement comme payé.',
      },

      empty: {
        noPayments:
          'Aucun paiement enregistré',
        noPaymentsDescription:
          'Les paiements effectués sur Djina apparaîtront ici.',
        noResults: 'Aucun résultat',
        noResultsDescription:
          'Modifiez votre recherche ou vos filtres.',
      },

      paymentNumber:
        'Paiement #{{id}}',
      noReference: 'Sans référence',
      processing: 'Traitement...',
      markPaid: 'Marquer payé',
      processed: 'Traité',
      viewPayment:
        'Voir le paiement #{{id}}',
      commissionErrors: { load: 'Impossible de charger les commissions.', forbidden: 'Accès réservé aux administrateurs.' },
    },

    paymentDetails: {
      back: 'Retour aux paiements',
      paymentNumber:
        'Paiement #{{id}}',
      modeUndefined:
        'Mode non défini',

      errors: {
        load:
          'Impossible de charger ce paiement.',
        notFound:
          'Paiement introuvable',
      },

      summary: {
        course: 'Course',
        status: 'Statut',
        currency: 'Devise',
      },

      information: {
        title:
          'Informations du paiement',
        description:
          'Détails de la transaction',
      },
      split: {
        title: 'Répartition du paiement', description: 'Montant payé, commission et revenu chauffeur',
        paidAmount: 'Montant payé',
        loadError: 'Impossible de charger la répartition de commission.', forbidden: 'Accès réservé aux administrateurs.',
      },

      fields: {
        amount: 'Montant',
        mode: 'Mode',
        provider: 'Fournisseur',
        transaction: 'Transaction',
      },

      course: {
        title: 'Course associée',
        description:
          'Course liée à ce paiement',
        view: 'Voir la course',
      },

      dates: {
        title: 'Dates',
        description:
          'Historique temporel du paiement',
        created: 'Créé le',
        paid: 'Payé le',
        updated: 'Mis à jour le',
      },

      state: {
        title: 'État du paiement',
        description:
          'Statut et éventuel motif d’échec',
        failureReason:
          'Motif d’échec',
      },
    },

    complaints: {
      stats: {
        total: 'Total réclamations',
        pending: 'En attente',
        resolved: 'Résolues',
        rejected: 'Rejetées',
      },

      searchPlaceholder:
        'Rechercher une réclamation, client, course...',
      searchLabel:
        'Rechercher une réclamation',
      filterLabel:
        'Filtrer les réclamations',
      refresh: 'Actualiser',

      filters: {
        all: 'Tous les statuts',
      },

      status: {
        pending: 'En attente',
        resolved: 'Résolue',
        rejected: 'Rejetée',
        resolvedPlural: 'Résolues',
        rejectedPlural: 'Rejetées',
      },

      table: {
        complaint: 'Réclamation',
        customer: 'Client',
        course: 'Course',
        description: 'Description',
        status: 'Statut',
        createdAt: 'Créée le',
        actions: 'Actions',
      },

      empty: {
        noComplaints:
          'Aucune réclamation enregistrée',
        noComplaintsDescription:
          'Les réclamations des clients apparaîtront ici.',
        noResults: 'Aucun résultat',
        noResultsDescription:
          'Modifiez votre recherche ou vos filtres.',
      },

      errors: {
        title: 'Chargement impossible',
        load:
          'Impossible de charger les réclamations pour le moment.',
        resolve:
          'Impossible de résoudre cette réclamation.',
      },

      fallback: {
        customer: 'Client',
      },

      complaintNumber:
        'Réclamation #{{id}}',
      customerNumber:
        'Client #{{id}}',
      resolve: 'Résoudre',
      processed: 'Traité',
      processing: 'Traitement...',
      viewComplaint:
        'Voir la réclamation #{{id}}',

      resolveDialog: {
        title:
          'Résoudre la réclamation',
        description:
          'Vous pouvez ajouter une note de résolution avant de clôturer la réclamation.',
        noteLabel:
          'Note de résolution',
        placeholder:
          'Ex. remboursement effectué, client contacté...',
        cancel: 'Annuler',
        confirm:
          'Confirmer la résolution',
      },
    },


complaintDetails: {
  back: 'Retour aux réclamations',

  complaintNumber: 'Réclamation #{{id}}',

  profileDescription:
    'Réclamation enregistrée sur Djina.',

  common: {
    customer: 'Client',
    course: 'Course',
    status: 'Statut',
  },

  status: {
    pending: 'En attente',
    resolved: 'Résolue',
    rejected: 'Rejetée',
  },

  summary: {
    complaintNumber:
      'Réclamation #{{id}}',

    registered:
      'Réclamation enregistrée sur Djina.',

    customer: 'Client',
    course: 'Course',
    status: 'Statut',
  },

  customer: {
    title: 'Client',

    subtitle:
      'Informations du demandeur',

    description:
      'Informations du demandeur',

    name: 'Nom',
    phone: 'Téléphone',
    email: 'E-mail',

    defaultName: 'Client',
  },

  fields: {
    name: 'Nom',
    customer: 'Client',
    phone: 'Téléphone',
    email: 'E-mail',
  },

  course: {
    title: 'Course associée',

    subtitle:
      'Course concernée par la réclamation',

    description:
      'Course concernée par la réclamation',

    view: 'Voir la course',
  },

  description: {
    title: 'Description',

    subtitle:
      'Motif déclaré par le client',

    description:
      'Motif déclaré par le client',

    empty:
      'Aucune description.',
  },

  dates: {
    title: 'Dates',

    subtitle:
      'Historique de la réclamation',

    description:
      'Historique de la réclamation',

    created: 'Créée le',
    resolved: 'Résolue le',
    updated: 'Mise à jour le',
  },

  resolution: {
    title: 'Résolution',

    subtitle:
      "Traitement effectué par l'administration",

    description:
      'Traitement effectué par l’administration',

    resolvedBy:
      'Résolu par',

    note:
      'Note de résolution',

    noNote:
      'Aucune note de résolution.',

    administrator:
      'Administrateur',

    admin:
      'Administrateur',

    superAdmin:
      'Super Admin',

    administratorNumber:
      'Administrateur #{{id}}',
  },

  errors: {
    load:
      'Impossible de charger cette réclamation.',

    notFound:
      'Réclamation introuvable',
  },
},

  },
}

export default fr
