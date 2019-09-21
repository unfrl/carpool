import React, { FunctionComponent } from "react";
import { Pane } from "evergreen-ui";

export interface IContentProps {
    children: any;
}

export const Content: FunctionComponent<IContentProps> = props => {
    return <Pane padding={16}>{props.children}</Pane>;
};
