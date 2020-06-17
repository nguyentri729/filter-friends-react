# Facebook Filter Friends Extensions
 - Build with React.js and Chrome's API. 
## Features

 - Filter Friends Faccebook with one click. 
 - Scan reactions and comments on Facebook posts.
 - and more features...
## Installation
>Make sure you have latest **NodeJs** version installed

Clone repo

```
git clone https://github.com/nguyentri729/filter-friends-react.git
```
Go to `filter-friends-react` directory run

```
npm install
```
Now build the extension using
```
npm build
```
You will see a `build` folder generated inside `[PROJECT_HOME]`

## Adding React app extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

<img src="https://cdn-images-1.medium.com/max/1600/1*OaygCwLSwLakyTqCADbmDw.png" />

Now click on the `LOAD UNPACKED` and browse to `[PROJECT_HOME]\build` ,This will install the React app as a Chrome extension.

When you go to any website and click on extension icon, injected page will toggle.

<img src="https://cdn-images-1.medium.com/max/1600/1*bXJYfvrcHDWKwUZCrPI-8w.png" />

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nguyentri729/filter-friends-react/. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The repo is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
