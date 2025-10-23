var menu = document.querySelector(".gnb");

menu.addEventListener('mouseover',()=>{
   document.querySelectorAll(".gnb ul").forEach(ul => {
        ul.style.display = 'block';
    });
    document.querySelector(".gnb_bg").style.display='block';
});
menu.addEventListener('mouseout',()=>{
    document.querySelectorAll(".gnb ul").forEach(ul => {
        ul.style.display = 'none';
    });
    document.querySelector(".gnb_bg").style.display='none';
});

var popCloseBtn =document.querySelector(".pop-up-btn .close-btn");
popCloseBtn.addEventListener('click',()=>{
    document.querySelector(".pop-up-btn").style.display='none';
});


const video = document.querySelector('#player');
const videoSection = document.querySelector('.video');

window.addEventListener('scroll', () => {
  const rect = videoSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 화면에 절반 이상 보이면 재생
  if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2) {
    video.play();
  } else {
    video.pause();
  }
});

