import { useState, useRef } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Divider
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BackupIcon from '@mui/icons-material/Backup';

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface BackupMenuProps {
    onExport: () => void;
    onMultipartExport: () => void;
    onImport: (files: FileList) => void;
}

export const BackupMenu = ({ onExport, onMultipartExport, onImport }: BackupMenuProps) => {
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
        const files = event.target.files;
        if (files && files.length > 0) {
            onImport(files);
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
                        minWidth: 200,
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
                    <ListItemText>Export (JSON)</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => { onMultipartExport(); handleClose(); }}>
                    <ListItemIcon>
                        <CreateNewFolderIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Multipart Save (ZIP)</ListItemText>
                </MenuItem>

                <Divider sx={{ my: 0.5, opacity: 0.1 }} />

                <MenuItem onClick={handleImportClick}>
                    <ListItemIcon>
                        <FileUploadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Import Data / ZIP</ListItemText>
                </MenuItem>
            </Menu>

            {/* Hidden file input for import */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json,.zip"
                multiple
                onChange={handleFileChange}
            />
        </>
    );
};
