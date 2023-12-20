import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  public uavName: string;
  public uavUrl: string;
  public jwtUav: string;
}
