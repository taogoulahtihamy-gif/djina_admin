const ar = {
  translation: {
    common: {
      dashboard: 'لوحة التحكم',
      courses: 'الرحلات',
      drivers: 'السائقون',
      documents: 'الوثائق',
      customers: 'العملاء',
      vehicles: 'المركبات',
      payments: 'المدفوعات',
      complaints: 'الشكاوى',
      settings: 'الإعدادات',
      myProfile: 'ملفي الشخصي',
      logout: 'تسجيل الخروج',
      refresh: 'تحديث',
      loading: 'جارٍ التحميل…',
      toProcess: 'تحتاج إلى معالجة',
      noNotifications: 'لا توجد إشعارات جديدة',
      notificationsLoadError: 'تعذر تحميل الإشعارات.',
      administrator: 'المسؤول',
      superAdmin: 'المسؤول الرئيسي',
      account: 'الحساب الرئيسي',
    },

    topbar: {
      courses: {
        eyebrow: 'العمليات',
        title: 'الرحلات',
        description:
          'تابع وتحكم في جميع الرحلات المسجلة على Djina.',
      },

      drivers: {
        eyebrow: 'العمليات',
        title: 'السائقون',
        description:
          'تابع السائقين وتوفرهم ونشاطهم على Djina.',
      },

      documents: {
        eyebrow: 'الامتثال',
        title: 'الوثائق',
        description:
          'راجع ووافق على الوثائق المرسلة من السائقين.',
      },

      customers: {
        eyebrow: 'المستخدمون',
        title: 'العملاء',
        description:
          'اطلع على العملاء المسجلين ونشاطهم على Djina.',
      },

      vehicles: {
        eyebrow: 'العمليات',
        title: 'المركبات',
        description:
          'اطلع على المركبات المسجلة والسائقين المرتبطين بها.',
      },

      payments: {
        eyebrow: 'المالية',
        title: 'المدفوعات',
        description:
          'تابع المدفوعات والتحصيل وحالات الدفع على Djina.',
      },

      complaints: {
        eyebrow: 'الدعم',
        title: 'الشكاوى',
        description:
          'راجع وعالج الشكاوى المرسلة من العملاء.',
      },

      settings: {
        eyebrow: 'الإعداد',
        title: 'الإعدادات',
        description:
          'خصص الإدارة والأمان والتفضيلات.',
      },

      dashboard: {
        eyebrow: 'مركز التحكم',
        title: 'إدارة المنصة',
        description:
          'تابع النشاط والرحلات والسائقين والعمليات في الوقت الفعلي.',
      },
    },

    settings: {
      language: 'اللغة',
      languageDescription:
        'اختر اللغة المستخدمة في واجهة الإدارة.',
      currentLanguage: 'اللغة الحالية',

      french: 'الفرنسية',
      english: 'الإنجليزية',
      arabic: 'العربية',

      adminProfile: 'ملف المسؤول',
      adminProfileDescription:
        'معلومات الحساب المتصل.',

      name: 'الاسم',
      role: 'الدور',
      account: 'الحساب',
      active: 'نشط',
      editProfile: 'تعديل الملف',

      notifications: 'الإشعارات',
      notificationsDescription:
        'اختر الأحداث التي تريد متابعتها.',

      complaints: 'الشكاوى',
      newComplaint: 'شكوى جديدة من عميل',

      payments: 'المدفوعات',
      paymentEvent:
        'دفع أو مشكلة في المعاملة',

      documents: 'الوثائق',
      newDocument: 'وثيقة جديدة من سائق',

      courses: 'الرحلات',
      courseEvent:
        'أحداث مهمة مرتبطة بالرحلة',

      appearance: 'المظهر',
      appearanceDescription:
        'تفضيلات عرض واجهة الإدارة.',

      light: 'فاتح',
      dark: 'داكن',
      system: 'النظام',

      security: 'الأمان',
      securityDescription:
        'إدارة الوصول إلى الحساب.',

      changePassword: 'تغيير كلمة المرور',
      changePasswordDescription:
        'تحديث بيانات الدخول إلى الحساب',

      activeSessions: 'الجلسات النشطة',
      activeSessionsDescription:
        'مراجعة الاتصالات بالحساب',

      about: 'حول',
      aboutDescription:
        'معلومات عن إدارة Djina.',

      application: 'التطبيق',
      version: 'الإصدار',
      environment: 'البيئة',
      development: 'التطوير',
      commission: {
        title: 'عمولة جينا', description: 'إعداد نسبة العمولة المطبقة على الرحلات المكتملة.',
        currentRate: 'النسبة الحالية', save: 'حفظ', note: 'تُطبق هذه النسبة على الرحلات المكتملة القادمة.',
        saved: 'تم حفظ نسبة العمولة.', readOnly: 'يمكن للمسؤول الأعلى فقط تعديل هذه النسبة.',
      },
    },

    commission: {
      grossRevenue: 'إجمالي الإيرادات', djinaCommission: 'عمولة جينا', driverNet: 'صافي دخل السائق',
      coursePrice: 'سعر الرحلة', rate: 'نسبة عمولة جينا', rateApplied: 'النسبة المطبقة', status: 'حالة العمولة',
      totalGenerated: 'إجمالي العمولة المتولدة', toSettle: 'العمولة المستحقة لجينا', paid: 'العمولة المدفوعة',
      paidAt: 'تاريخ الدفع', reference: 'مرجع الدفع', statuses: { pending: 'قيد الانتظار', paid: 'مدفوعة' },
    },

    dashboard: {
      createAdministrator:
        'إنشاء مسؤول',
      commission: {
        gross: 'إجمالي حجم الرحلات', generated: 'العمولات المتولدة', collected: 'إيرادات جينا المحصلة',
        pending: 'العمولات المعلقة', driverNet: 'صافي إيرادات السائقين', aria: 'المؤشرات المالية',
        note: 'تتضمن إيرادات جينا فقط العمولات التي تم تأكيد دفعها.',
      },

      primaryStats: {
        customers: {
          title: 'العملاء',
          description:
            'المستخدمون المسجلون',
        },

        drivers: {
          title: 'السائقون',
          description:
            'السائقون المسجلون',
        },

        rides: {
          title: 'الرحلات',
          description:
            'الرحلات المسجلة',
        },

        revenue: {
          title: 'إجمالي حجم الرحلات',
          description:
            'الرحلات المكتملة',
        },
      },

      operationalStats: {
        activeDrivers:
          'السائقون النشطون',
        pendingRides:
          'الرحلات قيد الانتظار',
        pendingDocuments:
          'الوثائق المطلوب مراجعتها',
        pendingComplaints:
          'الشكاوى قيد الانتظار',
      },

      activityCard: {
        title: 'نشاط الرحلات',
        description:
          'تطور نشاط المنصة',
        period: 'آخر 7 أيام',
        periodAria:
          'الفترة المعروضة: آخر 7 أيام',
        chartAria:
          'منطقة مخطط نشاط الرحلات',
        placeholder:
          'سيتم عرض بيانات النشاط هنا',
      },

      distributionCard: {
        title: 'توزيع الرحلات',
        description:
          'نظرة عامة حسب الحالة',

        status: {
          pending: 'قيد الانتظار',
          active: 'قيد التنفيذ',
          completed: 'مكتملة',
          cancelled: 'ملغاة',
        },
      },

      pendingActions: {
        title: 'يتطلب المعالجة',
        description:
          'إجراءات تتطلب انتباهك',
        documents:
          'وثائق السائقين قيد الانتظار',
        complaints:
          'الشكاوى قيد الانتظار',
        payments:
          'مدفوعات تحتاج إلى مراجعة',
      },

      recentCourses: {
        title: 'أحدث الرحلات',
        description:
          'الرحلات المسجلة مؤخرًا',

        columns: {
          course: 'الرحلة',
          customer: 'العميل',
          driver: 'السائق',
          route: 'المسار',
          status: 'الحالة',
          amount: 'المبلغ',
        },
      },

      aria: {
        primaryIndicators:
          'المؤشرات الرئيسية',
        operationalIndicators:
          'المؤشرات التشغيلية',
        rideAnalysis:
          'تحليل الرحلات',
        recentActivity:
          'النشاط الأخير والإجراءات المعلقة',
      },
    },

    courses: {
      stats: {
        total: 'جميع الرحلات',
        pending: 'قيد الانتظار',
        active: 'قيد التنفيذ',
        completed: 'مكتملة',
      },

      searchPlaceholder:
        'ابحث عن رحلة أو عميل أو سائق...',
      searchLabel: 'البحث عن رحلة',
      filterLabel: 'التصفية حسب الحالة',
      refresh: 'تحديث',
      retry: 'إعادة المحاولة',

      filters: {
        all: 'جميع الحالات',
      },

      status: {
        requested: 'قيد الانتظار',
        accepted: 'مقبولة',
        arriving: 'السائق في الطريق',
        picked_up: 'قيد الرحلة',
        completed: 'مكتملة',
        cancelled: 'ملغاة',
      },

      service: {
        economy: 'اقتصادي',
        confort: 'مريح',
        confort_plus: 'مريح +',
      },

      table: {
        course: 'الرحلة',
        customer: 'العميل',
        driver: 'السائق',
        route: 'المسار',
        service: 'الخدمة',
        status: 'الحالة',
        amount: 'المبلغ',
        requestedAt: 'تاريخ الطلب',
        actions: 'الإجراءات',
      },

      empty: {
        noCourses: 'لا توجد رحلات مسجلة',
        noCoursesDescription:
          'ستظهر الرحلات الجديدة هنا.',
        noResults: 'لا توجد نتائج',
        noResultsDescription:
          'غيّر البحث أو عوامل التصفية.',
      },

      errors: {
        title: 'تعذر التحميل',
        load:
          'تعذر تحميل الرحلات في الوقت الحالي.',
      },

      fallback: {
        customer: 'العميل',
        unassigned: 'غير معيّن',
        departure: 'نقطة الانطلاق',
        destination: 'الوجهة',
      },

      viewCourse: 'عرض {{course}}',
    },

    courseDetails: {
      back: 'العودة إلى الرحلات',

      errors: {
        load: 'تعذر تحميل هذه الرحلة.',
        notFound: 'الرحلة غير موجودة',
      },

      cancel: {
        trigger: 'إلغاء الرحلة',
        title: 'إلغاء هذه الرحلة',
        description:
          'سيؤدي هذا الإجراء إلى تغيير حالة الرحلة فورًا.',
        close: 'إغلاق',
        reasonLabel: 'سبب الإلغاء',
        placeholder:
          'مثال: طلب العميل، حادث، تم إنشاء الرحلة عن طريق الخطأ...',
        reasonRequired:
          'يرجى إدخال سبب الإلغاء.',
        error:
          'تعذر إلغاء الرحلة في الوقت الحالي.',
        back: 'رجوع',
        cancelling: 'جارٍ الإلغاء...',
        confirm: 'تأكيد الإلغاء',
      },

      summary: {
        course: 'الرحلة',
        departure: 'نقطة الانطلاق',
        destination: 'الوجهة',
        service: 'الخدمة',
        distance: 'المسافة',
        amount: 'المبلغ',
      },

      customer: {
        title: 'العميل',
        description:
          'معلومات صاحب الطلب',
      },

      driver: {
        title: 'السائق',
        description:
          'السائق المعيّن للرحلة',
      },

      fields: {
        name: 'الاسم',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        rating: 'التقييم',
      },

      route: {
        title: 'المسار',
        description:
          'المعالم والإحداثيات',
        coordinatesUnavailable:
          'الإحداثيات غير متوفرة',
      },

      pricing: {
        title: 'التسعير',
        description:
          'مبالغ الرحلة',
        estimated: 'السعر التقديري',
        final: 'السعر النهائي',
        notDefined: 'غير محدد',
      },
      financial: { title: 'التوزيع المالي', description: 'عمولة جينا ودخل السائق', pending: 'سيتم إنشاء العمولة عند اكتمال الرحلة.' },

      cancellation: {
        title: 'معلومات الإلغاء',
        description:
          'التفاصيل المسجلة عند إلغاء الرحلة',
        by: 'تم الإلغاء بواسطة',
        reason: 'السبب',
        date: 'التاريخ',
        noReason:
          'لم يتم إدخال سبب',
      },

      timeline: {
        title: 'سجل الرحلة',
        description:
          'المراحل المسجلة بواسطة المنصة',
        requested: 'تم طلب الرحلة',
        accepted: 'تم قبول الرحلة',
        arriving: 'السائق في الطريق',
        pickedUp: 'تم اصطحاب العميل',
        completed: 'اكتملت الرحلة',
        cancelled: 'تم إلغاء الرحلة',
        empty: 'لا يوجد حدث مسجل.',
      },

      fallback: {
        notProvidedMasculine:
          'غير متوفر',
        notProvidedFeminine:
          'غير متوفرة',
      },
    },

    drivers: {
      stats: {
        total: 'إجمالي السائقين',
        enabled: 'السائقون النشطون',
        online: 'متصلون',
        averageRating: 'متوسط التقييم',
      },

      searchPlaceholder:
        'ابحث عن سائق أو هاتف أو بريد إلكتروني...',
      searchLabel: 'البحث عن سائق',
      filterLabel: 'تصفية السائقين',
      refresh: 'تحديث',
      retry: 'إعادة المحاولة',

      filters: {
        all: 'جميع السائقين',
      },

      status: {
        online: 'متصل',
        offline: 'غير متصل',
        enabled: 'نشط',
        disabled: 'معطل',
        enabledPlural: 'نشطون',
        disabledPlural: 'معطلون',
      },

      table: {
        driver: 'السائق',
        contact: 'الاتصال',
        availability: 'التوفر',
        account: 'الحساب',
        rating: 'التقييم',
        ratings: 'التقييمات',
        actions: 'الإجراءات',
      },

      empty: {
        noDrivers:
          'لا يوجد سائقون مسجلون',
        noDriversDescription:
          'سيظهر السائقون المسجلون هنا.',
        noResults: 'لا توجد نتائج',
        noResultsDescription:
          'غيّر البحث أو عوامل التصفية.',
      },

      errors: {
        title: 'تعذر التحميل',
        load:
          'تعذر تحميل السائقين في الوقت الحالي.',
      },

      fallback: {
        driver: 'السائق',
      },

      driverNumber:
        'السائق #{{id}}',
      viewDriver: 'عرض {{name}}',
    },

    driverDetails: {
      back: 'العودة إلى السائقين',
      driverNumber:
        'السائق #{{id}}',
      profileDescription:
        'ملف سائق مسجل على Djina.',

      errors: {
        load:
          'تعذر تحميل هذا السائق.',
        notFound: 'السائق غير موجود',
      },

      account: {
        active: 'حساب نشط',
        disabled: 'حساب معطل',
      },

      summary: {
        rating: 'التقييم',
        ratings: 'التقييمات',
        availability: 'التوفر',
      },

      personal: {
        title: 'المعلومات الشخصية',
        description: 'بيانات اتصال السائق',
      },

      state: {
        title: 'حالة السائق',
        description:
          'التوفر وإمكانية الوصول',
      },

      fields: {
        name: 'الاسم',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        availability: 'التوفر',
        account: 'الحساب',
        averageRating: 'متوسط التقييم',
      },

      noRating: 'لا يوجد تقييم',

      vehicle: {
        title: 'المركبة',
        description:
          'المركبة المرتبطة بالسائق',
        model: 'الطراز',
        type: 'النوع',
        licensePlate: 'رقم اللوحة',
        confort: 'الراحة',
        state: 'الحالة',
        active: 'نشطة',
        inactive: 'غير نشطة',
        none: 'لا توجد مركبة مرتبطة',
        noneDescription:
          'لا توجد مركبة مرتبطة بهذا السائق حاليًا.',
      },

      vehicleTypes: {
        car: 'سيارة',
        motorcycle: 'دراجة نارية',
        bike: 'دراجة نارية',
      },

      common: {
        yes: 'نعم',
        no: 'لا',
      },

      activity: {
        title: 'النشاط',
        description:
          'نشاط السائق على Djina',
        noCourses: 'لا توجد رحلات',
        noCoursesDescription:
          'لا توجد رحلات مسجلة لهذا السائق حتى الآن.',
        total: 'الإجمالي',
        completed: 'مكتملة',
        active: 'قيد التنفيذ',
        cancelled: 'ملغاة',
        latestCourse: 'آخر رحلة',
      },
      commission: {
        title: 'الإيرادات والعمولات', description: 'التوزيع المالي للرحلات المكتملة',
        history: 'سجل العمولات', empty: 'لم تنتج أي رحلة مكتملة عمولة بعد.',
        columns: { course: 'الرحلة', date: 'التاريخ', route: 'المسار', price: 'سعر الرحلة', rate: 'النسبة' },
        confirmSettlement: 'تأكيد الدفع', settlementSuccess: 'تم تأكيد الدفع.',
      },
      settlement: {
        title: 'تأكيد الدفع', close: 'إغلاق', pendingCount: 'العمولات المحددة', total: 'إجمالي المبلغ المستحق',
        courses: 'الرحلات المعنية', mode: 'طريقة الدفع', reference: 'مرجع الدفع', date: 'تاريخ الدفع',
        confirm: 'تأكيد الدفع', cancel: 'إلغاء',
        modes: { cash: 'نقداً', airtel: 'Airtel Money', moov: 'Moov Money', bank: 'تحويل بنكي' },
      },
    },

    documents: {
      stats: {
        total: 'إجمالي الوثائق',
        pending: 'قيد الانتظار',
        approved: 'مقبولة',
        rejected: 'مرفوضة',
      },

      searchPlaceholder:
        'ابحث عن وثيقة أو سائق...',
      searchLabel: 'البحث عن وثيقة',
      filterLabel: 'تصفية الوثائق',
      refresh: 'تحديث',
      retry: 'إعادة المحاولة',

      filters: {
        all: 'جميع الحالات',
      },

      types: {
        driving_license: 'رخصة القيادة',
        insurance: 'التأمين',
        id_card: 'وثيقة الهوية',
        other: 'أخرى',
      },

      status: {
        pending: 'قيد الانتظار',
        approved: 'مقبولة',
        rejected: 'مرفوضة',
        approvedPlural: 'مقبولة',
        rejectedPlural: 'مرفوضة',
      },

      table: {
        driver: 'السائق',
        document: 'الوثيقة',
        status: 'الحالة',
        sentAt: 'تاريخ الإرسال',
        reviewedAt: 'تاريخ المعالجة',
        actions: 'الإجراءات',
      },

      driverNumber:
        'السائق #{{id}}',

      approve: 'قبول',
      reject: 'رفض',
      processing: 'جارٍ المعالجة...',
      processed: 'تمت المعالجة',

      empty: {
        noDocuments:
          'لا توجد وثائق مسجلة',
        noDocumentsDescription:
          'ستظهر الوثائق المرسلة من السائقين هنا.',
        noResults: 'لا توجد نتائج',
        noResultsDescription:
          'غيّر البحث أو عوامل التصفية.',
      },

      errors: {
        title: 'تعذر التحميل',
        load:
          'تعذر تحميل الوثائق في الوقت الحالي.',
        approve:
          'تعذر قبول هذه الوثيقة.',
        reject:
          'تعذر رفض هذه الوثيقة.',
        reasonRequired:
          'يرجى إدخال سبب الرفض.',
      },

      fallback: {
        driver: 'السائق',
        document: 'وثيقة',
      },

      rejectDialog: {
        title: 'رفض هذه الوثيقة',
        description:
          'أدخل سبب الرفض. سيتم حفظه مع الوثيقة.',
        reasonLabel: 'سبب الرفض',
        placeholder:
          'مثال: الوثيقة غير واضحة أو منتهية أو غير مكتملة...',
        cancel: 'إلغاء',
        rejecting: 'جارٍ الرفض...',
        confirm: 'تأكيد الرفض',
      },
    },

    customers: {
      stats: {
        total: 'إجمالي العملاء',
        profiles: 'الملفات المسجلة',
      },

      searchPlaceholder:
        'ابحث عن عميل أو هاتف أو بريد إلكتروني...',
      searchLabel: 'البحث عن عميل',
      refresh: 'تحديث',
      retry: 'إعادة المحاولة',

      table: {
        customer: 'العميل',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        registeredAt: 'تاريخ التسجيل',
        actions: 'الإجراءات',
      },

      empty: {
        noCustomers:
          'لا يوجد عملاء مسجلون',
        noCustomersDescription:
          'سيظهر العملاء المسجلون على Djina هنا.',
        noResults: 'لا توجد نتائج',
        noResultsDescription:
          'غيّر البحث.',
      },

      errors: {
        title: 'تعذر التحميل',
        load:
          'تعذر تحميل العملاء في الوقت الحالي.',
      },

      fallback: {
        customer: 'العميل',
      },

      customerNumber:
        'العميل #{{id}}',
      viewCustomer: 'عرض {{name}}',
    },

    customerDetails: {
      back: 'العودة إلى العملاء',
      customerNumber:
        'العميل #{{id}}',
      profileDescription:
        'ملف عميل مسجل على Djina.',

      errors: {
        load:
          'تعذر تحميل هذا العميل.',
        notFound: 'العميل غير موجود',
      },

      summary: {
        courses: 'الرحلات',
        completed: 'مكتملة',
        cancelled: 'ملغاة',
      },

      personal: {
        title: 'المعلومات الشخصية',
        description:
          'بيانات اتصال العميل',
      },

      fields: {
        name: 'الاسم',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        registeredAt: 'تاريخ التسجيل',
      },

      activity: {
        title: 'النشاط',
        description:
          'نشاط العميل على Djina',
        total: 'الإجمالي',
        completed: 'مكتملة',
        active: 'قيد التنفيذ',
        cancelled: 'ملغاة',
      },

      history: {
        title: 'سجل الرحلات',
        description:
          'الرحلات المسجلة لهذا العميل',
        empty:
          'لا توجد رحلات مسجلة',
        emptyDescription:
          'لم يقم هذا العميل بأي رحلة على Djina حتى الآن.',
      },

      latest: {
        course: 'آخر رحلة',
        route: 'المسار',
        view: 'عرض الرحلة',
      },
    },

    vehicles: {
      stats: {
        total: 'إجمالي المركبات',
        active: 'نشطة',
        inactive: 'غير نشطة',
        comfort: 'مع الراحة',
      },

      searchPlaceholder:
        'ابحث عن مركبة أو سائق أو رقم لوحة...',
      searchLabel:
        'البحث عن مركبة',
      filterLabel:
        'تصفية المركبات',
      refresh: 'تحديث',
      retry: 'إعادة المحاولة',

      filters: {
        all: 'جميع المركبات',
      },

      status: {
        active: 'نشطة',
        inactive: 'غير نشطة',
        activePlural: 'نشطة',
        inactivePlural: 'غير نشطة',
      },

      types: {
        car: 'سيارة',
        motorbike: 'دراجة نارية',
        motorcycle: 'دراجة نارية',
        bike: 'دراجة نارية',
        van: 'شاحنة صغيرة',
        other: 'أخرى',
      },

      common: {
        yes: 'نعم',
        no: 'لا',
      },

      table: {
        vehicle: 'المركبة',
        licensePlate: 'رقم اللوحة',
        driver: 'السائق',
        comfort: 'الراحة',
        state: 'الحالة',
        actions: 'الإجراءات',
      },

      empty: {
        noVehicles:
          'لا توجد مركبات مسجلة',
        noVehiclesDescription:
          'ستظهر المركبات المسجلة على Djina هنا.',
        noResults: 'لا توجد نتائج',
        noResultsDescription:
          'غيّر البحث أو عوامل التصفية.',
      },

      errors: {
        title: 'تعذر التحميل',
        load:
          'تعذر تحميل المركبات في الوقت الحالي.',
      },

      fallback: {
        vehicle: 'مركبة',
        driver: 'السائق',
        unassigned: 'غير معيّن',
      },

      driverNumber:
        'السائق #{{id}}',
      viewVehicle: 'عرض {{name}}',
    },

    vehicleDetails: {
      back: 'العودة إلى المركبات',
      vehicleNumber:
        'المركبة #{{id}}',

      errors: {
        load:
          'تعذر تحميل هذه المركبة.',
        notFound:
          'المركبة غير موجودة',
      },

      summary: {
        type: 'النوع',
        comfort: 'الراحة',
        state: 'الحالة',
      },

      information: {
        title: 'معلومات المركبة',
        description:
          'الخصائص المسجلة',
      },

      fields: {
        model: 'الطراز',
        type: 'النوع',
        licensePlate: 'رقم اللوحة',
        comfort: 'الراحة',
        registeredAt: 'تاريخ التسجيل',
        name: 'الاسم',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        driver: 'السائق',
      },

      driver: {
        title: 'السائق المرتبط',
        description:
          'السائق المعيّن للمركبة',
        none: 'لا يوجد سائق مرتبط',
        noneDescription:
          'هذه المركبة غير مرتبطة بأي سائق حاليًا.',
      },

      image: {
        title: 'صورة المركبة',
        description:
          'الصورة المرتبطة بالمركبة',
        none: 'لا توجد صورة',
        noneDescription:
          'لم يتم تسجيل صورة لهذه المركبة بعد.',
      },
    },

    payments: {
      stats: {
        total: 'إجمالي المدفوعات',
        pending: 'قيد الانتظار',
        paid: 'مدفوعة',
        failed: 'ملغاة / فاشلة',
      },

      collectedAmount:
        'المبلغ المحصل',

      searchPlaceholder:
        'ابحث عن دفعة أو رحلة أو معاملة...',
      searchLabel:
        'البحث عن دفعة',
      filterLabel:
        'تصفية المدفوعات',
      refresh: 'تحديث',

      filters: {
        all: 'جميع الحالات',
      },

      status: {
        pending: 'قيد الانتظار',
        paid: 'مدفوع',
        cancelled: 'ملغى',
        failed: 'فشل',
        paidPlural: 'مدفوعة',
        cancelledPlural: 'ملغاة',
        failedPlural: 'فاشلة',
      },

      modes: {
        cash: 'نقدًا',
        mobile_money:
          'الدفع عبر الهاتف',
        visa: 'فيزا',
      },

      table: {
        payment: 'الدفع',
        course: 'الرحلة',
        mode: 'الطريقة',
        amount: 'المبلغ الإجمالي',
        commission: 'العمولة',
        driverNet: 'صافي السائق',
        commissionStatus: 'حالة العمولة',
        status: 'الحالة',
        date: 'التاريخ',
        actions: 'الإجراءات',
      },

      errors: {
        title: 'تعذر التحميل',
        load:
          'تعذر تحميل المدفوعات في الوقت الحالي.',
        markPaid:
          'تعذر تحديد هذه الدفعة كمدفوعة.',
      },

      empty: {
        noPayments:
          'لا توجد مدفوعات مسجلة',
        noPaymentsDescription:
          'ستظهر المدفوعات المنفذة على Djina هنا.',
        noResults: 'لا توجد نتائج',
        noResultsDescription:
          'غيّر البحث أو عوامل التصفية.',
      },

      paymentNumber:
        'الدفع #{{id}}',
      noReference: 'بدون مرجع',
      processing:
        'جارٍ المعالجة...',
      markPaid: 'تحديد كمدفوع',
      processed: 'تمت المعالجة',
      viewPayment:
        'عرض الدفع #{{id}}',
    },

    paymentDetails: {
      back:
        'العودة إلى المدفوعات',
      paymentNumber:
        'الدفع #{{id}}',
      modeUndefined:
        'طريقة الدفع غير محددة',

      errors: {
        load:
          'تعذر تحميل هذه الدفعة.',
        notFound:
          'الدفع غير موجود',
      },

      summary: {
        course: 'الرحلة',
        status: 'الحالة',
        currency: 'العملة',
      },

      information: {
        title: 'معلومات الدفع',
        description:
          'تفاصيل المعاملة',
      },
      split: { title: 'توزيع الدفع', description: 'المبلغ المدفوع والعمولة ودخل السائق', paidAmount: 'المبلغ المدفوع' },

      fields: {
        amount: 'المبلغ',
        mode: 'الطريقة',
        provider: 'مزود الخدمة',
        transaction: 'المعاملة',
      },

      course: {
        title: 'الرحلة المرتبطة',
        description:
          'الرحلة المرتبطة بهذه الدفعة',
        view: 'عرض الرحلة',
      },

      dates: {
        title: 'التواريخ',
        description:
          'السجل الزمني للدفع',
        created: 'تاريخ الإنشاء',
        paid: 'تاريخ الدفع',
        updated: 'آخر تحديث',
      },

      state: {
        title: 'حالة الدفع',
        description:
          'الحالة وسبب الفشل المحتمل',
        failureReason: 'سبب الفشل',
      },
    },

    complaints: {
      stats: {
        total: 'إجمالي الشكاوى',
        pending: 'قيد الانتظار',
        resolved: 'تم حلها',
        rejected: 'مرفوضة',
      },

      searchPlaceholder:
        'ابحث عن شكوى أو عميل أو رحلة...',
      searchLabel:
        'البحث عن شكوى',
      filterLabel:
        'تصفية الشكاوى',
      refresh: 'تحديث',

      filters: {
        all: 'جميع الحالات',
      },

      status: {
        pending: 'قيد الانتظار',
        resolved: 'تم حلها',
        rejected: 'مرفوضة',
        resolvedPlural: 'تم حلها',
        rejectedPlural: 'مرفوضة',
      },

      table: {
        complaint: 'الشكوى',
        customer: 'العميل',
        course: 'الرحلة',
        description: 'الوصف',
        status: 'الحالة',
        createdAt: 'تاريخ الإنشاء',
        actions: 'الإجراءات',
      },

      empty: {
        noComplaints:
          'لا توجد شكاوى مسجلة',
        noComplaintsDescription:
          'ستظهر شكاوى العملاء هنا.',
        noResults: 'لا توجد نتائج',
        noResultsDescription:
          'غيّر البحث أو عوامل التصفية.',
      },

      errors: {
        title: 'تعذر التحميل',
        load:
          'تعذر تحميل الشكاوى في الوقت الحالي.',
        resolve:
          'تعذر حل هذه الشكوى.',
      },

      fallback: {
        customer: 'العميل',
      },

      complaintNumber:
        'الشكوى #{{id}}',
      customerNumber:
        'العميل #{{id}}',
      resolve: 'حل الشكوى',
      processed:
        'تمت المعالجة',
      processing:
        'جارٍ المعالجة...',
      viewComplaint:
        'عرض الشكوى #{{id}}',

      resolveDialog: {
        title: 'حل الشكوى',
        description:
          'يمكنك إضافة ملاحظة للحل قبل إغلاق الشكوى.',
        noteLabel: 'ملاحظة الحل',
        placeholder:
          'مثال: تم رد المبلغ، تم الاتصال بالعميل...',
        cancel: 'إلغاء',
        confirm: 'تأكيد الحل',
      },
    },



complaintDetails: {
  back:
    'العودة إلى الشكاوى',

  complaintNumber:
    'الشكوى رقم {{id}}',

  profileDescription:
    'شكوى مسجلة على منصة Djina.',

  common: {
    customer: 'العميل',
    course: 'الرحلة',
    status: 'الحالة',
  },

  status: {
    pending:
      'قيد الانتظار',

    resolved:
      'تم الحل',

    rejected:
      'مرفوضة',
  },

  summary: {
    complaintNumber:
      'الشكوى رقم {{id}}',

    registered:
      'شكوى مسجلة على منصة Djina.',

    customer:
      'العميل',

    course:
      'الرحلة',

    status:
      'الحالة',
  },

  customer: {
    title:
      'العميل',

    subtitle:
      'معلومات مقدم الشكوى',

    description:
      'معلومات مقدم الشكوى',

    name:
      'الاسم',

    phone:
      'الهاتف',

    email:
      'البريد الإلكتروني',

    defaultName:
      'العميل',
  },

  fields: {
    name:
      'الاسم',

    customer:
      'العميل',

    phone:
      'الهاتف',

    email:
      'البريد الإلكتروني',
  },

  course: {
    title:
      'الرحلة المرتبطة',

    subtitle:
      'الرحلة المعنية بالشكوى',

    description:
      'الرحلة المعنية بالشكوى',

    view:
      'عرض الرحلة',
  },

  description: {
    title:
      'الوصف',

    subtitle:
      'السبب المقدم من العميل',

    description:
      'السبب الذي ذكره العميل',

    empty:
      'لا يوجد وصف.',
  },

  dates: {
    title:
      'التواريخ',

    subtitle:
      'سجل الشكوى',

    description:
      'سجل الشكوى',

    created:
      'تاريخ الإنشاء',

    resolved:
      'تاريخ الحل',

    updated:
      'آخر تحديث',
  },

  resolution: {
    title:
      'الحل',

    subtitle:
      'تمت معالجة الشكوى من قبل الإدارة',

    description:
      'المعالجة التي قامت بها الإدارة',

    resolvedBy:
      'تم الحل بواسطة',

    note:
      'ملاحظة الحل',

    noNote:
      'لا توجد ملاحظة للحل.',

    administrator:
      'مسؤول',

    admin:
      'مسؤول',

    superAdmin:
      'المسؤول الرئيسي',

    administratorNumber:
      'المسؤول رقم {{id}}',
  },

  errors: {
    load:
      'تعذر تحميل هذه الشكوى.',

    notFound:
      'لم يتم العثور على الشكوى',
  },
},
  },
}

export default ar
