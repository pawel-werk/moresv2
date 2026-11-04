export const scrollToSection = (id: string) => {
  // Normalizacja ID (usunięcie ewentualnego hasha)
  const targetId = id.replace(/^#/, '');
  
  const element = document.getElementById(targetId);
  
  if (element) {
    // Sekcja jest na obecnej stronie – płynnie scrollujemy
    element.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  // Sekcji nie ma w DOM (jesteśmy na innej podstronie). 
  // Wracamy na stronę główną i czekamy na wyrenderowanie sekcji.
  window.location.hash = '#/';

  let retries = 60; // Max ~1 sekunda prób (60 klatek rAF)

  const checkAndScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (retries > 0) {
      retries--;
      requestAnimationFrame(checkAndScroll);
    }
  };

  requestAnimationFrame(checkAndScroll);
};