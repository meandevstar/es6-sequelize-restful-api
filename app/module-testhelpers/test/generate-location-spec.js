import should from 'should';
import {generateLocation} from '../lib';

describe('generateLocation()', function() {
    it('Should generate location', () => {
        const doc = generateLocation();
        should.exist(doc);
        doc.should.have.properties([
            'street',
            'city',
            'state',
            'zipcode',
            'lat',
            'long'
        ]);
    });
});