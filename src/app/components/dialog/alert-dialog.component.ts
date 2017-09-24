import {Component, EventEmitter, OnInit} from '@angular/core';
import {DialogOptions} from './dialog-options.model';
import {ZeptoNGConfig} from '../zepto-ng.config';
import {Modal} from '../modal/modal.model';
import {ModalDismissReasons} from '../modal/modal-dismiss-reasons.model';

@Component({
  selector: 'zp-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./dialog.scss'],
})
export class AlertDialogComponent implements Modal {
  context: DialogOptions;
  dismiss: EventEmitter<any>;
  btnYes: string;
  btnYesType: string;

  constructor(private zeptoNGConfig: ZeptoNGConfig) {
    this.btnYes = this.zeptoNGConfig.dialog.button.yes;
    this.btnYesType = this.zeptoNGConfig.dialog.button.btnYesType;
  }

  yes() {
    this.dismiss.emit(ModalDismissReasons.YES);
  }

  no() {
    this.dismiss.error(ModalDismissReasons.NO);
  }

}
