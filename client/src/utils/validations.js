const expressions = {
    name: new RegExp('^[ A-Z]+$','i'),
    duration: new RegExp('^[0-9]+$'),
}

export const validationsInputs=(target,value,other=null)=>{
    switch (target) {
        case 'name':
            if(value.length < 1)return{
                res: false,
                msg:"Field cann't be empty"
            }
            if(!expressions.name.test(value)){
                return{
                    res: false,
                    msg:'only letters required'
                }
            }
            return {res:true}
            
        case 'duration':
            if(value.length < 1)return{
                res: false,
                msg:"Field cann't be empty"
            }
            if(!expressions.duration.test(value)){
                return{
                    res: false,
                    msg:'only numbers required'
                }
            }
            value = parseInt(value);
            let newValue;
            switch (other) {
                case 'hours':
                    if (value < 12 || value > 504) {
                        return{
                            res: false,
                            msg:'Duration should be between 12h and 504h',
                            newValue:value

                        }
                    }
                return {
                    res:true,
                    newValue: value
                }

                case 'days':
                    newValue = value*24;
                    if (newValue < 12 || newValue > 504) {
                        return{
                            res: false,
                            msg:'Duration should be between 1/2day and 21days',
                            newValue

                        }
                    } 
                    return  {res:true,
                        newValue
                    }

                case 'weeks':
                    newValue = value*168;
                    if (newValue < 12 || newValue > 504) {
                        return{
                            res: false,
                            msg:'Duration should be between 12h and 3weeks',
                            newValue

                        }
                    }
                    return{res:true,
                        newValue
                    }

                default:
                    return {
                        res:false,
                        msg:`Option ${other} isn't valid`,
                        newValue: value
                    }
            }
        default:
            return {res:true}
    }
}