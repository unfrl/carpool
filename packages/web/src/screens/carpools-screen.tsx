import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";

import { CarpoolStore } from "@carpool/core";

export interface ICarpoolsScreenProps extends RouteComponentProps {
    carpoolStore: CarpoolStore;
}

export const CarpoolsScreen: FunctionComponent<ICarpoolsScreenProps> = observer(props => {
    return <div>TODO!!!!</div>;
});
