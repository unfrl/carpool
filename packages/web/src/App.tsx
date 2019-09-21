import * as React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';

import { Header, Content } from './components';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: indigo,
        secondary: deepOrange,
    },
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Content>
                    <Typography variant="h3">
                        WIP!
                    </Typography>
                </Content>
            </MuiThemeProvider>
        );
    }
}

export default App;
