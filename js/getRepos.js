var request = new XMLHttpRequest()

//set images var code languages
var JSImage = new Image(20,20);
JSImage.setAttribute('class', 'languageimage')
var PyImage = new Image(20,20);
PyImage.setAttribute('class', 'languageimage')
var HTMLImage = new Image(20,20);
HTMLImage.setAttribute('class', 'languageimage')

// function LoadImages() {
//
//     var JSImage = new Image(20,20);
//     JSImage.src = "images/javascript.png";
//     JSImage.setAttribute('class', 'languageimage')
//
//     PyImage = new Image(20,20);
//     PyImage.src = "images/python.png";
//     PyImage.setAttribute('class', 'languageimage')
//
//     HTMLImage = new Image(20,20);
//     HTMLImage.src = "images/html.png";
//     HTMLImage.setAttribute('class', 'languageimage')
// }
// LoadImages()


function GetFormattedDate(repodate) {
    var month = repodate.getMonth()
    var day = repodate.getDate()
    var year = repodate.getFullYear()
    return month + "/" + day + "/" + year;
}
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.github.com/users/mattbf/repos', true)

request.onload = function () {
    // Create a repo obj for each repo retrieved from api
    var data = JSON.parse(this.response)

    if (request.status === 200) {
        data.forEach(repo => {
            // Create a div with a "Sample Card" class
            const repoCard = document.createElement('div')
            repoCard.setAttribute('class', 'repo')

            // Create an h3 and set the text content to the repo's title
            const title = document.createElement('h3')
            //title.setAttribute('class', 'repotitle')

            const titleanchor = document.createElement('a')
            titleanchor.setAttribute('class', 'repotitle')
            titleanchor.textContent = repo.name
            titleanchor.href = repo.html_url
            titleanchor.target="_blank"

            // Pur the repo title as a link inside the heading
            title.appendChild(titleanchor)

            // Create a p and set the text content to the repo's description
            const p = document.createElement('p')
            p.setAttribute('class', 'repodesc')

            if(repo.description && repo.description.length >= 300){
                repodescription = repo.description.substring(0, 300) // Limit to 300 chars
                p.textContent = `${repodescription}...` // End with an ellipses
            } else if(repo.description) {
                repodescription = repo.description
                p.textContent = `${repodescription}`
            } else {
              p.textContent = "No description"
            }

            //create repo info div
            const repoinfodiv = document.createElement('div')
            repoinfodiv.setAttribute('class', 'repoinfo')
            const wrapper1 = document.createElement('div')
            wrapper1.setAttribute('class', 'languagewrapper')
            const wrapper2 = document.createElement('div')
            wrapper2.setAttribute('class', 'languagewrapper')

            const languagetext = document.createElement('p')
            languagetext.setAttribute('class', 'repoinfotext')


            //Get repo language
            if(repo.language){
              if(repo.language === "JavaScript"){
                console.log(repo.name + " is written in language: " + repo.language)
                wrapper1.appendChild(JSImage)
                languagetext.textContent = "JavaScript"
                wrapper1.appendChild(languagetext)
                repoinfodiv.appendChild(wrapper1)
              } else if(repo.language === "Python") {
                console.log(repo.name + " is written in language: " + repo.language)
                wrapper1.appendChild(PyImage)
                languagetext.textContent = "Python"
                wrapper1.appendChild(languagetext)
                repoinfodiv.appendChild(wrapper1)
              } else if(repo.language === "HTML") {
                console.log(repo.name + " is written in language: " + repo.language)
                wrapper1.appendChild(HTMLImage)
                languagetext.textContent = "HTML"
                wrapper1.appendChild(languagetext)
                repoinfodiv.appendChild(wrapper1)
              } else {
                // no main language.. do not append a language or image

              }

              var newJSImg = new Image(20,20);
              var newPyImg = new Image(20,20);
              var newHTMLImg = new Image(20,20);

              //upon laoding the images set the dummy images source
              newJSImg.src = "images/javascript.png";
              newJSImg.onload = function() {
                  JSImage.src = this.src;
              }

              newPyImg.src = "images/python.png";
              newPyImg.onload = function() {
                  PyImage.src = this.src;
              }

              newHTMLImg.src = "images/html.png";
              newHTMLImg.onload = function() {
                  HTMLImage.src = this.src;
              }
            }

            //get repo last updated date
            if(repo.updated_at){
              const updatedat = document.createElement('p')
              updatedat.setAttribute('class', 'repoinfotext')
              updatedat.classList.add('marginright')
              updatedat.textContent = "Update at: "
              const date = document.createElement('p')
              date.setAttribute('class', 'repoinfotext')
              var repodate = new Date(repo.updated_at)
              var stringDate = GetFormattedDate(repodate)
              date.textContent = stringDate
              wrapper2.appendChild(updatedat)
              wrapper2.appendChild(date)
              repoinfodiv.appendChild(wrapper2)
            }

            // Append content to the repo card element
            repoCard.appendChild(title)
            repoCard.appendChild(p)
            const underline = document.createElement('div')
            underline.setAttribute('class', 'underline')
            repoCard.appendChild(underline)
            repoCard.appendChild(repoinfodiv)

            // Append the card to the div with "Cards-Container" id
            document.getElementById("Repos-Wrapper").appendChild(repoCard);
        })
    } else {
        console.log('error')
    }
}

// Send request
request.send()
