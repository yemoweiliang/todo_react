import React from 'react';
import { connect } from "react-redux"
import AddItem from './addItem'
import {removeItemAction,updateItemAction} from "../../redux/action"
//import './toDo.css';
import todoStyle from './toDo.module.css';
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    let items=[...props.items]
    this.state={items:items}
  }

  showItem(item) {
    //remove var  change them to let/const 
    let ind=this.state.items.findIndex((it)=>(it.id===item.id))
    let edit=this.state.items[ind].editMode?item.editMode:false
    return <li key={item.id} className={edit?todoStyle.editMode:''}>
      <input type="checkbox" 
        defaultChecked={item.completed} 
        onClick={()=>{
          this.props.updateItemAction(item.id,{completed:!item.completed})
        }}/>
    <label>{item.body}</label>
      <input type="text" value={item.body} onChange={(e)=>{
        //event 传值问题
        let newItems=[...this.state.items]
        newItems[ind].body=e.target.value
        //this.setState({items:newItems})
        this.props.updateItemAction(item.id,{body:e.target.value})
      }}/>
        <button className={todoStyle.edit} onClick={()=>{
          edit=!edit   
          let newItems=[...this.state.items]
          newItems[ind].editMode=edit
          //setState 逻辑要清晰， 要习惯做减法， setSate 和 the props 可能重复了
          this.setState({items:newItems})
          //this.props.updateItemAction(item.id,{editMode:edit})
          }}>Edit</button>
        <button className={todoStyle.delete}onClick={()=>{
          this.props.removeItemAction(item.id)
        }}   >Delete</button></li>
  }
  //refresh page when props /state changed by redux
  static getDerivedStateFromProps(props, state) {
    if(JSON.stringify(props.items)!==JSON.stringify(state.items)){
      return {items:[...props.items]}}
    return null
  }
  render() {
      
      return (
      <div className={todoStyle.container}>
          <AddItem/>
      <h3>Todo</h3>
      <ul id={todoStyle["incomplete-tasks"]}>
          {this.props.incompleteItems.map((item,index)=>{
            return this.showItem(item)
          })}
      </ul>
      <h3>Completed</h3>
      {/* id selector, 名字只支持 驼峰式 */}
      <ul id={todoStyle['completed-tasks']}>
          {this.props.completedItems.map((item,index)=>{
            return this.showItem(item)
          })}
      </ul>


      </div>
      )
      
      
    }
  }


const mapStateToProps=state=>{
  let completedItems=state.items.filter((item)=>(item.completed))
  let incompleteItems=state.items.filter((item)=>!item.completed)
  let totalItems=state.items.length
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