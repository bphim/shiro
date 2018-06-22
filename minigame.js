// JavaScript Document
function checkin_contest_profile(contest_id)
{
	if($('#tb_hovaten').val()=='') myApp.alert('Bạn chưa nhập tên!');
	else if($('#dt_ngaysinh').val()=='') myApp.alert('Bạn chưa chọn ngày sinh!');
	else if($('#tb_cmnd').val()=='') myApp.alert('Bạn nhập số chứng mình nhân dân!');
	else if($('#ck_agree').is(":checked"))
	{
		myApp.confirm('Trước khi tạo hồ sơ bạn vui lòng kiểm tra lại kĩ thông tin một lần nữa, sau khi xác nhận thì thông tin sẽ không thể thay đổi được.<br><table><tr align=left><td>Họ tên</td><td>'+$('#tb_hovaten').val()+'</td></tr><tr align=left><td>Ngày sinh</td><td>'+$('#dt_ngaysinh').val()+'</td></tr><tr align=left><td>Số CMND</td><td>'+$('#tb_cmnd').val()+'</td></tr><tr align=left><td>Điện thoại</td><td>'+$('#tb_dienthoai').val()+'</td></tr><tr align=left><td>Email</td><td>'+$('#tb_email').val()+'</td></tr></table>',
		function()
		{
			$.post("module/minigame_backend.php",
			{
				action:'create_profile',
				contest_id:contest_id,
				tb_hovaten:$('#tb_hovaten').val(),
				dt_ngaysinh:$('#dt_ngaysinh').val(),
				tb_cmnd:$('#tb_cmnd').val(),
				tb_dienthoai:$('#tb_dienthoai').val(),
				tb_email:$('#tb_email').val()
			},function(data){
				if(data == 'OK')
				{
					$.post("module/minigame_statpage.php",
					{
					},function(data){
						$('#game_start').html(data);
					});	
				}
				else
					myApp.alert(data);
			});	
		});
	}
	else
	{
		myApp.alert('Bạn chưa đồng ý với các điều khoản của nhóm!');	
	}
}
function minigame_start(ip_timer, contest_id)
{
	$.post("module/minigame_mainpage.php",
	{
	},function(data){
		$.post("module/minigame_backend.php",
		{
			action:'update_profile_stime',
		},function(data){});		
		$('#main_game_ui').html(data);
	});	
	startTimer(ip_timer, contest_id);
}

function minigame_quiz_select(sel, ask_id, contest_id)
{
	if($('#' + 'quiz_a_'+ask_id).length != 0)
	{
		document.getElementById('quiz_a_'+ask_id).style.color = "black";
		document.getElementById('quiz_a_'+ask_id).style.fontWeight = "normal";
	}
	if($('#' + 'quiz_b_'+ask_id).length != 0)
	{
		document.getElementById('quiz_b_'+ask_id).style.color = "black";
		document.getElementById('quiz_b_'+ask_id).style.fontWeight = "normal";
	}
	if($('#' + 'quiz_c_'+ask_id).length != 0)
	{
		document.getElementById('quiz_c_'+ask_id).style.color = "black";
		document.getElementById('quiz_c_'+ask_id).style.fontWeight = "normal";
	}
	if($('#' + 'quiz_d_'+ask_id).length != 0)
	{
		document.getElementById('quiz_d_'+ask_id).style.color = "black";
		document.getElementById('quiz_d_'+ask_id).style.fontWeight = "normal";
	}
	if($('#' + 'quiz_e_'+ask_id).length != 0)
	{
		document.getElementById('quiz_e_'+ask_id).style.color = "black";
		document.getElementById('quiz_e_'+ask_id).style.fontWeight = "normal";
	}
	if($('#' + 'quiz_f_'+ask_id).length != 0)
	{
		document.getElementById('quiz_f_'+ask_id).style.color = "black";
		document.getElementById('quiz_f_'+ask_id).style.fontWeight = "normal";
	}
	sel_id = 'quiz_'+sel+'_'+ask_id;
	document.getElementById(sel_id).style.color = "red";
	document.getElementById(sel_id).style.fontWeight = "bold";
	$.post("module/minigame_backend.php",
	{
		action:'select_quiz',
		sel:sel,
		ask_id:ask_id,
		contest_id:contest_id
	},function(data){});
}

function update_contest_random()
{
	$.post("module/minigame_backend.php",
	{
		action:'update_contest_random',
		tb_random_send:$('#rn_1').val()+$('#rn_2').val()+$('#rn_3').val()+$('#rn_4').val(),
	},function(data){});
}

function complete_contest_confirm(contest_id)
{
	myApp.confirm('Bạn muốn xác nhận hoàn thành phần thi của mình?',function(){
		complete_contest(contest_id);
	})
}
function complete_contest(contest_id)
{
	autosave_tuluan();
	$.post("module/minigame_backend.php",
	{
		action:'update_contest_etime',
	},function(data)
	{
		window.location = "index.php?action=minigame&contest_id="+contest_id+"&contest_done=true";
	});
}

function autosave_tuluan()
{
	$.post("module/minigame_backend.php",
	{
		action:'autosave_tuluan',
		tb_tuluan_send:$('#tb_tuluan_send').val(),
	},function(data){});
}

function startTimer(counter_inp,contest_id){
  var counter = 10*counter_inp;
  setInterval(function() {
    counter--;
	if (counter === -1) {
        myApp.alert('Đã hết giờ làm bài! <br>Hệ thồng đã tự động lưu lại các kết quả mà bạn đã làm.');
        clearInterval(counter);
		complete_contest(contest_id);
		
    }
    if (counter >= 0) {
      var date = new Date(counter*1000);
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
	  var formattedTime = minutes.substr(-2) + ':' + seconds.substr(-2);
      span = document.getElementById("countdown_contest");
      span.innerHTML = formattedTime;
	  if((counter%10)==0)
	  	autosave_tuluan();
    }
    
  }, 1000);
}