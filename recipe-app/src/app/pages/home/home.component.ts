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

constructor(recipesService: RecipesService, readonly router: Router){
  this.recipes = recipesService.recipes;
  recipesService.getAllRecipes().subscribe({
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

  


db.subscribeQuery({ recipes : {}}, (resp) => {
  if (resp.error){
  this.errorMessage = resp.error;
  }
  if (resp.data){
  this.dbRecipes = resp.data.recipes;
  this.updateCombinedRecipes();
  }
  });

}




updateCombinedRecipes(){
// Dacă oricare din liste nu este încă încărcată, folosește array-uri goale
const dummy = this.dummyRecipes || [];
const dbRecs = this.dbRecipes || [];
// Combină ambele liste; presupunem că nu există duplicate
this.updatedRecipes = [...dummy, ...dbRecs];
// Inițial, lista filtrată este egală cu lista combinată
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

