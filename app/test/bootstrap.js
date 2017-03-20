import {waterfall}      from 'async';
import {get}            from '../module-config';
import {db, user, location, serviceEntity}       from '../module-schemas';
import {generateUser, generateLocation, generateServiceEntity}   from '../module-testhelpers';
import {issueToken}     from '../module-jwt';

const {User} = user;
const {Location} = location;
const {ServiceEntity} = serviceEntity;

before(function(done) {
    this.timeout(20000);

    const tasks = [
        function (cb) {
            process.env.ENV = 'test';

            if (get('run_mode') === 'development') {
                db.sync({
                    force: true
                }).then(function() {
                    console.log('Database Connected...');

                    cb();
                });
            }

            if (get('run_mode') === 'production') {
                console.log('Database Connected...');

                cb();
            }
        },
        function (cb) {
            let user = generateUser();

            User.create(user).then(function(result){
                global.user = result.dataValues;

                cb();
            });
        },
        function (cb) {
            const {id, type} = global.user;
            issueToken({id, type}, function (err, token) {
                if(err) return cb(err);
                global.authToken = token;

                cb();
            });
        }
    ];

    waterfall(tasks, function (err) {
        if(err) console.log(err);
        done();
    });
});

after(function(done) {
    const tasks = [
        function (cb) {
            if(!global.user) return cb();
            
            const query = {where: {id: global.user.id}};
            User.find(query).then(function(result){
                if (result)
                    result.destroy();
                cb();
            });
        },
        function (cb) {
            if(!global.location) return cb();
            
            const query = {where: {id: global.location.id}};
            Location.find(query).then(function(result){
                if (result)
                    result.destroy();
                cb();
            });
        },
        function (cb) {
            if(!global.serviceEntity) return cb();
            
            const query = {where: {id: global.serviceEntity.id}};

            ServiceEntity.find(query).then(function(result){
                if (result)
                    result.destroy();
                done();
            });
        }
    ];

    waterfall(tasks, (err) => {
        if(err) console.log(err);
        db.close(done);
    });
});