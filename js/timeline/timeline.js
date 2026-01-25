// GSAP and ScrollTrigger are already loaded globally
gsap.registerPlugin(ScrollTrigger);

function initTimeline() {
  var $scrollContainer = $(".scroll-container");
  var $items = $scrollContainer.find(".timeline-item");

  resizeLine();

  $items.each(function() {
    var $item = $(this);
    gsap.to($item[0], { // gsap needs the raw DOM element
      ease: "none",
      scrollTrigger: {
        trigger: $item[0],
        scroller: ".scroll-container",
        start: "bottom 100%", // bottom of container
        end: "top 0%",        // top of container
        scrub: true,
        immediateRender: false,
        // markers: true,
        onUpdate: function(self) {
          var progress = self.progress; // 0 → 1 over entire scroll
          var el = $item[0];

          if (progress < 0.4) {
            // Phase 1: fade in + scale up
            var p = progress / 0.4; // 0 → 1
            el.style.opacity = p;
            el.style.transform = `scale(${1 + 0.2 * p})`;
          } else if (progress >= 0.4 && progress <= 0.6) {
            // Phase 2: full opacity and scale
            el.style.opacity = 1;
            el.style.transform = `scale(1.2)`;
          } else {
            // Phase 3: fade out + shrink
            var p = (progress - 0.6) / 0.4; // 0 → 1
            el.style.opacity = 1 - p;
            el.style.transform = `scale(${1.2 - 0.4 * p})`; // shrink to 0.8
          }
        }
      }
    });
  });

  ScrollTrigger.refresh();
}

function resizeLine() {

  $('.timeline-line').css({ 
    height: '0px' 
  });

  var $scrollContainer = $(".scroll-container");
  var $items = $scrollContainer.find(".timeline-item");

  $('.timeline-line').css({ 
    height: $scrollContainer[0].scrollHeight + 'px' 
  });
}

// Wait until body is visible
function waitForBodyVisible() {
  if (getComputedStyle(document.body).display !== "none") {
    requestAnimationFrame(initTimeline);
  } else {
    setTimeout(waitForBodyVisible, 50);
  }
  
}

$(window).on('resize', resizeLine)

waitForBodyVisible();
