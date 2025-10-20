    AOS.init({
        duration: 1000,
        once: true,

    });
    window.scrollTo(0, 0); // 페이지 최상단으로 이동

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

    // header
    $(document).ready(function () {
    // header 스크롤시 디자인 변경
    $(window).on('scroll', function () {
        if ($(this).scrollTop()>0) {
            $('#header').addClass('active');
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
        if (currentScroll > lastScroll) {
            // 아래로 스크롤
            $('#header').removeClass('show');
            $('#header').addClass('hide');
        } else if(currentScroll < lastScroll){
            // 위로 스크롤
            $('#header').addClass('show');
            $('#header').removeClass('hide');
        }
        lastScroll = currentScroll;
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


    // shortcut img change
    const naverShortcutButton = document.querySelector(".naver-shortcut-button");
    const isaacShortcutButton = document.querySelector(".isaac-shortcut-button");

    naverShortcutButton.addEventListener('click',()=>{
        $('.issac-tit').removeClass('view');
        $('.naver-tit').addClass('view');
        $('.issac-shortcut').removeClass('view');
        $('.naver-shortcut').addClass('view');
    });
    isaacShortcutButton.addEventListener('click',()=>{
        $('.naver-tit').removeClass('view');
        $('.issac-tit').addClass('view');
        $('.naver-shortcut').removeClass('view');
        $('.issac-shortcut').addClass('view');
    });

   
    const container = document.querySelector('.box-inner');
    document.querySelectorAll('.tab-btn-container span').forEach(span => {
    span.addEventListener('click', () => {
        const targetId = span.dataset.target;
        const target = document.getElementById(targetId);

        // 탭 선택 효과
        document.querySelectorAll('.tab-btn-container span').forEach(s => s.classList.remove('select'));
        span.classList.add('select');

        // 내부 스크롤 이동
        container.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
        });
    });
    });
    