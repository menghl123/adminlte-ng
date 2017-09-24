import {Component, EventEmitter, OnInit, TemplateRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, FormControl} from '@angular/forms';
import {DialogOptions, PromptContent} from './dialog-options.model';
import {ZeptoNGConfig} from '../zepto-ng.config';
import {ModalDismissReasons} from '../modal/modal-dismiss-reasons.model';
import {Modal} from '../modal/modal.model';

@Component({
  selector: 'zp-prompt',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./dialog.scss']
})

export class PromptDialogComponent implements Modal, OnInit {

  context: DialogOptions;
  content: PromptContent;
  dismiss: EventEmitter<any>;
  btnYes: string;
  btnNo: string;
  btnYesType: string;
  btnNoType: string;
  form: FormGroup;
  validators: { [key: string]: { validator: ValidatorFn, message: string } };
  @ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;

  constructor(private zeptoNGConfig: ZeptoNGConfig,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) {
    this.btnYes = zeptoNGConfig.dialog.button.yes;
    this.btnYesType = zeptoNGConfig.dialog.button.btnYesType;
    this.btnNo = zeptoNGConfig.dialog.button.no;
    this.btnNoType = zeptoNGConfig.dialog.button.btnNoType;
  }

  ngOnInit(): void {
    this.content = this.context.content as PromptContent;
    this.validators = this.content.validators || {};

    const validatorFns = Object.keys(this.validators).map((key) => this.validators[key].validator);
    this.form = this.formBuilder.group({
      promptValue: [this.content.defaultValue || '', validatorFns]
    });
    this.form.valueChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  getFieldErrors(control: FormControl) {
    if (control && control.errors) {
      const errors = Object.keys(control.errors).filter((key) => control.errors[key]);
      return errors.length > 0 ? [errors[0]] : [];
    }
  }

  yes() {
    this.dismiss.emit({...this.form.value, type: ModalDismissReasons.YES});
  }

  no() {
    this.dismiss.error(ModalDismissReasons.NO);
  }
}
