import React from "react";
import { Link } from "@material-ui/core";

const getHrefPrefix = (type: ActionLinkType): string => {
    switch (type) {
        case "phone":
            return "tel:";
        case "address":
            return "https://maps.google.com/?q=";
        case "email":
            return "mailto:";
        default:
            throw new Error("Unrecognized action link type");
    }
};

export type ActionLinkType = "phone" | "address" | "email";

export interface IActionLinkProps {
    /**
     * Type of link - this determines the href prefix and corresponding app it'll open.
     */
    type: ActionLinkType;
    /**
     * Value the href will link to.
     */
    link: string;
    /**
     * Text to render for link.
     */
    children: string;
}

/**
 * Simple link wrapper that will open app/web page corresponding to the action type.
 */
export const ActionLink: React.FC<IActionLinkProps> = props => {
    const { type, link, children } = props;
    const prefix = getHrefPrefix(type);
    const href = `${prefix}${link}`;

    return (
        <Link href={href} target="_blank">
            {children}
        </Link>
    );
};
