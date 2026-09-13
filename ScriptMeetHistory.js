let meetingHistoryData = [];
let meetingHistoryPerson = null;
let meetingHistoryPersonType = null;

async function openMeetingHistory(
  personType,
  personName,
  personeSystemName,
  personId,
) {
  meetingHistoryPerson = {
    name: personName,
    systemName: personeSystemName,
    id: personId,
  };
  meetingHistoryPersonType = personType;

  const heading = document.getElementById("meetingHistoryHeader");

  if (heading) {
    heading.innerText = `Meeting History - ${meetingHistoryPerson.name}`;
  }

  //   const response = await CALL_API("GET_MEETING_HISTORY", {
  //     name: meetingHistoryPerson.systemName,
  //     type: meetingHistoryPersonType,
  //   });

  //   if (response?.status !== "success" || !response.data) {
  //     SHOW_ERROR_POPUP("Error fetching meeting history.");

  //     return;
  //   }

  //   meetingHistoryData = Array.isArray(response.data) ? response.data : [];

  meetingHistoryData = [];

  renderMeetingHistory(meetingHistoryData);

  const meetNowButton = document.getElementById("meetingHistoryMeetNowBtn");

  if (meetNowButton) {
    meetNowButton.onclick = () => {
      meetPersonNow(personType, personId, personName.split("\n")[0]);
    };
  }

  SHOW_SPECIFIC_DIV("meetingHistoryPopup");
}

function renderMeetingHistory(history = []) {
  const container = document.getElementById("meetingHistoryTableContainer");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML = `
      <div class="no-people-message">
        No previous meetings found.
      </div>
    `;

    return;
  }

  const table = document.createElement("table");

  table.className = "people-table meeting-history-table";

  const thead = document.createElement("thead");

  thead.innerHTML = `
    <tr>
      <th>Date</th>
      <th>Meeting Type</th>
      <th>Place</th>
      <th>Feedback</th>
      <th>Actions</th>
    </tr>
  `;

  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  history.forEach((meeting, index) => {
    const row = document.createElement("tr");

    // Date
    const dateCell = document.createElement("td");

    dateCell.textContent = meeting.meetingDate || "-";

    // Type
    const typeCell = document.createElement("td");

    typeCell.textContent = meeting.meetingType || "-";

    // Place
    const placeCell = document.createElement("td");

    placeCell.textContent = meeting.place || "-";

    // =================================================
    // FEEDBACK
    // =================================================

    const feedbackCell = document.createElement("td");

    feedbackCell.className = "meeting-feedback";

    const feedbackText = document.createElement("div");

    feedbackText.className = "feedback-text";

    feedbackText.textContent = meeting.feedback || "-";

    feedbackCell.appendChild(feedbackText);

    if (meeting.feedback && meeting.feedback.trim() !== "") {
      const expandButton = document.createElement("button");

      expandButton.type = "button";

      expandButton.className = "feedback-expand-btn";

      expandButton.innerHTML = "▼";

      expandButton.onclick = () => {
        const expanded = feedbackText.classList.toggle("expanded");

        expandButton.innerHTML = expanded ? "▲" : "▼";
      };

      feedbackCell.appendChild(expandButton);
    }

    // =================================================
    // ACTIONS
    // =================================================

    const actionsCell = document.createElement("td");

    actionsCell.className = "people-actions";

    const viewButton = document.createElement("button");

    viewButton.className = "view-btn";

    viewButton.textContent = "View";

    viewButton.onclick = () => {
      viewMeetingDetails(index);
    };

    actionsCell.appendChild(viewButton);

    // =================================================
    // ROW
    // =================================================

    row.appendChild(dateCell);
    row.appendChild(typeCell);
    row.appendChild(placeCell);
    row.appendChild(feedbackCell);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  container.appendChild(table);
}

function viewMeetingDetails(index) {
  const meeting = meetingHistoryData[index];

  if (!meeting) {
    return;
  }

  const heading = document.getElementById("meetingDetailsHeading_lbl");

  if (heading) {
    heading.innerText = `${meeting.meetingType || "Meeting"} - ${
      meeting.meetingDate || ""
    }`;
  }

  renderMeetingDetails(meeting, meetingHistoryPersonType);

  SHOW_SPECIFIC_DIV("meetingDetailsPopup");
}

function renderMeetingDetails(meeting, personType) {
  const container = document.getElementById("meetingDetailsContainer");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  // Meeting information
  const meetingInfo = document.createElement("div");

  meetingInfo.className = "meeting-info";

  meetingInfo.innerHTML = `
    <p>
      <strong>Meeting Date:</strong>
      ${meeting.meetingDate || "-"}
    </p>

    <p>
      <strong>Meeting Type:</strong>
      ${meeting.meetingType || "-"}
    </p>

    <p>
      <strong>Place:</strong>
      ${meeting.place || "-"}
    </p>
  `;

  container.appendChild(meetingInfo);

  const config = meetingFormConfig[personType];

  if (!config) {
    return;
  }

  // =====================================================
  // ACCORDIONS
  // =====================================================

  config.sections.forEach((section, sectionIndex) => {
    const item = document.createElement("div");

    item.className = "accordion-item";

    const header = document.createElement("button");

    header.type = "button";

    header.className = "accordion-header";

    header.innerHTML = `
        ${section.title}
        <span class="icon">▶</span>
      `;

    const content = document.createElement("div");

    content.className = "accordion-content";

    section.fields.forEach((field, fieldIndex) => {
      const fieldData = meeting.sections?.[sectionIndex]?.fields?.[fieldIndex];

      const fieldDiv = document.createElement("div");

      fieldDiv.className = "meeting-detail-field";

      const label = document.createElement("div");

      label.className = "meeting-detail-label";

      label.textContent = field;

      const answer = document.createElement("div");

      answer.className = "meeting-detail-answer";

      answer.textContent = fieldData?.answer || "-";

      fieldDiv.appendChild(label);
      fieldDiv.appendChild(answer);

      content.appendChild(fieldDiv);
    });

    item.appendChild(header);
    item.appendChild(content);

    container.appendChild(item);

    // Accordion behaviour
    header.addEventListener("click", () => {
      container.querySelectorAll(".accordion-header").forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.classList.remove("active");

          otherHeader.nextElementSibling.classList.remove("show");
        }
      });

      header.classList.toggle("active");

      content.classList.toggle("show");
    });
  });
}
