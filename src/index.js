module.exports = function getZerosCount(number, base) {
  /* Links wich i used:
                      https://math.stackexchange.com/questions/1563986/factorials-in-different-base
                      http://mathforum.org/library/drmath/view/55723.html
                      https://tehnoshell.ru/news/itkpi/marsianskie-faktorialyi/
                      https://tproger.ru/problems/how-many-zeros-at-the-end-of-the-factorial-of-100/
                      https://ru.wikipedia.org/wiki/Факториал#.D0.A0.D0.B0.D0.B7.D0.BB.D0.BE.D0.B6.D0.B5.D0.BD.D0.B8.D0.B5_.D0.BD.D0.B0_.D0.BF.D1.80.D0.BE.D1.81.D1.82.D1.8B.D0.B5_.D1.87.D0.B8.D1.81.D0.BB.D0.B0
                      https://ru.wikipedia.org/wiki/Решето_Эратосфена                      
  */
  

  function countSum( powN ){
    var result = 0, step = 1;
    while( Math.pow(powN, step) < number ){
      result += Math.floor(number / Math.pow(powN, step));
      step++;
    }    
    return result;
  }

  // This function is looking for a bigger prime number wich include to a part of number
  function searchZero( number ){    
    // I`m using 'Решето Эратосфена'
    var arr = [], p = 2;

    // start find prime number
    for( var i = 0; i <= number; i++ ){
        arr[i] = i;
    }      
    var j = 1; 
    arr[0] = false;
    arr[1] = false; 
    do{
        if( arr[j] != false ){
            p = arr[j];
            for( var i = p + p; i <= number; i += p ){
                arr[i] = false;
            }
        }
        j++;
    }while( p*p <= number );
    // search prime number finish

    var arrPrimeNum = [];

    for( var i = 0; i < arr.length; i++ ){
      if( arr[i] != false && number % arr[i] == 0 ){
        arrPrimeNum.push( arr[i] );
      }
    }   

    var counts = [];

    for( var i = 0; i < arrPrimeNum.length; i++ ){
      var rest = number, count = 0;
      while( rest % arrPrimeNum[i] == 0 ){      
        rest = rest/arrPrimeNum[i];
        count++;
      }
      counts.push(Math.floor(countSum(arrPrimeNum[i])/count));
    }
    
    return Math.min.apply(null, counts);
  }

  return searchZero(base);
}