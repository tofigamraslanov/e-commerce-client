import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinnerService: NgxSpinnerService) {}

  showSpinner(spinnerType: SpinnerType) {
    this.spinnerService.show(spinnerType);

    // setTimeout(() => this.hideSpinner(spinnerType), 1000);
  }

  hideSpinner(spinnerType: SpinnerType) {
    this.spinnerService.hide(spinnerType);
  }
}

export enum SpinnerType {
  BallScaleMultiple = 's1',
  BallAtom = 's2',
  BallSpinClockwiseFadeRotating = 's3',
}
