export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  const startPosition = window.pageYOffset;
  const targetPosition =
    element.getBoundingClientRect().top + window.pageYOffset - 80; // Offset for navbar
  const distance = targetPosition - startPosition;
  const duration = 1500; // 1.5 seconds for a graceful, slow scroll
  let start = null;

  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - (start ?? currentTime);
    const progress = Math.min(timeElapsed / duration, 1);

    const ease =
      // Easing function for smooth acceleration/deceleration
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition + distance * ease);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};
