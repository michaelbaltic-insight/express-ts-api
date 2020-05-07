import supertest from 'supertest';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';

import app from '@server';
import ClaimRepository from 'src/repositories/Claim/ClaimRepository.mock';
import Claim, { IClaim } from '@entities/Claim';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';


describe('Claims Routes', () => {

    const claimsPath = '/api/claims';
    const getClaimsPath = `${claimsPath}/all`;
    const addClaimsPath = `${claimsPath}/add`;
    const updateClaimPath = `${claimsPath}/update`;
    const deleteClaimPath = `${claimsPath}/delete/:id`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${getClaimsPath}"`, () => {

        it(`should return a JSON object with all the claims and a status code of "${OK}" if the
            request was successful.`, (done) => {

            const claims = [
                new Claim('123', 123),
                new Claim('234', 234),
                new Claim('345', 345),
            ];

            spyOn(ClaimRepository.prototype, 'getAll').and.returnValue(Promise.resolve(claims));

            agent.get(getClaimsPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    // Caste instance-objects to 'Claim' objects
                    const retClaims = res.body.claims.map((claim: IClaim) => {
                        return new Claim(claim);
                    });
                    expect(retClaims).toEqual(claims);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not fetch claims.';
            spyOn(ClaimRepository.prototype, 'getAll').and.throwError(errMsg);

            agent.get(getClaimsPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"POST:${addClaimsPath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.post(addClaimsPath).type('form').send(reqBody);
        };

        const claimData = {
            claim: new Claim('123', 123),
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {

            spyOn(ClaimRepository.prototype, 'add').and.returnValue(Promise.resolve());

            agent.post(addClaimsPath).type('form').send(claimData) // pick up here
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the claim param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not add claim.';
            spyOn(ClaimRepository.prototype, 'add').and.throwError(errMsg);

            callApi(claimData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"PUT:${updateClaimPath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.put(updateClaimPath).type('form').send(reqBody);
        };

        const claimData = {
            claim: new Claim('123', 123),
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {

            spyOn(ClaimRepository.prototype, 'update').and.returnValue(Promise.resolve());

            callApi(claimData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a
            status code of "${BAD_REQUEST}" if the claim param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const updateErrMsg = 'Could not update claim.';
            spyOn(ClaimRepository.prototype, 'update').and.throwError(updateErrMsg);

            callApi(claimData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(updateErrMsg);
                    done();
                });
        });
    });

    describe(`"DELETE:${deleteClaimPath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(deleteClaimPath.replace(':id', id.toString()));
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {

            spyOn(ClaimRepository.prototype, 'delete').and.returnValue(Promise.resolve());

            callApi(5)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const deleteErrMsg = 'Could not delete claim.';
            spyOn(ClaimRepository.prototype, 'delete').and.throwError(deleteErrMsg);

            callApi(1)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });
    });
});
