document.addEventListener("DOMContentLoaded", function() {
    // Fetch and insert header and footer
    fetch("/x/helpers/layout.html")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const header = doc.querySelector("header");
            const footer = doc.querySelector("footer");

            const headerPlaceholder = document.getElementById("header-placeholder");
            if (headerPlaceholder) {
                headerPlaceholder.parentNode.replaceChild(header, headerPlaceholder);
            }

            const footerPlaceholder = document.getElementById("footer-placeholder");
            if (footerPlaceholder) {
                footerPlaceholder.parentNode.replaceChild(footer, footerPlaceholder);
            }
        })
        .then(() => {
            // Set full-page height dynamically
            const headerElement = document.querySelector("header");
            const fullPageElement = document.querySelector(".full-page");

            if (headerElement && fullPageElement) {
                const headerHeight = headerElement.offsetHeight;
                fullPageElement.style.height = `calc(100vh - ${headerHeight}px)`;
            }

            // Active link logic
            const currentPath = window.location.pathname;
            const headerLinks = document.querySelectorAll(".header-link");

            headerLinks.forEach(link => {
                const linkHref = link.getAttribute("href");

                if (linkHref === "/" && (currentPath === "/" || currentPath.endsWith("index.html"))) {
                    link.classList.add("active");
                }
                else if (linkHref !== "/" && currentPath.startsWith(linkHref)) {
                    link.classList.add("active");
                }
            });

            // Hamburger menu logic
            document.addEventListener("click", function(event) {
                const headerNav = document.querySelector(".header-nav");
                const hamburger = document.querySelector(".hamburger");

                if (hamburger && headerNav) {
                    // If the click is on the hamburger button
                    if (hamburger.contains(event.target)) {
                        hamburger.classList.toggle("is-active");
                        headerNav.classList.toggle("is-active");
                    }
                    // If the menu is open and the click is outside of it
                    else if (headerNav.classList.contains("is-active") && !headerNav.contains(event.target)) {
                        hamburger.classList.remove("is-active");
                        headerNav.classList.remove("is-active");
                    }
                }
            });
        });
});