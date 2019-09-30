import * as React from "react";
import * as ReactDOM from "react-dom";
import * as history from "history";
import { Provider } from "mobx-react";
import { syncHistoryWithStore, RouterStore } from "mobx-react-router";
import { Router, withRouter } from "react-router";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import { RootStore } from "@carpool/core";
import { App } from "./app";

const rootStore = new RootStore();
const routerStore = new RouterStore();
const stores = { ...rootStore, routerStore };

const browserHistory = history.createBrowserHistory();
const historyWithStore = syncHistoryWithStore(browserHistory, routerStore);
const AppWithRouter = withRouter(App);

ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider {...stores}>
            <Router history={historyWithStore}>
                <AppWithRouter />
            </Router>
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById("root")
);
