// Animate details element open/close by transitioning max-height
// This script is loaded from index.html

document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('details');
    details.forEach(d => {
        const content = d.querySelector('.content');
        const arrow = d.querySelector('.arrow');

        // Remove the default marker (handled in CSS): ensure our arrow reflects state
        const setOpenState = (open) => {
            if (open) {
                // set max-height to content height to animate open
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                // collapse
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                arrow.style.transform = 'rotate(0deg)';
            }
        }

        // Initialize: collapse first so we control animation
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        content.style.opacity = '0';

        // On toggle event triggered by clicking summary
        d.addEventListener('toggle', () => {
            if (d.open) {
                // opening: set maxHeight to scrollHeight and afterwards remove the limit
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                // closing: if maxHeight was unset to 'none', set it to scrollHeight first
                if (content.style.maxHeight === 'none' || !content.style.maxHeight) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
                // allow the above assignment to take effect
                setTimeout(() => {
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                    arrow.style.transform = 'rotate(0deg)';
                }, 10);
            }
        });

        // If data-open-onload attribute is present, open with animation after a short delay
        if (d.hasAttribute('data-open-onload')) {
            // tiny delay so CSS transitions apply
            setTimeout(() => {
                d.open = true;
                setOpenState(true);
            }, 250);
        }

        // When transition ends and the details is open, clear max-height to allow dynamic content
        content.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'max-height' && d.open) {
                content.style.maxHeight = 'none';
            }
        });
    });
});
