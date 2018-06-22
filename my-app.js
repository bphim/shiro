// Initialize your app
var myApp = new Framework7(
{
	modalButtonOk:'Đồng ý',
	modalButtonCancel:'Đóng',
	modalPreloaderTitle:'Đang tải...',
	modalUsernamePlaceholder:'Tên đăng nhập',
	modalPasswordPlaceholder:'Mật khẩu',
	modalTitle:'Thông báo',
	pushState: true,
}
);
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() 
{
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

function setIframe(iframeId, url)
{
    document.getElementById(iframeId).src = url;
  }
  
function openInNewTab(url) 
{
  var win = window.open(url, '_blank');
  win.focus();
}

function Opnepopup(data) {
var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p><a href="#" class="close-popup"><img src="img/gr_close.png" style="vertical-align:middle"> Đóng lại</a></p>'+data+
                    '</div>'+
                  '</div>';
 	myApp.popup(popupHTML);
}

function Opnsupport(ep,country,account,browser) {
var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p><a href="#" class="close-popup"><img src="img/gr_close.png" style="vertical-align:middle"> Đóng lại</a></p>'+
					  '<div style="text-align:justify"><b>Hướng dẫn bị lỗi khi xem phim</b><br>'+
					  '<p><b>1. Phương án đầu tiên</b><br> Nhóm đề xuất các bạn sử dụng trình duyệt <b>Google chrome</b> <img src="img/br_icon/Chrome.png" width="16" style="vertical-align:middle"> để tiện hướng dẫn các bạn nào dùng các trình duyệt khác thì các bạn tự tìm hiểu thêm.</p>'+
					  '<p><b>2. Hướng dẫn khắc phục các sự cố không xem phim được</b><br>'+
					  '<b>a. Không nên xem bằng cách mở link bằng facebook</b></p>'+
					  '<p>Rất nhiều bạn báo lỗi là bị lỗi phát do đang dùng trình duyệt tích hợp của Facebook. Trong tình huống bình thường thì bạn vẫn có thể xem được không vấn đề. Tuy nhiên nếu bị lỗi do bạn mở bằng Facebook thì hãy copy link và dán vào trình duyệt web Chrome</p>'+
					  '<div style="width:100%; text-align:center"><img src="img/help/a.png" style="vertical-align:middle; width:80%"></div><br>'+
					  '<b>b. Chọn chế độ Request Desktop Site</b></p>'+
					  '<p>Nếu bị lỗi bạn thử bỏ chọn/hoặc chọn lại. Nếu mà chọn tức là bạn đang ở chế độ desktop ngược lại là chế độ di động</p>'+
					  '<div style="width:100%; text-align:center"><img src="img/help/chrome.png" style="vertical-align:middle; width:80%"></div><br>'+
					  '<b>c. Thay đổi server khác và xem phụ đề tiếng Nhật</b></p>'+
					  '<p>Bạn xem hướng dẫn trong hình dưới đây</p>'+
					  '<div style="width:100%; text-align:center"><img src="img/help/changeview.png" style="vertical-align:middle; width:80%"></div><br>'+
					  '<b>d. Nếu vẫn không được bạn bấm vào đây để gửi yêu cầu hỗ trợ</b></p>'+
					  'Mẫu báo lỗi'+
					  '<table style="width:100%">'+
					  '<tr>'+
					  '<td>Người gửi: '+account+' </td>'+
					  '</tr>'+
					  '<tr>'+
					  '<td>Từ: Trình duyệt <img src="img/br_icon/'+browser+'.png" width="18" style="vertical-align:middle"> nước <img src="img/flat/'+country+'.png" width="18" style="vertical-align:middle"></td>'+
					  '</tr>'+
					  '<tr>'+
					  '<td><input type="button" value="Gửi" onclick="sendsupport()"></td>'+
					  '</tr>'+
					  '</table>'+
					  '<p><a href="#" class="close-popup"><img src="img/gr_close.png" style="vertical-align:middle"> Đóng lại</a></p>'+
					  '</div>'+
                    '</div>'+
                  '</div>';
 	myApp.popup(popupHTML);
}

function sendsupport(ep,country,account,browser){
$.post("module/support.php",
		{
			action:'video'
		}, function(data, status){
			if(data=='OK')
				myApp.alert('Đã gửi hỗ trợ thành công');
			});
	}
	
var HTTP_STATUS_CODES = 
{
        'CODE_200' : 'OK',
        'CODE_201' : 'Created',
        'CODE_202' : 'Accepted',
        'CODE_203' : 'Non-Authoritative Information',
        'CODE_204' : 'No Content',
        'CODE_205' : 'Reset Content',
        'CODE_206' : 'Partial Content',
        'CODE_300' : 'Multiple Choices',
        'CODE_301' : 'Moved Permanently',
        'CODE_302' : 'Found',
        'CODE_303' : 'See Other',
        'CODE_304' : 'Not Modified',
        'CODE_305' : 'Use Proxy',
        'CODE_307' : 'Temporary Redirect',
        'CODE_400' : 'Bad Request',
        'CODE_401' : 'Unauthorized',
        'CODE_402' : 'Payment Required',
        'CODE_403' : 'Forbidden',
        'CODE_404' : 'Not Found',
        'CODE_405' : 'Method Not Allowed',
        'CODE_406' : 'Not Acceptable',
        'CODE_407' : 'Proxy Authentication Required',
        'CODE_408' : 'Request Timeout',
        'CODE_409' : 'Conflict',
        'CODE_410' : 'Gone',
        'CODE_411' : 'Length Required',
        'CODE_412' : 'Precondition Failed',
        'CODE_413' : 'Request Entity Too Large',
        'CODE_414' : 'Request-URI Too Long',
        'CODE_415' : 'Unsupported Media Type',
        'CODE_416' : 'Requested Range Not Satisfiable',
        'CODE_417' : 'Expectation Failed',
        'CODE_500' : 'Internal Server Error',
        'CODE_501' : 'Not Implemented',
        'CODE_502' : 'Bad Gateway',
        'CODE_503' : 'Service Unavailable',
        'CODE_504' : 'Gateway Timeout',
        'CODE_505' : 'HTTP Version Not Supported'
    };
//Xử lí đăng nhập
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

var wrongLogin = false; // false at the beginning
var loggedIn = localStorage.loggedIn; // loggedIn connected to localStorage
function loginModal() { // naming the function
var modalText = wrongLogin ? '<span style="color:#f00">Sai thông tin đăng nhập</span>' : 'Nhập thông tin đăng nhập<br>Nhấn vào <a href="module/dangky.php">đây</a> để đăng ký'; // modalText if values not correct and default modalText
	var modalTitle = 'Đăng nhập';
    myApp.modalLogin(modalText, modalTitle, function(username, password){ // calling modalLogon
        myApp.showIndicator(); // show Loading Spinner
        $$.post(
            'module/check-login.php', // path to your PHP Login Check
            {username: username, password: password}, // passing the values of entered username and password
            function (response) { // function on response
                myApp.hideIndicator(); // hide Spinner
                if (response === '1') {
                    localStorage.loggedIn = 'istrue';
					var d = new Date();
					var t = d.getTime();
					location.reload();
					//mainView.router.loadPage('index.php?update='+t);
					// if credentials are correct "1" will be the response
					// set localStorage.loggedIn to "true" because everything was correct
					// then load the page "protected.html" (This is the insecure part)
                }
                else {
                    wrongLogin = true;
                    loginModal();
					// if credentials were wrong, set wrongLogin to true (this will change our modalText) and open loginModal again
                }
            }
        );
    });
}

$$('.login-modal').on('click', function () { // if click on class "login-modal" (our button)...
if (loggedIn  === 'istrue') { // and if loggedIn is set...
		var d = new Date();
		var t = d.getTime();
		location.reload();
		//mainView.router.loadPage('index.php?update='+t) // ...load protected.html
    }
    else { // if loggedIn is not set
        wrongLogin = false, // because we didn't made something wrong
        loginModal(); // open our loginModal
    }
});

function logout(){
localStorage.clear();
	//localStorage.loggedIn = 'false';
	var d = new Date();
	var t = d.getTime();
	//location.reload();
	location.href='module/logout.php?update='+t;
	//mainView.router.loadPage('module/logout.php?update='+t)
}
//Hiện thông báo
function refresh_login(){
var d = new Date();
	var t = d.getTime();
	//location.reload();
	//location.href='index.php?update='+t;
    // because we didn't made something wrong
    loginModal(); // open our loginModal
}
//Thông báo tập phim mới
function thongbaotapphimmoi(atitle,asutitle,amessage) {
myApp.addNotification(
{
        title: atitle,
        subtitle: asutitle,
        message: amessage,
        media: '<img width="44" height="44" style="border-radius:100%" src="img/favicon.png">',
        onClose: function () {
            update_ep_new();
        }
    });
	var audio = new Audio('sound/notification.mp3');
	audio.play();
}
//Thêm tài khoản mới 
//myApp.alert('Đã tạo tài khoản thành công<textarea>'+data+'</textarea>','Thông báo!');
function adduser()
{
	myApp.showIndicator('');
	$.post("module/register_pro.php",
	{
		txt_username: $("#txt_username").val(),
		txt_password: $("#txt_password").val(),
		txt_repassword: $("#txt_repassword").val(),
		txt_name: $("#txt_name").val(),
		cbo_gioitinh: $("#cbo_gioitinh").val(),
		cbo_day: $("#cbo_day").val(),
		cbo_month: $("#cbo_month").val(),
		cbo_year: $("#cbo_year").val(),
		txt_sdt: $("#txt_sdt").val(),
		txt_email: $("#txt_email").val(),
		ck_accept: $("#ck_accept").is(":checked") ? "true" : "false",
	}, function(data, status){
		myApp.hideIndicator();
		if(data=='OK')
			myApp.alert('Đã tạo thành khoản thành công',
			function () {
				window.location = 'index.php';  
			});
		else if(data=='INPUT_INVALD')
			myApp.alert('Bạn nhập thông tin không chính xác','Lỗi!')
		else if(data=='ACCEPT_REQUEST')
			myApp.alert('Bạn phải đồng ý với điều khoản','Lỗi!')
		else if(data=='MOBILE_EXIST')
			myApp.alert('Số điện thoại đã được đăng ký','Lỗi!')
		else if(data=='EMAIL_EXIST')
			myApp.alert('Email đã được sử dụng','Lỗi!')
		else if(data=='INVALD_USERNAME')
			myApp.alert('Tên tài khoản không hợp lệ','Lỗi!')
		else if(data=='USERNAME_EXIST')
			myApp.alert('Tên tài khoản đã tồn tại bạn vui lòng chọn tên khác','Lỗi!')
		else if(data=='PASSWORD_NOT_MATCH')
			myApp.alert('Mật khẩu và mật khẩu xác nhận không khớp ','Lỗi!')
		else
			myApp.alert(data,'Thông báo!',function () {
				window.location = 'index.php';  
			});
		})
}

function reactive_account(action)
{
	myApp.showIndicator('');
	$.post("module/mail_active_reactive.php",
	{
		action:action
	},function(data, status){
	myApp.hideIndicator();
	myApp.alert(data,'Thông báo!');})
}

function saveinfo()
{
	$.post("module/register_edit_pro.php",
	{
		txt_username: $("#txt_username").val(),
		txt_password: $("#txt_password").val(),
		txt_repassword: $("#txt_repassword").val(),
		txt_name: $("#txt_name").val(),
		cbo_gioitinh: $("#cbo_gioitinh").val(),
		cbo_day: $("#cbo_day").val(),
		cbo_month: $("#cbo_month").val(),
		cbo_year: $("#cbo_year").val(),
		txt_sdt: $("#txt_sdt").val(),
		txt_email: $("#txt_email").val(),
	}, function(data, status){
		if(data=='OK')
			myApp.alert('Cập nhật tài khoản thành công',
			function () {
				window.location = 'index.php';  
			});
		else if(data=='INPUT_INVALD')
			myApp.alert('Bạn nhập thông tin không chính xác','Lỗi!')
		else if(data=='ACCEPT_REQUEST')
			myApp.alert('Bạn phải đồng ý với điều khoản','Lỗi!')
		else if(data=='MOBILE_EXIST')
			myApp.alert('Số điện thoại đã được đăng ký','Lỗi!')
		else if(data=='EMAIL_EXIST')
			myApp.alert('Email đã được sử dụng','Lỗi!')
		else if(data=='INVALD_USERNAME')
			myApp.alert('Tên tài khoản không hợp lệ','Lỗi!')
		else if(data=='USERNAME_EXIST')
			myApp.alert('Tên tài khoản đã tồn tại bạn vui lòng chọn tên khác','Lỗi!')
		else if(data=='PASSWORD_NOT_MATCH')
			myApp.alert('Mật khẩu và mật khẩu xác nhận không khớp ','Lỗi!')
		else
			myApp.alert('Lỗi máy chủ<textarea>'+data+'</textarea>','Lỗi!');
		})
}

function Opnechar_info(data) {
$.post("module/character_info.php",
	{
		pdata: data
	},function(data, status){
 	myApp.popup(data);})
}

function Open_obj_info(data) {
$.post("module/object_info.php",
	{
		pdata: data
	},function(data, status){
 	myApp.popup(data);})
}

function add_playlist_video(ep) {
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("add_playlist").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","module/playlist_add.php?epid="+ep,true);
  xmlhttp.send();
 
} 

function Opnechar_calendar(data) {
$.post("module/calendar_info.php",
	{
		pdata: data
	},function(data, status){
 	myApp.popup(data);})
}

function open_sticker()
{
	$.post("module/sticker_selector.php",
	{
	},function(data, status){
 	myApp.popup(data);})
}

function open_sticker_rep()
{
	$.post("module/sticker_selector_rep.php",
	{
	},function(data, status){
 	myApp.popup(data);})
}

function selected_sticker(sticker_id, sticker_type) 
{
$.post("module/sticker_preview.php",
	{
		p_sticker_id : sticker_id,
		p_sticker_type : sticker_type,
	},function(data, status){
 	$("#sticker_preview").html(data);
	})
}

function selected_sticker_rep(sticker_id, sticker_type,cmid) 
{
$.post("module/sticker_preview.php",
	{
		p_sticker_id : sticker_id,
		p_sticker_type : sticker_type,
	},function(data, status){
 	$("#sticker_preview_"+cmid).html(data);
	})
}

function show_like(cmid)
{
	$.post("module/comment_show_like.php",
	{
		cmid:cmid,
	},function(data, status){
 	myApp.popup(data);})
}

function like_cm(cmid)
{
	$.post("module/comment_like.php",
	{
		action:'like',
		cmid:cmid,
	},function(data, status){
		$("#like_count_"+cmid).html(data);
	})
}

function show_comment_page(page)
{
	$.post("module/comment_load.php",
	{
		page:page,
	},function(data, status){
 		$("#comment_loader").html(data);
	})
}

function enter_comment_send(e, query_id, tx_comment,vid_id) 
{
    if (e.keyCode == 13 && !e.shiftKey) {
        comment_send(query_id, tx_comment,vid_id);
		e.preventDefault();
        $("#tx_comment:input").val('');
    }
}

function comment_send(query_id, tx_comment,vid_id) 
{
	$.post("module/comment_save.php",
	{
		p_query_id : query_id,
		p_tx_comment : tx_comment,
	},function(data, status){
		if(data!='')
		{
			if(data=='OK')
			{
				$.post("module/comment_input.php",
				{
					p_vid_id : vid_id
				},function(data_comment_save, status){
					$("#comment_input").html(data_comment_save);
				})
				$.post("module/comment_load.php",
				{
					query_id : query_id
				},function(data_comment_save, status){
					$("#comment_loader").html(data_comment_save);
				})
			}
			else myApp.alert (data);
		}
		//$("#sticker_preview").html(data);
	})
}

function show_reply(cmid)
{
	$.post("module/comment_reply_load.php",
	{
		cmid:cmid,
	},function(data, status){
 		$("#reply_"+cmid).html(data);
	})
}

function reply_send(reply,cmid)
{
	$.post("module/comment_reply_load_comment.php",
	{
		cmid:cmid,
		reply:reply
	},function(data, status){
 		$("#reply_"+cmid).html(data);
	})
}

function enter_reply_send(e, reply, cmid) 
{
    if (e.keyCode == 13 && !e.shiftKey) {
        reply_send(reply,cmid);
		e.preventDefault();
        $("#tx_reply_"+cmid+":input").val('');
    }
}

function show_user_check_ep()
{
	$.post("module/listvideo_check_ep_popup.php",
	{
	},function(data, status){
 	myApp.popup(data);})
}

function validation_ep_cbo(str)
{
	if(str=='1995')
	{
		$("#cb_ep_k").show();
		$("#cb_ep_h").show();
		$("#cb_ep_t").show();
		$("#cb_ep_s").show();
		$("#cb_ep_sp").hide();
	}
	if(str=='1990')
	{
		$("#cb_ep_k").hide();
		$("#cb_ep_h").show();
		$("#cb_ep_t").show();
		$("#cb_ep_s").show();
		$("#cb_ep_sp").hide();
	}
	if(str=='SP')
	{
		$("#cb_ep_k").hide();
		$("#cb_ep_h").hide();
		$("#cb_ep_t").hide();
		$("#cb_ep_s").hide();
		$("#cb_ep_sp").show();
	}
}

function video_check(cb_series,cb_ep_k,cb_ep_h,cb_ep_t,cb_ep_s,cb_ep_sp)
{
	
	if(cb_series=='1995') cb_ep = cb_ep_k+cb_ep_h+cb_ep_t+cb_ep_s;
	if(cb_series=='1990') cb_ep = cb_ep_h+cb_ep_t+cb_ep_s;
	if(cb_series=='SP') cb_ep = cb_ep_sp;
	$.post("module/listvideo_check_result.php",
	{
		ep:cb_ep,
		},function(data, status){
			if(data == 'NOT_EXIST'){myApp.alert('Tập phim không tồn tại');}
			else if(data == 'NOT_DONE'){myApp.alert('Tập phim chưa hoàn thành');}
			else $("#show_ep_detail").html(data);
	})
}

function show_ep_in_month_rep(month,year)
{
	$.post("module/lichphat_core.php",
	{
		p_month:month, 
		p_year:year,
		},function(data, status){
			if(data.search("NOT_EXIST")>0){myApp.alert('Tháng này không có lịch phát hành');}
			else if(data.search("NOT_DONE")>0){myApp.alert('Tháng này chưa có lịch phát hành');}
			else $("#list_ep_by_month_lp").html(data);
	})
}

function update_deadline_mod(deadline_change,id_change)
{
	$.post("module/ad_mod_congviec_send_update_deadline.php",
	{
		deadline_change:deadline_change, 
		id_change:id_change,
		},function(data, status){
			$("#task_send_refresh_"+id_change).html(data);
	})
}

function md5show(str)
{
	$.post("module/ad_setting_core.php",
	{
		str:str, 
		},function(data, status){
			myApp.alert('Mã md5: '+data)
	})
}

function home_event_show(id){
	$.post("module/home_event.php",
    {
        event_id: id,
    },function(data){
		myApp.alert(data,'Thông tin hệ thống!');
	});		
}

function fg_pass(username,email)
{
	myApp.showIndicator('');
	$.post("module/mail_forget_password.php",
	{
		fusername : username,
		femail: email
	},
	function(data, status)
	{
		myApp.hideIndicator();
		myApp.alert(data,'Thông báo');
	});	
}

function fgc_pass(username,pass,cf_pass)
{
	$.post("module/mail_pass_recovery_pro.php",
	{
		username : username,
		pass: pass,
		cf_pass:cf_pass
	},
	function(data, status)
	{
		myApp.alert(data,'Thông báo');
		window.location = 'index.php';		
	});	
}

function search_by_year(year)
{
	$.post("module/searchbar.core.php",
	{
		year:year,
	},function(data, status){
 		$("#searchitemlist").html(data);
	})
}