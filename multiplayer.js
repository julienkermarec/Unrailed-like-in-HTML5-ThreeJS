
var chatOutput = document.getElementById('chat-output');
var chatInput = document.getElementById('chat-input');
var startButton = document.getElementById('setup-datachannel');
var startSoloButton = document.getElementById('start-solo');
var menu = document.getElementById('menu');
chatInput.onkeypress = function (e) {
    if (e.keyCode != 13) return;
    channel.send(this.value);
    chatOutput.innerHTML = 'Me: ' + this.value + '<hr />' + chatOutput.innerHTML;
    this.value = '';
};

var channel = new DataChannel();

channel.onopen = function (userid) {
    chatInput.style.display = 'block';
    startButton.style.display = 'none';
};

channel.onmessage = function (message, userid) {
    chatOutput.innerHTML = userid + ': ' + message + '<hr />' + chatOutput.innerHTML;
};

channel.onleave = function (userid) {
    chatOutput.innerHTML = userid + ' Left.<hr />' + chatOutput.innerHTML;

    startButton.style.display = 'block';
    chatInput.style.display = 'none';
};

// search for existing data channels
channel.connect();

startSoloButton.onclick = function () {
    menu.style.display = 'none';
    start();
}
startButton.onclick = function () {
    // setup new data channel
    channel.open();
};
