import React, { FunctionComponent } from "react";

export interface IContentProps {
    children: any;
}

export const Content: FunctionComponent<IContentProps> = props => {
    return (
        <div
            style={{
                padding: 16,
            }}
        >
            {props.children}
        </div>
    );
};
