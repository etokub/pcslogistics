// const printing = document.getElementById('printDiv').innerHTML;
// Vue.mixin({
//   methods: {
//     print () {
//          var value = document.getElementById('printDiv').innerHTML;
//       this.print = value;
//        this.$nextTick(() => {
//     window.print();
//   });
//     }
//   }
// })


Vue.component('v-select', VueSelect.VueSelect);


var app = new Vue({
	el: '#app',
  data: {
  	time: '',
  	time2: '',
    time3 : new Date().toISOString(),
    time4: '',
    time5: '',
    time6: '',
    docNum: '',
    sender: [],
    senders: [],
    receiver: {center_name: '', city: '', address: '', phone: '', person:'' },
    receivers: [],
    car: '',
    cars: [],
    driver: '',
    drivers: [],
    service: '',
    services: [],

    crr: '',
    crr_list: ["TMM","DHL"],
    crr_data: '',
    crr_num: '',
    crr_service: '',
    crr_service_list: ["Звичайна доставка","Спеціальний сервіс"],
    crr_customer: '',
    crr_extra: '',
    crr_cargo: '',
    crr_items: '',
    crr_temp: '',
    crr_logger: '',
    crr_docs: '',
    crr_sender: [],
    crr_receiver: [],

    ie_service: '',
    ie_service_list: ["Імпорт","Експорт"],
    ie_status: '',
    ie_status_list: ["Очікує","Затвердження","Відправлено","Декларування","На доставці"],
    ie_custom: '',
    ie_custom_list: ["Так","Ні"],
    ie_customer: '',
    ie_customer_list: ["Парексел - Україна","АстраЗенека - Україна", "PCS"],
    ie_awb: '',
    ie_invoice: '',
    ie_depo: '',
    ie_depo_list: ["Медикор","Фармасофт","PCS"," С.М.О.","Парексел - Україна", "Інше"],
    ie_point: '',
    ie_point_list: ["KBP","IEV"],
    ie_cargo: '',
    ie_pcs: '',
    ie_weight: '',
    ie_price: '',
    ie_currency: '',
    ie_currency_list: ["USD","EUR","GBP","PLN"],
    ie_comment: '',

    price: '',
    prices: [],
    price_oil: 0,
    amount_oil: 0,
    customer:'',
    customers:[],
    customerRole: '',
    showSenderEdit: false,
    showReceiverEdit: false,
    docNumEdit: false,
    showPricing: false,
    showDemo: false,
    showPrint: false,
    showConfirm: false,
    activeToggleShowDocPrint: false,
    docDate:'',
    docDocs: '',
    docInfo: '',
    dataloggers: '',
    distance: 0,
    delPoints: 0, /*box*/
    delPointsPrice: 200,
    extra_costs: 0,
    price_km_unit: 0,
    work_time: 0,
    price_time_unit: 0,
    diesel_pricing: [],
    diesel: '',
    cargoRows: [{
      box: '',
      descr: '', 
      temp: '', 
      items: '', 
      weight: '', 
      height: '', 
      width: '', 
      lenghts: '', 
      amount: '',
    }],
    cargoDescr: ["Лабораторні набори",
    "Документи", 
    "Медикаменти", 
    "Обладнання", 
    "Використані медикаменти", 
    "Невикористані медикаменти",
    "Медичні відходи, що утворюються після проведення клінічних досліджень.(залишки медичних хімічних препаратів, невикористані хіміо препарати) АДР клас 6.2. кат.B; OOH3291",
    "Друкована продукція",
    "Інше",
    ],
    cargoTemp:[
    "Відсутній",
    "+2..8",
    "+15..25",
    "+2..25",
    "+8..15",
    ],
    point_d_begin: '',
    point_d_end: '',
    point_o_begin: '',
    point_o_end: '',
    point_z_begin: '',
    point_z_end: '',
    point: [],
    name: '',
    employees: [
    ]
  },
  methods:{
   do_print() {
    var num = document.getElementById('docNum').value;
    var divToPrint = document.getElementById('printDiv');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head><title>'+num+'</title><link href="assets/css/main.css" rel="stylesheet" type="text/css" /> <link href="assets/css/libs.css" rel="stylesheet" type="text/css" /></head><body onload="window.print()">' + divToPrint.innerHTML +  '</body></html>');
    newWin.document.close();
    setTimeout(function() {
      newWin.close();
    }, 10);
  },
  addNew: function () {
    var item = {};
    item.point = this.point;
    this.employees.push({
      point: this.point,
    });
    this.point = '';
  },


  removeItem: function (index) {
    this.employees.splice(index, 1)
  },

  prices_units(){
    this.price_km_unit = this.price.price_km
    this.price_time_unit = this.price.price_time
  },

  diesel_unit(){
    var l = this.diesel_pricing.length;

    var temp = this.diesel_pricing;
    const a = JSON.stringify(temp);
    var b = JSON.parse(a);

    var popped = Array.prototype.pop.call(b)
    var keys = Object.keys(popped);
    keys.sort();
         var lastkey = keys.pop() // c
         var lastvalue = popped[lastkey]
         this.diesel = lastvalue

         return lastvalue
       },

       priceDistance() {
        let a = this.price_km_unit;
        let km = this.distance*1;

        let d = this.diesel

        this.amount_oil = ((( km * 0.1).toFixed(2)) || 0);
        this.price_oil = (((( km * 0.1) * (d)).toFixed(2)) || 0);

        if (((a * km) < this.price.price_min)){
         return (((this.price.price_min).toFixed(2))|| 0)
       } 
       else if (((a * km) >= this.price.price_min)){
         return (((a * km).toFixed(2))|| 0)
       } 
       else {
         return 0
       }

     },

     workPrice:function(){
      var st = this.time;
      var et = this.time2;
      var a = new Date(st);
      var b = new Date(et);
      var difference = ((b - a) || 0) ; 
      var minutesDifference = difference / (60000); 
      var pointsNum = this.delPoints;
      var pointsTime = ((pointsNum * 15) + 15);
      var cleanWorkPrice = minutesDifference - 240;

      var time = (((cleanWorkPrice / (60)).toFixed(2)) || 0);


      roundTime = (Math.ceil(time*2)/2);
      

      this.work_time = roundTime;

      workPrice = ((((this.work_time)*(this.price_time_unit)).toFixed(2)) || 0);

      if (workPrice < 0){
       return 0
     } else {
       return workPrice
     };

   },

   workAmount:function(){
    var a = parseFloat(this.workPrice());
    b = this.price.price_time;
    return (((a/b).toFixed(2)) || 0)
  },	

  price_box: function(){
    let z = this.delPoints;
    price_box = this.delPoints * this.delPointsPrice;
    return price_box
  }, 

  price_total(){
    let x = parseFloat(this.priceDistance());
    let y = parseFloat(this.workPrice());
    let z = parseFloat(this.price_box());
    return (((x + y + z).toFixed(2)) || 0)
  },

  price_vat (){
    let tp = this.price_total();
    return ((tp * 0.16667).toFixed(2) || 0)
  },

  price_clean (){
    return (((this.price_total() - this.price_vat() - this.price_oil).toFixed(2)) || 0)
  },

  setDocNum (){
    var d = new Date(),
    now = new Date(this.time3),
    y = (now.getFullYear() - 2000),
    fy =  (now.getFullYear()),
    mn = addZero((now.getMonth()+1), 2),
    dt = addZero(now.getDate(), 2),
    rand = Math.floor(Math.random()*10),
    ms = addZero(d.getMilliseconds(), 3),
    num = [y] + [mn] + [dt] +' '+ [rand] + [ms];
    document.getElementById('docNum').value = num;
    this.docNum = num,
    this.docDate = [fy] + '-' + [mn] + '-' + [dt];
    document.title = num;
    console.log(num)
  },
  timePointConvert(){
    var st = this.time4;
    var et = this.time5;
    var a = new Date(st);
    var b = new Date(et);
    var c = (a.toLocaleDateString());
    var d = (b.toLocaleDateString());
    this.point_d_begin = c;
    this.point_d_end = d;

    var ct = this.time6;
    var e = new Date(ct);
    var f = (e.toLocaleDateString());
    this.crr_data = f;
  },

  calendarClose:function(){
    this.time3 = '';
    this.docNum = '';
  },

  docNumClose:function(){
    this.docNum = '';
  },
  senderClose:function(){
    this.sender = {center_name: '', city: '', address: '', phone: '', person:'' };
  },               
  receiverClose:function(){
    this.receiver = {center_name: '', city: '', address: '', phone: '', person:'' };
  },
  carClose:function(){
    this.car = '';
  },
  serviceClose:function(){
    this.service = '';
  },
  calc_serviceClose:function(){
    this.price = '';
  },
  driverClose:function(){
    this.driver = '';
  },
  customerClose:function(){
    this.customer = '';
  },
  toggleSenderEdit: function(event){
    this.showSenderEdit = !this.showSenderEdit
  },
  toggleReceiverEdit: function(event){
    this.showReceiverEdit = !this.showReceiverEdit
  },
  toggleDocNumEdit: function(){
    this.docNumEdit = !this.docNumEdit
  },
  toggleShowPricing: function(){
    this.showPricing = !this.showPricing
  },
  toggleShowDemo: function(){
    this.showDemo = !this.showDemo
  },
  toggleShowPrint: function(){
    this.showPrint = !this.showPrint
  },
  toggleShowConfirm: function(){
    this.showConfirm = !this.showConfirm
  },	
  docNumClear: function(){
    var box = document.querySelector(".docNum");
    document.addEventListener("click", function(event) {
     if (event.target.closest(".docNum")) return;
     box.classList.remove("active");
   });
  },
  crrClear: function(){
    this.time6 = '';
    this.crr = '';
    this.crr_data = '';
    this.crr_num = '';
    this.crr_service = '';
    this.crr_customer = '';
    this.crr_extra = '';
    this.crr_cargo = '';
    this.crr_items = '';
    this.crr_temp = '';
    this.crr_logger = '';
    this.crr_docs = '';
    this.crr_sender = [];
    this.crr_receiver = [];
  }, 
  ieClear: function(){
    this.ie_service = '';
    this.ie_status = '';
    this.ie_custom = '';
    this.ie_customer = '';
    this.ie_awb = '';
    this.ie_invoice = '';
    this.ie_depo = '';
    this.ie_point = '';
    this.ie_cargo = '';
    this.ie_pcs = '';
    this.ie_weight = '';
    this.ie_price = '';
    this.ie_currency = '';
    this.ie_comment = ''; 
    
  }, 
  addCargoRow: function(){
    this.cargoRows.push(
    {
     box: '',
     descr:'', 
     temp: '', 
     items: '', 
     weight: '', 
     height: '', 
     width: '', 
     lenghts: '', 
     amount: '',
   });
  },
  lenghtsCargoRows: function(){
    var l = this.cargoRows.length;
    var b = document.getElementById("addCargoRow");
    if (l >=5){ 
     b.classList.add("disabled");		
   }	else {
     b.classList.remove("disabled");		
   }

 },
 deleteCargoRow(index) {
  this.cargoRows.splice(index,1)
},

deleteCargoRows: function() {
  var l = this.cargoRows.length;
  for (let i in this.cargoRows) {
    this.cargoRows.splice([i]);
  };
  this.cargoRows.push(
  {
   box: '',
   descr:'', 
   temp: '', 
   items: '', 
   weight: '', 
   height: '', 
   width: '', 
   lenghts: '', 
   amount: '',
 });


},
fixed2 (val) {
  return val.toFixed(2);
},
fixed3 (val) {
  return val.toFixed(3);
},

clearDoc: function(){
 this.dataloggers = '';
 this.docDocs = '';
 this.docInfo = '';

},
getJokes: function () {
  let r1  = "https://script.google.com/macros/s/AKfycbwnf351vBdwZkaorgbTcfX1RbiqWtFV73M5pvjwpC_Fviyyvuaq/exec"
  const request_1 = axios.get(r1);
  axios
  .all([request_1])
  .then(
    axios.spread((...responses) => {
     const response_1 = responses[0];
     console.log(response_1);
     this.senders = response_1.data
     this.receivers = response_1.data
   })
    )
  .catch(errors => {
    console.log(errors);
  });
},
},
beforeMount(){
 this.setDocNum()

},

computed: {
 sum_items() {
  return this.cargoRows.reduce(function(sum, el) {
   return sum += +(el.items)
 }, 0)
},

sum_weight() {
  return this.cargoRows.reduce(function(sum, el) {
   return sum += +(el.weight).replace(",", ".");
 }, 0);
},
sum_amount() {
  return this.cargoRows.reduce(function(sum, el) {
   return sum += +(el.amount)
 }, 0)
},
},
mounted: function f1(){
 let r1 	= "https://script.google.com/macros/s/AKfycbwnf351vBdwZkaorgbTcfX1RbiqWtFV73M5pvjwpC_Fviyyvuaq/exec"
 let r2 	= "https://script.google.com/macros/s/AKfycbwBmVjKb9w3JTHIpO2l_cQHEnU-9eQIOip2g8jdI02by82JPhOp/exec"
 let r3 	= "https://script.google.com/macros/s/AKfycbwYahXdyjfsafgOrx1NBpuhsK4AcQ6ET9PIGXi2tVXDXdeNdZBX/exec"
 let r4 	= "https://script.google.com/macros/s/AKfycbzD3n-je1AjiDcn3sV7QZC8fi6pXtmOPQhbv7sj0q-STJ6n784/exec"
 let r5 	= "https://script.google.com/macros/s/AKfycbyzqzyFESeD7jqu8jSFAwQVxrHM9hpSksvxEU4HB7KHDlf8W8w/exec"
 let r6  = "https://script.google.com/macros/s/AKfycbyIiO99aZBg2iDwroO_JWBIgsVOWxbv-hyA55B7jEJuOn4wiHTO/exec"
 const request_1 = axios.get(r1);
 const request_2 = axios.get(r2);
 const request_3 = axios.get(r3);
 const request_4 = axios.get(r4);
 const request_5 = axios.get(r5);
 const request_6 = axios.get(r6);
 axios
 .all([request_1, request_2, request_3, request_4, request_5, request_6])
 .then(
  axios.spread((...responses) => {
   const response_1 = responses[0];
   const response_2 = responses[1];
   const response_3 = responses[2];
   const response_4 = responses[3];
   const response_5 = responses[4];
   const response_6 = responses[5];

   console.log(response_1, response_2, response_3, response_4, response_5, response_6);
   this.senders = response_1.data
   this.receivers = response_1.data
   this.services = response_2.data
   this.prices = response_2.data
   this.cars = response_3.data
   this.drivers = response_4.data
   this.customers = response_5.data
   this.diesel_pricing = response_6.data

   this.diesel_unit()
 })
  )
 .catch(errors => {
  console.log(errors);
});

},


})

