import { Injectable } from '@angular/core';
import { Recipe } from '../pages/home/interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get(`${this.API_URL}/${id}`);
  }
}
