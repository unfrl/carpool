import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => (
    createStyles({
        root: {
            width: '100%',
        },
        grow: {
            flexGrow: 1,
        },
        actions: {
            display: 'flex',
            alignItems: 'center',
        },
        signup: {
            marginLeft: theme.spacing.unit,
        },
    })
);

export interface IHeaderProps extends WithStyles<typeof styles> { }

function Header(props: IHeaderProps) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Car Pool
                    </Typography>
                    <div className={classes.grow} />
                    <div>
                        <Button
                            variant="text"
                            color="inherit"
                        >
                            Sign In
                        </Button>
                        <Button
                            className={classes.signup}
                            variant="contained"
                            color="secondary"
                        >
                            Sign up
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);