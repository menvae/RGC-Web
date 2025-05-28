import { fs } from '@zenfs/core';
import { debugLog } from '../helpers';
import { Archive } from '../lib/libarchive/libarchive';
// import formats from "../lib/libarchive/formats"

const JSZip = (window as any).JSZip;

Archive.init({
  workerUrl: '/lib/libarchive/worker-bundle.js',
  wasmUrl: '/lib/libarchive/libarchive.wasm'
} as any);

interface ArchiveEntry {
    file: File;
    path: string;
}

export interface FileTreeNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileTreeNode[];
}

const FsStructure = {
    "MapImport": {},
    "MapExport": {},
    "MapCompressed": {},
};

export class FileManager {
    public static get fs() {
        return fs;
    }

    public get fs() {
        return fs;
    }

    async download(path: string, customFilename?: string): Promise<void> {
    try {
        const fileData = await this.fs.promises.readFile(path);

        const filename = customFilename || await this.getFileName(path);

        const mimeType = "application/octet-stream";
        const blob = new Blob([fileData], { type: mimeType });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        requestAnimationFrame(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

    } catch (error) {
        console.error("Download failed:", error);
    }
}


    async downloadFromBlob(blob: Blob, filename: string): Promise<void> {
    try {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        requestAnimationFrame(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error("Download failed:", error);
    }
}



    static async initFs(): Promise<void> {
        try {
            for (const [dirName, contents] of Object.entries(FsStructure)) {
                await fs.promises.mkdir(`/${dirName}`, { recursive: true });
                debugLog(`Created directory: /${dirName}`);
                
                if (typeof contents === 'object' && contents !== null) {
                    await FileManager.createSubdirectories(`/${dirName}`, contents);
                }
            }
            console.log("Fs initialization complete!");
        } catch (err) {
            console.error("Error initializing Fs:", err);
        }
    }

    static async createSubdirectories(parentPath: string, structure: object): Promise<void> {
        for (const [name, content] of Object.entries(structure)) {
            const fullPath = `${parentPath}/${name}`;
            
            if (typeof content === 'object' && content !== null) {
                await fs.promises.mkdir(fullPath, { recursive: true });
                debugLog(`Created subdirectory: ${fullPath}`);
                await FileManager.createSubdirectories(fullPath, content);
            } else {
                await fs.promises.writeFile(fullPath, content || '');
                debugLog(`Created file: ${fullPath}`);
            }
        }
    }

    async generateFileTree(rootPath: string): Promise<FileTreeNode[]> {
        const queue: Array<{ dirPath: string; node: FileTreeNode }> = [];
        const result: FileTreeNode[] = [];

        try {
            const entries = this.fs.readdirSync(rootPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = `${rootPath}/${entry.name}`;
                if (entry.isDirectory()) {
                    const folderNode: FileTreeNode = {
                        name: entry.name,
                        type: "folder",
                        path: fullPath,
                        children: []
                    };
                    result.push(folderNode);
                    queue.push({ dirPath: fullPath, node: folderNode });
                } else {
                    const fileNode: FileTreeNode = {
                        name: entry.name,
                        type: "file",
                        path: fullPath
                    };
                    result.push(fileNode);
                }
            }

            while (queue.length) {
                const { dirPath, node } = queue.shift()!;
                try {
                    const subEntries = this.fs.readdirSync(dirPath, { withFileTypes: true });

                    for (const subEntry of subEntries) {
                        const subPath = `${dirPath}/${subEntry.name}`;

                        if (subEntry.isDirectory()) {
                            const subFolderNode: FileTreeNode = {
                                name: subEntry.name,
                                type: "folder",
                                path: subPath,
                                children: []
                            };
                            node.children!.push(subFolderNode);
                            queue.push({ dirPath: subPath, node: subFolderNode });
                        } else {
                            const subFileNode: FileTreeNode = {
                                name: subEntry.name,
                                type: "file",
                                path: subPath
                            };
                            node.children!.push(subFileNode);
                        }
                    }
                } catch (error) {
                    console.error(`Error reading directory ${dirPath}:`, error);
                }
            }
        } catch (error) {
            console.error(`Error reading root directory ${rootPath}:`, error);
        }

        return result;
    }

    async copyDirectory(src: string, dest: string): Promise<void> {
    await fs.promises.access(src).catch(() => {
        throw new Error(`Source directory does not exist: ${src}`);
    });

    await fs.promises.mkdir(dest, { recursive: true });

    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = `${src}/${entry.name}`;
        const destPath = `${dest}/${entry.name}`;

        if (entry.isDirectory()) {
            await this.copyDirectory(srcPath, destPath);
        } else {
            await fs.promises.copyFile(srcPath, destPath);
            debugLog(`Copied file: ${srcPath} -> ${destPath}`);
        }
    }
}

    removeFileExtension(filename: string): string {
        if (!filename.includes('.')) return filename;
        if (filename.startsWith('.') && filename.split('.').length === 2) return filename;
        const lastDotIndex = filename.lastIndexOf('.');
        return lastDotIndex === -1 ? filename : filename.substring(0, lastDotIndex);
    }

    getFileExtension(filename: string): string {
        if (!filename.includes('.')) return '';
        const lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex === 0) return ''; 
        return filename.slice(lastDotIndex + 1).toLowerCase();
    }

    async getDirectoryNames(path: string): Promise<string[]> {
        try {
            const entries = await fs.promises.readdir(path, { withFileTypes: true });
            return entries
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.warn(`Directory not found: ${path}`);
                return [];
            }
            throw error;
        }
    }

    async getFileNamesInDirectory(path: string): Promise<string[]> {
        try {
            const entries = await fs.promises.readdir(path, { withFileTypes: true });
            return entries
                .filter(entry => entry.isFile())
                .map(file => file.name);
        } catch (error: any) {
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    async getFileName(filePath: string): Promise<string> {
        const parts = filePath.split("/");
        return parts.pop() || filePath;
}

    getDirectoryNamesSync(path: string): string[] {
        try {
            const entries = this.fs.readdirSync(path, { withFileTypes: true });
            return entries
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.warn(`Directory not found: ${path}`);
                return [];
            }
            throw error;
        }
    }

    getFileNamesInDirectorySync(path: string): string[] {
        try {
            const entries = this.fs.readdirSync(path, { withFileTypes: true });
            return entries
                .filter(entry => entry.isFile())
                .map(file => file.name);
        } catch (error: any) {
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    async clearDir(path: string): Promise<void> {
        if (!await fs.promises.exists(path)) { 
            throw new Error("Directory doesn't exist to clear it"); 
        }
        await fs.promises.rm(path, { recursive: true, force: true });
        await fs.promises.mkdir(path);
    }

    async removeDir(path: string): Promise<void> {
        if (!await fs.promises.exists(path)) { 
            throw new Error("Directory doesn't exist to clear it"); 
        }
        await fs.promises.rm(path, { recursive: true, force: true });
    }

    async zip(
    directoryPath: string, 
    filename: string | null = null,
    createTopLevelDir: boolean = false
): Promise<File> {
    try {
        const zip = new JSZip();
        const zipFilename = filename || "compressed";
        const timestamp = Date.now();
        
        const collectFiles = async (currentPath: string, relativePath: string = ""): Promise<Array<{ name: string; content: Buffer; relativePath: string }>> => {
            const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });
            const allFiles: Array<{ name: string; content: Buffer; relativePath: string }> = [];
            
            const promises = entries.map(async entry => {
                const fullPath = `${currentPath}/${entry.name}`;
                const entryRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
                
                if (entry.isFile()) {
                    const fileContent = await fs.promises.readFile(fullPath);
                    return [{ name: entry.name, content: fileContent, relativePath: entryRelativePath }];
                } else if (entry.isDirectory()) {
                    return await collectFiles(fullPath, entryRelativePath);
                }
                return [];
            });
            
            const results = await Promise.all(promises);
            results.forEach(result => allFiles.push(...result));
            
            return allFiles;
        };
        
        const allFiles = await collectFiles(directoryPath);
        
        allFiles.forEach(({ name, content, relativePath }) => {
            const filePath = createTopLevelDir ? `${zipFilename}/${relativePath}` : relativePath;
            zip.file(filePath, content, { 
                binary: true,
                createFolders: true 
            });
        });

        const zipBlob = await zip.generateAsync({ 
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: {
                level: 1 
            },
            streamFiles: true,
            platform: "UNIX" 
        });

        return new File([zipBlob], `${zipFilename}.zip`, { 
            type: "application/zip",
            lastModified: timestamp
        });
    } catch (error) {
        console.error("Compression failed:", error);
        throw error;
    }
}

    async extractTo(
    file: any,
    extractPath: string
    ): Promise<void> {
        try {
            await fs.promises.mkdir(extractPath, { recursive: true });

            const archive = await Archive.open(file);
            
            await new Promise<void>((resolve, reject) => {
                archive.extractFiles(async (entry: ArchiveEntry) => {
                    try {
                        const fullPath = `${extractPath}/${entry.path}`;
                        const dirPath = fullPath.substring(0, fullPath.lastIndexOf('/'));
                        
                        await fs.promises.mkdir(dirPath, { recursive: true });
                        
                        const arrayBuffer = await entry.file.arrayBuffer();
                        await fs.promises.writeFile(fullPath, new Uint8Array(arrayBuffer));
                    } catch (err) {
                        reject(err);
                    }
                }).then(resolve).catch(reject);
            });

            debugLog(`Successfully extracted to ${extractPath}`);
        } catch (error) {
            console.error(`Extraction failed:`, error);
            throw error;
        }
    }
}

FileManager.initFs();
