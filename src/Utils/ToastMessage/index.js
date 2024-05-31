import {showMessage, hideMessage} from "react-native-flash-message";

function Message({type, message}){
    if(type=="Success"){
        showMessage({
            message,
            type : 'success',
            icon : 'success'
        })

    }
    if(type=="Error"){
        showMessage({
            message,
            type : 'danger',
            icon : 'danger'
        })
    }
}
export default {
    Success : (message)=> Message({type:'Success',message}),
    Error : (message) =>Message({type : 'Error',message})
}