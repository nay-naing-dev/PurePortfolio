// Runs in <head> before the page paints, so a saved dark theme never flashes light first.
// main.js uses the same storage key ('portfolio-theme').
(function () {
    var root = document.documentElement;

    // JavaScript is running, so the CSS can hide the mobile menu until the button opens it.
    root.classList.remove('no-js');

    try {
        if (localStorage.getItem('portfolio-theme') === 'dark') {
            root.setAttribute('data-theme', 'dark');
        }
    } catch (error) {
        // Storage is blocked (private mode, file settings): stay on the default light theme.
    }
})();
