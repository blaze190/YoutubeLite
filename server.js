function Videoselect(value){
    $.getJSON('https://my-json-server.typicode.com/Campstay/youtube-test/videos', function(data) {
        console.log(data);
        console.log(value);
        var json = data.filter(function(data){
            return data.id == value;
        });
        console.log(json);
        var userId = json[0].userId;
        var title = json[0].title;
        var web = json[0].url;
        var desc = json[0].description;
        var timestamp = json[0].uploadedAt;
        var correct = dateconvert(timestamp);
        console.log(desc);
        videoupdate(title, web);
        setup(desc, correct,userId);
        comments(value);
    });
}
function comments(vidvalue){
    var container = document.getElementById("container");
    if(container.hasChildNodes){
        document.getElementById("container").innerHTML = "";
    }
    $.getJSON('https://my-json-server.typicode.com/Campstay/youtube-test/comments', function(data) {
        console.log(data);
        console.log(vidvalue);
        var json = data.filter(function(data){
            return data.videoId == vidvalue;
        });
        for( var i = 0; i < json.length; i++){
            var userId = json[i].userId;
            var time = json[i].date;
            var correct = dateconvert(time);
            var comment = json[i].body;
            createcomments(userId, correct, comment);
        }
    });
}
function videoupdate(title, url){
    var heading = document.getElementById('title').innerHTML = title;
    var movie = document.getElementById('mini-tube');
    var mp4 = document.getElementById('mp4video');
    movie.pause();
    movie.setAttribute('title',title);
    mp4.setAttribute('src', url);
    movie.load();
    movie.play()
}
function setup(text,time,usernum){
    $.getJSON('https://my-json-server.typicode.com/Campstay/youtube-test/users', function(data) {
        console.log(data);
        console.log(usernum);
        var json = data.filter(function(data){
            return data.id == usernum;
        });
        var user = json[0].name;
        document.getElementById("user").innerHTML = user;
        document.getElementById("time").innerHTML = time;
        document.getElementById("description").innerHTML = text;  
    });

}
function createcomments(userId,time,comment){
    $.getJSON('https://my-json-server.typicode.com/Campstay/youtube-test/users', function(search) {
        console.log(search);
        var json = search.filter(function(search){
            return search.id == userId;
        });
        var name = json[0].name;
        var text = `${name}<br>
        ${time}<br>
        ${comment}<br><br>`
        var create = document.createElement("DIV");
        create.innerHTML = text;
        container.appendChild(create);
    });
}
function dateconvert(date){
    var startdate = new Date(date);
    year = startdate.getFullYear();
    month = startdate.getMonth()+1;
    dt = startdate.getDate();

    if (dt < 10) {
     dt = '0' + dt;
    }
    if (month < 10) {
     month = '0' + month;
    }
    var correct = dt+'-' + month + '-'+year
    return correct;
}
