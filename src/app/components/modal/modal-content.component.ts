import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import {Modal} from './modal.model';
import {ModalOptions} from './modal-options.model';

@Component({
  selector: 'lte-modal-content',
  template: ``,
  exportAs: 'modalContent',
})
export class ModalContentComponent implements OnDestroy {
  modalContentRef: ComponentRef<Modal>;

  constructor(private modalContentContainer: ViewContainerRef, private  injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  addContent<T>(options: ModalOptions, dismiss: EventEmitter<any>) {
    const componentFactoryResolver = options.componentFactoryResolver || this.componentFactoryResolver;
    const componentFactory = componentFactoryResolver.resolveComponentFactory(options.component);
    this.modalContentRef = this.modalContentContainer.createComponent(
      componentFactory, this.modalContentContainer.length, options.injector || this.injector);
    const instance: Modal = this.modalContentRef.instance;
    instance.dismiss = dismiss;
    this.handelResolve(options, instance);
  }

  ngOnDestroy(): void {
    this.modalContentRef.destroy();
  }


  private handelResolve(options: ModalOptions, instance: Modal) {
    const resolve = options.resolve || {};
    if (resolve.then) {
      resolve.then(data => instance.context = data);
    } else if (resolve.subscribe) {
      resolve.subsctibe(data => instance.context = data);
    } else {
      instance.context = resolve;
    }
  }
}
