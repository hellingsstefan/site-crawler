export const getSpreadsheets = list => getFilesOnly(list).filter(url => isSpreadsheet(url));
export const getDocuments = list => getFilesOnly(list).filter(url => isDocument(url));
export const getImages = list => getFilesOnly(list).filter(url => isImage(url));
export const getMedia = list => getFilesOnly(list).filter(url => isMedia(url));
export const getPDF = list => getFilesOnly(list).filter(url => isPDF(url));
export const getFiles = list => ({
    spreadsheets: getSpreadsheets(list),
    documents: getDocuments(list),
    images: getImages(list),
    media: getMedia(list),
    pdf: getPDF(list),
});

export const getFilesList = list => [
    ...getSpreadsheets(list),
    ...getDocuments(list),
    ...getImages(list),
    ...getMedia(list),
    ...getPDF(list),
]

const spreadSheetExtensions = [
    'csv',
    'xml',
    'cts', // TreeSheets Hierarchical Spreadsheet
    'xlsx', // Microsoft Excel Spreadsheet
    'xls', // Microsoft Excel Spreadsheet (Legacy)
    'xlsm', // Microsoft Excel Macro-Enabled Spreadsheet
    'def', // SmartWare II Data File
    '123', // Lotus 1-2-3 Spreadsheet
    'dex', // Microsoft Excel Spreadsheet
    'xl', // Microsoft Excel Spreadsheet
    'gnumeric', // Gnumeric Spreadsheet
    'xlr', // Works Spreadsheet
    'numbers-tef', // Numbers iCloud Document
    'pmvx', // PlanMaker Spreadsheet Template
    'sxc', // StarOffice Calc Spreadsheet
    'nb', // Mathematica Notebook
    'xltm', // Microsoft Excel Macro-Enabled Spreadsheet Template
    'xlsb', // Microsoft Excel Binary Spreadsheet
    'ods', // OpenDocument Spreadsheet
    'numbers', // Apple Numbers Spreadsheet
    'cell', // Thinkfree Office NEO Cell Workbook
    'chip', // Microarray Annotation File
    'edxz', // Edraw Compressed XML FIle
    'presto', // Presto Project Spreadsheet
    'fods', // OpenDocument Flat XML Spreadsheet
    'mar', // Mariner Calc Spreadsheet
    'bks', // Microsoft Works Spreadsheet Backup File
    'ots', // OpenDocument Spreadsheet Template
    'rdf', // Report Definition File
    'xar', // Microsoft Excel Auto-Recovery File
    '_xls', // Renamed Microsoft Excel Spreadsheet (Legacy)
    'tmv', // TimeMap Visual
    'imp', // Improv Spreadsheet
    'efu', // Everything File List
    'pmd', // PlanMaker Spreadsheet (Legacy)
    'wq2', // Quattro Pro for DOS Spreadsheet File
    'nmbtemplate', // Numbers Spreadsheet Template
    'sdc', // Apache OpenOffice Calc Spreadsheet
    'xltx', // Microsoft Excel Spreadsheet Template
    'fp', // FileMaker Pro Spreadsheet
    '_xlsx', // Renamed Microsoft Excel Spreadsheet
    'qpw', // Quattro Pro Spreadsheet
    'gsheet', // Google Sheets Shortcut
    'xlshtml', // Microsoft Excel HTML Spreadsheet
    'ncss', // NCSS Dataset File
    'ast', // Ability Spreadsheet Template
    'wks', // Lotus 1-2-3 Spreadsheet
    'ogwu', // Origin Unicode Workbook File
    'dis', // Oracle Discoverer Workbook
    '12m', // Lotus 1-2-3 SmartMaster File
    'gnm', // Gnumeric Spreadsheet
    'pmdx', // PlanMaker Spreadsheet
    'edx', // Edraw XML FIle
    'xlsmhtml', // Microsoft Excel MIME HTML Spreadsheet
    'ogw', // Origin Workbook File
    'ess', // EasySpreadsheet Spreadsheet
    'aws', // Ability Spreadsheet File
    'wkq', // Quattro Pro for DOS Spreadsheet File
    'wq1', // Quattro Pro for DOS Spreadsheet File
    'wks', // Works Spreadsheet
    'wr1', // Lotus Symphony Worksheet File
    'pmv', // PlanMaker Spreadsheet Template
    'uos', // Uniform Office Spreadsheet
    'fcs', // First Choice Spreadsheet
    'hcdt', // Thinkfree Office NEO Cell Template
    'stc', // StarOffice Calc Spreadsheet Template
    'xlthtml', // Microsoft Excel HTML Spreadsheet Template
    'tmvt', // TimeMap Template
    'dfg', // Data Flask Grid File
    'wki', // Lotus 2 Worksheet
    'wku', // Lotus 1-2-3 Spreadsheet
    'wls', // 602Tab Spreadsheet
]

const documentExtensions = [
    'doc',
    'docx',
    'txt',
    'rtf',
    '.md',
    'ppt',
    'pptx',
];

const imageExtensions = [
    'apng', // Animated Portable Network Graphics
    'avif', // AV1 Image File Format
    'gif', // Graphics Interchange Format
    'jpg', // Joint Photographic Expert Group image
    'jpeg', // Joint Photographic Expert Group image
    'jfif', // Joint Photographic Expert Group image
    'pjpeg', // Joint Photographic Expert Group image
    'pjp', // Joint Photographic Expert Group image
    'png', // Portable Network Graphics
    'svg', // Scalable Vector Graphics
    'webp', // Web Picture format
    'bmp',
    'tif',
    'tiff',
    'pcx',
    'rle',
    'dib',
];

const mediaExtensions = [
    'webm',
    'mpg',
    'mp2',
    'mpeg',
    'mpe',
    'mpv',
    'ogg',
    'mp4',
    'm4p',
    'm4v',
    'avi',
    'wmv',
    'mov',
    'qt',
    'flv',
    'f4v',
    'swf',
    'avchd',
    '3gp',
    '3g2',
    'asf',
    'ram',
    'wav',
    'aif',
    'aiff',
    'mpa',
    'm4a',
    'wma',
];

const pdfExtensions = [
    'pdf',
]

const getPath = url => new URL(url).pathname;
const getFilesOnly = list => list.filter(url => getPath(url).split('.').length > 1);
const getExtension = (url) => getPath(url).split('.')[getPath(url).split('.').length - 1].toLowerCase();
const isSpreadsheet = (url) => spreadSheetExtensions.includes(getExtension(url));
const isDocument = (url) => documentExtensions.includes(getExtension(url));
const isImage = (url) => imageExtensions.includes(getExtension(url));
const isMedia = (url) => mediaExtensions.includes(getExtension(url));
const isPDF = (url) => pdfExtensions.includes(getExtension(url));
