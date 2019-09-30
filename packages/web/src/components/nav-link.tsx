import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export interface INavLinkProps {
    to: string;
    children: any;
}

export const NavLink: FunctionComponent<INavLinkProps> = props => {
    return (
        <Link to={props.to} style={{ textDecoration: "none", color: "inherit" }}>
            {props.children}
        </Link>
    );
};
