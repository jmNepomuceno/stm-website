import React from 'react';

class cont extends Component {
    state = {  } 
    render() { 
 
        // *******************************************
        


            // 
            let how_often = this.props.args.user_reminders[ this.props.args.user_reminders_counter].often

            let if_week = false, if_month = false, if_year = false
            for(let i = 0; i < this.props.args.user_reminders.length; i++){
                if(this.props.args.user_reminders[i].often === "Every week"){
                    if_week = true
                }
                if(this.props.args.user_reminders[i].often === "Every month"){
                    if_month = true
                }
                if(this.props.args.user_reminders[i].often === "Every year"){
                    if_year = true
                }
            }

            if(!if_week && !if_month && !if_year && how_often !== ""){
                how_often = "Every day"
            }
            else if(if_week && !if_month && !if_year){
                how_often = "Every week"
            }
            else if(if_month && !if_year){
                how_often = "Every month"
            }
            else if(if_year){
                how_often = "Every year"
            }

            let asterisk_often
            
            let days_arr = []
            for(let i = 0; i < this.props.args.user_reminders.length; i++){
                days_arr.push(this.props.args.user_reminders[i].day)
            }

            if(how_often === "Every day"){
                asterisk_often = "block"
            }
            else if(how_often === "Every week"){
                console.log(curr_day_index_month)
                if(val.cn !== 'next-date' && days_arr.includes(val.num) && curr_day_index_month === 2){
                    asterisk_often = "block"
                    this.state.date.setDate(val.num)
                    day_index = this.state.date.getDay() + 1
                }else{
                    asterisk_often = "none"
                }  
                //console.log(val.num, per_week, day_index)
                if(per_week === day_index){
                    asterisk_often = "block"
                }
            }
            // else if(how_often === "Every month"){
            //     switch(per_week) {
            //         case 1 : asterisk_often = "block"; break;
            //         case 2 : asterisk_often = "none"; break;
            //         case 3 : asterisk_often = "block"; break;
            //         case 4 : asterisk_often = "none"; break;
            //         case 5 : asterisk_often = "block"; break;
            //         case 6 : asterisk_often = "none"; break;
            //         case 7 : asterisk_often = "none"; break;
            //         default : break;
            //     }
            // }else if(how_often === "Every year"){

            //     switch(per_week) {
            //         case 1 : asterisk_often = "block"; break;
            //         case 2 : asterisk_often = "none"; break;
            //         case 3 : asterisk_often = "block"; break;
            //         case 4 : asterisk_often = "none"; break;
            //         case 5 : asterisk_often = "block"; break;
            //         case 6 : asterisk_often = "block"; break;
            //         case 7 : asterisk_often = "block"; break;
            //         default : break;
            //     }
            // }
            else{
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


            // asdf
        return (
            <h1>Kyla Denzelle Samson Olmo</h1>
        );

    }
}
 
export default cont;