let characterClass="neutral";
let stat;
let foeStats={};
let badguy;

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
    let $badguy = $(event.currentTarget);
    var fighterImg = $badguy.children().attr('src');
    var fighterTitle = $badguy.children().text();
    $("<img src='" + fighterImg + "' />").prependTo('#fightingAgainst');
    $('#fightingAgainst p').html(fighterTitle);
    if ($badguy.hasClass('npc')) {
        $('#fightingAgainst').addClass('npc');
    }
    else if ($badguy.hasClass('boss')) {
        $('#fightingAgainst').addClass('boss');
    }
    else if ($badguy.hasClass('crunchy')) {
        $('#fightingAgainst').addClass('crunchy');
    }
    $('#lastThree').show();
    badguyStats($('#fightingAgainst'));
    badguy=$badguy;
});

function badguyStats($selectedFoe){
    if ($selectedFoe.hasClass('crunchy')){
        foeStats = crunchyStats;
        foeStats.foeHealth=foeStats.crunchyHealth;
        foeStats.foeAttack=foeStats.crunchyAttack;
        foeStats.foeCounter=foeStats.crunchyCounter;
        delete foeStats.crunchyCounter;
        delete foeStats.crunchyAttack;
        delete foeStats.crunchyHealth;
    }
    else if ($selectedFoe.hasClass('npc')){
        foeStats = npcStats;
        foeStats.foeHealth=foeStats.npcHealth;
        foeStats.foeAttack=foeStats.npcAttack;
        foeStats.foeCounter=foeStats.npcCounter;
        delete foeStats.npcCounter;
        delete foeStats.npcAttack;
        delete foeStats.npcHealth;
        npcStats={
            npcHealth : 12 + statsMath(3),
            npcAttack : 6 + statsMath(2),
            npcCounter: 3 + statsMath(1),
        };
    }
    else if ($selectedFoe.hasClass('boss')){
        foeStats = bossStats;
        foeStats.foeHealth=foeStats.bossHealth;
        foeStats.foeAttack=foeStats.bossAttack;
        foeStats.foeCounter=foeStats.bossCounter;
        delete foeStats.bossCounter;
        delete foeStats.bossAttack;
        delete foeStats.bossHealth;
    }
    return foeStats;
};

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
        $('#fightingAgainst .title').addClass('bluewords');
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


$("#attack").on('click', function(event){
    if (foeStats.foeHealth > 0){
        var myAction=action(playerStats.myAttack);
        var actionStrength=strength(myAction);
        $('#action').append('<p> You attack ' + actionStrength + '</p>');
        var foeAction=action(foeStats.foeCounter);
        var foeActionStrength=strength(foeAction);
        $('#action').append('<p> The enemy tries to block' + actionStrength + '</p>');
        if (actionStrength > foeActionStrength){
            foeStats.foeHealth--;
            $('#action').append('<p> The enemy is wounded! </p>');
        }
        else{
            $('#action').append('<p> The enemy blocked you! </p>');
        }
        var foeAction=action(foeStats.foeAttack);
        var foeActionStrength=strength(foeAction);
        $('#action').append('<p> The foe attacks ' + actionStrength + '</p>');
        var myAction=action(playerStats.myCounter);
        var actionStrength=strength(myAction);
        $('#action').append('<p> You try to block ' + actionStrength + '</p>');
        if (actionStrength < foeActionStrength){
            playerStats.myHealth--;
            $('#action').append('<p> The enemy wounds you! </p>');
        }
        else{
            $('#action').append('<p> You blocked the enemy! </p>');
        }
    }
    else{
        $('#action').text('Your enemy is dead. Pick another!');

    }
    healthCheck();
    $('#characters').children().addClass('fighting');
    badguy.css({
        'opacity': 0.2,
    });
    console.log(badguy);
});

function action(actionStat){
    return rollDie(actionStat);
};

function strength(actionResult){
    if (actionResult < 3){
        return ('pathetically');
    }
    else if (actionResult > 3 && actionResult < 5){
        return ('weakly');
    }
    else if (actionResult > 5 && actionResult < 7){
        return ('with adequate strength');
    }
    else {
        return ('powerfully');
    }
};

function healthCheck(health){
    if (health === 0){
        winOrLose('lose');
    }
};

function winOrLose(endGame){
    $('.nowFight').hide();
    $('#winOrLose').show();
    if (endGame === 'loss'){
        $('#winOrLose').addClass('loss');
        $('#winOrLose').text('You lose!');
    }
    else if (endGame === 'win'){
        $('#winOrLose').addClass('win');
        $('#winOrLose').text('You win!');
    }
    colorWords(characterClass);
}

function colorWords(force){
    if (force === 'jedi'){
        $('.win').addClass('bluewords');
        $('.loss').addClass('redwords');
    }
    else{
        $('.loss').addClass('bluewords');
        $('.win').addClass('redwords');
    }
}

console.log(playerStats);
console.log(npcStats);
console.log(crunchyStats);
console.log(bossStats);