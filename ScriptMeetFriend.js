const meetingFormConfig = {
  devotee: {
    meetingPlace: {
      label: "Place of Meeting",
      options: ["My Home", "Spiritual Friend's Home", "Online"],
    },
    sections: [
      {
        title: "Meeting Place",
        fields: [
          "ग्रन्थ पठन (Book Reading)<br/><br/>आप श्रील प्रभुपद की कौनसी पुस्तक पढ़ रहे हैं? (Which book of Srila Prabhupada you are reading?)",
          "श्रवण (Hearing)<br/><br/>आप कौन से प्रवचन सुन रहे हैं? (Which lectures are you listening?)",
          "जप की गुणवत्ता (Chanting Quality)<br/><br/>क्या आपका जप सुबह 9 बजे से पहले हो जाता है? क्या आप एक जगह बैठ कर जप करते हैं? क्या आपको जप में झपकी आती है? (Are you able to complete chanting before 9 AM? Are you able to complete chanting sitting at one place? Do you feel sleepy while chanting?)",
        ],
      },
      {
        title: "साधना (Sadhna)",
        fields: [
          "ग्रन्थ पठन (Book Reading)<br/><br/>आप श्रील प्रभुपद की कौनसी पुस्तक पढ़ रहे हैं? (Which book of Srila Prabhupada you are reading?)",
          "श्रवण (Hearing)<br/><br/>आप कौन से प्रवचन सुन रहे हैं? (Which lectures are you listening?)",
          "जप की गुणवत्ता (Chanting Quality)<br/><br/>क्या आपका जप सुबह 9 बजे से पहले हो जाता है? क्या आप एक जगह बैठ कर जप करते हैं? क्या आपको जप में झपकी आती है? (Are you able to complete chanting before 9 AM? Are you able to complete chanting sitting at one place? Do you feel sleepy while chanting?)",
        ],
      },
      {
        title: "सेवा (Sewa)",
        fields: [
          "नियमित सेवा (Regular Sewa)<br/><br/>क्या आपके पास नियमित सेवा है? कृपया अपनी सेवा के बारे में बताएं (Do you have Regular service? Please mention which service you are doing)",
          "सेवा से संतुष्टि (Satisfaction with service)<br/><br/>क्या आप अपनी सेवा से संतुष्ट हैं या उसे बदलना चाहते हैं? (Are you feeling happy and motivated doing service - Do you want to change your service)",
          "सेवा प्रभंधक (Sewa Coordinator)<br/><br/>क्या आपका सेवा प्रबंधक से निरंतर संपर्क होता है या कोई समस्या आ रही है? (Do you have regular discussions with service coordinator and any problems in dealing with them)",
        ],
      },
      {
        title: "अनुभूति (Realisation)",
        fields: [
          "कृतज्ञता (Gratitude)<br/><br/>क्या आप कुछ ऐसा बताना चाहते जो यहाँ आपको अच्छा लगा हो या दिल को छुआ हो? Do you want to share anything which has touched your heart?",
          "अनर्थ निवृत्ति में संघर्ष (Challenges in Dealing with Anarthas)<br/><br/>क्या आपको इन्द्रियों को नियंत्रित करने में या वेगों(जिह्वा, उदर, उपस्थ, वाचो, मन तथा क्रोध) को नियंत्रित करने में कोई संघर्ष महसूस होता है (Do you face any challenge in controlling any of your senses or vega (jihva, udar, upasth, vacho, mansa, krodh))",
        ],
      },
      {
        title: "भक्तों से सम्बन्ध (Relationship with devotees)",
        fields: [
          "भक्तों से मधुर सम्बन्ध (Good Relationship with devotees)<br/><br/>किन भक्त के साथ आपका मधुर सम्बन्ध है? उनके नाम बताइये और इस सम्बन्ध को बनाये रखने के लिए आप क्या करेंगे? (With whom do you have good relationship and what are you doing to maintain it )",
          "सम्बन्ध में सुधार (Where Relationship can be Better)<br/><br/>किन भक्तों से सम्बन्ध सुधर सकते हैं? उनके नाम बताईये | आप सम्बन्ध सुधारने के लिए क्या करेंगे, बताइये (With whom you do not have a good relationship and what will/can you do to make it better)",
        ],
      },
      {
        title: "समूह में सुधार के विषय (Observations and Suggestions)",
        fields: [
          "क्या समूह में सुधारने के लिए आपका कोई सुझाव है (Any improvement area in congregation or anything which is not right)",
          "कोई और अन्य विषय अथवा टिपण्णी ?(Do you have any other inputs or challenges or issues or problems)",
        ],
      },
      {
        title: "Action and Feedback",
        fields: [
          "पिछली मीटिंग में मिली टिप्पणियों पर भक्त की कार्यवाही (Devotee's actions on previous meeting inputs)",
          "अपने सुझाव लिखें (Please give your comments)",
        ],
      },
    ],
  },
  student: {
    meetingPlace: {
      label: "Place of Meeting",
      options: ["My Home", "Spiritual Friend's Home", "Gurukul Campus"],
    },
    sections: [
      {
        title: "साधना (Sadhna)",
        fields: [
          "ग्रन्थ पठन (Book Reading)<br/><br/>आप श्रील प्रभुपद की कौनसी पुस्तक पढ़ रहे हैं? (Which book of Srila Prabhupada you are reading?)",
          "श्रवण (Hearing)<br/><br/>क्या आप ध्यान से प्रवचन सुनते हैं? (Are you listening to the lectures carefully?)",
          "जप की गुणवत्ता (Chanting Quality)<br/><br/>क्या आपका जप सुबह 9 बजे से पहले हो जाता है? क्या आप एक जगह बैठ कर जप करते हैं? क्या आपको जप में झपकी आती है? (Are you able to complete chanting before 9 AM? Are you able to complete chanting sitting at one place? Do you feel sleepy while chanting?)",
        ],
      },
      {
        title: "सेवा (Sewa)",
        fields: [
          "नियमित सेवा (Regular Sewa)<br/><br/>क्या आपके पास नियमित सेवा है? कृपया अपनी सेवा के बारे में बताएं (Do you have Regular service? Please mention which service you are doing)",
          "सेवा से संतुष्टि (Satisfaction with service)<br/><br/>क्या आप अपनी सेवा से संतुष्ट हैं या उसे बदलना चाहते हैं? (Are you feeling happy and motivated doing service - Do you want to change your service)",
          "सेवा प्रभंधक (Sewa Coordinator)<br/><br/>क्या आपका सेवा प्रबंधक से निरंतर संपर्क होता है या कोई समस्या आ रही है? (Do you have regular discussions with service coordinator and any problems in dealing with them)",
        ],
      },
      {
        title: "अनुभूति (Realisation)",
        fields: [
          "कृतज्ञता (Gratitude)<br/><br/>क्या आप कुछ ऐसा बताना चाहते जो यहाँ आपको अच्छा लगा हो या दिल को छुआ हो? Do you want to share anything which has touched your heart?",
          "अनर्थ निवृत्ति में संघर्ष (Challenges in Dealing with Anarthas)<br/><br/>क्या आपको इन्द्रियों को नियंत्रित करने में या पढाई करने में, सुबह उठने में , काम इच्छाओं से सम्बंधित कोई संघर्ष महसूस होता है (Do you face any challenge in controlling any of your senses or in studies or in lustful desires or in waking up early in the morning)",
        ],
      },
      {
        title: "भक्तों से सम्बन्ध (Relationship with devotees)",
        fields: [
          "भक्तों से मधुर सम्बन्ध (Good Relationship with devotees)<br/><br/>किन भक्त या बच्चे के साथ आपका मधुर सम्बन्ध है? उनके नाम बताइये और इस सम्बन्ध को बनाये रखने के लिए आप क्या करेंगे? (With whom do you have good relationship and what are you doing to maintain it )",
          "सम्बन्ध में सुधार (Where Relationship can be Better)<br/><br/>किन भक्तों या बच्चों से सम्बन्ध सुधर सकते हैं? उनके नाम बताईये | आप सम्बन्ध सुधारने के लिए क्या करेंगे, बताइये (With whom you do not have a good relationship and what will/can you do to make it better)",
        ],
      },
      {
        title: "गुरुकुल में सुधार के विषय (Observations and Suggestions)",
        fields: [
          "क्या गुरुकुल में सुधारने के लिए आपका कोई सुझाव है (Any improvement area in gurukul or anything which is not right)",
          "कोई और अन्य विषय अथवा टिपण्णी ?(Do you have any other inputs or challenges or issues or problems)",
        ],
      },
      {
        title: "Action and Feedback",
        fields: [
          "पिछली मीटिंग में मिली टिप्पणियों पर भक्त की कार्यवाही (Devotee's actions on previous meeting inputs)",
          "अपने सुझाव लिखें (Please give your comments)",
        ],
      },
    ],
  },
};

let currentMeetingPerson = null;
let maxLength = 15; // Minimum characters required for each textarea
const meetingForm = document.getElementById("meetingForm");
const saveButton = document.getElementById("meetingSubmitBtn");

function populateMeetingForm(personType) {
  if (!meetingForm) {
    console.error("Meeting form container not found.");
    return;
  }

  // Clear previous form
  meetingForm.innerHTML = "";
  const config = meetingFormConfig[personType];

  if (!config) {
    console.error("No meeting form configuration found for:", personType);
    return;
  }

  // =========================
  // PLACE OF MEETING
  // =========================

  const placeLabel = document.createElement("label");
  placeLabel.textContent = config.meetingPlace.label;
  placeLabel.className = "required";

  meetingForm.appendChild(placeLabel);

  const placeOptions = document.createElement("div");
  placeOptions.className = "options";

  config.meetingPlace.options.forEach((option, index) => {
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.id = `meeting_place_${personType}_${index}`;
    radio.name = `meeting_place_${personType}`;
    radio.value = option;
    radio.className = "custom-radio";

    const label = document.createElement("label");

    label.htmlFor = radio.id;
    label.textContent = option;
    label.className = "custom-label-radio-content-custom-box";

    placeOptions.appendChild(radio);
    placeOptions.appendChild(label);

    radio.addEventListener("change", () => {
      const errorDiv = document.getElementById(
        `Err_meeting_place_${personType}`,
      );

      if (errorDiv) {
        errorDiv.innerHTML = "";
      }

      document
        .querySelectorAll("#meetingForm .accordion-item")
        .forEach((item) => {
          item.classList.remove("locked");
        });

      updateMeetingSubmitButton();
    });
  });

  meetingForm.appendChild(placeOptions);

  // Error message
  const placeError = document.createElement("div");
  placeError.className = "error";
  placeError.id = `Err_meeting_place_${personType}`;

  meetingForm.appendChild(placeError);

  const sections = config["sections"];

  if (!sections) {
    console.error("No meeting form configuration found for:", personType);
    return;
  }

  sections.forEach((section, sectionIndex) => {
    // -----------------------------
    // Accordion item
    // -----------------------------

    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item locked";

    // -----------------------------
    // Accordion header
    // -----------------------------

    const header = document.createElement("button");

    header.type = "button";
    header.className = "accordion-header";

    header.innerHTML = `
      ${section.title}
      <span class="icon">▶</span>
    `;

    // -----------------------------
    // Accordion content
    // -----------------------------

    const content = document.createElement("div");
    content.className = "accordion-content";

    // -----------------------------
    // Textareas
    // -----------------------------

    section.fields.forEach((field, fieldIndex) => {
      // Field heading
      const label = document.createElement("label");

      label.innerHTML = field;
      label.className = "required";

      // Textarea
      const textarea = document.createElement("textarea");

      textarea.id = `meeting_${personType}_${sectionIndex}_${fieldIndex}`;

      textarea.name = `meeting_${personType}_${sectionIndex}_${fieldIndex}`;

      textarea.rows = 3;

      textarea.placeholder = `Enter at least ${maxLength} characters...`;

      // Error div
      const errorDiv = document.createElement("div");

      errorDiv.className = "error";

      errorDiv.id = `Err_${textarea.id}`;

      // Validate whenever user edits
      textarea.addEventListener("input", () => {
        validateMeetingField(textarea);
        updateMeetingSubmitButton();
      });

      content.appendChild(label);
      content.appendChild(textarea);
      content.appendChild(errorDiv);
    });
    // -----------------------------
    // IMPORTANT: Assemble accordion
    // -----------------------------

    accordionItem.appendChild(header);
    accordionItem.appendChild(content);

    // Add accordion to meeting form
    meetingForm.appendChild(accordionItem);

    // -----------------------------
    // Accordion click
    // -----------------------------

    header.addEventListener("click", () => {
      const selectedPlace = document.querySelector(
        `#meetingForm input[name="meeting_place_${personType}"]:checked`,
      );

      const errorDiv = document.getElementById(
        `Err_meeting_place_${personType}`,
      );

      if (!selectedPlace) {
        if (errorDiv) {
          errorDiv.innerHTML = "Please select the place of meeting.";
        }

        return;
      }

      toggleMeetingSection(header);
    });
  });

  // const firstHeader = meetingForm.querySelector(".accordion-header");

  // if (firstHeader) {
  //   firstHeader.classList.add("active");
  //   firstHeader.nextElementSibling.classList.add("show");
  // }

  if (saveButton) {
    saveButton.disabled = true;
  }
}

function toggleMeetingSection(header) {
  const currentContent = header.nextElementSibling;
  const isCurrentlyOpen = currentContent.classList.contains("show");

  // Collapse all accordion sections
  document.querySelectorAll("#meetingForm .accordion-item").forEach((item) => {
    item.querySelector(".accordion-header")?.classList.remove("active");
    item.querySelector(".accordion-content")?.classList.remove("show");
  });

  // If the clicked section was closed, open it
  if (!isCurrentlyOpen) {
    header.classList.add("active");
    currentContent.classList.add("show");
  }
}

function meetPersonNow(type, personId, personName) {
  cleanMeetingForm();
  // Store current meeting person
  currentMeetingPerson = {
    type: type,
    id: personId,
    name: personName,
  };

  // Set heading
  document.getElementById("meetingHeader").innerText =
    `Meeting with ${personName}`;

  // Generate appropriate form
  populateMeetingForm(type);

  // Show meeting form
  SHOW_SPECIFIC_DIV("meetingFormContainer");
}

function cleanMeetingForm() {
  const meetingForm = document.getElementById("meetingForm");

  if (meetingForm) {
    meetingForm.innerHTML = "";
  }

  const heading = document.getElementById("meetingHeader");

  if (heading) {
    heading.innerText = "";
  }

  currentMeetingPerson = null;
}

function resetMeetingForm() {
  document.querySelectorAll("#meetingForm textarea").forEach((textarea) => {
    textarea.value = "";
  });

  // Reset Place of Meeting radio buttons
  document
    .querySelectorAll(
      '#meetingForm input[type="radio"][name^="meeting_place_"]',
    )
    .forEach((radio) => {
      radio.checked = false;
    });

  // Clear Place of Meeting error
  document.querySelectorAll('[id^="Err_meeting_place_"]').forEach((error) => {
    error.innerHTML = "";
  });

  // Reset accordion headers
  document
    .querySelectorAll("#meetingForm .accordion-header")
    .forEach((header) => {
      header.classList.remove("active");
    });

  // Close all accordion contents
  document
    .querySelectorAll("#meetingForm .accordion-content")
    .forEach((content) => {
      content.classList.remove("show");
    });

  // Lock all accordion sections again
  document.querySelectorAll("#meetingForm .accordion-item").forEach((item) => {
    item.classList.add("locked");
  });

  document.getElementById("meetingSubmitBtn").disabled = true;

  currentMeetingPerson = null;
}

function updateMeetingSubmitButton() {
  const saveButton = document.getElementById("meetingSubmitBtn");

  if (!saveButton) return;

  saveButton.disabled = !validateAllMeetingFields();
}

function validateMeetingField(textarea) {
  const errorDiv = document.getElementById("Err_" + textarea.id);

  // Convert multiple spaces to a single space
  const value = textarea.value.replace(/ {2,}/g, " ");

  const length = value.length;

  if (length === 0) {
    errorDiv.innerHTML = "Please fill in this field.";
    return false;
  }

  if (length < 15) {
    errorDiv.innerHTML = `Please enter at least 15 characters. (${length}/15)`;
    return false;
  }

  errorDiv.innerHTML = "";
  return true;
}

function validateAllMeetingFields() {
  const textareas = document.querySelectorAll("#meetingForm textarea");

  let allValid = true;

  textareas.forEach((textarea) => {
    if (!validateMeetingField(textarea)) {
      allValid = false;
    }
  });

  return allValid;
}

function getMeetingFormData() {
  if (!currentMeetingPerson) {
    return null;
  }

  const personType = currentMeetingPerson.type;
  const sections = meetingFormConfig[personType];

  if (!sections) {
    console.error("No meeting form configuration found for:", personType);
    return null;
  }

  const data = {};

  sections.forEach((section, sectionIndex) => {
    data[section.title] = {};

    section.fields.forEach((field, fieldIndex) => {
      const textarea = document.getElementById(
        `meeting_${personType}_${sectionIndex}_${fieldIndex}`,
      );

      data[section.title][field] = textarea ? textarea.value.trim() : "";
    });
  });

  return data;
}

function saveMeeting() {
  if (!currentMeetingPerson) {
    SHOW_ERROR_POPUP("No person selected.");
    return;
  }

  const meetingData = getMeetingFormData();

  console.log("Meeting person:", currentMeetingPerson);
  console.log("Meeting data:", meetingData);

  // API call here
}
