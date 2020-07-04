const marked = require('marked')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const routeInputField = document.getElementById('routeInput')

    const contentDisplay = document.getElementById('contentDisplay')

    const peruseButton = document.getElementById('peruseButton')

    const processRouteInput = route => {
        let processedRoute = route

        processedRoute = processedRoute.replace('http://', 'https://')

        if (!processedRoute.endsWith('.md')) {
            processedRoute += '.md'
        }

        if (!processedRoute.startsWith('https://')) {
            processedRoute = 'https://' + processedRoute
        }

        return processedRoute
    }

    function peruseToRoute(route) {
        const processedRoute = processRouteInput(route)

        const result = fetch(processedRoute)
            .then(response => {
                return response.text()
            })
            .then(content => contentDisplay.innerHTML = marked(content))
            .catch(error => {
                // TODO: display errors
                console.log(error)
            })
    }

    routeInputField.onkeypress = (event) => {
        const keyPressed = event.key

        if (keyPressed === 'Enter') {
            const route = routeInputField.value

            peruseToRoute(route)
        }
    }

    peruseButton.onclick = () => {
        const route = routeInputField.value

        peruseToRoute(route)
    }
})