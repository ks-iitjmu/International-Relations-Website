document.body.classList.add('loading');

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const body = document.body;

    setTimeout(function () {
        loader.classList.add('hidden');
        body.classList.remove('loading');

        setTimeout(function () {
            loader.remove();
        }, 700);
    }, 2500);
});

setTimeout(function () {
    const loader = document.getElementById('loader');
    const body = document.body;

    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        body.classList.remove('loading');

        setTimeout(function () {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 700);
    }
}, 8000);
