import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Heading, Pane, Button } from "evergreen-ui";

import { EventForm } from "../components";

export const CreateEvent: FunctionComponent = () => {
    return (
        <Pane margin="auto" width={500} maxWidth="100%" elevation={1} padding={16}>
            <Pane display="flex" alignItems="center">
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Button iconBefore="arrow-left">Back</Button>
                </Link>
                <Heading marginLeft={16}>Create Event</Heading>
            </Pane>
            <EventForm />
        </Pane>
    );
};
