import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface FormComponent {
  isFormDirty() : boolean;
}

@Injectable()
export class UnsavedChangesGuardService implements CanDeactivate<FormComponent> {
  canDeactivate(component: FormComponent) {
    if(component.isFormDirty()) {
      return confirm('You have unsaved changes. Are you sure you want to navigate away?');
    }

    return true;
  }
}
