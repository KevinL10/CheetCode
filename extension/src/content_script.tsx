async function getChildren() {
    setTimeout(() => {
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
    }, 2000);
}

async function getSignature() {
    setTimeout(() => {
        const result = document.querySelectorAll(".view-lines");
        let signature = "";
        for (const child of result[0].children) {
            signature += child.textContent + "\n";
        }
        console.log(signature);
    }, 2000);
}

getSignature();
getChildren();
