import './post.scss';

window.copyBPlAdminShortcode = id => {
	var input = document.querySelector('#bPlAdminShortcode-' + id + ' input');
	var tooltip = document.querySelector('#bPlAdminShortcode-' + id + ' .tooltip');
	input.select();
	input.setSelectionRange(0, 30);
	document.execCommand('copy');
	tooltip.innerHTML = wp.i18n.__('Copied Successfully!', 'video-gallery');
	setTimeout(() => {
		tooltip.innerHTML = wp.i18n.__('Copy To Clipboard', 'video-gallery');
	}, 1500);
}


// wp_add_inline_script('jquery-core', "
//   document.addEventListener('click', function(e){
//       var el = e.target.closest('.shortcode_copy');
//       if(!el) return;

//       navigator.clipboard.writeText(el.dataset.code);

//       var original = el.innerHTML;
//       el.innerHTML = 'Copied!';
//       setTimeout(function(){
//           el.innerHTML = original;
//       }, 1000);
//   });
// ")