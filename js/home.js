
getGames("mmorpg");

// * =============> Events ===============>
document.querySelectorAll(".menu a").forEach(function (link) {
   link.addEventListener("click", function (e) {
      document.querySelector(".menu .active").classList.remove("active");
      e.target.classList.add("active");
      getGames(e.target.dataset.category);
   });
});

window.addEventListener("scroll", function () {
   if (scrollY > 40) {
      document.querySelector("nav").classList.add("fixed-top");
   } else {
      document.querySelector("nav").classList.remove("fixed-top");
   }
});

document.querySelector(".logout-btn").addEventListener("click", function () {
   logout();
});

modeBtn.addEventListener("click", function (e) {
   theme(e.target);
});

// ! =============> Functions ===============>
async function getGames(category) {
   const loading = document.querySelector(".loading");
   loading.classList.remove("d-none");
   const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
         "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   };

   const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
   const response = await api.json();
   console.log(response);
   displayData(response);
   loading.classList.add("d-none");
}

function displayData(data) {
   let gamesBox = ``;
   for (let i = 0; i < data.length; i++) {
      let videPath = data[i].thumbnail.slice(0, data[i].thumbnail.lastIndexOf("/")) + "/videoplayback.webm";

      gamesBox += `
      <div class="col px-3">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" class="card h-100 bg-transparent" role="button" onclick="showDetails(${
         data[i].id
      })">
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videPath}">
              </video>
            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small fs-4">${data[i].title}</h3>
                  <span class="badge text-bg-primary p-2 fs-3">Free</span>
               </div>

               <p class="card-text small text-center opacity-50 fs-3">
                  ${data[i].short_description.split(" ", 8)}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color fs-6">${data[i].genre}</span>
            <span class="badge badge-color fs-6">${data[i].platform}</span>

         </footer>
      </div>
   </div>
      `;
   }

   document.getElementById("gameData").innerHTML = gamesBox;
}

function showDetails(id) {
   location.href = `./details.html?id=${id}`;
}

function logout() {
   localStorage.removeItem("uToken");
   location.href = "./index.html";
}



function startVideo(event) {
   const videoEl = event.currentTarget.querySelector("video");
   videoEl.muted = true;
   videoEl.play().then(function () {
      videoEl.classList.remove("d-none");
   });
}

function stopVideo(event) {
   const videoEl = event.currentTarget.querySelector("video");
   videoEl.muted = true;
   videoEl.pause();
   videoEl.classList.add("d-none");
}
