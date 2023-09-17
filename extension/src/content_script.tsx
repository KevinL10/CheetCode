async function getChildren() {
    const result = document.querySelectorAll(".xFUwe")[0];
    let question = "";
    const traverse = (element: any) => {
        if (
            element.nodeName === "P" ||
            element.nodeName === "UL" ||
            element.nodeName === "LI" ||
            element.nodeName === "PRE"
        ) {
            question += element.textContent + "\n";
            return;
        } else if (element.nodeName === "IMG") {
            return;
        }
        for (const child of element.children) {
            traverse(child);
        }
    };
    traverse(result);
    console.log(question);
    return question;
}

async function getSignature() {
    const result = document.querySelectorAll(".view-lines");
    let signature = "";
    for (const child of result[0].children) {
        signature += child.textContent + "\n";
    }
    return signature;
}

async function sendRequest() {
    setTimeout(async () => {
        const functionSignature = getSignature();
        const question = getChildren();
        await fetch("http://locahost:3000", {
            method: "POST",
            body: JSON.stringify({
                signature: functionSignature,
                question: question,
            }),
        });
    }, 2000);
}

sendRequest();
