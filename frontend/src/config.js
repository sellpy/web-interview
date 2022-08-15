export const config = {
    app: {
        port: parseInt(process.env.REACT_APP_PORT) || 3000
    },
    db: {
        baseUrl: process.env.REACT_APP_DB_BASEURL || 'http://localhost',
        port: parseInt(process.env.REACT_APP_DB_PORT) || 3001,
        name: process.env.REACT_APP_DB_NAME || 'db'
    }
}