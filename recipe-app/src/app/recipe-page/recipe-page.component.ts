import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../pages/home/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent implements OnInit {

  recipe: Recipe | null = null;
  recipeId: number | null = null; // Store ID separately

  constructor(
    private router: ActivatedRoute,
    private recipeService: RecipesService,
    private navigation: Router
  ) {}

  ngOnInit() {
    this.recipeId = Number(this.router.snapshot.paramMap.get("id")); // Store route ID
    this.loadRecipe();
  }

  loadRecipe() {
    if (this.recipeId) {
      this.recipeService.getRecipes(this.recipeId).subscribe({
        next: (data: Recipe) => this.recipe = data,
        error: (err) => console.error("Error fetching recipe:", err)
      });
    }
  }

  redirectToHomeComponent(){
    this.navigation.navigateByUrl('recipes');
  }
}
