const highlightCountries = {
    IT: { name: 'Italy', url: 'https://en.wikipedia.org/wiki/Italy' },
    BR: { name: 'Brazil', url: 'https://en.wikipedia.org/wiki/Brazil' },
    FR: { name: 'France', url: 'https://en.wikipedia.org/wiki/France' },
    US: { name: 'United States', url: 'https://en.wikipedia.org/wiki/United_States' },
    TW: { name: 'Taiwan', url: 'https://en.wikipedia.org/wiki/Taiwan' },
    NO: { name: 'Norway', url: 'https://en.wikipedia.org/wiki/Norway' },
    FI: { name: 'Finland', url: 'https://en.wikipedia.org/wiki/Finland' },
    GB: { name: 'England', url: 'https://en.wikipedia.org/wiki/England' },
    JP: { name: 'Japan', url: 'https://en.wikipedia.org/wiki/Japan' },
    DE: { name: 'Germany', url: 'https://en.wikipedia.org/wiki/Germany' },
    CA: { name: 'Canada', url: 'https://en.wikipedia.org/wiki/Canada' },
    IN: { name: 'India', url: 'https://en.wikipedia.org/wiki/India' },
};

window.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('.map svg');
    if (!svg) return;
    svg.querySelectorAll('path[id]').forEach(path => {
        path.style.fill = '#e1e1e1ff';
        path.style.transition = 'fill 0.2s';
        path.style.cursor = 'default';
    });

    Object.entries(highlightCountries).forEach(([id, { url }]) => {
        const country = svg.getElementById(id);
        if (country) {
            country.style.fill = '#0c458c';
            country.style.cursor = 'pointer';
            country.addEventListener('mouseenter', () => {
                country.style.fill = '#00acea';
            });
            country.addEventListener('mouseleave', () => {
                country.style.fill = '#0c458c';
            });
            country.addEventListener('click', () => {
                window.open(url, '_blank');
            });
        }
    });
});
