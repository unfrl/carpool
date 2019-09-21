import React, { FunctionComponent } from "react";
import { Pane, Heading } from "evergreen-ui";

export const AppHeader: FunctionComponent = () => {
    return (
        <Pane
            display="flex"
            alignItems="center"
            height={56}
            width="100%"
            paddingLeft={16}
            paddingRight={16}
            borderBottom
            position="sticky"
            zIndex={9}
            top={0}
        >
            <Heading>Header!</Heading>
        </Pane>
    );
};
