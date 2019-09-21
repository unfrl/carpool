import React, { FunctionComponent } from "react";
import { Pane, Icon } from "evergreen-ui";

const blue = "rgb(16, 112, 202)";

export const AppLogo: FunctionComponent = () => {
    return (
        <Pane
            border
            borderRadius="50%"
            height={24}
            width={24}
            padding={4}
            backgroundColor={blue}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Icon icon="drive-time" color="#fff" />
        </Pane>
    );
};
