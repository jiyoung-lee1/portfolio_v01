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

// 아래서 위로 서서히 드러나는 fade 효과
// document.addEventListener("DOMContentLoaded", () => {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('visible');
//                 // 한번 보이면 관찰 해제 (한 번만 애니메이션 줄 경우)
//                 observer.unobserve(entry.target);
//             }
//             else {
//                 entry.target.classList.remove('visible');
//             }
//         });
//     }, {
//         threshold: 0.6 // 요소가 60% 보이면 동작
//     });

//     // 모든 .showUp 요소에 대해 observer 연결
//     document.querySelectorAll('.showUp').forEach(el => observer.observe(el));
// });

// slick
$(document).ready(function () {

    $('.autoplay').slick({
        centerMode: true,          // 중앙 정렬 모드 활성화
        centerPadding: '60px',     // 양옆 여백
        slidesToShow: 3,           // 한 화면에 3개
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
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

    // header 스크롤시 디자인 변경
    $(window).on('scroll', function () {
        if ($(window).scrollTop()) {
            $('#header').addClass('active');
        } else {
            $('#header').removeClass('active');
        }
    });
});
// header scroll반응

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
        // 아래로 스크롤
        $('#header').removeClass('show');
        $('#header').addClass('hide');
        // header.classList.remove('show');
        // header.classList.add('hide');

    } else {
        // 위로 스크롤
        $('#header').addClass('show');
        $('#header').removeClass('hide');
        // header.classList.add('show');
        // header.classList.remove('hide');
    }
    lastScroll = currentScroll;
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
