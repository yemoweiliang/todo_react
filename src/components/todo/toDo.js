import React from 'react';
import { connect } from "react-redux"
import AddItem from './addItem'
import {removeItemAction,updateItemAction} from "../../redux/action"
import './toDo.css';
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    var items=[...props.items]
    this.state={items:items}
  }

  showItem(item) {
    
    var ind=this.state.items.findIndex((it)=>(it.id==item.id))
    var edit=this.state.items[ind].editMode?item.editMode:false
    return <li key={item.id} className={edit?"editMode":''}>
      <input type="checkbox" 
        defaultChecked={item.completed} 
        onClick={()=>{
          this.props.updateItemAction(item.id,{completed:!item.completed})
        }}/>
    <label>{item.body}</label>
      <input type="text" value={item.body} onChange={(e)=>{
        var newItems=[...this.state.items]
        newItems[ind].body=e.target.value
        this.setState({items:newItems})
        this.props.updateItemAction(item.id,{body:e.target.value})
      }}/>
        <button className="edit" onClick={()=>{
          edit=!edit
          
          var newItems=[...this.state.items]
          newItems[ind].editMode=edit
          this.setState({items:newItems})
          this.props.updateItemAction(item.id,{editMode:edit})
          }}>Edit</button>
        <button className="delete" onClick={()=>{
          this.props.removeItemAction(item.id)
        }}   >Delete</button></li>
  }
  componentWillReceiveProps(nextProps){
    if(JSON.stringify(nextProps.items)!==JSON.stringify(this.props.items)){
      this.setState({items:[...nextProps.items]})
      
    }
  }
  render() {
      
      return (
      <div className="container">
          <AddItem/>
      <h3>Todo</h3>
      <ul id="incomplete-tasks">
          {this.props.incompleteItems.map((item,index)=>{
            return this.showItem(item)
          })}
      </ul>
      
      <h3>Completed</h3>
      <ul id="completed-tasks">
        <li>
          {this.props.completedItems.map((item,index)=>{
            return this.showItem(item)
          })}
        </li>
      </ul>


      </div>
      )
      
      
    }
  }


const mapStateToProps=state=>{
  var completedItems=state.items.filter((item)=>(item.completed))
  var incompleteItems=state.items.filter((item)=>!item.completed)
  var totalItems=state.items.length
  return{
    completedItems:completedItems,
    incompleteItems:incompleteItems,
    items:state.items,
    totalItems:totalItems
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    updateItemAction:(id,payload)=>{
          
          dispatch(updateItemAction(id,payload))
      },
      removeItemAction:(id)=>{
        dispatch(removeItemAction(id))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ToDo)