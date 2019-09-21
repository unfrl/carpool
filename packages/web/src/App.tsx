import React, { FunctionComponent, Fragment } from "react";
import { Text } from "evergreen-ui";

import { Header, Content } from "./components";

export const App: FunctionComponent = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <Content>
                    <Text>CONTENT!</Text>
                </Content>
            </main>
        </Fragment>
    );
};
