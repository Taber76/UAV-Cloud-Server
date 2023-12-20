
export class UAV {

  constructor(
    private readonly uavName: string,
    private jwt: string,
    private ip: string
  ) { }


  // METODOS -------------------------------------------

  // PROPIEDADES -----------------------------------
  // -- SET --
  setIpAndJwt(ip: string, jwt: string) {
    this.ip = ip;
    this.jwt = jwt;
  }

}

