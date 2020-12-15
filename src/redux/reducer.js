const initialState = {
    items: [
      {  id:0,body: "Pay Bills",completed:false,editMode:false},
      {  id:1,body: "Go Shopping",completed:false,editMode:true },
      {  id:2,body: "See the Doctor",completed:true,editMode:false},
    ],
  }
  
  const reducer = (state = initialState, action) => {
      switch (action.type){
        case "ADD_ITEM":
            return {...state,items:[...state.items,action.item]};
        case "REMOVE_ITEM":
            return {...state,items:state.items.filter((item)=>(item.id!==action.id))}
        case "UPDATE_ITEM":
            let newState={...state}
            newState.items.forEach(
                (item,ind)=>{
                    if (item.id===action.id){
                        newState.items[ind]={...item,...action.payload}
                    }}
            )
            return newState;
        default:
            return state;
      }
  }
  export default reducer