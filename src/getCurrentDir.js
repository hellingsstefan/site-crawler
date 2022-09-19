export default function getCurrentDir(link) {
    const url = link.endsWith('/') ? link.slice(0, -1) : link;
    const { origin, pathname } = new URL(url);
    const pathSegments = pathname.split('/');
    const hasExtension = pathSegments[pathSegments.length - 1].split('.').length > 1;
    let path = pathname;

    if (hasExtension)
        path = pathSegments.slice(0, -1).join('/');

    let currentDir = `${origin}${path}`;

    return currentDir.endsWith('/') ? currentDir : `${currentDir}/`;
}
