console.log("Script launhed successfully.");

let vendorForm = document.getElementById("vendorForm");
let clearBtn = document.getElementById("clearBtn");

const otherMarketCheckbox = document.querySelector('input[name="mkt-type"][value="other"]');
const otherMarketTypeInput = document.getElementById("other-market-type");
const otherMarketTypeGroup = otherMarketTypeInput?.closest(".input-group");

function updateOtherMarketField() {
  if (!otherMarketCheckbox || !otherMarketTypeGroup || !otherMarketTypeInput) {
    return;
  }

  if (otherMarketCheckbox.checked) {
    otherMarketTypeGroup.classList.remove("hidden-field");
  } else {
    otherMarketTypeGroup.classList.add("hidden-field");
    otherMarketTypeInput.value = "";
  }
}

otherMarketCheckbox?.addEventListener("change", updateOtherMarketField);
updateOtherMarketField();

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
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

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

const memberRadios = document.querySelectorAll('input[name="member"]');
const assocNameGroup = document.querySelector('input[id="assoc-name"]').closest(".input-group");
const assocPosGroup = document.querySelector('input[id="assoc-pos"]').closest(".input-group");
const assocNameInput = document.getElementById("assoc-name");
const assocPosInput = document.getElementById("assoc-pos");

function updateAssocFields() {
  const isYesChecked = document.querySelector('input[name="member"]:checked')?.value === "yes";
  if (isYesChecked) {
    assocNameGroup.classList.remove("hidden-field");
    assocPosGroup.classList.remove("hidden-field");
  } else {
    assocNameGroup.classList.add("hidden-field");
    assocPosGroup.classList.add("hidden-field");
    assocNameInput.value = "";
    assocPosInput.value = "";
  }
}

memberRadios.forEach((radio) => {
  radio.addEventListener("change", updateAssocFields);
});

updateAssocFields();

function clearAllValues() {
  var ok = confirm("Are you sure you want to clear all values?");
  if (!ok) {
    return;
  }

  vendorForm.reset();
  updateOtherMarketField();
  updateAssocFields();
}

clearBtn.addEventListener("click", clearAllValues);
