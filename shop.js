// JavaScript Document
function good_info_view(good_id, page)
{
	$.post("module/shop_show_goods.php",
	{
		page : page,
		good_id: good_id
	},
	function(data, status)
	{
		$("#shop_main_ui").html(data);
	});	
}

function goto_goods_list_page(page)
{
	$.post("module/shop_goods_list.php",
	{
		page : page,
	},
	function(data, status)
	{
		$("#shop_main_ui").html(data);
	});	
}

function add_to_cart(good_id, order_numb, isview_order)
{
	$.post("module/shop_action_back_end.php",
	{
		action : 'add_to_cart',
		good_id : good_id,
		order_numb : order_numb
	},
	function(data, status)
	{
		if(data=='OK')
		{
			if(isview_order!=1)
			myApp.alert('Đã thêm vào giỏ hàng thành công!');
			update_cart_count();
			if(isview_order==1)
				view_order();
		}
		else
			myApp.alert(data);
	});	
}

function update_cart_count()
{
	$.post("module/shop_numb_counter.php",{},
	function(data, status)
	{
		$("#shop_numb_counter").html(data);
	});	
}

function open_checkout()
{
	$.post("module/shop_check_out_ui.php",{},
	function(data, status)
	{
		$("#shop_main_ui").html(data);
	});	
}

function cbo_province_change(provinceid)
{
	$.post("module/xl_tinhthanh.php",
	{
		provinceid:provinceid
	},
	function(data, status)
	{
		$("#td_district").html(data);
		$.post("module/xl_tinhthanh.php",
		{
			clear_ward:''
		},
		function(data, status)
		{
			$("#td_ward").html(data);
			
		});	
	});	
}

function cbo_ward_change(districtid)
{
	$.post("module/xl_tinhthanh.php",
	{
		districtid:districtid
	},
	function(data, status)
	{
		$("#td_ward").html(data);
	});	
}

function view_order()
{
	$.post("module/shop_view_order.php",
	{},
	function(data, status)
	{
		$("#shop_main_ui").html(data);
	});	
}

function del_good_in_cart(order_id)
{
	myApp.confirm('Bạn có muốn mặt hàng này ra khỏi hóa đơn không?','Thông báo!',
	function(){
		$.post("module/shop_action_back_end.php",
		{
			order_id:order_id,
			action:'del_good_in_cart'	
		},
		function(data, status)
		{
			if(data=='OK')
			{
				myApp.alert('Đã xóa mặt hàng thành công');
				view_order();
				update_cart_count();
			}
			else
			{
				myApp.alert(data);
			}
		});
	});	
}

function shop_set_order(order_name,order_address,order_phone,province,district,ward)
{
	is_val = true;
	if(order_name=="") {is_val=false; myApp.alert('Bạn chưa nhập vào <br>họ tên người nhận');}
	else if(order_address=="") {is_val=false; myApp.alert('Bạn chưa nhập vào <br>địa chỉ người nhận');}
	else if(order_phone=="") {is_val=false; myApp.alert('Bạn chưa nhập vào <br>điện thoại người nhận');}
	else if(province=="Vui lòng chọn") {is_val=false; myApp.alert('Bạn chưa chọn tỉnh');}
	else if(district=="Vui lòng chọn") {is_val=false; myApp.alert('Bạn chưa chọn Quận/Huyện');}
	if(is_val == true)
		$.post("module/shop_action_back_end.php",
		{
			action:'proccess_check_out',
			order_name : order_name,
			order_address: order_address,
			order_phone:order_phone,
			province:province,
			district:district,
			ward:ward
		},
		function(data1, status)
		{
			get_OK = data1.substring(0,2)
			if(get_OK=='OK')
			{
				update_cart_count();
				$.post("module/shop_order_success.php",
				{},
				function(data, status)
				{
					myApp.alert("Mã đơn hàng của bạn là <b>"+data1.substring(2)+'</b><br>Bạn vui lòng ghi lại mã đơn hàng để tiến hành thanh toán.')
					$("#shop_main_ui").html(data);
				});	
			}
			else
			myApp.alert(data);
		});	
}

function view_shop_support()
{
	$.post("module/shop_buying_guide.php",
	{},
	function(data, status)
	{
		$("#shop_main_ui").html(data);
	});	
}

function shop_item_page_in_user(item_page) 
{
	$.post("module/shop_goods_list.php",
	{
		item_page:item_page	
	},
	function(data, status)
	{
		$("#shop_main_ui").html(data);
	});	
}

function view_mgr_order(page)
{
	$.post("module/shop_order_mgr.php",
	{item_page:page},
	function(data, status)
	{
		$("#shop_main_ui").html(data);
	});	
}

function cancel_order(od_id){
		myApp.confirm('Bạn muốn xóa đơn hàng '+od_id+' ?<br>Thao tác sẽ không thể phục hồi sau khi xác nhận.','Xác nhận yêu cầu hủy đơn hàng!',
		function(){
		$.post("module/shop_order_mgr_item.php",
		{
			order_id:od_id,
			action:"cancel"	
		},function(data){
			$('#order_list_item_'+od_id).html(data);
		})
	})
}