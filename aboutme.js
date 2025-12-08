// Animate details element open/close by transitioning max-height
// This script is loaded from index.html

document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('details');
    details.forEach(d => {
        const summary = d.querySelector('summary');
        const content = d.querySelector('.content');
        const arrow = d.querySelector('.arrow');

        // Initialize: collapse first
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        content.style.opacity = '0';

        summary.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default toggle behavior

            // Determine if we are currently opening or closing
            // If the element is not open, or if it is open but currently collapsing (maxHeight is 0)
            const isClosed = !d.open;
            const isClosing = d.open && content.style.maxHeight === '0px';

            if (isClosed || isClosing) {
                // Open the details
                d.open = true;
                // Use requestAnimationFrame to ensure the browser registers the 'open' state change
                // before applying the transition
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    arrow.style.transform = 'rotate(180deg)';
                });
            } else {
                // Close the details
                // If max-height is 'none', we need to set it to a pixel value first so it can transition to 0
                if (content.style.maxHeight === 'none' || !content.style.maxHeight) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }

                // Allow the browser to register the explicit height before setting it to 0
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        content.style.maxHeight = '0px';
                        content.style.opacity = '0';
                        arrow.style.transform = 'rotate(0deg)';
                    }, 10);
                });
            }
        });

        // When transition ends
        content.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'max-height') {
                if (d.open && content.style.maxHeight === '0px') {
                    // Animation finished closing, now we can safely remove the open attribute
                    d.open = false;
                } else if (d.open && content.style.maxHeight !== '0px') {
                    // Animation finished opening, remove the limit so content can expand if needed
                    content.style.maxHeight = 'none';
                }
            }
        });

        // If data-open-onload attribute is present, open with animation after a short delay
        if (d.hasAttribute('data-open-onload')) {
            setTimeout(() => {
                d.open = true;
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    arrow.style.transform = 'rotate(180deg)';
                });
            }, 250);
        }
    });
});
