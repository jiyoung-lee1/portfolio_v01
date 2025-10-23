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

