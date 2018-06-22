function setClipboardText(text){
var id = "mycustom-clipboard-textarea-hidden-id";
    var existsTextarea = document.getElementById(id);

    if(!existsTextarea){
        console.log("Creating textarea");
        var textarea = document.createElement("textarea");
        textarea.id = id;
        // Place in top-left corner of screen regardless of scroll position.
        textarea.style.position = 'fixed';
        textarea.style.top = 0;
        textarea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textarea.style.width = '1px';
        textarea.style.height = '1px';

        // We don't need padding, reducing the size if it does flash render.
        textarea.style.padding = 0;

        // Clean up any borders.
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textarea.style.background = 'transparent';
        document.querySelector("body").appendChild(textarea);
        console.log("The textarea now exists :)");
        existsTextarea = document.getElementById(id);
    }else{
        console.log("The textarea already exists :3")
    }

    existsTextarea.value = text;
    existsTextarea.select();

    try {
        var status = document.execCommand('Copy');
        if(!status){
            console.error("Cannot copy text");
        }else{
            console.log("The text is now on the clipboard");
        }
    } catch (err) {
        console.log('Unable to copy.');
    }
}

function show_sticker_set(sticker_set_id)
{
	$.post("module/sticker_set_loader.php",
	{
		sticker_set:sticker_set_id, 
		},function(data, status){
		 $("#sticker_set").html(data);
	})
}

function OpenStickerPopup(sticker_id) {
$.post("module/sticker_set_show.php",
	{
		sticker_id: sticker_id
	},function(data, status){
 	myApp.popup(data);})
}

function Showembedvideo(url,title) {
$.post("module/embedvideoplay.php",
	{
		url: url,
		title: title
	},function(data, status){
 	myApp.popup(data);})
}

function youtube_parser(url)
{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : 'INVAILD_URL';
}

localStorage.setItem("vald_img_url", "false");

function feed_show_sticker_set(sticker_set_id)
{
	$.post("module/feed_sticker_set_loader.php",
	{
		sticker_set:sticker_set_id, 
		},function(data, status){
		 $("#sticker_set").html(data);
	})
}

function feed_OpenStickerPopup() 
{
	$.post("module/feed_sticker_selector.php",
	{
	},function(data, status){
 	myApp.popup(data);})
}

function feed_OpenCommentPopup_sticker()
{
	$('#popup_comment').toggle(100);
}

function feed_OpenCommentPopup(feed_id) 
{
	$.post("module/feed_comment_ui.php",
	{
		feed_id:feed_id
	},function(data, status){
 	myApp.popup(data);})
}

function feed_comment_show_sticker_set(sticker_set_id)
{
	$.post("module/feed_comment_sticker_set_loader.php",
	{
		sticker_set:sticker_set_id, 
		},function(data, status){
		 $("#sticker_set").html(data);
	})
}

function feed_comment_selected_sticker(sticker_id, sticker_type) 
{
	$.post("module/feed_caching.php",
	{
		feed_stiker_id : sticker_id+'.'+sticker_type
	},function(data, status){
		document.getElementById('comment_sticker_preview').style.backgroundImage="url(img/sticker/"+sticker_id+"."+sticker_type+")";
		$('#popup_comment').hide(100);
	})
}

function feed_comment_send(comment_text, feed_id)
{
	if(comment_text=="") myApp.alert('Nội dung bình luận không được để trống');
	else
	$.post("module/feed_comment_send.php",
	{ 
		feed_id:feed_id,
		comment_text:comment_text
		},function(data, status){
		 $("#comment_list").html(data);
		 $("#feed_cm_comment").val('');
		 document.getElementById('comment_sticker_preview').style.backgroundImage="url(img/sym_sticker.png)";
	})
}

function feed_OpenImagePopup() 
{
	$.post("module/feed_image_attach.php",
	{
	},function(data, status){
 	myApp.popup(data);})
}

function feed_OpenVideoPopup() 
{
	$.post("module/feed_video_embed.php",
	{
	},function(data, status){
 	myApp.popup(data);})
}

function feed_OpenLinkPopup()
{
	$.post("module/feed_link_attach.php",
	{
	},function(data, status){
 	myApp.popup(data);})
}

function feed_select_link_url(url)
{
	if(url.substring(0,4)!='http') url = 'http://'+url;
	document.getElementById("link_view").src=url;
}

function feed_add_selected_link_url(url) 
{
	if(url.substring(0,4)!='http') url = 'http://'+url;
	$.post("module/feed_caching.php",
	{
		link_url : url
		},function(data, status){
	});
}

function feed_selected_sticker(sticker_id, sticker_type) 
{
	$.post("module/feed_caching.php",
	{
		feed_stiker_id : sticker_id+'.'+sticker_type
	},function(data, status){
 		$("#obj_preview").html(data);
	})
}

function feed_create_post(feed_text, cache_id, feed_group)
{
	if(feed_group!="")
		if(feed_text!="")
		$.post("module/feed_caching.php",
		{
			feed_text:feed_text,
			feed_group:feed_group
		},function(data, status){
			if(data=='OK')
				myApp.alert("Đã gửi bài thành công");
			//Reset
			$("#obj_preview").html("");
			$("#feed_cm_"+cache_id).val("");
			//$("#obj_preview").html(data);
			feed_loader(0);
		})
		else myApp.alert("Bạn chưa nhập nội dung");
	else myApp.alert("Bạn chưa chọn chủ đề");
}

function feed_loader(page)
{
	$.post("module/feed_loader.php",
	{
		page:page
	},
	function(data, status){
	if(page == 0)	
	{
		$("#feed_loader").html(data);
	}
	else
		$("#feed_loader").append(data);
	})
}

function ImageExist(url) 
{
   var img = new Image();
   img.src = url;
   return img.height != 0;
}

function getMeta(url)
{   
	document.getElementById("img_preview").src=url;
	localStorage.setItem("vald_img_url", "false");
	if(ImageExist(url))
	{
		document.getElementById('btn_send').style.display = 'inline-block';
		document.getElementById("img_preview").src=url;
		localStorage.setItem("vald_img_url", "true");
		return document.getElementById("img_preview").width;
	}
	else 
	{
		document.getElementById('btn_send').style.display = 'none';
		document.getElementById("img_preview").src="img/noimg.png";
		localStorage.setItem("vald_img_url", "false");
		return 0;
	}
}

function feed_select_img_url(url)
{
	if(getMeta(url)==0)
	{
		myApp.alert('Đường dẫn hình ảnh không hợp lệ');	
	}
	
}

function feed_add_selected_img_url(img_scr) 
{
	if(localStorage.getItem("vald_img_url")==='true')
	{
	$.post("module/feed_caching.php",
	{
		img_url : img_scr
		},function(data, status){
			$("#obj_preview").html(data);
		});
	}
	else
	myApp.alert('Hình ảnh không hợp lệ');
}

function feed_video_url_check(url)
{
	//https://www.youtube.com/watch?v=VPvpfQvTQyQ
	localStorage.setItem("vald_img_url", "false");
	if(youtube_parser(url)!='INVAILD_URL')
	{
		embedurl = 'https://www.youtube.com/embed/'+youtube_parser(url);
		document.getElementById('btn_send').style.display = 'inline-block';
		document.getElementById("video_preview").src=embedurl;
		localStorage.setItem("vald_img_url", "true");
		$.post("module/feed_caching.php",
			{
				video_id : youtube_parser(url)
			},
			function(data, status)
			{
				
			}
		);
	}
	else
	{
		localStorage.setItem("vald_img_url", "false");
		document.getElementById('btn_send').style.display = 'none';
		myApp.alert("Link không hợp lệ");
	}
}

function feed_like_act(feed_id, feed_user)
{
	$.post("module/feed_action_panel.php",
		{
			feed_id : feed_id,
			feed_user : feed_user
		},
		function(data, status)
		{
			$("#like_comment_"+feed_id).html(data);
		}
	);
}

function feed_like_comment_pane_update(feed_id)
{
	$.post("module/feed_action_panel.php",
		{
			feed_id : feed_id,
		},
		function(data, status)
		{
			$("#like_comment_"+feed_id).html(data);
		}
	);
}

function feed_like_comment(feed_id, feed_comment_id, feed_user)
{
	$.post("module/feed_comment_like_reply_panel.php",
		{
			feed_id : feed_id,
			feed_comment_id : feed_comment_id,
			feed_user: feed_user
		},
		function(data, status)
		{
			$("#like_reply_"+feed_comment_id).html(data);
		}
	);
}

function feed_del_post(feed_id)
{
	myApp.confirm('Bạn muốn xóa bài đăng này ?','',
	function () 
	{
        $.post("module/feed_user_action.php",
		{
			feed_id : feed_id,
		},
		function(data, status)
		{
			if(data=='OK')
				$("#feed_loader_detail_"+feed_id).html("");
			else
				myApp.alert('Có lỗi khi thực hiện thao tác')
		});
    })
}

function feed_showreply_input(feed_cm_id)
{
	$("#reply_input_"+feed_cm_id).toggle(100);
}

function feed_send_reply(feed_cm_id, feed_reply_text)
{
	$.post("module/feed_comment_reply_load.php",
	{
		feed_cm_id : feed_cm_id,
		feed_reply_text : feed_reply_text
	},
	function(data, status)
	{
		$("#feed_reply_"+feed_cm_id).html(data);
		$("#tx_reply_"+feed_cm_id).val('');
		$("#reply_input_"+feed_cm_id).toggle(200);
		$.post("module/feed_comment_reply_count_update.php",
		{
			reply_update_id:feed_cm_id,
		},
		function(data, status)
		{
			$("#reply_button_"+feed_cm_id).html(data);
		});
	});	
}

function feed_like_reply(feed_id, feed_comment_id, feed_user)
{
	$.post("module/feed_reply_like_panel.php",
		{
			feed_id : feed_id,
			feed_comment_rep_id : feed_comment_id,
			feed_user: feed_user
		},
		function(data, status)
		{
			$("#like_reply_op_"+feed_comment_id).html(data);
		}
	);
}

function feed_load_more_reply(feed_cm_id, p_rep)
{
	$.post("module/feed_comment_reply_load.php",
	{
		feed_cm_id : feed_cm_id,
		p_rep : p_rep
	},
	function(data, status)
	{
		$("#feed_reply_"+feed_cm_id).append(data);
		$("#p_rep_"+p_rep+"_"+feed_cm_id).html("");
	});	
}

function delete_reply_id(rep_id,cm_id)
{
	myApp.confirm('Bạn muốn xóa trả lời này ?','',
	function () 
	{
        $.post("module/feed_del_reply.php",
		{
			rep_id : rep_id,
		},
		function(data, status)
		{
			if(data=='OK')
				$("#reply_div_"+rep_id).html("");
			else
				myApp.alert('Có lỗi khi thực hiện thao tác')
			$.post("module/feed_comment_reply_count_update.php",
			{
				reply_update_id:cm_id,
			},
			function(data, status)
			{
				$("#reply_button_"+cm_id).html(data);
			});	
		});
    })
}

function delete_comment_id(rep_id,cm_id)
{
	myApp.confirm('Bạn muốn xóa bình luận này ?','',
	function () 
	{
        $.post("module/feed_del_comment.php",
		{
			rep_id : rep_id,
		},
		function(data, status)
		{
			if(data=='OK')
				$("#comment_div_"+rep_id).html("");
			else
				myApp.alert('Có lỗi khi thực hiện thao tác')
		});
    })
}

function feed_load_more(page,user_post)
{
	$.post("module/feed_loader.php",
	{
		page : page,
		user_post:user_post
	},
	function(data, status)
	{
		$("#feed_loader").append(data);
		$("#feed_loader_page_"+page).html("");
	});	
}

function feed_load_more_comment(feed_id, page)
{
	$.post("module/feed_comment_send.php",
	{
		page : page,
		feed_id: feed_id
	},
	function(data, status)
	{
		$("#comment_list").append(data);
		$("#comment_page_"+page).html("");
	});	
}

function feed_toggle_link_post(feed_id)
{
	$('#show_link_id_'+feed_id).toggle(100);	
}

function open_new_feed()
{
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	document.getElementById("btn_news_feed").style.backgroundColor = "#c14b22";
	document.getElementById("btn_news_feed").style.color="#ffffff";
	if (document.getElementById("btn_my_page")) {
	document.getElementById("btn_my_page").style.backgroundColor = "#ffffff";;
	document.getElementById("btn_my_page").style.color="#106f7c";
	}
	if (document.getElementById("btn_messenger")) {
	document.getElementById("btn_messenger").style.backgroundColor = "#ffffff";;
	document.getElementById("btn_messenger").style.color="#fd355f";
	}
	$.post("module/feed_loader.php",
	{
	},
	function(data, status)
	{
		$("#feed_loader").html(data);
	});	
	$.post("module/feed_input_ctr.php",
	{
	},
	function(data, status)
	{
		$("#c_tr_feed_input").html(data);
	});	
}

function open_selected_feed(user_select)
{
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	document.getElementById("btn_news_feed").style.backgroundColor = "#ffffff";
	document.getElementById("btn_news_feed").style.color="#c14b22";
	document.getElementById("btn_my_page").style.backgroundColor = "#106f7c";;
	document.getElementById("btn_my_page").style.color="#ffffff";
	document.getElementById("btn_messenger").style.backgroundColor = "#ffffff";;
	document.getElementById("btn_messenger").style.color="#fd355f";
	$.post("module/feed_loader.php",
	{
		user_post:user_select
	},
	function(data, status)
	{
		$("#feed_loader").html(data);
	});	
	//Tải info
	$.post("module/feed_input_ctr.php",
	{
		user_select:user_select
	},
	function(data, status)
	{
		$("#c_tr_feed_input").html(data);
	});		
	
}

function open_messenger()
{
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	document.getElementById("btn_news_feed").style.backgroundColor = "#ffffff";
	document.getElementById("btn_news_feed").style.color="#c14b22";
	document.getElementById("btn_my_page").style.backgroundColor = "#ffffff";;
	document.getElementById("btn_my_page").style.color="#106f7c";
	document.getElementById("btn_messenger").style.backgroundColor = "#fd355f";;
	document.getElementById("btn_messenger").style.color="#ffffff";
	$.post("module/feed_msg.php",
	{
	},
	function(data, status)
	{
		$("#c_tr_feed_input").html('');
		$("#feed_loader").html(data);
	});	
	auto_update_friend_list();
}

function open_selected_feed_byuser(user_select)
{
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	//Tải feed
	$.post("module/feed_loader.php",
	{
		user_post:user_select
	},
	function(data, status)
	{
		$("#feed_loader").html(data);
	});	
	//Tải info
	$.post("module/feed_info_display.php",
	{
		user_select:user_select
	},
	function(data, status)
	{
		$("#c_tr_feed_input").html(data);
	});		
}

function feed_friend_add(a_username,action)
{
	if(action=='add_friend') act_msg = 'thêm bạn'+' @'+a_username+' vào danh sách bạn bè?';
	if(action=='send_cancel_request') act_msg = 'hủy yêu cầu kết bạn với @'+a_username+' ?';
	if(action=='accept') act_msg = 'xác nhận kết bạn với @'+a_username+' ?';
	if(action=='unfriend') act_msg = 'bỏ kết bạn với @'+a_username+' ?';
	myApp.confirm('Bạn muốn '+act_msg,'',
	function () 
	{
		$.post("module/feed_friend_add.php",
		{
			a_username:a_username,
			action:action
		},
		function(data, status)
		{
			$("#btn_add_friend").html(data);
		});	
	});
}

function open_friend_list()
{
	$('#msg_loader').css('border-color', '#F0184D');
	$.post("module/feed_msg_friend_list.php",
		{
		},
		function(data, status)
		{
			$("#msg_loader").html(data);
		}
	);
}

function open_conversation(username)
{
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	$.post("module/feed_msg_show_chat.php",
	{
		username:username
	},
	function(data, status)
	{
		$("#msg_loader").html(data);
		auto_update_conversation(username);
	});
}

function auto_update_friend_list(){
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	open_friend_list();
	counter = 100; 
	setInterval(function() {
    counter--;
	if (counter === -1) {
        clearInterval(counter);	
    }
    if (counter >= 0) {
		open_friend_list();
    }  
  }, 10000);
}

function auto_update_conversation(username){
	load_conversation(username);
	counter = 10000; 
	
	setInterval(function() {
		load_conversation(username);
	},2000);
	if (document.getElementById('conversation_loader') !=null){
		var objDiv = document.getElementById("conversation_loader");
		objDiv.scrollTop = objDiv.scrollHeight;	
	}
	else
	{
		
	}
}

function load_conversation(username)
{
	$.post("module/feed_msg_autoload.php",
	{
		username:username
	},
	function(data, status)
	{
		//Tải nội dung chat
		$("#conversation_loader").html(data);
		//Kéo xuống dưới nếu có mới
		$.post("module/feed_chat_bk.php",
		{
			is_new_mess:username
		},
		function(data, status)
		{
			if(data==1)
			{
				if (document.getElementById('conversation_loader') !=null){
					var objDiv = document.getElementById("conversation_loader");
					objDiv.scrollTop = objDiv.scrollHeight;	
				}
				else
				{
					
				}
			}
		});
	});	
}

function send_mess(username,mess)
{
	if(mess!="")
		{
		$.post("module/feed_msg_autoload.php",
		{
			username:username,
			mess:mess
		},
		function(data, status)
		{
			$("#conversation_loader").html(data);
			var objDiv = document.getElementById("conversation_loader");
			objDiv.scrollTop = objDiv.scrollHeight;
		});	
		$("#txt_mess").val('');
	}
	else
	{
		myApp.alert('Tin nhắn không được để trống!');	
	}
}

function enter_mess_send(e, username, mess) 
{
    if (e.keyCode == 13 && !e.shiftKey) {
        send_mess(username,mess)
		e.preventDefault();
        $("#txt_mess").val('');
    }
}

function open_sticker_msg(username)
{
	$.post("module/sticker_selector_msg.php",
	{
		username:username
	},function(data, status){
 	myApp.popup(data);})
}

function show_sticker_set_msg(sticker_set_id,username)
{
	$.post("module/sticker_set_loader_msg.php",
	{
		sticker_set:sticker_set_id, 
		username:username
		},function(data, status){
		 $("#sticker_set").html(data);
	})
}

function selected_sticker_msg(sticker_id,sticker_type,username) 
{
sticker = sticker_id+'.'+sticker_type;
$.post("module/feed_msg_autoload.php",
	{
		sticker:sticker,
		username:username
	},function(data, status){
 		$("#conversation_loader").html(data);
		var objDiv = document.getElementById("conversation_loader");
		objDiv.scrollTop = objDiv.scrollHeight;
	})
}

function open_public_chat()
{
	$('#msg_loader').css('border-color', '#AA0B5A');
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	$.post("module/feed_public_chat.php",
		{
		},
		function(data, status)
		{
			$("#msg_loader").html(data);
		}
	);
	auto_update_public_conversation();
}

function auto_update_public_conversation(){
	load_conversation('');
	counter = 1000; 
	
	setInterval(function() {
		load_public_conversation();
	},5000);
}

function load_public_conversation()
{
	$.post("module/feed_msg_autoload.php",
	{
	},
	function(data, status)
	{
		//Tải nội dung chat
		$("#conversation_loader").html(data);
		//Kéo xuống dưới nếu có mới
		$.post("module/feed_chat_bk.php",
		{
			is_new_mess:''
		},
		function(data, status)
		{
			if(data==1)
			{
				if (document.getElementById('conversation_loader') !=null){
					var objDiv = document.getElementById("conversation_loader");
					objDiv.scrollTop = objDiv.scrollHeight;	
				}
				else
				{
					
				}
			}
		});
	});	
}

function open_search_friend()
{
	$('#msg_loader').css('border-color', '#AA0B5A');
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	$('#msg_loader').css('border-color', '#73BC38');
	$.post("module/feed_friend_search.php",
		{
		},
		function(data, status)
		{
			$("#msg_loader").html(data);
		}
	);
}

function feed_friend_search(keyword)
{
	var highestTimeoutId = setInterval(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearInterval(i); 
	}
	$.post("module/feed_friend_seachbk.php",
	{
		keyword:keyword
	},
	function(data, status)
	{
		$("#friend_list_search").html(data);
	});
}