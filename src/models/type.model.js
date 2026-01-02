export const rolePermissions = [
  {
    name: "Dashboard",
    key: "dashboard",
  },
  {
    name: "Company Statistics",
    key: "Statistics",
  },
  {
    name: "Skills",
    key: "skills",
  },
  {
    name: "Client",
    key: "client",
  },
  {
    name: "Projects",
    key: "project",
  },
  {
    name: "Reminder",
    key: "Reminder",
  },
  {
    name: "Transaction",
    key: "transaction",
  },
  {
    name: "Category",
    key: "category",
  },
  {
    name: "Current Expense",
    key: "Spending",
  },
  {
    name: "Fixed Expense",
    key: "Otherexp",
  },
  {
    name: "Invoice",
    key: "invoices",
  },
  {
    name: "Materials",
    key: "materials",
  },
  {
    name: "Order Materials",
    key: "BusinessOrder",
  },

  {
    name: "Contractors",
    key: "contractor",
  },
  {
    name: "Material Supplier",
    key: "suppliers",
  },
  {
    name: "Tool Supplier",
    key: "suppliers",
  },
  {
    name: "Accoutants",
    key: "accoutants",
  },
  {
    name: "Job Configuration",
    key: "config",
  },
  {
    name: "Service",
    key: "Service",
  },
  {
    name: "Estimate",
    key: "estimate",
  },
  {
    name: "Jobs",
    key: "jobs",
  },
  {
    name: "Tools",
    key: "Tool",
  },
  {
    name: "CIS Tax",
    key: "CISTax",
  },

  {
    name: "Travel Rates",
    key: "travelrates",
  },
  {
    name: "VAT",
    key: "vat",
  },
  // {
  //   name: "Company Details",
  //   key: "companydetails",

  // },
  {
    name: "Payable to Contractor",
    key: "payabletocontractor",
  },
  {
    name: "Payslips",
    key: "payslips",
  },
  {
    name: "Reports",
    key: "reports",
  },

  {
    name: "Week Planner",
    key: "schedule",
  },
  {
    name: "Working Week",
    key: "schedule",
  },
];

export const rolePermission = [
  { name: "Read", key: "read" },
  { name: "Add", key: "add" },
  { name: "Edit", key: "edit" },
  { name: "Delete", key: "delete" },
];

export const roleGetAllKeys = () => {
  let keys = {};
  rolePermissions.map((itm) => {
    rolePermission.map((pitm) => {
      keys = { ...keys, [`${pitm.key}${itm.key}`]: false };
    });
  });

  return keys;
};

export const userType = {
  id: "",
  fullName: "",
  role: "",
  email: "",
  mobileNo: "",
  aboutUs: "",
  address: "",
  image: "",
  logo: "",
};
export const CategoryType = {
  id: "",
  name: "",
  catType: "",
  subParentCategory: "",
  description: "",
  image: "",
  order: "",
  parentCategory: "",
  status: "active",
  icon: "",
  banner: "",
  altImageName: "",
  altIconName: "",
  bannerOverlayHeading: "",
  bannerOverlayBody: "",
  description: "",
  featured: "No",
  urlKey: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
};
export const roleType = {
  id: "",
  status: "active",
  permissions: roleGetAllKeys(),
};
export const resellerCategoryType = {
  id: "",
  name: "",
  catType: "Reseller",
  description: "",
  image: "",
};
export const planType = {
  id: "",
  name: "",
  price: "",
  status: "active",
  interval: "Monthly",
  category: "",
  recommended: "",
  allowedProducts: "",
  feature: [],
  monthlyPrice: "",
  threeMonthPrice: "",
  sixMonthPrice: "",
  yearlyPrice: "",
  extraProductPrice: "",
};
export const continentType = { id: "", name: "", status: "active" };
export const featureType = {
  id: "",
  name: "",
  description: "",
  status: "active",
};
export const emailType = { id: "", subject: "", content: "", status: "active" };
export const cityType = {
  id: "",
  name: "",
  status: "active",
  countryId: "",
  regionId: "",
  continent: "",
};
export const bookingSystemType = {
  id: "",
  name: "",
  apiKey: "",
  secretKey: "",
};
export const holidaysType = {
  id: "",
  discOrPre: "",
  name: "",
  type: "",
  country: "",
  counties: "",
  amountOrPercent: "",
  number: "",
  applyFor: [],
  preOrPost: "",
  preDays: "",
  postDays: "",
  changesApply: "",
  changesDate: "",
  changesDateTo: "",
};
export const earlybirdpricingType = {
  id: "",
  name: "",
  discOrPre: "",
  startDate: "",
  country: "",
  counties: "",
  applyEarlyBirdPricing: [],
  endDate: "",
  inventory: [],
  lastMinutePricingFromDate: "",
  lastMinutePricingToDate: "",
  applyPriceType: "",
  changesDate: "",
  changesDateTo: "",
  notApply: "",
  notApplyCondition: "",
  notApplicableFor: [],
  blackOutDates: [],
  amountOrPercent: "",
  number: "",
  applyToDaysTimeSlot: "",
  daysToApply: [],
  timeSlots: [],
};
export const posType = { id: "", name: "", apiKey: "", url: "" };

export const resellerType = {
  id: "",
  name: "",
  logo: "",
  category: "",
  contractDate: "",
  booking: "",
  country: "",
  contactPerson: "",
  contactPhone: "",
  contactEmail: "",
  website: "",
};
export const couponType = {
  id: "",
  title: "",
  status: "active",
  description: "",
  couponCode: "",
  usesPerCoupon: "",
  usesPerCustomer: "",
  dateFrom: "",
  dateTo: "",
  discountType: "",
  discountAmount: "",
};
