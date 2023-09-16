import { uIOhook, UiohookKey } from "uiohook-napi";

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        return new Response("Bun!");
    },
});

console.log("Hello via Bun!");
console.log(`Listening on http://localhost:${server.port} ...`);

uIOhook.on("keydown", (e) => {
    if (e.keycode === UiohookKey.Q) {
        console.log("Hello!");
    }

    if (e.keycode === UiohookKey.Escape) {
        process.exit(0);
    }
});

uIOhook.start();
