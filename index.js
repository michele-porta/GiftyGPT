const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const moreButton = document.getElementById('more-button')
const resultsList = document.getElementById('results-list');
const searchDiv = document.getElementById('searchBox');
const loaderContainer = document.getElementById('loader_waiting');
const moreDiv = document.getElementById('more-div-button');
const base_url = 'https://www.amazon.it/s';
let result = '';
const number_gifts = 5;

function home() {
  console.log("This is Home!");
  window.location.href = '/home';
};

function desired() {
  console.log("This is Desired!");
  window.location.href = '/desired';

};

function createTableDesired(title, description, link) {
  const tbody = document.querySelector('#table_desired');
  const row = document.createElement('tr');

  const titleCell = document.createElement('td');
  titleCell.textContent = title;
  row.appendChild(titleCell);

  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = description;
  row.appendChild(descriptionCell);

  const linkCell = document.createElement('td');
  const a = document.createElement("a");
  var urlWithParams = new URL(base_url);
  urlWithParams.searchParams.append("k", title);
  a.setAttribute('href', urlWithParams.href);
  a.setAttribute('target', "_blank");
  a.textContent = link;
  linkCell.appendChild(a);
  row.appendChild(linkCell);

  tbody.appendChild(row);
}

function desiredloaded() {
  fetch('/desired_table', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    data.forEach((row) => {
      createTableDesired(row.title, row.description, row.link);
    });
  });
}

function search() {
  console.log("This is Search!");
  window.location.href = '/search';
}

function showGifts(title) {
  console.log("Mostro i regali con il titolo: ", title);
}

function createTableResearch(research) {
  const tbody = document.querySelector('#table_searched');
  const row = document.createElement('tr');

  const researchCell = document.createElement('td');
  researchCell.textContent = research;
  row.appendChild(researchCell);

  const linkCell = document.createElement('td');
  const a = document.createElement("a");
  a.setAttribute('href', "#");
  a.textContent = "Mostra regali";
  linkCell.appendChild(a);
  linkCell.addEventListener("click", function() {
    showGifts(research);
  });
  row.appendChild(linkCell);

  tbody.appendChild(row);
}

function searchedloaded() {
  fetch('/researches_table', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    data.forEach((row) => {
      createTableResearch(row.research);
    });
  });
}

function info() {
  console.log("This is Info!");
  window.location.href = '/info';

};

searchButton.addEventListener('click', function() {
  searchButton.disabled = true;
  resultsList.style.display = 'none';
  const searchQuery = searchBar.value;
  const search = {
    searchQuery
  };

  if (searchQuery === null || searchQuery === "") {
    console.log("This is an empty string!");
    searchButton.disabled = false;
  } else {
      searchDiv.classList.add('move-up');
      setTimeout(function() {
        loaderContainer.style.display = 'block';
      }, 1500);

      fetch('/searched', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(search)
        })
        .then(response => response.json())
        .then(data => {
          result = data;
          loaderContainer.style.display = 'none';
          resultsList.innerHTML = '';
          searchButton.disabled = false;
          console.log(result);

          if (result.length >= number_gifts) {
            result.forEach(function(item) {
              var li = document.createElement("li");
              var h2 = document.createElement("h2");
              var p = document.createElement("p");
              var a = document.createElement("a");
              var urlWithParams = new URL(base_url);
              urlWithParams.searchParams.append("k", item.title);
              a.setAttribute('href', urlWithParams.href);
              a.setAttribute('target', "_blank");

              h2.textContent = item.title;
              p.textContent = item.description;

              a.appendChild(h2);
              li.appendChild(a);
              li.appendChild(p);
              resultsList.appendChild(li);
              resultsList.style.display = 'block';
              moreDiv.style.display = 'block';
            });
          } else {
              var li = document.createElement("li");
              var h2 = document.createElement("h2");
              var p = document.createElement("p");
              h2.textContent = "Errore!";
              p.textContent = "Non hai inserito una descrizione di una persona o di un occasione speciale";
              li.appendChild(h2);
              li.appendChild(p);
              resultsList.appendChild(li);
              resultsList.style.display = 'block';
          }
        })
        .catch(error => {
          console.error(error);
        });
  }
});

moreButton.addEventListener('click', function() {
  loaderContainer.style.display = 'block';
  moreButton.style.display = 'none';

  //here implement more gifts request, send to API previous conversation
  fetch('/moreGifts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    result = data;
    loaderContainer.style.display = 'none';
    result.forEach(function(item) {
      var li = document.createElement("li");
      var h2 = document.createElement("h2");
      var p = document.createElement("p");
      var a = document.createElement("a");
      var urlWithParams = new URL(base_url);
      urlWithParams.searchParams.append("k", item.title);
      a.setAttribute('href', urlWithParams.href);
      a.setAttribute('target', "_blank");

      h2.textContent = item.title;
      p.textContent = item.description;

      a.appendChild(h2);
      li.appendChild(a);
      li.appendChild(p);
      resultsList.appendChild(li);
    });

  })
  .catch(error => {
    console.error(error);
  });

});