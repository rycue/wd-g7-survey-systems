# Public Market Vendor Registration & Disaster Preparedness Survey System

## Overview

This project consists of two separate but related web-based systems designed to support local government operations and community data collection:

1. Public Market Vendor Registration System
2. Disaster Preparedness Survey System

The systems aim to simulate real-world workflows used by barangays and market administrations, focusing on data collection, validation, and basic decision-support features.

<!--
---
 
## Project Structure

```
project-root/
│
├── system1-market/
│   ├── market.html
│   ├── style.css
│   ├── script.js
│
├── system2-disaster/
│   ├── disaster.html
│   ├── style.css
│   ├── script.js
│
├── docs/
│   └── documentation.md
│
├── index.html
├── style.css
└── README.md
``` -->

---

## System 1: Public Market Vendor Registration

### Purpose

To register and manage vendor information in public markets, including compliance, permits, and payment monitoring.

### Key Features

* Vendor personal and business information input
* Government registration checklist (Business Permit, TIN, Barangay, etc.)
* Sanitary permit submission (issued by Municipal Health Office)
* Waste segregation agreement (based on RA 9003)
* Payment status tracking (Paid, Unpaid, Partial)
* Payment period definition (Monthly, Quarterly)
* Permit expiration alert (simulated)
* Expandable product categories
* Vendor association tracking
* Product source tracking
* Export to Excel (simulated (?))
* Warning highlights for non-compliance

---

## System 2: Disaster Preparedness Survey

### Purpose

To assess household readiness for disasters and support barangay-level planning and response.

### Key Features

* Household demographic profiling
* Emergency kit checklist (detailed items)
* Evacuation planning inputs
* Disaster experience recording
* Risk classification (Safe, Needs Attention, High Risk)
* Alert highlights for unprepared households
* Hazard map placeholder (GIS-ready)
* Printable report (simulated)
* Survey validation for comparison with barangay records
* Optional psychological support indicator

---

## Technologies Used

* HTML
* CSS
* JavaScript
* Git and GitHub

---

## Setup Instructions

1. Clone the repository:

```
git clone https://github.com/rycue/wd-g7-survey-systems
```

2. Open the project folder

3. Run `index.html` in a browser

---

## Notes

* This project is a simulation for academic purposes
* Some features (export, alerts, maps) are implemented as placeholders
* The systems are based on real-world interviews and sample government and business forms

---

## Contributors and Development Responsibilities

| Name | Responsibilities |
| :--- | :--- |
| **Ricky Cuenza** | Initialized project repository and base structure. Implemented system features (JavaScript) and led project finalization. |
| **Amarriah Dayne Emerenciana** | Developed the System Development Core Home Page (HTML/CSS). |
| **Rhaizel Brielle Price** | Developed the HTML structure and CSS design for the Public Market Vendor Registration system. |
| **Jon Russel Lennen** | Developed the HTML structure for the Disaster Preparedness Survey system and form validation logic (JavaScript) for the Public Market Vendor Registration system. |
| **Sept CJ Vida** | Developed the CSS design and form validation logic (JavaScript) for the Disaster Preparedness Survey system. |

**Shared Responsibilities:**
* Project analysis and understanding.
* Repository collaboration using Git and GitHub.
* System testing (Inputs, UI, and Features) and overall final polishing.

---

## License

This project is for educational use only.
