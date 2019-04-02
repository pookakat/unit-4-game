$(".jedi").click(function(){
    alert("I'm a Jedi! But I don't shout. That's not the Jedi way.");
    barMove();
    titleFade();
});

$(".sith").click(function(){
    alert("I'm a Sith! RAWR!");
    barMove();
    titleFade();
});

function barMove(){
    $('#charBar').animate({
        left: "40px",
        top: "40px",
        margin: 0, 
    })
    $('#characters').animate({
        "justify-content": "left",
    })
}

function titleFade(){
    $('.wordCard').animate({
        opacity: 0,
    })
}