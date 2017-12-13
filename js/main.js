var sectionElement = document.querySelector(".company-details");
jobs = [];

function githubJobApi() {
    var url = "https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json";

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResponse) {
            jobs = jsonResponse;
            addJobDetails(jobs);

        })
        .catch(function(err) {
            // Error :(
            alert('error in fetching api');
        });
}


function createElements(url, logo, name, title, location, type) {
    // debugger;
    var company_card = document.createElement('a');
    var company_detail = document.createElement('div');
    var job_detail = document.createElement('div');
    var company_logo = document.createElement('img');
    var company_name = document.createElement('p');
    var job_title = document.createElement('p');
    var job_location = document.createElement('p');
    var job_type = document.createElement('p');

    company_card.append(company_detail);
    company_card.append(job_detail);

    company_detail.append(company_logo);
    company_detail.append(company_name);

    job_detail.append(job_title);
    job_detail.append(job_location);
    job_detail.append(job_type);

    company_card.className = "company_card";
    company_detail.className = "company_detail";
    job_detail.className = "job_detail";
    company_logo.className = "company_logo";
    company_name.className = "company_name";
    job_title.className = "job_title";
    job_location.className = "job_location";
    job_type.className = "job_type";

    company_card.href = url;
    company_logo.src = logo;
    company_name.textContent = name;
    job_title.textContent = 'Position: ' + title;
    job_location.textContent = 'Location: ' + location;
    job_type.textContent = 'Job Type: ' + type;

    return company_card;

}

function addJobDetails(jobs) {
    // debugger;
    sectionElement.innerHTML = '';

    for (var i = 0; i < jobs.length; i++) {
        var url = jobs[i].company_url;
        var logo = jobs[i].company_logo;
        var name = jobs[i].company;
        var title = jobs[i].title;
        var location = jobs[i].location;
        var type = jobs[i].type;

        var various_cards = createElements(url, logo, name, title, location, type);
        sectionElement.append(various_cards);

    }
}

function sortByType(key) {
    jobs.sort(function(a, b) {
        var keyOne = a[key].toLowerCase();
        var keyTwo = b[key].toLowerCase();

        if (keyOne < keyTwo) {
            return -1;
        }
        if (keyOne > keyTwo) {
            return 1;
        }

        return 0;
    });
    addJobDetails(jobs);
}

function filterJobType(jobType) {
  var filteredJobs =  jobs.filter(function(job) {
        if(job.type == jobType) {
          return true;
        }
    });
    addJobDetails(filteredJobs);
}

githubJobApi();