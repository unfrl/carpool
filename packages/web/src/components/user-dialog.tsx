import React, { FunctionComponent, useState, Fragment } from "react";
import { Dialog, TextInputField, Pane, Button } from "evergreen-ui";

export interface IUserDialogProps {
    onClose: () => void;
    onSignIn: (email: string, password: string) => void;
    onSignUp: (email: string, password: string, displayName: string) => void;
}

export interface IUserDialogState {
    signUp: boolean;
    email: string;
    password: string;
    displayName: string;
}

export const UserDialog: FunctionComponent<IUserDialogProps> = props => {
    const [state, setState] = useState<IUserDialogState>({
        signUp: false,
        email: "",
        password: "",
        displayName: "",
    });

    const handleToggleSignUp = () => {
        setState({ ...state, signUp: !state.signUp });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!state.email || !state.password) {
            return;
        }

        if (state.signUp) {
            if (!state.displayName) {
                return;
            }

            props.onSignUp(state.email, state.password, state.displayName);
        } else {
            props.onSignIn(state.email, state.password);
        }
    };

    return (
        <Dialog
            isShown={true}
            title={state.signUp ? "Sign Up" : "Sign In"}
            onCloseComplete={props.onClose}
            hasFooter={false}
        >
            <form onSubmit={handleSubmit}>
                {state.signUp && (
                    <TextInputField
                        label="Display name"
                        required={true}
                        value={state.displayName}
                        onChange={e => setState({ ...state, displayName: e.target.value })}
                    />
                )}
                <TextInputField
                    label="Email address"
                    required={true}
                    type="email"
                    value={state.email}
                    onChange={e => setState({ ...state, email: e.target.value })}
                />
                <TextInputField
                    label="Password"
                    required={true}
                    type="password"
                    value={state.password}
                    onChange={e => setState({ ...state, password: e.target.value })}
                />
                <Pane
                    marginTop={16}
                    display="flex"
                    flexDirection="row-reverse"
                    justifyContent="center"
                >
                    <Button appearance="primary" type="submit">
                        {state.signUp ? "Sign up" : "Sign in"}
                    </Button>
                    <Button appearance="minimal" marginRight={8} onClick={handleToggleSignUp}>
                        {state.signUp ? "Existing account" : "Create account"}
                    </Button>
                </Pane>
            </form>
        </Dialog>
    );
};
