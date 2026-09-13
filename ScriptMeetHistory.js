let meetingHistoryData = [];
let meetingHistoryPerson = null;
let meetingHistoryPersonType = null;

async function openMeetingHistory(
  personType,
  personName,
  personSystemName,
  personId,
) {
  meetingHistoryPerson = {
    name: personName,
    systemName: personSystemName,
    id: personId,
  };
  meetingHistoryPersonType = personType;

  const heading = document.getElementById("meetingHistoryHeader");
  const heading2 = document.getElementById("meetingHistoryHeader2");

  if (heading) {
    heading.innerText = `Meeting History - ${meetingHistoryPerson.name}`;
  }

  heading2.innerText = `Meeting History - ${meetingHistoryPerson.name}`;

  const response = await CALL_API("GET_MEETING_HISTORY", {
    systemName: personSystemName,
    personType: personType,
  });

  if (response?.status !== "success" || !response.data) {
    SHOW_ERROR_POPUP(
      "Error fetching meeting history.\n\n" +
        (response?.error || "Unknown error"),
    );
    return;
  }

  renderMeetingHistory(personType, response.data);

  const meetNowButton = document.getElementById("meetingHistoryMeetNowBtn");

  if (meetNowButton) {
    meetNowButton.onclick = () => {
      meetPersonNow(
        personType,
        personId,
        personName.split("\n")[0],
        personSystemName,
      );
    };
  }

  SHOW_SPECIFIC_DIV("meetingHistoryPopup");
}

function renderMeetingHistory(personType, historyData) {
  const container = document.getElementById("meetingHistoryContainer");

  container.innerHTML = "";

  Object.entries(historyData).forEach(([meetingGroup, meetings]) => {
    meetings = meetings || [];

    // Convert API key to config meeting type
    const meetingType =
      meetingGroup === "Weekly Meetings"
        ? "weekly"
        : meetingGroup === "Monthly Meetings"
          ? "monthly"
          : null;

    if (!meetingType) {
      return;
    }

    // =====================================================
    // CREATE ASSOCIATED SECTION
    // =====================================================

    const section = document.createElement("div");

    section.className = "associated-section";

    // =====================================================
    // SECTION HEADER
    // =====================================================

    const sectionHeader = document.createElement("div");

    sectionHeader.className = "associated-section-header";

    const heading = document.createElement("h3");

    heading.textContent = meetingGroup;

    const count = document.createElement("span");

    count.className = "people-count";

    count.textContent = meetings.length;

    sectionHeader.appendChild(heading);
    sectionHeader.appendChild(count);

    // =====================================================
    // TABLE CONTAINER
    // =====================================================

    const tableContainer = document.createElement("div");

    tableContainer.className = "people-table-container";

    // =====================================================
    // NO MEETINGS
    // =====================================================

    if (meetings.length === 0) {
      const noMeetings = document.createElement("div");

      noMeetings.className = "no-people-message";

      noMeetings.textContent = `No ${meetingType} Meetings found`;

      tableContainer.appendChild(noMeetings);
    } else {
      // ===================================================
      // SORT - NEWEST FIRST
      // ===================================================

      const sortedMeetings = [...meetings].sort((a, b) =>
        (b.meetingDate || "").localeCompare(a.meetingDate || ""),
      );

      // ===================================================
      // CREATE TABLE
      // ===================================================

      const table = document.createElement("table");

      table.className = "people-table";

      table.innerHTML = `
          <thead>
            <tr>
              <th>Date</th>
              <th>Place</th>
              <th>Facilitator</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody></tbody>
        `;

      const tbody = table.querySelector("tbody");

      // ===================================================
      // POPULATE TABLE
      // ===================================================

      sortedMeetings.forEach((meeting) => {
        const groupedSections = groupHistorySections(
          personType,
          meetingType,
          meeting.sections || {},
        );

        // Store grouped data for details view
        meeting.groupedSections = groupedSections;

        const row = document.createElement("tr");

        const feedback = meeting.sections?.["Please give your comments"] || "-";

        row.innerHTML = `
    <td class="person-name">
      ${formatMeetingDate(meeting.meetingDate)}
    </td>

    <td class="person-name">
      ${meeting.place || "-"}
    </td>

    <td class="person-name">
      ${meeting.facilitator || "-"}
    </td>

    <td class="feedback-column">
  <div class="history-feedback-wrapper">

    <div class="history-feedback-text">
      ${feedback}
    </div>

    <button
      type="button"
      class="history-feedback-toggle"
      aria-label="Expand feedback">
      ▼
    </button>

  </div>
</td>
    </td>

    <td class="person-actions">
      <button
        class="people-action-btn view-btn-history"
        type="button">
        View
      </button>
    </td>
  `;

        const feedbackWrapper = row.querySelector(".history-feedback-wrapper");

        const feedbackText = row.querySelector(".history-feedback-text");

        const feedbackToggle = row.querySelector(".history-feedback-toggle");

        requestAnimationFrame(() => {
          if (feedbackText.scrollHeight > feedbackText.clientHeight + 1) {
            feedbackToggle.classList.add("show");
          }
        });

        feedbackToggle.onclick = () => {
          const expanded = feedbackWrapper.classList.toggle("expanded");

          feedbackToggle.textContent = expanded ? "▲" : "▼";
        };

        // =====================================================
        // VIEW MEETING
        // =====================================================

        row.querySelector(".view-btn-history").onclick = () => {
          showMeetingDetails(personType, meetingType, meeting);
        };

        tbody.appendChild(row);
      });

      tableContainer.appendChild(table);
    }

    // =====================================================
    // BUILD SECTION
    // =====================================================

    section.appendChild(sectionHeader);
    section.appendChild(tableContainer);

    container.appendChild(section);
  });
}

function showMeetingDetails(personType, meetingType, meeting) {
  const container = document.getElementById("meetingDetailsContainer");

  if (!container) {
    console.error("meetingDetailsContainer not found.");
    return;
  }

  container.innerHTML = "";

  // =====================================================
  // MEETING INFORMATION
  // =====================================================

  const infoDiv = document.createElement("div");

  infoDiv.className = "meeting-details-info";

  infoDiv.innerHTML = `
    <div>
      <strong>Date: </strong>
      ${formatMeetingDate(meeting.meetingDate)}
    </div>

    <div>
      <strong>Meeting Type: </strong>
      ${meeting.meetingType || meetingType}
    </div>

    <div>
      <strong>Place: </strong>
      ${meeting.place || "-"}
    </div>

    <div>
      <strong>Facilitator: </strong>
      ${meeting.facilitator || "-"}
    </div>
  `;

  container.appendChild(infoDiv);

  // =====================================================
  // SECTIONS
  // =====================================================

  const groupedSections =
    meeting.groupedSections ||
    groupHistorySections(personType, meetingType, meeting.sections || {});

  Object.entries(groupedSections).forEach(
    ([sectionTitle, fields], sectionIndex) => {
      const accordionItem = document.createElement("div");

      accordionItem.className = "accordion-item";

      // ===================================================
      // HEADER
      // ===================================================

      const header = document.createElement("button");

      header.type = "button";
      header.className = "accordion-header";

      header.innerHTML = `
        ${sectionTitle}
        <span class="icon">▶</span>
      `;

      // ===================================================
      // CONTENT
      // ===================================================

      const content = document.createElement("div");

      content.className = "accordion-content";

      Object.entries(fields).forEach(([fieldName, answer]) => {
        const fieldDiv = document.createElement("div");

        fieldDiv.className = "meeting-detail-field";

        const fieldHeading = document.createElement("div");

        fieldHeading.className = "meeting-detail-field-heading";

        fieldHeading.textContent = fieldName;

        const answerDiv = document.createElement("div");

        answerDiv.className = "meeting-detail-answer";

        answerDiv.textContent = answer || "-";

        fieldDiv.appendChild(fieldHeading);

        fieldDiv.appendChild(answerDiv);

        content.appendChild(fieldDiv);
      });

      // ===================================================
      // ACCORDION CLICK
      // ===================================================

      header.addEventListener("click", () => {
        const isOpen = header.classList.contains("active");

        // Close all accordions
        container
          .querySelectorAll(".accordion-header")
          .forEach((otherHeader) => {
            otherHeader.classList.remove("active");

            otherHeader.nextElementSibling?.classList.remove("show");
          });

        // Open clicked accordion
        if (!isOpen) {
          header.classList.add("active");

          content.classList.add("show");
        }
      });

      accordionItem.appendChild(header);
      accordionItem.appendChild(content);

      container.appendChild(accordionItem);
    },
  );

  // =====================================================
  // OPEN FIRST ACCORDION
  // =====================================================

  const firstHeader = container.querySelector(".accordion-header");

  if (firstHeader) {
    firstHeader.classList.add("active");

    firstHeader.nextElementSibling?.classList.add("show");
  }

  // =====================================================
  // OPEN DETAILS POPUP/DIV
  // =====================================================

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

function getSectionTitleFromFieldKey(personType, meetingType, fieldKey) {
  const config = meetingFormConfig[personType]?.[meetingType];

  if (!config) {
    return fieldKey;
  }

  for (const section of config.sections) {
    for (const field of section.fields) {
      // Field may contain <br/><br/>
      // so only take the first part
      const fieldName = field.split("<br/><br/>")[0].trim();

      if (fieldName === fieldKey) {
        return section.title;
      }
    }
  }

  // No matching field found
  return fieldKey;
}

function groupHistorySections(personType, meetingType, sections) {
  const grouped = {};

  Object.entries(sections).forEach(([fieldKey, answer]) => {
    const sectionTitle = getSectionTitleFromFieldKey(
      personType,
      meetingType,
      fieldKey,
    );

    if (!grouped[sectionTitle]) {
      grouped[sectionTitle] = {};
    }

    grouped[sectionTitle][fieldKey] = answer;
  });

  return grouped;
}

function formatMeetingDate(dateString) {
  if (!dateString) return "-";

  const [year, month, day] = dateString.split("/");

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
