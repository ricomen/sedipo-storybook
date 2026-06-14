import Tooltip from 'bootstrap/js/dist/tooltip';

export const TOOLTIP_PLACEMENTS = ['top', 'right', 'bottom', 'left'];

export const mountTooltips = (root) => {
  root.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
    Tooltip.getOrCreateInstance(el);
  });
  return root;
};

export const createTooltipTarget = ({
  label = 'Наведите курсор',
  tooltip = 'Подсказка Bootstrap',
  placement = 'top',
  variant = 'secondary',
} = {}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `btn btn-${variant}`;
  btn.innerText = label;
  btn.setAttribute('data-bs-toggle', 'tooltip');
  btn.setAttribute('data-bs-placement', placement);
  btn.setAttribute('title', tooltip);
  return btn;
};

export const createTooltipDemo = (args = {}) => {
  const root = document.createElement('div');
  root.style.display = 'flex';
  root.style.flexWrap = 'wrap';
  root.style.gap = '0.75rem';
  root.style.padding = '3rem 1rem';

  if (args.showAllPlacements) {
    TOOLTIP_PLACEMENTS.forEach((placement) => {
      root.appendChild(
        createTooltipTarget({
          label: placement,
          tooltip: `Tooltip · ${placement}`,
          placement,
          variant: args.variant,
        }),
      );
    });
  } else {
    root.appendChild(createTooltipTarget(args));
  }

  mountTooltips(root);
  return root;
};
