const el = {};
document
  .querySelectorAll("[id]")
  .forEach((element) => (el[element.id] = element));
let elem = "";

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

//usage:
readTextFile("data.json", function (text) {
  var data = JSON.parse(text);

  // Search Contact by Search Button
  el.searchBtn.addEventListener("click", () => {
    var contactName = el.search.value;
    searchContact(contactName);
  });

  // Sort ASC Button
  el.asc.addEventListener("click", () => {
    ascSort();
  });

  // Sort DESC Button
  el.desc.addEventListener("click", () => {
    descSort();
  });

  // Name Function
  function content() {
    el.number.innerText = "123";
  }

  // Retrive Data from JSON File
  for (let i = 0; i < data.length; i++) {
    let number = data[i].number;
    el.number.innerHTML = data[0].number;
    let div = `<div class="contact py-2 mt-3" id="${i}" onclick="content(${number});">
            <span class="d-block text-dark" id="contact">${data[i].full_name}</span>
            </div>`;
    elem += div;
    el.list.innerHTML = elem;
  }

  // Linear Search Algorithms
  function searchContact(text) {
    let regex = new RegExp(text, "gi");
    let elem = "";
    for (let i = 0; i <= 10; i++) {
        let number = data[i].number;
      let searchedText = data[i].full_name.match(regex);
      if (data[i].full_name == searchedText) {
        let div = `<div class="contact py-2 mt-3" id="${i}" onclick="content(${number});">
                <span class="d-block text-dark" id="contact">${data[i].full_name}</span>
                </div>`;
        elem += div;
        el.list.innerHTML = elem;
      }
    }
  }

  // ASC Sorting Function
  function ascSort() {
    //Comparer Function
    function GetSortOrder(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    }
    data.sort(GetSortOrder("full_name"));
    let elem = "";
    for (var item in data) {
      let div = `<div class="contact py-2 mt-3" id="" onclick="content(${data[item].number});">
                    <span class="d-block text-dark" id="contact">${data[item].full_name}</span>
                    </div>`;
      elem += div;
      el.list.innerHTML = elem;
    }
  }

  // DESC Sorting Function
  function descSort() {
    //Comparer Function
    function GetSortOrder(prop) {
      return function (a, b) {
        if (a[prop] < b[prop]) {
          return 1;
        } else if (a[prop] > b[prop]) {
          return -1;
        }
        return 0;
      };
    }
    data.sort(GetSortOrder("full_name"));
    let elem = "";
    for (var item in data) {
      let div = `<div class="contact py-2 mt-3" id="" onclick="content(${data[item].number});">
                    <span class="d-block text-dark" id="contact">${data[item].full_name}</span>
                    </div>`;
      elem += div;
      el.list.innerHTML = elem;
    }
  }
});

function content(number) {
  el.number.innerHTML = number;
}
