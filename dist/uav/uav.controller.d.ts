import { UavService } from './uav.service';
import { UavConnection, UavData } from 'src/types/uav.types';
export declare class UavController {
    private readonly uavService;
    private uavInstances;
    constructor(uavService: UavService);
    register(data: UavData): Promise<any>;
    list(): Promise<any>;
    connect(data: UavConnection, ip: string): Promise<any>;
}
