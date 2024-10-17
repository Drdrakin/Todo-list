const express = require('express');
const client = require('prom-client');

const metricsRouter = express.Router();

const register = new client.Registry();

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duração dos requests em segundos',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 0.5, 1, 2, 5, 10], // tempo em segundos
});

register.registerMetric(httpRequestDurationMicroseconds);

metricsRouter.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
        end({ method: req.method, route: req.path, status: res.statusCode });
    });
    next();
});

metricsRouter.get('/', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

module.exports = metricsRouter;
