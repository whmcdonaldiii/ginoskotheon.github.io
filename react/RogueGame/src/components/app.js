import React, { Component } from 'react';

class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {

          function Canvas(width, height) {
          this.canvas = document.getElementById("canvas");
          this.ctx = this.canvas.getContext("2d");
          this.canvas.width = width;
          this.canvas.height = height;
          }



          function Sprite(x, y, color, type) {
          this.x = x;
          this.y = y;
          this.color = color;
          this.type = type;
          }

          Sprite.prototype.draw = function (ctx, colWidth, colHeight) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x * colWidth, this.y * colHeight, colWidth, colHeight);
          };



          function Room(x, y, color, type, width, height, id) {
          Sprite.call(this, x, y, color, type);
          this.width = width;
          this.height = height;
          this.id = id;
          }

          Room.prototype = Object.create(Sprite.prototype);
          Room.prototype.constructor = Room;

          Room.prototype.centerPoint = function () {
          var x = Math.floor(this.x + (this.width/ 2));
          var y = Math.floor(this.y + (this.height / 2));
          return { x: x, y: y };
          };

          Room.prototype.randomPoint = function () {
          var x = Math.floor(Math.random() * ((this.x + this.width) - this.x)) + this.x;
          var y = Math.floor(Math.random() * ((this.y + this.height) - this.y)) + this.y;

          return { x: x, y: y };
          };



          function Wraith(x, y, color, type, health) {
          Sprite.call(this, x, y, color, type);
          this.health = health;
          this.wrEl = document.getElementsByClassName("wraith-hp")[0];
          this.initialize();
          }

          Wraith.prototype = Object.create(Sprite.prototype);
          Wraith.prototype.constructor = Wraith;

          Wraith.prototype.setHealth = function(amount) {
          // this.health -= amount;
          this.wrEl.innerHTML = this.health;
          }
          Wraith.prototype.resetHealth = function(amount) {
          // this.health -= amount;

          this.wrEl.innerHTML = amount;
          }

          Wraith.prototype.initialize = function(){
          this.wrEl.innerHTML = this.health;
          }

          function Player(x, y, color, type, health, atk, lvl) {
          Wraith.call(this, x, y, color, type, health);
          this.attack = atk;
          this.exp = 0;
          this.lvl = lvl;
          this.weapon = "Knuckles";
          this.weaponDmg = 0;
          this.hpEl = document.getElementsByClassName("player-hp")[0];
          this.atkEl = document.getElementsByClassName("player-atk")[0];
          this.lvlEl = document.getElementsByClassName("player-lvl")[0];
          this.expEl = document.getElementsByClassName("player-exp")[0];
          this.wpnEl = document.getElementsByClassName("player-wpn")[0];
          this.init();
          }

          Player.prototype = Object.create(Wraith.prototype);
          Player.prototype.constructor = Player;

          Player.prototype.move = function (x, y) {
          this.x = x;
          this.y = y;
          };

          Player.prototype.setHealth = function (amount) {
          this.health += amount;
          this.hpEl.innerHTML = this.health;
          };

          Player.prototype.setExp = function (amount) {
          this.exp += amount;
          this.expEl.innerHTML = this.exp;
          this.checkExp();
          };

          Player.prototype.checkExp = function () {
          if (this.exp === 80) {
            this.attack += 3;
            this.lvl++;
            this.exp = 0;
            this.setExp(0);
            this.atkEl.innerHTML = this.attack;
            this.lvlEl.innerHTML = this.lvl;

            if (this.health < 100) {
              this.health = 100;
              this.setHealth(0);
            }

            humane.log("You are now level " + this.lvl + ".");
          }
          };

          Player.prototype.setWpn = function (weapon, atk) {
          this.weapon = weapon;
          this.attack -= this.weaponDmg;
          this.weaponDmg = atk;
          this.attack += this.weaponDmg;
          this.wpnEl.innerHTML = this.weapon;
          this.atkEl.innerHTML = this.attack;
          };

          Player.prototype.init = function () {
          this.hpEl.innerHTML = this.health;
          this.atkEl.innerHTML = this.attack;
          this.expEl.innerHTML = this.exp;
          this.lvlEl.innerHTML = this.lvl;
          this.wpnEl.innerHTML = this.weapon;
          this.weaponDmg = 0;
          };


          function Game(rows, cols, colWidth, colHeight) {
          this.grid = [];
          this.rooms = [];
          this.ROWS = rows;
          this.COLS = cols;
          this.COL_WIDTH = colWidth;
          this.COL_HEIGHT = colHeight;
          this.dungeon = 0;
          this.canvas = new Canvas(this.COLS * this.COL_WIDTH, this.ROWS * this.COL_HEIGHT);
          this.ctx = this.canvas.ctx;
          this.player = null;
          this.helpers = {
            random: function (min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
            }
          };
          }

          Game.prototype.generateGrid = function () {
          for (var y = 0; y < this.ROWS; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.COLS; x++) {
              var darkness = new Sprite(x, y, "#424242", 0);
              this.drawSprite(darkness);
              this.grid[y][x] = darkness;
            }
          }
          };

          Game.prototype.doesCollide = function (room) {
          for (var i = 0; i < this.rooms.length; i++) {
            var room2 = this.rooms[i];
            if (room.id === room2.id) continue;

            if ((room.x >= room2.x && room.x <= room2.x + room2.width &&
              (room.y >= room2.y && room2.y + room2.height >= room.y ||
              room.y <= room2.y && room.y + room.height >= room2.y
              )) ||

              room.x <= room2.x && room.x + room.width >= room2.x &&
              (room.y >= room2.y && room2.y + room2.height >= room.y ||
              room.y <= room2.y && room.y + room.height >= room2.y
              )) {

              return true;
            }
          }

          return false;
          };

          Game.prototype.generateRooms = function (minSize, maxSize, roomCount) {
          for (var i = 0; i < roomCount; i++) {
            var x = this.helpers.random(1, this.COLS - maxSize);
            var y = this.helpers.random(1, this.ROWS - maxSize);
            var width = this.helpers.random(minSize, maxSize);
            var height = this.helpers.random(minSize, maxSize);
            var room = new Room(x, y, "#FAFAFA", 1, width, height, i);

            if (this.doesCollide(room)) {
              i--;
            } else {
              if (i > 0) this.drawCorridor(room);
              this.rooms.push(room);
            }
          }
          };

          Game.prototype.drawCorridor = function (room) {
          var prevRoom = this.rooms[room.id - 1];
          var point = room.centerPoint();
          var prevPoint = prevRoom.centerPoint();
          var floor = null;

          while (point.y !== prevPoint.y) {
            if (point.y > prevPoint.y) {
              point.y--;
            } else {
              point.y++;
            }
            this.ctx.fillStyle = room.color;
            this.ctx.fillRect(point.x * this.COL_WIDTH, point.y * this.COL_HEIGHT, this.COL_WIDTH, this.COL_HEIGHT);
            floor = new Sprite(point.x, point.y, "#FAFAFA", 1);
            this.grid[point.y][point.x] = floor;
          }
          while (point.x !== prevPoint.x) {
            if (point.x > prevPoint.x) {
              point.x--;
            } else {
              point.x++;
            }
            this.ctx.fillStyle = room.color;
            this.ctx.fillRect(point.x * this.COL_WIDTH, point.y * this.COL_HEIGHT, this.COL_WIDTH, this.COL_HEIGHT);
            floor = new Sprite(point.x, point.y, "#FAFAFA", 1);
            this.grid[point.y][point.x] = floor;
          }

          };

          Game.prototype.drawRooms = function () {
          for (var i = 0; i < this.rooms.length; i++) {
            var room = this.rooms[i];
            for (var y = room.y; y < room.y + room.height; y++) {
              for (var x = room.x; x < room.x + room.width; x++) {
                var floor = new Sprite(x, y, "#FAFAFA", 1);
                this.grid[y][x] = floor;
                this.drawSprite(floor);
              }
            }
          }
          };

          Game.prototype.randomWithinRoom = function (room) {
          var random = room.randomPoint();
          while (this.grid[random.y][random.x].type !== 1) {
            random = room.randomPoint();
          }

          return random;
          };

          Game.prototype.drawSprite = function (sprite) {
          sprite.draw(this.ctx, this.COL_WIDTH, this.COL_HEIGHT);
          };

          Game.prototype.randomRoom = function () {
          return this.rooms[this.helpers.random(0, this.rooms.length)];
          };

          Game.prototype.generateWraith = function () {
          for (var i = 0; i < this.rooms.length; i++) {
            var room = this.rooms[i];
            var random = room.randomPoint();
            var wraith = new Wraith(random.x, random.y, "red", 2, 100);
            this.grid[random.y][random.x] = wraith;
            this.drawSprite(wraith);
          }
          };

          Game.prototype.generateHealthPacks = function () {
          for (var i = 0; i < this.rooms.length; i++) {
            var room = this.rooms[i];
            var random = this.randomWithinRoom(room);
            var health = new Sprite(random.x, random.y, "green", 3);
            this.grid[random.y][random.x] = health;
            this.drawSprite(health);
          }
          };
          Game.prototype.generateRing = function () {

            var room = this.randomRoom();
            var random = this.randomWithinRoom(room);
            var ring = new Sprite(random.x, random.y, "gold", 8);
            this.grid[random.y][random.x] = ring;
            this.drawSprite(ring);

          };

          Game.prototype.generatePlayer = function () {
          var room = this.randomRoom();
          var random = this.randomWithinRoom(room);
          var player = new Player(random.x, random.y, "blue", 4, 100, 8, 1);
          this.grid[random.y][random.x] = player;
          this.player = player;
          this.drawSprite(player);
          };

          Game.prototype.generateWeapon = function () {
          var room = this.randomRoom();
          var random = this.randomWithinRoom(room);
          var weapon = new Sprite(random.x, random.y, "orange", 5);
          this.grid[random.y][random.x] = weapon;
          this.drawSprite(weapon);

          };


          Game.prototype.generatePortal = function () {
          var room = this.randomRoom();
          var random = this.randomWithinRoom(room);
          var portal = new Sprite(random.x, random.y, "purple", 6);
          this.grid[random.y][random.x] = portal;
          this.drawSprite(portal);
          };

          Game.prototype.generateBoss = function () {
          var room = this.randomRoom();
          var random = this.randomWithinRoom(room);
          var boss = new Wraith(random.x, random.y, "black", 7, 300);
          this.grid[random.y][random.x] = boss;
          this.drawSprite(boss);
          };

          Game.prototype.setDungeon = function () {
          var el = document.getElementsByClassName("dungeon-lvl")[0];
          this.dungeon++;
          if(this.dungeon === 1){
            el.innerHTML ="Bridge of Khazad Dum";
          }
          else if(this.dungeon === 2){
            el.innerHTML = "Helm's Deep";
          }
          else if(this.dungeon === 3){
            el.innerHTML = "Mount Doom";
          }
          };

          Game.prototype.newDungeon = function () {
          this.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
          this.grid = [];
          this.rooms = [];
          this.setDungeon();
          this.generateGrid();
          this.generateRooms(8, 12, 10);
          this.drawRooms();
          this.generateWraith();
          this.generateHealthPacks();
          this.generateWeapon();

          if (this.dungeon < 3) {
            this.generatePortal();
          }
          if (this.dungeon === 3) {
            this.generateBoss();
            this.generateRing();
          }

          if (this.dungeon === 1) {
            this.generatePlayer();
          } else {
            this.randomSpotForPlayer();
          }

          this.generateDarkness("rgba(0, 0, 0, 1)");
          if (this.dungeon > 0) this.drawSprite(this.player);
          };

          Game.prototype.randomSpotForPlayer = function () {
          var room = this.randomRoom();
          var random = this.randomWithinRoom(room);
          this.player.x = random.x;
          this.player.y = random.y;
          this.drawSprite(this.player);
          };

          Game.prototype.clearPlayer = function () {
          this.ctx.fillStyle = "#FAFAFA";
          this.ctx.fillRect(this.player.x * this.COL_WIDTH, this.player.y * this.COL_HEIGHT, this.COL_WIDTH, this.COL_HEIGHT);
          var floor = new Sprite(this.player.x, this.player.y, "#FAFAFA", 1);
          this.grid[this.player.y][this.player.x] = floor;
          };

          Game.prototype.checkHealth = function (wraith) {
          if (this.player.health <= 0) {
            return - 1;
          } else if (wraith.health <= 0) {
            return 1;
          } else {
            return 0;
          }
          };

          Game.prototype.whatWpn = function () {
          var wpn = {};
          if (this.dungeon === 1) {
            wpn.name = "a Rock";
            wpn.atk = 2;
          } else if (this.dungeon === 2) {
            wpn.name = "a Frying Pan";
            wpn.atk = 4;
          } else if (this.dungeon === 3) {
            wpn.name = "Sting";
            wpn.atk = 10;
          }

          return wpn;
          };

          Game.prototype.handleCombat = function (wraith) {
          var playerDmg = this.helpers.random(5, this.player.attack + 5);
          var wraithDmg = this.helpers.random(4, this.dungeon + 4);

          wraith.health -= playerDmg;
          wraith.setHealth(wraith.health);
          this.player.setHealth(-wraithDmg);

          var check = this.checkHealth(wraith);
          if (check === 1) {
            this.player.setExp(20);
            wraith.resetHealth("-");
            return true;
          } else if (check === -1) {
            humane.log("Game over. You have died.");
            this.dungeon = 0;
            this.newDungeon();
          } else {
            return false;
          }
          };

          Game.prototype.handleMovement = function (vector) {
          var sprite = this.grid[vector.y][vector.x];
          if (sprite.type === 1) {
            return true;
          } else if (sprite.type === 2 || sprite.type === 7) {
            var status = this.handleCombat(sprite);
            if (sprite.type === 7 && status) humane.log("Middle Earth is Saved!");
            return status;
          } else if (sprite.type === 3) {
            this.player.setHealth(20);
            return true;
          } else if (sprite.type === 5) {
            var wpn = this.whatWpn();
            this.player.setWpn(wpn.name, wpn.atk);
            humane.log("You have picked up "+ wpn.name);
            return true;
          } else if (sprite.type === 8) {
            var wpn = {
              name: "Ring",
              atk: 100
            };
            this.player.setWpn(wpn.name, wpn.atk);
            this.player.setHealth(10000);
            humane.log("You have picked up the One Ring!.");
            return true;
          } else if (sprite.type === 6) {
            this.newDungeon();
            if (this.dungeon === 1) {
              humane.log("You're on the Bridge of Khazad Dum. Fly you fools!");
            } else if (this.dungeon === 2) {
              humane.log("No one can breech Helm's Deep!");
            } else if (this.dungeon === 3) {
              humane.log("Find the One Ring and defeat Sauron!");
            }
            // humane.log("You have entered dungeon " + this.dungeon + ".");
          }
          };

          Game.prototype.shouldBeVisible = function (x, y) {
          if (y >= this.player.y - 5 && y <= this.player.y + 5 && x >= this.player.x - 5 && x <= this.player.x + 5) {
            return true;
          }

          return false;
          };
          // var darkcolor = "rgba(0, 0, 0, 1)"
          Game.prototype.generateDarkness = function (darkcolor) {
          for (var y = 0; y < this.ROWS; y++) {
            for (var x = 0; x < this.COLS; x++) {
              if (!this.shouldBeVisible(x, y)) {
                this.ctx.fillStyle = darkcolor;
                this.ctx.fillRect(x * this.COL_WIDTH, y * this.COL_HEIGHT, this.COL_WIDTH, this.COL_HEIGHT);
              } else {
                var sprite = this.grid[y][x];
                this.drawSprite(sprite);
              }
            }
          }
          };

          Game.prototype.addListeners = function () {
          window.addEventListener("keydown", function (e) {
            if ([37,38,39,40].indexOf(e.which) > -1) {
              e.preventDefault();
            }
            var vector = {};

            if (e.which === 38) {
              vector.x = this.player.x;
              vector.y = this.player.y - 1;
            } else if (e.which === 40) {
              vector.x = this.player.x;
              vector.y = this.player.y + 1;
            } else if (e.which === 37) {
              vector.x = this.player.x - 1;
              vector.y = this.player.y;
            } else if (e.which === 39) {
              vector.x = this.player.x + 1;
              vector.y = this.player.y;
            }

            if (this.handleMovement(vector)) {
              this.clearPlayer();
              this.player.move(vector.x, vector.y);
              this.generateDarkness("rgba(0, 0, 0, 0)");
              this.drawSprite(this.player);
            }
          }.bind(this));
          };



          function startGame(){
            var game = new Game(50, 90, 14, 14);
            game.setDungeon();
            game.generateGrid();
            game.generateRooms(8, 12, 10);
            game.drawRooms();
            game.generateWraith();
            game.generateHealthPacks();
            game.generatePlayer();
            game.generateWeapon();
            game.generatePortal();
            game.addListeners();
            game.generateDarkness("rgba(0, 0, 0, 1)");
            humane.log("Defeat the Balrog at Khazad Dum");
          }
          startGame();

    }
    render() {

        return (

          <div>
            <div className="row">
              <h3 className="meta">Lvl: <span className="player-lvl"></span></h3>
              <h3 className="meta">HP: <span className="player-hp"></span></h3>
              <h3 className="meta" id="enemy">Enemy: <span className="wraith-hp"></span></h3>
              <h3 className="meta">Attack: <span className="player-atk"></span></h3>
              <h3 className="meta">Exp: <span className="player-exp"></span><span>/80</span></h3>
              <h3 className="meta">Weapon: <span className="player-wpn"></span></h3>
              <h3 className="meta">Moria: <span className="dungeon-lvl"></span></h3>
            </div>
            <canvas ref="canvas" id="canvas"/>
          </div>

        );
    }
}

export default Canvas;
