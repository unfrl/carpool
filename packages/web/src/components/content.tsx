import React, { FunctionComponent } from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
}));

export interface IContentProps {
    children: any;
}

export const Content: FunctionComponent<IContentProps> = props => {
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.toolbar} />
            {props.children}
        </Container>
    );
};
