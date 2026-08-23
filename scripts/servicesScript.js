document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                filterButton.classList.toggle('active', filterButton === button);
            });

            serviceCards.forEach((card) => {
                const matchesFilter = selectedFilter === 'all' || card.dataset.category === selectedFilter;
                card.classList.toggle('hidden', !matchesFilter);
            });
        });
    });
});
