import type { Chart } from "../lib/rgc-chart/rgc_chart";
import { FileManager } from "./FileManager";
import type { FileTreeNode } from "./FileManager";
import { MapParseIndexer } from "./ParseIndexer";
import { sleep, debugLog, parseError, getErrorMessage, convertError, formatTime } from "../helpers";

let rgcChart: typeof import("../lib/rgc-chart/rgc_chart") | null = null;
let random_uuid = Math.floor(Math.random() * 100000 + 100000);
let untitledMapExist = false;

export async function initRgcChartWasm() {
    if (!rgcChart) {
        try {
            const module = await import("../lib/rgc-chart/rgc_chart");
            module.default();
            rgcChart = module;
        } catch (err) {
            console.error("Failed to load RgcChart WASM module:", err);
            throw err;
        }
    }
    console.log("RgcChart WASM module successfully loaded!")
    return rgcChart;
}

let convertButton: HTMLElement | null = document.getElementById("map-convert-btn");
let dropdown_menu: HTMLSelectElement | null = document.getElementById("ChartType") as HTMLSelectElement;
let Result: any = document.getElementById('ConvertResult');
let targetFormat: string | undefined = 'osu';
let savingAsType: SaveAsType = 'map';
let progressBar: any = document.getElementById('rgc-progress');

function initializeMaplisteners() {
    convertButton?.removeEventListener("click", convertCharts);
    Result?.removeEventListener("map:exportSelected", async (exportType: any) => {
        savingAsType = exportType.detail;
        await saveAllMaps(savingAsType);
    });
    
    convertButton = document.getElementById("map-convert-btn");
    dropdown_menu = document.getElementById("ChartType") as HTMLSelectElement;
    progressBar = document.getElementById('rgc-progress');
    Result = document.getElementById('ConvertResult');
    
    convertButton?.addEventListener("click", convertCharts);
    Result?.addEventListener("map:exportSelected", async (exportType: any) => {
        savingAsType = exportType.detail;
        await saveAllMaps(savingAsType);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    convertButton = document.getElementById("map-convert-btn");
    dropdown_menu = document.getElementById("ChartType") as HTMLSelectElement;
    Result = document.getElementById('ConvertResult');
})

document.addEventListener("page:changed", async (event: any) => {
    if (event.detail.href === "/map") {
        setTimeout(initializeMaplisteners, 50);
    }
    
    await fileManager.clearDir("/MapImport");
    await fileManager.clearDir("/MapExport");
    mapIndexer.clear();

    convertButton = document.getElementById("map-convert-btn");
    dropdown_menu = document.getElementById("ChartType") as HTMLSelectElement;
    Result = document.getElementById('ConvertResult');
})


await initRgcChartWasm();
const fileManager = new FileManager();
const mapIndexer = new MapParseIndexer("/MapImport");


type SaveAsType = 'map' | 'zip' | 'file';

// I know this is ugly but deal with it
const dropdownTemplate = document.createElement('template');
dropdownTemplate.innerHTML = `
  <div class="folder-dropdown-menu" style="
    color: white;
    position: fixed;
    background: linear-gradient(135deg, #ff69b4, #ff1493);
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 1000;
    min-width: 120px;
  ">
    <div class="dropdown-item" data-value="map" style="
      padding: 8px 12px;
      cursor: pointer;
    ">Save as Map</div>
    <div class="dropdown-item" data-value="zip" style="
      padding: 8px 12px;
      cursor: pointer;
    ">Save as ZIP</div>
  </div>
`;

export function showDropdownMenu(
  anchorElement: HTMLElement, 
  onOptionSelected: (value: any) => void
): void {
  if (typeof document === 'undefined') return;
  const existingDropdown = document.querySelector('.folder-dropdown-menu');
  if (existingDropdown) {
    existingDropdown.parentElement?.removeChild(existingDropdown);
  }
  
  const dropdown = dropdownTemplate.content.cloneNode(true) as DocumentFragment;
  const dropdownElement = dropdown.querySelector('.folder-dropdown-menu') as HTMLElement;
  
  const buttonRect = anchorElement.getBoundingClientRect();
  dropdownElement.style.top = `${buttonRect.bottom}px`;
  dropdownElement.style.left = `${buttonRect.left}px`;
  
  const items = dropdown.querySelectorAll('.dropdown-item');
  items.forEach((item: Element) => {
    const htmlItem = item as HTMLElement;
    
    htmlItem.addEventListener('mouseover', () => {
      htmlItem.style.backgroundColor = '#f0f0f0';
    });
    
    htmlItem.addEventListener('mouseout', () => {
      htmlItem.style.backgroundColor = 'transparent';
    });
    
    htmlItem.addEventListener('click', () => {
      const value = htmlItem.getAttribute('data-value');
      
      onOptionSelected(value);
      
      const activeDropdown = document.querySelector('.folder-dropdown-menu');
      if (activeDropdown && activeDropdown.parentNode) {
        activeDropdown.parentNode.removeChild(activeDropdown);
      }
    });
  });
  
  document.body.appendChild(dropdown);
  
  const closeDropdown = (e: MouseEvent): void => {
    const activeDropdown = document.querySelector('.folder-dropdown-menu');
    if (!activeDropdown) {
      document.removeEventListener('click', closeDropdown);
      return;
    }
    
    if (!activeDropdown.contains(e.target as Node) && e.target !== anchorElement) {
      if (activeDropdown.parentNode) {
        activeDropdown.parentNode.removeChild(activeDropdown);
      }
      document.removeEventListener('click', closeDropdown);
    }
  };
  
  setTimeout(() => {
    document.addEventListener('click', closeDropdown);
  }, 0);
}

function getMapFormat(format: string) {
    switch(format) {
        case "osu":
            return "osz";
        default:
            return "zip";
    }
}

async function saveAs(fileTreeEntry: FileTreeNode, saveAsType: SaveAsType): Promise<void> {
    
   progressBar.show('Exporting..', 0);
  switch (saveAsType) {
    case 'file':
        fileManager.download(fileTreeEntry.path);
        break;
    case 'map':
        fileManager.downloadFromBlob( await fileManager.zip(fileTreeEntry.path), `${fileTreeEntry.name}.${getMapFormat(targetFormat as string)}`);
        break;
    case 'zip':
        fileManager.downloadFromBlob( await fileManager.zip(fileTreeEntry.path, fileTreeEntry.name, true), `${fileTreeEntry.name}.zip`);
        break;
  }
  progressBar.update('Exporting.. done', 100)
  progressBar.hide();
}

async function saveAllMaps(saveAsType: SaveAsType): Promise<void> {
    progressBar.show('Exporting..', 0);
    const maps = mapIndexer.getMapNames();
    let mapCount = maps.length;
    let exportingMaps = 1;
  switch (saveAsType) {
    case 'map':
        for (const map of maps) {
            progressBar.update(`Exporting.. (${exportingMaps}/${mapCount})`, (exportingMaps/mapCount) * 100);
            fileManager.downloadFromBlob( await fileManager.zip(`/MapExport/${map}`), `${map}.${getMapFormat(targetFormat as string)}`);
            exportingMaps++
        }
        break;
    case 'zip':
        fileManager.downloadFromBlob( await fileManager.zip("/MapExport", "rgc-export", true), `rgc-export.zip`);
        break;
  }
  progressBar.update('Exporting.. done', 100);
  progressBar.hide();
}

async function parseChart(path: string, mapName: string) {
    const extension = fileManager.getFileExtension(path);

    let parser: ((data: string) => any) | undefined;

    switch (extension) {
        case 'sm':
            parser = rgcChart?.parse_sm;
            break;
        case 'osu':
            parser = rgcChart?.parse_osu;
            break;
        default:
            return;
    }

    let parsedData = null;

    try {
        const rawData = (await fileManager.fs.promises.readFile(path)).toString();
        parsedData = parser?.(rawData);
    } catch (e) {
        parseError(`${path}:`, getErrorMessage(e));
    }

    if (parsedData) {
        mapIndexer.addEntry(mapName, path, parsedData);
    }
}


async function convertChart(chart: Chart, convertType: string): Promise<string | undefined> {
    let converter: ((chart: Chart) => string) | undefined;

    switch (convertType) {
        case 'sm':
            converter = rgcChart?.convert_to_sm;
            break;
        case 'osu':
            converter = rgcChart?.convert_to_osu;
            break;
        default:
            convertError(`Converter for "${convertType}" not available`);
            return;
    }

    try {
        return converter?.(chart);
    } catch (e) {
        convertError(`Conversion for ${convertType} failed: `, e);
        return;
    }
}

document.addEventListener("map:filesSelected", async (event: any) => {
    parseCharts(event);
})

async function parseCharts(event: any) {
    convertButton?.setAttribute('disabled', "true");
    await fileManager.clearDir("/MapImport");
    mapIndexer.clear();
    untitledMapExist = false;

    let MapParseTime = 0;
    let MapExtractionTime = 0;

    const extractInfoElement = document.getElementById("extraction-time");
    const parseInfoElement = document.getElementById("parse-time");
    const convertInfoElement = document.getElementById("convert-time");
    if (convertInfoElement) {
        convertInfoElement.textContent = "";
        convertInfoElement.classList.add("empty-info-state");
    }
    if (parseInfoElement) {
        parseInfoElement.textContent = "";
        parseInfoElement.classList.add("empty-info-state");
    }
    if (extractInfoElement) {
        extractInfoElement.textContent = "";
        extractInfoElement.classList.add("empty-info-state");
    }
    
    const files: File[] = await event.detail.files;
    const fileCount = files.length;
    let extractingCount = 1;

    progressBar.show(`Extracting.. (0/${fileCount})`, 0);
    let extractionStart = Date.now();
    for (const file of files) {
        const extension = fileManager.getFileExtension(file.name);

        progressBar.show(`Extracting.. (${extractingCount}/${fileCount})`, ((extractingCount - 1)/fileCount) * 50);
        switch (extension) {
            case 'zip':
            case 'rar':
            case 'tar':
            case '7z':
                await fileManager.fs.promises.mkdir("/MapImport/", { recursive: true });
                await fileManager.extractTo(file, "/MapImport/");
                break;
            case 'osz':
                const fullPath = `/MapImport/${fileManager.removeFileExtension(file.name)}`;
                await fileManager.fs.promises.mkdir(fullPath, { recursive: true });
                await fileManager.extractTo(file, fullPath);
                break;
            default:
                if (!untitledMapExist) {
                    await fileManager.fs.promises.mkdir(`/MapImport/untitled-${random_uuid}`);
                    untitledMapExist = true;
                }
                const arrayBuffer = await file.arrayBuffer(); 
                await fileManager.fs.promises.writeFile(
                    `/MapImport/untitled-${random_uuid}/${file.name}`,
                    new Uint8Array(arrayBuffer)
                );
        }
        extractingCount++;
    }

    MapExtractionTime = Date.now() - extractionStart;

    
    if (extractInfoElement) {
        extractInfoElement.textContent = formatTime(MapExtractionTime);
        extractInfoElement.classList.remove("empty-info-state");
    }

    progressBar.update("Waiting for FileSystem..", 50);
    
    // wait extra for filesystem
    // todo: this is very hacky and quite frankly ugly, pls fix later
    await sleep(500);

    
    let Maps = await fileManager.getDirectoryNames("/MapImport");
    let MapCount = Maps.length;
    let processingMaps = 1;
    let ParsePromises = []

    progressBar.update(`Parsing Maps.. (0/${MapCount})`, 50);
    let parseStart = Date.now();
    for (const Map of Maps) {
        progressBar.update(`Parsing Maps.. (${processingMaps}/${MapCount})`, ((processingMaps - 1)/MapCount) + 50 * 50);
        debugLog("\n\n\n");
        debugLog(Map);
        debugLog("-------------------------------------------------");
        for (const file of await fileManager.getFileNamesInDirectory(`/MapImport/${Map}`)) {
            const fullPath = `/MapImport/${Map}/${file}`;
            debugLog(fullPath);
            ParsePromises.push(parseChart(fullPath, Map));
        }
        processingMaps++;
    }

    await Promise.all(ParsePromises);
    MapParseTime = Date.now() - parseStart;
    
    if (parseInfoElement) {
        parseInfoElement.textContent = formatTime(MapParseTime);
        parseInfoElement.classList.remove("empty-info-state");
    }

    document.dispatchEvent(new CustomEvent('parse:done'));
    progressBar.update("Done Parsing!..", 100);
    await sleep(100);
    progressBar.hide()
    convertButton?.removeAttribute('disabled');
    debugLog("parsed entries: ", mapIndexer.getEntries());
}

async function convertCharts() {
    await fileManager.clearDir("/MapExport");
    targetFormat = dropdown_menu?.value;

    let MapConverTime = 0;
    
    if (!targetFormat) {
        targetFormat = "osu";
        console.error("target format is null! defaulting to osu..")
    }

    progressBar.show(`Copying..`, 0);

    const maps = mapIndexer.getMapNames(); 
    const mapCount = maps.length;
    let mapsConverting = 1;
    let convertStart = Date.now();
    for (const map of maps) {
        const importPath = `/MapImport/${map}`;
        const exportPath = `/MapExport/${map}`;

        
        await fileManager.copyDirectory(importPath, exportPath);

        const charts = mapIndexer.getEntries(map)
                
        progressBar.update(`Converting Maps.. (${mapsConverting}/${mapCount})`, ((mapsConverting - 1)/mapCount) + 50 * 50);
        for (const chart of charts) {
            const chartFileName = await fileManager.getFileName(chart.originalPath);
            const chartPath = `${exportPath}/${chartFileName}`;

            try {
                await fileManager.fs.promises.rm(chartPath);
            } catch (err) {
                // there was no file to remove so we skip it
            }

            const convertedChart = await convertChart(chart.chart, targetFormat);
            if (convertedChart) {
                const newFileName = `${exportPath}/${fileManager.removeFileExtension(chartFileName)}.${targetFormat}`;
                await fileManager.fs.promises.writeFile(newFileName, convertedChart);
            }
        }
        mapsConverting++;
    }

    MapConverTime = Date.now() - convertStart;
    
    document.dispatchEvent(new CustomEvent('convert:done'));
    progressBar.update("Done Converting!..", 100);
    await sleep(100);
    progressBar.hide();
    const convertInfoElement = document.getElementById("convert-time");
    if (convertInfoElement) {
        convertInfoElement.textContent = formatTime(MapConverTime);
        convertInfoElement.classList.remove("empty-info-state");
    }
    
    debugLog("Map export dir: ", fileManager.fs.readdirSync("/MapExport"))

    Result.onSaveAs = (fileTreeEntry: FileTreeNode): void => {
    
    switch (fileTreeEntry.type) {
        case 'folder':
            const event = window.event as MouseEvent | TouchEvent;
            const target = event.target as HTMLElement;
            const saveAsBtn = target.closest('.save-as-btn') as HTMLElement;
            if (saveAsBtn) {
                showDropdownMenu(saveAsBtn, (selectedType: SaveAsType) => {
                savingAsType = selectedType;
                saveAs(fileTreeEntry, savingAsType);
                });
            }
            break;
        case 'file':
            saveAs(fileTreeEntry, 'file');
            break;
    }};
    
    if (maps.length === 1) {
        Result.renderFileTree(await fileManager.generateFileTree(`/MapExport/${maps[0]}`));
    } else {
        Result.renderFileTree(await fileManager.generateFileTree("/MapExport"));
    }
    
}

initializeMaplisteners()
