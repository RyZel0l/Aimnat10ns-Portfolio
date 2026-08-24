document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const serviceCards = document.querySelectorAll('.service-card');

    let filterTimer;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            clearTimeout(filterTimer);

            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                filterButton.classList.toggle(
                    'active',
                    filterButton === button
                );
            });

            const firstPositions = new Map();

            serviceCards.forEach((card) => {
                if (
                    card.style.display !== 'none' &&
                    !card.classList.contains('hidden')
                ) {
                    firstPositions.set(card, card.getBoundingClientRect());
                }
            });

            serviceCards.forEach((card) => {
                const matches =
                    selectedFilter === 'all' ||
                    card.dataset.category === selectedFilter;

                if (!matches) {
                    card.classList.add('hidden');
                }
            });

            filterTimer = setTimeout(() => {
                serviceCards.forEach((card) => {
                    const matches =
                        selectedFilter === 'all' ||
                        card.dataset.category === selectedFilter;

                    if (matches) {
                        card.style.display = '';
                        card.classList.add('hidden');
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Force layout calculation.
                serviceCards[0]?.offsetHeight;

                serviceCards.forEach((card) => {
                    if (card.style.display !== 'none') {
                        const first = firstPositions.get(card);
                        const last = card.getBoundingClientRect();

                        if (first) {
                            const x = first.left - last.left;
                            const y = first.top - last.top;

                            card.animate(
                                [
                                    { transform: `translate(${x}px, ${y}px)` },
                                    { transform: 'translate(0, 0)' }
                                ],
                                {
                                    duration: 300,
                                    easing: 'ease',
                                    fill: 'none'
                                }
                            );
                        }

                        requestAnimationFrame(() => {
                            card.classList.remove('hidden');
                        });
                    }
                });
            }, 300);
        });
    });
});