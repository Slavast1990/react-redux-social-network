import React from "react";
import { Field, reduxForm } from "redux-form";
import { MaxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MaxLength50 = MaxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea}
            validate={[required, MaxLength50]}
            name={"newMessageBody"} placeholder={"Enter your message"} /> 
            </div>
        <div>
            <button>Send222</button>
        </div>
    </form>
    )
    }
    
    export default reduxForm ({form: 'dialog-add-message-form'}) (AddMessageForm);