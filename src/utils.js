export function getDifferenceInSeconds(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);

    return diffInMs / 1000;
}

export function getDuration(timeStart, timeEnd) {
    const time = getDifferenceInSeconds(timeStart, timeEnd);
    let duration = `${time} seconds!`;

    if (time > 60) {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;

        duration = `${minutes} minutes and ${seconds} seconds!`;
    }

    return duration;
}

export function printData(data, title) {
    const length = data.length;
    let content = '';

    content = `    ${title} (${length}):\n`;
    data.forEach(link => content += `        ${link}\n`);
    content += `\n`;

    return content;
}
