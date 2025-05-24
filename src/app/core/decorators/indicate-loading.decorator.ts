import {tap} from 'rxjs/operators';
import {LoadingControl} from "../models/loading-control/loading-control.model";

export function IndicateLoading(loadingControl: LoadingControl) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originMethod = Reflect.get(target, propertyKey);

    descriptor.value = function (...args: any[]) {
      loadingControl.startLoading();
      return originMethod.apply(this, args)
        .pipe(
          tap({
            next: () => loadingControl.stopLoading(),
            error: () => loadingControl.stopLoading()
          }),
        );
    };

    return descriptor;
  };
}
