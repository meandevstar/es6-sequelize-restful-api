import should from 'should';
import {generateUser} from '../lib';

describe('generateUser()', function() {
    it('Should generate user', () => {
        const doc = generateUser();
        should.exist(doc);
        doc.should.have.properties([
            'firstName',
            'lastName',
            'email',
            'password',
            'createdAt',
            'updatedAt',
            'status',
            'metadata'
        ]);
    });
});