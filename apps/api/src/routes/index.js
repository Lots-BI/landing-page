import { Router } from 'express';
import healthCheck from './health-check.js';
import lead from './lead.js';
import { adminForms, adminLogin, adminLogout } from './admin.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.post('/api/lead', lead);
    router.post('/lead', lead);
    router.post('/api/admin/login', adminLogin);
    router.post('/api/admin/forms', adminForms);
    router.post('/api/admin/logout', adminLogout);

    return router;
};