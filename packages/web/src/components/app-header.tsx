import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Pane, Heading, Button } from "evergreen-ui";

import { AppLogo } from "./app-logo";

export interface IAppHeaderProps {
    title?: string;
    onCreateCarpool: () => void;
}

export const AppHeader: FunctionComponent<IAppHeaderProps> = props => {
    // TODO: link+styles can be moved to sep. component, maybe ButtonLink?
    const linkStyles = { textDecoration: "none", color: "inherit" };

    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height={56}
            width="100%"
            paddingLeft={16}
            paddingRight={16}
            position="sticky"
            zIndex={9}
            top={0}
            elevation={1}
        >
            <Link to="/" style={linkStyles}>
                <Pane display="flex" alignItems="center">
                    <AppLogo />
                    <Heading marginLeft={4}>{props.title || "CARPOOL"}</Heading>
                </Pane>
            </Link>
            <Pane display="flex">
                <Button appearance="minimal">
                    <Link to="/sign-in" style={linkStyles}>
                        Sign in
                    </Link>
                </Button>
                <Button appearance="primary" onClick={props.onCreateCarpool} marginLeft={8}>
                    <Link to="/get-started" style={linkStyles}>
                        Get started
                    </Link>
                </Button>
            </Pane>
        </Pane>
    );
};
