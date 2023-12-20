import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Ip
} from '@nestjs/common';
import { UavService } from './uav.service';
import { UavConnection, UavData } from 'src/types/uav.types';
import { UAV } from './uav.model';

@Controller('api/uav')
export class UavController {
  private uavInstances: { [key: string]: UAV } = {}

  constructor(
    private readonly uavService: UavService,
  ) { }


  // FROM WEB CLIENT ----------------------------------------------------------------
  // Register new UAV
  @Post('register')
  async register(@Body() data: UavData): Promise<any> {
    try {
      const response = await this.uavService.register(data);
      return response;
    } catch (error) {
      throw new HttpException({ response: false, error }, HttpStatus.BAD_REQUEST);
    }
  }

  // List of UAVs connected
  @Get('list')
  async list(): Promise<any> {
    return this.uavInstances;
  }


  // FROM UAV --------------------------------------------------------------------
  // Connection when UAV is powered
  @Post('uavconnect')
  async connect(@Body() data: UavConnection, @Ip() ip: string): Promise<any> {
    try {
      const response = await this.uavService.uavConection(
        data,
        ip,
        this.uavInstances
      );
      if (response.response === "Already connected") {
        return { response: true, msg: response.response };
      } else if (response.response === "Password Ok") {
        const newUAVInstance = new UAV(data.uavname, data.jwt, ip);
        this.uavInstances[data.uavname] = newUAVInstance;
        return { response: true, msg: response.response };
      } else {
        return { response: false, msg: response.response };
      }
    } catch {
      throw new HttpException({ response: false }, HttpStatus.BAD_REQUEST);
    }
  }

}
