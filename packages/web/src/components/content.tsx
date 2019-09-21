import React, { FunctionComponent } from "react";
import { Pane } from "evergreen-ui";

export interface IContentProps {
    children: any;
}

export const Content: FunctionComponent<IContentProps> = props => {
    return (
        <Pane padding={24} width={1024} marginX="auto" marginBottom={160}>
            {props.children}
        </Pane>
    );
};
