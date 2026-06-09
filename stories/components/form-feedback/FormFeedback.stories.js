// Демонстрация bootstrap-классов для подсказок и ошибок у форм:
//   .form-text          — нейтральная подсказка под полем
//   .invalid-feedback   — текст ошибки (показывается при .is-invalid / .was-validated)
//   .valid-feedback     — успешный фидбек (показывается при .is-valid / .was-validated)
//   .invalid-tooltip    — фидбек как «всплывашка»; родителю нужен .position-relative
//   .has-validation     — обязательная обвязка для input-group с фидбеком
//   .needs-validation + .was-validated — нативная HTML5-валидация формы

let uid = 0;
const nextId = (prefix = 'ff') => `${prefix}-${++uid}`;

const stack = (children, { gap = '1rem' } = {}) => {
  const root = document.createElement('div');
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = gap;
  root.style.maxWidth = '480px';
  children.forEach((c) => c && root.appendChild(c));
  return root;
};

const note = (text) => {
  const el = document.createElement('p');
  el.innerText = text;
  el.style.fontFamily = 'system-ui, sans-serif';
  el.style.fontSize = '13px';
  el.style.color = '#666';
  el.style.margin = '0';
  return el;
};

// Готовый "field": <label> + <input> + (опц.) help/feedback. Возвращает корневой div.
const field = ({
  label = 'Поле',
  type = 'text',
  state = null, // 'valid' | 'invalid' | null
  value = '',
  placeholder = '',
  required = false,
  helpText = null,
  invalidText = null,
  validText = null,
  tooltip = false, // использовать .invalid-tooltip / .valid-tooltip вместо feedback-блока
} = {}) => {
  const wrap = document.createElement('div');
  wrap.className = 'mb-0';
  if (tooltip) wrap.classList.add('position-relative');

  const inputId = nextId('input');
  const helpId = helpText ? nextId('help') : null;
  const errId = invalidText ? nextId('err') : null;
  const okId = validText ? nextId('ok') : null;

  const lab = document.createElement('label');
  lab.className = 'form-label';
  lab.setAttribute('for', inputId);
  lab.innerText = label;
  wrap.appendChild(lab);

  const input = document.createElement('input');
  input.type = type;
  input.id = inputId;
  input.className = 'form-control';
  if (state === 'invalid') input.classList.add('is-invalid');
  if (state === 'valid') input.classList.add('is-valid');
  if (value) input.value = value;
  if (placeholder) input.placeholder = placeholder;
  if (required) input.required = true;

  if (state === 'invalid') input.setAttribute('aria-invalid', 'true');

  const describedBy = [helpId, errId, okId].filter(Boolean).join(' ');
  if (describedBy) input.setAttribute('aria-describedby', describedBy);

  wrap.appendChild(input);

  if (helpText) {
    const help = document.createElement('div');
    help.id = helpId;
    help.className = 'form-text';
    help.innerText = helpText;
    wrap.appendChild(help);
  }

  if (validText) {
    const ok = document.createElement('div');
    ok.id = okId;
    ok.className = tooltip ? 'valid-tooltip' : 'valid-feedback';
    ok.innerText = validText;
    wrap.appendChild(ok);
  }

  if (invalidText) {
    const err = document.createElement('div');
    err.id = errId;
    err.className = tooltip ? 'invalid-tooltip' : 'invalid-feedback';
    err.innerText = invalidText;
    wrap.appendChild(err);
  }

  return wrap;
};

export default {
  title: 'Components/Form Feedback',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bootstrap-классы для подсказок и сообщений валидации: `.form-text`, ' +
          '`.invalid-feedback` / `.valid-feedback`, `.invalid-tooltip` / `.valid-tooltip`, ' +
          'плюс паттерны `.needs-validation` / `.was-validated` и `.has-validation` для `.input-group`.',
      },
    },
  },
};

export const HelpText = {
  name: '.form-text — подсказка под полем',
  parameters: { controls: { disable: true } },
  render: () =>
    stack([
      note('Нейтральная подсказка. Подключается к инпуту через aria-describedby — её прочитает скринридер.'),
      field({
        label: 'Пароль',
        type: 'password',
        placeholder: '••••••••',
        helpText: 'Минимум 8 символов, одна заглавная и одна цифра.',
      }),
    ]),
};

export const InvalidFeedback = {
  name: '.invalid-feedback — текст ошибки',
  parameters: { controls: { disable: true } },
  render: () =>
    stack([
      note('Показывается, когда у инпута стоит .is-invalid (или у формы — .was-validated и поле невалидно).'),
      field({
        label: 'Email',
        type: 'email',
        value: 'not-an-email',
        state: 'invalid',
        invalidText: 'Пожалуйста, введите корректный email.',
      }),
    ]),
};

export const ValidFeedback = {
  name: '.valid-feedback — успешное состояние',
  parameters: { controls: { disable: true } },
  render: () =>
    stack([
      note('Парный класс к .invalid-feedback. Показывается при .is-valid.'),
      field({
        label: 'Логин',
        value: 'ivan_petrov',
        state: 'valid',
        validText: 'Логин свободен.',
      }),
    ]),
};

export const HelpAndError = {
  name: 'Подсказка + ошибка (a11y)',
  parameters: { controls: { disable: true } },
  render: () =>
    stack([
      note('Когда есть и .form-text, и .invalid-feedback — перечислите оба id в aria-describedby и поставьте aria-invalid="true".'),
      field({
        label: 'Email',
        type: 'email',
        value: 'broken@',
        state: 'invalid',
        helpText: 'Мы не передадим email третьим лицам.',
        invalidText: 'Введите корректный email.',
      }),
    ]),
};

export const Tooltip = {
  name: '.invalid-tooltip / .valid-tooltip',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = stack([
      note('Тултип-вариант фидбека: позиционируется абсолютно, поэтому контейнеру нужен .position-relative.'),
    ]);

    const row = document.createElement('div');
    row.className = 'd-flex flex-wrap';
    row.style.gap = '2rem 1.5rem';

    const a = field({
      label: 'Город',
      value: '',
      state: 'invalid',
      placeholder: 'Например, Казань',
      invalidText: 'Укажите город.',
      tooltip: true,
    });
    a.style.minWidth = '220px';

    const b = field({
      label: 'Индекс',
      value: '420000',
      state: 'valid',
      validText: 'Выглядит корректно.',
      tooltip: true,
    });
    b.style.minWidth = '220px';

    row.appendChild(a);
    row.appendChild(b);
    root.appendChild(row);
    return root;
  },
};

export const InputGroup = {
  name: '.input-group + .has-validation',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = stack([
      note('Если поле обёрнуто в .input-group, добавьте .has-validation на контейнер — иначе ломаются скругления и фидбек может не показаться.'),
    ]);

    const group = document.createElement('div');
    group.className = 'input-group has-validation';

    const prefix = document.createElement('span');
    prefix.className = 'input-group-text';
    prefix.innerText = '@';
    group.appendChild(prefix);

    const inputId = nextId('input');
    const errId = nextId('err');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
    input.className = 'form-control is-invalid';
    input.required = true;
    input.placeholder = 'username';
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errId);
    group.appendChild(input);

    const err = document.createElement('div');
    err.id = errId;
    err.className = 'invalid-feedback';
    err.innerText = 'Укажите логин.';
    group.appendChild(err);

    const labWrap = document.createElement('div');
    const lab = document.createElement('label');
    lab.className = 'form-label';
    lab.setAttribute('for', inputId);
    lab.innerText = 'Логин';
    labWrap.appendChild(lab);
    labWrap.appendChild(group);

    root.appendChild(labWrap);
    return root;
  },
};

export const InteractiveForm = {
  name: '.needs-validation / .was-validated (интерактив)',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = stack([
      note(
        'Нажмите «Отправить» — на форму добавится .was-validated, и фидбек подсветится автоматически на основе HTML5-валидации (required, type="email" и т.д.).',
      ),
    ]);

    const form = document.createElement('form');
    form.className = 'needs-validation';
    form.noValidate = true;
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '1rem';

    form.appendChild(
      field({
        label: 'Имя',
        required: true,
        placeholder: 'Иван',
        invalidText: 'Введите имя.',
        validText: 'Ок!',
      }),
    );

    form.appendChild(
      field({
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'name@example.com',
        helpText: 'На него придёт письмо с подтверждением.',
        invalidText: 'Введите корректный email.',
        validText: 'Выглядит корректно.',
      }),
    );

    const actions = document.createElement('div');
    actions.className = 'd-flex gap-2';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'btn btn-primary';
    submit.innerText = 'Отправить';

    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'btn btn-outline-secondary';
    reset.innerText = 'Сбросить';

    actions.appendChild(submit);
    actions.appendChild(reset);
    form.appendChild(actions);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add('was-validated');
    });

    reset.addEventListener('click', () => {
      form.reset();
      form.classList.remove('was-validated');
    });

    root.appendChild(form);
    return root;
  },
};

export const AllCases = {
  name: 'Сводный пример',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');
    root.style.maxWidth = '520px';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.gap = '1.5rem';

    const block = (title, child) => {
      const wrap = document.createElement('div');
      const h = document.createElement('div');
      h.innerText = title;
      h.style.fontFamily = 'system-ui, sans-serif';
      h.style.fontSize = '12px';
      h.style.textTransform = 'uppercase';
      h.style.letterSpacing = '0.06em';
      h.style.color = '#888';
      h.style.marginBottom = '0.5rem';
      wrap.appendChild(h);
      wrap.appendChild(child);
      return wrap;
    };

    root.appendChild(
      block(
        '.form-text',
        field({
          label: 'Пароль',
          type: 'password',
          helpText: 'Минимум 8 символов, одна заглавная и одна цифра.',
        }),
      ),
    );

    root.appendChild(
      block(
        '.is-invalid + .invalid-feedback',
        field({
          label: 'Email',
          type: 'email',
          value: 'oops',
          state: 'invalid',
          invalidText: 'Пожалуйста, введите корректный email.',
        }),
      ),
    );

    root.appendChild(
      block(
        '.is-valid + .valid-feedback',
        field({
          label: 'Логин',
          value: 'ivan_petrov',
          state: 'valid',
          validText: 'Логин свободен.',
        }),
      ),
    );

    return root;
  },
};
