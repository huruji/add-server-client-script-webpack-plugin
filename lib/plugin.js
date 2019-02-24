module.exports = class AddScript {
  constructor(options) {
    if (typeof options === 'string') {
      this.options = Object.assign(
        {
          hasOpen: false
        },
        {
          url: options
        }
      );
    } else {
      this.options = Object.assign(
        {
          port: 8080,
          host: 'localhost',
          protocol: 'http:',
          hasOpen: false
        },
        options
      );
    }
  }

  apply(compiler) {
    const options = this.options;
    let url;
    if (!options.protocol.endsWith(':')) options.protocol += ':';
    if (options.url) url = options.url;
    else url = `${options.protocol}//${options.host}:${options.port}`;
    compiler.hooks.afterPlugins.tap('add-server-client-script-webpack-plugin', (compiler) => {
      let { entry, mode } = compiler.options;
      if (!entry || mode !== 'development') return;
      if (typeof entry === 'string') {
        entry = [`${require.resolve('webpack-dev-server/client')}?${url}`, entry];
      } else if (Array.isArray(entry)) {
        entry.unshift(`${require.resolve('webpack-dev-server/client')}?${url}`);
      } else if (typeof entry === 'object') {
        Object.values(entry).forEach((e) => {
          if (typeof e === 'string') {
            e = [`${require.resolve('webpack-dev-server/client')}?${url}`, e];
          } else if (Array.isArray(e)) {
            e.unshift(`${require.resolve('webpack-dev-server/client')}?${url}`);
          }
        });
      }
      compiler.options.entry = entry;
    });
  }
};
