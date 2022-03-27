import React from 'react'
import  {Link} from 'react-router-dom'
class Main extends React.Component {
    
    constructor(){
        super()
        this.state = {
            date : new Date(),
            days_forloop : [],
            months : [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December   "
            ],
            styles : {
                log_out_display : "block",
                nav_bar_display : (window.innerWidth <= 770) ? "block" : "none",
                nav_bar_left : "2%",
                side_header_display : (window.innerWidth <= 770) ? "none" : "flex",
                aside_div_display : (window.innerWidth <= 770) ? "none" : "block",
                home_div_opacity : "1",
                choose_day_display : "block", //block
                no_tasks_text : "",
                no_task_label_left : "0",
                no_task_label_top : "40%",
                no_tasks_display : "none",
                days_div_border : "none",
                main_aside_display : "none", // none
                icons_div_top : "40%", //40%
                goal_icon_background : "#eee",
                reminder_icon_background : "#eee",
                task_icon_background : "#eee",
                event_icon_background : "#eee",
                goal_div_container_display : "none",
                goal_div_display : "none",
                goal_confirm_display : "none",
                goal_confirm_text : "",

                main_aside_scheds_display : "none",
            },
            day_clicked : 0,
            goals : {
                user_counter : "",
                year : "",
                month : "",
                day : "",
                time : "",
                often : "",
                title : "",
                key : 0
            },
            user_scheds : []
        }
    }

    componentDidMount() {
        this.renderCalendar()
    }

    renderCalendar = () => {

        this.state.date.setDate(1)
        let days_forloop = []
        let key_val = 1
        const lastDay = new Date(this.state.date.getFullYear(),this.state.date.getMonth() + 1,0).getDate();
        const prevlastDay = new Date(this.state.date.getFullYear(),this.state.date.getMonth(),0).getDate();
        const firstDayIndex = this.state.date.getDay()

        for(let x = firstDayIndex; x > 0; x--){
            days_forloop.push({
                cn:"prev-date", 
                num : prevlastDay - x + 1, 
                key: key_val++,
                asterisk : "none"
            })
        }
        
        for(let i = 1; i <= lastDay; i++){
            if(i === new Date().getDate() && this.state.date.getMonth() === new Date().getMonth()){
                days_forloop.push({
                    cn:"today", 
                    num : i, key: 
                    key_val++,
                    asterisk : "none"
                })
            }else{
                days_forloop.push({
                    cn:"", 
                    num : i, 
                    key: key_val++,
                    asterisk : "none"
                })
            }                
        }

        //this.setState({days_forloop : days_forloop})


        const nextDays = 42 - days_forloop.length
        
        for(let j = 1; j <= nextDays; j++){
            days_forloop.push({
                cn:"next-date", 
                num : j,
                key: key_val++,
                asterisk : "none"
            })
        }

        this.setState(prevState => ({
            days_forloop : days_forloop
        }))
    }

    handleNextMonth = () => {
        this.state.date.setMonth(this.state.date.getMonth() + 1)
        this.renderCalendar()
    }

    handlePrevMonth = () => {
        this.state.date.setMonth(this.state.date.getMonth() - 1)
        this.renderCalendar()
    }

    handleNavBarClick = () => {
        var styles = {...this.state.styles}

        if(this.state.styles.nav_bar_left === "2%"){
            styles.log_out_display = "none"
            styles.nav_bar_left = "86%"

            styles.home_div_opacity = "0.2"

            styles.side_header_display = "flex"
            styles.aside_div_display = "block"

        }else{
            styles.log_out_display = "block"
            styles.nav_bar_left = "2%"

            styles.home_div_opacity = "1"

            styles.side_header_display = "none"
            styles.aside_div_display = "none"

        }

        
        this.setState({styles})
    }

    handleNoTasksClick = () => {
        var styles = {...this.state.styles}
        styles.no_tasks_display = "none"
        styles.main_aside_display = "block"
        styles.goal_div_container_display = "block"
        styles.goal_div_display = "block"
        styles.goal_confirm_display = "none"
        this.setState({styles})
    }

    handleDateClick = (num, cn, sched) => {
        
        var styles = {...this.state.styles}
        if(cn !== 'prev-date' && cn !== 'next-date'){
            styles.choose_day_display = "none"
            styles.days_div_border = "1px solid #275EA3"
            // if no tasks on that date.

            if(sched ){
                styles.no_tasks_display = "block"
                styles.no_tasks_text = "Add more"
                styles.no_task_label_left = "30%"
                styles.no_task_label_top = "70%"
                styles.main_aside_display = "none"

                styles.main_aside_scheds_display = "block"
            }else{
                styles.no_tasks_display = "block"
                styles.no_tasks_text = `No Information for this day yet`
                styles.no_task_label_left = "0"
                styles.no_task_label_top = "40%"
                styles.main_aside_scheds_display = "none"
            }
            
            this.setState({styles})
            this.setState({day_clicked : num})
        }

        
    }

    // handleIconClick = (icon) => {
    //     var styles = {...this.state.styles}

    //     styles.icons_div_top = "1%"

    //     if(icon === "goal"){
    //         styles.goal_icon_background = "#9ECEE6"
    //         styles.goal_div_display = "block"
    //         styles.goal_div_container_display = "block"

    //         styles.reminder_div_display = "none"
    //         styles.task_div_display = "none"
    //         styles.event_div_display = "none"

    //         styles.reminder_icon_background = "white"
    //         styles.task_icon_background = "white"
    //         styles.event_icon_background = "white"
    //     }
    //     else if(icon === "reminder"){
    //         styles.reminder_icon_background = "#9ECEE6"
    //         styles.reminder_div_display = "block"

    //         styles.goal_confirm_display = "none"

    //         styles.goal_div_display = "none"
    //         styles.task_div_display = "none"
    //         styles.event_div_display = "none"

    //         styles.goal_icon_background = "white"
    //         styles.task_icon_background = "white"
    //         styles.event_icon_background = "white"
    //     }
    //     else if(icon === "task"){
    //         styles.task_icon_background = "#9ECEE6"
    //         styles.task_div_display = "block"

    //         styles.goal_confirm_display = "none"

    //         styles.goal_div_display = "none"
    //         styles.reminder_div_display = "none"
    //         styles.event_div_display = "none"

    //         styles.goal_icon_background = "white"
    //         styles.reminder_icon_background = "white"
    //         styles.event_icon_background = "white"
    //     }
    //     else if(icon === "event"){
    //         styles.event_icon_background = "#9ECEE6"

    //         styles.goal_confirm_display = "none"

    //         styles.goal_div_display = "none"
    //         styles.task_div_display = "none"
    //         styles.reminder_div_display = "none"

    //         styles.goal_icon_background = "white"
    //         styles.reminder_icon_background = "white"
    //         styles.task_icon_background = "white"
    //     }
       
        
    //     this.setState({styles})
    // }

    handleGoalConfirmClick = (what) => {
        var styles = {...this.state.styles}

        styles.goal_div_container_display = "none"
        styles.goal_confirm_display = "block"
        styles.goal_confirm_text = what
        this.setState({styles})
    }

    handleGoalOnChange = (event) =>{
        const {name, value} = event.target

        var goals = {...this.state.goals}

        if(name === "goal-title"){
            goals.title = value
        }
        else if(name === "often"){
            goals.often = value
        }
        else if(name === "time"){
            goals.time = value
        }

        goals.year = this.state.date.getFullYear()
        goals.month = this.state.date.getMonth()
        goals.day = this.state.day_clicked
        //goals.user_counter = this.props.args.userAcc_counter - 1
        goals.user_counter = this.props.args.userAcc_counter
        goals.key = goals.key += 1
        this.setState({goals})
    }

    handleGoalFinalConfirm = () =>{
        this.props.args.onGoalConfirmClick(this.state.goals)
        
        var styles = {...this.state.styles}
        styles.no_tasks_display = "none"
        styles.main_aside_display = "none"

        //var user_scheds = {...this.state.user_scheds}

        this.setState({styles})

    }

    render() { 
        let acc_username = this.props.args.users_account[0].username
        //const lastDay = new Date(this.state.date.getFullYear(),this.state.date.getMonth() + 1,0).getDate();
        //console.log(lastDay)
        
        // for asterisk
        let per_week = 1
        let days_forloop_cont = this.state.days_forloop.map(val => {
            let how_often = this.props.args.user_goals[this.props.args.user_goals_counter].often
        
            let if_three = false, if_five = false, if_everyday = false
            for(let i = 0; i < this.props.args.user_goals.length; i++){
                if(this.props.args.user_goals[i].often === "3 times a week"){
                    if_three = true
                }
                if(this.props.args.user_goals[i].often === "5 times a week"){
                    if_five = true
                }
                if(this.props.args.user_goals[i].often === "Every day"){
                    if_everyday = true
                }
            }

            if(!if_three && !if_five && !if_everyday && how_often !== ""){
                how_often = "Once a week"
            }else if(if_three && !if_five && !if_everyday){
                how_often = "3 times a week"
            }else if(if_five && !if_everyday){
                how_often = "5 times a week"
            }else if(if_everyday){
                how_often = "Every day"
            }

            let asterisk_often
            
            if(how_often === "Every day"){
                asterisk_often = "block"
            }
            else if(how_often === "Once a week"){
                switch(per_week) {
                    case 1 : asterisk_often = "block"; break;
                    case 2 : asterisk_often = "none"; break;
                    case 3 : asterisk_often = "none"; break;
                    case 4 : asterisk_often = "none"; break;
                    case 5 : asterisk_often = "none"; break;
                    case 6 : asterisk_often = "none"; break;
                    case 7 : asterisk_often = "none"; break;
                    default : break;
                }
            }
            else if(how_often === "3 times a week"){
                switch(per_week) {
                    case 1 : asterisk_often = "block"; break;
                    case 2 : asterisk_often = "none"; break;
                    case 3 : asterisk_often = "block"; break;
                    case 4 : asterisk_often = "none"; break;
                    case 5 : asterisk_often = "block"; break;
                    case 6 : asterisk_often = "none"; break;
                    case 7 : asterisk_often = "none"; break;
                    default : break;
                }
            }else if(how_often === "5 times a week"){

                switch(per_week) {
                    case 1 : asterisk_often = "block"; break;
                    case 2 : asterisk_often = "none"; break;
                    case 3 : asterisk_often = "block"; break;
                    case 4 : asterisk_often = "none"; break;
                    case 5 : asterisk_often = "block"; break;
                    case 6 : asterisk_often = "block"; break;
                    case 7 : asterisk_often = "block"; break;
                    default : break;
                }
            }else{
                asterisk_often = "none"
            }

            if(per_week === 7){
                per_week = 1
            }else{
                per_week += 1
            }
            //console.log(val.asterisk)
            return(
                {
                    cn : val.cn,
                    num : val.num,
                    key : val.key,
                    asterisk : asterisk_often
                    //asterisk : (val.asterisk === "block") ? "block" : asterisk_often
                }
            )
        })

        

        const days = days_forloop_cont.map((val) => (
            <div 
                className={val.cn} 
                key={val.key}
                onClick={() => this.handleDateClick(val.num , val.cn, (val.asterisk === "block") ? true : false)}
                
            >{val.num}
                <img 
                    src={require('../imgs/main_imgs/asterisk.png')} 
                    alt="img"
                    key={val.key}
                    style={{display :val.asterisk}}
                />
            </div>
        ));

        const nav_styles = {
            display : this.state.styles.nav_bar_display,
            left: this.state.styles.nav_bar_left
        }

        let user_scheds = []
        //console.log(this.props.args.user_goals)
        for(let i = 0; i < this.props.args.user_goals.length; i++){
            if(this.props.args.user_goals[i].user_counter === 0){
                user_scheds.push(this.props.args.user_goals[i])
            }
        }

        let user_scheds_once = user_scheds.filter((val)=>{
            return val.often === "Once a week"
        })

        let user_scheds_thrice = user_scheds.filter((val)=>{
            return val.often === "3 times a week"
        })

        let user_scheds_five = user_scheds.filter((val)=>{
            return val.often === "5 times a week"
        })

        let user_scheds_every = user_scheds.filter((val)=>{
            return val.often === "Every day"
        })


        const schedsComponents_once = user_scheds_once.map(val => {
            return(
                <div className="scheds-div" key={val.key}>
                    <label className="sched-txt"> Schedule for this day: </label>
                    <label className="sched-title"> {val.title} </label>
                    <label className="sched-info"> {val.often} for {val.time} </label>

                    <button 
                        className="btn btn-primary"
                        onClick={() =>this.props.args.onGoalDoneClick(val)}
                    >
                        Done
                    </button>
                </div>
            )
        })

        const schedsComponents_thrice = user_scheds_thrice.map(val => {
            return(
                <div className="scheds-div" key={val.key}>
                    <label className="sched-txt"> Schedule for this day: </label>
                    <label className="sched-title"> {val.title} </label>
                    <label className="sched-info"> {val.often} for {val.time} </label>

                    <button 
                        className="btn btn-primary"
                        onClick={() =>this.props.args.onGoalDoneClick(val)}
                    >
                        Done
                    </button>
                </div>
            )
        })

        const schedsComponents_five = user_scheds_five.map(val => {
            return(
                <div className="scheds-div" key={val.key}>
                    <label className="sched-txt"> Schedule for this day: </label>
                    <label className="sched-title"> {val.title} </label>
                    <label className="sched-info"> {val.often} for {val.time} </label>

                    <button 
                        className="btn btn-primary"
                        onClick={() =>this.props.args.onGoalDoneClick(val)}
                    >
                        Done
                    </button>
                </div>
            )
        })

        const schedsComponents_every = user_scheds_every.map(val => {
            return(
                <div className="scheds-div" key={val.key}>
                    <label className="sched-txt"> Schedule for this day: </label>
                    <label className="sched-title"> {val.title} </label>
                    <label className="sched-info"> {val.often} for {val.time} </label>

                    <button 
                        className="btn btn-primary"
                        onClick={() =>this.props.args.onGoalDoneClick(val)}
                    >
                        Done
                    </button>
                </div>
            )
        })

        let schedsComponents 
        for(let i = 0; i <= user_scheds.length - 1; i++){
            this.state.date.setDate(this.state.day_clicked)
            let day_index = this.state.date.getDay()
            
            if(day_index === 0){

                if(schedsComponents_thrice.length === 0 && schedsComponents_five.length === 0 && schedsComponents_every.length === 0){
                    schedsComponents = schedsComponents_once 
                }else if(schedsComponents_thrice.length !== 0 && schedsComponents_five.length === 0 && schedsComponents_every.length === 0){
                    schedsComponents = schedsComponents_once.concat(schedsComponents_thrice)
                }else if(schedsComponents_thrice.length === 0 && schedsComponents_five.length !== 0 && schedsComponents_every.length === 0){
                    schedsComponents = schedsComponents_once.concat(schedsComponents_five)
                }else if(schedsComponents_thrice.length === 0 && schedsComponents_five.length === 0 && schedsComponents_every.length !== 0){
                    schedsComponents = schedsComponents_once.concat(schedsComponents_every)
                }else if(schedsComponents_thrice.length !== 0 && schedsComponents_five.length !== 0 && schedsComponents_every.length === 0){
                    schedsComponents = schedsComponents_once.concat(schedsComponents_thrice,schedsComponents_five)
                }else if(schedsComponents_thrice.length === 0 && schedsComponents_five.length !== 0 && schedsComponents_every.length !== 0){
                    schedsComponents = schedsComponents_once.concat(schedsComponents_five,schedsComponents_every)
                }else if(schedsComponents_thrice.length !== 0 && schedsComponents_five.length !== 0 && schedsComponents_every.length !== 0){
                    schedsComponents = schedsComponents_once.concat(schedsComponents_thrice,schedsComponents_five,schedsComponents_every)
                }
            }
            else if(day_index === 0 || day_index === 2 || day_index === 4){
                if(schedsComponents_five.length === 0 && schedsComponents_every.length === 0){
                    schedsComponents = schedsComponents_thrice 
                }
                else if(schedsComponents_five.length !== 0 && schedsComponents_every.length === 0){
                    schedsComponents = schedsComponents_thrice.concat(schedsComponents_five)
                }
                else if(schedsComponents_five.length === 0 && schedsComponents_every.length !== 0){
                    schedsComponents = schedsComponents_thrice.concat(schedsComponents_every)
                }
                else if(schedsComponents_five.length !== 0 && schedsComponents_every.length !== 0){
                    schedsComponents = schedsComponents_thrice.concat(schedsComponents_five,schedsComponents_every)
                }   
            }
            else if(day_index === 0 || day_index === 2 || day_index === 4 || day_index === 5 || day_index === 6){
                if(schedsComponents_every.length === 0){
                    schedsComponents = schedsComponents_five
                }else{
                    schedsComponents = schedsComponents_five.concat(schedsComponents_every)
                }
            }
            else if(day_index === 0 || day_index === 1 || day_index === 2 || day_index === 3 || day_index === 4 || day_index === 5 || day_index === 6) {
                schedsComponents = schedsComponents_every
            }
        }
        
        // console.log(this.state.reminders)

        return (
            <React.Fragment>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                    crossorigin="anonymous"
                />
                <main className="home-main-div">

                    <header className="home-header">
                        <Link to={'/home'}>
                            <label style={{display : this.state.styles.log_out_display}}>Log out</label>
                        </Link>
                        <img 
                            src={require('../imgs/main_imgs/nav_bar.png')} 
                            alt="img" 
                            style={nav_styles}
                            onClick={this.handleNavBarClick}
                        />
                    </header>

                    <aside 
                        className="side-header"
                        style={{display: this.state.styles.side_header_display}}
                    >
                        <label> Hi, {acc_username}! </label>
                    </aside>

                    <aside 
                        className="aside-div"
                        style={{display : this.state.styles.aside_div_display}}
                    >

                        <label 
                            className="choose-date-lbl"
                            style={{display : this.state.styles.choose_day_display}}
                        >
                            Choose a date</label>

                        <div 
                            className="no-tasks-div"
                            style={{
                                display : this.state.styles.no_tasks_display,
                                top: this.state.styles.no_task_label_top
                            }}
                        >
                            <label
                                style={{left : this.state.styles.no_task_label_left}}
                            >
                                {this.state.styles.no_tasks_text}
                            </label>
                            <img 
                                src={require('../imgs/main_imgs/add_lists.png')} 
                                alt="img"
                                onClick={this.handleNoTasksClick}
                            />
                        </div>
                        
                        <div 
                            className="main-aside"
                            style={{display : this.state.styles.main_aside_display}}
                        >
                            
                            {/* GOAL DIVISION */}
                            <div 
                                className="goal-div"
                                style={{display : this.state.styles.goal_div_display}}
                            >
                                <div style={{display : this.state.styles.goal_div_container_display}}>
                                    <div 
                                        className="goal goal-exercise"
                                        onClick={() => this.handleGoalConfirmClick("Exercise")}
                                    >
                                        <label className="label goal-exericse-lbl">
                                            Exercise <br /> <span>Run, do yoga, get your body moving</span>
                                        </label>
                                    </div>

                                    <div 
                                        className="goal goal-skill"
                                        onClick={() => this.handleGoalConfirmClick("skill")}
                                    >
                                        <label className="label goal-skill-lbl">
                                            Build a skill <br /> <span>Learn a language, practice an instrument</span>
                                        </label>
                                    </div>

                                    <div 
                                        className="goal goal-fam-friends"
                                        onClick={() => this.handleGoalConfirmClick("Family / Friends")}
                                    >
                                        <label className="label goal-fam-friends-lbl">
                                            Family & friends <br /> <span>Make time for those who matter most</span>
                                        </label>
                                    </div>

                                    <div 
                                        className="goal goal-me-time"
                                        onClick={() => this.handleGoalConfirmClick("Activity")}
                                    >
                                        <label className="label goal-me-time-lbl">
                                            Me time <br /> <span>Read, meditate, take care of yourself</span>
                                        </label>
                                    </div>

                                    <div 
                                        className="goal goal-organize"
                                        onClick={() => this.handleGoalConfirmClick("need to organize")}
                                    >
                                        <label className="label goal-organize-lbl">
                                            Organize my life <br /> <span>Stay on top of things</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div 
                                    className="goal-confirm-div"
                                    style={{display : this.state.styles.goal_confirm_display}}
                                >
                                    <div className="which-exercise">
                                        <label>Which {this.state.styles.goal_confirm_text}?</label>
                                        <input 
                                            type="text" 
                                            name="goal-title"
                                            onChange={this.handleGoalOnChange} 
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="how-often">
                                        <label>How often?</label>
                                        <select name="often" onChange={this.handleGoalOnChange} >
                                            <option value="" disabled selected>Choose</option>
                                            <option value="Once a week">Once a week</option>
                                            <option value="3 times a week">3 times a week</option>
                                            <option value="5 times a week">5 times a week</option>
                                            <option value="Every day">Every day</option>
                                        </select>
                                    </div>

                                    <div className="for-how-long">
                                        <label>For how long?</label>
                                        <select name="time" onChange={this.handleGoalOnChange}>
                                            <option value="" disabled selected>Choose</option>
                                            <option value="15 minutes">15 minutes</option>
                                            <option value="30 minutes">30 minutes</option>
                                            <option value="1 hour">1 hour</option>
                                            <option value="2 hours">2 hours</option>
                                        </select>
                                    </div>

                                    <div className="confirm-goal">
                                        <label className="goal-title">{this.state.goals.title}</label>
                                        <label className="goal-info">
                                            Calendar will schedule: <br/>
                                            {this.state.goals.often} <br/>
                                            {this.state.goals.time}
                                        </label>
                                        <button 
                                            className="btn btn-success"
                                            onClick={this.handleGoalFinalConfirm}
                                        >
                                            Add</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div 
                            className="main-aside-scheds"
                            style={{display: this.state.styles.main_aside_scheds_display}}
                        >
                            {schedsComponents}
                        </div>

                    </aside>

                    <div 
                        className="home-div-body"
                        style={{opacity : this.state.styles.home_div_opacity}}
                    >
                        {/* <div className="month-div">

                            <div className="arrow-left"></div>
                            <label className="month-title">April</label>
                            <div className="arrow-right"></div>
                            
                        </div> */}


                        {/* HOW TO MAKE A FUCKING CALENDAR */}
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" />
                        
                        <div className="container">
                            <div className="calendar">

                                <div className="month">
                                    <i 
                                        className="i fas fa-angle-left prev"
                                        onClick={this.handlePrevMonth}
                                    >

                                    </i>

                                    <div className="date">
                                        <h1> {this.state.months[this.state.date.getMonth()]} </h1>
                                        <p> {this.state.date.toDateString()} </p>
                                    </div>
                                    <i 
                                        className="fas fa-angle-right next"
                                        onClick={this.handleNextMonth}
                                    >

                                    </i>
                                </div>

                                <div className="weekdays">
                                    <div>Sun</div>
                                    <div>Mon</div>
                                    <div>Tue</div>
                                    <div>Wed</div>
                                    <div>Thu</div>
                                    <div>Fri</div>
                                    <div>Sat</div>
                                </div>

                                <div className="days">
                                    {days}
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}
 
export default Main;