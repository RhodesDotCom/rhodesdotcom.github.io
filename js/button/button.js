$(function () {
  animateButton();  
});

export function animateButton() {
  $(".btn-flower").each(function () {
  
    const $btn = $(this);
    const flowers = $btn.find(".flower").toArray();
  
    if (!flowers.length) {
      return;
    }

    const existingTl = $btn.data("flowerTimeline");
    if (existingTl) {
      existingTl.kill();
      $btn.off("mouseenter mouseleave");
    }
  
    const tl = gsap.timeline({ paused: true });
  
    tl.fromTo(flowers, {
      scale: 0,
      opacity: 0,
      y: 6,
      rotation: -10
    }, {
      scale: 0.12,
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 0.45,
      stagger: {
        each: 0.05,
        from: "random"
      },
      ease: "back.out(1.8)"
    });

    $btn.data("flowerTimeline", tl);
  
    $btn.on("mouseenter", () => tl.play());
    $btn.on("mouseleave", () => tl.reverse());
  
  });
}
