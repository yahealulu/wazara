export interface Translations {
  tomorrow: string;
  meetingDetailsTitle: string;
  meetingDetailsSubTitle: string;
  meetingReasonsGoals: string;
  meetingImportancePlaceholder: string;
  meetingTitlePlaceholder: string;
  meetingReasonsGoalsPlaceholder: string;
  meetingPresentationTitle: string;
  meetingPresentationSubTitle: string;
  uploadFileButtonText: string;
  addLinkButtonText: string;
  noFilesUploadedText: string;
  files: string;
  file : string;
  links: string;
  week: string;
  month: string;
  rescheduleMeeting: string;
  chooseNewDateTime: string;
  // Months
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
  // Days
  su: string;
  mo: string;
  tu: string;
  we: string;
  th: string;
  fr: string;
  sa: string;

  // Visitor Info Form
  visitorInfoTitle: string;
  visitorInfoSubTitle: string;
  numberOfAttendance: string;
  numberOfAttendancePlaceholder: string;

  // Date Time Form
  preferedDateTimeTitle: string;
  preferedDateTimeSubTitle: string;

  // Additional placeholders
  emailPlaceholder: string;
  linksAboutMeetingPlaceholder: string;

  // Navigation
  back: string;

  // Stepper Sidebar
  visitorsInformationStep: string;
  meetingDetailsStep: string;
  dateTimeStep: string;
  confirmationStep: string;
  introduction: string;
  meetingGoalsTitle: string;
  meetingGoalsText: string;
  meetingImportanceTitle: string;
  meetingImportanceText: string;
  descriptionTitle: string;
  descriptionText: string;
  linksTitle: string;
  linkLabel: string;
  attachmentsTitle: string;
  reportFileLabel: string;
  summaryFileLabel: string;
  cancelMeeting: string;
  cancelMeetingTitle: string;
  cancelMeetingDescription: string;
  cancelMeetingPlaceholder: string;
  cancelMeetingLabel: string;
  lettersCount: string;
  // Navigation
  overview: string;
  upcomingMeetings: string;
  previousMeetings: string;
  visitorsCheckIns: string;

  // Header
  ministryName: string;

  // Overview Page
  performanceAnalytics: string;
  incomingRequests: string;

  // Performance Analytics
  meetings: string;
  visitors: string;
  Upcoming: string;
  Complete: string;
  thisMonth: string;
  lastMonth: string;
  thisWeek: string;
  today: string;

  // Incoming Requests
  meetingTitle: string;
  visitor: string;
  importance: string;
  date: string;
  time: string;
  state: string;
  viewDetails: string;
  approve: string;
  reject: string;

  // Meeting Details
  meetingDetails: string;
  goalsImportance: string;
  attendance: string;
  linksAttachments: string;
  notes: string;
  meetingsTitle: string;
  dateTime: string;
  status: string;
  exportAsFile: string;
  requestAnEdit: string;
  accept: string;
  rejectThisRequest: string;
  youAreAboutToReject: string;
  letVisitorKnowRejection: string;
  rejectionCauseOptional: string;
  sendAMessage: string;
  letVisitorKnowEdit: string;
  message: string;
  send: string;

  // Admin Tabs
  goalsAndImportance: string;
  linksAndAttachments: string;

  // Attendance Section
  present: string;
  absent: string;
  late: string;
  visitorsInformation: string;
  attendantsInformation: string;
  name: string;
  contactPhoneNumber: string;
  emailAddress: string;
  visitorsName: string;

  // Links Section
  attachments: string;
  externalLinks: string;

  // Notes Section
  addNote: string;
  save: string;

  // زر إعادة جدولة
  reschedule: string;

  // Previous Meetings
  previousMeetingDetails: string;

  // Visitors Page
  checkIn: string;
  checkOut: string;
  visitorName: string;
  organization: string;
  contact: string;
  checkInTime: string;
  checkOutTime: string;

  // Visitors Filters
  all: string;
  checkedIn: string;
  peopleHaveCheckedIn: string;

  // Auth Page
  login: string;
  signup: string;
  email: string;
  password: string;
  confirmPassword: string;
  forgotPassword: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  signIn: string;
  signUp: string;

  // Auth Form
  welcomeBack: string;
  enterYourInfoToLogin: string;
  createYourAccount: string;
  enterYourInfoToSignUp: string;
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  phonePlaceholder: string;
  passwordPlaceholder: string;
  namePlaceholder: string;
  idPlaceholder: string;

  // Home Page
  welcome: string;

  // Importance Levels
  high: string;
  medium: string;
  low: string;

  // Arabic Importance Levels
  highAr: string;
  mediumAr: string;
  lowAr: string;

  // States
  accepted: string;
  pending: string;
  canceled: string;

  // Pagination
  previous: string;
  next: string;

  // Search
  searchPlaceholder: string;

  // Modal
  this: string;
  request: string;
  yourAboutToReject: string;
  meetingRequest: string;
  thisActionCannotBeUndone: string;
  rejectionCause: string;
  optional: string;
  letTheVisitorKnow: string;
  cancel: string;

  // Note Card
  delete: string;
  edit: string;
  deleteNote: string;
  saveChanges: string;
  editNote: string;
  youreAboutToDelete: string;
  writeYourNote: string;
  sampleNoteContent: string;
  //file
  OpenFIle: string;
  // Common
  search: string;
  actions: string;
  loading: string;
  signOut: string;
  noData: string;
  NewMeeting: string;
}

export const enTranslations: Translations = {
  file : "file",
  OpenFIle: "Open FIle",
  NewMeeting: "New Meeting",
  meetingDetailsTitle: "Meeting Details",
  meetingDetailsSubTitle: "Enter the details of your meeting request.",
  meetingReasonsGoals: "Meeting’s Goals",
  meetingImportancePlaceholder: "Why is this meeting important?",
  meetingTitlePlaceholder: "Meeting Title...",
  meetingReasonsGoalsPlaceholder: "Meeting Goals...",
  meetingPresentationTitle: "Meeting Presentation",
  meetingPresentationSubTitle:
    "Upload any files or links related to your meeting.",
  uploadFileButtonText: "Upload File",
  addLinkButtonText: "Add Link",
  noFilesUploadedText: "No files uploaded yet.",
  files: "Files",
  links: "Links",
  tomorrow: "Tomorrow",
  week: "Week",
  month: "Month",
  rescheduleMeeting: "Reschedule Meeting",
  chooseNewDateTime: "Choose A New Date & Time For This Meeting",
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",
  su: "Su",
  mo: "Mo",
  tu: "Tu",
  we: "We",
  th: "Th",
  fr: "Fr",
  sa: "Sa",
  introduction: "Introduction",
  meetingGoalsTitle: "Meeting’s Goals",
  meetingGoalsText:
    "Meeting’s Cause & Goals. Meeting’s Cause & Goals. Meeting’s Cause & Goals.",
  meetingImportanceTitle: "Meeting’s Importance",
  meetingImportanceText:
    "Meeting’s Importance & Why This Meeting Is So Important.",
  descriptionTitle: "Description",
  descriptionText:
    "Description Introduction About The Visitor or Their Organization. Description Introduction About The Visitor or Their Organization. Description Introduction About The Visitor or Their Organization.",
  linksTitle: "Links",
  linkLabel: "Link",
  attachmentsTitle: "Attachments",
  reportFileLabel: "Report.pdf",
  summaryFileLabel: "Summary.pdf",
  cancelMeeting: "Cancel Meeting",
  cancelMeetingTitle: "Cancel this Meeting?",
  cancelMeetingDescription:
    "You are about to reject this meeting request. This action can't be undone, so please be certain.",
  cancelMeetingPlaceholder: "Let the visitor know why his meeting was canceled",
  cancelMeetingLabel: "Cancelation Cause (Optional)",
  lettersCount: "0/30 Letters",
  // Navigation
  overview: "Overview",
  upcomingMeetings: "Upcoming Meetings",
  previousMeetings: "Previous Meetings",
  visitorsCheckIns: "Visitors & Check-Ins",

  // Header
  ministryName: "Ministry Of Communication & Information Technology",

  // Overview Page
  performanceAnalytics: "Performance Analytics",
  incomingRequests: "Incoming Requests",

  // Performance Analytics
  meetings: "Meetings",
  visitors: "Visitors",
  Upcoming: "Upcoming",
  Complete: "Completed",
  thisMonth: "This Month",
  lastMonth: "Last Month",
  thisWeek: "This Week",
  today: "Today",

  // Incoming Requests
  meetingTitle: "Meeting Title",
  visitor: "Visitor",
  importance: "Importance",
  date: "Date",
  time: "Time",
  state: "State",
  viewDetails: "View Details",
  approve: "Approve",
  reject: "Reject",

  // Meeting Details
  meetingDetails: "Meeting Details",
  goalsImportance: "Goals & Importance",
  attendance: "Attendance",
  linksAttachments: "Links & Attachments",
  notes: "Notes",
  meetingsTitle: "Meeting's Title",
  dateTime: "Date & Time",
  status: "Status",
  exportAsFile: "Export As File",
  requestAnEdit: "Request An Edit",
  accept: "Accept",
  rejectThisRequest: "Reject This Request?",
  youAreAboutToReject:
    "You're about to reject this meeting request. This action can't be undone, so please be certain.",
  letVisitorKnowRejection:
    "Let the visitor know why their meeting was rejected",
  rejectionCauseOptional: "Rejection Cause (Optional)",
  sendAMessage:
    "Send a message requesting specific edits to the meeting details.",
  letVisitorKnowEdit: "Let the visitor know what should be edited",
  message: "Message",
  send: "Send",

  // Admin Tabs
  goalsAndImportance: "Goals & Importance",
  linksAndAttachments: "Links & Attachments",

  // Attendance Section
  present: "Present",
  absent: "Absent",
  late: "Late",
  visitorsInformation: "Visitor's Information",
  attendantsInformation: "Attendant's Information",
  name: "Name",
  contactPhoneNumber: "Phone Number",
  emailAddress: "Email Address",
  visitorsName: "Visitor's Name",

  // Links Section
  attachments: "Attachments",
  externalLinks: "External Links",

  // Notes Section
  addNote: "Add Note",
  save: "Save",

  // Previous Meetings
  previousMeetingDetails: "Previous Meeting Details",

  // Visitors Page
  checkIn: "Check In",
  checkOut: "Check Out",
  visitorName: "Visitor Name",
  organization: "Organization",
  contact: "Contact",
  checkInTime: "Check In Time",
  checkOutTime: "Check Out Time",

  // Visitors Filters
  all: "All",
  checkedIn: "Checked In",
  peopleHaveCheckedIn: "People Have Checked in",

  // Auth Page
  login: "Login",
  signup: "Sign Up",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  forgotPassword: "Forgot Password?",
  alreadyHaveAccount: "Already have an account?",
  dontHaveAccount: "Don't have an account?",
  signIn: "Sign In",
  signUp: "Sign Up",

  // Auth Form
  welcomeBack: "Welcome Back!",
  enterYourInfoToLogin: "Enter Your Information Below To Log In.",
  createYourAccount: "Create Your Account!",
  enterYourInfoToSignUp: "Enter Your Information Below To Sign Up.",
  fullName: "Full Name",
  idNumber: "ID Number",
  phoneNumber: "Phone Number",
  phonePlaceholder: "+963 - xxxxxxxxx",
  passwordPlaceholder: "At Least 8 Character",
  namePlaceholder: "Your Name Goes here",
  idPlaceholder: "National ID No.",

  // Home Page
  welcome: "Welcome",
  
  // Auth
  // Common
  search: "Search",
  actions: "Actions",

  signOut: "Sign Out",
  noData: "No data available",

  // Importance Levels
  high: "High",
  medium: "Medium",
  low: "Low",

  // Arabic Importance Levels
  highAr: "أولوية قصوى",
  mediumAr: "متوسط الأهمية",
  lowAr: "ثانوي",

  // States
  accepted: "Accepted",
  pending: "Pending",
  canceled: "Canceled",

  // Pagination
  previous: "Previous",
  next: "Next",

  // Search
  searchPlaceholder: "Search (Meetings, Visitors...)",

  // Modal
  this: "This",
  request: "Request",
  yourAboutToReject:
    "You're about to reject this meeting request. This action can't be undone, so please be certain.",
  meetingRequest: "meeting request",
  thisActionCannotBeUndone:
    "This action can't be undone, so please be certain.",
  rejectionCause: "Rejection Cause",
  optional: "Optional",
  letTheVisitorKnow: "Let the visitor know why his meeting was rejected",
  cancel: "Cancel",

  // Note Card
  delete: "Delete",
  edit: "Edit",
  deleteNote: "Delete Note",
  saveChanges: "Save Changes",
  reschedule: "Reschedule",
  editNote: "Edit Note",
  youreAboutToDelete:
    "You're about to delete this note. This action can't be undone, so please be certain.",
  writeYourNote: "Write your note",
  sampleNoteContent:
    "Meeting's Cause & Goals Meeting's Cause & Goals Meeting's Cause & Goals Meeting's Cause & Goals Meeting's Cause & Goals Meeting's Cause & Goals.",

  // Common
  loading: "Loading...",

  // Visitor Info Form
  visitorInfoTitle: "Visitor Information",
  visitorInfoSubTitle:
    "Please provide your information and details about attendees.",
  numberOfAttendance: "Number of Attendees",
  numberOfAttendancePlaceholder: "How many people will attend?",

  // Date Time Form
  preferedDateTimeTitle: "Preferred Date & Time",
  preferedDateTimeSubTitle:
    "Choose your preferred date and time for the meeting.",

  // Additional placeholders
  emailPlaceholder: "your.email@example.com",
  linksAboutMeetingPlaceholder: "Add links related to the meeting...",

  // Navigation
  back: "Back",

  // Stepper Sidebar
  visitorsInformationStep: "Visitors Information",
  meetingDetailsStep: "Meeting Details",
  dateTimeStep: "Date & Time",
  confirmationStep: "Confirmation",
};

export const arTranslations: Translations = {
  file : "ملف",
  OpenFIle: "عرض الملف",
  NewMeeting: "اضافة اجتماع",
  meetingDetailsTitle: "تفاصيل الاجتماع",
  meetingDetailsSubTitle: "أدخل تفاصيل طلب الاجتماع الخاص بك.",
  meetingReasonsGoals: "أهداف الاجتماع",
  meetingImportancePlaceholder: "لماذا هذا الاجتماع مهم؟",
  meetingTitlePlaceholder: "عنوان الاجتماع...",
  meetingReasonsGoalsPlaceholder: "أهداف الاجتماع...",
  meetingPresentationTitle: "عرض الاجتماع",
  meetingPresentationSubTitle: "قم برفع أي ملفات أو روابط متعلقة بالاجتماع.",
  uploadFileButtonText: "رفع ملف",
  addLinkButtonText: "إضافة رابط",
  noFilesUploadedText: "لم يتم رفع أي ملفات بعد.",
  files: "ملفات",
  links: "روابط",
  tomorrow: "غداً",
  week: "أسبوع",
  month: "شهر",
  rescheduleMeeting: "إعادة جدولة الاجتماع",
  chooseNewDateTime: "اختر تاريخ ووقت جديد لهذا الاجتماع",
  january: "يناير",
  february: "فبراير",
  march: "مارس",
  april: "أبريل",
  may: "مايو",
  june: "يونيو",
  july: "يوليو",
  august: "أغسطس",
  september: "سبتمبر",
  october: "أكتوبر",
  november: "نوفمبر",
  december: "ديسمبر",
  su: "الأحد",
  mo: "الاثنين",
  tu: "الثلاثاء",
  we: "الأربعاء",
  th: "الخميس",
  fr: "الجمعة",
  sa: "السبت",
  introduction: "مقدمة",
  meetingGoalsTitle: "أهداف الاجتماع",
  meetingGoalsText:
    "سبب وأهداف الاجتماع. سبب وأهداف الاجتماع. سبب وأهداف الاجتماع.",
  meetingImportanceTitle: "أهمية الاجتماع",
  meetingImportanceText: "أهمية الاجتماع ولماذا هذا الاجتماع مهم.",
  descriptionTitle: "الوصف",
  descriptionText:
    "مقدمة وصفية عن الزائر أو منظمته. مقدمة وصفية عن الزائر أو منظمته. مقدمة وصفية عن الزائر أو منظمته.",
  linksTitle: "الروابط",
  linkLabel: "الرابط ",
  attachmentsTitle: "المرفقات",
  reportFileLabel: "تقرير.pdf",
  summaryFileLabel: "ملخص.pdf",
  Upcoming: "القادمة",
  cancelMeeting: "إلغاء الاجتماع",
  cancelMeetingTitle: "هل تريد إلغاء هذا الاجتماع؟",
  cancelMeetingDescription:
    "أنت على وشك رفض طلب الاجتماع هذا. لا يمكن التراجع عن هذا الإجراء، لذا يرجى التأكد.",
  cancelMeetingPlaceholder: "أعلم الزائر لماذا تم إلغاء الاجتماع",
  cancelMeetingLabel: "سبب الإلغاء (اختياري)",
  lettersCount: "0/30 حرف",
  // Navigation
  overview: "نظرة عامة",
  upcomingMeetings: "الاجتماعات القادمة",
  previousMeetings: "الاجتماعات السابقة",
  visitorsCheckIns: "الزوار والتسجيل",

  // Header
  ministryName: "وزارة الاتصالات وتقنية المعلومات",

  // Overview Page
  performanceAnalytics: "تحليلات الأداء",
  incomingRequests: "الطلبات الواردة",

  // Performance Analytics
  meetings: "الاجتماعات",
  visitors: "الزوار",
  // attendance: "الحضور", // إزالة التكرار هنا
  Complete: "المكتملة",
  thisMonth: "هذا الشهر",
  lastMonth: "الشهر الماضي",
  thisWeek: "هذا الأسبوع",
  today: "اليوم",

  // Incoming Requests
  meetingTitle: "عنوان الاجتماع",
  visitor: "الزائر",
  importance: "الأهمية",
  date: "التاريخ",
  time: "الوقت",
  state: "الحالة",
  viewDetails: "عرض التفاصيل",
  approve: "موافقة",
  reject: "رفض",

  // Meeting Details
  meetingDetails: "تفاصيل الاجتماع",
  goalsImportance: "الأهداف والأهمية",
  attendance: "الحضور",
  linksAttachments: "الروابط والمرفقات",
  notes: "الملاحظات",
  meetingsTitle: "عنوان الاجتماع",
  dateTime: "التاريخ والوقت",
  status: "الحالة",
  exportAsFile: "تصدير كملف",
  requestAnEdit: "طلب تعديل",
  accept: "قبول",
  rejectThisRequest: "رفض هذا الطلب؟",
  youAreAboutToReject:
    "أنت على وشك رفض طلب الاجتماع هذا. لا يمكن التراجع عن هذا الإجراء، لذا يرجى التأكد.",
  letVisitorKnowRejection: "أعلم الزائر لماذا تم رفض اجتماعه",
  rejectionCauseOptional: "سبب الرفض (اختياري)",
  sendAMessage: "يمكنك إرسال رسالة تطلب تعديلات محددة على تفاصيل الاجتماع.",
  letVisitorKnowEdit: "أعلم الزائر ما الذي يجب تعديله",
  message: "رسالة",
  send: "إرسال",

  // Admin Tabs
  goalsAndImportance: "الأهداف والأهمية",
  linksAndAttachments: "الروابط والمرفقات",

  // Attendance Section
  present: "حاضر",
  absent: "غائب",
  late: "متأخر",
  visitorsInformation: "معلومات الزائر",
  attendantsInformation: "معلومات الحاضر",
  name: "الاسم",
  contactPhoneNumber: "رقم الهاتف",
  emailAddress: "عنوان البريد الإلكتروني",
  visitorsName: "اسم الزائر",

  // Links Section
  attachments: "المرفقات",
  externalLinks: "روابط خارجية",

  // Notes Section
  addNote: "إضافة ملاحظة",
  save: "حفظ",

  // Previous Meetings
  previousMeetingDetails: "تفاصيل الاجتماع السابق",

  // Visitors Page
  checkIn: "تسجيل دخول",
  checkOut: "تسجيل خروج",
  visitorName: "اسم الزائر",
  organization: "المنظمة",
  contact: "جهة الاتصال",
  checkInTime: "وقت الدخول",
  checkOutTime: "وقت الخروج",

  // Visitors Filters
  all: "الكل",
  checkedIn: "تم التسجيل",
  peopleHaveCheckedIn: "أشخاص تم تسجيلهم",

  // Auth Page
  login: "تسجيل الدخول",
  signup: "إنشاء حساب",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  confirmPassword: "تأكيد كلمة المرور",
  forgotPassword: "نسيت كلمة المرور؟",
  alreadyHaveAccount: "لديك حساب بالفعل؟",
  dontHaveAccount: "ليس لديك حساب؟",
  signIn: "تسجيل الدخول",
  signUp: "إنشاء حساب",

  // Auth Form
  welcomeBack: "مرحباً بعودتك!",
  enterYourInfoToLogin: "أدخل معلوماتك أدناه لتسجيل الدخول.",
  createYourAccount: "أنشئ حسابك!",
  enterYourInfoToSignUp: "أدخل معلوماتك أدناه لإنشاء حساب.",
  fullName: "الاسم الكامل",
  idNumber: "رقم الهوية",
  phoneNumber: "رقم الهاتف",
  phonePlaceholder: "+963 - xxxxxxxxx",
  passwordPlaceholder: "8 أحرف على الأقل",
  namePlaceholder: "اكتب اسمك هنا",
  idPlaceholder: "رقم الهوية الوطنية",

  // Home Page
  welcome: "مرحباً",

  // Auth
  loading: "جاري التحميل...",
  signOut: "تسجيل الخروج",

  // Importance Levels
  high: "عالية",
  medium: "متوسطة",
  low: "منخفضة",

  // Arabic Importance Levels
  highAr: "أولوية قصوى",
  mediumAr: "متوسط الأهمية",
  lowAr: "ثانوي",

  // States
  accepted: "مقبول",
  pending: "قيد الانتظار",
  canceled: "ملغى",

  // Pagination
  previous: "السابق",
  next: "التالي",

  // Search
  searchPlaceholder: "بحث (اجتماعات، زوار...)",

  // Modal
  this: "هذا",
  request: "طلب",
  yourAboutToReject:
    "أنت على وشك رفض طلب الاجتماع هذا. لا يمكن التراجع عن هذا الإجراء، لذا يرجى التأكد.",
  meetingRequest: "طلب اجتماع",
  thisActionCannotBeUndone: "لا يمكن التراجع عن هذا الإجراء، لذا يرجى التأكد.",
  rejectionCause: "سبب الرفض",
  optional: "اختياري",
  letTheVisitorKnow: "أعلم الزائر لماذا تم رفض اجتماعه",
  cancel: "إلغاء",

  // Note Card
  delete: "حذف",
  edit: "تعديل",
  deleteNote: "حذف الملاحظة",
  saveChanges: "حفظ التغييرات",
  reschedule: "إعادة جدولة",
  editNote: "تعديل الملاحظة",
  youreAboutToDelete:
    "أنت على وشك حذف هذه الملاحظة. لا يمكن التراجع عن هذا الإجراء، لذا يرجى التأكد.",
  writeYourNote: "اكتب ملاحظتك",
  sampleNoteContent:
    "أسباب وأهداف الاجتماع أسباب وأهداف الاجتماع أسباب وأهداف الاجتماع أسباب وأهداف الاجتماع أسباب وأهداف الاجتماع أسباب وأهداف الاجتماع.",

  // Common
  search: "بحث",
  actions: "إجراءات",

  noData: "لا توجد بيانات متاحة",

  // Visitor Info Form
  visitorInfoTitle: "معلومات الزائر",
  visitorInfoSubTitle: "يرجى تقديم معلوماتك وتفاصيل الحاضرين.",
  numberOfAttendance: "عدد الحاضرين",
  numberOfAttendancePlaceholder: "كم شخص سيحضر؟",

  // Date Time Form
  preferedDateTimeTitle: "التاريخ والوقت المفضل",
  preferedDateTimeSubTitle: "اختر التاريخ والوقت المفضل للاجتماع.",

  // Additional placeholders
  emailPlaceholder: "your.email@example.com",
  linksAboutMeetingPlaceholder: "أضف روابط متعلقة بالاجتماع...",

  // Navigation
  back: "رجوع",

  // Stepper Sidebar
  visitorsInformationStep: "معلومات الزوار",
  meetingDetailsStep: "تفاصيل الاجتماع",
  dateTimeStep: "التاريخ والوقت",
  confirmationStep: "التأكيد",
};

export const translations: Record<"en" | "ar", Translations> = {
  en: enTranslations,
  ar: arTranslations,
};
