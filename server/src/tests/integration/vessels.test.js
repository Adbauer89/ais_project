"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var chai_1 = __importStar(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var mongodb_1 = require("mongodb");
var Mongo_1 = __importDefault(require("../../src/daos/databases/Mongo"));
var src_1 = __importDefault(require("../../src"));
var DatabaseConfig_1 = require("../../src/config/DatabaseConfig");
describe('VesselIntegration', function () {
    var _this = this;
    var database;
    var url = 'mongodb://localhost:27017';
    var databaseName = 'test_ais_project';
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            var databaseConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process.env["DATABASE_NAME"] = databaseName;
                        process.env["DATABASE_URL"] = url;
                        process.env["DATABASE_TYPE"] = 'mongo';
                        databaseConfig = DatabaseConfig_1.DatabaseConfig.Config;
                        return [4 /*yield*/, Mongo_1.default.getDatabase(databaseConfig)];
                    case 1:
                        database = _a.sent();
                        chai_1.default.use(chai_http_1.default);
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
                            return collection.collectionName === 'vessels';
                        })) return [3 /*break*/, 3];
                        return [4 /*yield*/, database.dropCollection('vessels')];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, database.createCollection('vessels')];
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
    var insertTestVessels = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.collection('vessels').insertMany([
                        {
                            _id: new mongodb_1.ObjectId('a1-b2-c3-d4z'),
                            IMO: 1,
                            Name: 'One'
                        },
                        {
                            _id: new mongodb_1.ObjectId('b1-b2-c3-d4z'),
                            IMO: 2,
                            Name: 'Two'
                        },
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    describe('getVessels', function () {
        it('should get empty array when there are no vessels', function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, chai_1.default.request(src_1.default).get('/vessels')];
                        case 1:
                            response = _a.sent();
                            chai_1.expect(response.body).to.deep.equal([]);
                            chai_1.expect(response.status).to.be.equal(200);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('should get array of vessels', function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, insertTestVessels()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, chai_1.default.request(src_1.default).get('/vessels')];
                        case 2:
                            response = _a.sent();
                            chai_1.expect(response.body).to.deep.equal([
                                {
                                    id: new mongodb_1.ObjectId('a1-b2-c3-d4z').toHexString(),
                                    imo: 1,
                                    name: 'One',
                                    flag: null,
                                    built: null,
                                    length: null,
                                    breadth: null,
                                    tonnage: null,
                                    mmsi: null,
                                    vessel_type: null,
                                    owner: null,
                                    former_names: null,
                                },
                                {
                                    id: new mongodb_1.ObjectId('b1-b2-c3-d4z').toHexString(),
                                    imo: 2,
                                    name: 'Two',
                                    flag: null,
                                    built: null,
                                    length: null,
                                    breadth: null,
                                    tonnage: null,
                                    mmsi: null,
                                    vessel_type: null,
                                    owner: null,
                                    former_names: null,
                                },
                            ]);
                            chai_1.expect(response.status).to.be.equal(200);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('createVessel', function () {
        it('should get inserted vessel from database', function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, chai_1.default.request(src_1.default).post('/vessels').send(JSON.stringify({ IMO: 12 }))];
                        case 1:
                            response = _a.sent();
                            chai_1.expect(response.body.imo).to.be.equal(12);
                            chai_1.expect(response.body.id).to.not.be.null;
                            chai_1.expect(response.status).to.be.equal(201);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('findVessel', function () {
        it('should get inserted vessel from database', function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, insertTestVessels()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, chai_1.default.request(src_1.default).get('/vessels/' + new mongodb_1.ObjectId('a1-b2-c3-d4z').toHexString())];
                        case 2:
                            response = _a.sent();
                            chai_1.expect(response.body.imo).to.be.equal(1);
                            chai_1.expect(response.body.name).to.be.equal('One');
                            chai_1.expect(response.body.id).to.not.be.null;
                            chai_1.expect(response.status).to.be.equal(200);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('updateVessel', function () {
        it('should update vessel in the database', function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, insertTestVessels()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, chai_1.default.request(src_1.default).put('/vessels/' + new mongodb_1.ObjectId('a1-b2-c3-d4z').toHexString())
                                    .send(JSON.stringify({ IMO: 3, Breadth: 120 }))];
                        case 2:
                            response = _a.sent();
                            chai_1.expect(response.body.imo).to.be.equal(3);
                            chai_1.expect(response.body.name).to.be.equal('One');
                            chai_1.expect(response.body.breadth).to.be.equal(120);
                            chai_1.expect(response.body.id).to.be.equal(new mongodb_1.ObjectId('a1-b2-c3-d4z').toHexString());
                            chai_1.expect(response.status).to.be.equal(200);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('deleteVessel', function () {
        it('should delete vessel in the database', function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, vesselsInDatabase;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, insertTestVessels()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, chai_1.default.request(src_1.default).delete('/vessels/' + new mongodb_1.ObjectId('a1-b2-c3-d4z').toHexString())];
                        case 2:
                            response = _a.sent();
                            chai_1.expect(response.status).to.be.equal(204);
                            return [4 /*yield*/, database.collection('vessels').countDocuments()];
                        case 3:
                            vesselsInDatabase = _a.sent();
                            chai_1.expect(vesselsInDatabase).to.be.equal(1);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('notFound', function () {
        it('should return not found', function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, chai_1.default.request(src_1.default).post('/undefined-route').send(JSON.stringify({ IMO: 12 }))];
                        case 1:
                            response = _a.sent();
                            chai_1.expect(response.status).to.be.equal(404);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
