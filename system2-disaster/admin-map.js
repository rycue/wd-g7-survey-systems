const residents = [
  {
    id: 1,
    name: "Maria Santos",
    address: "123 Main St, Purok 1",
    zone: "safe",
    hasKit: true,
    hasEvacPlan: true,
    hasContacts: true,
    kitItems: 4,
    x: 200,
    y: 150,
    complianceScore: 90,
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    address: "456 Oak Ave, Purok 2",
    zone: "medium",
    hasKit: true,
    hasEvacPlan: false,
    hasContacts: true,
    kitItems: 3,
    x: 450,
    y: 200,
    complianceScore: 65,
  },
  {
    id: 3,
    name: "Rosa Garcia",
    address: "789 Pine Rd, Purok 3",
    zone: "fire",
    hasKit: false,
    hasEvacPlan: false,
    hasContacts: false,
    kitItems: 0,
    x: 650,
    y: 300,
    complianceScore: 25,
  },
  {
    id: 4,
    name: "Carlos Reyes",
    address: "321 Elm St, Purok 4",
    zone: "safe",
    hasKit: true,
    hasEvacPlan: true,
    hasContacts: true,
    kitItems: 5,
    x: 150,
    y: 450,
    complianceScore: 95,
  },
  {
    id: 5,
    name: "Ana Lopez",
    address: "654 Maple Dr, Purok 2",
    zone: "flood",
    hasKit: false,
    hasEvacPlan: true,
    hasContacts: false,
    kitItems: 1,
    x: 550,
    y: 550,
    complianceScore: 40,
  },
  {
    id: 6,
    name: "Pedro Gonzales",
    address: "987 Cedar Ln, Purok 5",
    zone: "medium",
    hasKit: true,
    hasEvacPlan: true,
    hasContacts: true,
    kitItems: 4,
    x: 750,
    y: 200,
    complianceScore: 85,
  },
  {
    id: 7,
    name: "Isabel Rivera",
    address: "111 Birch Ct, Purok 1",
    zone: "flood",
    hasKit: false,
    hasEvacPlan: false,
    hasContacts: true,
    kitItems: 0,
    x: 300,
    y: 600,
    complianceScore: 35,
  },
  {
    id: 8,
    name: "Miguel Torres",
    address: "222 Ash Blvd, Purok 3",
    zone: "fire",
    hasKit: true,
    hasEvacPlan: false,
    hasContacts: true,
    kitItems: 2,
    x: 700,
    y: 450,
    complianceScore: 55,
  },
  {
    id: 9,
    name: "Sofia Mendez",
    address: "333 Spruce Way, Purok 4",
    zone: "safe",
    hasKit: true,
    hasEvacPlan: true,
    hasContacts: true,
    kitItems: 5,
    x: 100,
    y: 300,
    complianceScore: 92,
  },
  {
    id: 10,
    name: "Antonio Flores",
    address: "444 Willow Rd, Purok 5",
    zone: "medium",
    hasKit: false,
    hasEvacPlan: true,
    hasContacts: false,
    kitItems: 1,
    x: 800,
    y: 650,
    complianceScore: 50,
  },
];

// Zone definitions
const zones = [
  {
    id: "flood",
    name: "High Flood Risk",
    color: "#ffb3b3",
    x: 400,
    y: 450,
    width: 300,
    height: 250,
  },
  {
    id: "fire",
    name: "Fire Risk",
    color: "#ffd1a3",
    x: 650,
    y: 100,
    width: 280,
    height: 300,
  },
  {
    id: "medium",
    name: "Medium Risk",
    color: "#fff59d",
    x: 400,
    y: 150,
    width: 240,
    height: 250,
  },
  {
    id: "safe",
    name: "Safe Zone",
    color: "#aeeaae",
    x: 50,
    y: 50,
    width: 350,
    height: 350,
  },
];

const NS = "http://www.w3.org/2000/svg";

function createSVGElement(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

function drawBarangayMap() {
  const svg = document.getElementById("barangayMap");
  svg.innerHTML = ""; // Clear existing

  // Draw zones (background layers)
  zones.forEach((zone) => {
    const rect = createSVGElement("rect", {
      class: "zone",
      x: zone.x,
      y: zone.y,
      width: zone.width,
      height: zone.height,
      fill: zone.color,
    });
    svg.appendChild(rect);

    // Add zone label
    const label = createSVGElement("text", {
      class: "zone-label",
      x: zone.x + zone.width / 2,
      y: zone.y + zone.height / 2,
      "text-anchor": "middle",
      "dominant-baseline": "middle",
      fill: "#666",
      opacity: "0.5",
      "font-size": "22",
      "font-weight": "600",
    });
    label.textContent = zone.name;
    svg.appendChild(label);
  });

  // Draw streets
  drawStreets(svg);

  // Draw buildings
  drawBuildings(svg);

  // Draw resident markers
  residents.forEach((resident) => {
    const complianceLevel = getComplianceLevel(resident.complianceScore);
    const color =
      complianceLevel === "high"
        ? "#27ae60"
        : complianceLevel === "medium"
          ? "#f39c12"
          : "#c0392b";

    const circle = createSVGElement("circle", {
      class: "resident-marker",
      cx: resident.x,
      cy: resident.y,
      r: "14",
      fill: color,
      stroke: "white",
      "stroke-width": "2.5",
      "data-id": resident.id,
    });

    circle.addEventListener("mouseenter", (e) => showTooltip(e, resident));
    circle.addEventListener("mousemove", (e) => showTooltip(e, resident));
    circle.addEventListener("mouseleave", hideTooltip);
    circle.addEventListener("click", (e) => showTooltip(e, resident));

    svg.appendChild(circle);
  });
}

function drawStreets(svg) {
  // Horizontal streets
  const hStreets = [
    { y: 120, label: "Rizal St" },
    { y: 280, label: "Magsaysay St" },
    { y: 450, label: "Bonifacio St" },
    { y: 600, label: "Quezon Ave" },
  ];

  hStreets.forEach((street) => {
    const line = createSVGElement("line", {
      class: "street",
      x1: "0",
      y1: street.y,
      x2: "1000",
      y2: street.y,
      stroke: "#ccc",
      "stroke-width": "6",
    });
    svg.appendChild(line);

    const label = createSVGElement("text", {
      class: "street-label",
      x: "18",
      y: street.y + 18,
      transform: `rotate(-90 18 ${street.y + 18})`,
      "text-anchor": "middle",
      fill: "#666",
      "font-size": "64",
    });
    label.textContent = street.label;
    svg.appendChild(label);
  });

  // Vertical streets
  const vStreets = [
    { x: 180, label: "P. Noval St" },
    { x: 380, label: "Luna St" },
    { x: 580, label: "Guerrero St" },
    { x: 780, label: "Aguinaldo St" },
  ];

  vStreets.forEach((street) => {
    const line = createSVGElement("line", {
      class: "street",
      x1: street.x,
      y1: "0",
      x2: street.x,
      y2: "800",
      stroke: "#ccc",
      "stroke-width": "6",
    });
    svg.appendChild(line);

    const label = createSVGElement("text", {
      class: "street-label",
      x: street.x + 5,
      y: "20",
      fill: "#666",
      "font-size": "32",
    });
    label.textContent = street.label;
    svg.appendChild(label);
  });
}

function drawBuildings(svg) {
  const buildings = [
    { x: 80, y: 80, width: 60, height: 50, label: "Barangay Hall" },
    { x: 250, y: 250, width: 50, height: 40, label: "School" },
    { x: 450, y: 350, width: 55, height: 45, label: "Health Center" },
    { x: 650, y: 550, width: 50, height: 40, label: "Chapel" },
    { x: 780, y: 450, width: 45, height: 35, label: "Store" },
    { x: 100, y: 550, width: 50, height: 35, label: "Market" },
  ];

  buildings.forEach((building) => {
    const rect = createSVGElement("rect", {
      class: "building",
      x: building.x,
      y: building.y,
      width: building.width,
      height: building.height,
    });
    svg.appendChild(rect);

    const label = createSVGElement("text", {
      class: "building-label",
      x: building.x + building.width / 2,
      y: building.y + building.height / 2,
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    label.textContent = building.label;
    svg.appendChild(label);
  });
}

function getComplianceLevel(score) {
  if (score >= 80) return "high";
  if (score >= 50) return "medium";
  return "low";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatYesNo(value) {
  return value ? "Yes" : "No";
}

function getDashboardMetrics() {
  const totalResidents = residents.length;
  const totalCompliance = residents.reduce(
    (sum, resident) => sum + resident.complianceScore,
    0
  );

  const preparednessCounts = { high: 0, medium: 0, low: 0 };
  const checklistCounts = { kit: 0, evac: 0, contacts: 0 };
  const zoneCounts = { safe: 0, medium: 0, fire: 0, flood: 0 };

  residents.forEach((resident) => {
    const preparednessLevel = getComplianceLevel(resident.complianceScore);
    preparednessCounts[preparednessLevel] += 1;

    if (resident.hasKit) checklistCounts.kit += 1;
    if (resident.hasEvacPlan) checklistCounts.evac += 1;
    if (resident.hasContacts) checklistCounts.contacts += 1;

    if (zoneCounts[resident.zone] !== undefined) {
      zoneCounts[resident.zone] += 1;
    }
  });

  const priorityHouseholds = [...residents]
    .sort((a, b) => a.complianceScore - b.complianceScore)
    .slice(0, 3);

  return {
    totalResidents,
    averageCompliance: totalResidents ? totalCompliance / totalResidents : 0,
    preparednessCounts,
    checklistCounts,
    zoneCounts,
    priorityHouseholds,
  };
}

function createStatCard(title, value, note, tone) {
  return `
    <article class="stat-card ${tone}">
      <p class="stat-label">${escapeHtml(title)}</p>
      <p class="stat-value">${escapeHtml(value)}</p>
      <p class="stat-note">${escapeHtml(note)}</p>
    </article>
  `;
}

function createZoneCard(zoneName, count, total) {
  const percentage = total ? Math.round((count / total) * 100) : 0;
  return `
    <article class="zone-card">
      <p class="zone-card-label">${escapeHtml(zoneName)}</p>
      <p class="zone-card-value">${count}</p>
      <p class="zone-card-note">${percentage}% of tracked households</p>
    </article>
  `;
}

function renderDashboardStatistics() {
  const metrics = getDashboardMetrics();
  const statsGrid = document.getElementById("statsGrid");
  const zoneGrid = document.getElementById("zoneGrid");

  if (!statsGrid || !zoneGrid) {
    return;
  }

  statsGrid.innerHTML = [
    createStatCard(
      "🏠 Total Residents",
      metrics.totalResidents,
      "Households currently mapped",
      "crimson"
    ),
    createStatCard(
      "✔️ Average Compliance",
      `${metrics.averageCompliance.toFixed(1)}%`,
      "Average preparedness score",
      "gold"
    ),
    createStatCard(
      "🟢 High Preparedness",
      metrics.preparednessCounts.high,
      "Residents ready for emergencies",
      "green"
    ),
    createStatCard(
      "🟠 Medium Preparedness",
      metrics.preparednessCounts.medium,
      "Residents needing follow-up",
      "amber"
    ),
    createStatCard(
      "🔴 Low Preparedness",
      metrics.preparednessCounts.low,
      "Residents needing urgent outreach",
      "red"
    ),
    createStatCard(
      "⛑️ With Emergency Kits",
      `${metrics.checklistCounts.kit}/${metrics.totalResidents}`,
      "Households reporting kits",
      "blue"
    ),
    createStatCard(
      "🏥 With Evacuation Plans",
      `${metrics.checklistCounts.evac}/${metrics.totalResidents}`,
      "Households with evacuation plans",
      "blue"
    ),
    createStatCard(
      "📞 With Emergency Contacts",
      `${metrics.checklistCounts.contacts}/${metrics.totalResidents}`,
      "Households with contacts listed",
      "blue"
    ),
  ].join("");

  zoneGrid.innerHTML = [
    createZoneCard(
      "🛡️ Safe Zone",
      metrics.zoneCounts.safe,
      metrics.totalResidents
    ),
    createZoneCard(
      "❗ Medium Risk",
      metrics.zoneCounts.medium,
      metrics.totalResidents
    ),
    createZoneCard(
      "🔥 Fire Risk",
      metrics.zoneCounts.fire,
      metrics.totalResidents
    ),
    createZoneCard(
      "🌊 Flood Risk",
      metrics.zoneCounts.flood,
      metrics.totalResidents
    ),
  ].join("");
}

function renderPrintableReport() {
  const metrics = getDashboardMetrics();
  const reportGeneratedAt = document.getElementById("reportGeneratedAt");
  const reportSummaryGrid = document.getElementById("reportSummaryGrid");
  const priorityList = document.getElementById("priorityList");
  const reportTableBody = document.getElementById("reportTableBody");

  if (
    !reportGeneratedAt ||
    !reportSummaryGrid ||
    !priorityList ||
    !reportTableBody
  ) {
    return;
  }

  reportGeneratedAt.textContent = `Generated ${new Date().toLocaleString()}`;

  reportSummaryGrid.innerHTML = [
    createStatCard(
      "Total Residents",
      metrics.totalResidents,
      "All tracked households",
      "crimson"
    ),
    createStatCard(
      "Average Compliance",
      `${metrics.averageCompliance.toFixed(1)}%`,
      "Overall preparedness level",
      "gold"
    ),
    createStatCard(
      "Low Preparedness",
      metrics.preparednessCounts.low,
      "Priority follow-up needed",
      "red"
    ),
    createStatCard(
      "Checklist Completion",
      `${metrics.checklistCounts.kit + metrics.checklistCounts.evac + metrics.checklistCounts.contacts}/${metrics.totalResidents * 3}`,
      "Combined emergency readiness items",
      "blue"
    ),
  ].join("");

  priorityList.innerHTML = metrics.priorityHouseholds
    .map((resident) => {
      const preparednessLevel = getComplianceLevel(resident.complianceScore);
      const preparednessText =
        preparednessLevel === "high"
          ? "High"
          : preparednessLevel === "medium"
            ? "Medium"
            : "Low";

      return `
        <article class="priority-item ${preparednessLevel}">
          <div>
            <h4>${escapeHtml(resident.name)}</h4>
            <p>${escapeHtml(resident.address)}</p>
          </div>
          <div class="priority-meta">
            <span>${escapeHtml(resident.zone)} zone</span>
            <strong>${resident.complianceScore}%</strong>
            <span>${preparednessText} preparedness</span>
          </div>
        </article>
      `;
    })
    .join("");

  reportTableBody.innerHTML = residents
    .map((resident) => {
      const preparednessLevel = getComplianceLevel(resident.complianceScore);
      const preparednessText =
        preparednessLevel === "high"
          ? "High"
          : preparednessLevel === "medium"
            ? "Medium"
            : "Low";
      return `
        <tr>
          <td>${escapeHtml(resident.name)}</td>
          <td>${escapeHtml(resident.address)}</td>
          <td>${escapeHtml(resident.zone)}</td>
          <td>${resident.complianceScore}%</td>
          <td>${formatYesNo(resident.hasKit)}</td>
          <td>${formatYesNo(resident.hasEvacPlan)}</td>
          <td>${formatYesNo(resident.hasContacts)}</td>
          <td><span class="report-badge ${preparednessLevel}">${preparednessText}</span></td>
        </tr>
      `;
    })
    .join("");
}

function showTooltip(event, resident) {
  const tooltip = document.getElementById("mapTooltip");
  const complianceLevel = getComplianceLevel(resident.complianceScore);
  const complianceText =
    complianceLevel === "high"
      ? "High"
      : complianceLevel === "medium"
        ? "Medium"
        : "Low";

  tooltip.innerHTML = `
    <h4>${resident.name}</h4>
    <p><strong>Address:</strong> ${resident.address}</p>
    <p><strong>Zone:</strong> ${resident.zone.charAt(0).toUpperCase() + resident.zone.slice(1)}</p>
    <p><strong>Compliance Score:</strong> ${resident.complianceScore}%</p>
    <div class="compliance-status ${complianceLevel}">${complianceText} Preparedness</div>
    <p style="margin-top: 0.5rem; font-size: 0.85rem;"><strong>Status:</strong></p>
    <p style="font-size: 0.85rem;">
      🎒 Emergency Kit: ${resident.hasKit ? "✓ Yes" : "✗ No"}<br/>
      📍 Evacuation Plan: ${resident.hasEvacPlan ? "✓ Yes" : "✗ No"}<br/>
      📞 Emergency Contacts: ${resident.hasContacts ? "✓ Yes" : "✗ No"}
    </p>
  `;

  tooltip.style.display = "block";

  const padding = 16;
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x = event.clientX + padding;
  let y = event.clientY + padding;

  if (x + tooltipWidth > viewportWidth - padding) {
    x = event.clientX - tooltipWidth - padding;
  }

  if (y + tooltipHeight > viewportHeight - padding) {
    y = event.clientY - tooltipHeight - padding;
  }

  x = Math.max(padding, x);
  y = Math.max(padding, y);

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

function hideTooltip() {
  const tooltip = document.getElementById("mapTooltip");
  tooltip.style.display = "none";
}

// Zoom functionality
let currentZoom = 1.2; // Start zoomed in (2 steps from original)
const minZoom = 1.0; // Minimum zoom is now at original default level
const maxZoom = 3;
const zoomStep = 0.2;
const baseMarkerRadius = 14; // Original marker size - increased for better visibility

function applyZoom(scale) {
  const svg = document.getElementById("barangayMap");
  const wrapper = document.querySelector(".map-wrapper");
  svg.style.transform = `scale(${scale})`;
  svg.style.transformOrigin = "top left";
  wrapper.style.overflow = "auto";

  // Adjust marker sizes inversely to maintain consistent readability
  const markers = svg.querySelectorAll(".resident-marker");
  markers.forEach((marker) => {
    // Scale markers inversely: as map zooms in, markers get smaller proportionally
    const adjustedRadius = baseMarkerRadius / scale;
    marker.setAttribute("r", adjustedRadius);
  });

  document.getElementById("zoomInBtn").disabled = scale >= maxZoom;
  document.getElementById("zoomOutBtn").disabled = scale <= minZoom;
}

function zoomIn() {
  currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
  applyZoom(currentZoom);
}

function zoomOut() {
  currentZoom = Math.max(currentZoom - zoomStep, minZoom);
  applyZoom(currentZoom);
}

function resetZoom() {
  currentZoom = 1;
  applyZoom(currentZoom);
  const wrapper = document.querySelector(".map-wrapper");
  wrapper.scrollLeft = 0;
  wrapper.scrollTop = 0;
}

// Initialize map on page load
document.addEventListener("DOMContentLoaded", () => {
  drawBarangayMap();
  renderDashboardStatistics();
  renderPrintableReport();

  document.getElementById("zoomInBtn").addEventListener("click", zoomIn);
  document.getElementById("zoomOutBtn").addEventListener("click", zoomOut);
  document.getElementById("resetZoomBtn").addEventListener("click", resetZoom);

  const printReportBtn = document.getElementById("printReportBtn");
  if (printReportBtn) {
    printReportBtn.addEventListener("click", () => {
      renderPrintableReport();
      window.print();
    });
  }

  applyZoom(currentZoom);
});
