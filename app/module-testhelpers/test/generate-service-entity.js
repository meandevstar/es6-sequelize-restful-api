import should from 'should';
import {generateServiceEntity} from '../lib';

describe('generateServiceEntity()', function() {
    it('Should generate service entity', () => {
        const doc = generateLocation();
        should.exist(doc);
        doc.should.have.properties([
            'managerId',
            'locationId',
            'createdAt',
            'updatedAt'
        ]);
    });
});