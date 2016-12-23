import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/rx';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private recipeIndex: number;
  private recipe: Recipe;
  private subscription: Subscription;
  private isNew = true;

  constructor(private route: ActivatedRoute, 
              private service: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];   // cast from string to number using +
          this.recipe = this.service.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
    console.log('isNew:', this.isNew);
  }

  onSubmit() {
    let newRecipe = this.recipeForm.value;
    if(this.isNew) {
      this.service.addRecipe(newRecipe);
    } else {
      this.service.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onAddItem(name: string, amount: string) {
    let ingredients: FormArray = <FormArray>this.recipeForm.controls['ingredients'];
    ingredients.push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [
          Validators.required,
          Validators.pattern('\\d+')
        ])
      })
    );
  }

  onRemoveItem(index: number) {
    let ingredients: FormArray = <FormArray>this.recipeForm.controls['ingredients'];
    ingredients.removeAt(index);
  }

  onCancel() {
    this.navigateBack();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if(!this.isNew) {
      if(this.recipe.hasOwnProperty('ingredients')) {
        for(let i=0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [
                Validators.required,
                Validators.pattern('\\d+')
              ])
            })
          );
        }
      }
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
    }
    
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients
    });

  }

}
