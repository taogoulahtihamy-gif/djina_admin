import i18n from 'i18next'
import {
  initReactI18next,
} from 'react-i18next'

import fr from './fr'
import en from './en'
import ar from './ar'


/* =========================================================
   LANGUES DISPONIBLES
========================================================= */

const supportedLanguages = [
  'fr',
  'en',
  'ar',
]


/* =========================================================
   TRADUCTIONS COMPLÉMENTAIRES
   Paramètres / Profil / Sécurité / Sessions
========================================================= */

const extraSettingsTranslations = {
  fr: {
    inactive: 'Inactif',

    loadingPreferences:
      'Chargement des préférences…',

    notificationLoadError:
      'Impossible de charger les préférences de notifications.',

    notificationSaveError:
      'Impossible d’enregistrer cette préférence.',


    /* =====================================================
       MOT DE PASSE
    ===================================================== */

    passwordModal: {
      title:
        'Modifier le mot de passe',

      description:
        'Choisissez un nouveau mot de passe sécurisé.',

      currentPassword:
        'Mot de passe actuel',

      currentPlaceholder:
        'Votre mot de passe actuel',

      newPassword:
        'Nouveau mot de passe',

      newPlaceholder:
        'Votre nouveau mot de passe',

      confirmPassword:
        'Confirmer le nouveau mot de passe',

      confirmPlaceholder:
        'Confirmez le nouveau mot de passe',

      toggleVisibility:
        'Afficher ou masquer le mot de passe',

      required:
        'Tous les champs sont obligatoires.',

      mismatch:
        'Les nouveaux mots de passe ne correspondent pas.',

      samePassword:
        'Le nouveau mot de passe doit être différent du mot de passe actuel.',

      currentIncorrect:
        'Le mot de passe actuel est incorrect.',

      invalidNewPassword:
        'Le nouveau mot de passe ne respecte pas les exigences de sécurité.',

      genericError:
        'Impossible de modifier le mot de passe.',

      success:
        'Mot de passe modifié. Reconnexion requise…',

      cancel:
        'Annuler',

      submit:
        'Modifier le mot de passe',

      submitting:
        'Modification…',

      close:
        'Fermer',
    },


    /* =====================================================
       SESSIONS ACTIVES
    ===================================================== */

    sessionsModal: {
      title:
        'Sessions actives',

      description:
        'Consultez et gérez les connexions à votre compte.',

      session:
        'session active',

      sessions:
        'sessions actives',

      refresh:
        'Actualiser',

      loading:
        'Chargement des sessions…',

      empty:
        'Aucune session active.',

      sessionTitle:
        'Session DJINA Admin',

      current:
        'Actuelle',

      connectedOn:
        'Connectée le {{date}}',

      expiration:
        'Expiration : {{date}}',

      disconnect:
        'Déconnecter',

      disconnecting:
        'Fermeture…',

      closeOthers:
        'Déconnecter toutes les autres sessions',

      closingOthers:
        'Déconnexion…',

      footer:
        'Vous pouvez fermer les autres connexions à votre compte sans fermer la session actuellement utilisée.',

      loadError:
        'Impossible de charger les sessions actives.',

      closeError:
        'Impossible de fermer cette session.',

      closeOthersError:
        'Impossible de fermer les autres sessions.',

      close:
        'Fermer',
    },


    /* =====================================================
       PROFIL ADMINISTRATEUR
    ===================================================== */

    profileModal: {
      title:
        'Modifier le profil',

      description:
        'Modifiez vos informations personnelles.',

      firstName:
        'Prénom',

      firstNamePlaceholder:
        'Prénom',

      lastName:
        'Nom',

      lastNamePlaceholder:
        'Nom',

      email:
        'Adresse e-mail',

      emailHint:
        'L’adresse e-mail utilisée pour la connexion ne peut pas être modifiée ici.',

      phone:
        'Téléphone',

      phonePlaceholder:
        '+235...',

      rightsTitle:
        'Droits du compte',

      rightsDescription:
        'Le rôle et les droits administrateur ne peuvent pas être modifiés depuis cette fenêtre.',

      required:
        'Le prénom, le nom et le téléphone sont obligatoires.',

      phoneUsed:
        'Ce numéro de téléphone est déjà utilisé.',

      saveError:
        'Impossible de modifier le profil.',

      success:
        'Profil modifié avec succès.',

      cancel:
        'Annuler',

      save:
        'Enregistrer',

      saving:
        'Enregistrement…',

      close:
        'Fermer',
    },
  },


  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {
    inactive: 'Inactive',

    loadingPreferences:
      'Loading preferences…',

    notificationLoadError:
      'Unable to load notification preferences.',

    notificationSaveError:
      'Unable to save this preference.',


    /* =====================================================
       PASSWORD
    ===================================================== */

    passwordModal: {
      title:
        'Change password',

      description:
        'Choose a new secure password.',

      currentPassword:
        'Current password',

      currentPlaceholder:
        'Enter your current password',

      newPassword:
        'New password',

      newPlaceholder:
        'Enter your new password',

      confirmPassword:
        'Confirm new password',

      confirmPlaceholder:
        'Confirm your new password',

      toggleVisibility:
        'Show or hide password',

      required:
        'All fields are required.',

      mismatch:
        'The new passwords do not match.',

      samePassword:
        'The new password must be different from the current password.',

      currentIncorrect:
        'The current password is incorrect.',

      invalidNewPassword:
        'The new password does not meet the security requirements.',

      genericError:
        'Unable to change the password.',

      success:
        'Password changed. Sign-in is required again…',

      cancel:
        'Cancel',

      submit:
        'Change password',

      submitting:
        'Changing…',

      close:
        'Close',
    },


    /* =====================================================
       ACTIVE SESSIONS
    ===================================================== */

    sessionsModal: {
      title:
        'Active sessions',

      description:
        'View and manage connections to your account.',

      session:
        'active session',

      sessions:
        'active sessions',

      refresh:
        'Refresh',

      loading:
        'Loading sessions…',

      empty:
        'No active sessions.',

      sessionTitle:
        'DJINA Admin session',

      current:
        'Current',

      connectedOn:
        'Connected on {{date}}',

      expiration:
        'Expires: {{date}}',

      disconnect:
        'Disconnect',

      disconnecting:
        'Disconnecting…',

      closeOthers:
        'Disconnect all other sessions',

      closingOthers:
        'Disconnecting…',

      footer:
        'You can close other connections to your account without closing the session you are currently using.',

      loadError:
        'Unable to load active sessions.',

      closeError:
        'Unable to close this session.',

      closeOthersError:
        'Unable to close the other sessions.',

      close:
        'Close',
    },


    /* =====================================================
       ADMIN PROFILE
    ===================================================== */

    profileModal: {
      title:
        'Edit profile',

      description:
        'Update your personal information.',

      firstName:
        'First name',

      firstNamePlaceholder:
        'First name',

      lastName:
        'Last name',

      lastNamePlaceholder:
        'Last name',

      email:
        'Email address',

      emailHint:
        'The email address used to sign in cannot be changed here.',

      phone:
        'Phone',

      phonePlaceholder:
        '+235...',

      rightsTitle:
        'Account permissions',

      rightsDescription:
        'The administrator role and permissions cannot be changed from this window.',

      required:
        'First name, last name and phone number are required.',

      phoneUsed:
        'This phone number is already in use.',

      saveError:
        'Unable to update the profile.',

      success:
        'Profile updated successfully.',

      cancel:
        'Cancel',

      save:
        'Save',

      saving:
        'Saving…',

      close:
        'Close',
    },
  },


  /* =======================================================
     العربية
  ======================================================= */

  ar: {
    inactive:
      'غير نشط',

    loadingPreferences:
      'جارٍ تحميل التفضيلات…',

    notificationLoadError:
      'تعذر تحميل تفضيلات الإشعارات.',

    notificationSaveError:
      'تعذر حفظ هذا التفضيل.',


    /* =====================================================
       كلمة المرور
    ===================================================== */

    passwordModal: {
      title:
        'تغيير كلمة المرور',

      description:
        'اختر كلمة مرور جديدة وآمنة.',

      currentPassword:
        'كلمة المرور الحالية',

      currentPlaceholder:
        'أدخل كلمة المرور الحالية',

      newPassword:
        'كلمة المرور الجديدة',

      newPlaceholder:
        'أدخل كلمة المرور الجديدة',

      confirmPassword:
        'تأكيد كلمة المرور الجديدة',

      confirmPlaceholder:
        'أكد كلمة المرور الجديدة',

      toggleVisibility:
        'إظهار أو إخفاء كلمة المرور',

      required:
        'جميع الحقول مطلوبة.',

      mismatch:
        'كلمتا المرور الجديدتان غير متطابقتين.',

      samePassword:
        'يجب أن تختلف كلمة المرور الجديدة عن كلمة المرور الحالية.',

      currentIncorrect:
        'كلمة المرور الحالية غير صحيحة.',

      invalidNewPassword:
        'كلمة المرور الجديدة لا تستوفي متطلبات الأمان.',

      genericError:
        'تعذر تغيير كلمة المرور.',

      success:
        'تم تغيير كلمة المرور. يجب تسجيل الدخول من جديد…',

      cancel:
        'إلغاء',

      submit:
        'تغيير كلمة المرور',

      submitting:
        'جارٍ التغيير…',

      close:
        'إغلاق',
    },


    /* =====================================================
       الجلسات النشطة
    ===================================================== */

    sessionsModal: {
      title:
        'الجلسات النشطة',

      description:
        'عرض وإدارة الاتصالات بحسابك.',

      session:
        'جلسة نشطة',

      sessions:
        'جلسات نشطة',

      refresh:
        'تحديث',

      loading:
        'جارٍ تحميل الجلسات…',

      empty:
        'لا توجد جلسات نشطة.',

      sessionTitle:
        'جلسة إدارة DJINA',

      current:
        'الحالية',

      connectedOn:
        'تم الاتصال في {{date}}',

      expiration:
        'تنتهي في: {{date}}',

      disconnect:
        'تسجيل الخروج',

      disconnecting:
        'جارٍ تسجيل الخروج…',

      closeOthers:
        'تسجيل الخروج من جميع الجلسات الأخرى',

      closingOthers:
        'جارٍ تسجيل الخروج…',

      footer:
        'يمكنك إغلاق الاتصالات الأخرى بحسابك دون إغلاق الجلسة التي تستخدمها حالياً.',

      loadError:
        'تعذر تحميل الجلسات النشطة.',

      closeError:
        'تعذر إغلاق هذه الجلسة.',

      closeOthersError:
        'تعذر إغلاق الجلسات الأخرى.',

      close:
        'إغلاق',
    },


    /* =====================================================
       الملف الشخصي
    ===================================================== */

    profileModal: {
      title:
        'تعديل الملف الشخصي',

      description:
        'قم بتعديل معلوماتك الشخصية.',

      firstName:
        'الاسم الأول',

      firstNamePlaceholder:
        'الاسم الأول',

      lastName:
        'اسم العائلة',

      lastNamePlaceholder:
        'اسم العائلة',

      email:
        'البريد الإلكتروني',

      emailHint:
        'لا يمكن تعديل البريد الإلكتروني المستخدم لتسجيل الدخول من هنا.',

      phone:
        'الهاتف',

      phonePlaceholder:
        '+235...',

      rightsTitle:
        'صلاحيات الحساب',

      rightsDescription:
        'لا يمكن تعديل دور المسؤول أو صلاحياته من هذه النافذة.',

      required:
        'الاسم الأول واسم العائلة ورقم الهاتف مطلوبة.',

      phoneUsed:
        'رقم الهاتف هذا مستخدم بالفعل.',

      saveError:
        'تعذر تعديل الملف الشخصي.',

      success:
        'تم تعديل الملف الشخصي بنجاح.',

      cancel:
        'إلغاء',

      save:
        'حفظ',

      saving:
        'جارٍ الحفظ…',

      close:
        'إغلاق',
    },
  },
}


/* =========================================================
   CRÉATION DES RESSOURCES
   On conserve tout le contenu existant de fr.js / en.js / ar.js
   et on complète uniquement settings.
========================================================= */

function buildResource(
  baseResource,
  language,
) {
  return {
    translation: {
      ...baseResource.translation,

      settings: {
        ...baseResource.translation.settings,

        ...extraSettingsTranslations[
          language
        ],
      },
    },
  }
}


const resources = {
  fr: buildResource(
    fr,
    'fr',
  ),

  en: buildResource(
    en,
    'en',
  ),

  ar: buildResource(
    ar,
    'ar',
  ),
}


/* =========================================================
   LANGUE MÉMORISÉE
========================================================= */

const storedLanguage =
  localStorage.getItem(
    'djina-language',
  )


const savedLanguage =
  supportedLanguages.includes(
    storedLanguage,
  )
    ? storedLanguage
    : 'fr'


/* =========================================================
   LANG / DIRECTION DU DOCUMENT
========================================================= */

function applyDocumentLanguage(
  language,
) {
  const resolvedLanguage =
    language?.split('-')[0] ||
    'fr'

  document.documentElement.lang =
    resolvedLanguage

  document.documentElement.dir =
    resolvedLanguage === 'ar'
      ? 'rtl'
      : 'ltr'

  document.body?.setAttribute(
    'dir',
    resolvedLanguage === 'ar'
      ? 'rtl'
      : 'ltr',
  )
}


/* =========================================================
   INITIALISATION I18NEXT
========================================================= */

i18n
  .use(initReactI18next)
  .init({
    resources,

    lng:
      savedLanguage,

    fallbackLng:
      'fr',

    supportedLngs:
      supportedLanguages,

    load:
      'languageOnly',

    interpolation: {
      escapeValue:
        false,
    },

    react: {
      useSuspense:
        false,
    },

    returnNull:
      false,

    returnEmptyString:
      false,
  })


/* =========================================================
   LANGUE AU PREMIER CHARGEMENT
========================================================= */

applyDocumentLanguage(
  savedLanguage,
)


/* =========================================================
   CHANGEMENT DE LANGUE
========================================================= */

i18n.on(
  'languageChanged',
  (language) => {
    const resolvedLanguage =
      language?.split('-')[0] ||
      'fr'

    const safeLanguage =
      supportedLanguages.includes(
        resolvedLanguage,
      )
        ? resolvedLanguage
        : 'fr'

    localStorage.setItem(
      'djina-language',
      safeLanguage,
    )

    applyDocumentLanguage(
      safeLanguage,
    )
  },
)


export default i18n