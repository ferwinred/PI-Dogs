

const validate = (state) => {
    let errors = {};

    if(!state.name){
        errors.name = "name is required";
    } else if(!/[^0-9]/.test(state.name)){
        errors.name = "name format is invalid";
    };

    if(state.image){
        if(!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(state.image)){
            errors.image = "URL format invalid";
        };
    };

    if(!state.max_weight){
        errors.max_weight = "max_weight is required";
    } else if(!/[0-9]+/.test(Number(state.max_weight))){
        errors.max_weight = "max_weight must be a number";
    };

    if(!state.min_weight){
        errors.min_weight = "min_weight is required";
    } else if(!/[0-9]+/.test(Number(state.min_weight))){
        errors.min_weight = "min_weight must be a number";
    }
    
    if(!(Number(state.max_weight) >= Number(state.min_weight))){
        errors.min_weight = "min_weight must be lower than max_weight";
    };

    if(state.max_height){
        if(!/[0-9]+/.test(Number(state.max_weight))){
            errors.max_height = "max_weight must be a number";
        };
    };

    if(state.min_height){
        if(!/[0-9]+/.test(Number(state.min_height))){
        errors.min_height = "min_height must be a number";
        }
    };
    if(!(Number(state.max_height) >= Number(state.min_height))){
        errors.min_height = "min_height must be lower than max_height";
        };

    if(state.life_time_max){
        if(!/[0-9]+/.test(Number(state.life_time_max))){
            errors.life_time_max = "life_time_max must be a number";
        };
    };

    if(state.life_time_min){
        if(!/[0-9]+/.test(Number(state.life_time_min))){
        errors.life_time_min = "life_time_min must be a number";
        } 
    };
    if(!(Number(state.life_time_max) >= Number(state.life_time_min))){
        errors.life_time_min = "life_time_min must be lower than life_time_max";
        };

    return errors;

};

export {validate};