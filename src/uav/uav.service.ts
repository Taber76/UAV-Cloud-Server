import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Uav } from './uav.schema';
import { GlobalService } from 'src/global/global.service';

import * as bcrypt from 'bcrypt';
import { UavConnection } from 'src/types/uav.types';

@Injectable()
export class UavService {
  constructor(
    @InjectModel(Uav.name) private readonly uavModel: Model<Uav>,
    private readonly globalService: GlobalService,
  ) { }

  async register(uav: Uav) {
    uav.password = await bcrypt.hash(uav.password, 10);
    try {
      return await this.uavModel.create(uav);
    } catch (error) {
      throw error;
    }
  }

  async uavConection(data: UavConnection, ip: string, uavInstances: { [key: string]: any }) {

    for (const key in uavInstances) {
      if (uavInstances[key].uavName === data.uavname) {
        uavInstances[key].setIpAndJwt(ip, data.jwt);
        return { response: "Already connected" };
      }
    }

    const uav = await this.uavModel.findOne({ uavname: data.uavname });
    if (!uav) {
      return { response: "UAV not found" };
    }
    const isMatch = await bcrypt.compare(data.password, uav.password);
    if (isMatch) {
      return { response: "Password Ok" };
    } else {
      return { response: "Password Incorrect" };
    }
  }

}
