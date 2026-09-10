const MEETING_DUE_THRESHOLDS = {
  devotee: {
    green: 10,
    yellow: 5,
  },

  student: {
    green: 5,
    yellow: 2,
  },
};

async function openSpiritualFriendsWindow() {
  console.log("selectedFacilitator", selectedFacilitator);
  const response = await CALL_API("GET_SPIRITUAL_FRIENDS", {
    name: selectedFacilitator.name,
  });

  if (response?.status == "success" && response.data) {
    if (typeof response.data === "string") {
      SHOW_ERROR_POPUP(`${response.data}`);
      return;
    }
    const devotees = response.data.devotees || [];
    const students = response.data.students || [];
    renderAssociatedPeople(devotees, students);
    SHOW_SPECIFIC_DIV("myFriendsPopup");
  } else {
    SHOW_ERROR_POPUP("Error Fetching Spiritual Friend data!!");
  }
}

function renderAssociatedPeople(devotees = [], students = []) {
  devotees.sort((a, b) => a.dueDays - b.dueDays);

  students.sort((a, b) => a.dueDays - b.dueDays);
  renderDevoteeTable(devotees);

  renderStudentTable(students);
}

function renderDevoteeTable(devotees = []) {
  const container = document.getElementById("devoteeTableContainer");

  const count = document.getElementById("devoteeCount");

  count.textContent = devotees.length;

  container.innerHTML = "";

  if (!Array.isArray(devotees) || devotees.length === 0) {
    container.innerHTML = `
      <div class="no-people-message">
        No devotee spiritual friends associated with you.
      </div>
    `;

    return;
  }

  const table = document.createElement("table");

  table.className = "people-table";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Last Meeting Date</th>
        <th>Meeting Due In (Days)</th>
        <th>Exception Update Date</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  devotees.forEach((devotee) => {
    const dueClass = getMeetingDueClass("devotee", devotee.dueDays);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="person-name">
        ${devotee.name || "-"}
      </td>

      <td class="person-name">
        ${devotee.category || "-"}
      </td>

      <td>
        ${formatDateFriends(devotee.lastMeetingDate)}
      </td>

      <td class="${dueClass}">
        ${`${devotee.dueDays}`}
      </td>

      <td>
        ${formatDateFriends(devotee.exceptionUpdateDate)}
      </td>

      <td class="person-actions">

        <button
          class="people-action-btn view-btn"
          onclick="" disabled>
          View Details
        </button>

        <button
          class="people-action-btn meet-btn"
          onclick="meetPersonNow('devotee', '${devotee.id}', '${devotee.name.split("\n")[0]}')">
          Meet Now
        </button>

        <button
          class="people-action-btn history-btn"
          onclick="" disabled>
          Meeting History
        </button>

      </td>
    `;

    tbody.appendChild(row);
  });

  container.appendChild(table);
}

function renderStudentTable(students = []) {
  const container = document.getElementById("studentTableContainer");

  const count = document.getElementById("studentCount");

  count.textContent = students.length;

  container.innerHTML = "";

  if (!Array.isArray(students) || students.length === 0) {
    container.innerHTML = `
      <div class="no-people-message">
        No students spiritual friends associated with you.
      </div>
    `;

    return;
  }

  const table = document.createElement("table");

  table.className = "people-table";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Last Weekly Meeting Date</th>
        <th>Weekly Meeting Due In (Days)</th>
        <th>Last Meeting Date</th>
        <th>Meeting Due In (Days)</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  students.forEach((student) => {
    const dueClass = getMeetingDueClass("student", student.dueDays);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="person-name">
        ${student.name || "-"}
      </td>

      <td class="person-name">
        ${student.category || "-"}
      </td>

      <td>
        ${formatDateFriends(student.lastWeeklyMeetingDate)}
      </td>

      <td class="${dueClass}">
          ${student.weeklyDueDays} 
    </td>

      <td>
        ${formatDateFriends(student.lastMeetingDate)}
      </td>

      <td class="${dueClass}">
          ${student.dueDays} 
    </td>

      <td class="person-actions">

        <button
          class="people-action-btn view-btn"
          onclick="viewPersonDetails('student', '${student.id}', '${student.name.split("\n")[0]}')" disabled>
          View Details
        </button>

        <button
          class="people-action-btn meet-btn"
          onclick="meetPersonNow('student', '${student.id}', '${student.name.split("\n")[0]}')">
          General Meeting
        </button>

        <button
            type="button"
            class="people-action-btn weekly-btn"
            onclick="weeklyMeetingNow('${student.id}', '${student.name.split("\n")[0]}')" disabled
            >
            Weekly Meeting
        </button>

        <button
          class="people-action-btn history-btn"
          onclick="viewMeetingHistory('student', '${student.id}')" disabled>
          Meeting History
        </button>

      </td>
    `;

    tbody.appendChild(row);
  });

  container.appendChild(table);
}

function getMeetingDueClass(type, dueDays) {
  const thresholds = MEETING_DUE_THRESHOLDS[type];

  if (!thresholds || dueDays == null) {
    return "meeting-due-red";
  }

  if (dueDays > thresholds.green) {
    return "meeting-due-green";
  }

  if (dueDays > thresholds.yellow) {
    return "meeting-due-yellow";
  }

  return "meeting-due-red";
}

function formatDateFriends(dateValue) {
  if (!dateValue) {
    return "-";
  }

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
