document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCurrentlyActive = header.classList.contains('active');

            // --- START: ROBUSTNESS FIX ---
            // If the clicked item is currently active and is being closed,
            // find and close all active nested accordions within it first.
            if (isCurrentlyActive) {
                const nestedActiveHeaders = content.querySelectorAll('.accordion-header.active');
                nestedActiveHeaders.forEach(nestedHeader => {
                    nestedHeader.classList.remove('active');
                    nestedHeader.nextElementSibling.style.maxHeight = null;
                });
            }
            // --- END: ROBUSTNESS FIX ---

            // Toggle the active state of the clicked header
            header.classList.toggle('active');

            // Toggle the content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Close it
            } else {
                content.style.maxHeight = content.scrollHeight + 'px'; // Open it
            }
            
            // Adjust parent accordion height if it exists
            const parentContent = header.closest('.accordion-content');
            if (parentContent && parentContent.style.maxHeight) {
                 parentContent.style.maxHeight = parentContent.scrollHeight + 'px';
            }
        });
    });

    // Auto-open the first level for demonstration
    const firstLevelHeaders = document.querySelectorAll('.accordion > .accordion-item > .accordion-header');
    firstLevelHeaders.forEach(header => {
        header.click();
    });
});