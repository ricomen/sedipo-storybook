// Foundation-story: визуализирует токены типографики, заданные в src/scss/_variables.scss
// и src/scss/_typography.scss. Подписи (font-size / weight / line-height) читаются из
// getComputedStyle отрисованного элемента — поэтому всегда совпадают с фактическим CSS,
// даже если в SCSS поменять $h*-font-size, $h*-font-weight, $h*-line-height и т.д.

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const DISPLAY_CLASSES = ['display-1', 'display-2', 'display-3', 'display-4', 'display-5', 'display-6'];

// Веса соответствуют токенам из _variables.scss: $font-weight-normal/medium/semibold/bold.
const FONT_WEIGHTS = [
  { name: '$font-weight-normal',   weight: 400, label: 'Regular' },
  { name: '$font-weight-medium',   weight: 500, label: 'Medium' },
  { name: '$font-weight-semibold', weight: 600, label: 'Semibold' },
  { name: '$font-weight-bold',     weight: 700, label: 'Bold' },
];

const sectionTitle = (text) => {
  const el = document.createElement('div');
  el.innerText = text;
  el.style.fontFamily = 'system-ui, sans-serif';
  el.style.fontSize = '12px';
  el.style.textTransform = 'uppercase';
  el.style.letterSpacing = '0.06em';
  el.style.color = '#888';
  el.style.margin = '1.5rem 0 0.75rem';
  return el;
};

// «Подпись» снизу заголовка — рисуем системным шрифтом, чтобы не мешать оценке самого заголовка.
const meta = (text) => {
  const el = document.createElement('div');
  el.innerText = text;
  el.style.fontFamily = 'system-ui, sans-serif';
  el.style.fontSize = '12px';
  el.style.color = '#888';
  el.style.marginTop = '-0.25rem';
  el.style.marginBottom = '1rem';
  return el;
};

const sample = ({ tag, className, label }) => {
  const node = document.createElement(tag || 'p');
  if (className) node.className = className;
  node.innerText = label;
  node.style.margin = '0';
  return node;
};

// Читает реально применённые стили после того, как элемент окажется в DOM.
// Storybook вставляет результат рендера после возврата из render(), поэтому
// rAF гарантированно срабатывает уже на присоединённом элементе.
const fillMetaFromComputed = (target, metaEl, prefix) => {
  requestAnimationFrame(() => {
    const cs = getComputedStyle(target);
    const px = cs.fontSize;                          // "32px"
    const rem = `${(parseFloat(px) / 16).toFixed(3).replace(/\.?0+$/, '')}rem`;
    const fw = cs.fontWeight;                        // "700"
    const lh = cs.lineHeight === 'normal'
      ? 'normal'
      : `${(parseFloat(cs.lineHeight) / parseFloat(px)).toFixed(2).replace(/\.?0+$/, '')}`;
    metaEl.innerText = `${prefix}  ·  ${rem} (${px})  ·  font-weight ${fw}  ·  line-height ${lh}`;
  });
};

export default {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Шкала заголовков и крупного текста. Размеры — `$h1-font-size`…`$h6-font-size`, ' +
          '`$display-font-sizes`, `$lead-font-size`. Веса — индивидуальные `$h1-font-weight`…`$h6-font-weight` ' +
          '(h1–h4 = 600, h5–h6 = 700) и общий `$headings-font-weight`. ' +
          'Межстрочные — `$h1-line-height`…`$h6-line-height`. ' +
          'Шкала весов шрифта — `$font-weight-normal/medium/semibold/bold` (400/500/600/700). ' +
          'Базовое семейство — `$font-family-sans-serif` (Manrope).',
      },
    },
  },
};

export const Headings = {
  name: 'Заголовки h1–h6',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');
    HEADING_TAGS.forEach((tag) => {
      const headingEl = sample({ tag, label: `${tag.toUpperCase()} — Заголовок страницы` });
      const metaEl = meta('…');
      root.appendChild(headingEl);
      root.appendChild(metaEl);
      fillMetaFromComputed(headingEl, metaEl, `<${tag}>`);
    });
    return root;
  },
};

export const HeadingClasses = {
  name: 'Классы .h1–.h6 на любом теге',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');

    const intro = document.createElement('p');
    intro.innerText =
      'Иногда нужно крупное оформление без семантики заголовка — используйте классы .h1…h6 на p/span/div.';
    intro.style.fontFamily = 'system-ui, sans-serif';
    intro.style.color = '#666';
    intro.style.marginBottom = '1rem';
    root.appendChild(intro);

    HEADING_TAGS.forEach((tag) => {
      const n = tag.replace('h', '');
      const headingEl = sample({
        tag: 'p',
        className: `h${n}`,
        label: `<p class="h${n}"> — выглядит как ${tag.toUpperCase()}`,
      });
      const metaEl = meta('…');
      root.appendChild(headingEl);
      root.appendChild(metaEl);
      fillMetaFromComputed(headingEl, metaEl, `.h${n}`);
    });
    return root;
  },
};

export const Displays = {
  name: 'Display 1–6 (.display-*)',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');
    DISPLAY_CLASSES.forEach((className) => {
      const headingEl = sample({
        tag: 'h1',
        className,
        label: `Display ${className.replace('display-', '')}`,
      });
      const metaEl = meta('…');
      root.appendChild(headingEl);
      root.appendChild(metaEl);
      fillMetaFromComputed(headingEl, metaEl, `.${className}`);
    });
    return root;
  },
};

export const Lead = {
  name: 'Lead-параграф (.lead)',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');

    const h = document.createElement('h2');
    h.innerText = 'Сервис, который заботится о ваших клиентах';
    root.appendChild(h);

    const lead = document.createElement('p');
    lead.className = 'lead';
    lead.innerText =
      'Lead-параграф используется под крупным заголовком: облегчённое начертание подчёркивает, что это ' +
      'вводный текст, а не основной контент — не отвлекает от заголовка, но и не теряется в основном тексте.';
    root.appendChild(lead);
    const leadMeta = meta('…');
    root.appendChild(leadMeta);
    fillMetaFromComputed(lead, leadMeta, '.lead');

    const body = document.createElement('p');
    body.innerText =
      'Это обычный параграф для сравнения. Между ним и lead-абзацем хорошо видна разница в размере и весе.';
    root.appendChild(body);
    const bodyMeta = meta('…');
    root.appendChild(bodyMeta);
    fillMetaFromComputed(body, bodyMeta, '<p>');

    return root;
  },
};

export const FontSizesUtilities = {
  name: 'Утилиты .fs-1 ... .fs-6',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');

    const intro = document.createElement('p');
    intro.innerText =
      'Утилитные классы из $font-sizes — те же значения, что у h1–h6, но без отступов и веса заголовка.';
    intro.style.fontFamily = 'system-ui, sans-serif';
    intro.style.color = '#666';
    intro.style.marginBottom = '1rem';
    root.appendChild(intro);

    HEADING_TAGS.forEach((_, idx) => {
      const n = idx + 1;
      const node = document.createElement('p');
      node.className = `fs-${n}`;
      node.innerText = `fs-${n} — пример текста на этом размере.`;
      node.style.margin = '0 0 0.25rem';
      root.appendChild(node);
      const m = meta('…');
      root.appendChild(m);
      fillMetaFromComputed(node, m, `.fs-${n}`);
    });

    return root;
  },
};

export const FontWeights = {
  name: 'Веса шрифта (400 / 500 / 600 / 700)',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');

    const intro = document.createElement('p');
    intro.innerText =
      'Четыре веса Manrope, объявленные в _variables.scss. Используются как напрямую, так и через токены ($h*-font-weight, $headings-font-weight, $btn-font-weight и т.д.).';
    intro.style.fontFamily = 'system-ui, sans-serif';
    intro.style.color = '#666';
    intro.style.marginBottom = '1rem';
    root.appendChild(intro);

    FONT_WEIGHTS.forEach(({ name, weight, label }) => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'baseline';
      row.style.gap = '1rem';
      row.style.marginBottom = '0.5rem';

      const sampleEl = document.createElement('span');
      sampleEl.innerText = `${label} — съешь же ещё этих мягких французских булок`;
      sampleEl.style.fontSize = '20px';
      sampleEl.style.fontWeight = String(weight);
      row.appendChild(sampleEl);

      const tag = document.createElement('code');
      tag.innerText = `${name} (${weight})`;
      tag.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace';
      tag.style.fontSize = '12px';
      tag.style.color = '#888';
      tag.style.marginLeft = 'auto';
      row.appendChild(tag);

      root.appendChild(row);
    });

    return root;
  },
};

export const InlineText = {
  name: 'Инлайновые элементы (small / strong / em / mark / s / u / abbr)',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');

    const intro = document.createElement('p');
    intro.innerText =
      'Семантические инлайн-теги, стилизуемые Bootstrap из коробки. Используйте их по смыслу, а не для оформления.';
    intro.style.fontFamily = 'system-ui, sans-serif';
    intro.style.color = '#666';
    intro.style.marginBottom = '1rem';
    root.appendChild(intro);

    const items = [
      { code: '<strong>', html: '<strong>Жирное</strong> выделение для важного фрагмента.' },
      { code: '<em>', html: '<em>Курсивное</em> выделение для смысловой акцентуации.' },
      { code: '<small>', html: 'Цена: 1 990 ₽ <small>(без НДС)</small> — small наследует $small-font-size = .75em.' },
      { code: '<mark>', html: 'Найдено совпадение по запросу <mark>интеграция</mark>.' },
      { code: '<s>', html: 'Старая цена: <s>2 490 ₽</s> — теперь 1 990 ₽.' },
      { code: '<u>', html: 'Подчёркнутый <u>фрагмент</u> — стилевое, не для ссылок.' },
      { code: '<abbr>', html: 'Технология <abbr title="Cascading Style Sheets">CSS</abbr> — наведите на сокращение.' },
    ];

    items.forEach(({ code, html }) => {
      const row = document.createElement('div');
      row.style.display = 'grid';
      row.style.gridTemplateColumns = '110px 1fr';
      row.style.alignItems = 'baseline';
      row.style.columnGap = '1rem';
      row.style.marginBottom = '0.5rem';

      const tag = document.createElement('code');
      tag.innerText = code;
      tag.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace';
      tag.style.fontSize = '12px';
      tag.style.color = '#888';
      row.appendChild(tag);

      const p = document.createElement('p');
      p.innerHTML = html;
      p.style.margin = '0';
      row.appendChild(p);

      root.appendChild(row);
    });

    return root;
  },
};

export const Showcase = {
  name: 'Сводный пример',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('article');
    root.style.maxWidth = '720px';

    root.appendChild(sectionTitle('Hero'));
    const display = document.createElement('h1');
    display.className = 'display-3';
    display.innerText = 'Заголовок страницы';
    root.appendChild(display);

    const lead = document.createElement('p');
    lead.className = 'lead';
    lead.innerText =
      'Короткое описание под крупным заголовком: расскажет, о чём раздел, и подведёт читателя к основному контенту.';
    root.appendChild(lead);

    root.appendChild(sectionTitle('Контент'));

    const h2 = document.createElement('h2');
    h2.innerText = 'Раздел второго уровня';
    root.appendChild(h2);

    const p1 = document.createElement('p');
    p1.innerText =
      'Основной текст идёт обычным начертанием с базовым размером 1rem. Заголовки h1–h4 используют Manrope ' +
      'Semibold (600), а h5–h6 — Bold (700), чтобы микрозаголовки в карточках и таблицах оставались ' +
      'различимыми на мелких размерах.';
    root.appendChild(p1);

    const h3 = document.createElement('h3');
    h3.innerText = 'Подзаголовок третьего уровня';
    root.appendChild(h3);

    const p2 = document.createElement('p');
    p2.innerText =
      'Подзаголовки h3–h4 удобны для группировки внутри длинных текстов. h5–h6 — для микрозаголовков ' +
      'в карточках, формах и таблицах.';
    root.appendChild(p2);

    const h4 = document.createElement('h4');
    h4.innerText = 'Подсекция (h4)';
    root.appendChild(h4);

    const h5 = document.createElement('h5');
    h5.innerText = 'Заголовок карточки (h5)';
    root.appendChild(h5);

    const h6 = document.createElement('h6');
    h6.innerText = 'Caption / overline (h6)';
    root.appendChild(h6);

    return root;
  },
};
