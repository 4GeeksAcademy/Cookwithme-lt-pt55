export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
     favItems : [],
    authChef: false,
    authAdmin: false,
    authUser:false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'set_auth_chef':
      return {
        ...store,
        authChef: action.payload
      };

    case 'set_auth_user':
      return {
        ...store,
        authUser: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');

        case 'add_favorite':

      return {
        ...store,
        favItems: action.payload
       };

      case 'toggle_favitem':

      let updatedFavs =[]

       if(store.favItems.includes(action.payload)){
        updatedFavs = store.favItems.filter((favorite)=> favorite != action.payload)
       }else{

         updatedFavs =[...store.favItems,action.payload]
       }


      return {
        ...store,
        favItems: updatedFavs
       };

       case 'delete_favitem':

        let dropdowndelete =[]

       if(store.favItems.includes(action.payload)){
        dropdowndelete = store.favItems.filter((favorite)=> favorite != action.payload)
       }

       case 'set_auth_admin':
      return {
        ...store,
        authAdmin: action.payload
      };

  }    
}
