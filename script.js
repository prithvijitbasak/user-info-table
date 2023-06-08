const openFormButton = document.getElementById("openFormButton");
const closeFormButton = document.getElementById("closeFormButton");
const formOverlay = document.getElementById("formOverlay");
const form = document.getElementById("myForm");
const tableBody = document.getElementById("tableBody");
const deleteConfirmationButton = document.getElementById("deleteConfirmation");

let selectedRowIndex = -1;

openFormButton.addEventListener("click", () => {
  // form.reset();
  formOverlay.className = "flex items-center justify-between";
});

closeFormButton.addEventListener("click", () => {
  formOverlay.className = "hidden";
});

const addRow = (firstName, lastName, email) => {
  const newRow = document.createElement("tr");

  const firstNameCell = document.createElement("td");
  firstNameCell.innerText = firstName;
  firstNameCell.className = "text-center border px-4 py-2";
  newRow.appendChild(firstNameCell);

  const lastNameCell = document.createElement("td");
  lastNameCell.innerText = lastName;
  lastNameCell.className = "text-center border px-4 py-2";
  newRow.appendChild(lastNameCell);

  const emailCell = document.createElement("td");
  emailCell.innerText = email;
  emailCell.className = "text-center border px-4 py-2";
  newRow.appendChild(emailCell);

  const editCell = document.createElement("td");
  editCell.className = "text-center border px-4 py-2";
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.className =
    "rounded bg-green-500 px-3 transition transition-all duration-300 hover:scale-110 active:scale-90 uppercase";
  editButton.addEventListener("click", () => {
    editRow(newRow);
  });
  editCell.appendChild(editButton);
  newRow.appendChild(editCell);

  const deleteCell = document.createElement("td");
  deleteCell.className = "text-center border px-4 py-2";
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.className =
    "rounded bg-red-500 px-3 transition trabsition-all duration-300 hover:scale-110 active:scale-90 uppercase";
  deleteButton.addEventListener("click", () => {
    deleteConfirmationButton.className = "flex items-center justify-between";

    const noButton = document.getElementById("deleteNoButton");
    const yesButton = document.getElementById("deleteYesButton");

    noButton.addEventListener("click", () => {
      deleteConfirmationButton.className = "hidden";
    });

    yesButton.addEventListener("click", () => {
      deleteRow(newRow);
      deleteConfirmationButton.className = "hidden";
      showDeletedConfirmationBox();
    });
  });
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  tableBody.appendChild(newRow);

  saveTableData();
}

const showAddedConfirmationBox = () => {
  const box = document.getElementById("addedConfirmation");
  box.className =
    "w-full absolute inline-flex justify-center items-center z-999";
  setTimeout(function () {
    box.className = "hidden";
  }, 3000);
}

const showUpdatedConfirmationBox = () => {
  const box = document.getElementById("updatedConfirmation");
  box.className =
    "w-full absolute inline-flex justify-center items-center z-999";
  setTimeout(function () {
    box.className = "hidden";
  }, 3000);
}

const showDeletedConfirmationBox = () => {
  const box = document.getElementById("deletedConfirmation");
  box.className =
    "w-full absolute inline-flex justify-center items-center z-999";
  setTimeout(function () {
    box.className = "hidden";
  }, 3000);
}

const deleteRow = (row) => {
  row.remove();
  saveTableData();
}

const editRow = (row) => {
  const cells = row.querySelectorAll("td");
  const firstName = cells[0].innerText;
  const lastName = cells[1].innerText;
  const email = cells[2].innerText;

  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("email").value = email;

  formOverlay.className = "flex items-center justify-between";

  selectedRowIndex = Array.from(tableBody.children).indexOf(row);
}

const updateRow = (firstName, lastName, email) => {
  if (selectedRowIndex >= 0 && selectedRowIndex < tableBody.children.length) {
    const row = tableBody.children[selectedRowIndex];
    const cells = row.querySelectorAll("td");
    cells[0].innerText = firstName;
    cells[1].innerText = lastName;
    cells[2].innerText = email;

    saveTableData();
    clearForm();
    selectedRowIndex = -1;
  }
}

const clearForm = () => {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";

  formOverlay.className = "hidden";
}

const saveTableData = () => {
  const tableData = Array.from(tableBody.children).map((row) => {
    const [firstName, lastName, email] = row.children;

    return {
      firstName: firstName.innerText,
      lastName: lastName.innerText,
      email: email.innerText,
    };
  });

  localStorage.setItem("tableData", JSON.stringify(tableData));
}

const populateTableFromStorage = () => {
  const storedData = localStorage.getItem("tableData");

  if (storedData) {
    const tableData = JSON.parse(storedData);
    tableData.forEach((data) => {
      addRow(data.firstName, data.lastName, data.email);
    });
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;

  if (selectedRowIndex === -1) {
    addRow(firstName, lastName, email);
    showAddedConfirmationBox();
  } else {
    updateRow(firstName, lastName, email);
    showUpdatedConfirmationBox();
  }

  form.reset();
  formOverlay.className = "hidden";
});

populateTableFromStorage();
