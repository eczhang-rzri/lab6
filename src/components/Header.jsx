import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useName } from "../context/NameContext";

export default function Header() {
    const { name } = useName();

    return (
        <AppBar position="fixed" className="header" sx={{backgroundColor: "#BF5700"}} >
            <Toolbar className="toolbar">
                <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                    <Typography variant="h5">Welcome {name} to the CodeCraft Intranet</Typography>
                </Box>
                <Button component={Link} to="/" color="inherit">
                        Home
                </Button>
                <Button component={Link} to="/emp-mgmt" color="inherit">
                        Employee Management
                </Button>
            </Toolbar>
        </AppBar>
    );
}
