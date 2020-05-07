export interface IClaim {
    id: number;
    claimNumber: string;
}

class Claim implements IClaim {

    public id: number;
    public claimNumber: string;

    constructor(claimNumberOrClaim: string | IClaim, id?: number) {
        if (typeof claimNumberOrClaim === 'string') {
            this.claimNumber = claimNumberOrClaim;
            this.id = id || -1;
        } else {
            this.claimNumber = claimNumberOrClaim.claimNumber;
            this.id = claimNumberOrClaim.id;
        }
    }
}

export default Claim;
