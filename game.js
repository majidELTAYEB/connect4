(function($) {
  $.fn.connect4 = function(player1,player2) {
    class puissance4 {

      constructor() {
        this.x = 7;
        this.y = 6;
        this.grid = Array(this.y).fill().map(() => Array(this.x).fill(0));
        this.Empty = 0;
        this.Red = 1;
        this.Black = 2;
        this.py = null;
        this.px = null;
        this.ColorNames = new Array(3);
        this.ColorNames[0] = "Empty";
        this.ColorNames[1] = player2;
        this.ColorNames[2] = player1;
        this.player_position = -1;
        this.player_color = this.Black;
        this.played_position = -1;
        this.played_color = this.Empty;
        this.canvas = document.createElement('canvas');
        $('#container').append(this.canvas);
        this.createCanvas();
      }


      createCanvas() {
        this.canvas.height = 76 * this.y;
        this.canvas.width = 76 * this.x;
        this.canvas.style.backgroundColor = ("#87CEFA");
        this.boarDraw();
        console.log(this.grid);
        this.move(this.canvas, this.grid, this.y, this.x, this.Empty, this.Red, this.Black);
        this.play(this.canvas)
      }

      boarDraw() {
        for (let i = 0; i < this.y; ++i)
          for (let j = 0; j < this.x; ++j) {
            this.dessin(i, j);
          }
      }

      dessin(i, j) {
        this.py = 76 * i;
        this.px = 76 * j;
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = ("#87CEFA");
        ctx.fillRect(this.px, this.py, 70, 70);

        switch (this.grid[i][j]) {
          case 0:
            ctx.fillStyle = "rgba(255,255,255,1)";
            break;
          case 1:
            ctx.fillStyle = player2;
            break;
          case 2:
            ctx.fillStyle = player1;
            break;
        }
        ctx.beginPath();
        ctx.arc(this.px + 38, this.py + 38, 30, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = ("black");
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.px + 38, this.py + 38, 30, 0, 2 * Math.PI);
        ctx.stroke();
      }

      actualfall(x,i)
      {
        let that = this;
        if(i < 5 && this.grid[i+1][x] === this.Empty)
        {
          this.grid[i+1][x] = this.grid[i][x];
          this.grid[i][x] = this.Empty;
          console.log(x,i);
          setTimeout(function (){
            that.actualfall(x,i+1)
          },500);
        }    //"actualfall("+x+","+(i+1)+")"
        else
        {
          this.move(this.canvas, this.grid);
          this.play(this.canvas);
          this.check(i);
        }
        this.boarDraw();
      }


      check(played_row)
      {
        if(played_row <= 2) // Vertical check
        {
          if (this.grid[played_row][this.played_position] === this.played_color &&
            this.grid[played_row+1][this.played_position] === this.played_color &&
            this.grid[played_row+2][this.played_position] === this.played_color &&
            this.grid[played_row+3][this.played_position] === this.played_color )
          {
            alert(this.ColorNames[this.played_color] + " Wins!");
            location.reload();
          }
        }

        let j = 1;
        let k = 1;

        while(this.played_position + j < 7 && this.grid[played_row][this.played_position + j] === this.played_color) {++j}
        while(this.played_position - k >= 0 && this.grid[played_row][this.played_position - k] === this.played_color) {++k}
        if(j+k-1 >= 4)
        {
          alert(this.ColorNames[this.played_color] + " Wins!");
          location.reload();
        }

        j = 1;
        k = 1;

        while(this.played_position + j < 7 && played_row + j < 6 && this.grid[played_row + j][this.played_position + j] === this.played_color) {++j}
        while(this.played_position - k >= 0 && played_row - k >= 0 && this.grid[played_row - k][this.played_position - k] === this.played_color) {++k}
        if(j+k-1 >= 4)
        {
          alert(this.ColorNames[this.played_color] + " Wins!");
          location.reload();
        }


        j = 1;
        k = 1;

        while(this.played_position + j < 7 && played_row - j >= 0 && this.grid[played_row - j][this.played_position + j] === this.played_color) {++j}
        while(this.played_position - k >=0 && played_row + k < 6 && this.grid[played_row + k][this.played_position - k] === this.played_color) {++k}

        if(j+k-1 >= 4)
        {
          alert(this.ColorNames[this.played_color] + " Wins!");
          location.reload();
        }

      }
      play(canvas)
      {
        let that = this;
        canvas.onclick = function() {


          if (that.player_position < 0)
            return false;

          that.played_position = that.player_position;
          that.player_position = -1;

          that.played_color = that.player_color;
          switch (that.player_color) {
            case that.Red:
              that.player_color = that.Black;
              break;
            case that.Black:
              that.player_color = that.Red;
              break;
            case that.Empty:
              alert("Problem!");
              break;
          }

          that.actualfall(that.played_position, 0);
        }
      }


      move(canvas, grid) {
        let that = this;
        canvas.onmousemove = function (e) {
          if (!e) {
            e = window.event;
          }
          let mx = e.clientX;
          mx = mx - canvas.getBoundingClientRect().left;
          let j = e.clientX - canvas.getBoundingClientRect().left;

          if (that.player_position >= 0) {
            grid[0][that.player_position] = that.Empty;
          }

          that.player_position = Math.floor(j / 76);
          if (grid[0][that.player_position] === that.Empty) {
            grid[0][that.player_position] = that.player_color;
            that.boarDraw();
          } else that.player_position = -1;

        }


      }
    }
    new puissance4();

  };
})(jQuery);
