import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";

interface LoginProps {
    authService: AuthService
}

interface LoginState {
    userName: string,
    password: string,
    loginAttempted: boolean,
    loginSuccesfull: boolean
}

interface CustomEvent {
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState> {

    state: LoginState = {
        userName: '',
        password: '',
        loginAttempted: false,
        loginSuccesfull: false
    }

    private setUserName(event: CustomEvent) {
        this.setState({ userName: event.target.value });
    }

    private setPassword(event: CustomEvent) {
        this.setState({ password: event.target.value })
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        this.setState({ loginAttempted: true })
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        )
        if (result) {
            this.setState({ loginSuccesfull: true })
        } else {
            this.setState({ loginSuccesfull: false })
        }
    }

    render() {
        let loginMessage: any;

        if (this.state.loginAttempted) {
            if (this.state.loginSuccesfull) {
                loginMessage = <label>Login Succesfull!!!</label>
            } else {
                loginMessage = <label>Login failed!!!</label>
            }
        }
        return (
            <div>
                <h2>Please Login!</h2>

                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type="text" value={this.state.userName} onChange={e => this.setUserName(e)} /><br />
                    <input type="password" value={this.state.password} onChange={e => this.setPassword(e)} /><br />
                    <input type="submit" value='Login' />
                </form>

                {loginMessage}
            </div>
        )
    }
}