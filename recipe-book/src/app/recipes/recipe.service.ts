import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/rx';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Masala Dosa', 
      'Masala dosa or Masale Dose is a variant of the popular South Indian food dosa and has its origins in Tuluva Mangalorean cuisine made popular by the Udupi hotels all over India.', 
      '/assets/images/masala-dosa.jpg',
      [
        new Ingredient('Rice', 330),
        new Ingredient('Urad Dal', 125),
        new Ingredient('Chana Dal', 1),
        new Ingredient('Methi Seeds', 20),
        new Ingredient('Potato', 4),
        new Ingredient('Onion', 2),
        new Ingredient('Mustard Seeds', 0.5),
        new Ingredient('Salt', 1)
      ]),

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

  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    console.log('RecipeService.storeData() - recipes:', this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipe-book-23fa0.firebaseio.com/recipes.json', body, headers);
  }

  fetchData() {
    this.http.get('https://recipe-book-23fa0.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          console.log('RecipeService.fetchData() - data:', data);
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
}
