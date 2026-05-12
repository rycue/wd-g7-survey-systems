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
    marketTypes: ["sari-sari", "dry"],
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
];

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
  const types = new Set();
  vendorDatabase.forEach((vendor) => {
    vendor.marketTypes.forEach((type) => types.add(type));
  });
  return Array.from(types).sort();
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

    row.innerHTML = `
      <td>${vendor.businessName}</td>
      <td>${vendor.marketTypes.join(", ")}</td>
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
      <span class="market-type-title">${capitalizeMarketType(marketType)}</span>
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

    const membershipStatus = vendor.associationMembership ? "✓ Yes" : "No";
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
    const statusA = a.permitNumber === "PENDING" ? "pending" : getPermitStatus(a.permitYear);
    const statusB = b.permitNumber === "PENDING" ? "pending" : getPermitStatus(b.permitYear);

    const statusOrder = { pending: 0, expired: 1, "expiring-soon": 2, active: 3 };
    return statusOrder[statusA] - statusOrder[statusB];
  });

  tbody.innerHTML = "";

  sortedVendors.forEach((vendor) => {
    const row = document.createElement("tr");

    const permitStatus =
      vendor.permitNumber === "PENDING" ? "pending" : getPermitStatus(vendor.permitYear);
    let statusBadgeClass = "status-success";
    let statusBadgeText = "Active";

    if (permitStatus === "pending" || vendor.permitNumber === "PENDING") {
      statusBadgeClass = "status-error";
      statusBadgeText = "PENDING";
    } else if (permitStatus === "expired") {
      statusBadgeClass = "status-error";
      statusBadgeText = "Expired";
    } else if (permitStatus === "expiring-soon") {
      statusBadgeClass = "status-warning";
      statusBadgeText = "Expiring Soon";
    }

    const permitYear = vendor.permitYear || "—";

    row.innerHTML = `
      <td>${vendor.businessName}</td>
      <td>${vendor.stallNumber}</td>
      <td>${vendor.permitNumber}</td>
      <td>${permitYear}</td>
      <td><span class="${statusBadgeClass}">${statusBadgeText}</span></td>
    `;

    tbody.appendChild(row);
  });
}

// Helper function: Capitalize market type
function capitalizeMarketType(type) {
  const typeMap = {
    wet: "Wet Market",
    dry: "Dry Goods",
    produce: "Produce",
    "sari-sari": "Sari-Sari Store",
    "food-service": "Food Service",
    other: "Other",
  };
  return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

// Initialize admin page on document load
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on admin page
  if (document.getElementById("admin-dashboard")) {
    populateRecentSubmissions();
    populateProductSourceTracking();
    populateAssociationTracking();
    populatePermitExpirationTracking();

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
