// Portfolio Website JavaScript
// Enhanced functionality with CV download, email, and animations

function initializePortfolio() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize button event listeners
    initButtonEvents();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize typewriter effect
    initTypewriterEffect();
    
    // Initialize contact form
    initContactForm();
    
    console.log('Portfolio initialized successfully!');
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all button event listeners
function initButtonEvents() {
    // Email button
    const emailBtn = document.querySelector('.btn-email');
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openEmailClient('okontaehijesumuan@gmail.com');
        });
    }
    
    // Website button
    const websiteBtn = document.querySelector('.btn-website');
    if (websiteBtn) {
        websiteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://hitmeupafrica.com', '_blank');
        });
    }
    
    // CV download button
    const cvBtn = document.querySelector('.btn-cv');
    if (cvBtn) {
        cvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadActualCV();
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Typewriter effect for hero section
function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'Full Stack Developer',
        'Creative Problem Solver',
        'UI/UX Enthusiast',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

// Enhanced CV Download Function with actual file support and progress
async function downloadActualCV() {
    const button = document.querySelector('.btn-cv');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    button.disabled = true;
    
    try {
        // Possible CV file names and formats to search for
        const possibleFiles = [
            'assets/EhiByte_CV.pdf',
            'assets/Ehimena_CV.pdf',
            'assets/CV.pdf',
            'assets/Resume.pdf',
            'assets/EhiByte_Resume.pdf',
            'assets/Ehimena_Resume.pdf',
            'assets/EhiByte_CV.docx',
            'assets/Ehimena_CV.docx',
            'assets/CV.docx',
            'assets/Resume.docx'
        ];
        
        let foundFile = null;
        let foundFormat = '';
        
        // Show search progress
        button.innerHTML = '<i class="fas fa-search fa-spin"></i> Locating CV...';
        
        // Check each possible file
        for (const filePath of possibleFiles) {
            try {
                const response = await fetch(filePath, { method: 'HEAD' });
                if (response.ok) {
                    foundFile = filePath;
                    foundFormat = filePath.split('.').pop().toUpperCase();
                    break;
                }
            } catch (e) {
                // Continue checking other files
                continue;
            }
        }
        
        if (foundFile) {
            // Show download progress
            button.innerHTML = '<i class="fas fa-download fa-bounce"></i> Downloading...';
            
            // Download the found file
            const response = await fetch(foundFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `EhiByte_CV.${foundFormat.toLowerCase()}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            // Success notification
            showAdvancedNotification(`
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-check-circle" style="font-size: 20px;"></i>
                    <div>
                        <strong>CV Downloaded Successfully!</strong>
                        <div class="file-info">
                            Format: ${foundFormat} | Size: ${(blob.size / 1024).toFixed(1)} KB
                        </div>
                    </div>
                </div>
            `, 'success', 4000);
            
        } else {
            // No CV file found - provide helpful guidance
            showAdvancedNotification(`
                <div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <i class="fas fa-info-circle" style="font-size: 18px;"></i>
                        <strong>CV File Not Found</strong>
                    </div>
                    <p style="margin: 8px 0;">To enable CV downloads, please add your CV file to the assets folder with one of these names:</p>
                    <ul class="file-list">
                        <li>EhiByte_CV.pdf (recommended)</li>
                        <li>Ehimena_CV.pdf</li>
                        <li>CV.pdf or Resume.pdf</li>
                    </ul>
                    <p style="margin: 8px 0 0 0; font-size: 0.9em; opacity: 0.9;">Supported formats: PDF, DOCX</p>
                </div>
            `, 'info', 7000);
        }
        
    } catch (error) {
        console.error('Error downloading CV:', error);
        showNotification('Failed to download CV. Please try again later.', 'error');
    } finally {
        // Restore button state
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1000);
    }
}

// Enhanced email functionality
function openEmailClient(email) {
    try {
        // Create a comprehensive mailto link
        const subject = encodeURIComponent('Inquiry from Portfolio Website');
        const body = encodeURIComponent(`Hello EhiByte,

I found your portfolio website and I'm interested in discussing potential opportunities.

Please let me know your availability for a conversation.

Best regards,`);
        
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        
        // Try to open the email client
        window.location.href = mailtoLink;
        
        // Show success notification
        showNotification('Email client opened! If nothing happened, please copy: okontaehijesumuan@gmail.com', 'success');
        
    } catch (error) {
        console.error('Error opening email client:', error);
        
        // Fallback: copy email to clipboard
        copyToClipboard(email);
        showNotification('Email copied to clipboard: ' + email, 'info');
    }
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'info' ? '#3B82F6' : '#EF4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Advanced notification for complex content
function showAdvancedNotification(htmlContent, type, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification advanced ${type}`;
    notification.innerHTML = htmlContent;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'info' ? '#3B82F6' : '#EF4444'};
        color: white;
        padding: 20px;
        border-radius: 15px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        max-width: 450px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after specified duration
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Add CSS for animations if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            border-left: 4px solid rgba(255,255,255,0.3);
        }
        
        .notification.advanced {
            border-left: 6px solid rgba(255,255,255,0.4);
        }
        
        .notification i {
            font-size: 18px;
            min-width: 18px;
        }
        
        .notification .file-info {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid rgba(255,255,255,0.2);
            font-size: 0.9em;
            opacity: 0.9;
        }
        
        .notification .file-list {
            list-style: none;
            padding: 0;
            margin: 5px 0 0 0;
        }
        
        .notification .file-list li {
            padding: 2px 0;
            font-size: 0.85em;
        }
        
        .notification .file-list li:before {
            content: "• ";
            color: rgba(255,255,255,0.7);
        }
    `;
    document.head.appendChild(style);
}

// Formspree Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Show success notification
                showAdvancedNotification(`
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-check-circle" style="font-size: 20px;"></i>
                        <div>
                            <strong>Message Sent Successfully!</strong>
                            <div class="file-info">
                                Thank you for reaching out. I'll get back to you soon!
                            </div>
                        </div>
                    </div>
                `, 'success', 5000);
                
                // Reset form
                form.reset();
                clearValidationStyles();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane btn-icon"></i>';
                    submitBtn.disabled = false;
                }, 3000);
                
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Error state
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
            
            showNotification('Failed to send message. Please try again or contact directly via email.', 'error');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane btn-icon"></i>';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Form validation
function validateForm(data) {
    let isValid = true;
    
    // Clear previous validation styles
    clearValidationStyles();
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        markFieldError('name');
        isValid = false;
    } else {
        markFieldSuccess('name');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        markFieldError('email');
        isValid = false;
    } else {
        markFieldSuccess('email');
    }
    
    // Validate subject
    if (!data.subject || data.subject.trim().length < 3) {
        markFieldError('subject');
        isValid = false;
    } else {
        markFieldSuccess('subject');
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        markFieldError('message');
        isValid = false;
    } else {
        markFieldSuccess('message');
    }
    
    return isValid;
}

// Helper functions for form validation
function markFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('success');
    }
}

function markFieldSuccess(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.parentElement.classList.add('success');
        field.parentElement.classList.remove('error');
    }
}

function clearValidationStyles() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});