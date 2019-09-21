import React, { FunctionComponent } from "react";
import { Pane, Heading, Button } from "evergreen-ui";

export interface IAppHeaderProps {
    title?: string;
    isLoggedIn: boolean;
    onAuthClick: () => void;
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
            <Heading>{props.title || "Carpool"}</Heading>
            <Button
                appearance={props.isLoggedIn ? "default" : "primary"}
                onClick={props.onAuthClick}
            >
                {props.isLoggedIn ? "Log out" : "Log in"}
            </Button>
        </Pane>
    );
};
