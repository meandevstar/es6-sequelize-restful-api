import { createServer } from 'http';
import app from './app';
import { get } from './module-config';
import { db } from './module-schemas';
import { waterfall } from 'async';

const tasks = [
    (cb) => {
        if (get('run_mode') === 'development') {
            db.sync()
            .then(() => {
                console.log('Database Connected...');
                cb();
            });
        }

        if (get('run_mode') === 'production') {
            console.log('Database Connected...');
            cb();
        }
    },

    (cb) => {
        const server = createServer(app),
            port = get('port');

        server.listen(port, () => {
            console.log('Server is running at : ' + port);
            cb(null, server);
        });
    }
];

function bootstrap() {
    waterfall(tasks, (err) => {
        if(err) console.log(err);
    });
}

export default bootstrap;
