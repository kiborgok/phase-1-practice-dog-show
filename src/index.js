document.addEventListener("DOMContentLoaded", () => {
  const dogForm = document.getElementById("dog-form");
  const tbody = document.getElementById("table-body");

  dogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = parseInt(e.target.children.name.id);
    if (id) {
      const name = e.target.children.name.value;
      const sex = e.target.children.sex.value;
      const breed = e.target.children.breed.value;
      const dogObject = {
        name,
        sex,
        breed,
      };
      editDog(id, dogObject).then((dogData) => {
        fetchDogs().then((dogsData) => {
          const newDogsData = [...dogsData, dogData];
          tbody.textContent = "";
          for (dog of newDogsData) {
            createDogData(dog);
          }
        });
      });
        return
    }
      return
  });

  function fetchDogs() {
    return fetch(`http://localhost:3000/dogs`).then((res) => res.json());
  }
  function editDog(id, dogObject) {
    return fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogObject),
    }).then((res) => res.json());
  }

  displayAllDogs();
  function displayAllDogs() {
    fetchDogs().then((data) => {
      for (dog of data) {
        createDogData(dog);
      }
    });
  }
  function createDogData(data) {
    const row = document.createElement("tr");
    const dogName = document.createElement("td");
    const dogBreed = document.createElement("td");
    const dogSex = document.createElement("td");
    const dogEdit = document.createElement("td");
    dogEdit.style.cursor = "pointer";
    dogEdit.textContent = "Edit Dog";
    dogEdit.addEventListener("click", (e) => {
      const name = e.target.parentNode.children[0].textContent;
      const breed = e.target.parentNode.children[1].textContent;
      const sex = e.target.parentNode.children[2].textContent;
      dogForm.children.name.setAttribute("id", data.id);
      dogForm.children.name.value = name;
      dogForm.children.sex.value = sex;
      dogForm.children.breed.value = breed;
    });
    dogName.textContent = data.name;
    dogBreed.textContent = data.breed;
    dogSex.textContent = data.sex;
    row.appendChild(dogName);
    row.appendChild(dogBreed);
    row.appendChild(dogSex);
    row.appendChild(dogEdit);
    tbody.appendChild(row);
  }
});
