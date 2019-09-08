var ecsuserid = 3;
//var ecsurl = "http://127.0.0.1:3030"; //dev
var ecsurl = "https://ecstestnet.cryptoskillz.com"; //testnet
//var ecsurl = "http://165.22.109.223:3030"; //live

var outputcode = '<!-- Payment button -->'
outputcode = outputcode+'<a href="#0" id="sr-add-to-cart" class="sr-add-to-cart" data-price="0.01" data-name="Entity T" data-preview="">Add To Cart</a>';
outputcode = outputcode+'<!-- add this to the footer -->';
outputcode = outputcode+'<script type="text/javascript">SR.init(["'+ecsurl+'",false,15,"https://s3.eu-west-1.amazonaws.com/cryptoskillz.com/srcrypto/prod/cdn/","[ECSUSERID]","",0,0,"GB"]);';
outputcode = outputcode+'</script>';

(function($) {
   "use strict";
    var $window = $(window),
        $html = $('html'),
        $body = $('body');
    
    $(document).ready(function()
    { 


        //ecs steps

        $('#step2').hide();
        $('#step3').hide();
        $('#step4').hide();

        $('#copycode').click(function()
        {
            //alert(outputcode);
            const el = document.createElement('textarea');  // Create a <textarea> element
            el.value = outputcode;                          // Set its value to the string that you want copied
            el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
            el.style.position = 'absolute';                 
            el.style.left = '-9999px';                      // Move outside the screen to make it invisible
            document.body.appendChild(el);  
            el.select();                                    // Select the <textarea> content
            document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
            document.body.removeChild(el);   
        });



        $('#step1button').click(function() 
        {
            var res = validateEmail($('#user-email').val());
            if (res == true)
            {
                $(".msgSubmit").removeClass('text-danger').addClass('text-success, text-success hidden').text('');
                $('#step1').hide();
                $('#step2').attr("style","");
                $('#step2').show();
            }

        });

        $('#step2button').click(function() 
        {
            var res = validateBTC($('#user-btc').val());
            if (res == true)
            {
                $(".msgSubmit").removeClass('text-danger').addClass('text-success, text-success hidden').text('');
                $('#step2').hide();
                $('#step3').attr("style","");
                $('#step3').show();
                var email = $('#user-email').val();
                var btc = $('#user-btc').val();

                //store the details
                $.ajax({
                  url: ecsurl+"/api/adduser?email="+email+"&btc="+btc,
                  context: document.body
                }).done(function(res) {
                    var obj = JSON.parse(res);
                    ecsuserid = obj.status;
                    //alert(ecsuserid);
                    outputcode = outputcode.replace("[ECSUSERID]", ecsuserid);
                    $('#ecscodeoutput').text(outputcode);
                });
            }

        });

        $('#step3button').click(function() 
        {
            $('#step3').hide();
            $('#step4').attr("style","");
            $('#step4').show();

        });
    
        // ** Subscription Form

        $('#submitit').click(function() 
        {
            if ($('#hero-form-email').val() == '')
            {
                var msgClasses = "text-danger";
                $(".msgSubmit").removeClass('text-success, text-success hidden').addClass(msgClasses).text('Please add an email');
            }
            else
            {
                $('.hideme').hide();
                $('#emailmessage').html("Who uses email? for updates follow on <a href='https://twitter.com/crypto_skillz' target='_blank'>twitter</a>");
                var msgClasses = "text-danger";
                $(".msgSubmit").removeClass('text-success, text-success hidden').addClass(msgClasses).text('You have not been added to a mailing list');
            }
            
        });

        // ** Header Animation
        var topMainHeader = $('#top-main-header'),
            currScrollPos = 0,
            prevScrollPos = 0,
            extraOffset = topMainHeader.outerHeight() - 40;
            
        var headerScroll =  function() {
            currScrollPos = $window.scrollTop();
            
            if(currScrollPos > extraOffset) {
                topMainHeader.addClass('hide-header');
                
                if(prevScrollPos > currScrollPos){
                    topMainHeader.addClass('show-header').removeClass('hide-header');
                } else {
                    topMainHeader.removeClass('show-header');
                }

                prevScrollPos = currScrollPos;
                
            } else {
                topMainHeader.removeClass('hide-header');
            }
        }
        
             
        
        // Small Screen Menu
        var smlScrnTogBtn = $('<span class="sml-scrn-tog-btn ion-grid">Menu</span>'),
            closeMenu = $('<div class="close-menu"><span>Close Menu</span></div>'),
            smlScrnMenu = $('<div class="sml-scrn-menu"><div class="sml-scrn-menu-in"/></div>'),
            pageWrap = $('#page-wrap'),
            topHeaderIn = $('#top-main-header-in'),
            mainNavClone  = topHeaderIn.find('.main-nav').clone(),
            navBarRightClone = topHeaderIn.find('.navbar-right').clone();
        
        smlScrnMenu.prependTo($body).find('.sml-scrn-menu-in').append(closeMenu,mainNavClone,navBarRightClone);
        smlScrnTogBtn.appendTo(topHeaderIn);
        
        var smlScrnMenuMethods = {
             showMenu : function() {
                $body.add(pageWrap).removeAttr('style');
                $body.addClass('menu-open');
            },
            hideMenu : function() {
                 $body.removeClass('menu-open');
            }
        }     
        
        smlScrnTogBtn.on('click',function(){
            smlScrnMenuMethods.showMenu();
        });
        
        $(document).on('click',function(e){
            if($body.hasClass('menu-open') && $(e.target).is(pageWrap)){
                smlScrnMenuMethods.hideMenu();
            }
        });
            
        closeMenu.on('click',function(){
            smlScrnMenuMethods.hideMenu();
        });
        
        
        
        // Custom Styled Select
        var select = $('select');
        select.each(function() {
           var $This = $(this),
               selectWrapper = $('<div class="selectWrapper"/>'),
               customSelectCont = $('<span class="customSelectCont"/>'),
               selectedOptText =  $This.find('option:selected').text();        

           $This.wrap(selectWrapper).after(customSelectCont);

           var showSelectedText = function(){
               $This.next().text(selectedOptText)
           }        
           showSelectedText()

           $This.on('change',function(){
               selectedOptText = $(this).find('option:selected').text()
               showSelectedText();
           });
        });
        
        // Magnific Pop Up For Embedded Videos
        var popUpVideos = $('.popup-youtube, .popup-vimeo');
        
        if(popUpVideos.length){
            popUpVideos.magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }
        
        // Window Viewport
        var viewPortCont = $('.view-port-size');
        
        var viewPortSize = function(){
            var windowH = $window.height();            
            viewPortCont.css({'height':windowH});
        }
        
        var resizeHandler = function(){
            viewPortSize();            
        };
        resizeHandler();
        
        // Window Scroll  Events
        $window.on('scroll',function(){
            headerScroll();
        }); 
        
        // Window Resize  Events
        $window.on('resize',function(){
            headerScroll();
            resizeHandler();
        });
        
    });

    $window.load(function() {        
        $('.preloader').addClass('slide-out');        
    });


    
})(jQuery);


//validate btc address

function validateBTC(address) {

  if (address.length < 26 || address.length > 35) {
    $(".msgSubmit").removeClass('text-success, text-success hidden').addClass('text-danger').text('Please add a valid BTC address');
    return false;
  }
  
  let re = /^[A-Z0-9]+$/i;
  if (!re.test(address)) {
    $(".msgSubmit").removeClass('text-success, text-success hidden').addClass('text-danger').text('Please add a valid BTC address');
    return false;
  }
  
  return true;
};



/*
function validateBTC(address)
{
    //todo
    if (address == "")
    {
        $(".msgSubmit").removeClass('text-success, text-success hidden').addClass('text-danger').text('Please add a valid BTC address');
        return(false);
    }
    return(true);
}
*/

function validateEmail(email) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
    $(".msgSubmit").removeClass('text-success, text-success hidden').addClass('text-danger').text('Please add a valid email');
    return (false)
}
