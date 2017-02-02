import React, { Component } from 'react';
import update from 'react-addons-update';
import LocalStorage from 'react-localstorage';

import Recipe from './recipe';
// import Modal from './modal';

var defaultRecipes = [
  {
    title: 'Dumplings',
    ingredients: ['Water', 'Flour', 'Filling']
  }

];
var actualRecipes;
if (localStorage.recipeBook) actualRecipes = JSON.parse(localStorage.recipeBook);
  else actualRecipes = defaultRecipes;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeBook: actualRecipes
    };

  }




  deleteRecipe(item) {
    var recipeBook = this.state.recipeBook;
    console.log(recipeBook);
    var item = item-1
    console.log(item);
    recipeBook.splice(item, 1);
    this.setState({
      recipeBook: recipeBook
    });
  }

  editRecipe(item, title, ingr) {
    var recipeBook = this.state.recipeBook;
    console.log(recipeBook);
    var item = item-1
    console.log(item);
    var title = title;
    var ingr = ingr.split(",");
    var newRecipe = {
      title: title,
      ingredients: ingr
    }
    recipeBook.splice(item, 1, newRecipe);
    this.setState({
      recipeBook: recipeBook
    });
  }

  handleTitle(){
    const title = document.getElementById('title').value;
    return title;
  }

  handleIngredients(){
    const ingredients = document.getElementById('ingredients').value;
    return ingredients;
  }

  handleRecipe(event) {
    var title = this.handleTitle();
    var ingredients = this.handleIngredients().split(',');
    document.getElementById('myform').reset();
    var recipeBook = this.state.recipeBook.slice();
    console.log(recipeBook);
    var recipe = {
      title: title,
      ingredients: ingredients
    }
    recipeBook.push(recipe);
    this.setState({
      recipeBook: recipeBook
    });

  }

  componentDidUpdate() {
    localStorage.recipeBook = JSON.stringify(this.state.recipeBook);
  }

  render() {
    return (
      <div>
        <h2 className="text-center titles">Recipe Box!</h2>
        <hr/>
        <div className="well">
          <Recipe recipes={this.state.recipeBook} delete={this.deleteRecipe.bind(this)} edit={this.editRecipe.bind(this)}/>

        </div>
        <button className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">Add Recipe</button>

        {/*add modal*/}
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Add Recipe</h4>
              </div>
              <div className="modal-body">
                <form id="myform">
                  <div className="form-group">
                    <label htmlFor="title" className="control-label"></label>
                    <input type="text" name="title" placeholder="Recipe Name" id="title" className="form-control" onChange={() => this.handleTitle(event)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ingredients" className="control-label"></label>
                    <textarea type="textarea" label="Ingredients" placeholder="List Ingredients separated by a Comma" id="ingredients" className="form-control" onChange={() => this.handleIngredients(event)}></textarea>
                  </div>
                </form>


              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick={() => this.handleRecipe(event)} type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
