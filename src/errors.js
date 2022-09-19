import { c } from './config.js';

export function handleError(errors, error) {
    const errorPage = error.config.url;
    const errorCode = error.code;
    const responseStatus = error.response.status;
    const responseStatusText = error.response.statusText;

    errors.push({
        errorPage,
        errorCode,
        responseStatus,
        responseStatusText,
    });

    console.log(`${c.red} An error has occured ${errorCode} ${errorPage} ${c.reset}`);
}

export function logErrors(errors) {
    console.log('\nERRORS:');
    errors.forEach(error => console.log(`\t${error.errorCode}\t| ${error.responseStatus} - ${error.responseStatusText}\t| ${error.errorPage}`));
}
