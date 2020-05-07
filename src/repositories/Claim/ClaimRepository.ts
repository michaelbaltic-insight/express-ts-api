import { IClaim } from '@entities/Claim';


export interface IClaimRepository {
    getOne: (claimNumber: string) => Promise<IClaim | null>;
    getAll: () => Promise<IClaim[]>;
    add: (claim: IClaim) => Promise<void>;
    update: (claim: IClaim) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class ClaimRepository implements IClaimRepository {


    /**
     * @param claimNumber
     */
    public async getOne(claimNumber: string): Promise<IClaim | null> {
        // TODO
        return [] as any;
    }


    /**
     *
     */
    public async getAll(): Promise<IClaim[]> {
        // TODO
        return [] as any;
    }


    /**
     *
     * @param claim
     */
    public async add(claim: IClaim): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param claim
     */
    public async update(claim: IClaim): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}

export default ClaimRepository;
