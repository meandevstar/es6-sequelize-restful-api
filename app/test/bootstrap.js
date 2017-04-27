import {waterfall}      from 'async';
import {get}            from '../module-config';
import {db, user}       from '../module-schemas';
import {generateUser}   from '../module-testhelpers';
import {issueToken}     from '../module-jwt';

const {User} = user;

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
                done();
            });
        }
    ];

    waterfall(tasks, (err) => {
        if(err) console.log(err);
        db.close(done);
    });
});