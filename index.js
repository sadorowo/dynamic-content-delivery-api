const { PORT, VERSION, WEBSITE } = require('./data/config.json');
const dataSource = require('./data/data-source');

const fastify = require('fastify');
const availableRoutes = [];
const server = fastify();

const prepareRoute = (...routes) => `/api/v${VERSION}/` + routes.join('/');

server.register(require('@fastify/cors'), {
    allowedHeaders: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    origin: WEBSITE
});

server.addHook('onRoute', (routeOptions) => {
    if (routeOptions.method === 'HEAD') return;

    const { method, url } = routeOptions;

    availableRoutes.push({ method, url });
});

server.get(prepareRoute('status'), () => {
    return { 
        status: 'ok',
        version: VERSION,
        timestamp: new Date().toISOString()
    };
});

server.get(prepareRoute('resource', ':id'), (request, reply) => {
    const id = request.params.id;

    if (!id || typeof id !== 'string') {
        return reply.code(400).send({
            error: 'bad request',
            message: 'missing or invalid id',
            timestamp: new Date().toISOString()
        });
    }

    const resource = dataSource?.[id];
    if (!resource) {
        return reply.code(404).send({
            error: 'not found',
            message: 'resource not found',
            timestamp: new Date().toISOString()
        });
    }

    return { 
        id: request.params.id,
        resource,
        timestamp: new Date().toISOString()
    };
});

server.setNotFoundHandler((_, reply) => {
    reply.code(404).send({ 
        error: 'not found',
        message: 'no route matched',
        timestamp: new Date().toISOString(),
        availableRoutes
    });
});

server.listen({ port: PORT }, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

    console.log(`DCD API server listening on ${address}`);
});