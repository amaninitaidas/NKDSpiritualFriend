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

const SCORE_THRESHOLDS = {
  devotee: {
    green: 75,
    yellow: 50,
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

  const searchDiv = document.createElement("div");
  searchDiv.className = "people-search-container";

  searchDiv.innerHTML = `
  <input
    type="text"
    id="devoteeSearch"
    class="people-search"
    placeholder="Search devotees..."
  />
`;
  container.appendChild(searchDiv);
  document
    .getElementById("devoteeSearch")
    .addEventListener("input", function () {
      filterPeopleTable("devotee");
    });

  const table = document.createElement("table");

  table.className = "people-table";
  table.id = "devoteeTable";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Overall Sadhna Score</th>
        <th>4 weeks Morning Attendance</th>
        <th>4 weeks Evening Attendance</th>
        <th>Meeting Due(Days)</th>
        <th>Exception Due(Days)</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  devotees.forEach((devotee) => {
    const dueClass = getDueClass(
      "devotee",
      devotee.dueDays,
      MEETING_DUE_THRESHOLDS,
    );
    const scoreClass = getDueClass("devotee", devotee.score, SCORE_THRESHOLDS);
    const mornClass = getDueClass(
      "devotee",
      devotee.morningAtt,
      SCORE_THRESHOLDS,
    );
    const evenClass = getDueClass(
      "devotee",
      devotee.eveningAtt,
      SCORE_THRESHOLDS,
    );
    const exceptionDueClass = getDueClass(
      "devotee",
      devotee.exceptionDueDays,
      SCORE_THRESHOLDS,
    );
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="person-name">
        ${devotee.name || "-"}
      </td>

      <td class="category-cell">
        ${devotee.category || "-"}
      </td>

      <td class="${scoreClass}">
        ${devotee.score || "-"}
      </td>

      <td class="${mornClass}">
        ${devotee.morningAtt || "-"}
      </td>

      <td class="${evenClass}">
        ${devotee.eveningAtt || "-"}
      </td>

      <td class="${dueClass}">
        ${`${devotee.dueDays}`}
      </td>

      <td class="${exceptionDueClass}">
        ${`${devotee.exceptionDueDays}`}
      </td>

      <td class="person-actions">

        <button
          class="people-action-btn meet-btn"
          onclick="" disabled>
          View Details
        </button>

        <button
          class="people-action-btn meet-btn"
          onclick="meetPersonNow('devotee', '${devotee.id}', '${devotee.name.split("\n")[0]}')">
          Meetings
        </button>

        <button
          class="people-action-btn meet-btn"
          onclick="" disabled>
          Spiritual Progress
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

  const searchDiv = document.createElement("div");
  searchDiv.className = "people-search-container";

  searchDiv.innerHTML = `
  <input
    type="text"
    id="studentSearch"
    class="people-search"
    placeholder="Search students..."
  />
`;
  container.appendChild(searchDiv);
  document
    .getElementById("studentSearch")
    .addEventListener("input", function () {
      filterPeopleTable("student");
    });

  const table = document.createElement("table");

  table.className = "people-table";
  table.id = "studentTable";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Weekly Meeting Due In (Days)</th>
        <th>Meeting Due In (Days)</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  students.forEach((student) => {
    const dueClass = getDueClass(
      "student",
      student.dueDays,
      MEETING_DUE_THRESHOLDS,
    );
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="person-name">
        ${student.name || "-"}
      </td>

      <td class="category-cell">
        ${student.category || "-"}
      </td>

      <td class="${dueClass}">
          ${student.weeklyDueDays} 
    </td>

      <td class="${dueClass}">
          ${student.dueDays} 
    </td>

      <td class="person-actions">

        <button
          class="people-action-btn meet-btn"
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
            class="people-action-btn meet-btn"
            onclick="weeklyMeetingNow('${student.id}', '${student.name.split("\n")[0]}')" disabled
            >
            Weekly Meeting
        </button>

        <button
          class="people-action-btn meet-btn"
          onclick="viewMeetingHistory('student', '${student.id}')" disabled>
          Behaviour Inputs
        </button>

      </td>
    `;

    tbody.appendChild(row);
  });

  container.appendChild(table);
}

function getDueClass(type, dueDays, inputThresholds) {
  const thresholds = inputThresholds[type];

  if (!thresholds || dueDays == null) {
    return "meeting-due-red";
  }

  if (dueDays >= thresholds.green) {
    return "meeting-due-green";
  }

  if (dueDays >= thresholds.yellow) {
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

function filterPeopleTable(type) {
  const searchInput = document.getElementById(
    type === "devotee" ? "devoteeSearch" : "studentSearch",
  );

  const table = document.getElementById(
    type === "devotee" ? "devoteeTable" : "studentTable",
  );

  console.log("searchInput", searchInput, "table", table);

  if (!searchInput || !table) return;

  const searchText = searchInput.value.trim().toLowerCase();

  table.querySelectorAll("tbody tr").forEach((row) => {
    row.style.display = row.innerText.toLowerCase().includes(searchText)
      ? ""
      : "none";
  });
}
