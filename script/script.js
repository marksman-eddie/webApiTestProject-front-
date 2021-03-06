let msgArray = [];
let listMessage = document.getElementById('msg-list');
let btnAdd = document.getElementById('btn-add');
let inputMessage = document.getElementById('input-message');
let btnPost = document.getElementById('btn-post');
let btnDelete = document.getElementById('delete-btn');
function buttonActivate ()
{
   var  text = $('#input-message').val();
   if(text.length != 0 ) {
    $('#btn-add').removeAttr('disabled');
} else {
    $('#btn-add').attr('disabled', 'disabled');
}
}

function renderListMessage (){
    listMessage.innerHTML='';
    for(let i=0;i<msgArray.length;i++)
    {
        let message = msgArray[i];
        listMessage.innerHTML += `
        <div class="message">
                <button type="button" class="btn btn-warning" id="delete-btn">Warning</button>
                <div class="user-name">${message.user}</div>
                <div class="text-message">${message.text}</div>
                <div class="date">${message.date}</div> 
                
            
        </div>`
    }

}



renderListMessage();
btnPost.addEventListener('click', function(event) {
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://localhost:5001/messages/getAllMessages",false);
    xhr.send();
    if(xhr.status === 200)
    {
        var obj = JSON.parse(xhr.responseText);
        console.log(obj);
        for (let i = 0; i<obj.length;i++)
        {
            let message ={
                id : obj[i].id,
                text : obj[i].text,
                date : obj[i].date
            };
            msgArray.push(message);
        
        }

    }
    renderListMessage();
    
})

btnAdd.addEventListener('click',function(event) {
    var msgUser = {
        text: inputMessage.value,
        


    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST","https://localhost:5001/messages/AddNewMessage",false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(msgUser));
    if (xhr.status === 200)
    {
        var obj = JSON.parse(xhr.responseText);
        let message ={
            date : obj.date,
            text : obj.text

        
        };
        msgArray.push(message);
        renderListMessage();
    }
})

btnDelete.addEventListener('click', function(event){
    
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST","https://localhost:5001/messages/RemoveMessage",false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(message.id));
    if (xhr.status === 200)
    {
        console.log('delete object');

    }
})


