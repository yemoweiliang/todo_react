let nextTodoId = 3
export function addItemAction(text){
    return {
        type:"ADD_ITEM",
        item:{
            id: nextTodoId++,
            body:text,
            completed:false
        }
    }
}
export function removeItemAction(id){
    return{
        type:"REMOVE_ITEM",
        id:id
    }
}
export function updateItemAction(id,value){
    return{
        type:"UPDATE_ITEM",
        id:id,
        payload:value
    }
}