//Notiloader
function doRefreshNoti()
	{
    	var strURL = 'js/json_noti.php';
        $.ajax({
            url: strURL,
            type: 'POST',
            cache: false,
            //data: 'getMember=view',
            success: function(string){
				var getData = $.parseJSON(string);
			if(getData.name!="")
			{
				myApp.addNotification({
						title:getData.name,
						subtitle:getData.title,
						message:getData.mess,
						media:getData.url
			});
			var audio = new Audio('sound/notification.mp3');
		    audio.play();
			}
			}});
		
		setTimeout(function() {
			doRefreshNoti();
		  }, 60000);
          
	}
//Scroll list
myApp.onPageInit('infinite-scroll-list', function (page) {
    // Loading trigger
    var loading = false;
    // Last loaded index, we need to pass it to script
    var lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
    // Attach 'infinite' event handler
    $$('.infinite-scroll').on('infinite', function () {
        // Exit, if loading in progress
        if (loading) return;
        // Set loading trigger
        loading = true;
        // Request some file with data 
        $$.get('module/listvideo-load.php', {leftIndex: lastLoadedIndex + 1}, function (data) {
            loading = false;
            if (data === '') {
                // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
            }
            else {
                // Append loaded elements to list block
                $$('.infinite-scroll .list-block ul').append(data);
                // Update last loaded index
                lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
            }
        });
    });
});