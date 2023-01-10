
const $posts = document.querySelector('#posts');
const $createPost = document.querySelector('#create-post');
//const $form = document.querySelector('#create-form');

// const btnCreate = document.querySelector('.submit');
const btnHeaderGetAll = document.getElementById('btn-header-get-all');
const btnHeaderCreate = document.getElementById('btn-header-create-new');
const btnHeaderDeleteAll = document.getElementById('btn-header-delete-all');

//let posts = []
const BASE_URL = '/api/post'

//*************************************************************************** 
 //------------------- HTML ELEMENTS ---------------------- 
 //*************************************************************************** 

const card = function(post) { 
  return `  
  <div class="single-post-wrapper">
    <div class="single-post">
      <a href="" onClick="return false" id="card-title-link"><h2 class="card-title">${post.title}</h2></a>
      <div class="content" style="display: none;">        
        <p class='post-content'>${post.text}</p>         
      </div>
      <p>${new Date(post.date).toLocaleDateString()}</p>
      <hr>
      <div class="card-action">
        <button class="show-content" data_id=${post._id}>Show content</button>
        <button class="get-this-post" data_id=${post._id}>Get only</button>
        <button class="update-this-post" data_id=${post._id}>Update</button>
        <button class="delete-this-post" data_id=${post._id}>Delete</button>          
      </div>
    </div>
  </div> 
  `
}

const inputForm = function() { 
  return ` 
  <form id="create-form"> 
    <div class="create-form-content">
      <h2>Create a new post</h2>

      <div class="input-field">
        <label for="title">Title</label>
        <input id="title" type="text" class="input-field" required>   
      </div>

      <div class="input-field">
        <label for="text">Text</label>
        <textarea id="text" type="text" class="textarea"></textarea>
      </div>    
    </div>
    <div class="submit-form">
      <button class="submit">Create</button>
    </div>
  </form>
  `
}

const updateThisPostForm = function(data) { 
  return ` 
  <form id="create-form"> 
    <div class="create-form-content">
      <h2>Update post</h2>

      <div class="input-field">
        <label for="title">Title</label>
        <input id="title" type="text" class="input-field" required>   
      </div>

      <div class="input-field">
        <label for="text">Text</label>
        <textarea id="text" type="text" class="textarea"></textarea>
      </div>    
    </div>
    <div class="submit-form">
      <button id="update">Update post</button>
    </div>
  </form>
  `
}


const getThisPostCard = function(data) { 
  return ` 
  <form id="create-form"> 
    <div class="content">
        <h2 class="card-title">${data.post.title}</h2>
        <p class='post-content'>${data.post.text}</p>
        <p>${new Date(data.post.date).toLocaleDateString()}</p>
    </div>
    <hr>
    <div class="card-action">
      <button id="back-to-all-posts">Back</button>
    </div>
    </div>
  </form>
  `
}

const noPosts = function() { 
  return ` 
  <div class="content">
  <h3 class="card-title">No posts now</h3>
  </div>
  `
}
//---------- HTML ELEMENTS ------ end 

//*************************************************************************** 
//----- GET ALL POSTS ----------- 
//*************************************************************************** 

btnHeaderGetAll.addEventListener('click', async () =>{

  $posts.innerHTML = '';
  $createPost.innerHTML = '';

  const response = await fetch(BASE_URL);
  const data =await response.json();
  console.log('Data from function:');
  console.log(data);
  console.log(data.length);
  if (data.length == 0)
  {
    $posts.innerHTML = noPosts();

  }
  else
  {

    for (let d of data) 
    {
      console.log('Resp:');
      console.log(d);
      console.log('Card:');
      console.log(card(d));          
      $posts.innerHTML += card(d);   //responce.map(post => card(post)).join(' ')           
    }

    const btnsDeleteThisPost = document.getElementsByClassName('delete-this-post');
    const btnsGetThisPost = document.getElementsByClassName('get-this-post');
    const btnsUpdateThisPost = document.getElementsByClassName('update-this-post');
    const btnsShowContent = document.getElementsByClassName('show-content');

    for (let button of btnsDeleteThisPost){
      button.addEventListener('click', deleteThisPost);
    }

    for (let button of btnsGetThisPost){
      button.addEventListener('click', getThisPost);
    }

    for (let button of btnsUpdateThisPost){
      button.addEventListener('click', updateThisPost);
    }

    for (let button of btnsShowContent){
      button.addEventListener('click', showContent);
    }

  }
}) 

//----- GET ALL POSTS ----------- end

//*************************************************************************** 
//----- CREATE A NEW POST ------- 
//*************************************************************************** 

 btnHeaderCreate.addEventListener('click', () => {
  console.log('CREATE a new post');
  $posts.innerHTML ='';
  $createPost.innerHTML = inputForm();
  
  const $form = document.querySelector('#create-form');
  const input = document.getElementById('title');
  const text = document.getElementById('text');

  $form.addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log('Submit form');
    console.log('Title:');
    console.log(input.value);
    console.log('Text:');
    console.log(text.value);

    const newPost = {
      title: input.value,
      text: text.value
    }
    
    const res = await fetch(BASE_URL, {
      method: 'post',
      body: JSON.stringify(newPost),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    btnHeaderGetAll.click();  
  }) 
}) 

//----- CREATE A NEW POST ------- end

//*************************************************************************** 
//------ DELETE ALL POST -------- 
//*************************************************************************** 
btnHeaderDeleteAll.addEventListener('click', async () =>{

  $createPost.innerHTML = '';
  const decision = confirm('Are you sure?');

  if (decision) {
    const res = await fetch(BASE_URL, {
      method: 'delete'
    })
  }
  btnHeaderGetAll.click(); 
}) 

//----- DELETE ALL POSTS  -------- end

//*************************************************************************** 
//-------- GET THIS POST -------- 
//*************************************************************************** 

async function getThisPost(event) {
  
  console.log('Get this post function');
  $posts.innerHTML ='';
  const id = event.target.getAttribute('data_id');
  console.log(`${BASE_URL}/${id}`);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'get'
  })
  const data = await res.json();

  console.log('Data');
  console.log(data);

  $createPost.innerHTML = getThisPostCard(data);
  
  const btnBack = document.getElementById('back-to-all-posts');
  btnBack.addEventListener('click', ()=>{btnHeaderGetAll.click();});   
}


//-------- GET THIS POST -------- end

//*************************************************************************** 
//-------- UPDATE THIS POST ----- 
//*************************************************************************** 

async function updateThisPost(event) {
  
  console.log('Update this post function');

  $posts.innerHTML ='';
  const id = event.target.getAttribute('data_id');
  console.log(`${BASE_URL}/${id}`);

  $createPost.innerHTML = updateThisPostForm();
  
  const input = document.getElementById('title');
  const text = document.getElementById('text');
  const btnUpdate = document.getElementById('update');

  let res = await fetch(`${BASE_URL}/${id}`, {
    method: 'get'
  })
  const data = await res.json();

  input.value = data.post.title;
  text.value = data.post.text;

  btnUpdate.addEventListener('click', async (event)=>{
    event.preventDefault();

    console.log('Click on Update this buttton');

    const updatedPost = {
      _id: id,
      title: input.value,
      text: text.value
    }
    console.log('Updated Post');
    console.log(updatedPost);

    res = await fetch(`${BASE_URL}/${id}`, {
      method: 'put',
      body: JSON.stringify(updatedPost),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    btnHeaderGetAll.click(); 
  });
}

 //-------- UPDATE THIS POST ----- end

//*************************************************************************** 
//------- DELETE THIS POST ----- 
//*************************************************************************** 

 async function deleteThisPost(event) {
    const id = event.target.getAttribute('data_id');
    console.log(event.target);
    console.log('Data-id:');
    console.log(id);
    const decision = confirm('Do you really want to delete this post?')
  
    if (decision) {
      console.log('Base url');
      console.log(`${BASE_URL}/${id}`);
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'delete'
      })
      btnHeaderGetAll.click();
    }
     
  }
 
 //-------- DELETE THIS POST ---- end

//*************************************************************************** 
//------- SHOW CONTENT ANIMATION ----- 
//*************************************************************************** 
 async function showContent(event) {

  let $jCurrentButton = $(this);
 
  console.log($jCurrentButton);
  //$jCurrentTitle.animate({fontSize: "22px"}, 1000 );
  let $jParent = $jCurrentButton.parent(".card-action");
  console.log($jParent);
  let $jDivSibling = $jParent.siblings(".content");
  console.log($jDivSibling);
  let $jH2Sibling = $jParent.siblings("a");
  console.log($jH2Sibling);
   if ($jDivSibling.is(":hidden")){
    $jDivSibling.show(2000);
    $jCurrentButton.html("Hide content");
  }
  else {
    //$jSibling.animate({opacity: "hide"}, "3000");
    $jDivSibling.fadeOut(2000);
    $jCurrentButton.html("Show content");
  } 
   
}
 //--- SHOW CONTENT ANIMATION --- end