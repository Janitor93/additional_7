module.exports = function solveSudoku(matrix) {
  let validate = false;
  let column = 0;
  let row = 0;
  let square = 0;
  let values = [];
  for(row; row < 9; row++) {
    column = 0;
    for(column; column < 9; column++) {
      if(matrix[row][column] !== 0) {
        continue;
      } else {
        let value = 1;
        matrix[row][column] = value;
        while(!validateSudoku(matrix, row, column)) {
          value += 1;
          if(value > 9) {
            do {
              matrix[row][column] = 0;
              let lastValue = values.pop();
              row = lastValue.cordinates.row;
              column = lastValue.cordinates.column;
              value = lastValue.value + 1;
            } while(value == 10);
          }
          
          matrix[row][column] = value;
        }
        values.push({
          'cordinates': {
            'row': row,
            'column': column
          },
          'value': value
        });
      }
    }
  }
  return matrix;
}

function validateSudoku(matrix, row, column) {
  return checkRow(matrix[row]) && checkColumn(matrix, column) && checkSquare(matrix, row, column);
}

function checkRow(row) {
  return row.every((el, i, self) => {
    if(el === 0) return true;
    return self.indexOf(el) === self.lastIndexOf(el);
  });
}

function checkColumn(matrix, column) {
  let arColumn = [];
  for(let row = 0; row < 9; row++) {
    arColumn.push(matrix[row][column]);
  }
  return arColumn.every((el, i, self) => {
    if(el === 0) return true;
    return self.indexOf(el) === self.lastIndexOf(el);
  });
}

function checkSquare(matrix, row, column) {
  let squareX = parseInt(column / 3) * 3;
  let squareY = parseInt(row / 3) * 3;
  let arSquare = [];
  let countX = squareX + 3;
  let countY = squareY + 3;
  for(squareX; squareX < countX; squareX++) {
    squareY = parseInt(row / 3) * 3;
    for(squareY; squareY < countY; squareY++) {
      arSquare.push(matrix[squareY][squareX]);
    }
  }
  return arSquare.every((el, i, self) => {
    if(el === 0) return true;
    return self.indexOf(el) === self.lastIndexOf(el);
  });
}