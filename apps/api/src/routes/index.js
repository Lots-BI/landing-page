import { Router } from 'express';
import healthCheck from './health-check.js';
import lead from './lead.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.post('/api/lead', lead);
    router.post('/lead', lead);

    return router;
};