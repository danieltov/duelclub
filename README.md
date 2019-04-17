# Murderous Wizard Children Club

This is my take on a click-based brawler game. Harry Potter-themed, of course.

### Here's how the app works:

- When the game starts, the player will choose a character by clicking on the wizard's card. The player will play as that wizard for the rest of the game.

- The player must then defeat all of the remaining wizards.

- The player chooses an opponent by clicking on an enemy's card.

- The player will now be able to click the `attack` button.

  - Whenever the player clicks `attack`, their character damages the defender. The opponent will lose `HP` (health points). These points are displayed in the player card.
  - The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are on the player card.

- The player will keep hitting the attack button in an effort to defeat their opponent.

4. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.

##### Notes

- Each character in the game has 3 attributes: `Health`, `Curse` and `Counter Curse`.

- Each time the player attacks, their character's Curse increases by a random number from 15 to 35.
- The enemy character only has `Counter Curse`.

  - Unlike the player's `Curse`, `Counter Curse` never changes.

- No characters in the game can heal or recover Health Points.

- A player can win and lose the game no matter what character they choose. The challenge is picking the right enemies, not choosing the strongest player. Also, because of the random number element, luck comes into it a bit.
