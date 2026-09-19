function openAddDevoteeForm() {
  resetAddDevoteeForm();
  //setupWeeklyOffLogic();
  setupAddDevoteeValidation();
  setupWhatsappSameAsMobile();
  setDOBMaxDate();

  SHOW_SPECIFIC_DIV("addDevoteePopup");
}

function setupWeeklyOffLogic() {
  const naCheckbox = document.getElementById("devoteeWeeklyOffNA");

  const dayCheckboxes = document.querySelectorAll(".weekly-off-day");

  naCheckbox.addEventListener("change", () => {
    if (naCheckbox.checked) {
      dayCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.disabled = true;
      });
    } else {
      dayCheckboxes.forEach((checkbox) => {
        checkbox.disabled = false;
      });
    }

    validateAddDevoteeForm();
  });

  dayCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        naCheckbox.checked = false;
      }

      validateAddDevoteeForm();
    });
  });
}

function validateAddDevoteeForm() {
  let valid = true;

  // Clear errors first
  document.querySelectorAll("#addDevoteeForm .error").forEach((error) => {
    error.innerHTML = "";
  });

  // =====================================================
  // FIRST NAME
  // Minimum 5 characters, no spaces
  // =====================================================

  const firstNameValid = validateMeetingField(
    document.getElementById("devoteeFirstName"),
    3,
  );

  if (!firstNameValid) {
    valid = false;
  }

  // =====================================================
  // LAST NAME
  // Minimum 5 characters, no spaces
  // =====================================================

  const lastNameValid = validateMeetingField(
    document.getElementById("devoteeLastName"),
    3,
  );

  if (!lastNameValid) {
    valid = false;
  }

  const officialNameValid = validateMeetingField(
    document.getElementById("devoteeOfficialName"),
    7,
  );

  if (!officialNameValid) {
    valid = false;
  }

  // =====================================================
  // OTHER REQUIRED TEXT FIELDS
  // =====================================================

  if (!document.getElementById("devoteeDOB").value) {
    document.getElementById("Err_devoteeDOB").innerHTML =
      "Please select Date of Birth";
    valid = false;
  } else {
    document.getElementById("Err_devoteeDOB").innerHTML = "";
  }

  const requiredFields = [
    {
      id: "devoteeProfession",
      error: "Please enter profession.",
      length: 5,
    },
    {
      id: "devoteeSkills",
      error: "Please enter skills.",
      length: 5,
    },
    {
      id: "devoteeAddress",
      error: "Please enter residence address.",
      length: 10,
    },
  ];

  requiredFields.forEach((field) => {
    const input = document.getElementById(field.id);

    if (!validateMeetingField(input, field.length)) {
      valid = false;
    }
  });

  // =====================================================
  // GENDER
  // =====================================================

  const gender = document.querySelector('input[name="devoteeGender"]:checked');

  if (!gender) {
    document.getElementById("Err_devoteeGender").innerText =
      "Please select gender.";

    valid = false;
  }

  // =====================================================
  // MOBILE
  // =====================================================

  const mobile = document.getElementById("devoteeMobile");

  if (!/^[6-9]\d{9}$/.test(mobile.value.trim())) {
    document.getElementById("Err_devoteeMobile").innerText =
      "Please enter a valid 10 digit mobile number.";

    valid = false;
  }

  // =====================================================
  // EMAIL
  // Optional, but must be valid if entered
  // =====================================================

  const emailValid = validateEmail();

  if (!emailValid) {
    valid = false;
  }

  // =====================================================
  // INITIATED NAME
  // Optional
  // =====================================================

  const initiatedNameValid = validateInitiatedName();

  if (!initiatedNameValid) {
    valid = false;
  }

  // =====================================================
  // WHATSAPP
  // =====================================================

  const whatsapp = document.getElementById("devoteeWhatsapp");

  if (!/^[6-9]\d{9}$/.test(whatsapp.value.trim())) {
    document.getElementById("Err_devoteeWhatsapp").innerText =
      "Please enter a valid 10 digit WhatsApp number.";

    valid = false;
  }

  // =====================================================
  // SUBMIT BUTTON
  // =====================================================

  const submitButton = document.getElementById("newDevoteeSubmitBtn");

  if (submitButton) {
    submitButton.disabled = !valid;
  }

  return valid;
}

function setupAddDevoteeValidation() {
  const form = document.getElementById("addDevoteeForm");

  form.querySelectorAll("input, textarea, select").forEach((element) => {
    element.addEventListener("input", validateAddDevoteeForm);

    element.addEventListener("change", validateAddDevoteeForm);
  });
}

function getNewDevoteeData() {
  const gender = document.querySelector('input[name="devoteeGender"]:checked');

  return {
    firstName: capitalizeNameWords(
      document.getElementById("devoteeFirstName").value.trim(),
    ),

    lastName: capitalizeNameWords(
      document.getElementById("devoteeLastName").value.trim(),
    ),

    initiatedName: capitalizeNameWords(
      document.getElementById("devoteeInitiatedName").value.trim(),
    ),

    officialName: capitalizeNameWords(
      document.getElementById("devoteeOfficialName").value.trim(),
    ),

    gender: gender.value == "Male" ? "M" : "F",

    mobile: document.getElementById("devoteeMobile").value.trim(),

    whatsapp: document.getElementById("devoteeWhatsapp").value.trim(),

    dateOfBirth: formatDateForAPI(document.getElementById("devoteeDOB").value),

    dateOfMarriage: formatDateForAPI(
      document.getElementById("devoteeMarriageDate").value,
    ),

    email: document.getElementById("devoteeEmail").value.trim(),

    residenceAddress: document.getElementById("devoteeAddress").value.trim(),

    profession: document.getElementById("devoteeProfession").value.trim(),

    skills: document.getElementById("devoteeSkills").value.trim(),

    facName: selectedFacilitator.name,
  };
}

function capitalizeNameWords(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function resetAddDevoteeForm() {
  document
    .querySelectorAll(
      "#addDevoteeForm input, #addDevoteeForm textarea, #addDevoteeForm select",
    )
    .forEach((element) => {
      if (element.type === "radio" || element.type === "checkbox") {
        element.checked = false;
      } else {
        element.value = "";
      }
    });

  // Reset WhatsApp field
  const whatsappInput = document.getElementById("devoteeWhatsapp");

  if (whatsappInput) {
    whatsappInput.readOnly = false;
  }

  // Enable weekly-off days
  document.querySelectorAll(".weekly-off-day").forEach((checkbox) => {
    checkbox.disabled = false;
  });

  // Clear errors
  document.querySelectorAll("#addDevoteeForm .error").forEach((error) => {
    error.innerHTML = "";
  });

  // Disable save
  const saveButton = document.getElementById("newDevoteeSubmitBtn");

  if (saveButton) {
    saveButton.disabled = true;
  }
}

async function saveNewDevotee() {
  if (!validateAddDevoteeForm()) {
    return;
  }

  const devoteeData = getNewDevoteeData();

  console.log(devoteeData);

  const response = await CALL_API("ADD_DEVOTEE", devoteeData);

  if (response?.status === "success" && response.data) {
    if (response.data.includes("Err:")) {
      SHOW_ERROR_POPUP(`${response.data.split("Err:")[1]}`);
      return;
    }
    SHOW_SUCCESS_POPUP(
      `Devotee added successfully.\n\nPassword: ${response.data.split(" - ")[0]}`,
      () => {
        resetAddDevoteeForm();
        let outMessage = `Hare Krishna Prabhuji. Dandwat Pranaam.\n\nNew devotee: ${devoteeData.firstName} ${devoteeData.lastName} ${gender == "M" ? "Prabhuji" : "Mataji"} added to database by: ${devoteeData.facName} at row: ${response.data.split(" - ")[1]}\n\nYour servant`;
        CALL_API_WITHOUT_LOADING("SEND_MESSAGE", {
          toDetail: ["9650339551", "9599021663"],
          message: outMessage,
        });
        openAddDevoteeForm();
      },
    );
  } else {
    SHOW_ERROR_POPUP("Error saving devotee data\n\n" + response.error);
  }
}

function setupWhatsappSameAsMobile() {
  const mobileInput = document.getElementById("devoteeMobile");

  const whatsappInput = document.getElementById("devoteeWhatsapp");

  const sameCheckbox = document.getElementById("devoteeWhatsappSameAsMobile");

  sameCheckbox.addEventListener("change", () => {
    if (sameCheckbox.checked) {
      // Copy mobile number
      whatsappInput.value = mobileInput.value;

      // Prevent editing
      whatsappInput.readOnly = true;
    } else {
      // Allow separate WhatsApp number
      whatsappInput.readOnly = false;

      whatsappInput.value = "";
    }

    validateAddDevoteeForm();
  });

  // If mobile number changes while checkbox is selected,
  // automatically update WhatsApp number
  mobileInput.addEventListener("input", () => {
    if (sameCheckbox.checked) {
      whatsappInput.value = mobileInput.value;
    }

    validateAddDevoteeForm();
  });
}

function validateEmail() {
  const emailInput = document.getElementById("devoteeEmail");
  const errorDiv = document.getElementById("Err_devoteeEmail");

  const email = emailInput.value.trim();

  // Email is optional
  if (!email) {
    errorDiv.innerText = "";
    return true;
  }

  // Basic email validation
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailPattern.test(email)) {
    errorDiv.innerText = "Please enter a valid email address.";
    return false;
  }

  errorDiv.innerText = "";
  return true;
}

function setupAddDevoteeValidation() {
  const form = document.getElementById("addDevoteeForm");

  form.querySelectorAll("input, textarea, select").forEach((element) => {
    element.addEventListener("input", validateAddDevoteeForm);
    element.addEventListener("change", validateAddDevoteeForm);
  });
}

function setDOBMaxDate() {
  const dobInput = document.getElementById("devoteeDOB");

  const today = new Date();
  today.setFullYear(today.getFullYear() - 10);

  const maxDate = today.toISOString().split("T")[0];

  dobInput.max = maxDate;
  document.getElementById("devoteeMarriageDate").max = maxDate;
}

function formatDateForAPI(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue + "T00:00:00");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = String(date.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
}

function validateInitiatedName() {
  const input = document.getElementById("devoteeInitiatedName");
  const errorDiv = document.getElementById("Err_devoteeInitiatedName");

  const value = input.value.trim();

  // Optional field
  if (!value) {
    errorDiv.innerText = "";
    return true;
  }

  if (value.length < 5) {
    errorDiv.innerText = `Please enter at least 5 characters. (${value.length}/5 characters)`;
    return false;
  }

  // No leading or trailing spaces
  if (input.value !== value) {
    errorDiv.innerText = "Leading or trailing spaces are not allowed.";
    return false;
  }

  // Only letters and single spaces
  if (!/^[A-Za-z]+(?: [A-Za-z]+){0,4}$/.test(value)) {
    errorDiv.innerText =
      "Enter 1 to 5 words with only one space between words.";
    return false;
  }

  // Do not allow titles/suffixes
  if (/\b(das|devi dasi|prabhuji|mataji)\b/i.test(value)) {
    errorDiv.innerText =
      "Please enter the initiated name without Das, Devi Dasi, Prabhuji or Mataji.";
    return false;
  }

  errorDiv.innerText = "";
  return true;
}
