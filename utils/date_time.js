const months =[
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
];

const days =[
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
   
];

const date = new Date();
const month = date.getMonth();
console.log(months[month]);

const day = date.getDay()
console.log(days[day]);

console.log(date.getDate());
console.log(date.getFullYear());
console.log(date.getTime());

const currentDate = async ()=>{
   try{
     const sentence = `${days[day]},${date.getDate()}, ${months[month]}, ${date.getFullYear()}`
     console.log(currentDate)
   }
   
   
}
