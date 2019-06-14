import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import FilteredMultiSelect from './List/index'
import './List/index.css';
import * as serviceWorker from './serviceWorker';

const { Fragment } = React;

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------
const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);
// ------------------------------------------------------------
// End of above variable definition and initialization snippet.
// ------------------------------------------------------------
const BOOTSTRAP_CLASSES = {
  filter: 'form-control',
  select: 'form-control',
  button: 'btn btn btn-block btn-default',
  buttonActive: 'btn btn btn-block btn-primary',
}

class List extends React.Component {
  state = {
    selectedOptions: []
  }

  handleDeselect(index) {
    var selectedOptions = this.state.selectedOptions.slice()
    selectedOptions.splice(index, 1)
    this.setState({selectedOptions})
  }

  handleClearSelection = (e) => {
    this.setState({selectedOptions: []})
  }
  handleSelectionChange = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.name - b.name)
    this.setState({selectedOptions})
  }

  render() {
    var {selectedOptions} = this.state
    return(<div className="row">
      <div>
        <FilteredMultiSelect
          classNames={BOOTSTRAP_CLASSES}
          onChange={this.handleSelectionChange}
		  options={items}
          selectedOptions={selectedOptions}
		  textProp="name"
		  valueProp="name"
		  
        />
      </div>
      <div>
	  <Fragment>
	  {selectedOptions.length === 0 && <p>(nothing selected yet)</p>}
        {selectedOptions.length > 0 && <ol className="List">          
		   {selectedOptions.map((item, i) => <li key={item.name} className={`List__item List__item--${item.color}`}>
			   {item.name}
            <span style={{cursor: 'pointer'}} onClick={() => this.handleDeselect(i)}>
              &times;
            </span>
          </li>)}
        </ol>}
		</Fragment>
        {selectedOptions.length > 0 && <button style={{marginLeft: 20}} className="btn btn-default" onClick={this.handleClearSelection}>
          Clear Selection
        </button>}
      </div>
    </div>
	);
  }
}
class AddRemoveSelection extends React.Component {
  state = {
    selectedOptions: []
  }
  handleDeselect = (deselectedOptions) => {
    var selectedOptions = this.state.selectedOptions.slice()
    deselectedOptions.forEach(option => {
      selectedOptions.splice(selectedOptions.indexOf(option), 1)
    })
    this.setState({selectedOptions})
  }
  handleSelect = (selectedOptions) => {
    selectedOptions.sort((a, b) => a.name - b.name)
    this.setState({selectedOptions})
  }
  render() {
    var {selectedOptions} = this.state
    return <div className="row">
      <div className="col-md-5">
        <FilteredMultiSelect
          buttonText="Add"
          classNames={BOOTSTRAP_CLASSES}
          onChange={this.handleSelect}
		  options={items}
          selectedOptions={selectedOptions}
		   textProp="name"
		   valueProp="name"
		  />
      </div>
      <div className="col-md-5">
        <FilteredMultiSelect
          buttonText="Remove"
          classNames={{
            filter: 'form-control',
            select: 'form-control',
            button: 'btn btn btn-block btn-default',
            buttonActive: 'btn btn btn-block btn-danger'
          }}
          onChange={this.handleDeselect}
          options={selectedOptions}
		  textProp="name"
		  valueProp="name"
        />
      </div>
    </div>
  }
}

class App extends React.Component {
  render() {
    return( <div className="container mb-5">
	  <br/>
	  <br/>
      <h4>List</h4>
      <List/>
	  <br/>
	  <br/>
      <h4>Add &amp; Remove</h4>
      <AddRemoveSelection/>
    </div>
	);
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
