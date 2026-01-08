import { useState, useRef } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BackupIcon from '@mui/icons-material/Backup';

interface BackupMenuProps {
    onExport: () => void;
    onImport: (file: File) => void;
}

export const BackupMenu = ({ onExport, onImport }: BackupMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleImportClick = () => {
        handleClose();
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImport(file);
        }
        // Reset input so the same file can be selected again if needed
        event.target.value = '';
    };

    return (
        <>
            <Tooltip title="Backup & Restore">
                <IconButton onClick={handleClick} color="inherit">
                    <BackupIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        backgroundColor: 'background.paper',
                        backgroundImage: 'none',
                        minWidth: 180,
                        borderRadius: 3,
                        '& .MuiMenuItem-root': {
                            py: 1.5,
                            mx: 1,
                            borderRadius: 2,
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => { onExport(); handleClose(); }}>
                    <ListItemIcon>
                        <FileDownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Export Data</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleImportClick}>
                    <ListItemIcon>
                        <FileUploadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Import Data</ListItemText>
                </MenuItem>
            </Menu>

            {/* Hidden file input for import */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json"
                onChange={handleFileChange}
            />
        </>
    );
};
