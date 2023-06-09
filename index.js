const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const resultsList = document.getElementById('results-list');
const searchDiv = document.getElementById('searchBox');
const loaderContainer = document.getElementById('loader_waiting');
const moreDiv = document.getElementById('more-div-button');
const base_url = 'https://www.amazon.it/s';
let result = '';

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
  linkCell.textContent = link;
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

function createTableResearch(research) {
  const tbody = document.querySelector('#table_searched');
  const row = document.createElement('tr');

  const researchCell = document.createElement('td');
  researchCell.textContent = research;
  row.appendChild(researchCell);

  const linkCell = document.createElement('td');
  const linkButton = document.createElement('button');
  const text = document.createTextNode("Mostra regali");
  linkButton.appendChild(text);
  linkCell.appendChild(linkButton);
  
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
    }, 2000);

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
        console.log(result);
        loaderContainer.style.display = 'none';
        resultsList.innerHTML = '';
        searchButton.disabled = false;

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

      })
      .catch(error => {
        console.error(error);
      });
  }
});