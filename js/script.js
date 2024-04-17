var spinner = function () {
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);
};
spinner();
let calculateAngle = function (e, item, parent) {
    let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
    if (parent.getAttribute("data-filter-color") !== null) {
        dropShadowColor = parent.getAttribute("data-filter-color");
    }

    parent.classList.add("animated");
    // Get the x position of the users mouse, relative to the button itself
    let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
    // Get the y position relative to the button
    let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

    // Calculate half the width and height
    let halfWidth = item.getBoundingClientRect().width / 2;
    let halfHeight = item.getBoundingClientRect().height / 2;

    // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
    // Changing these numbers will change the depth of the effect.
    let calcAngleX = (x - halfWidth) / 6;
    let calcAngleY = (y - halfHeight) / 14;

    let gX = (1 - x / (halfWidth * 2)) * 100;
    let gY = (1 - y / (halfHeight * 2)) * 100;

    item.querySelector(
        ".glare"
    ).style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgb(199 198 243), transparent)`;
    // And set its container's perspective.
    parent.style.perspective = `${halfWidth * 6}px`;
    item.style.perspective = `${halfWidth * 6}px`;

    // Set the items transform CSS property
    item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
    parent.querySelector(
        ".inner-card-backface"
    ).style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04) translateZ(-4px)`;

    if (parent.getAttribute("data-custom-perspective") !== null) {
        parent.style.perspective = `${parent.getAttribute(
            "data-custom-perspective"
        )}`;
    }

    // Reapply this to the shadow, with different dividers
    let calcShadowX = (x - halfWidth) / 3;
    let calcShadowY = (y - halfHeight) / 6;

    // Add a filter shadow - this is more performant to animate than a regular box shadow.
    item.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`;
};



const card = document.querySelector(".card");
const flip = document.querySelector(".flip");
const unflip = document.querySelector(".unflip");

const innerCard = document.querySelector(".inner-card");

flip.addEventListener("click", () => {
    card.classList.add("flipped");
});

unflip.addEventListener("click", () => {
    card.classList.remove("flipped");
});

card.addEventListener("mouseenter", (e) => {
    calculateAngle(e, innerCard, card);
});

card.addEventListener("mousemove", (e) => {
    calculateAngle(e, innerCard, card);
});

// mouse leave
card.addEventListener("mouseleave", (e) => {
    let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
    if (card.getAttribute("data-filter-color") !== null) {
        dropShadowColor = card.getAttribute("data-filter-color");
    }
    card.classList.remove("animated");
    innerCard.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    card.querySelector(
        ".inner-card-backface"
    ).style.transform = `rotateY(0deg) rotateX(0deg) scale(1.01) translateZ(-4px)`;
    innerCard.style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
});

/* ########################################### hero parallax ############################################## */
window.onload = function () {

    var parallaxBox = document.getElementById('parallax');
    var
        /* c1left = document.getElementById('l1').offsetLeft,
                   c1top = document.getElementById('l1').offsetTop, */
        c2left = document.getElementById('l2').offsetLeft,
        c2top = document.getElementById('l2').offsetTop,
        c3left = document.getElementById('l3').offsetLeft,
        c3top = document.getElementById('l3').offsetTop,
        c4left = document.getElementById('l4').offsetLeft,
        c4top = document.getElementById('l4').offsetTop,
        c5left = document.getElementById('l5').offsetLeft,
        c5top = document.getElementById('l5').offsetTop,
        c6left = document.getElementById('l6').offsetLeft,
        c6top = document.getElementById('l6').offsetTop,
        c7left = document.getElementById('l7').offsetLeft,
        c7top = document.getElementById('l7').offsetTop,
        c8left = document.getElementById('l8').offsetLeft,
        c8top = document.getElementById('l8').offsetTop,
        c9left = document.getElementById('l9').offsetLeft,
        c9top = document.getElementById('l9').offsetTop;

    parallaxBox.onmousemove = function (event) {
        event = event || window.event;
        var x = event.clientX - parallaxBox.offsetLeft,
            y = event.clientY - parallaxBox.offsetTop;

        /*  mouseParallax('l1', c1left, c1top, x, y, 5); */
        mouseParallax('l2', c2left, c2top, x, y, 25);
        mouseParallax('l3', c3left, c3top, x, y, 20);
        mouseParallax('l4', c4left, c4top, x, y, 35);
        mouseParallax('l5', c5left, c5top, x, y, 30);
        mouseParallax('l6', c6left, c6top, x, y, 45);
        mouseParallax('l7', c7left, c7top, x, y, 30);
        mouseParallax('l8', c8left, c8top, x, y, 25);
        mouseParallax('l9', c9left, c9top, x, y, 40);
    };

};

function mouseParallax(id, left, top, mouseX, mouseY, speed) {
    var obj = document.getElementById(id);
    var parentObj = obj.parentNode,
        containerWidth = parseInt(parentObj.offsetWidth),
        containerHeight = parseInt(parentObj.offsetHeight);
    obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
    obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
}
/* ########################################### /hero parallax ############################################## */
const goTopBtn = document.querySelector('.go-top-btn');

window.addEventListener('scroll', checkHeight)

function checkHeight(){
    if(window.scrollY >= 200) {
        goTopBtn.style.display = "flex"
    } else {
        goTopBtn.style.display = "none"
    }
}
// Show the button when the page is refreshed and the user is at the bottom of the page.
// window.addEventListener("load", function() {
window.addEventListener("load", () =>{
    if (window.scrollY > 0) {
        // goTopBtn.classList.add("show-btn");
        goTopBtn.style.display = "flex"
    }
});

goTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

const copyrightYearElement = document.getElementById('copyright-year');
copyrightYearElement.textContent = new Date().getUTCFullYear();


    // ........................................................................

