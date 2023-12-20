"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UAV = void 0;
class UAV {
    constructor(uavName, jwt, ip) {
        this.uavName = uavName;
        this.jwt = jwt;
        this.ip = ip;
    }
    setIpAndJwt(ip, jwt) {
        this.ip = ip;
        this.jwt = jwt;
    }
}
exports.UAV = UAV;
//# sourceMappingURL=uav.model.js.map