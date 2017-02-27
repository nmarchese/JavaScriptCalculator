var buildCalc = function() {
  var $calcDiv = $('<div>');
  $('body').append($calcDiv);

  var $calcTable = $('<table>');
  $calcDiv.append($calcTable);

  var $tableHead = $('<thead>');
  $calcTable.append($tableHead);

  buildDisplay();

  var $tbody = $('<tbody>');
  $calcTable.append($tbody);

  buildRowsAndCells();

  assignListenersByClass();
};

var buildDisplay = function() {
  var $td = $('<td>');
  $td.attr('colspan','5');
  $td.attr('id','display');
  $('thead').append($td);

  var $screenForm = $('<form>');
  $td.append($screenForm);

  var $screenInput = $('<input>');
  $screenInput.attr('id','screen');
  $screenInput.attr('value', '0');
  $screenForm.append($screenInput);
};

var buildRowsAndCells = function() {
  for(var i = 0; i < 4; i++) {
    var $tr = $('<tr>');
    $tr.attr('id','row'+i);
    $('tbody').append($tr);
  }

  for(i = 7; i <= 9; i++) {
    $td = $('<td>');
    $td.addClass('number');
    $td.addClass('button');
    $td.attr('id',i);
    $('#row0').append($td);
  }

  for(i = 4; i <= 6; i++) {
    $td = $('<td>');
    $td.addClass('number');
    $td.addClass('button');
    $td.attr('id',i);
    $('#row1').append($td);
  }

  for(i = 1; i <= 3; i++) {
    $td = $('<td>');
    $td.addClass('number');
    $td.addClass('button');
    $td.attr('id',i);
    $('#row2').append($td);
  }

  $td = $('<td>');
  $td.attr('id','negative');
  $td.addClass('button');
  $('#row3').append($td);

  $td = $('<td>');
  $td.addClass('number');
  $td.addClass('button');
  $td.attr('id',0);
  $('#row3').append($td);

  $td = $('<td>');
  $td.attr('id','decimal');
  $td.addClass('button');
  $('#row3').append($td);

  for(i = 0; i < 4; i++) {
    $td = $('<td>');
    $td.addClass('operator');
    $td.addClass('button');
    $('#row'+i).append($td);
  }

  $td = $('<td>');
  $td.attr('id','clear');
  $td.addClass('button');
  $td.attr('rowspan',2);
  $('#row0').append($td);

  $td = $('<td>');
  $td.attr('id','sum');
  $td.addClass('button');
  $td.attr('rowspan',2);
  $('#row2').append($td);
};

var assignListenersByClass = function(){
  addNumberButtons();

  addOpButtons();

  addOtherButtons();
};



var addNumberButtons = function() {
  var $numberCells = $('.number');
  $numberCells.each(function(){
    $(this).text($(this).attr('id'));
    $(this).click(function(e){
      if($('#screen').attr('value') === '0') {
        $('#screen').attr('value','');
      }
      $('#screen').attr('value',$('#screen').attr('value') + $(this).attr('id'));
    });

    // var $button = $('<button>');
    // $button.attr('value',parseFloat($(this).attr('id')));
    // $button.text($(this).attr('id'));
    // $(this).append($button);
  });
};

var addOpButtons = function() {
  var $opCells = $('.operator');
  var operators = ['/','*','-','+'];
  // var operatorNames = ['divide','multiply','subtract','add'];
  var i = 0;
  $opCells.each(function(){
    $(this).text(operators[i]);
    $(this).attr('val',operators[i]);

    $(this).click(function(e){
      var displayText = '';
      var displayTextLast = '';
      if($('#screen').attr('value').length > 0) {
        displayText = $('#screen').attr('value');
        displayTextLast = displayText.slice(-1);
      }

      if(displayTextLast === '/' || displayTextLast === '*' ||
        displayTextLast === '+' || displayTextLast === '-') {
        $('#screen').attr('value',displayText.slice(0,-1));
      }
      $('#screen').attr('value', $('#screen').attr('value') + $(this).attr('val'));
    });
    i++;
  });
};

var addOtherButtons = function() {
  $negative = $('#negative');
  $negative.text('-/+');
  $negative.click(function(e){

  });

  $decimal = $('#decimal');
  $decimal.text('.');
  $decimal.click(function(e) {
    var displayText = '';
    if($('#screen').attr('value').length > 0) {
      displayText = $('#screen').attr('value');
    }
    // if(displayText.indexOf('.') === -1) {
      $('#screen').attr('value', $('#screen').attr('value') + '.');
    // }
  });

  var $clear = $('#clear');
  $clear.text('C');
  $clear.click(function(e){
    $('#screen').attr('value','0');
  });

  var $sum = $('#sum');
  $sum.text('=');
  $sum.click(function(e){
    var characters = $('#screen').attr('value').split("");
    var operators = [];
    var operands = [];
    var sum = 0;
    if (isNaN(parseFloat(characters[0]))){
      $('#screen').attr('value', 'Error');
      return;
    }
    var operand = '';
    for (var i = 0; i < characters.length; i++) {
      if(characters[i] !== '/' && characters[i] !== '*' &&
      characters[i] !== '-' && characters[i] !== '+') {
        operand = (operand + characters[i]);
      } else {
        operands.push(operand);
        operand = '';
        operators.push(characters[i]);
      }
    }
    operands.push(operand);
    // for (i = 0; i < operands.length; i++) {
      if(operands[1]) {
        // var op1 = ?
        if(operators[0] === '/'){
          sum = divide(operands[0],operands[1]);
        } else if(operators[0] === '*'){
          sum = multiply(operands[0],operands[1]);
        } else if(operators[0] === '-'){
          sum = subtract(operands[0],operands[1]);
        } else if(operators[0] === '+'){
          sum = add(operands[0],operands[1]);
        }
      }
    // }
    $('#screen').attr('value',sum);
  });
};

var divide = function(op1,op2) {
  return parseFloat(op1) / parseFloat(op2);
};
var multiply = function(op1,op2) {
  return parseFloat(op1) * parseFloat(op2);
};
var add = function(op1,op2) {
  return parseFloat(op1) + parseFloat(op2);
};
var subtract = function(op1,op2) {
  return parseFloat(op1) - parseFloat(op2);
};
