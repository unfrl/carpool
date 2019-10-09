import React, { Component } from "react";
import { Redirect } from "react-router";
import { CircularProgress, Typography } from "@material-ui/core";
import { observer } from "mobx-react";

import { AuthStore } from "@carpool/core";

export interface IVerificationScreenProps {
    authStore: AuthStore;
}

export interface IVerificationScreenState {
    readyForRedirect: boolean;
}

@observer
export class VerificationScreen extends Component<
    IVerificationScreenProps,
    IVerificationScreenState
> {
    public state: IVerificationScreenState = {
        readyForRedirect: false,
    };

    public async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const email = params.get("email");

        if (!token || !email) {
            this.setState({ readyForRedirect: true });
            return;
        }

        try {
            await this.props.authStore.verifyUser(email, token);
        } finally {
            this.setState({ readyForRedirect: true });
        }
    }

    public render() {
        if (this.state.readyForRedirect) {
            return <Redirect to="/" />;
        }

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6">Verifying your account...</Typography>
                <CircularProgress style={{ marginTop: 8 }} />
            </div>
        );
    }
}
