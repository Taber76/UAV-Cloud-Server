"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcrypt");
let UserService = exports.UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(user) {
        user.password = await bcrypt.hash(user.password, 10);
        try {
            return await this.userModel.create(user);
        }
        catch (error) {
            throw error;
        }
    }
    async login(user) {
        try {
            const userFound = await this.userModel.findOne({ username: user.username });
            if (userFound) {
                const match = await bcrypt.compare(user.password, userFound.password);
                if (match) {
                    return userFound;
                }
                else {
                    throw new Error('Password incorrect');
                }
            }
            else {
                throw new Error('User not found');
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
//# sourceMappingURL=user.service.js.map