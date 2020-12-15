import React from 'react';
import { connect } from "react-redux"
import {addItemAction} from "../../redux/action"
//import './toDo.css';
//import style from './toDo.css'
import todoStyle from './toDo.module.css';
class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.state = {
        item:{
            body:''
    }};
  }
  handleAddItem(){
    this.props.addItemAction(this.state.item.body)
    this.setState({item:{body:''}})
  }
  handleChange(event) {
      
    this.setState({item: {body:event.target.value}});
  }
    render() {
      return (
      <div className={todoStyle.container}>
          <p>
            <label htmlFor="new-task">Add Item</label>
            <input id={todoStyle["new-task"]} type="text" onChange={this.handleChange} value={this.state.item.body}/>
            <button onClick={this.handleAddItem}>Add</button>
          </p>
      </div>
      )
      
      
    }
  }
const mapDispatchToProps=(dispatch)=>{
    return {addItemAction:(body)=>{dispatch(addItemAction(body))}}
}

export default connect(null,mapDispatchToProps)(AddItem)