import React, { FunctionComponent, Fragment, useState } from "react";
import { Text } from "evergreen-ui";

import { AppHeader, Content } from "./components";

export const App: FunctionComponent = () => {
    // TODO: this is temporary for auth state
    const [temp, setTemp] = useState(false);

    const handleAuthClick = () => {
        setTemp(!temp);
    };

    return (
        <Fragment>
            <AppHeader isLoggedIn={temp} onAuthClick={handleAuthClick} />
            <main>
                <Content>
                    <Text>CONTENT!</Text>
                </Content>
            </main>
        </Fragment>
    );
};
