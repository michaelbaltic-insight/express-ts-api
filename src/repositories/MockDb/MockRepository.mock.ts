import jsonfile from 'jsonfile';

export class MockRepositoryMock {

    private readonly dbFilePath = 'src/repositories/MockDb/MockDb.json';

    protected openDb(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }

    protected saveDb(db: any): Promise<any> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}
