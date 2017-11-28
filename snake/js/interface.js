class Interface {
    constructor() {
        this.difficulty = "";
    }

    getInputOfInitialData(m1) {

        $('#login').keydown(function (event) {
            if (event.keyCode === 13) {
                this.submit(m1);
            }
        }.bind(this));

        $('#submit').click(function () {
            this.submit(m1)
        }.bind(this));
        $('#reload').click(function () {
            this.reloadMatrix(m1);
        }.bind(this));
        $('#login').focus();
        $('#setting').click(function () {
            $('article').slideUp();
            setTimeout(() => $('#form').fadeIn(), 400);
        });
    }

    submit(m1) {
        if ($('#login').val() === "") {
            $('#writeYourName').html('Введите ваше имя');
            $('#writeYourName').css({textDecoration: 'underline'})
        } else {
            $('#playerName').html($('#login').val());
            this.difficulty = $($('input:radio:checked')).attr("id");

            switch (this.difficulty) {
                case 'easy':
                    this.difficulty = 200;
                    break;
                case 'normal':
                    this.difficulty = 150;
                    break;
                case 'hard':
                    this.difficulty = 100;
                    break;
            }
            $('#form').slideUp();
            $('article').fadeIn();
            m1.difficulty = this.difficulty;
            this.reloadMatrix(m1);
        }
    }

    getDifficutty() {
        return this.difficulty;
    }

    reloadMatrix(m1) {
        m1.play(true);
        m1.buldMatrix();
        m1.setPlayerSquare();
        m1.setFinishSquare();
        $('#h1').html('Поймайте красный квадрат, используя стрелки клавиатуры');
        m1.moveOnAxisX = true; m1.moveOnAxisValueUp = true;
        setTimeout(() => m1.play(), 1000);
    }
}


