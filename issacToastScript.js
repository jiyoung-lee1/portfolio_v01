// AOS 초기설정문
AOS.init();

// header 메뉴 스크롤 움직임에 따른 slide효과
$(document).ready(function () {
    $("#gnb ul li").hover(
        function () {
            $("#gnb ul li dl").stop().slideDown(300);
            $("#gnb_bg").css("opacity", "1");
            $("#gnb_bg").stop().slideDown(300);
        },
        function () {
            $("#gnb ul li dl").stop().slideUp(300);
            $("#gnb_bg").stop().slideUp(300);
        }
    );
});

function moreBtn(catcode) {
    $('.chglink').attr("href", "/menu/menu.php?ptype=list&catcode=" + catcode);
}

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
        // 아래로 스크롤
        header.classList.remove('show');
        header.classList.add('hide');

    } else {
        // 위로 스크롤
        header.classList.add('show');
        header.classList.remove('hide');
    }
    lastScroll = currentScroll;
});

// $(window).on('load', function(){
//     $('.visual_in').slick({
//                     dots: true,        // 작은 동그라미 네비게이션
//                     // arrow: true,      // 좌우 화살표
//                     // autoplay: true,    // 자동 재생
//                     // autoplaySpeed: 1000 // 3초마다 넘어감
//                     speed: 900,          // 전환 속도 (ms)
//                     fade: true,          // ← 페이드 효과 켜기
//                     cssEase: 'ease-in-out'    // 애니메이션 easing
//                 });

//                 $('.menu_roll').slick({
//                     // dots:true,        // 작은 동그라미 네비게이션
//                     arrows: true,      // 좌우 화살표
//                     slidesToShow: 4,   // 한 화면에 보이는 카드 수
//                     slidesToScroll: 1, // 한 번에 스크롤되는 카드 수
//                     autoplay: true,    // 자동 재생
//                     autoplaySpeed: 3000, // 3초마다 넘어감
//                     speed: 1000,          // 전환 속도 (ms)
//                     // fade: true,          // ← 페이드 효과 켜기
//                     cssEase: 'ease-in-out'    // 애니메이션 easing
//                 });
//                 $('.news_roll').slick({
//                     arrows: true,      // 좌우 화살표
//                     slidesToShow: 3,   // 한 화면에 보이는 카드 수
//                     slidesToScroll: 1, // 한 번에 스크롤되는 카드 수
//                     autoplay: true,    // 자동 재생
//                     autoplaySpeed: 3000, // 3초마다 넘어감
//                     speed: 1000,          // 전환 속도 (ms)
//                     // fade: true,          // ← 페이드 효과 켜기
//                     cssEase: 'ease-in-out'    // 애니메이션 easing
//                 });
// });

$(window).on('load', function(){
    $('.visual_in').on('init', function(){
        AOS.refresh(); // slick 세팅된 후 AOS 다시 계산
    }).slick({
        dots: true,
        speed: 900,
        fade: true,
        cssEase: 'ease-in-out'
    });

    $('.menu_roll').on('init', function(){
        AOS.refresh();
    }).slick({
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        cssEase: 'ease-in-out',
         responsive: [
        {
            breakpoint: 1280, // 1280px 이하일 때
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]
    });

    $('.news_roll').on('init', function(){
        AOS.refresh();
    }).slick({
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        cssEase: 'ease-in-out'
    });
});