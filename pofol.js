// aos선언
//   AOS.init();
AOS.init({
    duration: 1200,
    once: true
});
// preloader
setTimeout(() => {
    const loading = document.querySelector('.loading');
    loading.style.opacity = 0;

    // opacity가 0으로 된 후 display:none 처리 (0.5초 뒤)
    setTimeout(() => {
        loading.style.display = 'none';
        document.querySelector('#wrap').style.display = 'block';
    }, 0);
}, 2000);
// preloader 잠시 감추기 위해 100 시작하려면 2000

//cursor
let mouseX = 0;
let mouseY = 0;
document.querySelector(".inner").addEventListener('scroll',()=>{
    console.log($(this).scrolltop)
});
// 마우스 위치 저장
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 총알 발사 함수
function shootBullet(x, y) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    document.body.appendChild(bullet);

    let bulletY = y;

    const bulletInterval = setInterval(() => {
        bulletY -= 10;
        bullet.style.top = `${bulletY}px`;

        if (bulletY < -20) {
            bullet.remove();
            clearInterval(bulletInterval);
        }
    }, 16);
}
// 클릭 시 총알 발사
document.addEventListener('click', () => {
    shootBullet(mouseX, mouseY);
});

$(document).ready(function () {
// header
// header 스크롤시 디자인 변경
console.log(scrollY);
$(window).on('scroll', function () {
    if ($(this).scrollTop()) {
        $('#header').addClass('active');
        // document.querySelector('#about').scrollIntoView();
    } 
    else {
        $('#header').removeClass('active');
    }
});
// header scroll반응
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    console.log(currentScroll);
    if (currentScroll > lastScroll) {
        // 아래로 스크롤
        $('#header').removeClass('show');
        // document.querySelector('#about').scrollIntoView();
        // $('#header').addClass('hide');
    } else if(currentScroll < lastScroll){
        // 위로 스크롤
        $('#header').removeClass('hide');
        $('#header').addClass('show');
        // document.querySelector('#main').scrollIntoView();
    }
    lastScroll = currentScroll;
});
// slick


    $('.autoplay').slick({
        centerMode: true,          // 중앙 정렬 모드 활성화
        centerPadding: '60px',     // 양옆 여백
        slidesToShow: 3,           // 한 화면에 3개
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
         responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        centerPadding: '10px'
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerPadding: '20px'
      }
    }
  ]
    });
    $('.character-box').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 4000,
        // fade: true,
        cssEase: 'linear',
        variableWidth: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false
    });

});


// 모달 modal

// sns banner클릭시
$(document).on('click', '.slick-card', function () {
    const bg = $(this).css('background-image');
    let modalBox = $('.modal').find('.modal-box');
    const url = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    // modalBox.empty();
    let img = $('<img>').attr('src', url);
    modalBox.append(img);
    // $('.modal-img').attr('src', url);
    $('.modal').css('display', 'flex'); // flex로 변경
    $('.modal').fadeIn();
});

// 닫기 버튼
$(document).on('click', '.modal img, .modal, .modal .close', function (e) {
    if (e.target !== this) return;
    $('.modal').fadeOut();
    $('.modal-box').empty();
    $('.modal-box').removeClass('characters');
});
// /sns banner

// character 클릭시
$(document).on('click', '.character-box .egg', function () {
    const imgSrc = $(this).find('img').attr('src');
    const match = imgSrc.match(/character(\d{2})/); // 숫자만 추출// 'character' 뒤의 두 자리 숫자 추출
    const characterNum = match[1];
    let modalBox = $('.modal').find('.modal-box');
    modalBox.addClass('characters');
    // modalBox.empty();
    // 이미지 24장 추가
    for (let i = 1; i <= 24; i++) {
        const imgPath = `./img/character${characterNum}-${i}.png`;
        let img = $('<img>').attr('src', imgPath).attr('alt', `character${characterNum}-${i}`);
        modalBox.append(img);
    }
    $('.modal').css('display', 'flex'); // flex로 변경
    // 모달 보이기
    $('.modal').fadeIn();
});
// /character

function fillProgress(duration = 20000) {
    const progress = document.getElementById('progress');
    const max = progress.max;
    let value = 0;
    const interval = 20;
    const step = max / (duration / interval);

    const $runner = $('.runner');
    const barWidth = $('.progress-container').width(); // 게이지 전체 길이
    const runnerWidth = $runner.width(); // 러너 이미지 크기
    const maxLeft = barWidth - runnerWidth / 2; // 러너가 이동할 최대 거리

    progress.value = 0;

    const timer = setInterval(() => {
        value += step;
        if (value >= max) {
            value = max;
            clearInterval(timer);
            document.querySelector('#about').scrollIntoView();
        }

        progress.value = value;

        // 🔥 게이지 비율로 러너 위치 계산
        const percent = value / max; // 0 ~ 1
        const left = maxLeft * percent;
        $runner.css('left', left + 'px');
    }, interval);

}

// main-visual이 화면에 등장하면 실행
const about_section = document.querySelector('#main');
let played = false; // 한 번만 실행되도록
const about_observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting && !played) {
            fillProgress(5000);
            played = true;

        }
    });
}, {
    // threshold: 0.5 
    // 50% 이상 보일 때 실행
});

about_observer.observe(about_section);

// shortcut img change
const naverShortcutButton = document.querySelector(".naver-shortcut-button");
const isaacShortcutButton = document.querySelector(".isaac-shortcut-button");

naverShortcutButton.addEventListener('click',()=>{
    $('.naver-shortcut').addClass('view');
    $('.issac-shortcut').removeClass('view');
});
isaacShortcutButton.addEventListener('click',()=>{
    $('.issac-shortcut').addClass('view');
    $('.naver-shortcut').removeClass('view');
});

// 키워드 박스  하이라이트
const k1box =$(".k1box");
const k2box =$(".k2box");
const k3box = $(".k3box");

k1box.on('mouseover',()=>{
    $('.k1').addClass('highlight');
});
k1box.on('mouseout',()=>{
    $('.k1').removeClass('highlight');
});
k2box.on('mouseover',()=>{
    $('.k2').addClass('highlight');
});
k2box.on('mouseout',()=>{
    $('.k2').removeClass('highlight');
});
k3box.on('mouseover',()=>{
    $('.k3').addClass('highlight');
});
k3box.on('mouseout',()=>{
    $('.k3').removeClass('highlight');
});
// archive박스 내 콘텐츠 스크롤

// document.querySelectorAll('.text-tit span').forEach(span => {
//   span.addEventListener('click', () => {
//     const currentY  = document.scrollY;
//     const targetId = span.dataset.target;
//     const target = document.getElementById(targetId);

//     document.querySelectorAll('.text-tit span').forEach(s => s.classList.remove('select'));
//     span.classList.add('select');

//     target.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     });
//     target.scrollIntoView()
//     document.scrollIntoView(scrollY);
//   });
// });
const container = document.querySelector('.box-inner');
document.querySelectorAll('.text-tit span').forEach(span => {
  span.addEventListener('click', () => {
    const targetId = span.dataset.target;
    const target = document.getElementById(targetId);

    // 탭 선택 효과
    document.querySelectorAll('.text-tit span').forEach(s => s.classList.remove('select'));
    span.classList.add('select');

    // 내부 스크롤 이동
    container.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });
  });
});
// let tabBtns = document.querySelectorAll('.tab-tbn');
// let boxs = document.querySelectorAll('.archive-box');

// container.addEventListener('scroll', () => {
//     const scrollTop = container.scrollTop;

//     const box0Top = boxs[0].offsetTop - container.offsetTop;
//     const box1Top = boxs[1].offsetTop - container.offsetTop;
//     const box2Top = boxs[2].offsetTop - container.offsetTop;

//     if (scrollTop >= box0Top && scrollTop < box1Top) {
//         tabBtns.forEach(s => s.classList.remove('select'));
//         tabBtns[0].classList.add('select'); // WEB
//     } 
//     else if (scrollTop >= box1Top && scrollTop < box2Top) {
//         tabBtns.forEach(s => s.classList.remove('select'));
//         tabBtns[1].classList.add('select'); // SNS
//     } 
//     else if (scrollTop >= box2Top) {
//         tabBtns.forEach(s => s.classList.remove('select'));
//         tabBtns[2].classList.add('select'); // CHARACTER
//     }
// });