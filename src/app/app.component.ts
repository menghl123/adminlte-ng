import {
  Component, ComponentFactoryResolver, EventEmitter, OnInit, TemplateRef, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActionItem} from './components/button/action-item.model';
import {ModalService} from './components/modal/modal.service';
import {Modal} from './components/modal/modal.model';
import {ZeptoNGConfig} from './components/zepto-ng.config';
import {DialogService} from './components/dialog/dialog.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('selectPromptTemplate') selectPromptTemplate: TemplateRef<any>;

  constructor(private dialogService: DialogService, private zpNGConfig: ZeptoNGConfig, private viewContainerRef: ViewContainerRef,
              private modalService: ModalService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.zpNGConfig.rootContainer = this.viewContainerRef;
  }

  title = 'app';
  actions: ActionItem[] = [
    {
      text: 'Action Header',
      header: true
    },
    {
      id: 1,
      text: 'Save',
      icon: 'glyphicon glyphicon-floppy-save'
    }, {
      id: 2,
      text: 'Refresh',
      icon: 'glyphicon glyphicon-refresh'
    },
    {
      divider: true
    },
    {
      id: 3,
      text: 'Remove',
      icon: 'glyphicon glyphicon-remove'
    }];

  openModal() {
    this.modalService.open<string>({
      component: ModalTestComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        text: 'I am from resolve data!'
      }
    })
      .subscribe(data => {
        console.log('Rebirth Modal -> Get ok with result:', data);
      }, error => {
        console.error('Rebirth Modal -> Get cancel with result:', error);
      });
  }
  alert() {
    this.dialogService.alert({
      title: 'I\'m a rebirth alert!',
      content: 'This is <strong>rebirth alert</strong> content.',
      // yes: '确定',
      icon: 'icon-success',
      html: true,
    })
      .subscribe(
        data => console.log('Rebirth alert get yes result:', data),
        error => console.error('Rebirth alert get no result:', error)
      );
  }

  confirm() {
    this.dialogService.confirm({
      title: 'I\'m a rebirth confirm!',
      content: 'This is <strong>rebirth confirm</strong> content.',
      html: true,
      // icon: 'icon-success',
      // yes: '确定',
      // no: '取消',
      // rootContainer: this.viewContainerRef
    })
      .subscribe(
        data => console.log('Rebirth confirm get yes result:', data),
        error => console.error('Rebirth confirm get no result:', error)
      );
  }

  prompt() {
    this.dialogService.prompt({
      title: 'Name',
      content: {
        label: 'Name',
        placeholder: 'Input your name',
        validators: { required: { validator: Validators.required, message: 'Please input your name!' } }
      }
    })
      .subscribe(
        data => console.log('Rebirth confirm get yes result:', data),
        error => console.error('Rebirth confirm get no result:', error)
      );
  }

  promptWithTemplate() {
    this.dialogService.prompt({
      title: 'Country',
      content: {
        label: 'Country',
        template: this.selectPromptTemplate,
        validators: { required: { validator: Validators.required, message: 'Please choose your country!' } }
      }
    })
      .subscribe(
        data => console.log('Rebirth confirm get yes result:', data),
        error => console.error('Rebirth confirm get no result:', error)
      );
  }
}

@Component({
  selector: 're-modal-test',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">I'm a rebirth modal!</h5>
      <button style="cursor: pointer" type="button" class="close" data-dismiss="modal" aria-label="Close"
              (click)="cancel()">
        <span aria-hidden="true">&times;</span></button>
    </div>
    <div class="modal-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="textInput" class="col-sm-2 control-label">Text:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="textInput" name="text" [(ngModel)]="context.text"/>
          </div>
        </div>
      </form>
      <hr>
      <strong>Modal context:</strong>
      <pre>{{context | json}}</pre>
      <hr>
      <button class="btn btn-default" (click)="show()">Open inner modal!</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="ok()">Ok</button>
      <button type="button" class="btn btn-warning" (click)="cancel()">Cancel</button>
    </div>`
})
export class ModalTestComponent implements Modal, OnInit {

  context: { text: string };
  dismiss: EventEmitter<string>;

  constructor(private modalService: ModalService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
  }

  show() {
    this.modalService.open<string>({
      component: ModalTestComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        text: 'inner modal'
      },
      size: 'sm'
    })
      .subscribe(data => {
        console.log('Rebirth Modal -> Get ok with result:', data);
      }, error => {
        console.error('Rebirth Modal -> Get cancel with result:', error);
      });
  }

  ok() {
    this.dismiss.emit(this.context.text);
  }

  cancel() {
    this.dismiss.error(this.context.text);
  }
}
