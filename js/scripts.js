/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // --------------------------------------------------------
    // Glitch Name Easter Egg
    // --------------------------------------------------------
    const nameHeading = document.getElementById('glitch-name');
    if (nameHeading) {
        // Force the element to have a fixed height/container to prevent layout jumps
        nameHeading.style.minHeight = nameHeading.offsetHeight + 'px';
        nameHeading.style.display = 'block';

        const originalHTML = nameHeading.innerHTML.trim();
        const targetText = "root@karant.dev:~#";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+";
        let interval = null;

        // Visual cue
        nameHeading.style.cursor = 'pointer';
        nameHeading.title = 'Access Terminal';

        // Hover Effect: Matrix Decode
        nameHeading.onmouseover = event => {
            let iteration = 0;

            clearInterval(interval);

            // Switch styles immediately to terminal look
            nameHeading.style.fontFamily = "'Courier New', monospace";
            nameHeading.style.color = "#00ff00";
            nameHeading.style.textShadow = "0 0 5px #00ff00";
            // Reduce font size (Bootstrap h1 is huge, let's scale it down slightly)
            nameHeading.style.fontSize = "3.8em";
            nameHeading.style.marginTop = "0.2em"; // Adjust alignment

            interval = setInterval(() => {
                nameHeading.innerText = targetText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= targetText.length) {
                    clearInterval(interval);
                    // Add the blinking cursor at the end
                    nameHeading.innerHTML = targetText + ' <span class="blink">█</span>';
                }

                iteration += 1 / 2; // Speed of decode
            }, 30);
        };

        // Leave Effect: Snap back
        nameHeading.onmouseleave = event => {
            clearInterval(interval);
            // Reset all styles
            nameHeading.style.fontFamily = "";
            nameHeading.style.color = "";
            nameHeading.style.textShadow = "";
            nameHeading.style.fontSize = "";
            nameHeading.style.marginTop = "";
            nameHeading.innerHTML = originalHTML;
        };

        // Click Action -> Go to Terminal Site
        nameHeading.addEventListener('click', () => {
            window.location.href = '../index.html';
        });

        // Add blink animation style
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
            .blink { animation: blink 1s infinite; }
        `;
        document.head.appendChild(styleSheet);
    }

});
