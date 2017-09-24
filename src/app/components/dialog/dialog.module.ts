import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertDialogComponent} from './alert-dialog.component';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {PromptDialogComponent} from './prompt-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ZeptoCommonModule} from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ZeptoCommonModule,
    ReactiveFormsModule
  ],
  declarations: [AlertDialogComponent, ConfirmDialogComponent, PromptDialogComponent],
  entryComponents: [AlertDialogComponent, ConfirmDialogComponent, PromptDialogComponent]
})
export class DialogModule {
}
