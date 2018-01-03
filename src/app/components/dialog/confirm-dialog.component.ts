import { Component, EventEmitter } from '@angular/core';
import { Modal, ModalDismissReasons } from '../modal';
import { DialogOptions } from './dialog-options.model';
import {AdminlteNGConfig} from '../adminlte.config';

@Component({
  selector: 'lte-confirm-dialog',
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

  constructor(private rebirthNGConfig: AdminlteNGConfig) {
    this.btnYes = rebirthNGConfig.dialog.button.yes;
    this.btnYesType = rebirthNGConfig.dialog.button.btnYesType;
    this.btnNo = rebirthNGConfig.dialog.button.no;
    this.btnNoType = rebirthNGConfig.dialog.button.btnNoType;
  }

  yes() {
    this.dismiss.emit(ModalDismissReasons.YES);
  }

  no() {
    this.dismiss.error(ModalDismissReasons.NO);
  }

}
