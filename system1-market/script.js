console.log("Form submitted.");
let vendorForm = document.getElementById("vendorForm");
vendorForm.onsubmit = function (e) {
  let file = document.getElementById("validId").value;
  if (file === "") {
    alert("Please upload a valid government ID.");
    e.preventDefault();
    return;
  }
  let bday = document.getElementById("birthday").value;
  if (bday != "") {
    let byear = new Date(bday).getFullYear();
    let currentYear = new Date().getFullYear();
    if (currentYear - byear < 18) {
      alert("You must be at least 18 years old to register as a vendor.");
      e.preventDefault();
      return;
    }
    let phone = document.getElementById("phone").value;
    if (phone.length < 11) {
      alert("Please enter a valid phone number.");
      e.preventDefault();
      return;
    }
    let permitYear = document.getElementById("permitYear").value;
    if (permitYear != "") {
      let currentYear = new Date().getFullYear();
      if (permitYear < 2010 || permitYear > currentYear) {
        alert("Permit year must be between 2010 and the current year.");
        e.preventDefault();
        return;
      }
    }
    let market = document.getElementById("mkt-type");
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
    let govt = document.getElementsByName("gov-reg");
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
  }
};
