var request = new XMLHttpRequest()

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
            const title = document.createElement('link')
            title.textContent = repo.name
            title.href = repo.html_url

            // Create a p and set the text content to the repo's description
            const p = document.createElement('p')
            repoCard.setAttribute('class', 'repodesc')
            repodescription = repo.description.substring(0, 300) // Limit to 300 chars
            p.textContent = `${repodescription}...` // End with an ellipses

            // Append content to the repo card element
            repoCard.appendChild(title)
            repoCard.appendChild(p)

            // Append the card to the div with "Cards-Container" id
            document.getElementById("Repos-Wrapper").appendChild(repoCard);
        })
    } else {
        console.log('error')
    }
}

// Send request
request.send()
