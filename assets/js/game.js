/* Character Objects */
const duelists = [
  {
    name: `Harry Potter`,
    house: "gryffindor",
    hp: `95`,
    curse: `25`,
    counter: `40`
  },
  {
    name: `Cedric Diggory`,
    house: "hufflepuff",
    hp: `110`,
    curse: `20`,
    counter: `36`
  },
  {
    name: `Luna Lovegood`,
    house: "ravenclaw",
    hp: `85`,
    curse: `30`,
    counter: `35`
  },
  {
    name: `Draco Malfoy`,
    house: "slytherin",
    hp: `100`,
    curse: `30`,
    counter: `35`
  }
];

/* Game Object */
let go = {
  /* Bindings */
  player: undefined, // ex: duelists[0] -->
  opponent: undefined, // ex: duelists[1]
  playerChosen: false,
  opponentChosen: false,
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

    go.game();
  },
  game: function() {
    this.characterSelect();
  },
  characterSelect: function() {
    $(".duelist").on("click", function() {
      go.playerChosen = true;
      let playerHouse = undefined;
      if ($(this).hasClass("gryffindor")) playerHouse = "gryffindor";
      if ($(this).hasClass("hufflepuff")) playerHouse = "hufflepuff";
      if ($(this).hasClass("ravenclaw")) playerHouse = "ravenclaw";
      if ($(this).hasClass("slytherin")) playerHouse = "slytherin";
      go.player = duelists.find(duelist => duelist.house === playerHouse);

      let i = 0;
      $(".duelist").each(function() {
        if (!$(this).hasClass(playerHouse)) $(this).fadeOut(500);
        if ($(this).hasClass(playerHouse))
          $(this)
            .parent()
            .animate({ right: i * 25 + "%" }, 1250);
        i++;
      });
      $("#playerSelectionTitle").remove();

      // print oponent cards
      $("#opponentSelectionTitle").text("Choose an Opponent");
      let challengerDeck = $("#challenger-cards").html(),
        challengerScript = Handlebars.compile(challengerDeck),
        context = duelists,
        challengerHTML = challengerScript(context);
      $("#challengers").append(challengerHTML);
      go.opponentSelect();
    });
  },
  opponentSelect: function() {
    $(".challenger").on("click", function() {
      go.opponentChosen = true;
      let opponentHouse = undefined;
      if ($(this).hasClass("gryffindor")) opponentHouse = "gryffindor";
      if ($(this).hasClass("hufflepuff")) opponentHouse = "hufflepuff";
      if ($(this).hasClass("ravenclaw")) opponentHouse = "ravenclaw";
      if ($(this).hasClass("slytherin")) opponentHouse = "slytherin";
      go.opponent = duelists.find(duelist => duelist.house === opponentHouse);

      let i = 0;
      $(".challenger").each(function() {
        if (!$(this).hasClass(opponentHouse)) $(this).fadeOut(500);
        if ($(this).hasClass(opponentHouse))
          $(this)
            .parent()
            .animate({ right: i * 25 + "%" }, 1250);
        i++;
      });
      $("#opponentSelectionTitle").remove();
    });
  }
};

$(function() {
  go.init();
});
