export default function authReducer(state = [], action){
  switch(action.type){
    case 'LOG_IN':
      return [...state,
        Object.assign({}, action.store)
      ];

    default:
      return state;
  }
}
