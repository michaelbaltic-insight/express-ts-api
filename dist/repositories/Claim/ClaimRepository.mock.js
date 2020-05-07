"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const functions_1 = require("@shared/functions");
const MockRepository_mock_1 = require("../MockDb/MockRepository.mock");
class ClaimRepository extends MockRepository_mock_1.MockRepositoryMock {
    getOne(claimNumber) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield _super.openDb.call(this);
                for (const claim of db.claims) {
                    if (claim.claimNumber === claimNumber) {
                        return claim;
                    }
                }
                return null;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getAll() {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield _super.openDb.call(this);
                return db.claims;
            }
            catch (err) {
                throw err;
            }
        });
    }
    add(claim) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield _super.openDb.call(this);
                claim.id = functions_1.getRandomInt();
                db.claims.push(claim);
                yield _super.saveDb.call(this, db);
            }
            catch (err) {
                throw err;
            }
        });
    }
    update(claim) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield _super.openDb.call(this);
                for (let i = 0; i < db.claims.length; i++) {
                    if (db.claims[i].id === claim.id) {
                        db.claims[i] = claim;
                        yield _super.saveDb.call(this, db);
                        return;
                    }
                }
                throw new Error('Claim not found');
            }
            catch (err) {
                throw err;
            }
        });
    }
    delete(id) {
        const _super = Object.create(null, {
            openDb: { get: () => super.openDb },
            saveDb: { get: () => super.saveDb }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield _super.openDb.call(this);
                for (let i = 0; i < db.claims.length; i++) {
                    if (db.claims[i].id === id) {
                        db.claims.splice(i, 1);
                        yield _super.saveDb.call(this, db);
                        return;
                    }
                }
                throw new Error('Claim not found');
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = ClaimRepository;
