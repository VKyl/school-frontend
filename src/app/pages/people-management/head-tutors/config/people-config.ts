import {BaseConfig} from '../../../shared/base-config';
import {ParticipantViewDto, Student, Tutor, User, UserViewDto} from '../models/users.dto';


export abstract class BaseUserConfig<T extends UserViewDto> extends BaseConfig<T> {
  constructor(){
    super();
    this.getOrCreateField("name", {title: "Name"});
    this.getOrCreateField("email", {title: "Email"});
  }
}

export class TutorConfig extends BaseUserConfig<Tutor> {
  protected init() {}
}

export class StudentConfig extends BaseConfig<Student> {
  protected  init() {
    this.getOrCreateField("group", {title: "Group"});
  }
}
