export class HairType {
  hairTypeId: number;
  name: string;

  public constructor(init?: Partial<HairType>) {
    Object.assign(this, init);
  }
}
