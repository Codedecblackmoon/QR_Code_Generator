const links = document.querySelectorAll('nav a');
const contentDiv = document.getElementById('content');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('href');

        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Create a temporary DOM element to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;

                // Get the title and content from the fetched page
                const pageTitle = tempDiv.querySelector('h2').textContent;
                const pageContent = tempDiv.querySelector('p').innerHTML;

                // Update the main content area
                contentDiv.innerHTML = `<h2>${pageTitle}</h2><p>${pageContent}</p>`;
            })
            .catch(error => {
                contentDiv.innerHTML = `<h2>Error loading page</h2><p>${error.message}</p>`;
            });
    });
});