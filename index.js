const projects = document.querySelectorAll(".projects");
const sidebar = document.querySelector(".sidebar");
const links = document.querySelectorAll(".links");
const link = document.querySelectorAll(".link");
const hidden_menu = document.querySelector(".hidden-menu")
const hamburger = document.querySelector(".hamburger")
const close = document.querySelector(".close")
const down_arrow = document.querySelector(".down-arrow")
const sidelink = document.querySelector(".sidelinks");
const viewportwidth = window.innerWidth
const sidebar_background = document.querySelector(".sidebar-background");




// hidden menu for smaller screen

// opening and closing hidden menu
function menu_slider(clicked){
  if(clicked.classList.value.includes("hamburger")){
    
    sidebar.classList.add("translate")
    clicked.classList.toggle("hidden")
    close.classList.toggle("hidden")
    down_arrow.classList.toggle("visibility")
  } 

  if(clicked.classList.value.includes("close")){
  
    sidebar.classList.remove("translate")
     hamburger.classList.toggle("hidden")
    clicked.classList.toggle("hidden")
    down_arrow.classList.toggle("visibility")

  }
}


hidden_menu.addEventListener("click", (e) =>{
  const clicked_btn = e.target
  menu_slider(clicked_btn)  
})


//removing side menu when a link is clicked
sidelink.addEventListener("click", function(e){
  if(viewportwidth > 1190) return

  const clicked_btn = e.target.closest(".link")
  console.log(clicked_btn);
  
     hamburger.classList.toggle("hidden")
    close.classList.toggle("hidden")
    down_arrow.classList.toggle("visibility")
    setTimeout(()=>{
      sidebar.classList.remove("translate")
    },550)


})

// projects animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

const observerCallback = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.firstElementChild.classList.add("project-animation");
    entry.target.lastElementChild.classList.add("project-animation");
  } else {
    entry.target.firstElementChild.classList.remove("project-animation");
    entry.target.lastElementChild.classList.remove("project-animation");
  }
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

projects.forEach((projects) => {
  observer.observe(projects);
  //   observer.unobserve(projects);
});

// SIDEBAR  HIGHLIGHTER FOLLOW ALONG

// /creating span element in the DOM and appending it to nav section
const highlight = document.createElement("span");
sidebar_background.append(highlight);

// adding highlight class span
highlight.classList.add("highlight");

//  func. for getting the rect position of the hovered link
const hovered = function (position) {
  const coordinates = position.getBoundingClientRect();

  highlight.style.width = `${coordinates.width + 100}px`;
  highlight.style.height = `${coordinates.height + 15}px`;
  highlight.style.transform = `translate(${coordinates.left - 9}px,${
    coordinates.top - 9
  }px)`;
  highlight.style.transition = "all 0.5s";
};

// creating the trigger with event listener
links.forEach((link) =>
  link.addEventListener("mouseenter", function (e) {
    highlight.style.visibility = "visible";
    hovered(this);
  })
);

sidebar.addEventListener("mouseleave", function () {
  highlight.style.visibility = "hidden";
  highlight.style.transition = "all 0s linear 0s";
});
