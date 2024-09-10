export class Menu {
  name: string;
  actions: Action[];
}

export class Action {
  actionType: string;
  httpType: string;
  definiton: string;
  code: string;
}
