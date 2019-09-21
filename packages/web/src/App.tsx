import React, { FunctionComponent, Fragment } from "react";
import { Text } from "evergreen-ui";

import { AppHeader, Content } from "./components";

export const App: FunctionComponent = () => {
    const handleCreateCarpool = () => {};

    return (
        <Fragment>
            <AppHeader onCreateCarpool={handleCreateCarpool} />
            <main>
                <Content>
                    <Text>CONTENT!</Text>
                </Content>
            </main>
        </Fragment>
    );
};
