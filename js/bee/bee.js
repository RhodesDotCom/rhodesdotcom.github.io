$(document).ready(() => {

    let mouseX = 0, mouseY = 0;
    let imgX = 0, imgY = 0;
    const speed = 0.005;

    // trailEnabled is only true if localStorage allows it AND window is wider than 578
    let trailEnabled = localStorage.getItem('cursorTrailEnabled') === 'true' && $(window).width() > 578;
    let animating = false;

    let wobbleOffset = Math.random() * Math.PI * 2;
    const wobbleSpeed = 0.15;
    const wobbleAmount = 1;
    let prevX = imgX;

    // track mouse
    $(document).on('mousemove.bee', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // animation loop
    function animate() {
        if (!trailEnabled) {
            animating = false;
            return;
        }

        animating = true;

        imgX += (mouseX - imgX) * speed;
        imgY += (mouseY - imgY) * speed;

        wobbleOffset += wobbleSpeed;

        const direction = imgX >= prevX ? 1 : -1; // 1 = right, -1 = left
        prevX = imgX;

        $('#bee').css({
            left: imgX,
            top: imgY + Math.sin(wobbleOffset) * wobbleAmount,
            transform: `translate(-50%, -50%) scaleX(${direction})`
        });
        $('#bee').show();

        requestAnimationFrame(animate);
    }

    // position bee at button
    function positionBeeAtButton() {
        const $btn = $('#beeButton');
        const position = $btn.position();
        if (!position) return;

        const direction = imgX >= position.left ? 1 : -1;

        imgX = position.left + ($btn.outerWidth() / 2);
        imgY = position.top + ($btn.outerHeight() / 2);

        mouseX = imgX;
        mouseY = imgY;

        $('#bee').css({
            left: imgX,
            top: imgY,
            transform: `translate(-50%, -50%) scaleX(${direction})`
        });
    }

    // wait until body is visible before positioning the bee
    function runBee() {
        if (!trailEnabled) {
            $('#bee').hide();
            return;
        }

        const style = window.getComputedStyle(document.body);
        if (style.display !== 'none') {
            positionBeeAtButton();
            animate();
        } else {
            const observer = new MutationObserver(() => {
                const style = window.getComputedStyle(document.body);
                if (style.display !== 'none') {
                    observer.disconnect();
                    positionBeeAtButton();
                    animate();
                }
            });
            observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
        }
    }

    // button toggle (delegated)
    $(document).on('click', '#beeButton', function () {
        trailEnabled = !trailEnabled && $(window).width() > 578;
        localStorage.setItem('cursorTrailEnabled', trailEnabled);

        if (trailEnabled) {
            positionBeeAtButton();
            $('#bee').show();
            if (!animating) animate();
        } else {
            $('#bee').hide();
        }
    });

    // initial state on page load
    runBee();

    // handle window resize
    $(window).on('resize', function () {
        if ($(window).width() <= 578) {
            $('#bee').hide();
            trailEnabled = false;
        } else {
            // only enable trail if user has it enabled in localStorage
            trailEnabled = localStorage.getItem('cursorTrailEnabled') === 'true';
            if (trailEnabled) positionBeeAtButton();
        }
    });

});
