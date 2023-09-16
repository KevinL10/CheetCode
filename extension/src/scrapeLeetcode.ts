chrome.devtools.inspectedWindow.eval(
  // you can do more complicated things by stringifying IIFEs like "(function(){ /*do whatever you want here*/ }())"
  "document.getElementsByClassName('xFUwe')[0]",
  function (result, isException) {
    if (isException) {
      console.log("DNE");
    }
    let question = "";
    console.log(result);
    const traverse = (element) => {
      if (
        element.nodeName === "P" ||
        element.nodeName === "UL" ||
        element.nodeName === "LI" ||
        element.nodeName === "PRE"
      ) {
        question += element.innerText + "\n";
        return;
      } else if (element.nodeName === "IMG") {
        return;
      }
      console.log(element.children);
      for (const child of element.children) {
        console.log(child);
        traverse(child);
      }
    };
    traverse(result);
    console.log()
    return question;
  }
);

chrome.devtools.inspectedWindow.eval(
  "document.getElementsByClassName('view-line')",
  function (result, isException) {
    let signature = "";
    for (const child of result) {
      signature += child.innerText + "\n";
    }
    console.log(signature)
    return signature;
  }
);
