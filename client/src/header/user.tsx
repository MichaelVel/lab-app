import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Stack,
} from '@mui/material';

import {
    Logout,
} from '@mui/icons-material';

import {useAuth} from '../context/auth';

export function AccountMenu() {
  const {user, logout} = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box 
        sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexDirection: 'row-reverse',
            paddingRight: '0.5em',
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
                {user && user.role === "student" ? 'E' : 'I' }
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar />
          {user && user.name}
        </MenuItem>
        <Divider />
        <MenuItem>
          <Button 
            onClick={logout}
            startIcon={<Logout />}
            size="small"
          >
            Cerrar Sesión
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export function UserLoginSection(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row-reverse',
        paddingRight: '0.5em',
      }}
    >
      <Stack direction="row" spacing={1}>
        <Button 
          variant="contained" 
          onClick={() => navigate("/users/register")}
          size="small"
        >
          Registrarse
        </Button>
        <Button 
          variant="outlined"
          onClick={() => navigate("/users/login")}
          size="small"
        >
          Iniciar Sesión
        </Button>
      </Stack>
    </Box>
  );
}

