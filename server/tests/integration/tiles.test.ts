import chai, {expect} from 'chai';
import chaiHttp from 'chai-http'
import {Collection, Db, ObjectId} from "mongodb";
import Mongo from "../../src/daos/databases/Mongo";
import app from '../../src/index';
import {DatabaseConfig} from "../../src/config/DatabaseConfig";
// import fs from "fs";

describe('TileIntegration', function () {
    let database: Db;

    const url = 'mongodb://localhost:27017';
    const databaseName = 'test_ais_project';

    before(async function () {
        process.env["MONGO_DATABASE_NAME"] = databaseName;
        process.env["MONGO_DATABASE_URL"] = url;
        const databaseConfig = DatabaseConfig.Mongo;
        database = await Mongo.getDatabase(databaseConfig);
        chai.use(chaiHttp);
    })

    beforeEach(async function () {
        const collections = await database.collections();
        if (collections.find((collection: Collection) => {
            return collection.collectionName === 'tiles';
        })) {
            await database.dropCollection('tiles');
        }
        await database.createCollection('tiles');
    })

    after(async function () {
        await Mongo.closeDatabase();
    })

    const insertTestTiles = async () => {
        await database.collection('tiles').insertMany([
            {
                '_id': new ObjectId('a1-b2-c3-d4z'),
                'id': 1,
                'ICESName': '43F9',
                'filename': '43F9.png',
            },
            {
                '_id': new ObjectId('b2-c3-d4-e5z'),
                'id': 2,
                'ICESName': '43F91',
                'filename': '43F91.png',
                'contained_by': 1
            }
        ])
    }

    // const insertTileImages = async () => {
    //     let tileImageDirectory = './tests/images/'
    //     let tileImages = fs.readdirSync(tileImageDirectory);
    //
    //     await tileImages.forEach( tileImage => {
    //         let binaryImage = fs.readFileSync(tileImageDirectory+tileImage).toString('binary');
    //         database.collection('tiles').updateOne({filename: tileImage},{$set: {image_file: binaryImage}});
    //     });
    // }

    describe('getTiles', function () {
        it('should get empty array when there are no tiles', async function () {
            const response = await chai.request(app).get('/tiles');
            expect(response.body).to.deep.equal([]);
            expect(response.status).to.be.equal(200);
        });

        it('should get array of tiles', async function () {
            await insertTestTiles();
            const response = await chai.request(app).get('/tiles');

            expect(response.body).to.deep.equal([
                {
                    id: 1,
                    ICESName: '43F9',
                    west: null,
                    image_east: null,
                    image_file: null,
                    image_height: null,
                    image_north: null,
                    image_south: null,
                    image_west: null,
                    image_width: null,
                    north: null,
                    scale: null,
                    south: null,
                    contained_by: null,
                    east: null,
                    filename: '43F9.png'

        },{
                    id: 2,
                    ICESName: '43F91',
                    west: null,
                    image_east: null,
                    image_file: null,
                    image_height: null,
                    image_north: null,
                    image_south: null,
                    image_west: null,
                    image_width: null,
                    north: null,
                    scale: null,
                    south: null,
                    contained_by: 1,
                    east: null,
                    filename: '43F91.png'

                }
            ]);
            expect(response.status).to.be.equal(200);
        });
    });

    describe('createTile', function () {
        it('should get inserted tile from database', async function () {
            const response = await chai.request(app).post('/tiles').send(JSON.stringify({ICESName: '43F92', id: 52372}));

            expect(response.body.ICESName).to.be.equal('43F92');
            expect(response.body.id).to.be.equal(52372);
            expect(response.status).to.be.equal(201);
        });
    });

    // describe('getTileImage', function () {
    //     it('should get tile image file from binary', async function () {
    //         await insertTestTiles();
    //         await insertTileImages();
    //         const response = await chai.request(app).get('/tile-image/1');
    //
    //         console.log(response.body);
    //     });
    // });

    // describe('findTile', function () {
    //     it('should get inserted tile from database', async function () {
    //         await insertTestTiles();
    //         const response = await chai.request(app).get('/tiles/' + new ObjectId('a1-b2-c3-d4z').toHexString());
    //         expect(response.body.imo).to.be.equal(1);
    //         expect(response.body.name).to.be.equal('One');
    //         expect(response.body.id).to.not.be.null;
    //         expect(response.status).to.be.equal(200);
    //     });
    // });

    describe('updateTile', function () {
        it('should update tile in the database', async function () {
            await insertTestTiles();
            const response = await chai.request(app).put('/tiles/' + new ObjectId('a1-b2-c3-d4z').toHexString())
                .send(JSON.stringify({filename: '43F9-new.png', ICESName: '43F9-new'}));
            expect(response.body.filename).to.be.equal('43F9-new.png');
            expect(response.body.ICESName).to.be.equal('43F9-new');
            expect(response.status).to.be.equal(200);
        });
    });

    describe('deleteTile', function () {
        it('should delete tile in the database', async function () {
            await insertTestTiles();
            const response = await chai.request(app).delete('/tiles/' + new ObjectId('a1-b2-c3-d4z').toHexString());
            expect(response.status).to.be.equal(204);
            const tilesInDatabase = await database.collection('tiles').countDocuments();
            expect(tilesInDatabase).to.be.equal(1);
        });
    });

    describe('notFound', function () {
        it('should return not found', async function () {
            const response = await chai.request(app).post('/undefined-route').send(JSON.stringify({ICESName: '43F9-new'}));
            expect(response.status).to.be.equal(404);
        });
    })

    describe('findTilesByCoordinates', function () {
        it('should get array of tiles by coordinates', async function () {
            await insertTestTiles();

            await chai.request(app).put('/tiles/' + new ObjectId('a1-b2-c3-d4z').toHexString())
                .send(JSON.stringify({
                    east: 10.0,
                    west: 9.0,
                    north: 57.5,
                    south: 57,
                    scale: 3
                }));

            await chai.request(app).put('/tiles/' + new ObjectId('b2-c3-d4-e5z').toHexString())
                .send(JSON.stringify({
                    east: 11.0,
                    west: 10.0,
                    north: 58.5,
                    south: 58,
                    scale: 2
                }));

            const response = await chai.request(app).get('/tiles?longitude=9.494252873563218&scale=3&latitude=57.04808806488992');

            expect(response.body).to.deep.equal([
                {
                    id: 1,
                    ICESName: '43F9',
                    west: 9,
                    image_east: null,
                    image_file: null,
                    image_height: null,
                    image_north: null,
                    image_south: null,
                    image_west: null,
                    image_width: null,
                    north: 57.5,
                    scale: 3,
                    south: 57,
                    contained_by: null,
                    east: 10,
                    filename: '43F9.png'

                }
            ]);
            expect(response.status).to.be.equal(200);
        });
    })

});
