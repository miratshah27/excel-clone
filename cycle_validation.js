let graphAdjacencyMatrix = [];

for(let i=0; i<rows; i++){
    let row = [];
    for(let j=0; j<close; j++){
        row.push([]);
    }
    graphAdjacencyMatrix.push(row);
}

// function isCyclic(graphAdjacencyMatrix){
//     let visited = [];
//     let dfsVisited = [];

//     for(let i=0; i<rows; i++){
//         let visitedRow = [];
//         let dfsRow = [];
//         for(let j=0; j<cols; j++){
//             visitedRow.push(false);
//             dfsRow.push(false);
//         }
//         visited.push(visitedRow);
//         dfsVisited.push(dfsRow);
//     }

//     for(let i=0; i<rows; i++){
//         for(let j=0; j<cols; j++){
//             if(visited[i][j] == false){
//                 let response = dfsCycleDetection(graphAdjacencyMatrix, i, j, visited, dfsVisited);
//                 if(response == true) return true;
//             }
//         }
//     }

//     return false;
// }

// function dfsCycleDetection(graphAdjacencyMatrix, i, j, visited, dfsVisited){
//     visited[i][i] = true;
//     dfsVisited[i][j] = true;

//     for(let children=0; children<graphAdjacencyMatrix[i][j].length; children++){
//         let [crid, ccid] = graphAdjacencyMatrix[i][j][children];
//         if(visited[crid][ccid] === false){
//             let response = dfsCycleDetection(graphAdjacencyMatrix, crid, ccid, visited, dfsVisited);
//             if(response === true) return true;
//         }
//         else if(visited[crid][ccid] === true && dfsVisited[crid][ccid] === true) return true;
//     }

//     dfsVisited[i][j] = false;
//     return false;
// }