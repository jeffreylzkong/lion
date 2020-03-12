const fs = require('fs');
const path = require('path');

module.exports = {
  stories: ['../ftnt/*/stories/*.stories.{js,mdx}'],
  esDevServer: {
    nodeResolve: true,
    watch: true,
    open: true,
  },
  rollup: configs => {
    // temporarily hard copy all needed global files as all tested rollup plugins flatten the
    // directory structure
    // `rollup-plugin-copy` might work if issue 37 is resolved
    // https://github.com/vladshcherbin/rollup-plugin-copy/issues/37
    for (const config of configs) {
      config.plugins.push({
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'packages/form-system/dev-assets/FormatMixinDiagram-1.svg',
            source: fs.readFileSync(
              path.join(__dirname, '../packages/form-system/dev-assets/FormatMixinDiagram-1.svg'),
            ),
          });
          this.emitFile({
            type: 'asset',
            fileName: 'packages/form-system/dev-assets/FormatMixinDiagram-2.svg',
            source: fs.readFileSync(
              path.join(__dirname, '../packages/form-system/dev-assets/FormatMixinDiagram-2.svg'),
            ),
          });
          this.emitFile({
            type: 'asset',
            fileName: 'packages/form-system/dev-assets/FormatMixinDiagram-3.svg',
            source: fs.readFileSync(
              path.join(__dirname, '../packages/form-system/dev-assets/FormatMixinDiagram-3.svg'),
            ),
          });
        },
      });
    }
  },
};
