let delete_all_button = document.querySelector("#delete-all-button");
let table_data = document.querySelector(".table-data");
let add_task_button=document.querySelector("#add-task");
let input_value = document.querySelector("#input-value");
let delete_all_hover_container = document.querySelector(".delete-all-hover-container");
let mark_container = document.querySelectorAll(".mark-container span");
let done_all = document.querySelector("#done-all-button");
let clear_input=document.querySelector("#clear-input");
add_task_button.onclick=()=>{
    if(input_value.value=="")
    {
        alert("Please enter task");
        input_value.focus();
}
    else
    add_task(input_value.value);
}
let add_task = (value) => {
    let table_data = document.querySelector(".table-data");
    let div = document.createElement("div");
    div.classList.add("data-row");
    for (let i = 1; i <= 5; i++) {
        let span = document.createElement("span");
        if (i == 1)
            span.innerHTML = value;
        else if (i == 2)
            span.innerHTML = currentdate();
        else if (i == 3)
            span.innerHTML = currenttime();
        else if (i == 4) {
            for (let i = 1; i <= 2; i++) {
                if (i == 1) {
                    let div1 = document.createElement("div");
                    div1.classList.add("done-hover-container");
                    for (let i = 1; i <= 2; i++) {
                        let span1 = document.createElement("span");
                        if (i == 1) {
                            
                            span1.classList.add("mark-container");
                            let span2 = document.createElement("span");
                            span2.innerHTML = "Mark as done";
                            span1.appendChild(span2);
                        }
                        else {
                            span1.classList.add("down-arrow");
                        }
                        div1.appendChild(span1);    
                    }
                    span.appendChild(div1);
                }
                else {
                    let button = document.createElement("button");
                    button.classList.add("done");
                    button.innerHTML = "Not Done";
                    span.appendChild(button);
                }

            }
        }
        else {
            let button1 = document.createElement("button");
            button1.innerHTML = "Remove";
            button1.classList.add("remove-button");
            span.appendChild(button1);
        }
        div.appendChild(span);
    }
    table_data.appendChild(div);
    localStorage.setItem("tasksdata",table_data.innerHTML);
}

clear_input.onclick=()=>{
    input_value.value=""
}


delete_all_button.onclick = () => {
    table_data.innerHTML = ""
    localStorage.setItem("tasksdata",table_data.innerHTML);
    table_data.innerHTML=localStorage.getItem("tasksdata");
}
delete_all_button.onmouseover = () => {
      delete_all_hover_container.classList.add("display-block");
}
delete_all_button.onmouseleave = () => {
      delete_all_hover_container.classList.remove("display-block");
}
setInterval(()=>{
    let data_row = document.querySelectorAll(".data-row");
    let done_hover_container = document.querySelectorAll(".done-hover-container");
    let done_button = document.querySelectorAll(".done");
    let remove_button = document.querySelectorAll(".remove-button");
    let mark_container = document.querySelectorAll(".mark-container span");
    let table_data=document.querySelector(".table-data");
    Array.from(remove_button).forEach((e, index) => {
        e.onclick = () => {
            data_row[index].remove();      
            localStorage.setItem("tasksdata",table_data.innerHTML);
        }
    })
    Array.from(done_button).forEach((e, index) => {
        e.onmouseover = () => {
            done_hover_container[index].classList.add("display-block");
        }
        e.onmouseleave = () => {
            done_hover_container[index].classList.remove("display-block");
            localStorage.setItem("tasksdata",table_data.innerHTML);
        }
        e.onclick = () => {
            if (mark_container[index].innerHTML == "Mark as done") {
                e.innerHTML = "Done"
                mark_container[index].innerHTML = "Mark as not done"
                localStorage.setItem("tasksdata",table_data.innerHTML);
            }
            else {
                e.innerHTML = "Not Done"
                mark_container[index].innerHTML = "Mark as done"
         
                localStorage.setItem("tasksdata",table_data.innerHTML);
            }
        }
    })
},0)
done_all.onclick = () => {
    let done_button = document.querySelectorAll(".done");
    let mark_container = document.querySelectorAll(".mark-container span");
    Array.from(done_button).forEach((e,index) => {
        e.innerHTML = "Done";
        mark_container[index].innerHTML="Mark as not done";
    })
    let table_data = document.querySelector(".table-data");
    localStorage.setItem("tasksdata",table_data.innerHTML);
}
let currentdate=()=>{
    let date=new Date();
    return `${date.getDate()<10?`0${date.getDate()}`:date.getDate()}/${(date.getMonth()+1)<10?`0${date.getMonth()+1}`:date.getMonth()}/${date.getFullYear()}`;
}
let currenttime=()=>{
    let date=new Date();
    return `${date.getHours()<10?`0${date.getHours()}`:date.getHours()}:${date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()}:${date.getSeconds()<10?`0${date.getSeconds()}`:date.getSeconds()}`;
}
let display_empty=()=>{
    let table_data=document.querySelector(".table-data");
    let table_empty=document.querySelector(".table-empty");
    if(table_data.innerHTML=="")
        {
            table_data.style.display="none";
            table_empty.style.display="flex";
    }
    else
    {
        table_data.style.display="flex";
        table_empty.style.display="none";
    }
}
setInterval(()=>{
    display_empty();
})
table_data.innerHTML=localStorage.getItem("tasksdata");
