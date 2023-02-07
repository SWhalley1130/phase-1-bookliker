document.addEventListener("DOMContentLoaded", function() {
    
    initBookList();
    function initBookList()
    {
        return fetch('http://localhost:3000/books')
        .then(res=>res.json())
        .then(books=>
        {
            books.forEach(book => 
            {
                const li=document.createElement("li");
                li.textContent=`${book.title}`;
                li.classList.add("book-item")
                document.querySelector("#list").append(li);
                li.addEventListener('click',(e)=>
                {
                    document.querySelector("#show-panel").textContent='';
                    getBookData(book);
                })
            });
        })
    }

    function getBookData(book)
    {
        const title=document.createElement('h4');
        title.textContent=book.title;
        const subtitle=document.createElement('h4');
        subtitle.textContent=book.subtitle;
        const author=document.createElement('h4');
        author.textContent=book.author;
        const description=document.createElement('p');
        description.textContent=book.description;
        const img=document.createElement('img');
        img.src=book.img_url;

        const ul=document.createElement('ul');
        ul.classList.add("user-item")
        book.users.forEach(element=>
        {
            const li=document.createElement('li');
            li.textContent=element.username;
            ul.append(li);
        })
       
        const btn=document.createElement('button');
        btn.textContent="LIKE";

        btn.addEventListener('click', e=>
        {
           updateLikes(book);
        })

        document.querySelector("#show-panel").append(img, title, subtitle,author,description,ul,btn);
    }

    // function checkIfUserExists(book)
    // {
    //     let inputId=parseInt(prompt("What is your user id?"));

    //     return fetch('http://localhost:3000/users/')s
    //     .then(res=>res.json())
    //     .then(user=>
    //     {
    //         Object.keys(user).forEach((key)=>
    //         {
    //            if (user[key].id===inputId)
    //            {
    //              console.log("Hmmmmmm")

    //            }
    //            else 
    //            {
    //              updateLikes(book);
    //            }

    //         })
    //     })
    // }
  




    function updateLikes(bookObj)
    {
        bookObj.users.push({id: parseInt(`${prompt('What is your ID?')}`), username:`${prompt("What is your username?")}`})
        fetch(`http://localhost:3000/books/${bookObj.id}`, 
        {
            method: 'PATCH',
            headers:
            {
                "Content-Type":'application/json',
                "Accept": "applications/json"
            },
            body:JSON.stringify(bookObj)
        })
        .then(res=>res.json())
        .then(updatedBook=>
        {
           const usersList=updatedBook.users.slice(-1);
           const li=document.createElement('li');
           li.textContent=usersList[0].username;
           document.querySelector(".user-item").append(li);
        })
    }
});