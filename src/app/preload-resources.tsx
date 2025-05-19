'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
    ReactDOM.prefetchDNS('https://openlibrary.org');
    ReactDOM.preconnect('https://openlibrary.org',{ crossOrigin: 'anonymous' });
    ReactDOM.prefetchDNS('https://covers.openlibrary.org');
    ReactDOM.preconnect('https://covers.openlibrary.org',{ crossOrigin: 'anonymous' });

    return <></>;
};