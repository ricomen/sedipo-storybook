import { fn } from 'storybook/test';

import { createNavbar } from './Navbar';

// Простой inline-логотип, чтобы не зависеть от сетевых ресурсов в Storybook.
const LOGO_DATA_URL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">' +
      '<rect width="30" height="30" rx="6" fill="%23495057"/>' +
      '<text x="15" y="20" font-family="system-ui,sans-serif" font-size="14" ' +
      'font-weight="700" fill="white" text-anchor="middle">S</text>' +
      '</svg>',
  );

const PROD_BRAND = {
  href: '/',
  logoSrc: LOGO_DATA_URL,
  logoWidth: 30,
};

// Левая (основная) часть меню — взято 1:1 из прода.
const PROD_LEFT_ITEMS = [
  {
    type: 'link',
    label: 'Заявки',
    href: '#/orders_list_redirect/',
    active: true,
    onClick: fn(),
  },
  {
    type: 'dropdown',
    label: 'Обучение',
    minWidth: '30rem',
    items: [
      { label: 'Учебные группы', href: '#/groups_list_redirect/', active: true },
      { label: 'Учебные потоки', href: '#/lstream_list_redirect/', active: true },
      { label: 'Расписание', href: '#/calendar' },
      { label: 'Импорт номеров удостоверений из ЕИСОТ', href: '#/eisot_import/', active: true },
    ],
  },
  {
    type: 'dropdown',
    label: 'Аналитика',
    minWidth: '30rem',
    items: [
      { label: 'Аналитика по заявкам', href: '#/orders_analytics/0', active: true },
      { label: 'Сводная таблица по заявкам', href: '#/orders_table', active: true },
      { label: 'Отчет - Федеральное статистическое наблюдение', href: '#/stat_report' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Контрагенты',
    minWidth: '20rem',
    items: [
      { label: 'Контрагенты', href: '#/counterparty_list' },
      { label: 'Список слушателей', href: '#/students_list_home/0', active: true },
    ],
  },
  {
    type: 'dropdown',
    label: 'Настройки',
    minWidth: '20rem',
    items: [
      { label: 'Категории', href: '#/course_category_list' },
      { label: 'Курсы', href: '#/courses_list' },
      { label: 'Состав комиссии', href: '#/teachers_commission_list' },
      { label: 'Преподаватели', href: '#/teacher_list', active: true },
      { label: 'Шаблоны документов', href: '#/template_list' },
    ],
  },
  {
    type: 'link',
    label: 'Контакты',
    href: '/#/contacts/#',
    onClick: fn(),
  },
];

// Правая часть — иконки уведомлений и пользователя.
const PROD_RIGHT_ITEMS = [
  {
    type: 'dropdown',
    icon: 'bell-fill',
    iconOnly: true,
    alignEnd: true,
    minWidth: '45rem',
    items: [
      {
        label:
          'Уведомления об окончании срока действия документов сотрудников организаций',
        href: '#/validity_period_counterparty_list',
        active: true,
      },
    ],
  },
  {
    type: 'dropdown',
    icon: 'person-circle',
    label: 'demo',
    alignEnd: true,
    minWidth: '15rem',
    items: [
      { label: 'Настройки аккаунта', href: '#/accountedit/6' },
      { label: 'Реквизиты организации', href: '#/self_list/' },
      { divider: true },
      { label: 'Роли пользователей', href: '#/rolelist' },
      { label: 'Настройки доступа администраторов', href: '#/accountslist' },
      { divider: true },
      { label: 'Выход', href: '#/logout?logout=1', onClick: fn() },
    ],
  },
];

export default {
  title: 'Example/Navbar',
  tags: ['autodocs'],
  render: (args) => createNavbar(args),
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    expand: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    theme: {
      control: { type: 'inline-radio' },
      options: ['light', 'dark'],
    },
    bgColor: { control: 'color' },
    containerFluid: { control: 'boolean' },
    showOffcanvasToggler: { control: 'boolean' },
    brand: { control: 'object' },
    items: { control: 'object' },
    rightItems: { control: 'object' },
  },
  args: {
    brand: PROD_BRAND,
    items: PROD_LEFT_ITEMS,
    rightItems: PROD_RIGHT_ITEMS,
    expand: 'lg',
    theme: 'light',
    bgColor: 'rgb(197, 197, 197)',
    containerFluid: true,
    showOffcanvasToggler: true,
  },
};

export const Production = {
  name: 'Прод-навбар',
  args: {},
};

export const WithoutBackgroundOverride = {
  name: 'Без bg-color override',
  args: { bgColor: undefined },
};

export const DarkTheme = {
  name: 'Тёмная тема',
  args: { theme: 'dark', bgColor: '#212529' },
};

export const Minimal = {
  name: 'Минимум — бренд + 2 ссылки',
  args: {
    brand: { ...PROD_BRAND, label: 'Sedipo' },
    items: [
      { type: 'link', label: 'Главная', href: '#/', active: true },
      { type: 'link', label: 'О нас', href: '#/about' },
      { type: 'link', label: 'Контакты', href: '#/contacts' },
    ],
    rightItems: [],
    showOffcanvasToggler: false,
  },
};

export const OnlyDropdowns = {
  name: 'Только dropdown-меню',
  args: {
    rightItems: [],
    showOffcanvasToggler: false,
    items: PROD_LEFT_ITEMS.filter((item) => item.type === 'dropdown'),
  },
};
