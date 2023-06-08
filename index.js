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

function search() {
  console.log("This is Search!");
  window.location.href = '/search';
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