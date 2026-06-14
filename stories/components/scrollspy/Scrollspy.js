import ScrollSpy from 'bootstrap/js/dist/scrollspy';

const createSection = ({ id, title, paragraphs = 3 }) => {
  const section = document.createElement('section');
  section.id = id;
  section.style.padding = '4rem 0';
  section.style.borderBottom = '1px solid #dee2e6';

  const heading = document.createElement('h4');
  heading.innerText = title;
  section.appendChild(heading);

  for (let i = 0; i < paragraphs; i += 1) {
    const p = document.createElement('p');
    p.className = 'text-body-secondary';
    p.innerText =
      `${title} — абзац ${i + 1}. Scrollspy подсвечивает активный пункт навигации при прокрутке.`;
    section.appendChild(p);
  }

  return section;
};

export const createScrollspyDemo = ({
  id = 'navbar-scrollspy',
  sections = [
    { id: 'scrollspy-first', title: 'Первый раздел' },
    { id: 'scrollspy-second', title: 'Второй раздел' },
    { id: 'scrollspy-third', title: 'Третий раздел' },
    { id: 'scrollspy-fourth', title: 'Четвёртый раздел' },
  ],
} = {}) => {
  const root = document.createElement('div');
  root.style.position = 'relative';
  root.style.border = '1px solid #dee2e6';
  root.style.borderRadius = '0.375rem';
  root.style.overflow = 'hidden';

  const nav = document.createElement('nav');
  nav.id = id;
  nav.className = 'navbar bg-body-tertiary px-3';

  const navList = document.createElement('ul');
  navList.className = 'nav nav-pills';

  sections.forEach((section, index) => {
    const item = document.createElement('li');
    item.className = 'nav-item';

    const link = document.createElement('a');
    link.className = ['nav-link', index === 0 ? 'active' : ''].filter(Boolean).join(' ');
    link.href = `#${section.id}`;
    link.innerText = section.title;
    item.appendChild(link);
    navList.appendChild(item);
  });

  nav.appendChild(navList);

  const scrollContainer = document.createElement('div');
  scrollContainer.setAttribute('data-bs-spy', 'scroll');
  scrollContainer.setAttribute('data-bs-target', `#${id}`);
  scrollContainer.setAttribute('data-bs-smooth-scroll', 'true');
  scrollContainer.setAttribute('tabindex', '0');
  scrollContainer.style.position = 'relative';
  scrollContainer.style.height = '320px';
  scrollContainer.style.overflowY = 'auto';

  const content = document.createElement('div');
  content.className = 'p-3';
  sections.forEach((section) => content.appendChild(createSection(section)));

  scrollContainer.appendChild(content);
  root.appendChild(nav);
  root.appendChild(scrollContainer);

  ScrollSpy.getOrCreateInstance(scrollContainer);
  return root;
};
