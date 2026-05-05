console.log("Script launhed successfully.");

let vendorForm = document.getElementById("vendorForm");

// Only add vendor form validation if vendorForm exists (on market.html)
if (vendorForm) {
  vendorForm.onsubmit = function (e) {
    // Compliance and Safety: required government ID upload
    const file = document.getElementById("validId").value;
    if (file === "") {
      alert("Please upload a valid government ID.");
      e.preventDefault();
      return;
    }

    // Personal Information: age validation (must be at least 18)
    const bday = document.getElementById("birthday").value;
    if (bday !== "") {
      const birthDate = new Date(bday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());

      if (!hasHadBirthdayThisYear) {
        age -= 1;
      }

      if (age < 18) {
        alert("You must be at least 18 years old to register as a vendor.");
        e.preventDefault();
        return;
      }
    }

    // Personal Information: contact number basic format check
    const phone = document.getElementById("phone").value.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 11) {
      alert("Please enter a valid phone number.");
      e.preventDefault();
      return;
    }

    // Compliance and Safety: permit year range validation
    const permitYear = document.getElementById("permitYear").value;
    if (permitYear !== "") {
      const currentYear = new Date().getFullYear();
      const permitYearNum = Number(permitYear);
      if (permitYearNum < 2010 || permitYearNum > currentYear) {
        alert("Permit year must be between 2010 and the current year.");
        e.preventDefault();
        return;
      }
    }

    // Business and Stall Details: at least one market type must be selected
    const market = document.getElementsByName("mkt-type");
    let marketChecked = false;
    for (let i = 0; i < market.length; i++) {
      if (market[i].checked) {
        marketChecked = true;
        break;
      }
    }
    if (!marketChecked) {
      alert("Please select at least one market type.");
      e.preventDefault();
      return;
    }

    // Compliance and Safety: at least one government registration must be selected
    const govt = document.getElementsByName("gov-reg");
    let govtChecked = false;
    for (let i = 0; i < govt.length; i++) {
      if (govt[i].checked) {
        govtChecked = true;
        break;
      }
    }
    if (!govtChecked) {
      alert("Please select at least one government registration.");
      e.preventDefault();
      return;
    }

    console.log("Form validation passed. Submitting form.");
  };
}

// Administrative Office Use: Save Assignment (on admin.html)
document.addEventListener("DOMContentLoaded", function () {
  const saveAssignmentBtn = document.getElementById("save-assignment");
  if (saveAssignmentBtn) {
    saveAssignmentBtn.addEventListener("click", function () {
      const mktAssign = document.getElementById("mkt-assign").value.trim();

      // Validate that at least market assignment is filled
      if (!mktAssign) {
        alert("Please enter a Market Assignment.");
        return;
      }

      // Simulate saving - show success message
      console.log("Simulated: Assignment saved for '" + mktAssign + "'");
      alert(
        "✓ Assignment for '" + mktAssign + "' has been saved successfully!"
      );
    });
  }

  // Administrative Office Use: Clear Form (on admin.html)
  const clearAssignmentBtn = document.getElementById("clear-assignment");
  if (clearAssignmentBtn) {
    clearAssignmentBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to clear this form?")) {
        document.getElementById("mkt-assign").value = "";
        document.getElementById("stall-area").value = "";
        document.getElementById("rental-rate").value = "";
        document.getElementById("location-desc").value = "";
        document.getElementById("pay-status").value = "unpaid";
        document.getElementById("pay-period").value = "monthly";
        console.log("Assignment form cleared.");
        alert("✓ Form has been cleared.");
      }
    });
  }

  // Export to Excel: Simulated (on admin.html)
  const exportBtn = document.querySelector(".export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      console.log("Simulated: Exporting vendor data to Excel");
      alert(
        "✓ Data has been exported to Excel successfully!\n(Simulated - No actual file created)"
      );
    });
  }
});
