export default (params) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            ${params.head || ''}
            <title>Default</title>
        </head>
        <body>
            <div id="app">${params.body || ''}</div>
            <script type="module" src="/main.${ process.env.NODE_ENV == 'production' ? 'js' : 'ts' }"></script>
        </body>
    </html>`;
}