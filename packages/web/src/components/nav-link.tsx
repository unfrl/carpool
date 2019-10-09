import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export interface INavLinkProps {
    /**
     * Path to link to.
     */
    to: string;
    /**
     * Link content.
     */
    children: any;
}

/**
 * Utility component for linking to pages with anchor tags but does not result in a page refresh.
 */
export const NavLink: FunctionComponent<INavLinkProps> = props => {
    return (
        <Link to={props.to} style={{ textDecoration: "none", color: "inherit" }}>
            {props.children}
        </Link>
    );
};
