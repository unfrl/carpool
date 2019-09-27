import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button, Pane } from "evergreen-ui";

export const Home: FunctionComponent = () => {
    return (
        <Pane display="flex" alignItems="center" justifyContent="center">
            <Button appearance="primary" marginLeft={8}>
                <Link to="/create-event" style={{ textDecoration: "none", color: "inherit" }}>
                    Create a Carpool
                </Link>
            </Button>
        </Pane>
    );
};
