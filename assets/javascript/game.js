let characterClass="neutral";
let stat;

$("#characters").on('click',  '.selection', function(event){
    $('#characters').children().removeClass('selection');
    $('#characters').children().addClass('fighting');
    $('#fightWindow').fadeIn(300);
    $('#fightingAgainst').hide();
    var $hero = $(event.currentTarget);
    var fighterImg = $hero.children().attr('src');
    $("<img src='" + fighterImg + "' />").prependTo('#fightingAs');
    $('#fightingAs p').html($hero.find('p').html());
    $('#fightingAs').addClass('player');
    if ($hero.hasClass('jedi')){
        whatAlignment("jedi");
    }
    else{
        whatAlignment("sith");
    }
});


$("#characters").on('click', '.fighting', function(event){
    $('#characters').children().removeClass('fighting');
    $('#fightingAgainst').show();
    var $badguy = $(event.currentTarget);
    var fighterImg = $badguy.children().attr('src');
    $("<img src='" + fighterImg + "' />").prependTo('#fightingAgainst');
    $('#fightingAgainst p').html($badguy.children().find('p').html());
    if ($(event.currentTarget).hasClass('npc')) {
        $('#fightingAgainst').addClass('npc');
    }
    else if ($(event.currentTarget).hasClass('.boss')) {
        $('#fightingAgainst').addClass('boss');
    }
    else if ($(event.currentTarget).hasClass('.crunchy')) {
        $('#fightingAgainst').addClass('crunchy');
    }
});

function whatAlignment(align){
    $('#fightingAs .title').removeClass('orangewords');
    $('#fightingAgainst .title').removeClass('orangewords');
    $('#charInfo .vs').removeClass('orangewords');
    if (align === "jedi"){
        document.body.style.backgroundImage = "url('assets/images/jedibkg.jpg')";
        characterClass="jedi";
        $('#fightingAs .title').addClass('bluewords');
        $('#fightingAgainst .title').addClass('redwords');
        $('#charInfo .vs').addClass('bluewords');
        barMove();
        titleFade();
    }
    else {
        document.body.style.backgroundImage = "url('assets/images/sith.jpg')";
        characterClass="sith";
        $('#fightingAs .title').addClass('redwords');
        $('#fightingAs .title').addClass('bluewords');
        $('#charInfo .vs').addClass('redwords');
        barMove();
        titleFade();
    }
    $(".charCard").removeClass("jedi sith");
    changeEnemies();
};

function barMove(){
    $('#charBar').animate({
        left: "40px",
        top: "40px",
        margin: 0, 
    });

    fixFlex();
};

function fixFlex(){
    document.getElementById("characters").style.justifyContent = "flex-start";
    document.getElementById("characters").style.margin = "40px";
};

function titleFade(){
    $('.wordCard').fadeToggle(100);
    $('.nowFight').fadeToggle(100);
};

function changeEnemies(){
    if (characterClass==="jedi"){
        $('.nowFight').css({
            'color': '#0000ff',
            'borderColor': "#0000ff",
        });
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
        $('.nowFight').css({
            'color': '#ff0000',
            'borderColor': "#ff0000",
            'backgroundColor': '#000000',
        });
        $(".three").attr('src', 'assets/images/yoda.jpg');
        $(".charThree").text("Yoda");
        $(".four").attr('src', 'assets/images/ewoks.jpeg');
        $(".charFour").text("Ewoks");
    }
};

function statsMath(times){
    let stat = 0;
    for (i=1; i<=times; i++) {
        stat += rollDie(6);
    };
    return stat;
};

function rollDie(sides){
    return Math.ceil(Math.random()*sides);
};



playerStats={
    myHealth : 12 + statsMath(3),
    myAttack : 6 + statsMath(2),
    myCounter: 3 + statsMath(1),

};

npcStats={
    npcHealth : 12 + statsMath(3),
    npcAttack : 6 + statsMath(2),
    npcCounter: 3 + statsMath(1),
};

crunchyStats={
    crunchyHealth : 12 + statsMath(2),
    crunchyAttack : 6 + statsMath(1),
    crunchyCounter: 3 + statsMath(1),
};

bossStats={
    bossHealth : 12 + statsMath(4),
    bossAttack : 6 + statsMath(3),
    bossCounter: 3 + statsMath(2),
};

console.log(playerStats);
console.log(npcStats);
console.log(crunchyStats);
console.log(bossStats);