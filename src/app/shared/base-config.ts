type ConfigFields<T extends Record<string, any>> = keyof T;

type FieldOpt = {
  title: string;
}

export class Field {
  constructor(private readonly title: string) {}
}

export abstract class BaseConfig<T extends Record<string, any>> {
  private fieldsMap: { [K in ConfigFields<T>]?: Field } = {};
  constructor() {
    this.init();
  }

  protected  abstract init(): void;

  getOrCreateField(fieldName: ConfigFields<T>, opt?: FieldOpt): Field {
    if (this.fieldsMap.hasOwnProperty(fieldName)) {
      return this.fieldsMap[fieldName] as Field;
    }
    this.fieldsMap[fieldName] = new Field(opt?.title || "");
    return this.fieldsMap[fieldName];
  }

  getFieldByName(fieldName: ConfigFields<T>): Field | undefined {
    if (this.fieldsMap.hasOwnProperty(fieldName)) {
      return this.fieldsMap[fieldName] as Field;
    }
    return undefined;
  }

}
