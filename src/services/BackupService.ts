import JSZip from 'jszip';
import { Note } from '../useNotes';

export class BackupService {
    private static readonly ROOT_FOLDER = 'Noteeeee_Backup';

    /**
     * Creates a ZIP file containing each note as a separate JSON file.
     */
    static async createMultipartBackup(notes: Note[]): Promise<Blob> {
        const zip = new JSZip();
        const folder = zip.folder(this.ROOT_FOLDER);

        if (!folder) throw new Error('Failed to create ZIP folder');

        notes.forEach((note) => {
            // Use a safe filename (remove illegal characters)
            const safeTitle = note.title.replace(/[/\\?%*:|"<>]/g, '-').slice(0, 50) || 'untitled';
            const fileName = `${safeTitle}_${note.id.slice(-5)}.json`;
            folder.file(fileName, JSON.stringify(note, null, 2));
        });

        // Also include a manifest for easy bulk reading
        folder.file('manifest.json', JSON.stringify({
            version: '1.0',
            exportDate: new Date().toISOString(),
            noteCount: notes.length
        }, null, 2));

        return await zip.generateAsync({ type: 'blob' });
    }

    /**
     * Parses a ZIP file or a list of JSON files into a Note array.
     */
    static async parseMultipartBackup(files: FileList | File[]): Promise<Note[]> {
        const allNotes: Note[] = [];

        for (const file of Array.from(files)) {
            if (file.name.endsWith('.zip')) {
                const zip = await JSZip.loadAsync(file);
                const filePromises: Promise<void>[] = [];

                zip.forEach((relativePath, zipEntry) => {
                    if (!zipEntry.dir && relativePath.endsWith('.json') && !relativePath.includes('manifest.json')) {
                        filePromises.push(
                            zipEntry.async('string').then((content) => {
                                try {
                                    const note = JSON.parse(content);
                                    if (note && note.id && note.title) {
                                        allNotes.push(note);
                                    }
                                } catch (e) {
                                    console.warn('Failed to parse note in ZIP:', relativePath);
                                }
                            })
                        );
                    }
                });

                await Promise.all(filePromises);
            } else if (file.name.endsWith('.json')) {
                const content = await file.text();
                try {
                    const note = JSON.parse(content);
                    if (Array.isArray(note)) {
                        allNotes.push(...note);
                    } else if (note && note.id) {
                        allNotes.push(note);
                    }
                } catch (e) {
                    console.warn('Failed to parse standalone JSON file:', file.name);
                }
            }
        }

        return allNotes;
    }
}
