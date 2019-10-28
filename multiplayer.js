
var chatOutput = document.getElementById('chat-output');
var chatInput = document.getElementById('chat-input');
var startButton = document.getElementById('setup-datachannel');
var startSoloButton = document.getElementById('start-solo');
var menu_principal = document.getElementById('menu_principal');
var menu_multi = document.getElementById('menu_multi');
var cancelDatachannel = document.getElementById('cancel-datachannel');
var menu = document.getElementById('menu');
let channel;
chatInput.onkeypress = function (e) {
    if (e.keyCode != 13) return;
    channel.send(this.value);
    chatOutput.innerHTML += '<li>Moi: ' + this.value + '</li>';
    this.value = '';
};
startSoloButton.onclick = function () {
    menu.style.display = 'none';
    start();
}
cancelDatachannel.onclick = function () {
    console.log("cancel", channel);
    menu_principal.style.display = 'block';
    menu_multi.style.display = 'none';
    delete channel;
}

startButton.onclick = function () {
    // setup new data channel
    console.log("startButton");
    menu_principal.style.display = 'none';
    menu_multi.style.display = 'block';


    channel = new DataChannel('unrailed');

    channel.onopen = function (userid) {
        console.log("on open", userid);
        chatInput.style.display = 'block';
        startButton.style.display = 'none';
        chatOutput.innerHTML += '<li>Connecté avec ' + userid + '</li>';

        menu.style.display = 'none';
        start();
    };

    channel.onmessage = function (message, userid) {
        chatOutput.innerHTML += '<li>' + userid + ': ' + message + '</li>';
    };

    channel.onleave = function (userid) {
        chatOutput.innerHTML += '<li>' + userid + ' Left.</li>';

        chatInput.style.display = 'none';
        menu_principal.style.display = 'block';
        menu_multi.style.display = 'none';
    };

    // search for existing data channels

    // channel.open();
    // channel.connect();

};
