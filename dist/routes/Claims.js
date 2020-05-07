"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const ClaimRepository_mock_1 = tslib_1.__importDefault(require("src/repositories/Claim/ClaimRepository.mock"));
const constants_1 = require("@shared/constants");
const router = express_1.Router();
const claimRepository = new ClaimRepository_mock_1.default();
router.get('/all', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const claims = yield claimRepository.getAll();
    return res.status(http_status_codes_1.OK).json({ claims });
}));
router.post('/add', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { claim } = req.body;
    if (!claim) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    yield claimRepository.add(claim);
    return res.status(http_status_codes_1.CREATED).end();
}));
router.put('/update', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { claim } = req.body;
    if (!claim) {
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    claim.id = Number(claim.id);
    yield claimRepository.update(claim);
    return res.status(http_status_codes_1.OK).end();
}));
router.delete('/delete/:id', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield claimRepository.delete(Number(id));
    return res.status(http_status_codes_1.OK).end();
}));
exports.default = router;
