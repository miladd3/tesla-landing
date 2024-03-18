/**
 * Smooth scroll to element (just modern browsers)
 * @param {HTMLElement|String} elm
 * @param options
 *
 * @example scrollTo('.element img');
 * @example scrollTo(document.getElementById('element'))
 */
const scrollTo = (elm, options = {
  offset: 0,
  delay: 0
}) => {
  if (!elm) {
    return;
  }

  let element = elm;

  const doScroll = () => {
    if (typeof elm === 'string') {
      element = document.querySelector(elm);
    }
    let offset = options.offset ? element.offsetTop - options.offset : element.offsetTop;

    try {
      if (element.offsetTop) {
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: offset
        });
      } else {
        console.error('element has no offsetTop !')
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (options.delay && options.delay > 0) {
    setTimeout(doScroll, options.delay)
  } else {
    doScroll();
  }
};


export default scrollTo
