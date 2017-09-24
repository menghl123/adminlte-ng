import { Component, EventEmitter } from '@angular/core';
import { DialogOptions } from './dialog-options.model';
import {Modal} from '../modal/modal.model';
import {ZeptoNGConfig} from '../zepto-ng.config';
import {ModalDismissReasons} from '../modal/modal-dismiss-reasons.model';

@Component({
  selector: 'zp-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./dialog.scss']
})
export class ConfirmDialogComponent implements Modal {
  context: DialogOptions;
  dismiss: EventEmitter<any>;
  btnYes: string;
  btnNo: string;
  btnYesType: string;
  btnNoType: string;

  constructor(private zeptoNGConfig: ZeptoNGConfig) {
    this.btnYes = zeptoNGConfig.dialog.button.yes;
    this.btnYesType = zeptoNGConfig.dialog.button.btnYesType;
    this.btnNo = zeptoNGConfig.dialog.button.no;
    this.btnNoType = zeptoNGConfig.dialog.button.btnNoType;
  }

  yes() {
    this.dismiss.emit(ModalDismissReasons.YES);
  }

  no() {
    this.dismiss.error(ModalDismissReasons.NO);
  }

}
