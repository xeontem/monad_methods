var identity = x => x;
var compose = f => g => x => f(g(x));
var apply = f => x => f(x);
asdasdasdasd
var W = x => y => x(y)(y);// duplicator
var K = x => y => x; // cancelator
var C = f => a => b => f(b)(a);// permutator(flip)
var I = x => x; // identity
var B = f => g => x => f(g(x));// compositor
var S = f => x => z => f(z)(x(z)); // connector
var Y = f => f(x => Y(f)(x));//

 
var add = a => b => c => a+b+c;

var X = f => x => z => f(f(x))(z);


var arr = [{apple: 1}, {apple: 2}, {apple: 3}];
var sum = arr.map(o => add(o.apple));
//---------------------- lifting ---------------------
ArrayLifting = {
  //:: (a -> b) -> m a -> m b
  map: f => tA => [f(tA[0])],
  apply: aF => tA =>  [aF[0](tA[0])],
  // tA -> A
  maybe: f => tA => f(tA[0]),
  // ttA -> tA
  flatten: ttA => ArrayLifting.maybe(identity)(ttA),
  // :: (a -> m b) -> m a -> m b; 
  flatMap: f => tA => ArrayLifting.flatten(ArrayLifting.map(f)(tA)),
  //   flatMap2: f => tA => tB => ArrayLifting.flatten(ArrayLifting.lift2(f)(tA)(tB)),
  //   flatMap2: compose(compose(compose(ArrayLifting.flatten)))(apply(apply(ArrayLifting.lift2))),
  //                f => f(f)   
  // compose(compose(f)(g)) == compose(f)(g) 
  //:: (a -> b -> m c) -> m a -> m b -> m c;
  //   flatMap2: x => compose(compose(compose)(compose)(ArrayLifting.flatten))(ArrayLifting.lift2)(x),
//   flatMap2: f => tA => tB => ArrayLifting.flatMap(ArrayLifting.flatMap(f)(tA))(tB),
  flatMap2: f => compose(compose(ArrayLifting.flatMap))(ArrayLifting.flatMap)(f),
  lift1: x => ArrayLifting.map(x),
  lift2: f => tA => ArrayLifting.apply(ArrayLifting.map(f)(tA)),  
  lift3: f => tA => tB => ArrayLifting.apply(ArrayLifting.lift2(f)(tA)(tB))  
  //   lift2: X(compose)(ArrayLifting.apply)(ArrayLifting.map),
  //   lift3: compose(X(compose)(ArrayLifting.apply))(X(compose)(ArrayLifting.apply)(ArrayLifting.map))
    
};
//----------------------------------------------------

var temp = [[{apple: 1}], [{apple: 2}], [{apple: 5}]];

var addS = o => o.apple + 'S';
var addSA = o => [o.apple + 'S'];

var sum2Apples = o1 => o2 => o1.apple + o2.apple;
var sum2ApplesA = o1 => o2 => [o1.apple + o2.apple];

var sum3Apples = o1 => o2 => o3 => o1.apple + o2.apple + o3.apple;

var tryMap = temp.reduce((acc, o) => acc(o), sum3Apples);
var res = ArrayLifting.flatMap(addSA)(temp[0]);
var res2 = ArrayLifting.flatMap2(sum2ApplesA)(temp[0])(temp[1]);
// var res3 = ArrayLifting.lift3(sum3Apples)(temp[0])(temp[1])(temp[2]);
console.log(res2);

