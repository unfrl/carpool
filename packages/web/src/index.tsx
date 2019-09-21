import * as React from "react";
import * as ReactDOM from "react-dom";
import * as history from "history";
import { Provider } from "mobx-react";
import { syncHistoryWithStore, RouterStore } from "mobx-react-router";
import { Router, withRouter } from "react-router";

import { App } from "./app";
import { RootStore } from "./stores";

const rootStore = new RootStore();
const routerStore = new RouterStore();
const stores = { ...rootStore, routerStore };

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
