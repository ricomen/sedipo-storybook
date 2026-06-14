import 'bootstrap/js/dist/tab';

export const TAB_VARIANTS = ['tabs', 'pills'];

export const createTabs = ({
  id = 'example-tabs',
  variant = 'tabs',
  items = [
    { label: 'Главная', content: 'Содержимое вкладки «Главная».', active: true },
    { label: 'Профиль', content: 'Содержимое вкладки «Профиль».' },
    { label: 'Контакты', content: 'Содержимое вкладки «Контакты».', disabled: true },
  ],
} = {}) => {
  const root = document.createElement('div');

  const nav = document.createElement('ul');
  nav.className = `nav nav-${variant}`;
  nav.setAttribute('role', 'tablist');

  const content = document.createElement('div');
  content.className = 'tab-content';

  items.forEach((item, index) => {
    const tabId = `${id}-tab-${index}`;
    const paneId = `${id}-pane-${index}`;
    const isActive = item.active ?? index === 0;

    const navItem = document.createElement('li');
    navItem.className = 'nav-item';
    navItem.setAttribute('role', 'presentation');

    const navLink = document.createElement('button');
    navLink.type = 'button';
    navLink.className = ['nav-link', isActive ? 'active' : '', item.disabled ? 'disabled' : '']
      .filter(Boolean)
      .join(' ');
    navLink.id = tabId;
    navLink.setAttribute('data-bs-toggle', 'tab');
    navLink.setAttribute('data-bs-target', `#${paneId}`);
    navLink.setAttribute('role', 'tab');
    navLink.setAttribute('aria-controls', paneId);
    navLink.setAttribute('aria-selected', isActive ? 'true' : 'false');
    if (item.disabled) navLink.setAttribute('disabled', '');
    navLink.innerText = item.label;
    navItem.appendChild(navLink);
    nav.appendChild(navItem);

    const pane = document.createElement('div');
    pane.className = ['tab-pane', 'fade', isActive ? 'show active' : ''].filter(Boolean).join(' ');
    pane.id = paneId;
    pane.setAttribute('role', 'tabpanel');
    pane.setAttribute('aria-labelledby', tabId);
    pane.setAttribute('tabindex', '0');
    pane.innerText = item.content;
    content.appendChild(pane);
  });

  root.appendChild(nav);
  root.appendChild(content);
  return root;
};
