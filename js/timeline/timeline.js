// GSAP and ScrollTrigger are already loaded globally
gsap.registerPlugin(ScrollTrigger);

function initTimeline() {
  const scrollContainer = document.querySelector(".scroll-container");
  const items = scrollContainer.querySelectorAll(".timeline-item");

  items.forEach(item => {
    gsap.to(item, {
      ease: "none",
      scrollTrigger: {
        trigger: item,
        scroller: ".scroll-container",
        start: "bottom 100%", // bottom of container
        end: "top 0%",        // top of container
        scrub: true,
        immediateRender: false,
        // markers: true,
        onUpdate: self => {
          const progress = self.progress; // 0 → 1 over entire scroll
          if (progress < 0.4) {
            // Phase 1: fade in + scale up
            const p = progress / 0.4;       // 0 → 1
            item.style.opacity = p;
            item.style.transform = `scale(${1 + 0.2 * p})`;
          } else if (progress >= 0.4 && progress <= 0.6) {
            // Phase 2: full opacity and scale
            item.style.opacity = 1;
            item.style.transform = `scale(1.2)`;
          } else {
            // Phase 3: fade out + shrink
            const p = (progress - 0.6) / 0.4; // 0 → 1
            item.style.opacity = 1 - p;
            item.style.transform = `scale(${1.2 - 0.4 * p})`; // shrink to 0.8
          }
        }
      }
    });
  });

  ScrollTrigger.refresh();
}

// Wait until body is visible
function waitForBodyVisible() {
  if (getComputedStyle(document.body).display !== "none") {
    requestAnimationFrame(initTimeline);
  } else {
    setTimeout(waitForBodyVisible, 50);
  }
}

waitForBodyVisible();
