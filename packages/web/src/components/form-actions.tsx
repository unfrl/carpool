import React, { FunctionComponent } from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    actions: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2),
    },
    cancel: {
        marginRight: theme.spacing(1),
    },
}));

export interface IFormActionsProps {
    confirmText?: string;
    canSave: boolean;
    onCancel: () => void;
}

export const FormActions: FunctionComponent<IFormActionsProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.actions}>
            <Button variant="contained" color="primary" type="submit" disabled={!props.canSave}>
                {props.confirmText || "Finish"}
            </Button>
            <Button className={classes.cancel} onClick={props.onCancel}>
                Cancel
            </Button>
        </div>
    );
};
