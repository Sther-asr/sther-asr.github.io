const portfolio = document.querySelector('.portfolio');
const trackAll = document.querySelectorAll('.track');
var slideAll = [];

cargarEventListeners();
function cargarEventListeners(){
    portfolio.addEventListener('click', nextButton);
    portfolio.addEventListener('click', prevButton);
}

// arrange the slides next to one another
trackAll.forEach( (slide, i) => {
    slideAll[i] = Array.from(slide.children);
})
const slideWidth = slideAll[0][0].getBoundingClientRect().width;
const setSlidePosition = (slide) => {
    slide.forEach( (slide2, index) => {
        slide2.style.left = slideWidth * index + 'px';
    })
};
slideAll.forEach(setSlidePosition);

// when I click right, move slide to the right
function nextButton(e){
    if(e.target.parentElement.classList.contains('right')){
        // const currentSlide = track.querySelector('.current-slide');

        const prev = e.target.parentElement.parentElement.firstElementChild;
        const next = e.target.parentElement.parentElement.lastElementChild;
        
        const trackButton = e.target.parentElement.previousElementSibling.children[0];
        const slides = Array.from(trackButton.children);
        const currentSlide = e.target.parentElement.previousElementSibling.children[0].querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;

        moveToSlide(trackButton, slides, currentSlide, nextSlide, prev, next);
        console.log('clickeando derecha')
    }
}

// when I click left, move slide to the left
function prevButton(e){
    if(e.target.parentElement.classList.contains('left')){
        // const currentSlide = track.querySelector('.current-slide');

        const prev = e.target.parentElement.parentElement.firstElementChild;
        const next = e.target.parentElement.parentElement.lastElementChild;

        const trackButton = e.target.parentElement.nextElementSibling.children[0];
        const slides = Array.from(trackButton.children);
        const currentSlide = e.target.parentElement.nextElementSibling.children[0].querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;

        moveToSlide(trackButton, slides, currentSlide, prevSlide, prev, next);
        console.log('clickeando izquierda')
    }
}

// Move Slides side to side
const moveToSlide = (track, slides, currentSlide, targetSlide, prev, next) => {
    // move the next slide
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

    // find Index of targetSlide
    // const targetIndex = slides.indexOf(targetSlide); this is other way to find it
    const targetIndex = slides.findIndex( slide => slide === targetSlide);
    hideShowArrows(targetIndex, slides, prev, next);
};

// Hide-Show Arrows Effect when no more photos left or right
const hideShowArrows = (targetIndex, slides, prev, next) => {
    if(targetIndex === 0){
        prev.classList.add('is-hidden');
        next.classList.remove('is-hidden');
    } else if(targetIndex === slides.length - 1){
        prev.classList.remove('is-hidden');
        next.classList.add('is-hidden');
    } else{
        prev.classList.remove('is-hidden');
        next.classList.remove('is-hidden');
    }
}
