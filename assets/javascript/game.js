let characterClass="neutral";

$(".jedi").click(function(){
    barMove();
    titleFade();
    document.body.style.backgroundImage = "url('assets/images/jedibkg.jpg')";
    characterClass="jedi";
    changeEnemies();
});

$(".sith").click(function(){
    barMove();
    titleFade();
    document.body.style.backgroundImage = "url('assets/images/sith.jpg')";
    $("body").css({
        "max-width" : "100%",
        "max-height": "100%",
        "background-size": "default",
    });
    characterClass="sith";
    changeEnemies();
});

function barMove(){
    $('#charBar').animate({
        left: "40px",
        top: "40px",
        margin: 0, 
    });

    fixFlex();
}

function fixFlex(){
    document.getElementById("characters").style.justifyContent = "flex-start";
    document.getElementById("characters").style.margin = "40px";
}

function titleFade(){
    $('.wordCard').animate({
        opacity: 0,
    });
    $('#titlePage').animate({
        height: "1px",
        margin: "1px",
    });
}

function changeEnemies(){
    console.log(characterClass);
    if (characterClass==="jedi"){
        $(".one").attr('src', 'assets/images/vader.jpg');
        $(".charOne").text("Darth Vader");
        $(".two").attr('src', 'assets/images/maul.jpg');
        $(".charTwo").text("Darth Maul");
        $(".three").attr('src', 'assets/images/emperor.jpg');
        $(".charThree").text("The Emperor");
        $(".four").attr('src', 'assets/images/storm-troopers.jpg');
        $(".charFour").text("Storm Troopers");
    }
    else {
        $(".three").attr('src', 'assets/images/yoda.jpg');
        $(".charThree").text("Yoda");
        $(".four").attr('src', 'assets/images/ewoks.jpeg');
        $(".charFour").text("Ewoks");
    }
}