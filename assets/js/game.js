/* Character Objects */
const duelists = [
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

/* Game Object */
let go = {
  /* Bindings */
  player: undefined,
  opponent: undefined,
  playerChosen: false,
  opponentChosen: false,
  duelStarted: false,
  playerStats: {
    hp: undefined,
    curse: undefined,
    defeated: false
  },
  opponentStats: {
    hp: undefined,
    counter: undefined,
    defeated: false
  },
  /* Methods */
  init: function() {
    /* reset bindings */
    go.player = undefined;
    go.opponent = undefined;
    go.playerChosen = false;
    go.opponentChosen = false;
    go.duelStarted = false;
    go.playerStats = {
      hp: undefined,
      curse: undefined,
      defeated: false
    };
    go.opponentStats = {
      hp: undefined,
      curse: undefined,
      defeated: false
    };
    /* prints cards */
    let duelistDeck = $("#duelist-cards").html(),
      duelistScript = Handlebars.compile(duelistDeck),
      context = duelists,
      duelistHTML = duelistScript(context);
    $("#duelists").append(duelistHTML);
    /* start game */
    go.game();
  },
  game: function() {
    if (this.duelStarted) {
      this.duel();
    } else {
      this.characterSelect();
    }
  },
  characterSelect: function() {
    $(".duelist").on("click", function() {
      if (!go.playerChosen) {
        go.playerChosen = true;
        go.setCharacter($(this));
      } else {
        go.opponentChosen = true;
        go.setCharacter($(this));
      }
      go.duel();
    });
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
      $("#playerSelectionTitle").html(
        `Ah, so you're <strong class="text-white bg-${go.player.house}">${
          go.player.name
        }</strong>. And which of your fellow students do you want to murder with magic?`
      );
      return;
    } else {
      go.opponent = duelists.find(duelist => duelist.house === playerHouse);
      $("#playerSelectionTitle").html(
        `Do it, <strong class="text-white bg-${go.player.house}">${
          go.player.name
        }</strong>! Duel <strong class="text-white bg-${go.opponent.house}">${
          go.opponent.name
        }</strong>! Duel to the <em><strong>DEATH</strong></em>, Wizard Children!`
      );
      return;
    }
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
          .addClass("btn btn-lg bg-dark btn-block text-white")
          .html(
            `<strong class="text-white text-${go.player.house}">${
              go.player.name
            }</strong>! Murder <strong class="text-white text-${
              go.opponent.house
            }">${
              go.opponent.name
            }</strong> with <strong><em>magic</em></strong>!`
          );
        $(murderButton).insertBefore("#duelists");
        go.game();
      } else {
        $("#attack").on("click", function() {
          go.attack();
        });
      }
    }
  },
  attack: function() {
    go.opponent.hp -= go.player.curse;
    $("." + go.opponent.house + " span.hp").text(
      go.opponent.hp < 1 ? "Super Dead" : go.opponent.hp
    );
    go.player.curse += Math.floor(Math.random() * 20) + 15;
    $("." + go.player.house + " span.curse").text(Math.ceil(go.player.curse));
    if (go.opponent.hp > 0) {
      go.player.hp -= go.opponent.counter;
      $("." + go.player.house + " span.hp").text(go.player.hp);
    } else {
      go.switchOut();
    }
  },
  switchOut: function() {
    $("." + go.opponent.house).addClass("animated rotateOutDownLeft");
    $("#attack").remove();
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
    go.characterSelect();
  }
};

const evilVoice = {
  /* Put long text elements in here */
};

$(function() {
  go.init();
});
