import React from "react";

export interface IConditionalProps {
    shouldDisplay?: boolean;
    children: any;
}

/**
 * Simple utility component that will only render its children if `shouldDisplay === true`.
 */
export const Conditional: React.FC<IConditionalProps> = props => {
    const { shouldDisplay, children } = props;
    return !!shouldDisplay ? children : null;
};
