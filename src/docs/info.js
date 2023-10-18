export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Eccomerce API con Node.js y Express',
            version: '1.0.0',
            description: 'API para el curso de Node.js y Express de Coderhouse'
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor local',


            },
            {
                url: 'https://iapedrosashop.adaptable.app/api',
                description: 'Servidor en la nube',
            }
        ]
    },
    apis: ['./src/docs/*.yml']
};