import React, { FunctionComponent } from "react";
import {
    makeStyles,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogContent,
    AppBar,
    Toolbar,
    IconButton,
    Icon,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    appbar: {
        position: "relative",
    },
    toolbar: {
        justifyContent: "space-between",
    },
}));

export interface IAppDialog {
    onClose: () => void;
    title: string;
    children: React.ReactChild;
    color?: "inherit" | "default" | "primary" | "secondary";
    fullScreen?: boolean;
    maxWidth?: string;
    fullWidth?: boolean;
    contentStyle?: React.CSSProperties;
}

export const AppDialog: FunctionComponent<IAppDialog> = props => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            open={true}
            onClose={props.onClose}
            fullScreen={fullScreen || !!props.fullScreen}
            maxWidth={props.maxWidth as any}
            fullWidth={props.fullWidth}
        >
            <AppBar className={classes.appbar} color={props.color || "default"}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" noWrap={true}>
                        {props.title}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={props.onClose}
                        aria-label="Close"
                    >
                        <Icon>close</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent style={props.contentStyle}>{props.children}</DialogContent>
        </Dialog>
    );
};
