console.log("Script launched successfully.");

var vendorForm = document.getElementById("vendorForm");
var clearBtn = document.getElementById("clearBtn");

// Only run form-specific code if we're on the market.html page
if (vendorForm) {
  var marketTypeCheckboxes = document.getElementsByName("mkt-type");
  var firstMarketCheckbox = document.querySelector('input[name="mkt-type"]');
  var otherMarketTypeInput = document.getElementById("other-market-type");
  var otherMarketTypeGroup = otherMarketTypeInput
    ? otherMarketTypeInput.closest(".input-group")
    : null;

  function updateMarketTypeRequired() {
    if (!otherMarketCheckbox || !otherMarketTypeInput || !firstMarketCheckbox) {
      return;
    }

    var anyMarketChecked = false;
    for (var i = 0; i < marketTypeCheckboxes.length; i++) {
      if (marketTypeCheckboxes[i].checked) {
        anyMarketChecked = true;
        break;
      }
    }

    firstMarketCheckbox.required = !anyMarketChecked;
    otherMarketTypeInput.required = otherMarketCheckbox.checked == true;

    if (otherMarketCheckbox.checked == true) {
      if (otherMarketTypeGroup) {
        otherMarketTypeGroup.classList.remove("hidden-field");
      }
      if (otherMarketTypeInput.required == false) {
        otherMarketTypeInput.required = true;
      }
    } else {
      if (otherMarketTypeGroup) {
        otherMarketTypeGroup.classList.add("hidden-field");
      }
      otherMarketTypeInput.value = "";
    }
  }

  for (var i = 0; i < marketTypeCheckboxes.length; i++) {
    marketTypeCheckboxes[i].addEventListener("change", updateMarketTypeRequired);
  }
  updateMarketTypeRequired();

  vendorForm.onsubmit = function (e) {
    updateMarketTypeRequired();

    if (!vendorForm.reportValidity()) {
      e.preventDefault();
      return;
    }

    var file = document.getElementById("validId").value;
    if (file == "") {
      alert("Please upload a valid government ID.");
      e.preventDefault();
      return;
    }

    var bday = document.getElementById("birthday").value;
    if (bday != "") {
      var birthDate = new Date(bday);
      var today = new Date();

      var age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        alert("You must be at least 18 years old to register as a vendor.");
        e.preventDefault();
        return;
      }
    }

    var phone = document.getElementById("phone").value;
    var phoneDigits = phone.replace(/[^0-9]/g, "");

    if (phoneDigits.length < 11) {
      alert("Please enter a valid phone number.");
      e.preventDefault();
      return;
    }

    var permitYear = document.getElementById("permitYear").value;
    var currentYear = new Date().getFullYear();

    if (permitYear != "") {
      if (permitYear < 2010 || permitYear > currentYear) {
        alert("Permit year must be between 2010 and current year.");
        e.preventDefault();
        return;
      }
    }

    var govt = document.getElementsByName("gov-reg");
    var govtChecked = false;

    for (var i = 0; i < govt.length; i++) {
      if (govt[i].checked) {
        govtChecked = true;
      }
    }

    if (govtChecked == false) {
      alert("Please select at least one government registration.");
      e.preventDefault();
      return;
    }

    console.log("Form validation passed. Submitting form.");
    e.preventDefault();
    window.location.href = "success.html";
  };

  var memberRadios = document.getElementsByName("member");

  var assocNameInput = document.getElementById("assoc-name");
  var assocPosInput = document.getElementById("assoc-pos");
  var assocNameGroup = assocNameInput ? assocNameInput.closest(".input-group") : null;
  var assocPosGroup = assocPosInput ? assocPosInput.closest(".input-group") : null;

  function updateAssocFields() {
    var selected = document.querySelector('input[name="member"]:checked');

    if (!assocNameGroup || !assocPosGroup || !assocNameInput || !assocPosInput) {
      return;
    }

    if (selected && selected.value == "yes") {
      assocNameGroup.classList.remove("hidden-field");
      assocPosGroup.classList.remove("hidden-field");
      assocNameInput.required = true;
      assocPosInput.required = true;
    } else {
      assocNameGroup.classList.add("hidden-field");
      assocPosGroup.classList.add("hidden-field");
      assocNameInput.required = false;
      assocPosInput.required = false;

      assocNameInput.value = "";
      assocPosInput.value = "";
    }
  }

  for (var i = 0; i < memberRadios.length; i++) {
    memberRadios[i].addEventListener("change", updateAssocFields);
  }

  updateAssocFields();

  function clearAllValues() {
    var ok = confirm("Are you sure you want to clear all values?");
    if (ok == false) {
      return;
    }

    vendorForm.reset();

    updateMarketTypeRequired();
    updateAssocFields();
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearAllValues);
  }
} // End of vendorForm conditional

/* ===== ADMIN DASHBOARD DATA & UTILITIES ===== */
const CURRENT_YEAR = 2026;

const vendorDatabase = [
  {
    id: 1,
    firstName: "Maria",
    lastName: "Santos",
    businessName: "Fresh Catch Seafood",
    stallNumber: 5,
    marketTypes: ["wet"],
    productSource: "Local Fishing Village",
    permitNumber: "PM-2026-001",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Vendors Cooperative Union",
    associationPosition: "Secretary",
    submissionDate: new Date("2026-05-10"),
  },
  {
    id: 2,
    firstName: "Juan",
    lastName: "Reyes",
    businessName: "Daily Greens",
    stallNumber: 15,
    marketTypes: ["produce"],
    productSource: "Regional Farms",
    permitNumber: "PENDING",
    permitYear: null,
    sanitaryPractices: "Poor",
    complianceStatus: "non-compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-05-09"),
  },
  {
    id: 3,
    firstName: "Pedro",
    lastName: "Cruz",
    businessName: "Butcher's Choice",
    stallNumber: 8,
    marketTypes: ["wet"],
    productSource: "Local Suppliers",
    permitNumber: "PM-2026-045",
    permitYear: 2026,
    sanitaryPractices: "Fair",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Meat Vendors Association",
    associationPosition: "Member",
    submissionDate: new Date("2026-05-08"),
  },
  {
    id: 4,
    firstName: "Rosa",
    lastName: "Fernandez",
    businessName: "Sari-Sari Essentials",
    stallNumber: 22,
    marketTypes: ["sari-sari"],
    productSource: "Wholesale Distributors",
    permitNumber: "PM-2026-102",
    permitYear: 2025,
    sanitaryPractices: "Good",
    complianceStatus: "non-compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-05-07"),
  },
  {
    id: 5,
    firstName: "Carlos",
    lastName: "Mendoza",
    businessName: "Quick Bites Food Court",
    stallNumber: 28,
    marketTypes: ["food-service"],
    productSource: "Central Market Hub",
    permitNumber: "PM-2026-215",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Food Service Alliance",
    associationPosition: "Treasurer",
    submissionDate: new Date("2026-05-06"),
  },
  {
    id: 6,
    firstName: "Ana",
    lastName: "Lopez",
    businessName: "Organic Paradise",
    stallNumber: 3,
    marketTypes: ["produce", "dry"],
    productSource: "Eco-Farms Collective",
    permitNumber: "PM-2026-067",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Organic Sellers Network",
    associationPosition: "Chairperson",
    submissionDate: new Date("2026-05-05"),
  },
  {
    id: 7,
    firstName: "Miguel",
    lastName: "Torres",
    businessName: "Grains & Legumes Hub",
    stallNumber: 12,
    marketTypes: ["dry"],
    productSource: "Agricultural Cooperatives",
    permitNumber: "PM-2026-089",
    permitYear: 2024,
    sanitaryPractices: "Fair",
    complianceStatus: "non-compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-05-04"),
  },
  {
    id: 8,
    firstName: "Elena",
    lastName: "Ramos",
    businessName: "Frozen Foods Depot",
    stallNumber: 18,
    marketTypes: ["wet"],
    productSource: "Cold Chain Distributors",
    permitNumber: "PM-2026-156",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-05-03"),
  },
  {
    id: 9,
    firstName: "Roberto",
    lastName: "Garcia",
    businessName: "Market Fresh Produce",
    stallNumber: 7,
    marketTypes: ["produce"],
    productSource: "Local Farmers Market",
    permitNumber: "PM-2026-078",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Producers Guild",
    associationPosition: "Member",
    submissionDate: new Date("2026-05-02"),
  },
  {
    id: 10,
    firstName: "Sophia",
    lastName: "Diaz",
    businessName: "Specialty Spices Co.",
    stallNumber: 25,
    marketTypes: ["dry"],
    productSource: "International Importers",
    permitNumber: "PM-2026-198",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-05-01"),
  },
  {
    id: 11,
    firstName: "Vicente",
    lastName: "Hernandez",
    businessName: "Sea Harvest Seafood",
    stallNumber: 11,
    marketTypes: ["wet"],
    productSource: "Fishing Ports",
    permitNumber: "PM-2026-123",
    permitYear: 2025,
    sanitaryPractices: "Fair",
    complianceStatus: "non-compliant",
    associationMembership: true,
    associationName: "Fishermen Association",
    associationPosition: "Vice President",
    submissionDate: new Date("2026-04-30"),
  },
  {
    id: 12,
    firstName: "Lucia",
    lastName: "Gonzales",
    businessName: "Bakery Breads & More",
    stallNumber: 20,
    marketTypes: ["food-service"],
    productSource: "Local Mills",
    permitNumber: "PM-2026-167",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-04-29"),
  },
  {
    id: 13,
    firstName: "Angelito",
    lastName: "Abad",
    businessName: "Budget Mart Sari-Sari",
    stallNumber: 2,
    marketTypes: ["sari-sari"],
    productSource: "Metro Wholesale",
    permitNumber: "PM-2026-034",
    permitYear: 2026,
    sanitaryPractices: "Fair",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Sari-Sari Vendors Circle",
    associationPosition: "Member",
    submissionDate: new Date("2026-04-28"),
  },
  {
    id: 14,
    firstName: "Veronica",
    lastName: "Castro",
    businessName: "Tropical Juice Bar",
    stallNumber: 30,
    marketTypes: ["food-service"],
    productSource: "Fruit Suppliers",
    permitNumber: "PM-2026-245",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-04-27"),
  },
  {
    id: 15,
    firstName: "Eduardo",
    lastName: "Villarreal",
    businessName: "Premium Meat Market",
    stallNumber: 16,
    marketTypes: ["wet"],
    productSource: "Regional Slaughterhouses",
    permitNumber: "PM-2026-145",
    permitYear: 2024,
    sanitaryPractices: "Poor",
    complianceStatus: "non-compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-04-26"),
  },
  {
    id: 16,
    firstName: "Isabel",
    lastName: "Morales",
    businessName: "Garden Valley Vegetables",
    stallNumber: 9,
    marketTypes: ["produce"],
    productSource: "Direct Farm Partnerships",
    permitNumber: "PM-2026-091",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Vegetable Growers Coop",
    associationPosition: "Secretary",
    submissionDate: new Date("2026-04-25"),
  },
  {
    id: 17,
    firstName: "Ricardo",
    lastName: "Flores",
    businessName: "Dry Goods Warehouse",
    stallNumber: 19,
    marketTypes: ["dry"],
    productSource: "Central Warehouses",
    permitNumber: "PM-2026-178",
    permitYear: 2026,
    sanitaryPractices: "Fair",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-04-24"),
  },
  {
    id: 18,
    firstName: "Dolores",
    lastName: "Mercado",
    businessName: "Mixed Provisions Store",
    stallNumber: 4,
    marketTypes: ["sari-sari", "dry", "other"],
    productSource: "Bulk Distributors",
    permitNumber: "PM-2026-056",
    permitYear: 2026,
    sanitaryPractices: "Fair",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-04-23"),
  },
  {
    id: 19,
    firstName: "Benito",
    lastName: "Santiago",
    businessName: "Aquarium Fresh Fish",
    stallNumber: 14,
    marketTypes: ["wet"],
    productSource: "Daily Port Deliveries",
    permitNumber: "PM-2026-134",
    permitYear: 2025,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Fishermen Association",
    associationPosition: "Member",
    submissionDate: new Date("2026-04-22"),
  },
  {
    id: 20,
    firstName: "Margarita",
    lastName: "Vargas",
    businessName: "Snack Spot Café",
    stallNumber: 26,
    marketTypes: ["food-service"],
    productSource: "Food Service Distributors",
    permitNumber: "PM-2026-223",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Food Service Alliance",
    associationPosition: "Member",
    submissionDate: new Date("2026-04-21"),
  },
  {
    id: 21,
    firstName: "Fernando",
    lastName: "Acosta",
    businessName: "Corner Store Plus",
    stallNumber: 6,
    marketTypes: ["sari-sari"],
    productSource: "Small Wholesalers",
    permitNumber: "PM-2026-065",
    permitYear: 2026,
    sanitaryPractices: "Fair",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-04-20"),
  },
  {
    id: 22,
    firstName: "Catalina",
    lastName: "Nunez",
    businessName: "Rice & Beans Depot",
    stallNumber: 17,
    marketTypes: ["dry"],
    productSource: "Rice Millers Association",
    permitNumber: "PM-2026-167",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Rice Sellers Guild",
    associationPosition: "Treasurer",
    submissionDate: new Date("2026-04-19"),
  },
  {
    id: 23,
    firstName: "Hector",
    lastName: "Duran",
    businessName: "Poultry Paradise",
    stallNumber: 13,
    marketTypes: ["wet"],
    productSource: "Local Poultry Farms",
    permitNumber: "PM-2026-112",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-04-18"),
  },
  {
    id: 24,
    firstName: "Gabriela",
    lastName: "Serrano",
    businessName: "Vegetable Express",
    stallNumber: 23,
    marketTypes: ["produce"],
    productSource: "Morning Market Farms",
    permitNumber: "PM-2026-201",
    permitYear: 2026,
    sanitaryPractices: "Good",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Producers Guild",
    associationPosition: "Member",
    submissionDate: new Date("2026-04-17"),
  },
  {
    id: 25,
    firstName: "Nestor",
    lastName: "Bautista",
    businessName: "Harbor Select Fish",
    stallNumber: 1,
    marketTypes: ["wet"],
    productSource: "Coastal Fishing Cooperative",
    permitNumber: "PM-2027-011",
    permitYear: 2027,
    sanitaryPractices: "Excellent",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Fishermen Association",
    associationPosition: "Member",
    submissionDate: new Date("2026-05-12"),
  },
  {
    id: 26,
    firstName: "Leah",
    lastName: "Villanueva",
    businessName: "Fresh Ridge Produce",
    stallNumber: 2,
    marketTypes: ["produce"],
    productSource: "Highland Farm Network",
    permitNumber: "PM-2027-018",
    permitYear: 2027,
    sanitaryPractices: "Excellent",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Producers Guild",
    associationPosition: "Secretary",
    submissionDate: new Date("2026-05-12"),
  },
  {
    id: 27,
    firstName: "Martin",
    lastName: "Dela Cruz",
    businessName: "Cornerline Essentials",
    stallNumber: 3,
    marketTypes: ["sari-sari", "other"],
    productSource: "Regional Wholesale Depot",
    permitNumber: "PM-2027-026",
    permitYear: 2027,
    sanitaryPractices: "Excellent",
    complianceStatus: "compliant",
    associationMembership: false,
    associationName: null,
    associationPosition: null,
    submissionDate: new Date("2026-05-11"),
  },
  {
    id: 28,
    firstName: "Jocelyn",
    lastName: "Pascual",
    businessName: "Golden Grain Market",
    stallNumber: 4,
    marketTypes: ["dry"],
    productSource: "Central Rice Mill",
    permitNumber: "PM-2027-030",
    permitYear: 2027,
    sanitaryPractices: "Excellent",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Rice Sellers Guild",
    associationPosition: "Member",
    submissionDate: new Date("2026-05-11"),
  },
  {
    id: 29,
    firstName: "Samuel",
    lastName: "Ramos",
    businessName: "Morning Plate Kitchen",
    stallNumber: 5,
    marketTypes: ["food-service"],
    productSource: "Local Food Suppliers",
    permitNumber: "PM-2027-042",
    permitYear: 2027,
    sanitaryPractices: "Excellent",
    complianceStatus: "compliant",
    associationMembership: true,
    associationName: "Food Service Alliance",
    associationPosition: "Treasurer",
    submissionDate: new Date("2026-05-10"),
  },
];

const MARKET_TYPE_ORDER = ["wet", "dry", "produce", "sari-sari", "food-service", "other"];

function normalizeAdminDemoData() {
  vendorDatabase.forEach((vendor) => {
    vendor.paymentStatus = getPaymentStatusInfo(vendor).key;
    vendor.paymentStatusLabel = getPaymentStatusInfo(vendor).label;
    vendor.paymentStatusNote = getPaymentStatusInfo(vendor).note;
  });
}

normalizeAdminDemoData();

// Utility function: Get recent submissions sorted by date
function getRecentSubmissions(limit) {
  const limit_val = limit || vendorDatabase.length;
  return vendorDatabase
    .slice()
    .sort((a, b) => b.submissionDate - a.submissionDate)
    .slice(0, limit_val);
}

// Utility function: Get vendors filtered by market type
function getVendorsByMarketType(marketType) {
  return vendorDatabase.filter((vendor) => vendor.marketTypes.includes(marketType));
}

// Utility function: Get all unique market types
function getAllMarketTypes() {
  return MARKET_TYPE_ORDER.slice();
}

function getMarketTypeLabel(type) {
  const typeMap = {
    wet: "Wet Market",
    dry: "Dry Goods",
    produce: "Produce",
    "sari-sari": "Sari-Sari Store",
    "food-service": "Food Service",
    other: "Others",
  };

  return typeMap[type] || type;
}

// Utility function: Get payment period based on stall number
function getPaymentPeriodByStallNumber(stallNumber) {
  if (stallNumber >= 1 && stallNumber <= 10) {
    return "Both (Monthly or Quarterly)";
  } else if (stallNumber > 10 && stallNumber <= 20) {
    return "Quarterly";
  } else if (stallNumber > 20 && stallNumber <= 30) {
    return "Monthly";
  }
  return "Not Defined";
}

function getPaymentStatusInfo(vendor) {
  if (vendor.stallNumber <= 6) {
    return {
      key: "paid",
      label: "Paid",
      note: "Account settled for the current billing cycle.",
    };
  }

  if (vendor.stallNumber <= 12) {
    return {
      key: "partial",
      label: "Partially Paid",
      note: "Vendor has made a partial remittance and still has a remaining balance.",
    };
  }

  if (vendor.stallNumber <= 18) {
    return {
      key: "unpaid",
      label: "Unpaid",
      note: "No payment recorded for the current cycle.",
    };
  }

  return {
    key: "overdue",
    label: "Overdue / Delinquent",
    note: "Past due beyond the grace period in this simulation.",
  };
}

function getPaymentStatusClass(statusKey) {
  if (statusKey === "paid") {
    return "status-success";
  }

  if (statusKey === "partial") {
    return "status-warning";
  }

  return "status-error";
}

function getPermitReviewInfo(vendor) {
  if (vendor.permitNumber === "PENDING") {
    return {
      key: "pending",
      label: "PENDING",
      className: "status-error",
    };
  }

  const permitStatus = getPermitStatus(vendor.permitYear);

  if (permitStatus === "expired") {
    return {
      key: permitStatus,
      label: "Expired",
      className: "status-error",
    };
  }

  if (permitStatus === "expiring-soon") {
    return {
      key: permitStatus,
      label: "Expiring Soon",
      className: "status-warning",
    };
  }

  return {
    key: "active",
    label: "Active",
    className: "status-success",
  };
}

function getPaymentSummaryBuckets() {
  return {
    paid: vendorDatabase.filter((vendor) => vendor.paymentStatus === "paid"),
    partial: vendorDatabase.filter((vendor) => vendor.paymentStatus === "partial"),
    unpaid: vendorDatabase.filter((vendor) => vendor.paymentStatus === "unpaid"),
    overdue: vendorDatabase.filter((vendor) => vendor.paymentStatus === "overdue"),
  };
}

function getDashboardSummaryCounts() {
  const paymentBuckets = getPaymentSummaryBuckets();
  const permitAlerts = vendorDatabase.filter((vendor) => {
    const reviewInfo = getPermitReviewInfo(vendor);
    return reviewInfo.key !== "active";
  });

  return {
    totalVendors: vendorDatabase.length,
    paymentAlerts:
      paymentBuckets.partial.length + paymentBuckets.unpaid.length + paymentBuckets.overdue.length,
    permitAlerts: permitAlerts.length,
    associationMembers: vendorDatabase.filter((vendor) => vendor.associationMembership).length,
  };
}

// Utility function: Check if permit is expired/expiring/active
function getPermitStatus(permitYear) {
  if (permitYear === null || permitYear === undefined) {
    return "pending";
  }
  if (permitYear < CURRENT_YEAR) {
    return "expired";
  } else if (permitYear === CURRENT_YEAR) {
    return "expiring-soon";
  } else {
    return "active";
  }
}

// Utility function: Get badge class based on compliance status
function getComplianceBadgeClass(status) {
  return status === "compliant" ? "status-success" : "status-error";
}

// Utility function: Get badge text based on compliance status
function getComplianceBadgeText(status) {
  return status === "compliant" ? "Compliant" : "Non-Compliant";
}

function getFilteredExportVendors(dataset, marketType) {
  let filtered = vendorDatabase.slice();

  if (dataset === "permit-alerts") {
    filtered = filtered.filter((vendor) => getPermitReviewInfo(vendor).key !== "active");
  } else if (dataset === "payment-alerts") {
    filtered = filtered.filter(
      (vendor) => vendor.paymentStatus === "partial" || vendor.paymentStatus === "unpaid"
    );
  } else if (dataset === "overdue") {
    filtered = filtered.filter((vendor) => vendor.paymentStatus === "overdue");
  } else if (dataset === "association-members") {
    filtered = filtered.filter((vendor) => vendor.associationMembership);
  }

  if (marketType !== "all") {
    filtered = filtered.filter((vendor) => vendor.marketTypes.includes(marketType));
  }

  return filtered;
}

// ===== ADMIN PAGE POPULATION FUNCTIONS =====

// Populate Recent Submissions Table
function populateRecentSubmissions() {
  const tbody = document.getElementById("recent-submissions-body");
  if (!tbody) return; // Not on admin page

  const recentVendors = getRecentSubmissions(50); // All vendors sorted by date

  tbody.innerHTML = "";

  recentVendors.forEach((vendor) => {
    const row = document.createElement("tr");

    // Apply warning class if non-compliant
    if (vendor.complianceStatus === "non-compliant") {
      row.classList.add("warning-row");
    }

    const permitStatus = getPermitStatus(vendor.permitYear);
    let permitBadgeClass = "status-success";
    let permitBadgeText = "Active";

    if (vendor.permitNumber === "PENDING") {
      permitBadgeClass = "status-error";
      permitBadgeText = "PENDING";
    } else if (permitStatus === "expired") {
      permitBadgeClass = "status-error";
      permitBadgeText = "Expired";
    } else if (permitStatus === "expiring-soon") {
      permitBadgeClass = "status-warning";
      permitBadgeText = "Expiring Soon";
    }

    const complianceBadgeClass = getComplianceBadgeClass(vendor.complianceStatus);
    const complianceBadgeText = getComplianceBadgeText(vendor.complianceStatus);
    const marketLabels = vendor.marketTypes.map((marketType) => getMarketTypeLabel(marketType));

    row.innerHTML = `
      <td>${vendor.businessName}</td>
      <td>${marketLabels.join(", ")}</td>
      <td>${vendor.stallNumber}</td>
      <td><span class="${complianceBadgeClass}">${complianceBadgeText}</span></td>
      <td><span class="${permitBadgeClass}">${permitBadgeText}</span></td>
    `;

    tbody.appendChild(row);
  });
}

// Populate Product Source Tracking by Market Type
function populateProductSourceTracking() {
  const container = document.getElementById("market-types-container");
  if (!container) return; // Not on admin page

  const marketTypes = getAllMarketTypes();
  container.innerHTML = "";

  marketTypes.forEach((marketType) => {
    const vendors = getVendorsByMarketType(marketType);

    // Create market type section
    const section = document.createElement("details");
    section.className = "market-type-section";
    section.open = true;

    const summary = document.createElement("summary");
    summary.className = "market-type-header";
    summary.innerHTML = `
      <span class="market-type-title">${getMarketTypeLabel(marketType)}</span>
      <span class="market-type-badge">(${vendors.length})</span>
      <span class="toggle-arrow">▼</span>
    `;

    const content = document.createElement("div");
    content.className = "market-type-content";

    const table = document.createElement("table");
    table.className = "survey-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Business Name</th>
          <th>Vendor Name</th>
          <th>Stall Number</th>
          <th>Sanitary Practices</th>
        </tr>
      </thead>
      <tbody>
        ${vendors
          .map(
            (vendor) =>
              `
          <tr>
            <td>${vendor.businessName}</td>
            <td>${vendor.firstName} ${vendor.lastName}</td>
            <td>${vendor.stallNumber}</td>
            <td>${vendor.sanitaryPractices}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;

    content.appendChild(table);
    section.appendChild(summary);
    section.appendChild(content);
    container.appendChild(section);
  });
}

// Populate Vendor Association Tracking
function populateAssociationTracking() {
  const tbody = document.getElementById("association-tracking-body");
  if (!tbody) return; // Not on admin page

  tbody.innerHTML = "";

  vendorDatabase.forEach((vendor) => {
    const row = document.createElement("tr");

    const membershipStatus = vendor.associationMembership ? "✓ Yes" : "✗ No";
    const assocName = vendor.associationName || "—";
    const assocPos = vendor.associationPosition || "—";

    row.innerHTML = `
      <td>${vendor.businessName}</td>
      <td>${vendor.firstName} ${vendor.lastName}</td>
      <td>${membershipStatus}</td>
      <td>${assocName}</td>
      <td>${assocPos}</td>
    `;

    tbody.appendChild(row);
  });
}

// Populate Permit Expiration Tracking (sorted by expiration risk)
function populatePermitExpirationTracking() {
  const tbody = document.getElementById("permit-expiration-body");
  if (!tbody) return; // Not on admin page

  // Sort by permit status: expired first, then expiring soon, then active
  const sortedVendors = vendorDatabase.slice().sort((a, b) => {
    const statusA = getPermitReviewInfo(a).key;
    const statusB = getPermitReviewInfo(b).key;

    const statusOrder = { pending: 0, expired: 1, "expiring-soon": 2, active: 3 };
    return statusOrder[statusA] - statusOrder[statusB];
  });

  tbody.innerHTML = "";

  sortedVendors.forEach((vendor) => {
    const row = document.createElement("tr");

    const permitReviewInfo = getPermitReviewInfo(vendor);

    const permitYear = vendor.permitYear || "—";

    row.innerHTML = `
      <td>${vendor.businessName}</td>
      <td>${vendor.stallNumber}</td>
      <td>${vendor.permitNumber}</td>
      <td>${permitYear}</td>
      <td><span class="${permitReviewInfo.className}">${permitReviewInfo.label}</span></td>
    `;

    tbody.appendChild(row);
  });
}

function populateDashboardSummary() {
  const counts = getDashboardSummaryCounts();

  const totalVendors = document.getElementById("summary-total-vendors");
  const paymentAlerts = document.getElementById("summary-payment-alerts");
  const permitAlerts = document.getElementById("summary-permit-alerts");
  const associationMembers = document.getElementById("summary-association-members");

  if (totalVendors) totalVendors.textContent = String(counts.totalVendors);
  if (paymentAlerts) paymentAlerts.textContent = String(counts.paymentAlerts);
  if (permitAlerts) permitAlerts.textContent = String(counts.permitAlerts);
  if (associationMembers) associationMembers.textContent = String(counts.associationMembers);
}

function populatePaymentSummarySection() {
  const summaryCards = document.getElementById("payment-summary-cards");
  const groupsContainer = document.getElementById("payment-status-groups");

  if (!summaryCards || !groupsContainer) return;

  const buckets = getPaymentSummaryBuckets();
  const paymentGroups = [
    { key: "paid", label: "Paid" },
    { key: "partial", label: "Partially Paid" },
    { key: "unpaid", label: "Unpaid" },
    { key: "overdue", label: "Overdue / Delinquent" },
  ];

  summaryCards.innerHTML = paymentGroups
    .map((group) => {
      const count = buckets[group.key].length;
      return `<div class="payment-summary-chip payment-summary-chip--${group.key}">${group.label}: ${count}</div>`;
    })
    .join("");

  groupsContainer.innerHTML = paymentGroups
    .map((group) => {
      const vendors = buckets[group.key];
      const isOpen = group.key === "paid";

      return `
        <details class="payment-group"${isOpen ? " open" : ""}>
          <summary class="payment-group-header">
            <span>${group.label}</span>
            <span class="market-type-badge">(${vendors.length})</span>
            <span class="toggle-arrow">▼</span>
          </summary>
          <div class="payment-group-content">
            <div class="table-responsive">
              <table class="survey-table">
                <thead>
                  <tr>
                    <th>Business Name</th>
                    <th>Vendor Name</th>
                    <th>Stall Number</th>
                    <th>Payment Period</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    vendors.length > 0
                      ? vendors
                          .map((vendor) => {
                            const paymentInfo = getPaymentStatusInfo(vendor);
                            return `
                              <tr>
                                <td>${vendor.businessName}</td>
                                <td>${vendor.firstName} ${vendor.lastName}</td>
                                <td>${vendor.stallNumber}</td>
                                <td>${getPaymentPeriodByStallNumber(vendor.stallNumber)}</td>
                                <td>
                                  <span class="${getPaymentStatusClass(paymentInfo.key)}">${paymentInfo.label}</span>
                                  <div class="payment-note">${paymentInfo.note}</div>
                                </td>
                              </tr>
                            `;
                          })
                          .join("")
                      : `<tr><td colspan="5">No vendors in this category.</td></tr>`
                  }
                </tbody>
              </table>
            </div>
          </div>
        </details>
      `;
    })
    .join("");
}

function populateExportPreview() {
  const datasetSelect = document.getElementById("export-dataset");
  const marketTypeSelect = document.getElementById("export-market-type");
  const meta = document.getElementById("export-preview-meta");
  const tbody = document.getElementById("export-preview-body");
  const previewButton = document.getElementById("preview-export");

  if (!datasetSelect || !marketTypeSelect || !meta || !tbody) return;

  const renderPreview = function () {
    const selectedDataset = datasetSelect.value;
    const selectedMarketType = marketTypeSelect.value;
    const vendors = getFilteredExportVendors(selectedDataset, selectedMarketType);

    const datasetLabelMap = {
      all: "All Vendors",
      "permit-alerts": "Permit Alerts",
      "payment-alerts": "Unpaid / Partially Paid",
      overdue: "Overdue / Delinquent",
      "association-members": "Association Members",
    };

    const datasetLabel = datasetLabelMap[selectedDataset] || "Custom Selection";
    const marketLabel =
      selectedMarketType === "all" ? "All Market Types" : getMarketTypeLabel(selectedMarketType);

    meta.textContent = `Previewing ${vendors.length} row(s) for ${datasetLabel} filtered by ${marketLabel}.`;

    tbody.innerHTML =
      vendors.length > 0
        ? vendors
            .map((vendor) => {
              const paymentInfo = getPaymentStatusInfo(vendor);
              const permitInfo = getPermitReviewInfo(vendor);
              const primaryMarketType = getMarketTypeLabel(vendor.marketTypes[0]);

              return `
                <tr>
                  <td>${vendor.businessName}</td>
                  <td>${vendor.firstName} ${vendor.lastName}</td>
                  <td>${vendor.stallNumber}</td>
                  <td>${primaryMarketType}</td>
                  <td><span class="${getPaymentStatusClass(paymentInfo.key)}">${paymentInfo.label}</span></td>
                  <td><span class="${permitInfo.className}">${permitInfo.label}</span></td>
                </tr>
              `;
            })
            .join("")
        : '<tr><td colspan="6">No matching rows for the selected export filter.</td></tr>';
  };

  renderPreview();

  if (previewButton) {
    previewButton.addEventListener("click", renderPreview);
  }
}

function setupScrollToTopButton() {
  const scrollToTopButton = document.getElementById("scroll-to-top");

  if (!scrollToTopButton || !document.getElementById("admin-dashboard")) {
    return;
  }

  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Initialize admin page on document load
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on admin page
  if (document.getElementById("admin-dashboard")) {
    populateDashboardSummary();
    populateRecentSubmissions();
    populateProductSourceTracking();
    populatePaymentSummarySection();
    populateAssociationTracking();
    populatePermitExpirationTracking();
    populateExportPreview();
    setupScrollToTopButton();

    // Setup "Toggle All Market Types" button
    const toggleAllBtn = document.getElementById("toggle-all-markets");
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener("click", function () {
        const sections = document.querySelectorAll(".market-type-section");
        const allOpen = Array.from(sections).every((s) => s.open);

        sections.forEach((section) => {
          section.open = !allOpen;
        });
      });
    }
  }
});
