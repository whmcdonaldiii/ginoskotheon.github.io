import React, { Component } from 'react';


export default class RecipeList extends Component {
  constructor(props) {
    super(props);
    // console.log(props)

  }

  handleTitle(){
    var title = document.getElementById(`title${this.props.number}`).value;

    // console.log(title);
    return title;


  }

  handleIngredients(){
    var ingredients = document.getElementById(`ingredients${this.props.number}`).value;
    return ingredients;
  }

  editRecipe(){
    var item = document.getElementById(`nums${this.props.number}`).value;
    var title = this.handleTitle();
    var ingredients = this.handleIngredients();
    this.props.edit(item, title, ingredients);
  }
  deleteRecipe() {
    var item = (document.getElementById(`nums${this.props.number}`).value);
    // console.log(item);
    this.props.delete(item);

  }

  render(){
    return (

      <div className="panel panel-default">
        <div id="openRecipe" className="panel-heading">
          <h4 className="panel-title">
            <a id="thetitle" data-toggle="collapse"  href={`#collapse${this.props.number}`}>{this.props.title}</a>
          </h4>
        </div>
        <div id={`collapse${this.props.number}`} className="panel-collapse collapse">
          <input id={`nums${this.props.number}`} type="hidden" value={this.props.number} />
          <div className="panel-body">
            <h3 className="text-center">Ingredients!</h3>
            <hr/>
              <ul className="list-group">
                {this.props.ingredients.map((ingredient, ind) => {
                  return <li className="list-group-item" key={ind}>{ingredient}</li>;
                })}
              </ul>
              <br/>
              <button onClick={() => this.deleteRecipe()} className="btn btn-danger">Delete</button>
              <button className="btn btn-primary btn-md" data-toggle="modal" data-target={`#myModal${this.props.number}`} >Edit Recipe</button>
          </div>
          {/*edit modal*/}
          <div className="modal fade" id={`myModal${this.props.number}`} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">Edit Recipe</h4>
                </div>
                <div className="modal-body">
                  <form id="myform2">
                    <div className="form-group">
                      <label htmlFor="title" className="control-label"></label>
                      <input type="text" name="title" placeholder="Recipe Name" id={`title${this.props.number}`} className="form-control" defaultValue={this.props.title}  />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ingredients" className="control-label"></label>
                      <textarea type="textarea" label="Ingredients" placeholder="List Ingredients separated by a Comma" id={`ingredients${this.props.number}`} className="form-control" defaultValue={this.props.ingredients}></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button onClick={() => this.editRecipe()} type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
