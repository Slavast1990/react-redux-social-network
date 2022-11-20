

  export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {//u[objPropName] === u.objPropName
            return {...u, ...newObjProps}
        }
        return u;
    })
}
 // users: state.users.map(u => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: true }
        //   }
        //   return u;
        // }) 