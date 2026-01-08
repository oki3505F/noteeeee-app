import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

// Initialize Google Auth
GoogleAuth.initialize({
    clientId: 'PLACEHOLDER_CLIENT_ID.apps.googleusercontent.com', // User will need to replace this
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.appdata'],
    grantOfflineAccess: true,
});

export interface GoogleUser {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    accessToken: string;
}

export class GoogleDriveService {
    private static readonly FILE_NAME = 'noteeeee_backup.json';

    static async signIn(): Promise<GoogleUser> {
        const user = await GoogleAuth.signIn();
        return {
            id: user.id,
            email: user.email,
            name: user.givenName + ' ' + user.familyName,
            imageUrl: user.imageUrl,
            accessToken: user.authentication.accessToken,
        };
    }

    static async signOut() {
        await GoogleAuth.signOut();
    }

    static async checkQuota(accessToken: string): Promise<{ usage: number; limit: number }> {
        const response = await fetch('https://www.googleapis.com/drive/v3/about?fields=storageQuota', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return {
            usage: parseInt(data.storageQuota.usage),
            limit: parseInt(data.storageQuota.limit),
        };
    }

    static async findBackupFile(accessToken: string): Promise<string | null> {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='${this.FILE_NAME}'`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await response.json();
        return data.files && data.files.length > 0 ? data.files[0].id : null;
    }

    static async downloadBackup(accessToken: string, fileId: string): Promise<any> {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await response.json();
    }

    static async uploadBackup(accessToken: string, notes: any, fileId: string | null): Promise<void> {
        const metadata = {
            name: this.FILE_NAME,
            parents: ['appDataFolder'],
        };

        const formData = new FormData();
        formData.append(
            'metadata',
            new Blob([JSON.stringify(metadata)], { type: 'application/json' })
        );
        formData.append(
            'file',
            new Blob([JSON.stringify(notes)], { type: 'application/json' })
        );

        if (fileId) {
            // Update existing file
            await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            });
        } else {
            // Create new file
            await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            });
        }
    }
}
