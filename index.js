'use strict';

const searchURL = 'https://api.github.com/';

function displayResults(responseJson){
    $('#results-list').empty();

    let searchHTML = responseJson.map(repo => {
        return `
        <li>
        <a target=_blank href="${repo.html_url}">${repo.name}</a>
        </li>
        `
    }).join("");

    $('#results-list').html(searchHTML);

    $('#results').removeClass('hidden');
}


function getRepos(user){

    const url = `https://api.github.com/users/${user}/repos`;
    
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-user').val();
        getRepos(searchTerm);
      });
}

$(watchForm);