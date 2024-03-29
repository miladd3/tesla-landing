function isInViewport(element) {
    const distance = element.getBoundingClientRect();
    return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function applyClassInViewport(selector, className) {
    const elements = document.querySelectorAll(selector);

    function applyClass() {
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add(className);
            }
        });
    }

    window.addEventListener('scroll', applyClass, false);
}

export { isInViewport, applyClassInViewport };
