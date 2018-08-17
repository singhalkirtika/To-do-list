// window.onload  = function(){
// };
// or
// window.addEventListener('Load',function(){
// });
// document.getElementById('add').addEventListener('click',function(){
//   console.log("ButtonClicked");
// });
var k = 1;
var data=(localStorage.getItem('todoList'))?(JSON.parse(localStorage.getItem('todoList'))):{
   todo : [],
   completed : []
};

console.log(data);

window.onload = function renderList(){
  if(!data.todo.length && !data.completed.length){
    return;}

  for(var i=0;i<data.todo.length;i++){
     var value = data.todo[i];
     addItem(value);
  }

  for(var j=0;j<data.completed.length;j++){
    var value = data.completed[j];
    addItem(value, true);
  }
};

function hit(e){
  var text = document.getElementById('item').value;
  if(e.code==='Enter' && text){
    addEnter(text);
  }
}


function objectUpdated(){
   localStorage.setItem('todoList',JSON.stringify(data));
}

function getText(){
  var text = document.getElementById('item').value;
  if(text){
    addEnter(text);
  }
}


function addEnter(text){
  addItem(text);
  data.todo.push(text);
  objectUpdated();
  console.log(data.todo);
  document.getElementById('item').value = '';
}

function removeItem(){
  var item = this.parentNode.parentNode;
  var parentID = item.parentNode.id;
  if(parentID==='completed'){
    var index = data.completed.indexOf(item.innerText);
    if(index!=-1){
    data.completed.splice(index,1);
  }
}
  else{
    var index = data.todo.indexOf(item.innerText);
    if(index!=-1){
    data.todo.splice(index,1);
  }
}
objectUpdated();
item.remove();
}

function addItem(text, completed){
  var list = completed?document.getElementById('completed'):document.getElementById('todo');
  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.addEventListener('click',removeItem);

  var tick = document.createElement('button');
  tick.classList.add('tick');
  tick.addEventListener('click',complete);

  buttons.appendChild(remove);
  buttons.appendChild(tick);
  item.appendChild(buttons);
  // list.appendChild(item);
  list.insertBefore(item, list.childNodes[0]);
}

function complete(){
  var node = this.parentNode.parentNode;
  var parentID = node.parentNode.id;
  var list;

  if(parentID==='todo'){
     list = document.getElementById('completed');
     data.completed.push(node.innerText);
     console.log(data.completed);
     var index = data.todo.indexOf(node.innerText);
     if(index!=-1){
       data.todo.splice(index,1);
     }
  }

  else{
     list = document.getElementById('todo');
     data.todo.push(node.innerText);
     console.log(data.todo);
     var index = data.completed.indexOf(node.innerText);
     if(index!=-1){
       data.completed.splice(index,1);
     }
  }
  objectUpdated();
  node.remove();
  list.insertBefore(node, list.childNodes[0]);
}
