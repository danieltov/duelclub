/*

TODOs:

  * Add visuals to denote power
  * Store evil messages in an object to make code more readable.


*/

/* Character Objects */
let duelists = [];

/* Game Object */
let go = {
  /* Bindings */
  player: undefined,
  opponent: undefined,
  playerChosen: false,
  opponentChosen: false,
  duelStarted: false,
  bodyCount: 0,
  /* Methods */
  init: function() {
    duelists = [
      {
        name: `Harry Potter`,
        house: "gryffindor",
        hp: 95,
        curse: 25,
        counter: 35
      },
      {
        name: `Cedric Diggory`,
        house: "hufflepuff",
        hp: 110,
        curse: 20,
        counter: 30
      },
      {
        name: `Luna Lovegood`,
        house: "ravenclaw",
        hp: 85,
        curse: 30,
        counter: 40
      },
      {
        name: `Draco Malfoy`,
        house: "slytherin",
        hp: 100,
        curse: 30,
        counter: 40
      }
    ];
    /* Reset Bindings */
    go.player = undefined;
    go.opponent = undefined;
    go.playerChosen = false;
    go.opponentChosen = false;
    go.duelStarted = false;
    go.bodyCount = 0;
    /* prints cards */
    let duelistDeck = $("#duelist-cards").html(),
      duelistScript = Handlebars.compile(duelistDeck),
      context = duelists,
      duelistHTML = duelistScript(context);
    $("#playerSelectionTitle").html(
      "*An Evil Voice Speaks* Who are <em>you?</em>"
    );
    $("#duelists").append(duelistHTML);
    /* start game */
    go.game();
    console.log("init() ran");
  },
  game: function() {
    if (this.duelStarted) {
      this.duel();
    } else {
      this.characterSelect();
    }
    console.log("game() ran");
  },
  characterSelect: function() {
    $(".duelist").on("click", function() {
      console.log("clicked on a card");
      if (!go.playerChosen) {
        go.playerChosen = true;
        go.setCharacter($(this));
      } else {
        go.opponentChosen = true;
        go.setCharacter($(this));
      }
      go.duel();
    });
    console.log("characterSelect() ran");
  },
  setCharacter: function(c) {
    let playerHouse = undefined;
    if ($(c).hasClass("gryffindor")) {
      playerHouse = "gryffindor";
      $(c).addClass("selected");
    }
    if ($(c).hasClass("hufflepuff")) {
      playerHouse = "hufflepuff";
      $(c).addClass("selected");
    }
    if ($(c).hasClass("ravenclaw")) {
      playerHouse = "ravenclaw";
      $(c).addClass("selected");
    }
    if ($(c).hasClass("slytherin")) {
      playerHouse = "slytherin";
      $(c).addClass("selected");
    }
    if (go.playerChosen && !go.opponentChosen) {
      go.player = duelists.find(duelist => duelist.house === playerHouse);
      // update evil message
      $("#playerSelectionTitle").html(
        `Ah, so you're <strong class="text-white bg-${go.player.house}">${
          go.player.name
        }</strong>. And which of your fellow students do you want to murder with magic?`
      );
      return;
    } else {
      go.opponent = duelists.find(duelist => duelist.house === playerHouse);
      // update evil message
      $("#playerSelectionTitle").html(
        `Do it, <strong class="text-white bg-${go.player.house}">${
          go.player.name
        }</strong>! Duel <strong class="text-white bg-${go.opponent.house}">${
          go.opponent.name
        }</strong>! Duel to the <em><strong>DEATH</strong></em>, Wizard Children!`
      );
      return;
    }
    console.log("setCharacter() ran");
  },
  duel: function() {
    if (go.playerChosen && go.opponentChosen) {
      if (!go.duelStarted) {
        go.duelStarted = true;
        $(".duelist").each(function() {
          if ($(this).hasClass("selected")) {
            $(this).css("opacity", "1");
          } else {
            $(this).fadeOut("slow");
          }
        });
        let murderButton = $("<button id='attack'>")
          .addClass("btn btn-lg btn-block bg-dark text-white")
          .html(
            `<strong class="text-white text-${go.player.house}">${
              go.player.name
            }</strong>! <strong>Click</strong> to murder <strong class="text-white text-${
              go.opponent.house
            }">${
              go.opponent.name
            }</strong> with <strong><em>magic</em></strong>!`
          );

        $(murderButton).insertBefore("#duelists");
        go.duel();
      } /* duel is started */ else {
        $("#attack").on("click", function() {
          console.log("attack button clicked");
          go.attack();
        });
      }
    }
    console.log("duel() ran");
  },
  attack: function() {
    // player attacks
    this.opponent.hp -= this.player.curse;
    // print stats update
    $("." + this.opponent.house + " span.hp")
      .fadeOut("fast")
      .delay(200)
      .html(
        `${
          this.opponent.hp < 1 ? "Super Dead" : this.opponent.hp
        } <i class="fas fa-level-down-alt"></i>`
      )
      .fadeIn();

    // player's power surges
    this.player.curse += Math.floor(Math.random() * 20) + 15;
    // print stats update
    $("." + this.player.house + " span.curse")
      .fadeOut("fast")
      .delay(200)
      .html(
        `${Math.ceil(this.player.curse)} <i class="fas fa-level-up-alt"></i>`
      )
      .fadeIn();

    // if opponent alive, they attack
    if (this.opponent.hp > 0) {
      this.player.hp -= this.opponent.counter;
      // print stats update
      $("." + this.player.house + " span.hp")
        .fadeOut("fast")
        .delay(200)
        .html(`${this.player.hp} <i class="fas fa-level-down-alt"></i>`)
        .fadeIn();
    } /* opponent died */ else {
      this.switchOut();
    }

    // if player died
    if (this.player.hp <= 0) {
      $("." + this.player.house + " span.hp")
        .fadeOut("fast")
        .delay(200)
        .text(this.player.hp < 1 ? "Super Dead" : this.opponent.hp)
        .fadeIn();
      // hide cards
      $(".duelist").addClass("d-none");
      $("#attack").remove();
      //update evil message
      $("#playerSelectionTitle").html(
        `You died, <strong class="text-white bg-${go.player.house}">${
          go.player.name
        }</strong>. Loser.`
      );
      setTimeout(function() {
        go.init();
      }, 2500);
    }
    console.log("attack() ran");
  },
  switchOut: function() {
    go.duelStarted = false;
    this.bodyCount++;
    console.log("Body Count: " + this.bodyCount);
    if (this.bodyCount === 3) {
      $(".duelist").addClass("d-none");
      $("#attack").remove();
      //update evil message
      $("#playerSelectionTitle").html(
        `You're despicable, <strong class="text-white bg-${go.player.house}">${
          go.player.name
        }</strong>. You killed all your friends.`
      );
      setTimeout(function() {
        //location.reload();

        go.init();
      }, 2500);
    } else {
      $("." + go.opponent.house).addClass("animated rotateOutDownLeft");
      $("#attack").remove();
      $(".selected").css("opacity", ".25");
      //update evil message
      $("#playerSelectionTitle").html(
        `Good job, <strong class="text-white bg-${go.player.house}">${
          go.player.name
        }</strong>. Your power is surging. Who will you kill next?`
      );
      go.opponentChosen = false;
      go.duelStarted = false;
      $(".duelist").each(function() {
        if (!$(this).hasClass("selected")) $(this).fadeIn();
      });
    }
    console.log("switchOut() ran");
  }
};

const evilVoice = {
  /* Put long text elements in here */
};

$(function() {
  go.init();
});
