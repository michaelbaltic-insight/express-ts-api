"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Claim {
    constructor(claimNumberOrClaim, id) {
        if (typeof claimNumberOrClaim === 'string') {
            this.claimNumber = claimNumberOrClaim;
            this.id = id || -1;
        }
        else {
            this.claimNumber = claimNumberOrClaim.claimNumber;
            this.id = claimNumberOrClaim.id;
        }
    }
}
exports.default = Claim;
