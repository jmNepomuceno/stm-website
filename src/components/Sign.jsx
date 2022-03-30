import React from 'react'
import {Link} from 'react-router-dom'

class Sign extends React.Component {
    constructor(){
        super()
        this.state = {
            window_width : window.innerWidth,
            // SIGN COMPONENT
            sign : {
                header_sign_txt : "Sign In",
                sign_up : "Sign Up",
                sign_up_display : (window.innerWidth <= 770) ? "none" : "block",
                Log_in_btn_txt : "Log In",
                back_btn_display : "none",
                back_btn_mobile_display : (window.innerWidth <= 770) ? "block" : "none",
                login_div_display : (window.innerWidth <= 770) ? "none" : "block",
                btn_div_mobile_display : (window.innerWidth <= 770) ? "block" : "none",
                title_div_txt_display : "block"
            },
            username : "",
            password : ""          
        }
    }

    handleSignUpClick = () => {
        if(!this.state.window_width <= 770){
            var sign = {...this.state.sign}
            sign.header_sign_txt = "Sign Up"
            sign.sign_up_display = "none"
            sign.Log_in_btn_txt = "Sign In"
            sign.back_btn_display = "block"
            this.setState({sign})
        }
        
    }

    handleBackBtnClick = () => {
        var sign = {...this.state.sign}
        sign.header_sign_txt = "Sign In"
        sign.sign_up_display = "block"
        sign.Log_in_btn_txt = "Log In"
        sign.back_btn_display = "none"
        this.setState({sign})
    }

    handleSignInMobileClick = () =>{
        var sign = {...this.state.sign}
        sign.title_div_txt_display = "none"
        sign.login_div_display = "block"
        sign.btn_div_mobile_display = "none"
        this.setState({sign})
    }

    handleSignUpMobileClick = () =>{
        var sign = {...this.state.sign}
        sign.title_div_txt_display = "none"
        sign.login_div_display = "block"
        sign.btn_div_mobile_display = "none"

        sign.header_sign_txt = "Sign Up"
        sign.sign_up_display = "none"
        sign.Log_in_btn_txt = "Sign In"
        sign.back_btn_display = "block"
        this.setState({sign})
    }

    handleBackBtnMobileClick = () =>{
        var sign = {...this.state.sign}
        sign.title_div_txt_display = "block"
        sign.login_div_display = "none"
        sign.btn_div_mobile_display = "block"

        sign.header_sign_txt = "Sign In"
        sign.Log_in_btn_txt = "Log In"
        sign.back_btn_display = "none"

        this.setState({sign})
    }

    handleSetUserAccount = (event) =>{
        const {name, value} = event.target

        if(name === "username"){
            let username = value
            this.setState({username})
        }else{
            let password = value
            this.setState({password})
        }

    }

    handleFinalLogInClick = (obj) =>{
        //console.log(this.props.args.onUserAcc_counter, this.state.sign.Log_in_btn_txt)
        let valid_login = false
        if(this.props.args.onUserAcc_counter === 0 && this.state.sign.Log_in_btn_txt === "Log In"){
            alert("You have no account yet. Sign up first.")
        }
        else if(this.props.args.onUserAcc_counter > 0 && this.state.sign.Log_in_btn_txt === "Log In"){
            for(let i = 0; i < this.props.args.onUserAccounts.length; i++){
                //console.log(this.props.args.onUserAccounts[i].username, obj.username)
                //console.log(this.props.args.onUserAccounts[i].password, obj.password)
                if(this.props.args.onUserAccounts[i].username === obj.username &&
                    this.props.args.onUserAccounts[i].password === obj.password){
                        valid_login = true
                    }
            }
        }
        //console.log(valid_login)
        if(valid_login || this.state.sign.Log_in_btn_txt === "Sign In"){
            this.props.args.onLogInClick(obj)
        }

        this.props.args.onUserCurrAccounts(obj)
    }

    render() { 

        return(
            <main className="home-div">
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                    crossorigin="anonymous"
                />
                <img id="home-img" src={require('../imgs/index_bg_2.png')} alt="img" />
    
                <label 
                    id="title-div"
                    style={{display : this.state.sign.title_div_txt_display}}
                >
                    Get Set Goal... <br/>
                    <span>Goal Scheduling Website</span>
                    <hr/>
                </label>
    
                <div 
                    className="login-div"
                    style={{display : this.state.sign.login_div_display}}
                >
                    <div id="login-icon-div"></div>
    
                    <hr id="hr-1"/>
                    <label id="hr-sign-in-lbl"> {this.state.sign.header_sign_txt} </label>
                    <hr id="hr-2"/>
    
                    <form autocomplete="off">
                        <input 
                            type="text" 
                            name="username" 
                            id="user-name-input" 
                            placeholder="User Name" 
                            onChange={this.handleSetUserAccount}
                            required 
                        />
                        
                        <input 
                            type="password" 
                            name="password" 
                            id="password-input" 
                            placeholder="Password" 
                            onChange={this.handleSetUserAccount}
                            required 
                        />
                        <Link to="/home">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                id="login-btn"
                                onClick = {() => this.handleFinalLogInClick(
                                    {
                                        username: this.state.username,
                                        password: this.state.password
                                    }
                                )}>

                                {this.state.sign.Log_in_btn_txt}
                            </button>
                        </Link>
                    </form>
    
                    <label 
                        id="sign-up-lbl"
                        style={{display: this.state.sign.sign_up_display}}
                        onClick={this.handleSignUpClick}
                    >
                        Sign Up
                    </label>
                    
                    <div 
                        id="back-btn" 
                        style={{display: this.state.sign.back_btn_display}}
                        onClick={this.handleBackBtnClick}
                    >
    
                    </div>
                    <div 
                        id="back-btn-mobile"
                        style={{display : this.state.sign.back_btn_mobile_display}}
                        onClick={this.handleBackBtnMobileClick}
                    >
    
                    </div>
                </div>
    
                
    
                <div 
                    className="btn-div-mobile"
                    style={{display : this.state.sign.btn_div_mobile_display}}
                >
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        id="sign-in-btn-mobile"
                        onClick={this.handleSignInMobileClick}
                    >
                        Sign In
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-success" 
                        id="sign-up-btn-mobile"
                        onClick={this.handleSignUpMobileClick}
                    >
                        Sign Up
                    </button>
                </div>
                
    
            </main>
        )
    }
}

export default Sign