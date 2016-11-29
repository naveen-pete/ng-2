import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  constructor(private service: ShoppingListService) { }

  ngOnChanges(changes) {
    if(changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = { name: null, amount: null };
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient) {
    let newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    if(this.isAdd) {
      this.item = newIngredient;
      this.service.addItem(this.item);
    } else {
      this.service.editItem(this.item, newIngredient);
      this.onClear();
    }
  }

  onDelete() {
    this.service.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }

}
