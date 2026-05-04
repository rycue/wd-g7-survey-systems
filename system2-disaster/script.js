const form = document.getElementById("surveyForm");
const toast = document.getElementById("toast");
const clearFormBtn = document.getElementById("clearFormBtn");

function showToast(msg, type = "error") {
  toast.textContent = msg;
  toast.className = "toast " + type;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

function setError(inputId, errId, show) {
  const el = document.getElementById(inputId);
  const err = document.getElementById(errId);
  if (!el || !err) return;
  err.style.display = show ? "block" : "none";
  if (show) el.classList.add("invalid");
  else el.classList.remove("invalid");
}

function setGroupError(errId, show) {
  const err = document.getElementById(errId);
  if (err) {
    err.style.display = show ? "block" : "none";

    if (show) {
      err.classList.add("group-invalid");
    } else {
      err.classList.remove("group-invalid");
    }
  }
}

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function isCheckedGroup(name) {
  return document.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
}

function allReadinessAnswered() {
  const groups = [
    "r_doc",
    "r_meet",
    "r_evac",
    "r_contacts",
    "r_map",
    "r_alert",
  ];
  return groups.every((g) =>
    document.querySelector(`input[name="${g}"]:checked`)
  );
}

function clearValidationState() {
  form
    .querySelectorAll(".invalid")
    .forEach((el) => el.classList.remove("invalid"));
  form
    .querySelectorAll(".group-invalid")
    .forEach((el) => el.classList.remove("group-invalid"));
  form.querySelectorAll(".error-msg").forEach((el) => {
    el.style.display = "none";
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // ← already there, but make sure nothing above this throws an error
  e.stopImmediatePropagation();

  let valid = true;

  // full name
  const fname = document.getElementById("fname").value.trim();
  const fnameFail = fname === "";
  setError("fname", "err-fname", fnameFail);
  if (fnameFail) valid = false;

  // contact
  const contact = document.getElementById("contact").value.trim();
  const contactFail = contact === "";
  setError("contact", "err-contact", contactFail);
  if (contactFail) valid = false;

  // Address
  const address = document.getElementById("address").value.trim();
  const addressFail = address === "";
  setError("address", "err-address", addressFail);
  if (addressFail) valid = false;

  // Email
  const email = document.getElementById("email").value.trim();
  const emailFail = email !== "" && !validateEmail(email);
  setError("email", "err-email", emailFail);
  if (emailFail) valid = false;

  // household
  const hh = document.getElementById("household").value;
  const hhFail = hh === "" || parseInt(hh) < 1;
  setError("household", "err-household", hhFail);
  if (hhFail) valid = false;

  // groups
  const compFail = !isCheckedGroup("comp");
  setGroupError("err-comp", compFail);
  if (compFail) valid = false;

  const srcFail = !isCheckedGroup("source");
  setGroupError("err-source", srcFail);
  if (srcFail) valid = false;

  const kitFail = !isCheckedGroup("kit");
  setGroupError("err-kit", kitFail);
  if (kitFail) valid = false;

  const readFail = !allReadinessAnswered();
  setGroupError("err-readiness", readFail);
  if (readFail) valid = false;

  // past experience
  const pastexp = document.getElementById("pastexp").value.trim();
  const pastFail = pastexp === "";
  setError("pastexp", "err-pastexp", pastFail);
  if (pastFail) valid = false;

  // checkboxes
  const terms = document.getElementById("terms").checked;
  document.getElementById("err-terms").style.display = terms ? "none" : "block";
  if (!terms) valid = false;

  const wasteagree = document.getElementById("wasteagree").checked;
  document.getElementById("err-waste").style.display = wasteagree
    ? "none"
    : "block";
  if (!wasteagree) valid = false;

  // 🚨 STOP if invalid — do NOT reset, just scroll to first error
  if (!valid) {
    showToast(
      "Please complete all required fields before submitting.",
      "error"
    );

    const firstInvalid = form.querySelector(".invalid, .group-invalid");
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      if (firstInvalid.focus) firstInvalid.focus();
    }
    return;
  }

  showToast("Survey submitted successfully. Thank you!", "success");
  setTimeout(() => {
    form.reset();
    clearValidationState();
  }, 1000);
});

if (clearFormBtn) {
  clearFormBtn.addEventListener("click", () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all fields? This action cannot be undone."
    );
    if (!confirmed) {
      return;
    }

    form.reset();
    clearValidationState();
    showToast("All fields have been cleared.", "success");
  });
}

// Live clearing of errors on input
form
  .querySelectorAll(
    'input[type="text"], input[type="email"], input[type="number"], textarea'
  )
  .forEach((el) => {
    el.addEventListener("input", () => el.classList.remove("invalid"));
  });
