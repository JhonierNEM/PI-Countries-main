export const spanStyle=(id,className,remove,error,text)=>{
    let span = document.getElementById(id);
    if(error){    
        span.classList.remove(remove);
        span.classList.add(className);
        
        span.innerHTML = text;
    }else{
        span.classList.remove(className);
        span.classList.add(remove)
    }
}

export const disableButton=(id,disable)=>{
    let buttons = id.map(element=>document.getElementById(element)) 
    buttons.forEach(element => {
        element.disabled = !disable;
    });   
}

export const divTime=(id,add,remove)=>{
    let div = document.getElementById(id)
    div.classList.remove(remove);
    div.classList.add(add);

    setTimeout(function () {
        div.classList.remove(add);
        div.classList.add(remove);
    },3000)
}

export const divStyle=(id,className,remove,value)=>{
    let tag = document.getElementById(id);
    if(value){    
        tag.classList.remove(remove);
        tag.classList.add(className);
    }else{
        tag.classList.remove(className);
        tag.classList.add(remove)
    }
}
export const buttonStyle=(id,className,remove,value)=>{
    let tag = document.getElementById(id);
    if(value){    
        tag.classList.remove(remove);
        tag.classList.add(className);
    }else{
        tag.classList.remove(className);
        tag.classList.add(remove)
    }
}