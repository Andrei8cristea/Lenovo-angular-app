import { Injectable } from '@angular/core';
import { Recipe } from '../pages/home/interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { db } from '../db/db';
import { id } from '@instantdb/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipes : Recipe[] = [];
  readonly API_URL = 'https://dummyjson.com/recipes';

  constructor(readonly http: HttpClient) {}

  getAllRecipes(){
    return this.http.get<{recipes:Recipe[]}>(this.API_URL);
  }

  getRecipes(id: number){
    return this.http.get<Recipe>(`${this.API_URL}/${id}`);
  }

  addDbRecipes(recipeInput: Omit<Recipe, 'id'>){
    const newId = id();
    db.transact(
      db.tx.recipes[newId].update({
        id:newId,
        name: recipeInput.name,
        image: recipeInput.image,
        difficulty: recipeInput.difficulty,
        prepTimeMinutes: recipeInput.prepTimeMinutes,
      })
    );

    //console.log('Succes, the recipe has been added')
    alert('Succes, the recipe has been added');
  }
}
