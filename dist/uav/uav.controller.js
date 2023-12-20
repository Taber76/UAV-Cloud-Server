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
exports.UavController = void 0;
const common_1 = require("@nestjs/common");
const uav_service_1 = require("./uav.service");
const uav_model_1 = require("./uav.model");
let UavController = exports.UavController = class UavController {
    constructor(uavService) {
        this.uavService = uavService;
        this.uavInstances = {};
    }
    async register(data) {
        try {
            const response = await this.uavService.register(data);
            return response;
        }
        catch (error) {
            throw new common_1.HttpException({ response: false, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async list() {
        return this.uavInstances;
    }
    async connect(data, ip) {
        try {
            const response = await this.uavService.uavConection(data, ip, this.uavInstances);
            if (response.response === "Already connected") {
                return { response: true, msg: response.response };
            }
            else if (response.response === "Password Ok") {
                const newUAVInstance = new uav_model_1.UAV(data.uavname, data.jwt, ip);
                this.uavInstances[data.uavname] = newUAVInstance;
                return { response: true, msg: response.response };
            }
            else {
                return { response: false, msg: response.response };
            }
        }
        catch {
            throw new common_1.HttpException({ response: false }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UavController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('uavconnect'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UavController.prototype, "connect", null);
exports.UavController = UavController = __decorate([
    (0, common_1.Controller)('api/uav'),
    __metadata("design:paramtypes", [uav_service_1.UavService])
], UavController);
//# sourceMappingURL=uav.controller.js.map