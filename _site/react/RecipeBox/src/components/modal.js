import React from 'react';


const Modal = () => {


  return (
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">Edit Recipe</h4>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="title" className="control-label"></label>
                <input type="text" label="Recipe" placeholder="Recipe Name" id="title" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="ingredients" className="control-label"></label>
                <textarea type="textarea" label="Ingredients" placeholder="List Ingredients separated by a Comma" id="ingredients" className="form-control"></textarea>
              </div>
            </form>


          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button onClick={() => handleTitle()} type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Modal;
