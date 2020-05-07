import { IClaim } from '@entities/Claim';
import { getRandomInt } from '@shared/functions';
import { MockRepositoryMock } from '../MockDb/MockRepository.mock';
import { IClaimRepository } from './ClaimRepository';


class ClaimRepository extends MockRepositoryMock implements IClaimRepository {


    public async getOne(claimNumber: string): Promise<IClaim | null> {
        try {
            const db = await super.openDb();
            for (const claim of db.claims) {
                if (claim.claimNumber === claimNumber) {
                    return claim;
                }
            }
            return null;
        } catch (err) {
            throw err;
        }
    }


    public async getAll(): Promise<IClaim[]> {
        try {
            const db = await super.openDb();
            return db.claims;
        } catch (err) {
            throw err;
        }
    }


    public async add(claim: IClaim): Promise<void> {
        try {
            const db = await super.openDb();
            claim.id = getRandomInt();
            db.claims.push(claim);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }


    public async update(claim: IClaim): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.claims.length; i++) {
                if (db.claims[i].id === claim.id) {
                    db.claims[i] = claim;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Claim not found');
        } catch (err) {
            throw err;
        }
    }


    public async delete(id: number): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.claims.length; i++) {
                if (db.claims[i].id === id) {
                    db.claims.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Claim not found');
        } catch (err) {
            throw err;
        }
    }
}

export default ClaimRepository;
