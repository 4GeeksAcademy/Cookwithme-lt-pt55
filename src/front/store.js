// store.js

export const initialStore = () => {
  return {
    message: null,
    todos: [],
    usersFavs: {},       // { userId: [recipe1, recipe2] }
    authChef: false,
    authAdmin: false,
    authUser: null,     
    favItems: [],        // recetas favoritas
    charFav: []         
  };
};


export default function storeReducer(store, action = {}) {
  switch(action.type) {

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

    case 'set_auth_admin':
      return {
        ...store,
        authAdmin: action.payload
      };

    case 'set_auth_user':
      return {
        ...store,
        authUser: action.payload
      };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map(todo => 
          todo.id === id ? { ...todo, background: color } : todo
        )
      };

    case 'toggle_charfav':
      let updatedCharFavs = [];
      if (store.charFav.includes(action.payload)) {
        updatedCharFavs = store.charFav.filter(item => item !== action.payload);
      } else {
        updatedCharFavs = [...store.charFav, action.payload];
      }
      return { ...store, charFav: updatedCharFavs };

    case 'toggle_favitem':
      let updatedFavItems = [];
      if (store.favItems.includes(action.payload)) {
        updatedFavItems = store.favItems.filter(item => item !== action.payload);
      } else {
        updatedFavItems = [...store.favItems, action.payload];
      }
      return { ...store, favItems: updatedFavItems };

    case 'toggle_fav_user': {
      if (!store.authUser || !store.authUser.id) return store;
      const userId = store.authUser.id;
      const userFavs = store.usersFavs[userId] || [];
      let updatedFavs;

      if (userFavs.includes(action.payload)) {
        updatedFavs = userFavs.filter(f => f !== action.payload);
      } else {
        updatedFavs = [...userFavs, action.payload];
      }

      return {
        ...store,
        usersFavs: {
          ...store.usersFavs,
          [userId]: updatedFavs
        }
      };
    }
    case 'add_favorite':
      return {
        ...store,
        favItems: action.payload
      };

    case 'delete_favitem':
      return {
        ...store,
        favItems: store.favItems.filter(item => item !== action.payload)
      };

    

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
