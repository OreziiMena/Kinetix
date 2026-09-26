// Real-time cryptocurrency data from CoinGecko API
        const cryptoIds = {
            btc: 'bitcoin',
            eth: 'ethereum',
            ada: 'cardano',
            sol: 'solana',
            bnb: 'binancecoin'
        };

        //fetch real-time cryptocurrency data
        async function fetchCryptoData() {
            try {
                const ids = Object.values(cryptoIds).join(',');
                const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`);
                const data = await response.json();
                
                // Update each cryptocurrency
                for (const [key, id] of Object.entries(cryptoIds)) {
                    if (data[id]) {
                        updateCryptoElement(key, data[id]);
                    }
                }
            } catch (error) {
                console.error('Error fetching cryptocurrency data:', error);
                // Fallback to simulated data if API fails
                updateCryptoPrices();
            }
        }

        // Function to update DOM elements with real data
        function updateCryptoElement(crypto, data) {
            const price = data.usd;
            const change = data.usd_24h_change;
            const volume = data.usd_24h_vol ? data.usd_24h_vol / 1000000000 : 0; // Convert to billions
            const marketCap = data.usd_market_cap ? data.usd_market_cap / 1000000000 : 0; // Convert to billions
            
            // Format price with appropriate decimals
            const formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: price < 1 ? 4 : 2,
                maximumFractionDigits: price < 1 ? 4 : 2
            }).format(price);
            
            // Format change percentage
            const formattedChange = change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
            
            // Format volume and market cap
            const formattedVolume = `$${volume.toFixed(1)}B`;
            const formattedMarketCap = `$${marketCap.toFixed(1)}B`;
            
            // Update DOM elements with animation
            const priceElement = document.getElementById(`${crypto}Price`);
            const changeElement = document.getElementById(`${crypto}Change`);
            const marketPriceElement = document.getElementById(`${crypto}MarketPrice`);
            const marketChangeElement = document.getElementById(`${crypto}MarketChange`);
            const volumeElement = document.getElementById(`${crypto}Volume`);
            const marketCapElement = document.getElementById(`${crypto}MarketCap`);
            const rowElement = document.getElementById(`${crypto}Row`);
            
            if (priceElement) {
                priceElement.textContent = formattedPrice;
                priceElement.classList.add('price-update');
                setTimeout(() => priceElement.classList.remove('price-update'), 500);
            }
            
            if (changeElement) {
                changeElement.textContent = formattedChange;
                changeElement.className = `price-change ${change >= 0 ? 'positive' : 'negative'}`;
                changeElement.classList.add('price-update');
                setTimeout(() => changeElement.classList.remove('price-update'), 500);
            }
            
            if (marketPriceElement) {
                marketPriceElement.textContent = formattedPrice;
                marketPriceElement.classList.add('price-update');
                setTimeout(() => marketPriceElement.classList.remove('price-update'), 500);
            }
            
            if (marketChangeElement) {
                marketChangeElement.textContent = formattedChange;
                marketChangeElement.className = `change ${change >= 0 ? 'positive' : 'negative'}`;
                marketChangeElement.classList.add('price-update');
                setTimeout(() => marketChangeElement.classList.remove('price-update'), 500);
            }
            
            if (volumeElement) {
                volumeElement.textContent = formattedVolume;
            }
            
            if (marketCapElement) {
                marketCapElement.textContent = formattedMarketCap;
            }
            
            if (rowElement) {
                rowElement.classList.add('price-update');
                setTimeout(() => rowElement.classList.remove('price-update'), 500);
            }
        }

        // Fallback function to update prices with realistic fluctuations if API fails
        function updateCryptoPrices() {
            const cryptoData = {
                btc: { price: 43250.75, change: 2.35, volume: 28.4, marketCap: 845.2 },
                eth: { price: 3250.40, change: 1.75, volume: 14.2, marketCap: 390.5 },
                ada: { price: 1.25, change: -0.85, volume: 1.2, marketCap: 42.8 },
                sol: { price: 102.75, change: 5.25, volume: 3.5, marketCap: 41.3 },
                bnb: { price: 350.20, change: 0.95, volume: 1.8, marketCap: 54.6 }
            };

            for (const [crypto, data] of Object.entries(cryptoData)) {
                // Generate random price movement (-0.5% to +0.5%)
                const changePercent = (Math.random() - 0.5) / 100;
                const newPrice = data.price * (1 + changePercent);
                
                // Update price with realistic formatting
                const formattedPrice = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(newPrice);
                
                // Calculate new change percentage
                const newChange = data.change + (Math.random() - 0.5) * 0.2;
                const formattedChange = newChange >= 0 ? `+${newChange.toFixed(2)}%` : `${newChange.toFixed(2)}%`;
                
                // Update volume and market cap with slight variations
                const newVolume = (data.volume * (1 + (Math.random() - 0.5) / 50)).toFixed(1);
                const newMarketCap = (data.marketCap * (1 + (Math.random() - 0.5) / 100)).toFixed(1);
                
                // Update DOM elements with animation
                const priceElement = document.getElementById(`${crypto}Price`);
                const changeElement = document.getElementById(`${crypto}Change`);
                const marketPriceElement = document.getElementById(`${crypto}MarketPrice`);
                const marketChangeElement = document.getElementById(`${crypto}MarketChange`);
                const volumeElement = document.getElementById(`${crypto}Volume`);
                const marketCapElement = document.getElementById(`${crypto}MarketCap`);
                const rowElement = document.getElementById(`${crypto}Row`);
                
                if (priceElement) {
                    priceElement.textContent = formattedPrice;
                    priceElement.classList.add('price-update');
                    setTimeout(() => priceElement.classList.remove('price-update'), 500);
                }
                
                if (changeElement) {
                    changeElement.textContent = formattedChange;
                    changeElement.className = `price-change ${newChange >= 0 ? 'positive' : 'negative'}`;
                    changeElement.classList.add('price-update');
                    setTimeout(() => changeElement.classList.remove('price-update'), 500);
                }
                
                if (marketPriceElement) {
                    marketPriceElement.textContent = formattedPrice;
                    marketPriceElement.classList.add('price-update');
                    setTimeout(() => marketPriceElement.classList.remove('price-update'), 500);
                }
                
                if (marketChangeElement) {
                    marketChangeElement.textContent = formattedChange;
                    marketChangeElement.className = `change ${newChange >= 0 ? 'positive' : 'negative'}`;
                    marketChangeElement.classList.add('price-update');
                    setTimeout(() => marketChangeElement.classList.remove('price-update'), 500);
                }
                
                if (volumeElement) {
                    volumeElement.textContent = `$${newVolume}B`;
                }
                
                if (marketCapElement) {
                    marketCapElement.textContent = `$${newMarketCap}B`;
                }
                
                if (rowElement) {
                    rowElement.classList.add('price-update');
                    setTimeout(() => rowElement.classList.remove('price-update'), 500);
                }
            }
        }

        // Fetch real data initially and then every 10 seconds
        fetchCryptoData();
        setInterval(fetchCryptoData, 10000);

        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn') || document.querySelector('.mobile-menu-btn');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = navMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    if (isOpen) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });

            // Close mobile menu when clicking any nav link
            const navLinksList = navMenu.querySelectorAll('.nav-links a');
            navLinksList.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        }

        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.btn, .action-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Animation on scroll
        function checkVisibility() {
            const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Initial check and add scroll listener
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        
        // Auth Modal Functionality
        const authModal = document.getElementById('authModal');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const heroStartTrading = document.getElementById('heroStartTrading');
        const ctaCreateAccount = document.getElementById('ctaCreateAccount');
        const closeModal = document.getElementById('closeModal');
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');
        
        function openLoginModal() {
            if (!authModal) return;
            authModal.classList.add('active');
            if (loginTab) loginTab.classList.add('active');
            if (signupTab) signupTab.classList.remove('active');
            if (loginForm) loginForm.style.display = 'block';
            if (signupForm) signupForm.style.display = 'none';
            document.body.style.overflow = 'hidden';
            if (navMenu) navMenu.classList.remove('active');
        }

        function openSignupModal() {
            if (!authModal) return;
            authModal.classList.add('active');
            if (signupTab) signupTab.classList.add('active');
            if (loginTab) loginTab.classList.remove('active');
            if (signupForm) signupForm.style.display = 'block';
            if (loginForm) loginForm.style.display = 'none';
            document.body.style.overflow = 'hidden';
            if (navMenu) navMenu.classList.remove('active');
        }

        function closeAuthModal() {
            if (!authModal) return;
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Open modal with login form
        if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
        
        // Open modal with signup form
        if (signupBtn) signupBtn.addEventListener('click', openSignupModal);
        if (heroStartTrading) heroStartTrading.addEventListener('click', openSignupModal);
        if (ctaCreateAccount) ctaCreateAccount.addEventListener('click', openSignupModal);
        
        // Close modal
        if (closeModal) closeModal.addEventListener('click', closeAuthModal);
        
        // Close modal when clicking on backdrop
        if (authModal) {
            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) {
                    closeAuthModal();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && authModal && authModal.classList.contains('active')) {
                closeAuthModal();
            }
        });

        // Check URL hash for modal opening
        function checkHash() {
            if (window.location.hash === '#signup') {
                openSignupModal();
            } else if (window.location.hash === '#login') {
                openLoginModal();
            }
        }
        window.addEventListener('load', checkHash);
        window.addEventListener('hashchange', checkHash);

        // Switch to signup form
        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                openSignupModal();
            });
        }
        
        // Switch to login form
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                openLoginModal();
            });
        }
        
        // Tab switching
        if (loginTab) loginTab.addEventListener('click', openLoginModal);
        if (signupTab) signupTab.addEventListener('click', openSignupModal);
        
        // Form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you would handle authentication here
            alert('Login functionality would be implemented here!');
            authModal.classList.remove('active');
        });
        
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you would handle registration here
            alert('Registration functionality would be implemented here!');
            authModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('active');
            }
        });

        // Animate progress bar when it becomes visible
        const progressFill = document.querySelector('.progress-fill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFill.style.width = '65%';
                }
            });
        });
        
        observer.observe(progressFill);
         // Initialize TradingView chart
    function initTradingViewChart() {
        // Default to ETH/USDT pair
        const symbol = 'BINANCE:ETHUSDT';
        
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "60",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#0a0a0a",
            "enable_publishing": false,
            "allow_symbol_change": false,
            "container_id": "tradingview_chart",
            "studies": [
                "RSI@tv-basicstudies"
            ],
            "show_popup_button": true,
            "popup_width": "1000",
            "popup_height": "650",
            "disabled_features": [
                "use_localstorage_for_settings",
                "header_widget",
                "header_compare",
                "header_screenshot",
                "header_undo_redo"
            ],
            "enabled_features": [
                "study_templates"
            ]
        });

        // Add timeframe button functionality
        const timeframeButtons = document.querySelectorAll('.timeframe-btn');
        timeframeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                timeframeButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real implementation, you would update the chart interval here
                // This would require access to the TradingView widget instance
            });
        });
    }

    // Initialize chart when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        // Small delay to ensure DOM is fully loaded
        setTimeout(initTradingViewChart, 500);
    });

    // Alternative chart implementation using Chart.js (if TradingView doesn't work)
    function initChartJS() {
        const ctx = document.createElement('canvas');
        ctx.id = 'chartjs-chart';
        ctx.style.width = '100%';
        ctx.style.height = '100%';
        
        const chartWrapper = document.querySelector('.chart-wrapper');
        chartWrapper.innerHTML = '';
        chartWrapper.appendChild(ctx);
        
        // Generate sample price data
        const data = [];
        let currentPrice = 3200;
        for (let i = 0; i < 50; i++) {
            const change = (Math.random() - 0.5) * 40;
            currentPrice += change;
            data.push(currentPrice);
        }
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((_, i) => i),
                datasets: [{
                    label: 'ETH/USDT',
                    data: data,
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(17, 17, 17, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#00ff88',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: false,
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // Fallback to Chart.js if TradingView fails to load
    window.addEventListener('load', function() {
        // Check if TradingView loaded successfully after 3 seconds
        setTimeout(function() {
            const tradingViewChart = document.getElementById('tradingview_chart');
            if (!tradingViewChart || tradingViewChart.innerHTML === '') {
                console.log('TradingView failed to load, using Chart.js fallback');
                initChartJS();
            }
        }, 3000);
    });
