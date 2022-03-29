import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// components
import Sign from './components/Sign'
import Main from './components/Main'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            users_accounts_counter : 0,
            users_curr : {
                username: "",
                password: ""
            },
            user_curr_index : 0,
            users_accounts : [
                {
                    username : "",
                    password : ""
                }
            ],   
            user_goals_counter : 0,
            users_goals : [
                {
                    user_counter : "",
                    year : "",
                    month : "",
                    day : "",
                    time : "",
                    often : "",
                    title : ""
                }
            ],
            user_goals_points : [
                0
            ]
        }
    }

    handleLogInClick = (obj) => {
        let valid = false
        for(let i = 0; i < this.state.users_accounts.length; i++){
            if(this.state.users_accounts[i].username === obj.username &&
                this.state.users_accounts[i].password === obj.password){
                    valid = false
                    break;
                }else{
                    valid = true
                }
        }
        //console.log(valid)
        if(valid){
            this.setState({ users_accounts: [...this.state.users_accounts, obj ] })
            this.setState({users_accounts_counter : this.state.users_accounts_counter + 1})
        }
        
        this.handleUserCurrIndex()
    }

    handleUserCurrIndex = (obj) => {
        this.setState({users_curr : obj})
    }

    handleGoalConfirmClick = (obj) => {
        this.setState({users_goals : [...this.state.users_goals, obj]})
        this.setState({user_goals_counter : this.state.user_goals_counter + 1})
    }

    handleGoalDoneClick = (obj) =>{
        let index = 0
        for(let i = 0; i < this.state.users_goals.length; i++){
            // console.log(obj.title , this.state.users_goals[i].title)
            if(obj.month === this.state.users_goals[i].month && 
                obj.day === this.state.users_goals[i].day &&
                obj.time === this.state.users_goals[i].time &&
                obj.title === this.state.users_goals[i].title){
                index = i
                break;   
            }
        }
        let users_goals = []
        for(let i = 0; i < this.state.users_goals.length; i++){
            if(i !== index){
                users_goals.push(this.state.users_goals[i])
            }
        }
        
        let points_index = 0
        for(let i = 0; i < this.state.users_accounts.length; i++){
            //console.log(i , this.state.users_curr.username, this.state.users_accounts[i].username)
            if(this.state.users_curr.username === this.state.users_accounts[i].username &&
                this.state.users_curr.password === this.state.users_accounts[i].password){
                    points_index = i
                    break;
            }    
        }

        let points_array = this.state.user_goals_points
        let points

        switch(obj.time) {
            case "15 minutes": points = 10; break;
            case "30 minutes": points = 20; break;
            case "1 hour": points = 50; break;
            case "2 hours": points = 100; break;
            default: points = 0;
        }

        if(points_array.length - 1 < points_index){
            points_array.push(points)
        }else{
            for(let i = 0; i < points_array.length; i++){
                if(i === points_index){
                    points_array[i] += points
                }
            }
        }

        this.setState({user_goals_points : points_array})
        this.setState({users_goals : users_goals})
        this.setState({user_goals_counter : this.state.user_goals_counter - 1})
    }

    render() { 
        //console.log(this.state.users_accounts_counter)
        //console.log(this.state.users_accounts)
        //console.log(this.state.users_goals)
        console.log(this.state.user_curr_index)
        return (
            <Router basename='stm-website'>
                <React.Fragment>
                    <Routes>
                        <Route path="/" exact element={
                            <React.Fragment>
                                <Sign 
                                    args = {
                                        {
                                            onUserAcc_counter : this.state.users_accounts_counter,
                                            onUserAccounts : this.state.users_accounts,
                                            onUserCurrAccounts : this.handleUserCurrIndex,
                                            onLogInClick : this.handleLogInClick
                                        }
                                    }
                                />
                            </React.Fragment>
                        } />

                        <Route path="/home" exact element={
                            <Main 
                                args = {
                                    {
                                        userAcc_counter : this.state.users_accounts_counter,
                                        users_account : this.state.users_accounts,
                                        onAccCurr : this.state.users_curr,
                                        user_goals_counter : this.state.user_goals_counter,
                                        user_goals : this.state.users_goals,
                                        onGoalConfirmClick : this.handleGoalConfirmClick,
                                        onGoalDoneClick : this.handleGoalDoneClick,  
                                        onUserPoints : this.state.user_goals_points
                                    }
                                }
                            />
                        } />

                    </Routes>
                </React.Fragment>
            </Router>
            
            
        );
    }
}
 
export default App;