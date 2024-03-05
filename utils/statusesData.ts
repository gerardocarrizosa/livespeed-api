interface Status {
  statusId: number;
  name: string;
  type: number;
}

class StatusesData implements Status {
  public static readonly INACTIVE_RECEIVER: Status = {
    statusId: 1,
    name: 'Inactive',
    type: TypesData.RECIEVER.typeId,
  };
  public static readonly ACTIVE_RECEIVER: Status = {
    statusId: 2,
    name: 'Active',
    type: TypesData.RECIEVER.typeId,
  };
  public static readonly UNDER_MAINTENANCE_RECEIVER: Status = {
    statusId: 3,
    name: 'Under maintenance',
    type: TypesData.RECIEVER.typeId,
  };

  public readonly statusId: number;
  public readonly name: string;
  public readonly type: number;

  public constructor(statusId: number, name: string, type: number) {
    this.statusId = statusId;
    this.name = name;
    this.type = type;
  }
}
