// Bootstrap-based navbar c вложенными dropdown-меню.
//
// Поддерживает «прод-style» структуру:
//   - бренд-логотип слева (`navbar-brand` с <img>);
//   - левая группа `navbar-nav`: ссылки + dropdown-меню с произвольным min-width;
//   - правая группа (`d-flex ms-auto`): обычно icon-only / icon+text dropdown'ы;
//   - кнопка `navbar-toggler` (для мобильного offcanvas).
//
// Дропдауны работают через Bootstrap JS (`data-bs-toggle="dropdown"`).
// Импортируем только нужный модуль, чтобы не тянуть весь bundle.
import 'bootstrap/js/dist/dropdown';

const NAV_ITEM_TYPES = new Set(['link', 'dropdown']);

const createIcon = (name, extraClass = '') => {
  const i = document.createElement('i');
  i.className = ['bi', `bi-${name}`, extraClass].filter(Boolean).join(' ');
  i.setAttribute('aria-hidden', 'true');
  return i;
};

const createDropdownMenuItem = (item = {}) => {
  const li = document.createElement('li');

  if (item.divider) {
    const hr = document.createElement('hr');
    hr.className = 'dropdown-divider';
    li.appendChild(hr);
    return li;
  }

  if (item.header) {
    const h = document.createElement('h6');
    h.className = 'dropdown-header';
    h.innerText = item.label || '';
    li.appendChild(h);
    return li;
  }

  const a = document.createElement('a');
  a.href = item.href || '#';
  a.className = ['dropdown-item', item.active ? 'active' : ''].filter(Boolean).join(' ');
  if (item.active) a.setAttribute('aria-current', 'page');
  a.innerText = item.label || '';

  if (item.onClick) {
    a.addEventListener('click', (event) => {
      event.preventDefault();
      item.onClick(event);
    });
  }

  li.appendChild(a);
  return li;
};

const createNavbarLink = (item = {}) => {
  const li = document.createElement('li');
  li.className = 'nav-item';

  const a = document.createElement('a');
  a.href = item.href || '#';
  a.className = ['nav-link', item.active ? 'active' : ''].filter(Boolean).join(' ');
  if (item.active) a.setAttribute('aria-current', 'page');
  a.innerText = item.label || '';

  if (item.onClick) {
    a.addEventListener('click', (event) => {
      event.preventDefault();
      item.onClick(event);
    });
  }

  li.appendChild(a);
  return li;
};

const createNavbarDropdown = (item = {}) => {
  const {
    label,
    icon,
    iconOnly = false,
    items = [],
    minWidth,
    alignEnd = false,
    autoClose = 'outside',
  } = item;

  const li = document.createElement('li');
  li.className = 'nav-item dropdown';

  const toggle = document.createElement('a');
  toggle.href = '#';
  toggle.className = 'nav-link dropdown-toggle';
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('data-bs-toggle', 'dropdown');
  toggle.setAttribute('data-bs-auto-close', String(autoClose));
  toggle.setAttribute('aria-expanded', 'false');

  if (icon) toggle.appendChild(createIcon(icon));
  if (label && !iconOnly) {
    if (icon) toggle.appendChild(document.createTextNode(' '));
    toggle.appendChild(document.createTextNode(label));
  }
  li.appendChild(toggle);

  const menu = document.createElement('ul');
  menu.className = ['dropdown-menu', 'shadow', alignEnd ? 'dropdown-menu-end' : '']
    .filter(Boolean)
    .join(' ');
  if (minWidth) menu.style.setProperty('--bs-dropdown-min-width', minWidth);

  items.forEach((sub) => menu.appendChild(createDropdownMenuItem(sub)));
  li.appendChild(menu);

  return li;
};

const createNavList = (items, className = 'navbar-nav mb-2 mb-lg-0') => {
  const ul = document.createElement('ul');
  ul.className = className;

  items.forEach((item) => {
    const type = NAV_ITEM_TYPES.has(item.type) ? item.type : 'link';
    if (type === 'dropdown') ul.appendChild(createNavbarDropdown(item));
    else ul.appendChild(createNavbarLink(item));
  });

  return ul;
};

const createBrand = (brand) => {
  if (!brand) return null;

  const a = document.createElement('a');
  a.className = 'navbar-brand';
  a.href = brand.href || '/';
  a.style.marginLeft = '8px';

  if (brand.logoSrc) {
    const img = document.createElement('img');
    img.src = brand.logoSrc;
    img.width = brand.logoWidth || 30;
    if (brand.logoHeight) img.height = brand.logoHeight;
    img.alt = brand.label || 'Logo';
    a.appendChild(img);
  }

  if (brand.label) {
    if (brand.logoSrc) a.appendChild(document.createTextNode(' '));
    a.appendChild(document.createTextNode(brand.label));
  }

  return a;
};

const createOffcanvasToggler = ({ target = '#offcanvas' } = {}) => {
  const wrap = document.createElement('div');
  wrap.className = 'navbar-brand';
  wrap.style.marginLeft = '8px';

  const btn = document.createElement('button');
  btn.className = 'navbar-toggler';
  btn.type = 'button';
  btn.setAttribute('data-bs-toggle', 'offcanvas');
  btn.setAttribute('data-bs-target', target);
  btn.setAttribute('aria-controls', target.replace(/^#/, ''));
  btn.setAttribute('aria-label', 'Toggle navigation');

  const icon = document.createElement('span');
  icon.className = 'navbar-toggler-icon';
  btn.appendChild(icon);

  wrap.appendChild(btn);
  return wrap;
};

export const createNavbar = ({
  brand,
  items = [],
  rightItems = [],
  expand = 'lg',
  theme = 'light',
  bgColor,
  containerFluid = true,
  showOffcanvasToggler = true,
  offcanvasTarget = '#offcanvas',
  collapseId = 'navbar-content',
} = {}) => {
  const nav = document.createElement('nav');
  nav.className = `navbar navbar-expand-${expand} bg-light bg-body-tertiary`;
  nav.setAttribute('data-bs-theme', theme);
  if (bgColor) nav.style.backgroundColor = bgColor;

  const container = document.createElement('div');
  container.className = containerFluid ? 'container-fluid' : 'container';

  const brandEl = createBrand(brand);
  if (brandEl) container.appendChild(brandEl);

  const collapse = document.createElement('div');
  collapse.className = 'collapse navbar-collapse';
  collapse.id = collapseId;

  collapse.appendChild(createNavList(items));

  if (rightItems && rightItems.length > 0) {
    const right = document.createElement('div');
    right.className = 'd-flex ms-auto';
    right.appendChild(createNavList(rightItems));
    collapse.appendChild(right);
  }

  container.appendChild(collapse);

  if (showOffcanvasToggler) {
    container.appendChild(createOffcanvasToggler({ target: offcanvasTarget }));
  }

  nav.appendChild(container);
  return nav;
};
