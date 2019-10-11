import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

export interface IDocumentHeadProps {
    /**
     * Optional current screen title. If provided, prepends it in the form `{screenTitle} | Carpool.
     */
    screenTitle?: string;
    /**
     * Optional page description.
     */
    description?: string;
}

/**
 * Utility component that wraps react-helmet and provides sensible page title/description defaults.
 * This component can be nested in child components which will overwrite the current title/description.
 */
export const DocumentHead: FunctionComponent<IDocumentHeadProps> = props => {
    const { screenTitle, description } = props;

    const screen = screenTitle ? `${screenTitle} | ` : "";
    const docTitle = `${screen}Carpool`;
    const desc = description || "Free carpool app for cool peeps and their friends";

    return (
        <Helmet>
            <title>{docTitle}</title>
            <meta name="description" content={desc} />
            <meta name="twitter:title" content={docTitle} />
            <meta name="twitter:description" content={desc} />
            <meta property="og:title" content={docTitle} />
            <meta property="og:description" content={desc} />
        </Helmet>
    );
};
