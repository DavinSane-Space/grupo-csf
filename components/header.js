function renderHeader() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const isHome = currentPage === 'index.html' || currentPage === '';
  const isNosotros = currentPage === 'nosotros.html';
  const isContacto = currentPage === 'contacto.html';

  const activeClasses = 'text-primary border-b-2 border-primary font-bold';
  const inactiveClasses = 'text-on-surface-variant';
  const navBaseClasses = 'font-medium font-label-technical text-label-technical uppercase tracking-widest hover:text-primary transition-colors duration-300';

  const headerHTML = `
    <nav class="bg-surface-container/80 backdrop-blur-xl dark:bg-surface-container/80 docked full-width top-0 sticky z-50 border-b border-white/10 flat no shadows w-full h-20 transition-all duration-300">
      <div class="max-w-[1440px] mx-auto h-full flex justify-between items-center px-mobile-margin md:px-grid-margin">
        <div class="flex items-center gap-8">
          <a class="flex items-center hover:scale-95 transition-transform duration-300" href="./index.html">
            <img src="./img/csfgrouplogo.png" alt="Grupo CSF" class="h-10 w-auto" />
          </a>
          <div class="hidden md:flex gap-8 items-center ml-8">
            <a id="nav-inicio" class="${navBaseClasses} ${isHome ? activeClasses : inactiveClasses}" href="./index.html#inicio">Inicio</a>
            <a id="nav-empresas" class="${navBaseClasses} ${inactiveClasses}" href="./index.html#empresas">Empresas</a>
            <a id="nav-nosotros" class="${navBaseClasses} ${isNosotros ? activeClasses : inactiveClasses}" href="./nosotros.html">Nosotros</a>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <a class="hidden md:inline-flex bg-primary text-on-primary px-8 py-3 font-cta-text text-cta-text uppercase tracking-widest hover:bg-tertiary transition-colors duration-300 hover:shadow-[0_0_15px_rgba(246,18,18,0.4)]" href="./contacto.html">CONTÁCTANOS</a>
          <button class="md:hidden text-on-surface hover:text-primary"><span class="material-symbols-outlined">menu</span></button>
        </div>
      </div>
    </nav>
  `;

  const headerElement = document.querySelector('nav');
  if (headerElement) {
    headerElement.outerHTML = headerHTML;
  }

  if (isHome) {
    setupHomeScrollSpy(activeClasses, inactiveClasses);
  }
}

function setupHomeScrollSpy(activeClasses, inactiveClasses) {
  const navInicio = document.getElementById('nav-inicio');
  const navEmpresas = document.getElementById('nav-empresas');
  const sectionInicio = document.getElementById('inicio');
  const sectionEmpresas = document.getElementById('empresas');

  if (!navInicio || !navEmpresas || !sectionInicio || !sectionEmpresas) return;

  const setActive = (link) => {
    [navInicio, navEmpresas].forEach((el) => {
      const isActive = el === link;
      activeClasses.split(' ').forEach((c) => el.classList.toggle(c, isActive));
      inactiveClasses.split(' ').forEach((c) => el.classList.toggle(c, !isActive));
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActive(entry.target.id === 'empresas' ? navEmpresas : navInicio);
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  observer.observe(sectionInicio);
  observer.observe(sectionEmpresas);
}

document.addEventListener('DOMContentLoaded', renderHeader);
