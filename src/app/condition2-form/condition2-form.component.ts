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

export interface Condition2FormComponentData {
  variable: any;
}

@Component({
  selector: "app-condition2-form",
  templateUrl: "./condition2-form.component.html",
  styleUrls: ["./condition2-form.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Condition2FormComponent),
      multi: true
    }
  ]
})
export class Condition2FormComponent
  implements ControlValueAccessor, OnDestroy, OnInit {
  @Input()
  formLabel: string | number = "Condition2";

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  private _onChange: (
    value: Condition2FormComponentData | null | undefined
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

  writeValue(value: Condition2FormComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: Condition2FormComponentData | null | undefined) => void
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
