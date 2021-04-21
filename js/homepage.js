var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl= document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    // clear old content
    if (repos.length === 0) {
    repoContainerEl.textContent = "No Repositories found.";
    return;
    repoSearchTerm.textContent = searchTerm;
    }   

    // loop for repos 
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //  Create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // Create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        
        //  Append to container 
        repoEl.appendChild(titleEl);

        // create a status element
var statusEl = document.createElement("span");
statusEl.classList = "flex-row align-center";

// check if current repo has issues or not
if (repos[i].open_issues_count > 0) {
  statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}

// append to container
repoEl.appendChild(statusEl);

        // Append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}


var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
    getUserRepos(username); 
        nameInputEl.value = "";
    }else {
        alert("please enter a GitHub username");
        }
       console.log(event);
};
    
var getUserRepos = function(user) {
    // format the github api url
var apiUrl = "https://api.github.com/users/" + user + "/repos";
// Variables to store a referebce to the form

// make a request to the url
fetch(apiUrl).then(function(response) {
    //Request was successful
    if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    }else {
        alert("Error: " + response.statusText);
        console.log(response.ok);
        
    }
})  
    .catch(function(error) {
        //Notice this '. catch()' getting chained on the end of the '.then()' method
        alert("unable to connect to GitHub")
    });
};



  userFormEl.addEventListener("submit", formSubmitHandler);