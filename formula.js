for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) =>{
            let address = addressBar.value;
            let [cell, cellProp] =  activecell(address);
            let enteredData = cell.innerText;

            if(enteredData === cellProp.value) return;

            cellProp.value = enteredData;
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCell(address);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e)=>{
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){

        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);
        if(inputFormula != cellProp.formula) removeChildFromParent(cellProp.formula);

        // addChildToGraph(inputFormula, address);
        // let isGraphCyclic = isCyclic(graphAdjacencyMatrix);
        // if(isGraphCyclic === true){
        //     alert("Your formula is Cyclic");
        //     removeChildFromGraph(inputFormula, address);
        //     return;
        // }

        let evaluatedValue = evaluateFormula(inputFormula);

        setUIAndCellProp(evaluatedValue, inputFormula, address);
        addChildToParent(inputFormula);

        updateChildrenCell(address);
    }
})

// function removeChildFromGraph(formula, address){
//     let [crid, ccid] = decodeAddress(childAddress);
//     let encodedFormula = formula.split(" ");
//     for(let i=0; i<encodedFormula.length; i++){
//         let ascii = encodedFormula[i].charCodeAt(0);
//         if(ascii >=65 && ascii<=90){
//             let [prid, pcid] = decodeAddress(encodedFormula[i]);
//             graphAdjacencyMatrix[prid][pcid].pop();
//         }
//     }
// }

// function addChildToGraph(formula, childAddress){
//     let ele = decodeAddress(childAddress);
//     let encodedFormula = formula.split(" ");
//     for(let i=0; i<encodedFormula.length; i++){
//         let ascii = encodedFormula[i].charCodeAt(0);
//         if(ascii >=65 && ascii<=90){
//             let [prid, pcid] = decodeAddress(encodedFormula[i]);
//             let noOfEle = graphAdjacencyMatrix[prid][pcid].length;
//             graphAdjacencyMatrix[prid][pcid].push(ele);
//         }
//     }
// }

function addChildToParent(inputFormula){
    let childAddress = addressBar.value;
    let encodedFormula = inputFormula.split(" ");
    for(let i=0; i<encodedFormula.length; i++){
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii >=65 && ascii<=90){
            let [cell, parentCellProp] = activecell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++){
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii >=65 && ascii<=90){
            let [cell, parentCellProp] = activecell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function updateChildrenCell(parentAddress){
    let [parentCell, parentCellProp] = activecell(parentAddress);
    let children = parentCellProp.children;
    for(let i=0; i<children.length; i++){
        let childAddress = children[i];
        let [childCell, childCellProp] = activecell(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCell(childAddress);
    }
}

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i=0; i<encodedFormula.length; i++){
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii >=65 && ascii<=90){
            let [cell, cellProp] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setUIAndCellProp(evaluatedValue, formula, address){
    let [cell, cellProp] = activecell(address);
    
    cell.innerText = evaluatedValue;
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}