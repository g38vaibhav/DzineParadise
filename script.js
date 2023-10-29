
const scriptURL = 'https://script.google.com/macros/s/AKfycbzwUq6UGgXiA_gCRs7yzdSAyQZRf8FuGM4POjqq3mkmuxGwgvhjRV3remjuDSDkL03Z/exec'
      const form = document.forms['submit-to-google-sheet']
      const success= document.getElementById('success');
      const successMessage = document.getElementById("successMessage");
      const errorMessage = document.getElementById("errorMessage");

      form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => { successMessage.style.display = "block"; errorMessage.style.display = "none";})
          .catch(error => {successMessage.style.display = "none"; errorMessage.style.display = "block";})}) 

//document.addEventListener("DOMContentLoaded", function() {
    //document.getElementById("myForm").addEventListener("submit", function(e) {e.preventDefault();

      //  const currentDate = new Date();
    
        // Get the day, month, and year
      //  const day = currentDate.getDate();
      //  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
       // const year = currentDate.getFullYear();
    
        // Format the date as "DD/MM/YYYY" (you can customize the format)
       // const formattedDate = `${day}/${month}/${year}`;
    
        // Create a hidden input field to store the timestamp
       // const hiddenInput = document.createElement("input");
       // hiddenInput.type = "hidden";
       // hiddenInput.name = "Date";
       // hiddenInput.value = formattedDate;
    
        // Append the hidden input to the form
      //  document.getElementById("myForm").appendChild(hiddenInput);
    
        // Submit the form
      //  document.getElementById("myForm").submit();
    //});
//});

const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");
      let getMode = localStorage.getItem("mode");
          if(getMode && getMode === "dark-mode"){
            body.classList.add("dark");
          }
      
//   js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});
body.addEventListener("click" , e =>{
    let clickedElm = e.target;
    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});

function initializeCarousel(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    const carousel = wrapper.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = wrapper.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];
   
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

     // Add event listeners for the arrow buttons to scroll the carousel left and right
     arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }
    
    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }
    
    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    
        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }
    
    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1000);
    }
    autoPlay();
    
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
    
}


initializeCarousel("carousel1");

// Initialize the carousel for the second div
initializeCarousel("carousel2");



