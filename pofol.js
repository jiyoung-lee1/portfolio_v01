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

        // 아래서 위로 서서히 드러나는 효과
        document.addEventListener("DOMContentLoaded", () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // 한번 보이면 관찰 해제 (한 번만 애니메이션 줄 경우)
                        observer.unobserve(entry.target);
                    }
                    else {
                        entry.target.classList.remove('visible');
                    }
                });
            }, {
                threshold: 0.6 // 요소가 60% 보이면 동작
            });

            // 모든 .showUp 요소에 대해 observer 연결
            document.querySelectorAll('.showUp').forEach(el => observer.observe(el));
        });