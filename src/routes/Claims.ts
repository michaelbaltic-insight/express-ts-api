import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import ClaimRepository from 'src/repositories/Claim/ClaimRepository.mock';
import { paramMissingError } from '@shared/constants';

// Init shared
const router = Router();
const claimRepository = new ClaimRepository();


/******************************************************************************
 *                      Get All Claims - "GET /api/claims/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const claims = await claimRepository.getAll();
    return res.status(OK).json({ claims });
});


/******************************************************************************
 *                       Add One - "POST /api/claims/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const { claim } = req.body;
    if (!claim) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await claimRepository.add(claim);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/claims/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const { claim } = req.body;
    if (!claim) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    claim.id = Number(claim.id);
    await claimRepository.update(claim);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/claims/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await claimRepository.delete(Number(id));
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
