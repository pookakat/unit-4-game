let characterClass="neutral";

$(".selection").click(function(){
    whatAlignment();
    barMove();
    titleFade();
})

function whatAlignment(){
    if ($(event.currentTarget).hasClass("jedi")){
        document.body.style.backgroundImage = "url('assets/images/jedibkg.jpg')";
        characterClass="jedi";
    }
    else if($(event.currentTarget).hasClass("sith")){
        document.body.style.backgroundImage = "url('assets/images/sith.jpg')";
        document.body.style.backgroundSize = "initial";
        characterClass="sith";
    }
    $(".selection").removeClass("jedi sith");
    changeEnemies();
};

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
    $('.wordCard').fadeToggle(100);
    $('.nowFight').fadeToggle(100);
}

function changeEnemies(){
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