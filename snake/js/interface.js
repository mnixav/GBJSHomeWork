class Interface {
    constructor() {
        this.login = "";
        this.difficulty = "";
    }

    getInputOfInitialData() {
        $('#login').keydown(function (event) {
            if (event.keyCode === 13) {
                this.login = $('#login').val();
                this.difficulty = $($('input:radio:checked')).attr("id");
                return {login, difficulty};

            }
        });
    }

}