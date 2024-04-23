(function () {
    function VerticalTimeline(element) {
        this.element = element;
        this.blocks = this.element.getElementsByClassName("cd-timeline__block");
        this.images = this.element.getElementsByClassName("cd-timeline__img");
        this.contents = this.element.getElementsByClassName("cd-timeline__content");
        this.offset = 0.6;
        this.hideBlocks();
    };

    VerticalTimeline.prototype.hideBlocks = function () {
        if (!"classList" in document.documentElement) {
            return;
        }

        var self = this;
        for (var i = 0; i < this.blocks.length; i++) {
            (function (i) {
                if (self.blocks[i].getBoundingClientRect().top > window.innerHeight * self.offset) {
                    self.images[i].classList.add("cd-timeline__img--hidden");
                    self.contents[i].classList.add("cd-timeline__content--hidden");
                }
            })(i);
        }
    };

    VerticalTimeline.prototype.showBlocks = function () {
        if (! "classList" in document.documentElement) {
            return;
        }
        var self = this;
        for (var i = 0; i < this.blocks.length; i++) {
            (function (i) {
                if (self.contents[i].classList.contains("cd-timeline__content--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
                    self.images[i].classList.add("cd-timeline__img--bounce-in");
                    self.contents[i].classList.add("cd-timeline__content--bounce-in");
                    self.images[i].classList.remove("cd-timeline__img--hidden");
                    self.contents[i].classList.remove("cd-timeline__content--hidden");
                }
            })(i);
        }
    };

    var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
        verticalTimelinesArray = [],
        scrolling = false;
    if (verticalTimelines.length > 0) {
        for (var i = 0; i < verticalTimelines.length; i++) {
            (function (i) {
                verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
            })(i);
        }

        window.addEventListener("scroll", function (event) {
            if (!scrolling) {
                scrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
            }
        });
    }

    function checkTimelineScroll() {
        verticalTimelinesArray.forEach(function (timeline) {
            timeline.showBlocks();
        });
        scrolling = false;
    };
})();



const objects = document.querySelectorAll('.scroll-in');

const cb = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('displayed');
            observer.unobserve(entry.target);
        }
    });
}

const options = {
    root: null,
    rootMargin: "-50px",
    threshold: 0.3
}

const io = new IntersectionObserver(cb, options);

objects.forEach(object => {
    io.observe(object);
});


$(function () {
    $('.btn-gNav').on("click", function () {
        $('.gNav').toggleClass('open');
        $('.btn-gNav').toggleClass('open');
    });

    $('.gNav-menu a').on("click", function () {
        $('.gNav').removeClass('open');
        $('.btn-gNav').removeClass('open');
    });
});

window.addEventListener('scroll', function () {
    var hamburgerSpans = document.querySelectorAll('.hamburger .btn-gNav span');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        hamburgerSpans.forEach(function (span) {
            span.style.backgroundColor = '#B78D45';
        });
    } else {
        hamburgerSpans.forEach(function (span) {
            span.style.backgroundColor = '#fff';
        });
    }
});


// 画像切り替え
function showImage(index, containerId) {
    const imageContainer = document.getElementById(`image-container${containerId}`);
    const buttonContainer = document.getElementById(`button-container${containerId}`);

    const images = imageContainer.querySelectorAll('.image');
    images.forEach((image, i) => {
        if (i === index - 1) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    });

    const buttons = buttonContainer.querySelectorAll('.round-button');
    buttons.forEach((button, i) => {
        if (i === index - 1) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}


// スワイプ
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd(event, containerId) {
    const distance = touchEndX - touchStartX;
    const threshold = 50;

    if (Math.abs(distance) >= threshold) {
        if (distance > 0) {
            showPreviousImage(containerId);
        } else {
            showNextImage(containerId);
        }
    }
}

function showNextImage(containerId) {
    const currentImageIndex = getCurrentImageIndex(containerId);
    const images = document.getElementById(`image-container${containerId}`).querySelectorAll('.image');
    const nextIndex = (currentImageIndex + 1) % images.length;
    showImage(nextIndex + 1, containerId);
}

function showPreviousImage(containerId) {
    const currentImageIndex = getCurrentImageIndex(containerId);
    const images = document.getElementById(`image-container${containerId}`).querySelectorAll('.image');
    const previousIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(previousIndex + 1, containerId);
}

function getCurrentImageIndex(containerId) {
    const imageContainer = document.getElementById(`image-container${containerId}`);
    const images = imageContainer.querySelectorAll('.image');
    let currentIndex = 0;
    images.forEach((image, index) => {
        if (image.classList.contains('active')) {
            currentIndex = index;
        }
    });
    return currentIndex;
}

// // アンダーバー
// document.addEventListener('scroll', function () {
//     var scrollPosition = window.scrollY;
//     var windowHeight = window.innerHeight;
//     var documentHeight = document.documentElement.scrollHeight;
//     var maxScroll = documentHeight - windowHeight;
//     var scrollPercentage = (scrollPosition / maxScroll) * 100;
//     document.querySelector('.line-u').style.width = scrollPercentage + '%';
// });



// shape
const shape = document.querySelector(".shape");
let angle = 0;
let animationRunning = false;
let animationScheduled = false;

function drawCircle() {
    if (angle <= 360 && animationRunning) {
        angle += 1;
        shape.style.backgroundImage = `conic-gradient(#FFD5DF 0deg, #FFD5DF ${angle}deg, white ${angle}deg)`;
        requestAnimationFrame(drawCircle);
    } else {
        animationRunning = false;
    }
}
// window.addEventListener("scroll", function () {
//     const campaignTitle = document.querySelector('.btn-pink');
//     if (campaignTitle.classList.contains('displayed') && !animationScheduled) {
//         animationScheduled = true;
//         setTimeout(function () {
//             animationRunning = true;
//             requestAnimationFrame(drawCircle);
//         }, 1000);
//     }
// });
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        animationRunning = false;
    } else {
        animationRunning = true;
        requestAnimationFrame(drawCircle);
    }
});




// shape2
const shape2 = document.querySelector(".shape2");
let angle2 = 180;
let animationRunning2 = false;
let animationScheduled2 = false;

function drawCircle2() {
    if (angle2 <= 360) {
        angle2 += 1;
        shape2.style.backgroundImage = `conic-gradient(#B2DAD7 0deg, #B2DAD7 ${angle2}deg, white ${angle2}deg)`;
        requestAnimationFrame(drawCircle2);
    } else {
        animationRunning2 = false;
    }
}

// window.addEventListener("scroll", function () {

//     const campaignTitle = document.querySelector('.btn-pink');
//     if (campaignTitle.classList.contains('displayed') && !animationScheduled2) {
//         animationScheduled2 = true;
//         setTimeout(function () {
//             animationRunning2 = true;
//             requestAnimationFrame(drawCircle2);
//         }, 1000);
//     }
// });

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        animationRunning2 = false;
    } else {
        animationRunning2 = true;
        requestAnimationFrame(drawCircle2);
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cd-bounce-2-active'); // フェードインアニメーションのクラスを追加
        }
      });
    }, {
      threshold: 0.1 // 10%の要素が見えたらトリガー
    });
  
    // .tab_content_inner 要素を監視対象に追加
    document.querySelectorAll('.tab_content_inner').forEach((el) => {
      observer.observe(el);
    });
  });
