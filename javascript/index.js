console.log("HAHAHA");
var nameInput = document.getElementById("webNameInput");
var linkInput = document.getElementById("webLinkInput");
var stachBtn = document.getElementById("submitBtn");
var nameRegex = /^[A-Za-z ]{3,15}$/;
var linkRegex = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/i;
var dataArray = [];
if (localStorage.getItem("data") != null) {
  dataArray = JSON.parse(localStorage.getItem("data"));
  showBookmark();
}

/**function validCheck(dataObject) {
  return (
    nameRegex.test(dataObject.name.trim()) &&
    linkRegex.test(dataObject.link.trim())
  );
}**/
function checkValidation() {
  let isValid = true;

  if (!nameRegex.test(nameInput.value.trim())) {
    nameAlert.classList.remove("d-none");
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    isValid = false;
  } else {
    nameAlert.classList.add("d-none");
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
  }

  if (!linkRegex.test(linkInput.value.trim())) {
    linkAlert.classList.remove("d-none");
    linkInput.classList.add("is-invalid");
    linkInput.classList.remove("is-valid");
    isValid = false;
  } else {
    linkAlert.classList.add("d-none");
    linkInput.classList.remove("is-invalid");
    linkInput.classList.add("is-valid");
  }

  return isValid;
}

function bookmark() {
  if (!checkValidation()) {
    return;
  }
  var dataObject = {
    name: nameInput.value,
    link: linkInput.value,
  };
  //if (validCheck(dataObject)) {
  dataArray.push(dataObject);
  localStorage.setItem("data", JSON.stringify(dataArray));
  showBookmark();
  popSuccessToast();
  nameInput.value = "";
  linkInput.value = "";
  //}
}

function showBookmark() {
  var items = "";
  for (let i = 0; i < dataArray.length; i++) {
    items += `<tr>
              <td>${i + 1}</td>
              <td>${dataArray[i].name}</td>
              <td>
                <a id="stachedLink" target="_blank" href="${dataArray[i].link}"
                  ><button
                    title="Visit link"
                    id="visitBtn"
                    type="button"
                    class="btn btn-primary btn-sm px-3"
                  >
                    <i class="bi bi-eye align-middle"></i>
                    
                    Visit
                  </button>
                </a>
              </td>
              <td>
                <button
                  onclick="removeBookmark(${i})"
                  id="deleteBtn"
                  type="button"
                  class="btn btn-danger btn-sm px-3"
                  title="Delete bookmark"
                >
                  <i class="bi bi-x-circle align-middle"></i>
                  Delete
                </button>
              </td>
            </tr>`;
  }
  document.getElementById("tBody").innerHTML = items;
}

function removeBookmark(index) {
  dataArray.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(dataArray));
  showBookmark();
  popDeleteToast();
}

function popSuccessToast() {
  var toastElement = document.getElementById("addToast");
  var toast = new bootstrap.Toast(toastElement);
  toast.show();
}
function popDeleteToast() {
  var toastElement = document.getElementById("deleteToast");
  var toast = new bootstrap.Toast(toastElement);
  toast.show();
}
