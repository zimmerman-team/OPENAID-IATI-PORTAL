angular.module('oipa').filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
}).filter('openaidcurrency', function(numberFilter){

    return function(input, curSymbol, decPlaces, thouSep, decSep) {
      var curSymbol = curSymbol || "$";
      var decPlaces = decPlaces || 0;
      var thouSep = thouSep || ",";
      var decSep = decSep || ".";

      // Check for invalid inputs
      var out = isNaN(input) || input === '' || input === null ? 0.0 : input;

      //Deal with the minus (negative numbers)
      var minus = input < 0;
      out = Math.abs(out);
      out = numberFilter(out, decPlaces);

      // Replace the thousand and decimal separators.  
      // This is a two step process to avoid overlaps between the two
      if(thouSep != ",") out = out.replace(/\,/g, "T");
      if(decSep != ".") out = out.replace(/\./g, "D");
      out = out.replace(/T/g, thouSep);
      out = out.replace(/D/g, decSep);

      // Add the minus and the symbol
      if(minus){
        return "-" + curSymbol + out;
      }else{
        return curSymbol + out;
      }
    }
}).filter('shortcurrency', function(){

    return function(input, curSymbol) {
      var curSymbol = curSymbol || "$";
      var out = '';
      var minus = input < 0;
      var addDot = false;
      input = Math.abs(input);

      if(input > 999999999){
        out = (input / 1000000000).toFixed(2) + ' mld';
      } else if(input > 999999){
        out = (input / 1000000).toFixed(2) + ' mln';
      } else if(input > 1000){
        input = input.toFixed(0);
        addDot = true;
      }else {
        out = input.toFixed(0); 
      }
      // openaid -> comma's
      out = out.replace('.', ',');

      if(addDot == true){
        input = input.toString();
        out = input.substring(0, (input.length - 3)) + '.' + input.substring((input.length - 3), input.length);
      }

      if(minus){
        return "-" + curSymbol + out;
      } else{
        return curSymbol + out;
      }

    }
}).filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null){
      if(input.length < 6){ return input; }
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  }
});


