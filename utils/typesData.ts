interface Type {
  typeId: number;
  name: string;
}

class TypesData implements Type {
  static RECIEVER: Type = { typeId: 1, name: 'Receiver' };
  static USER: Type = { typeId: 2, name: 'User' };

  public readonly typeId: number;
  public readonly name: string;

  constructor(typeId: number, name: string) {
    this.typeId = typeId;
    this.name = name;
  }
}
