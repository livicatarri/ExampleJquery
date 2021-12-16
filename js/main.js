

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";

script.onreadystatechange = handler;
script.onload = handler;

// Fire the loading
head.appendChild(script);

function handler(){
    console.log('jquery added');
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' ;
    return time;
  }
 function formtime(unix_timestamp){

    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);
    return formattedTime;
 }
var url = `https://api.openweathermap.org/data/2.5/onecall?lat=55.9496&lon=37.5018&exclude=current,minutely,hourly,alerts&appid=614843b8a4f168af62a836555cc7ee28&lang=ru&units=metric`;

    $.getJSON(url).then(function(data) {
    console.log(data);
    for (let i=0; i < 8; i++){
    let j=data.daily[i].feels_like.night;//температура как ощущается ночью
    let q=data.daily[i].temp.night;// температура ночью
    var o=1000000;//разница температур, для поиска минимальной задается разница точно больше всех возможных
    var g=0;// счетчик для проверки i
        if((j>q)&&(o>j-q)){
            o=j-q;
            g=i;
            var p=data.daily[i].dt;//дата дня, в котором разница температур наименее ощутима
        } else if((j<q)&&(o>q-j)){
            o=q-j;
            g=i;
            var p=data.daily[i].dt;
        }
    }
    console.log("Разница температуры ночью и ощутимой температрой ночью (градусы Цельсия)", o);
    console.log("Какой по счету из 7 дней", g);
    console.log("Дата дня, в котором разница температур наименее ощутима",  timeConverter(p));

    for (let i=0; i < 5; i++){
        let j=data.daily[i].sunrise;// время рассвета
        let h=data.daily[i].sunset;//время заката
        var m=0;//продолжительность солнечного дня
        var k=0;//счетчик дней для проверки i    
        if (m<h-j){
            m=h-j;
            k=i;
            var n=data.daily[i].dt;//дата самого солнечного дня
        }
}; 

    console.log("Длительность самого солнечного дня", formtime(m));
    console.log("Какой день из 5 по счету:", k);
    console.log("Дата дня", timeConverter(n));

    document.querySelector('.night').innerHTML =o;
    document.querySelector('.night__date').innerHTML = timeConverter(p);
    document.querySelector('.sun').innerHTML = formtime(m);
    document.querySelector('.sun__date').innerHTML = timeConverter(n);

})


