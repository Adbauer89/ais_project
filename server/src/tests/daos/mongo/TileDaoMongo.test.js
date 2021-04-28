"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TileDaoFactory_1 = __importDefault(require("../../../src/daos/factory/TileDaoFactory"));
var Tile_1 = __importDefault(require("../../../src/models/Tile"));
var mongodb_1 = require("mongodb");
var chai_1 = require("chai");
var fs_1 = require("fs");
var Mongo_1 = __importDefault(require("../../../src/daos/databases/Mongo"));
describe('TileDaoMongo', function () {
    var _this = this;
    var database;
    var tileDaoMongo;
    var url = 'mongodb://localhost:27017';
    var databaseName = 'test_ais_project';
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            var databaseConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        databaseConfig = {
                            getType: function () {
                                return 'mongo';
                            },
                            getUrl: function () {
                                return url;
                            },
                            getName: function () {
                                return databaseName;
                            }
                        };
                        return [4 /*yield*/, Mongo_1.default.getDatabase(databaseConfig)];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, TileDaoFactory_1.default.getTileDao(databaseConfig)];
                    case 2:
                        tileDaoMongo = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var collections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database.collections()];
                    case 1:
                        collections = _a.sent();
                        if (!collections.find(function (collection) {
                            return collection.collectionName === 'tiles';
                        })) return [3 /*break*/, 3];
                        return [4 /*yield*/, database.dropCollection('tiles')];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, database.createCollection('tiles')];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Mongo_1.default.closeDatabase()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    var insertTestTiles = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.collection('tiles').insertMany([
                        {
                            '_id': new mongodb_1.ObjectId('a1-b2-c3-d4z'),
                            'ices_name': '43F9',
                            'filename': '43F9.png',
                            'id': 1
                        },
                        {
                            '_id': new mongodb_1.ObjectId('b2-c3-d4-e5z'),
                            'ices_name': '43F91',
                            'filename': '43F91.png',
                            'id': 2
                        }
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    describe('insert()', function () {
        it('should insert a new document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var tileToInsert, insertedTile, tileCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tileToInsert = Tile_1.default.fromJson(fs_1.readFileSync('tests/resources/models/tile_one.json').toString());
                            return [4 /*yield*/, tileDaoMongo.insert(tileToInsert)];
                        case 1:
                            insertedTile = _a.sent();
                            return [4 /*yield*/, database.collection('tiles').countDocuments()];
                        case 2:
                            tileCount = _a.sent();
                            chai_1.expect(tileCount).to.be.equal(1);
                            chai_1.expect(insertedTile.id).to.be.equal(1);
                            chai_1.expect(insertedTile.ICESName).to.be.equal("-1");
                            chai_1.expect(insertedTile.west).to.be.equal(7.0);
                            chai_1.expect(insertedTile.south).to.be.equal(54.5);
                            chai_1.expect(insertedTile.east).to.be.equal(13.0);
                            chai_1.expect(insertedTile.north).to.be.equal(57.5);
                            chai_1.expect(insertedTile.scale).to.be.equal(1);
                            chai_1.expect(insertedTile.filename).to.be.equal("ROOT.png");
                            chai_1.expect(insertedTile.image_width).to.be.equal(2000);
                            chai_1.expect(insertedTile.image_height).to.be.equal(2000);
                            chai_1.expect(insertedTile.image_west).to.be.equal(7.0);
                            chai_1.expect(insertedTile.image_south).to.be.equal(54.31614);
                            chai_1.expect(insertedTile.image_east).to.be.equal(13.0);
                            chai_1.expect(insertedTile.image_north).to.be.equal(57.669343);
                            chai_1.expect(insertedTile.contained_by).to.be.equal(-1);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('update()', function () {
        it('should update an existing document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var updatedTileModel, updatedTile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, insertTestTiles()];
                        case 1:
                            _a.sent();
                            updatedTileModel = Tile_1.default.fromJson(JSON.stringify({ ICESName: '43F9-after', filename: '43F9-after.png' }));
                            return [4 /*yield*/, tileDaoMongo.update('a1-b2-c3-d4z', updatedTileModel)];
                        case 2:
                            updatedTile = _a.sent();
                            chai_1.expect(updatedTile.filename).to.be.equal('43F9-after.png');
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('delete()', function () {
        it('should delete an existing document', function () {
            return __awaiter(this, void 0, void 0, function () {
                var tileCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, insertTestTiles()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, tileDaoMongo.delete('a1-b2-c3-d4z')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, database.collection('tiles').countDocuments()];
                        case 3:
                            tileCount = _a.sent();
                            chai_1.expect(tileCount).to.be.equal(1);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('findAll()', function () {
        it('should return all tiles in collection', function () {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var tiles;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, insertTestTiles()];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, tileDaoMongo.findAll()];
                        case 2:
                            tiles = _c.sent();
                            chai_1.expect(tiles.length).to.be.equal(2);
                            chai_1.expect((_a = tiles[0]) === null || _a === void 0 ? void 0 : _a.filename).to.equal('43F9.png');
                            chai_1.expect((_b = tiles[1]) === null || _b === void 0 ? void 0 : _b.id).to.be.equal(2);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('find()', function () {
        it('should return tiles in collection by id', function () {
            return __awaiter(this, void 0, void 0, function () {
                var tile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, insertTestTiles()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, tileDaoMongo.find('a1-b2-c3-d4z')];
                        case 2:
                            tile = _a.sent();
                            chai_1.expect(tile.filename).to.equal('43F9.png');
                            chai_1.expect(tile.id).to.be.equal(1);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
