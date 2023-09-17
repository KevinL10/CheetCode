const getChildren = async () => {
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

    return question;
};

const getSignature = async () => {
    const result = document.querySelectorAll(".view-lines");
    let signature = "";

    for (const child of result[0].children) {
        signature += child.textContent + "\n";
    }

    return signature;
};

const sendRequest = async () => {
    setTimeout(async () => {
        const functionSignature = await getSignature();
        const question = await getChildren();
        // console.log(functionSignature, children)
        console.log("function" + functionSignature);
        console.log("question" + question);
        await fetch("http://localhost:3000/solution", {
            method: "POST",
            body: JSON.stringify({
                signature: functionSignature,
                question: question,
            }),
        });
    }, 10 * 1000);
};

sendRequest();
