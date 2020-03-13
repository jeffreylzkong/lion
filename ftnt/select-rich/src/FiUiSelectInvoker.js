import { css } from '../../../packages/core/index.js';

import { LionSelectInvoker } from '../../../packages/select-rich/index.js';

export class FiUiSelectInvoker extends LionSelectInvoker {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          position: relative;
          background-color: #fff;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          width: 100%;
          height: 32px;
        }

        .btn {
          background: transparent;
        }

        :host(:hover) .btn {
          background: transparent;
        }

        #content-wrapper {
          flex: 1;
        }

        ::slotted([slot='after']) {
          display: inline-block;
          color: inherit;
          font-style: normal;
          line-height: 0;
          text-transform: none;
          vertical-align: -0.125em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: absolute;
          top: 53%;
          right: 11px;
          width: 12px;
          height: 12px;
          margin-top: -6px;
          color: rgba(0, 0, 0, 0.25);
          font-size: 12px;
          line-height: 1;
          text-align: center;
          pointer-events: none;
          transition: transform 0.3s;
        }

        :host([aria-expanded='true']) ::slotted([slot='after']) {
          transform: rotate(180deg);
        }
      `,
    ];
  }
}
