import React, { FunctionComponent, Fragment } from "react";
import { Text } from "evergreen-ui";

import { AppHeader, Content } from "./components";

export const App: FunctionComponent = () => {
    return (
        <Fragment>
            <AppHeader />
            <main>
                <Content>
                    <Text>CONTENT!</Text>
                </Content>
            </main>
        </Fragment>
    );
};
