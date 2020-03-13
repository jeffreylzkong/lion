import { css } from '../../../packages/core/index.js';

import { LionSelectRich } from '../../../packages/select-rich/index.js';

import '../fi-ui-select-invoker.js';

export class FiUiSelectRich extends LionSelectRich {
  static get styles() {
    return css``;
  }

  get slots() {
    return {
      ...super.slots,
      invoker: () => document.createElement('fi-ui-select-invoker'),
    };
  }
}
