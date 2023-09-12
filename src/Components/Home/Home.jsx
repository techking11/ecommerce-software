import { AppBar, Box, Toolbar, Typography, IconButton, CssBaseline, Drawer, List, Divider, Container, Paper }
    from '@mui/material';
import { Menu as MenuIcon }
    from '@mui/icons-material';
import { useState } from 'react';
import ProductCategory from '../ProductCategory/ProductCategory';

function Home() {
    const [state, setState] = useState({ left: false });

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250, p: 3 }}
            role="fixed"
            onClick={toggleDrawer(anchor, false)}
        >
            <List>top</List>
            <Divider />
            <List>down</List>
        </Box>
    );
    return <Box>
        <CssBaseline />
        <AppBar position="static">
            <Toolbar variant="dense">
                {['left'].map((anchor) => (
                    <Box key="left">
                        <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer(anchor, true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </Box>
                ))}

                <Typography variant="h6" color="inherit" component="div">
                    E-Commerce App
                </Typography>
            </Toolbar>
        </AppBar>
        <Container>
            <ProductCategory />
        </Container>
    </Box>
}

export default Home;