### v3.5.0 - The Cloud Sync Update ☁️

Your notes, everywhere. This update introduces the backbone for cloud synchronization using your own Google Drive.

#### ☁️ Google Drive Integration
- **Private Backup**: Store your notes in a hidden `appDataFolder` on your Google Drive. It’s secure, private, and doesn't clutter your main folders.
- **Account Management**: A new profile menu lets you sign in with Google, see your account details, and check your sync status.
- **Unlimited & Free**: Since it uses your personal Drive storage, it's free for you and unlimited (up to your Drive's capacity!).
- **Storage Monitoring**: If your Google Drive is getting full (over 95%), a red warning badge and notification will alert you instantly.
- **Manual Sync**: Hit "Sync Now" anytime to push your local notes to the cloud.

#### 🛠️ Developer Setup Required
Because this uses the Google Drive API, you need to provide your own Client ID to make it work in your own environment:
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Drive API**.
3. Create an **OAuth 2.0 Client ID** (Android & Web).
4. For Android: Add your Package Name (`com.noteeeee.app`) and SHA-1 fingerprint.
5. Update the `clientId` in `src/services/GoogleDriveService.ts`.

*Never lose a thought again.*
