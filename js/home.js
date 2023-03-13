const navBar = document.querySelector(".navBar");
const theBody = document.querySelector("body");
const screenWidth = window.outerWidth;
const opener = document.querySelector(".opener");

var number = 0;

function doIt() {
    if (number % 2 === 0) {
        navBar.style.left = "0%";
        number += 1;
        theBody.style.overflow = "hidden";
    } else if (number % 2 === 1){
        navBar.style.left = "-100%";
        number += 1;
        theBody.style.overflow = "initial";
    } 
};

opener.addEventListener('click', doIt);


    $(window).click(function() {
        if (number % 2 === 1){
          navBar.style.left = "-100%";
          number += 1;
        }
    });
    $(navBar).click(function(event){
        event.stopPropagation();
        navBar.style.overflow = "auto";
    });
    $(opener).click(function(event){
        event.stopPropagation();
        if (number % 2 === 1) {
            opener.style.rotate = "-90deg";
            $(window).click(function() {
                opener.style.rotate = "0deg";
                theBody.style.overflow = "initial";
            });
        } else if (number % 2 === 0){
            opener.style.rotate = "0deg";
        } 
    });

