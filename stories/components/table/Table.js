const defaultColumns = [
  { key: 'id', label: '#' },
  { key: 'firstName', label: 'First' },
  { key: 'lastName', label: 'Last' },
  { key: 'handle', label: 'Handle' },
];

const defaultRows = [
  { id: 1, firstName: 'Mark', lastName: 'Otto', handle: '@mdo' },
  { id: 2, firstName: 'Jacob', lastName: 'Thornton', handle: '@fat' },
  { id: 3, firstName: 'Larry', lastName: 'the Bird', handle: '@twitter' },
];

export const createTable = ({
  columns = defaultColumns,
  rows = defaultRows,
  variant = 'default',
  size = 'medium',
  striped = false,
  bordered = false,
  hover = false,
  responsive = false,
  caption = '',
} = {}) => {
  const table = document.createElement('table');

  const classes = ['table', 'storybook-table'];
  if (variant && variant !== 'default') classes.push(`table-${variant}`);
  if (striped) classes.push('table-striped');
  if (bordered) classes.push('table-bordered');
  if (hover) classes.push('table-hover');
  if (size === 'small') classes.push('table-sm');
  if (size === 'large') classes.push('storybook-table--lg');
  table.className = classes.join(' ');

  if (caption) {
    const cap = document.createElement('caption');
    cap.innerText = caption;
    table.appendChild(cap);
  }

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  columns.forEach((col) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.innerText = col.label;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    columns.forEach((col, idx) => {
      const cell = idx === 0 ? document.createElement('th') : document.createElement('td');
      if (idx === 0) cell.scope = 'row';
      cell.innerText = row[col.key] ?? '';
      tr.appendChild(cell);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  if (!responsive) return table;

  const wrapper = document.createElement('div');
  wrapper.className = 'table-responsive';
  wrapper.appendChild(table);
  return wrapper;
};
