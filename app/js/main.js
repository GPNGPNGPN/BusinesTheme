(function () {
    'use strict';
    let header = document.querySelector('.header');
    let modalIsActive = false;
    let navbarIsReduced;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset;
        if (scrollTop >= 50) {
            header.classList.add('reduced');
            navbarIsReduced = true;
        } else {
            header.classList.remove('reduced');
            navbarIsReduced = false
        }
    });

    let modalAction = function () {
        let modal = document.querySelector('.modal');
        modal.classList.toggle('active');
        burger.classList.toggle('nav__burger--active');
        header.classList.remove('reduced')
        modalIsActive = !modalIsActive;
        if ((navbarIsReduced) && (!modalIsActive)) {
            header.classList.add('reduced');
        }
    };

    let burger = document.querySelector('.nav__burger');
    let modalCloseArea = document.querySelector('.modal__close-area');
    let modalItems = document.querySelectorAll('.modal-nav__item');
    for (let modalItem of modalItems) {
        modalItem.onclick = modalAction;
    }
    burger.onclick = modalAction;
    modalCloseArea.onclick = modalAction;




    // **********************SCROLLSPY******************

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    function scrollToY(scrollTargetY, speed, easing) {
        var scrollY = window.scrollY || document.documentElement.scrollTop, currentTime = 0; scrollTargetY = scrollTargetY || 0;
        speed = speed || 2000;
        easing = easing || 'easeOutSine';
        var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
        var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            }, easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            }, easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) { return 0.5 * Math.pow(pos, 5); }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };
        function tick() {
            currentTime += 1 / 60;
            var p = currentTime / time;
            var t = easingEquations[easing](p);
            if (p < 1) {
                requestAnimFrame(tick);
                window.scrollTo(0, scrollY + 10 + ((scrollTargetY - scrollY) * t));
            } else {
                window.scrollTo(0, scrollTargetY + 2);
            }
        }
        tick();
    }

    function menuControl(menu) {
        var scrollPos = window.scrollY;
        var links = menu.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < links.length; i++) {
            var currLink = links[i];
            var refElement = document.querySelector(currLink.getAttribute('href'));
            if (refElement.offsetTop <= scrollPos && refElement.offsetTop + refElement.clientHeight > scrollPos) {
                currLink.classList.add('active');
            } else {
                currLink.classList.remove('active');
            }
        }
    }
    function animated(menu, speed, easing) {
        var i, links = menu.querySelectorAll('a[href^="#"]');
        function control(e) {
            e.preventDefault();
            var target = document.querySelector(this.hash);
            scrollToY(target.offsetTop, speed, easing);
        }
        for (i = 0; i < links.length; i++) { var link = links[i]; link.addEventListener('click', control); }
    }
    function scrollSpy(menu, speed, easing) {
        animated(menu, speed, easing);
        document.addEventListener('scroll', function () {
            menuControl(menu);
        });
    }

    // **********************SCROLLSPY******************


    let headermenu = document.querySelector('.header-nav__list');
    let footerMenu = document.querySelector('.footer-nav__list');
    let modalMenu = document.querySelector('.modal-nav__list');

    scrollSpy(headermenu, 1000, 'easeInOutSine')
    scrollSpy(footerMenu, 1000, 'easeInOutSine')
    scrollSpy(modalMenu, 1000, 'easeInOutSine')

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    document.addEventListener('DOMContentLoaded', () => {
        const slider = ItcSlider.getOrCreateInstance('.itc-slider');
    });

    new WOW().init();

    let bannerForm = document.querySelector('.banner-form');
    let newsletterForm = document.querySelector('.newsletter-form');
    bannerForm.addEventListener('submit', formSend);
    newsletterForm.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let formData = new FormData(this);
        let response = await fetch('php/sendMail.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            let inputs = this.querySelectorAll('input');
            for (let input of inputs) {
                input.disabled = true;
            }
            let submit = this.querySelector('input[type="submit"')
            submit.style.color = 'rgba(0, 0, 0, 0)';
            setTimeout(() => submit.value = 'comlpete', 150);
            setTimeout(() => submit.style.removeProperty("color"), 150);

        }
        else {
            alert('Ошибка, повторите отправку \n(На самом деле можете не повторять, данный хостинг не поддерживает PHP, поэтому, хоть весь код для рассылки и готов, писем не будет. И да, именно из-за этого в консоли так много ошибок)');
        }
    }
})();

