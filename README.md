# add-server-client-script-webpack-plugin
In order to solve the problem that webpack-dev-server need add script entry manually like `webpack-dev-server/client?http:localhost:8080` via node api


## How to use

```js
npm i --save-dev add-server-client-script-webpack-plugin
```

```js
// webpack.config.js
const AddServerClientScriptPlugin = reuire('add-server-client-script-webpack-plugin')

const config = {
  plugins: [
    new AddServerClientScriptPlugin({
      port: 8080
    })
  ]
}
```


## options
### port

default `8080`

### host

default `localhost`

### protocol

default `hppt:`

