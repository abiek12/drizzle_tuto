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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./drizzle/db");
const schema_1 = require("./user/schema");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield insertUser();
    yield fetchUsers();
    console.log('Server started');
});
const insertUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.insert(schema_1.usersTable).values({
            userName: "John Doe",
            age: 30,
            email: "john@mailinator.com",
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.db.query.usersTable.findFirst();
        console.log(users);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
main();
