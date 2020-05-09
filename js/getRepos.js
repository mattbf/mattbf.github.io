var request = new XMLHttpRequest()

var JSImage;
var PyImage;
var HTMLImage;

function LoadImages() {
    JSImage = new Image(20,20);
    JSImage.src = "images/javascript.png";
    JSImage.setAttribute('class', 'languageimage')

    PyImage = new Image(20,20);
    PyImage.src = "images/python.png";
    PyImage.setAttribute('class', 'languageimage')

    HTMLImage = new Image(20,20);
    HTMLImage.src = "images/html.png";
    HTMLImage.setAttribute('class', 'languageimage')
}
LoadImages()

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
            title.setAttribute('class', 'repotitle')

            const titleanchor = document.createElement('a')
            titleanchor.textContent = repo.name
            titleanchor.href = repo.html_url
            titleanchor.target="_blank"

            // Pur the repo title as a link inside the heading
            title.appendChild(titleanchor)

            // Create a p and set the text content to the repo's description
            const p = document.createElement('p')
            p.setAttribute('class', 'repodesc')
            repodescription = repo.description.substring(0, 300) // Limit to 300 chars

            if(repo.description.length >= 300){
                p.textContent = `${repodescription}...` // End with an ellipses
            } else {
                p.textContent = `${repodescription}`
            }

            //create repo info div
            const repoinfodiv = document.createElement('div')
            repoCard.setAttribute('class', 'repoinfo')
            const wrapper1 = document.createElement('div')
            repoCard.setAttribute('class', 'languagewrapper')
            const wrapper2 = document.createElement('div')
            repoCard.setAttribute('class', 'languagewrapper')

            //Get repo language
            if(repo.language){
              if(repo.language === "JavaScript"){
                wrapper1.appendChild(JSImage)
                languagetext.textContent = "JavaScript"
                wrapper1.appendChild(languagetext)
              } else if(repo.language === "Python") {
                wrapper1.appendChild(PyImage)
                languagetext.textContent = "Python"
                wrapper1.appendChild(languagetext)
              } else if(repo.language === "HTML") {
                wrapper1.appendChild(HTMLImage)
                languagetext.textContent = "HTML"
                wrapper1.appendChild(languagetext)
              }
              // no main language.. do not append a language or image

            }

            //get repo last updated date
            if(repo.updated_at){
              const updatedat = document.createElement('p')
              updatedat.setAttribute('class', 'repoinfotext.marginright')
              date.textContent = "Update at: "
              const date = document.createElement('p')
              date.setAttribute('class', 'repoinfotext')
              date.textContent = repo.updated_at.toDateString()
              wrapper2.appendChild(updatedat)
              wrapper2.appendChild(date)
            }


            //construct repo information div
            if(repo.language){
              repoinfodiv.appendChild(wrapper1)
            }
            if(repo.updated_at){
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
