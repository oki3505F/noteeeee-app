import { useState } from 'react';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Divider,
    ListItemIcon,
    Button,
    CircularProgress,
    Tooltip,
    Badge,
    Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import WarningIcon from '@mui/icons-material/Warning';
import { GoogleUser } from '../services/GoogleDriveService';

interface AccountMenuProps {
    user: GoogleUser | null;
    onLogin: () => void;
    onLogout: () => void;
    onSync: () => void;
    isSyncing: boolean;
    lastSynced: string | null;
    isQuotaFull: boolean;
}

export const AccountMenu = ({
    user,
    onLogin,
    onLogout,
    onSync,
    isSyncing,
    lastSynced,
    isQuotaFull
}: AccountMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!user) {
        return (
            <Tooltip title="Connect Google Drive">
                <IconButton onClick={onLogin} color="inherit">
                    <CloudUploadIcon />
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <>
            <Tooltip title="Cloud Sync Settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={isQuotaFull ? <WarningIcon sx={{ color: '#ff5252', fontSize: 14 }} /> : null}
                    >
                        <Avatar
                            alt={user.name}
                            src={user.imageUrl}
                            sx={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.2)' }}
                        />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        backgroundColor: '#1e1e1e',
                        color: 'white',
                        minWidth: 200,
                        overflow: 'visible',
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: '#1e1e1e',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>{user.email}</Typography>
                </Box>

                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

                <Box sx={{ p: 2 }}>
                    <Stack spacing={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="caption" color="text.secondary">Cloud Sync</Typography>
                            {isSyncing ? <CircularProgress size={12} color="primary" /> : <CloudDoneIcon sx={{ fontSize: 14, color: 'primary.main' }} />}
                        </Box>
                        <Typography variant="caption" sx={{ display: 'block' }}>
                            Last synced: {lastSynced || 'Never'}
                        </Typography>
                        {isQuotaFull && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                                <WarningIcon sx={{ color: '#ff5252', fontSize: 14 }} />
                                <Typography variant="caption" sx={{ color: '#ff5252', fontWeight: 600 }}>
                                    Google Drive Storage is Full!
                                </Typography>
                            </Box>
                        )}
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<CloudUploadIcon />}
                            onClick={() => { onSync(); handleClose(); }}
                            disabled={isSyncing}
                            sx={{ mt: 1, borderRadius: 2 }}
                        >
                            Sync Now
                        </Button>
                    </Stack>
                </Box>

                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

                <MenuItem onClick={() => { onLogout(); handleClose(); }} sx={{ color: '#ff5252', py: 1.5 }}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" sx={{ color: '#ff5252' }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};
