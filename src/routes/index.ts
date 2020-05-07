import { Router } from 'express';
import ClaimRouter from './Claims';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/claims', ClaimRouter);

// Export the base-router
export default router;
