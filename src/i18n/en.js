const en = {
  translation: {
    common: {
      dashboard: 'Dashboard',
      courses: 'Rides',
      drivers: 'Drivers',
      documents: 'Documents',
      customers: 'Customers',
      vehicles: 'Vehicles',
      payments: 'Payments',
      complaints: 'Complaints',
      settings: 'Settings',
      myProfile: 'My profile',
      logout: 'Sign out',
      refresh: 'Refresh',
      loading: 'Loading…',
      toProcess: 'to process',
      noNotifications: 'No new notifications',
      notificationsLoadError: 'Unable to load notifications.',
      administrator: 'Administrator',
      superAdmin: 'Super Admin',
      account: 'Main account',
    },

    topbar: {
      courses: {
        eyebrow: 'Operations',
        title: 'Rides',
        description:
          'Monitor and manage all rides registered on Djina.',
      },

      drivers: {
        eyebrow: 'Operations',
        title: 'Drivers',
        description:
          'Monitor drivers, their availability and activity on Djina.',
      },

      documents: {
        eyebrow: 'Compliance',
        title: 'Documents',
        description:
          'Review and validate documents submitted by drivers.',
      },

      customers: {
        eyebrow: 'Users',
        title: 'Customers',
        description:
          'View registered customers and their activity on Djina.',
      },

      vehicles: {
        eyebrow: 'Operations',
        title: 'Vehicles',
        description:
          'View registered vehicles and their assigned drivers.',
      },

      payments: {
        eyebrow: 'Finance',
        title: 'Payments',
        description:
          'Monitor payments, collections and their status on Djina.',
      },

      complaints: {
        eyebrow: 'Support',
        title: 'Complaints',
        description:
          'Review and process complaints submitted by customers.',
      },

      settings: {
        eyebrow: 'Configuration',
        title: 'Settings',
        description:
          'Customize administration, security and preferences.',
      },

      dashboard: {
        eyebrow: 'Control center',
        title: 'Platform management',
        description:
          'Monitor activity, rides, drivers and operations in real time.',
      },
    },

    settings: {
      language: 'Language',
      languageDescription:
        'Choose the language used in the administration interface.',
      currentLanguage: 'Current language',

      french: 'French',
      english: 'English',
      arabic: 'Arabic',

      adminProfile: 'Administrator profile',
      adminProfileDescription:
        'Information about the connected account.',

      name: 'Name',
      role: 'Role',
      account: 'Account',
      active: 'Active',
      editProfile: 'Edit profile',

      notifications: 'Notifications',
      notificationsDescription:
        'Choose the events you want to monitor.',

      complaints: 'Complaints',
      newComplaint: 'New customer complaint',

      payments: 'Payments',
      paymentEvent:
        'Payment or transaction anomaly',

      documents: 'Documents',
      newDocument: 'New driver document',

      courses: 'Rides',
      courseEvent:
        'Important ride events',

      appearance: 'Appearance',
      appearanceDescription:
        'Administration display preferences.',

      light: 'Light',
      dark: 'Dark',
      system: 'System',

      security: 'Security',
      securityDescription:
        'Manage account access.',

      changePassword: 'Change password',
      changePasswordDescription:
        'Update account credentials',

      activeSessions: 'Active sessions',
      activeSessionsDescription:
        'Review account connections',

      about: 'About',
      aboutDescription:
        'Information about Djina administration.',

      application: 'Application',
      version: 'Version',
      environment: 'Environment',
      development: 'Development',
      commission: {
        title: 'Djina commission', description: 'Commission rate applied to completed rides.',
        currentRate: 'Current rate', save: 'Save', note: 'This rate is applied to the next completed rides.',
        saved: 'The commission rate has been saved.', readOnly: 'Only a super administrator can change this rate.',
      },
    },

    commission: {
      grossRevenue: 'Gross revenue', djinaCommission: 'Djina commission', driverNet: 'Driver net revenue',
      coursePrice: 'Ride price', rate: 'Djina commission rate', rateApplied: 'Applied rate', status: 'Commission status',
      totalGenerated: 'Total commission generated', toSettle: 'Commission payable to Djina', paid: 'Commission paid',
      paidAt: 'Settlement date', reference: 'Settlement reference', statuses: { pending: 'Pending', paid: 'Paid' },
    },

    dashboard: {
      createAdministrator:
        'Create administrator',
      commission: {
        gross: 'Total ride volume', generated: 'Commissions generated', collected: 'Djina revenue collected',
        pending: 'Pending commissions', driverNet: 'Driver net revenue', aria: 'Financial indicators',
        note: 'Djina revenue only includes commissions whose settlement has been confirmed.',
      },

      primaryStats: {
        customers: {
          title: 'Customers',
          description:
            'Registered users',
        },

        drivers: {
          title: 'Drivers',
          description:
            'Registered drivers',
        },

        rides: {
          title: 'Rides',
          description:
            'Registered rides',
        },

        revenue: {
          title: 'Total ride volume',
          description:
            'Completed rides',
        },
      },

      operationalStats: {
        activeDrivers:
          'Active drivers',
        pendingRides:
          'Pending rides',
        pendingDocuments:
          'Documents to review',
        pendingComplaints:
          'Pending complaints',
      },

      activityCard: {
        title: 'Ride activity',
        description:
          'Evolution of platform activity',
        period: 'Last 7 days',
        periodAria:
          'Displayed period: last 7 days',
        chartAria:
          'Ride activity chart area',
        placeholder:
          'Activity data will be displayed here',
      },

      distributionCard: {
        title: 'Ride distribution',
        description:
          'Overview by status',

        status: {
          pending: 'Pending',
          active: 'In progress',
          completed: 'Completed',
          cancelled: 'Cancelled',
        },
      },

      pendingActions: {
        title: 'To review',
        description:
          'Actions requiring your attention',
        documents:
          'Pending driver documents',
        complaints:
          'Pending complaints',
        payments:
          'Payments to review',
      },

      recentCourses: {
        title: 'Latest rides',
        description:
          'Recently registered rides',

        columns: {
          course: 'Ride',
          customer: 'Customer',
          driver: 'Driver',
          route: 'Route',
          status: 'Status',
          amount: 'Amount',
        },
      },

      aria: {
        primaryIndicators:
          'Main indicators',
        operationalIndicators:
          'Operational indicators',
        rideAnalysis:
          'Ride analysis',
        recentActivity:
          'Recent activity and pending actions',
      },
    },

    courses: {
      stats: {
        total: 'All rides',
        pending: 'Pending',
        active: 'In progress',
        completed: 'Completed',
      },

      searchPlaceholder:
        'Search for a ride, customer or driver...',
      searchLabel: 'Search for a ride',
      filterLabel: 'Filter by status',
      refresh: 'Refresh',
      retry: 'Try again',

      filters: {
        all: 'All statuses',
      },

      status: {
        requested: 'Pending',
        accepted: 'Accepted',
        arriving: 'Driver approaching',
        picked_up: 'In progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },

      service: {
        economy: 'Economy',
        confort: 'Comfort',
        confort_plus: 'Comfort +',
      },

      table: {
        course: 'Ride',
        customer: 'Customer',
        driver: 'Driver',
        route: 'Route',
        service: 'Service',
        status: 'Status',
        amount: 'Amount',
        requestedAt: 'Requested on',
        actions: 'Actions',
      },

      empty: {
        noCourses: 'No rides registered',
        noCoursesDescription:
          'New rides will appear here.',
        noResults: 'No results',
        noResultsDescription:
          'Change your search or filters.',
      },

      errors: {
        title: 'Unable to load',
        load:
          'Unable to load rides at the moment.',
      },

      fallback: {
        customer: 'Customer',
        unassigned: 'Unassigned',
        departure: 'Departure',
        destination: 'Destination',
      },

      viewCourse: 'View {{course}}',
    },

    courseDetails: {
      back: 'Back to rides',

      errors: {
        load: 'Unable to load this ride.',
        notFound: 'Ride not found',
      },

      cancel: {
        trigger: 'Cancel ride',
        title: 'Cancel this ride',
        description:
          'This action will immediately change the ride status.',
        close: 'Close',
        reasonLabel: 'Cancellation reason',
        placeholder:
          'E.g. customer request, incident, ride created by mistake...',
        reasonRequired:
          'Enter the cancellation reason.',
        error:
          'Unable to cancel this ride at the moment.',
        back: 'Back',
        cancelling: 'Cancelling...',
        confirm: 'Confirm cancellation',
      },

      summary: {
        course: 'Ride',
        departure: 'Departure',
        destination: 'Destination',
        service: 'Service',
        distance: 'Distance',
        amount: 'Amount',
      },

      customer: {
        title: 'Customer',
        description:
          'Requester information',
      },

      driver: {
        title: 'Driver',
        description:
          'Driver assigned to the ride',
      },

      fields: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        rating: 'Rating',
      },

      route: {
        title: 'Route',
        description:
          'Landmarks and coordinates',
        coordinatesUnavailable:
          'Coordinates unavailable',
      },

      pricing: {
        title: 'Pricing',
        description:
          'Ride amounts',
        estimated: 'Estimated price',
        final: 'Final price',
        notDefined: 'Not defined',
      },
      financial: { title: 'Financial breakdown', description: 'Djina commission and driver revenue', pending: 'The commission will be generated when the ride is completed.' },

      cancellation: {
        title:
          'Cancellation information',
        description:
          'Details recorded when the ride was cancelled',
        by: 'Cancelled by',
        reason: 'Reason',
        date: 'Date',
        noReason:
          'No reason provided',
      },

      timeline: {
        title: 'Ride history',
        description:
          'Steps recorded by the platform',
        requested: 'Ride requested',
        accepted: 'Ride accepted',
        arriving: 'Driver approaching',
        pickedUp: 'Customer picked up',
        completed: 'Ride completed',
        cancelled: 'Ride cancelled',
        empty: 'No event recorded.',
      },

      fallback: {
        notProvidedMasculine:
          'Not provided',
        notProvidedFeminine:
          'Not provided',
      },
    },

    drivers: {
      stats: {
        total: 'Total drivers',
        enabled: 'Active drivers',
        online: 'Online',
        averageRating: 'Average rating',
      },

      searchPlaceholder:
        'Search for a driver, phone or email...',
      searchLabel: 'Search for a driver',
      filterLabel: 'Filter drivers',
      refresh: 'Refresh',
      retry: 'Try again',

      filters: {
        all: 'All drivers',
      },

      status: {
        online: 'Online',
        offline: 'Offline',
        enabled: 'Active',
        disabled: 'Disabled',
        enabledPlural: 'Active',
        disabledPlural: 'Disabled',
      },

      table: {
        driver: 'Driver',
        contact: 'Contact',
        availability: 'Availability',
        account: 'Account',
        rating: 'Rating',
        ratings: 'Ratings',
        actions: 'Actions',
      },

      empty: {
        noDrivers: 'No drivers registered',
        noDriversDescription:
          'Registered drivers will appear here.',
        noResults: 'No results',
        noResultsDescription:
          'Change your search or filters.',
      },

      errors: {
        title: 'Unable to load',
        load:
          'Unable to load drivers at the moment.',
      },

      fallback: {
        driver: 'Driver',
      },

      driverNumber: 'Driver #{{id}}',
      viewDriver: 'View {{name}}',
    },

    driverDetails: {
      back: 'Back to drivers',
      driverNumber: 'Driver #{{id}}',
      profileDescription:
        'Driver profile registered on Djina.',

      errors: {
        load: 'Unable to load this driver.',
        notFound: 'Driver not found',
      },

      account: {
        active: 'Active account',
        disabled: 'Disabled account',
      },

      summary: {
        rating: 'Rating',
        ratings: 'Ratings',
        availability: 'Availability',
      },

      personal: {
        title: 'Personal information',
        description: 'Driver contact details',
      },

      state: {
        title: 'Driver status',
        description:
          'Availability and access',
      },

      fields: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        availability: 'Availability',
        account: 'Account',
        averageRating: 'Average rating',
      },

      noRating: 'No rating',

      vehicle: {
        title: 'Vehicle',
        description:
          'Vehicle assigned to the driver',
        model: 'Model',
        type: 'Type',
        licensePlate: 'License plate',
        confort: 'Comfort',
        state: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        none: 'No vehicle assigned',
        noneDescription:
          'No vehicle is currently assigned to this driver.',
      },

      vehicleTypes: {
        car: 'Car',
        motorcycle: 'Motorcycle',
        bike: 'Motorcycle',
      },

      common: {
        yes: 'Yes',
        no: 'No',
      },

      activity: {
        title: 'Activity',
        description:
          'Driver activity on Djina',
        noCourses: 'No rides',
        noCoursesDescription:
          'This driver has no registered rides yet.',
        total: 'Total',
        completed: 'Completed',
        active: 'In progress',
        cancelled: 'Cancelled',
        latestCourse: 'Latest ride',
      },
      commission: {
        title: 'Revenue and commissions', description: 'Financial breakdown of completed rides',
        history: 'Commission history', empty: 'No completed ride has generated a commission yet.',
        columns: { course: 'Ride', date: 'Date', route: 'Route', price: 'Ride price', rate: 'Rate' },
        confirmSettlement: 'Confirm settlement', settlementSuccess: 'The settlement has been confirmed.',
      },
      settlement: {
        title: 'Confirm settlement', close: 'Close', pendingCount: 'Selected commissions', total: 'Total amount to settle',
        courses: 'Included rides', mode: 'Settlement method', reference: 'Settlement reference', date: 'Settlement date',
        confirm: 'Confirm settlement', cancel: 'Cancel',
        modes: { cash: 'Cash', airtel: 'Airtel Money', moov: 'Moov Money', bank: 'Bank transfer' },
      },
    },

    documents: {
      stats: {
        total: 'Total documents',
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
      },

      searchPlaceholder:
        'Search for a document or driver...',
      searchLabel:
        'Search for a document',
      filterLabel: 'Filter documents',
      refresh: 'Refresh',
      retry: 'Try again',

      filters: {
        all: 'All statuses',
      },

      types: {
        driving_license:
          'Driving licence',
        insurance: 'Insurance',
        id_card: 'Identity document',
        other: 'Other',
      },

      status: {
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        approvedPlural: 'Approved',
        rejectedPlural: 'Rejected',
      },

      table: {
        driver: 'Driver',
        document: 'Document',
        status: 'Status',
        sentAt: 'Submitted on',
        reviewedAt: 'Reviewed on',
        actions: 'Actions',
      },

      driverNumber:
        'Driver #{{id}}',

      approve: 'Approve',
      reject: 'Reject',
      processing: 'Processing...',
      processed: 'Processed',

      empty: {
        noDocuments:
          'No documents registered',
        noDocumentsDescription:
          'Documents submitted by drivers will appear here.',
        noResults: 'No results',
        noResultsDescription:
          'Change your search or filters.',
      },

      errors: {
        title: 'Unable to load',
        load:
          'Unable to load documents at the moment.',
        approve:
          'Unable to approve this document.',
        reject:
          'Unable to reject this document.',
        reasonRequired:
          'Enter the reason for rejection.',
      },

      fallback: {
        driver: 'Driver',
        document: 'Document',
      },

      rejectDialog: {
        title: 'Reject this document',
        description:
          'Enter the reason for rejection. It will be saved with the document.',
        reasonLabel: 'Rejection reason',
        placeholder:
          'E.g. unreadable, expired or incomplete document...',
        cancel: 'Cancel',
        rejecting: 'Rejecting...',
        confirm: 'Confirm rejection',
      },
    },

    customers: {
      stats: {
        total: 'Total customers',
        profiles: 'Registered profiles',
      },

      searchPlaceholder:
        'Search for a customer, phone or email...',
      searchLabel:
        'Search for a customer',
      refresh: 'Refresh',
      retry: 'Try again',

      table: {
        customer: 'Customer',
        phone: 'Phone',
        email: 'Email',
        registeredAt: 'Registered on',
        actions: 'Actions',
      },

      empty: {
        noCustomers:
          'No customers registered',
        noCustomersDescription:
          'Customers registered on Djina will appear here.',
        noResults: 'No results',
        noResultsDescription:
          'Change your search.',
      },

      errors: {
        title: 'Unable to load',
        load:
          'Unable to load customers at the moment.',
      },

      fallback: {
        customer: 'Customer',
      },

      customerNumber:
        'Customer #{{id}}',
      viewCustomer: 'View {{name}}',
    },

    customerDetails: {
      back: 'Back to customers',
      customerNumber:
        'Customer #{{id}}',
      profileDescription:
        'Customer profile registered on Djina.',

      errors: {
        load:
          'Unable to load this customer.',
        notFound: 'Customer not found',
      },

      summary: {
        courses: 'Rides',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },

      personal: {
        title: 'Personal information',
        description:
          'Customer contact details',
      },

      fields: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        registeredAt: 'Registered on',
      },

      activity: {
        title: 'Activity',
        description:
          'Customer activity on Djina',
        total: 'Total',
        completed: 'Completed',
        active: 'In progress',
        cancelled: 'Cancelled',
      },

      history: {
        title: 'Ride history',
        description:
          'Rides registered for this customer',
        empty: 'No rides registered',
        emptyDescription:
          'This customer has not completed any rides on Djina yet.',
      },

      latest: {
        course: 'Latest ride',
        route: 'Route',
        view: 'View ride',
      },
    },

    vehicles: {
      stats: {
        total: 'Total vehicles',
        active: 'Active',
        inactive: 'Inactive',
        comfort: 'With comfort',
      },

      searchPlaceholder:
        'Search for a vehicle, driver or license plate...',
      searchLabel:
        'Search for a vehicle',
      filterLabel:
        'Filter vehicles',
      refresh: 'Refresh',
      retry: 'Try again',

      filters: {
        all: 'All vehicles',
      },

      status: {
        active: 'Active',
        inactive: 'Inactive',
        activePlural: 'Active',
        inactivePlural: 'Inactive',
      },

      types: {
        car: 'Car',
        motorbike: 'Motorcycle',
        motorcycle: 'Motorcycle',
        bike: 'Motorcycle',
        van: 'Van',
        other: 'Other',
      },

      common: {
        yes: 'Yes',
        no: 'No',
      },

      table: {
        vehicle: 'Vehicle',
        licensePlate: 'License plate',
        driver: 'Driver',
        comfort: 'Comfort',
        state: 'Status',
        actions: 'Actions',
      },

      empty: {
        noVehicles:
          'No vehicles registered',
        noVehiclesDescription:
          'Vehicles registered on Djina will appear here.',
        noResults: 'No results',
        noResultsDescription:
          'Change your search or filters.',
      },

      errors: {
        title: 'Unable to load',
        load:
          'Unable to load vehicles at the moment.',
      },

      fallback: {
        vehicle: 'Vehicle',
        driver: 'Driver',
        unassigned: 'Unassigned',
      },

      driverNumber:
        'Driver #{{id}}',
      viewVehicle: 'View {{name}}',
    },

    vehicleDetails: {
      back: 'Back to vehicles',
      vehicleNumber:
        'Vehicle #{{id}}',

      errors: {
        load:
          'Unable to load this vehicle.',
        notFound:
          'Vehicle not found',
      },

      summary: {
        type: 'Type',
        comfort: 'Comfort',
        state: 'Status',
      },

      information: {
        title: 'Vehicle information',
        description:
          'Registered characteristics',
      },

      fields: {
        model: 'Model',
        type: 'Type',
        licensePlate: 'License plate',
        comfort: 'Comfort',
        registeredAt: 'Registered on',
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        driver: 'Driver',
      },

      driver: {
        title: 'Assigned driver',
        description:
          'Driver assigned to the vehicle',
        none: 'No driver assigned',
        noneDescription:
          'This vehicle is currently not assigned to any driver.',
      },

      image: {
        title: 'Vehicle photo',
        description:
          'Image associated with the vehicle',
        none: 'No photo',
        noneDescription:
          'No image has been registered for this vehicle yet.',
      },
    },

    payments: {
      stats: {
        total: 'Total payments',
        pending: 'Pending',
        paid: 'Paid',
        failed: 'Cancelled / failed',
      },

      collectedAmount:
        'Collected amount',

      searchPlaceholder:
        'Search for a payment, ride or transaction...',
      searchLabel:
        'Search for a payment',
      filterLabel:
        'Filter payments',
      refresh: 'Refresh',

      filters: {
        all: 'All statuses',
      },

      status: {
        pending: 'Pending',
        paid: 'Paid',
        cancelled: 'Cancelled',
        failed: 'Failed',
        paidPlural: 'Paid',
        cancelledPlural: 'Cancelled',
        failedPlural: 'Failed',
      },

      modes: {
        cash: 'Cash',
        mobile_money: 'Mobile Money',
        visa: 'Visa',
      },

      table: {
        payment: 'Payment',
        course: 'Ride',
        mode: 'Method',
        amount: 'Gross amount',
        commission: 'Commission',
        driverNet: 'Driver net',
        commissionStatus: 'Commission status',
        status: 'Status',
        date: 'Date',
        actions: 'Actions',
      },

      errors: {
        title: 'Unable to load',
        load:
          'Unable to load payments at the moment.',
        markPaid:
          'Unable to mark this payment as paid.',
      },

      empty: {
        noPayments:
          'No payments registered',
        noPaymentsDescription:
          'Payments made on Djina will appear here.',
        noResults: 'No results',
        noResultsDescription:
          'Change your search or filters.',
      },

      paymentNumber:
        'Payment #{{id}}',
      noReference: 'No reference',
      processing: 'Processing...',
      markPaid: 'Mark as paid',
      processed: 'Processed',
      viewPayment:
        'View payment #{{id}}',
    },

    paymentDetails: {
      back: 'Back to payments',
      paymentNumber:
        'Payment #{{id}}',
      modeUndefined:
        'Payment method not defined',

      errors: {
        load:
          'Unable to load this payment.',
        notFound:
          'Payment not found',
      },

      summary: {
        course: 'Ride',
        status: 'Status',
        currency: 'Currency',
      },

      information: {
        title: 'Payment information',
        description:
          'Transaction details',
      },
      split: { title: 'Payment breakdown', description: 'Paid amount, commission and driver revenue', paidAmount: 'Paid amount' },

      fields: {
        amount: 'Amount',
        mode: 'Method',
        provider: 'Provider',
        transaction: 'Transaction',
      },

      course: {
        title: 'Associated ride',
        description:
          'Ride linked to this payment',
        view: 'View ride',
      },

      dates: {
        title: 'Dates',
        description:
          'Payment timeline',
        created: 'Created on',
        paid: 'Paid on',
        updated: 'Updated on',
      },

      state: {
        title: 'Payment status',
        description:
          'Status and potential failure reason',
        failureReason:
          'Failure reason',
      },
    },

    complaints: {
      stats: {
        total: 'Total complaints',
        pending: 'Pending',
        resolved: 'Resolved',
        rejected: 'Rejected',
      },

      searchPlaceholder:
        'Search for a complaint, customer or ride...',
      searchLabel:
        'Search for a complaint',
      filterLabel:
        'Filter complaints',
      refresh: 'Refresh',

      filters: {
        all: 'All statuses',
      },

      status: {
        pending: 'Pending',
        resolved: 'Resolved',
        rejected: 'Rejected',
        resolvedPlural: 'Resolved',
        rejectedPlural: 'Rejected',
      },

      table: {
        complaint: 'Complaint',
        customer: 'Customer',
        course: 'Ride',
        description: 'Description',
        status: 'Status',
        createdAt: 'Created on',
        actions: 'Actions',
      },

      empty: {
        noComplaints:
          'No complaints registered',
        noComplaintsDescription:
          'Customer complaints will appear here.',
        noResults: 'No results',
        noResultsDescription:
          'Change your search or filters.',
      },

      errors: {
        title: 'Unable to load',
        load:
          'Unable to load complaints at the moment.',
        resolve:
          'Unable to resolve this complaint.',
      },

      fallback: {
        customer: 'Customer',
      },

      complaintNumber:
        'Complaint #{{id}}',
      customerNumber:
        'Customer #{{id}}',
      resolve: 'Resolve',
      processed: 'Processed',
      processing: 'Processing...',
      viewComplaint:
        'View complaint #{{id}}',

      resolveDialog: {
        title: 'Resolve complaint',
        description:
          'You can add a resolution note before closing the complaint.',
        noteLabel:
          'Resolution note',
        placeholder:
          'E.g. refund completed, customer contacted...',
        cancel: 'Cancel',
        confirm:
          'Confirm resolution',
      },
    },


complaintDetails: {
  back: 'Back to complaints',

  complaintNumber:
    'Complaint #{{id}}',

  profileDescription:
    'Complaint registered on Djina.',

  common: {
    customer: 'Customer',
    course: 'Ride',
    status: 'Status',
  },

  status: {
    pending: 'Pending',
    resolved: 'Resolved',
    rejected: 'Rejected',
  },

  summary: {
    complaintNumber:
      'Complaint #{{id}}',

    registered:
      'Complaint registered on Djina.',

    customer: 'Customer',
    course: 'Ride',
    status: 'Status',
  },

  customer: {
    title: 'Customer',

    subtitle:
      'Requester information',

    description:
      'Requester information',

    name: 'Name',
    phone: 'Phone',
    email: 'Email',

    defaultName:
      'Customer',
  },

  fields: {
    name: 'Name',
    customer: 'Customer',
    phone: 'Phone',
    email: 'Email',
  },

  course: {
    title:
      'Associated ride',

    subtitle:
      'Ride concerned by the complaint',

    description:
      'Ride concerned by the complaint',

    view: 'View ride',
  },

  description: {
    title: 'Description',

    subtitle:
      'Reason provided by the customer',

    description:
      'Reason reported by the customer',

    empty:
      'No description.',
  },

  dates: {
    title: 'Dates',

    subtitle:
      'Complaint history',

    description:
      'Complaint history',

    created:
      'Created on',

    resolved:
      'Resolved on',

    updated:
      'Updated on',
  },

  resolution: {
    title: 'Resolution',

    subtitle:
      'Handled by the administration',

    description:
      'Processing performed by administration',

    resolvedBy:
      'Resolved by',

    note:
      'Resolution note',

    noNote:
      'No resolution note.',

    administrator:
      'Administrator',

    admin:
      'Administrator',

    superAdmin:
      'Super Admin',

    administratorNumber:
      'Administrator #{{id}}',
  },

  errors: {
    load:
      'Unable to load this complaint.',

    notFound:
      'Complaint not found',
  },
},
  },
}

export default en
