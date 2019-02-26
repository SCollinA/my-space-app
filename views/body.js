function body(content) {
    return `
        <div class="wrapper">
                ${mainNav()}
                ${topContainer()}
                ${content}
                ${footer()}
        </div>
    `
}

function mainNav() {
    return `
    <!-- Navigation -->
            <nav class="main-nav">
                <ul>
                    <li>
                        <a href="/profile">My Space</a>
    
                    </li>
                    <li>
                        <a href="/logout">Log-Out</a>
                    </li>
                    
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </nav>
    `
}

function topContainer() {
    return `
    <!-- Top Container -->
    <section class="top-container">
        <header class="showcase">
            <h1>Space App</h1>
        </header>

    </section>

    `
}

function footer() {
    return `
        <footer>
            <p>SpaceApp &copy; 2018</p>
        </footer>
    `
}

module.exports = body;