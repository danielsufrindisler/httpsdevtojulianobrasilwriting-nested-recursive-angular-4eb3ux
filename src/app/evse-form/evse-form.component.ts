import {
  Component,
  OnDestroy,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnInit
} from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface EvseFormComponentData {
  variable: any;
}

@Component({
  selector: "app-evse-form",
  templateUrl: "./evse-form.component.html",
  styleUrls: ["./evse-form.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EvseFormComponent),
      multi: true
    }
  ]
})
export class EvseFormComponent
  implements ControlValueAccessor, OnDestroy, OnInit {
  @Input()
  formLabel: string | number = "Evse";

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  private _onChange: (
    value: EvseFormComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this._createFormGroup();

    this._setupObservables();
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  writeValue(value: EvseFormComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: EvseFormComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error("registerOnTouched not implemented");
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error("setDisabledState not implemented");
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      variable: null
    });
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }
}
