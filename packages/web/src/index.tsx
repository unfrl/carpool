import * as React from "react";
import * as ReactDOM from "react-dom";
import * as history from "history";
import { Provider } from "mobx-react";
import { syncHistoryWithStore, RouterStore } from "mobx-react-router";
import { Router, withRouter } from "react-router";

import { App } from "./app";
import * as serviceWorker from "./serviceWorker";

const routerStore = new RouterStore();
const stores = { routerStore };

const browserHistory = history.createBrowserHistory();
const historyWithStore = syncHistoryWithStore(browserHistory, routerStore);
const AppWithRouter = withRouter(App);

ReactDOM.render(
    <Provider {...stores}>
        <Router history={historyWithStore}>
            <AppWithRouter />
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
