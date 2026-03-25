export const SITE_URL = 'https://cjeongmin.github.io';

export const toSiteUrl = (path: `/${string}` | '/') => new URL(path, `${SITE_URL}/`).toString();
