document.body.classList.add('loading');

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const body = document.body;

    setTimeout(function () {
        if (loader) {
            loader.classList.add('hidden');
            body.classList.remove('loading');

            setTimeout(function () {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }
    }, 2000);
});

setTimeout(function () {
    const loader = document.getElementById('loader');
    const body = document.body;

    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        body.classList.remove('loading');

        setTimeout(function () {
            if (loader && loader.parentNode) {
                loader.remove();
            }
        }, 500);
    }
}, 4000);
