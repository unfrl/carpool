import React, { FunctionComponent } from "react";
import { Pane, Heading, Button } from "evergreen-ui";

import { AppLogo } from "./app-logo";

export interface IAppHeaderProps {
    title?: string;
    onCreateCarpool: () => void;
}

export const AppHeader: FunctionComponent<IAppHeaderProps> = props => {
    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height={56}
            width="100%"
            paddingLeft={16}
            paddingRight={16}
            borderBottom
            position="sticky"
            zIndex={9}
            top={0}
        >
            <Pane display="flex" alignItems="center">
                <AppLogo />
                <Heading marginLeft={4}>{props.title || "CARPOOL"}</Heading>
            </Pane>
            <Pane display="flex">
                <Button appearance="minimal">Sign in</Button>
                <Button appearance="primary" onClick={props.onCreateCarpool} marginLeft={8}>
                    Get started
                </Button>
            </Pane>
        </Pane>
    );
};
