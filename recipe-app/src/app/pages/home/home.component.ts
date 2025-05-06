import { Component } from '@angular/core';
import { RecipeCardComponent } from "../../components/recipe-card/recipe-card.component";
import { Recipe } from "./interfaces/recipe.interface"
import { RecipesService } from '../../services/recipes.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { db } from '../../db/db';

@Component({
selector: 'app-home',
imports: [RecipeCardComponent, FormsModule],
templateUrl: './home.component.html',
styleUrl: './home.component.scss'
})
export class HomeComponent {
recipes: Recipe[] = [];
dummyRecipes!: Recipe[];

updatedRecipes!: Recipe[];
filteredRecipes!: Recipe[];
dbRecipes!: any[];
errorMessage: any = '';
searchValue = '';
dbSubscription: any;

constructor(public recipesService: RecipesService, readonly router: Router){
}

ngOnInit(){
  this.recipes = this.recipesService.recipes;
  this.recipesService.getAllRecipes().subscribe({
  next: (response) => {
  console.log(response);
  this.dummyRecipes = response.recipes;
  this.updateCombinedRecipes();
  },
  error: (err) => {
  console.log(err);
  this.errorMessage = err;
  }
  });

  


this.dbSubscription=db.subscribeQuery({ recipes : {}}, (resp) => {
  if (resp.error){
  this.errorMessage = resp.error;
  }
  if (resp.data){
  this.dbRecipes = resp.data.recipes;
  this.updateCombinedRecipes();
  }
  });
}

ngOnDestroy(){
  this.dbSubscription();
}

updateCombinedRecipes(){
const dummy = this.dummyRecipes || [];
const dbRecs = this.dbRecipes || [];
this.updatedRecipes = [...dummy, ...dbRecs];
this.filteredRecipes = this.updatedRecipes;
}


filterValues(){
this.filteredRecipes= this.updatedRecipes.filter((recipe)=>
recipe.name.toUpperCase().includes(this.searchValue.toUpperCase())
);
}

redirectToAddRecipe(){
this.router.navigateByUrl('add-recipe');
}
}

