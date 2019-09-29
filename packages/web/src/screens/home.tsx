import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Button, Pane } from "evergreen-ui";

export const Home: FunctionComponent = () => {
    return (
        <Pane display="flex" alignItems="center" justifyContent="center">
            <Link to="/create-event" style={{ textDecoration: "none", color: "inherit" }}>
                <Button appearance="primary" marginLeft={8}>
                    Create a Carpool
                </Button>
            </Link>
        </Pane>
    );
};
