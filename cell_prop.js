//storage
let sheetDB = [];

for(let i=0; i<rows; i++){
    let sheetRow = [];
    for(let j=0; j<cols; j++){
        let cellProp = {
            bold: false,
            italic: false,
            underlined: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#FFFFFF",
            value: "",
            formula: "",
            children: [],
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

//selectors for cell props
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underlined = document.querySelector(".underlined");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prob");
let BGcolor = document.querySelector(".bg-color-prob");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centreAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

bold.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})

italic.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})

underlined.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.underlined = !cellProp.underlined;
    cell.style.textDecoration = cellProp.underlined ? "underline" : "none";
    underlined.style.backgroundColor = cellProp.underlined ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("change", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize+"px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

BGcolor.addEventListener("change", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})

alignment.forEach((alignEle)=>{
    alignEle.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;
        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centreAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

let allCells = document.querySelectorAll(".cell");
for(let i=0; i<allCells.length; i++){
    resetUI(allCells[i]);
}

function resetUI(cell){
    cell.addEventListener("click", (e)=>{
        let address = addressBar.value;
        let [rid, cid] = decodeAddress(address);
        cellProp = sheetDB[rid][cid];
        
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underlined ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize+"px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;

        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underlined.style.backgroundColor = cellProp.underlined ? activeColorProp : inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centreAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}

function activecell(address){
    let [rid, cid] = decodeAddress(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeAddress(address){
    let rid = Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0))-65;
    return [rid, cid];
}