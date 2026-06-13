import {
  BADGE_SIZES,
  BADGE_SOFT_VARIANTS,
  BADGE_VARIANTS,
  createBadge,
  createPositionedBadge,
} from './Badge';

const wrap = (children, { gap = '0.5rem', align = 'center' } = {}) => {
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.alignItems = align;
  row.style.gap = gap;
  children.forEach((child) => row.appendChild(child));
  return row;
};

const section = (title, content) => {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '1.5rem';

  const heading = document.createElement('h6');
  heading.innerText = title;
  heading.style.margin = '0 0 0.5rem';
  heading.style.fontFamily = 'system-ui, sans-serif';
  heading.style.color = '#555';

  wrapper.appendChild(heading);
  wrapper.appendChild(content);
  return wrapper;
};

export default {
  title: 'Example/Badge',
  tags: ['autodocs'],
  render: (args) => createBadge(args),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: BADGE_VARIANTS,
    },
    size: {
      control: { type: 'inline-radio' },
      options: BADGE_SIZES,
    },
    soft: {
      control: 'boolean',
      description:
        'Soft-вариант — приглушённый фон + emphasis-цвет текста. ' +
        'Доступные цвета: `BADGE_SOFT_VARIANTS`.',
    },
    label: { control: 'text' },
    icon: {
      control: 'text',
      description: 'Имя bi-иконки без префикса (например, `check-circle-fill`).',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    soft: false,
    label: 'Badge',
    icon: '',
  },
};

export const Primary = {
  args: { variant: 'primary', label: 'Primary' },
};

export const Secondary = {
  args: { variant: 'secondary', label: 'Secondary' },
};

export const Success = {
  args: { variant: 'success', label: 'Success' },
};

export const Warning = {
  args: { variant: 'warning', label: 'Warning' },
};

export const Danger = {
  args: { variant: 'danger', label: 'Danger' },
};

export const Light = {
  args: { variant: 'light', label: 'Light' },
};

export const Dark = {
  args: { variant: 'dark', label: 'Dark' },
};

export const Small = {
  name: 'Размер · sm',
  args: { variant: 'primary', size: 'sm', label: 'Small' },
};

export const SoftPrimary = {
  name: 'Soft · primary',
  args: { variant: 'primary', soft: true, label: 'Primary' },
};

export const SoftSuccess = {
  name: 'Soft · success',
  args: { variant: 'success', soft: true, label: 'Success' },
};

export const SoftDanger = {
  name: 'Soft · danger',
  args: { variant: 'danger', soft: true, label: 'Danger' },
};

export const SoftWarning = {
  name: 'Soft · warning',
  args: { variant: 'warning', soft: true, label: 'Warning' },
};

export const SoftLight = {
  name: 'Soft · light',
  args: { variant: 'light', soft: true, label: 'Light' },
};

export const WithIcon = {
  name: 'С иконкой',
  args: {
    variant: 'success',
    label: 'Готово',
    icon: 'check-circle-fill',
  },
};

export const InHeading = {
  name: 'Внутри заголовка',
  parameters: { controls: { disable: true } },
  render: () => {
    const h = document.createElement('h3');
    h.style.fontFamily = 'system-ui, sans-serif';
    h.style.margin = '0';
    h.append('Заголовок страницы ');
    h.appendChild(createBadge({ variant: 'secondary', label: 'New' }));
    return h;
  },
};

export const InButton = {
  name: 'Внутри кнопки',
  parameters: { controls: { disable: true } },
  render: () => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.append('Уведомления ');
    btn.appendChild(createBadge({ variant: 'light', label: '4' }));
    return btn;
  },
};

export const Positioned = {
  name: 'Позиционированный (нотификация)',
  parameters: { controls: { disable: true } },
  render: () => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary';
    btn.innerText = 'Входящие';

    return createPositionedBadge({
      target: btn,
      variant: 'danger',
      label: '99+',
      visuallyHiddenLabel: 'непрочитанных сообщений',
    });
  },
};

export const PositionedDot = {
  name: 'Позиционированный · точка',
  parameters: { controls: { disable: true } },
  render: () => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-secondary';
    btn.append('Профиль');

    const wrapper = createPositionedBadge({
      target: btn,
      variant: 'danger',
      label: '',
      visuallyHiddenLabel: 'новые уведомления',
    });

    const badge = wrapper.querySelector('.badge');
    badge.classList.add('p-2', 'border', 'border-light');
    badge.style.minWidth = '0.75rem';
    badge.style.minHeight = '0.75rem';

    return wrapper;
  },
};

export const AllColors = {
  name: 'Все цвета',
  parameters: { controls: { disable: true } },
  render: () =>
    wrap(
      BADGE_VARIANTS.map((variant) =>
        createBadge({ variant, label: variant }),
      ),
    ),
};

export const AllSoftColors = {
  name: 'Все цвета · soft',
  parameters: { controls: { disable: true } },
  render: () =>
    wrap(
      BADGE_SOFT_VARIANTS.map((variant) =>
        createBadge({ variant, soft: true, label: variant }),
      ),
    ),
};

export const AllSizes = {
  name: 'Все размеры',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');
    root.style.fontFamily = 'system-ui, sans-serif';

    root.appendChild(
      section(
        'Solid',
        wrap(
          BADGE_SIZES.map((size) =>
            createBadge({ variant: 'primary', size, label: `Size ${size}` }),
          ),
          { align: 'baseline' },
        ),
      ),
    );

    root.appendChild(
      section(
        'Soft',
        wrap(
          BADGE_SIZES.map((size) =>
            createBadge({ variant: 'primary', soft: true, size, label: `Soft ${size}` }),
          ),
          { align: 'baseline' },
        ),
      ),
    );

    return root;
  },
};
