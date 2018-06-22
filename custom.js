// JavaScript Document
function searchvideo(q) {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("searchitemlist").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","module/searchbar.core.php?keyword="+q,true);
  xmlhttp.send();
 
} 
//Load truyện
function loadchapter(q) {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("load_truyen").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","module/home_story_loader.php?chapterid="+q,true);
  xmlhttp.send();
 
} 


//Topplayer
function playvideoonclick(str,mode) {
  if (str=="") {
    document.getElementById("toplay").innerHTML="";
    return;
  } 
    // Save it!
 
		  if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		  } else { // code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		  xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			  document.getElementById("toplay").innerHTML=xmlhttp.responseText;
			}
		  }
		  xmlhttp.open("GET","video_iframe_play_xl.php?ep="+str,true);
		  xmlhttp.send();
		}
/*
function home_iframe_click1() {
	document.getElementById("home_iframe1").contentWindow.document.body.onclick = function() {
		myApp.alert('Tập phim chưa có phụ đề tiếng Việt', 'Thông báo!');
	}
}
*/
function update_ep_new() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("topnew").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","module/home_top_new.php",true);
  xmlhttp.send();
 
} 


//lấy avatar tự động
function getnewavt() {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("avt_module").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","module/xl_avatar.php",true);
  xmlhttp.send();
 
}