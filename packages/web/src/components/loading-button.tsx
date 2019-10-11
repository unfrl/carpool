import React, { FunctionComponent } from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: "relative",
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

export interface ILoadingButtonProps {
    loading: boolean;
    text: string;
    onClick?: (e: React.MouseEvent) => void;
    color?: "inherit" | "default" | "primary" | "secondary";
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
}

/**
 * Wraps the MUI Button with a loading prop that will display a circular progress inside the button and disable it.
 */
export const LoadingButton: FunctionComponent<ILoadingButtonProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button
                variant="contained"
                color={props.color}
                onClick={props.onClick}
                disabled={props.loading || props.disabled}
                type={props.type}
            >
                {props.text}
                {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
        </div>
    );
};
