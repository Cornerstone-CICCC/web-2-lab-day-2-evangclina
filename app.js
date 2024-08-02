$(function() {
  
  // your code here
  function getUserId(userid){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://dummyjson.com/users/${userid}`,
            type: `GET`,
            success: function(response){
              resolve(response)
            },
            error: function(error){
              reject(error)
            }
        })
    })
  }

  function getPost(userid){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://dummyjson.com/users/${userid}/posts`,
            type: `GET`,
            success: function(response){
              resolve(response)
            },
            error: function(error){
              reject(error)
            }
        })
    })
  }

  function getTodos(userid){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://dummyjson.com/users/${userid}/todos`,
            type: `GET`,
            success: function(response){
              resolve(response)
            },
            error: function(error){
              reject(error)
            }
        })
    })
  }

  async function buildHTML(id){
    const user = await getUserId(id)
    const post = await getPost(id)
    const todo = await getTodos(id)
    
    $(".posts").find("ul").empty()
    $(".todos").find("ul").empty()

    //From user
    //image, firstName, age, email, phone

    $(".info__image").find("img").attr("src", `${user.image}`)

    $(".info__content").html(`
      <h2>ID ${user.id}: ${user.firstName} ${user.lastName}</h2>
      <div><p><strong>Age:</strong> ${user.age}</p></div>
      <div><p><strong>Email:</strong> ${user.email}</p></div>
      <div><p><strong>Phone:</strong> ${user.phone}</p></div>`)

    //From posts 
    $(".posts").find("h3").html(`${user.firstName}'s Posts`)

    post.posts.forEach(function(post, i) {
      if($(this).length >= 0){
        $(".posts").find("ul").append(`<li><h4>${post.title}</h3><p>${post.body}<p></li>`)
      }else{
        $(".post").find("ul").append(`<p>User has no posts</p>`)
      }
    })

    //From Todos
    $(".todos").find("h3").html(`${user.firstName}'s To Dos`)

    todo.todos.forEach((item, i)=>{
      if (i >= 0){
        $(".todos").find("ul").append(`<li><p>${item.todo}<p></li>`)
      }else{
        $(".todos").find("ul").append(`<li><p>User has no todos<p></li>`)
      }
    })

  }

  //slide  todos
  $(".todos").find("h3").on("click", function(){
    $(this).next().slideToggle()
  })
   //slide  post 
   $(".posts h3").on("click", function(){
    $(this).next().slideToggle()
  })

  const prevBtn= $("header").find("button").first()
  const nextBtn = $("header").find("button").last()

  let counter = 1

  buildHTML(1)
  nextBtn.on("click", function(){
    counter = counter + 1
    buildHTML(counter)

    if(counter === 30) {
      counter = 0
    }
  })

  prevBtn.on("click", function(){
    counter = counter - 1
    buildHTML(counter)

    if(counter === 0) {
      counter = 31
    }
  })
})