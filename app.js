$(function() {
  const prevBtn= $("header").find("button").first()
  const nextBtn = $("header").find("button").last()
  let counter = 1 
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

  function getModalInfo(postid){
    return new Promise((resolve, reject) => {
      $.ajax({
          url: `https://dummyjson.com/posts/${postid}`,
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

    //capturing the h3 attribute
    $(".posts").find("h3").attr("post-id", `${post.posts[0].id}`)
    const h3 = $(".posts").find("h3")
    const postId = h3.attr("post-id")

    const modal = await getModalInfo(postId)

    console.log(modal)
    
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

    if(post.posts.length > 0){
      post.posts.forEach(function(post) {
        $(".posts").find("ul").append(`<li><h4>${post.title}</h3><p>${post.body}<p></li>`)
      })
    }else{
      $(".posts").find("ul").append(`<li><p>User has no posts</p></li>`)
    }

    //From Todos
    $(".todos").find("h3").html(`${user.firstName}'s To Dos`)

    if(todo.todos.length > 0){
      todo.todos.forEach((item)=>{
        if ($(this).length > 0){
          $(".todos").find("ul").append(`<li><p>${item.todo}<p></li>`)
        }
      })
    }else{
      $(".todos").find("ul").append(`<li><p>User has no todos<p></li>`)
    }
    // modalContent.empty()

    //CREATE MODAL 
    $(".posts").find("ul").on("click", "h4", async function(){
      const modalOverlay = $("<div>")
      modalOverlay.addClass("overlay")
      $(".container").append(modalOverlay)
      const modalContent = $("<div>")
      modalOverlay.append(modalContent)
      modalContent.addClass("modal")
      const closeBtn = $("<button>")
      closeBtn.html("Close Modal")
      modalContent.append(`<h2>${modal.title}</h2><p>${modal.body}</p><div>Views: ${modal.views}</div>`)
      modalContent.append(closeBtn)
      closeBtn.on("click", function(){
        modalOverlay.remove()
      })

      //add modal elements
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
      counter = 30
    }
  })
})
