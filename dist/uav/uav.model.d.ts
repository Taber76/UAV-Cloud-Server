export declare class UAV {
    private readonly uavName;
    private jwt;
    private ip;
    constructor(uavName: string, jwt: string, ip: string);
    setIpAndJwt(ip: string, jwt: string): void;
}
