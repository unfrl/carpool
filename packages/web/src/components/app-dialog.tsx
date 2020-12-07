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
    /**
     * Callback requesting to close the dialog.
     */
    onClose: () => void;
    /**
     * Title displayed in the dialog header.
     */
    title: string;
    /**
     * Content to be rendered in the dialog.
     */
    children: React.ReactChild;
    /**
     * Optional color scheme to use.
     */
    color?: "inherit" | "default" | "primary" | "secondary";
    /**
     * Set to true to render a fullscreen dialog.
     */
    fullScreen?: boolean;
    /**
     * Optional max width of the dialog.
     */
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Set to true to make the dialog take up its full width.
     */
    fullWidth?: boolean;
    /**
     * Optional inline styles to apply to the dialog content.
     */
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
            maxWidth={props.maxWidth}
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
            {/* <DialogContent style={props.contentStyle}>{props.children}</DialogContent> */}
            <DialogContent>{props.children}</DialogContent>
        </Dialog>
    );
};
