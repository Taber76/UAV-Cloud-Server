/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Uav } from './uav.schema';
import { GlobalService } from 'src/global/global.service';
import { UavConnection } from 'src/types/uav.types';
export declare class UavService {
    private readonly uavModel;
    private readonly globalService;
    constructor(uavModel: Model<Uav>, globalService: GlobalService);
    register(uav: Uav): Promise<import("mongoose").Document<unknown, {}, Uav> & Uav & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uavConection(data: UavConnection, ip: string, uavInstances: {
        [key: string]: any;
    }): Promise<{
        response: string;
    }>;
}
