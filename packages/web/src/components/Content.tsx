import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => (
    createStyles({
        root: {
            paddingTop: 80,
            flex: '1 1 100%',
            maxWidth: '100%',
            margin: '0 auto',
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
        },
    })
);

export interface IContentProps extends WithStyles<typeof styles> {
    children: any;
}

function Content(props: IContentProps) {
    const { classes, children } = props;

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}

export default withStyles(styles)(Content);
