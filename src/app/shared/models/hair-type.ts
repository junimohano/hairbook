export class HairType {
  hairTypeId: number;
  name: string;

  isChecked: boolean;
  public constructor(init?: Partial<HairType>) {
    Object.assign(this, init);
  }
}
