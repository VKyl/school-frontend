import {signal, WritableSignal} from "@angular/core";

export class LoadingControl {
  private $loadingStatus: WritableSignal<boolean> = signal(false);
  $loading = this.$loadingStatus.asReadonly();

  constructor(isLoading = false) {
    this.$loadingStatus.set(isLoading);
  }

  startLoading(): void {
    this.$loadingStatus.set(true);
  }

  stopLoading(): void {
    this.$loadingStatus.set(false);
  }
}
