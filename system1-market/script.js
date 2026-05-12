console.log("Script launched successfully.");

var vendorForm = document.getElementById("vendorForm");
var clearBtn = document.getElementById("clearBtn");

var otherMarketCheckbox = document.querySelector('input[name="mkt-type"][value="other"]');
var otherMarketTypeInput = document.getElementById("other-market-type");
var otherMarketTypeGroup = document.getElementById("other-market-group");

function updateOtherMarketField() {
  if (otherMarketCheckbox.checked == true) {
    otherMarketTypeGroup.classList.remove("hidden-field");
  } else {
    otherMarketTypeGroup.classList.add("hidden-field");
    otherMarketTypeInput.value = "";
  }
}

otherMarketCheckbox.addEventListener("change", updateOtherMarketField);
updateOtherMarketField();

vendorForm.onsubmit = function (e) {
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

  var market = document.getElementsByName("mkt-type");
  var marketChecked = false;

  for (var i = 0; i < market.length; i++) {
    if (market[i].checked) {
      marketChecked = true;
    }
  }

  if (marketChecked == false) {
    alert("Please select at least one market type.");
    e.preventDefault();
    return;
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
};

var memberRadios = document.getElementsByName("member");

var assocNameGroup = document.getElementById("assoc-name-group");
var assocPosGroup = document.getElementById("assoc-pos-group");

var assocNameInput = document.getElementById("assoc-name");
var assocPosInput = document.getElementById("assoc-pos");

function updateAssocFields() {
  var selected = document.querySelector('input[name="member"]:checked');

  if (selected && selected.value == "yes") {
    assocNameGroup.classList.remove("hidden-field");
    assocPosGroup.classList.remove("hidden-field");
  } else {
    assocNameGroup.classList.add("hidden-field");
    assocPosGroup.classList.add("hidden-field");

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

  updateOtherMarketField();
  updateAssocFields();
}

clearBtn.addEventListener("click", clearAllValues);
