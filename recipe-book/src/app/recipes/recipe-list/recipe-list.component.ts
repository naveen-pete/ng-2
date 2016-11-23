import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Masala Dosa', 
      'Masala dosa or Masale Dose is a variant of the popular South Indian food dosa and has its origins in Tuluva Mangalorean cuisine made popular by the Udupi hotels all over India.', 
      '/assets/images/masala-dosa.jpg',
      []),

    new Recipe('Neer Dosa', 
      'Neer dosa or Neer dose literally meaning Water dosa is a crêpe prepared from rice batter. It is light type of dosa, an Indian dish.', 
      '/assets/images/neer-dosa.jpg',
      []),

    new Recipe('Rava Idli', 
      'Rava idli is a variation of the popular South Indian breakfast item, idli, made with rava or Bombay rava.', 
      '/assets/images/rava-idli.jpg',
      []),

    new Recipe('Puliyogare', 
      'Pulihora, Puliyodarai, Puliyogare or simply Tamarind Rice is a common rice preparation in the South Indian states of Andhra Pradesh, Telangana, Karnataka and Tamil Nadu.', 
      '/assets/images/puliyogare.jpg',
      [])
  ];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
