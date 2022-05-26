'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//const movements=[200, 450, -400, 3000, -650, -130, 70, 1300]
//movements.forEach(function(mov, i){//mov -current element
 // console.log(`${mov} , ${i}`);


  
//});




//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

 const displayMovements = function(movements, sort=false)
 {
   containerMovements.innerHTML = '';//clear all movements at the begining
  // var dt = new Date();
//document.getElementById('date-time').innerHTML=dt;
 const movs = sort ? movements.slice().sort((a,b)=>a-b):movements;
 movs.forEach(function (mov, i){//mov -current element; movements - an array with value
 const type = mov > 0 ? 'deposit': 'withdrawal';
 const html =`
  <div class="movements__row">
           <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__date">2 days ago</div>
            <div class="movements__value">${mov}</div>
          </div>`;

     containerMovements.insertAdjacentHTML('afterbegin', html);

  });
};
  //time
  var dt = new Date();
  document.getElementById('date-time');
  document.write(new Date().getFullYear());
//displayMovements(account1.movements);
//create user names abbreviation
const createUserNames = function (arr_with_accounts) {

  //abbreviation
  arr_with_accounts.forEach(function(one_acc){
    one_acc.username = one_acc.owner
    .toLowerCase()
    .split(' ')
    //Arrow function
    .map(name => name[0])
    
    .join('');
    //return username;
  })
  //const user = 'Steven Thomas Williams'; //i need stw
  //const username = user
    
}
createUserNames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  //display movements
  displayMovements(currentAccount.movements);
    // display balance
    calcDisplayBalance(currentAccount);
    //display summary
    calcDisplaySummary(currentAccount);
}
const calcDisplayBalance =function(acc){
   
  acc.balance = acc.movements.reduce((acc, mov)=>acc + mov, 0);
  labelBalance.textContent=`${acc.balance} PLN`;
}
//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc){
  //incomes
  const incomes = acc.movements
  .time(console.log(time_ago(new Date(Date.now()))))
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov,0 );
  labelSumIn.textContent = ` ${incomes} pln`;
//outcomes
const outcomes = acc.movements
.time(console.log(time_ago(new Date(Date.now()))))
.filter(mov => mov < 0)
.reduce((acc, mov) => acc + mov,0 );
labelSumOut.textContent = ` ${outcomes} pln`;
//intrest 1.2% of deposited amount of money
const interest = acc.movements
.time(console.log(time_ago(new Date(Date.now()))))
.filter(mov => mov > 0)
.map(deposit => (deposit * acc.interestRate/100))
.reduce((acc, inter)=>acc + inter,0);
labelSumInterest.textContent = ` ${interest}pln`;
}

//calcDisplaySummary(account1.movements);

let currentAccount;
btnLogin.addEventListener('click', function(e){
  //prevent form from permitting
  e.preventDefault();
  currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount.pin===Number(inputLoginPin.value)){
    console.log('LOGIN OK');
    //display UI and welcome message
     labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
     containerApp.style.opacity=100;
    updateUI(currentAccount);

    //clear input fields
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();
  }
})
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc =accounts.find(
    acc=> acc.username===inputTransferTo.value
  );
  
  //console.log( amount ,receiverAcc);
  //check if u have enough money
  // transfer
  inputTransferAmount.value =inputTransferTo.value='';
  if(amount>0 &&
    receiverAcc &&
    currentAccount.balance>=amount &&
    receiverAcc?.username !== currentAccount.username){
      //console.log('transfer valid');
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      updateUI(currentAccount);

    }

});
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(
    amount >0 &&
    currentAccount.movements.some(mov =>mov>= amount * 0.1)
     
  ){
     
    currentAccount.movements.push(amount);
    updateUI(currentAccount);

  }

})

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  //console.log('close...')
  if(
    inputCloseUsername.value===currentAccount.username && Number(inputClosePin.value)===currentAccount.pin
    ){
    //1. find index
    const index= accounts.findIndex(acc => acc.username ===currentAccount.username);
    console.log(index);

    //2.delete acc
    accounts.splice(index, 1)
    //3.hide ui
    containerApp.style.opacity=0;
  }
  inputCloseUsername.value = inputClosePin = '';
})
let sorted= true;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,sorted);
  sorted= !sorted //we have an option of interchanging between sorted and not sorted
})
 


//the find method
/*const firstWithdrawal = movements.find(mov=>mov<0);
console.log(movements);
console.log(firstWithdrawal);
const account = accounts.find(acc => acc.owner==='Jessica Davis');
console.log(account);
*/
 
/*createUserNames(accounts)
console.log(accounts);

const deposits = movements.filter(function (mov){
  return mov >0;
});
console.log(movements);
console.log(deposits);

 //2.0
const arr=[];
for(const mov of movements){
  if(mov>0)arr.push(mov);
}
console.log(arr);

const withdrawals=movements.filter(mov => mov<0);
console.log(withdrawals);

//reduce

//accumulator = snowball

//cur -current i
const balance = movements.reduce(function(acc,cur, i, arr){
  console.log(`Iteration ${i}: ${acc}`);
  return acc +cur
}, 0);
console.log(balance);
const balance2 = movements.reduce((acc,cur)=>acc+cur,0);
console.log(balance2);
/*const euro =[10,20,30]
const euroToUsd = 1.1;
const newArrayUsd = euro.map(function(currentElement)
{
  return currentElement * euroToUsd;
})
console.log(euro);
console.log(newArrayUsd);
//option2
const newArrayUsd2 =[];
for(const ce of euro)
newArrayUsd2.push(ce*euroToUsd);
console.log(newArrayUsd2);
 
// =>arrow function
const newArrayUsd3 = euro.map(ce => ce * euroToUsd);
console.log(newArrayUsd3);

const descriptionArray =euro.map((ce,i,arr )=>{
if(ce>0) {
  return`current element nr ${i+1} has value = ${ce}`;}
  else {return`current element nr ${i+1} has value [withdrew] = ${ce}`;}

});
console.log(descriptionArray);
 

const descriptionArray2 =euro.map((ce,i,arr )=>
  `current element nr ${i+1} has value ${ce>0 ? `${ce}`: ` [withdrew]=${ce}`
}`

);
console.log(descriptionArray2);

*/
function time_ago(time) {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

var aDay = 24 * 60 * 60 * 1000;
console.log(time_ago(new Date(Date.now() - aDay)));
console.log(time_ago(new Date(Date.now() - aDay * 2)));
console.log(time_ago(new Date(Date.now())));