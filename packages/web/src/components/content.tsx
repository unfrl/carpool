import React, { FunctionComponent } from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    container: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(6),
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(2),
            padding: theme.spacing(2),
        },
    },
}));

export interface IContentProps {
    children: any;
}

export const Content: FunctionComponent<IContentProps> = props => {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.toolbar} />
            {props.children}
        </Container>
    );
};
