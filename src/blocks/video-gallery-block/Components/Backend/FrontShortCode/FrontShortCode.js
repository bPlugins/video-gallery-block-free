import { useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

import './FrontShortCode.scss';

const FrontShortCode = ({ postType, shortCode, currentPostType }) => {
	const inputRef = useRef(null);
	const tooltip = useRef(null);

	const handleCopyShortCode = () => {
		const input = inputRef.current;
		if (input) {
			input.select();
			navigator.clipboard.writeText(shortCode).then(() => {
				if (tooltip.current) {
					tooltip.current.innerHTML = __('Copied Successfully!', 'video-gallery-block');
					setTimeout(() => {
						if (tooltip.current) {
							tooltip.current.innerHTML = __('Copy To Clipboard', 'video-gallery-block');
						}
					}, 1500);
				}
			});
		}
	}

	return postType === currentPostType && (
		<div className='vgb-shortcode-bar'>
			<div className='vgb-shortcode-input-group'>
				<input ref={inputRef} readOnly value={shortCode} />
				<button type="button" onClick={handleCopyShortCode} className="vgb-copy-button">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
					<span ref={tooltip} className='vgb-tooltip'>
						{__('Copy To Clipboard', 'video-gallery-block')}
					</span>
				</button>
			</div>
			<span className='vgb-shortcode-label'>
				{__('Copy the shortcode and use it anywhere.', 'video-gallery-block')}
			</span>
		</div>
	);
}
export default withSelect((select) => {
	return {
		currentPostType: select('core/editor').getCurrentPostType()
	}
})(FrontShortCode);
