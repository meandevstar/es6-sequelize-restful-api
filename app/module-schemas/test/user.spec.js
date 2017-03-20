import '../../test/bootstrap';

import should from 'should';
import Chance from 'chance';
import {user} from '../lib';

const random = new Chance();
const {User, statuses, types} = user;

describe('user', function() {
    this.timeout(20000);

    var doc = null;
    var userId = null;

    beforeEach(() => {
        doc = {
            firstName: random.first(),
            lastName: random.last(),
            email: random.email(),
            password: random.hash(),
            status: random.pickone(statuses),
            type: random.pickone(types),
            dateCreated: random.date()
        }
    });

    afterEach((done) => {
        if(!userId) return done();
        
        const query = {where: {id: userId}};
        User.find(query).then(function(result){
            if (result)
                result.destroy();
            done();
        });
    });

    function shouldComplain(doc, key, done) {
        User.create(doc).then((result) => {
            should.exist(result);
            should.deepEqual(result, doc);
            result.destroy();
            done();
        })
        .catch(function(err) {
           done(); 
        });
    }

    function shouldNotComplain(doc, done) {
        User.create(doc).then((result) => {
            should.exist(result);
            userId = result.id;
            result.destroy();
            done();
        })
        .catch(function(err) {
           done(); 
        });
    }

    it('Should successfully save a user', (done) => {
        User.create(doc).then((result) => {
            result = result.dataValues;
            doc.id = result.id;
            userId = result.id;

            // should.deepEqual(result, doc);
            done();
        });
    });

    it('Should not complain if firstName is not provided', (done) => {
        delete doc.firstName;
        shouldNotComplain(doc, done);
    });

    it('Should not complain if lastName is not provided', (done) => {
        delete doc.lastName;
        shouldNotComplain(doc, done);
    });

    it('Should not complain if password is not provided', (done) => {
        delete doc.password;
        shouldNotComplain(doc, done);
    });

    it('Should not complain when status is not provided', (done) => {
        delete doc.status;
        shouldNotComplain(doc, done);
    });

    it('Should not complain when updatedAt is not provided', (done) => {
        delete doc.updatedAt;
        shouldNotComplain(doc, done);
    });
});
