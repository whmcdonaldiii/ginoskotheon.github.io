import React, {Component} from 'react';

import RecipeList from './recipe_list';



const Recipe = (props) => {
  // console.log(props.recipes);
  // console.log(props.delete);

  const Recipes = props.recipes.map((recipe, index) => {
    // console.log(recipe.delete)
    return <RecipeList key={index} title={recipe.title} ingredients={recipe.ingredients} number={index + 1} delete={props.delete} edit={props.edit}/>

  });



  return (
    <div className="panel-group">
      {Recipes}
    </div>

  );
}

export default Recipe;


//
