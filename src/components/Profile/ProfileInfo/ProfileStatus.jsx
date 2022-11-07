import React from 'react';
import classes from './ProfileInfo.module.css';


class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {

        this.setState({
            editMode: true
        });
    }

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }


    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        });
    }

    componentDidUpdate(prevProps, prevState) {//prevProps-предыдущий props, prevState - предыдцщий state
        if (prevProps.status !== this.props.status) {//если предыдущий статус не равен новому статусу то мы в setState закидываем новый статус
            this.setState({
                status: this.props.status
            });
        }
        console.log('componentDidUpdate')
    }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "--------"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode} value={this.state.status} />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;