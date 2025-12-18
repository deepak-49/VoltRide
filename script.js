// Smooth scroll to sections
function scrollToServices() {
    document.getElementById('services').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Location sharing
let locationShared = false;

function shareLocation() {
    const locationMap = document.getElementById('locationMap');
    const locationStatus = document.getElementById('locationStatus');
    const shareBtn = document.getElementById('shareLocationBtn');
    
    if (!locationShared) {
        // Simulate location sharing
        locationMap.classList.add('active');
        locationMap.innerHTML = `
            <i class="bi bi-geo-alt-fill fs-1 text-primary"></i>
            <span class="d-block mt-2 text-primary fw-medium" id="locationStatus">Location Shared</span>
        `;
        
        // Add pulsing effect
        const ping = document.createElement('div');
        ping.className = 'location-ping';
        locationMap.appendChild(ping);
        
        shareBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Location Shared';
        shareBtn.disabled = true;
        shareBtn.classList.add('disabled');
        
        locationShared = true;
        
        // Show success message
        showToast('Location shared successfully!', 'success');
    }
}

function startTracking() {
    const trackingBtn = document.getElementById('trackingBtn');
    const locationMap = document.getElementById('locationMap');
    
    if (!locationShared) {
        shareLocation();
    }
    
    trackingBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Tracking Active';
    trackingBtn.disabled = true;
    trackingBtn.classList.add('disabled');
    
    showToast('Live tracking started!', 'success');
}

// Booking modal
function openBookingModal(serviceType) {
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    const serviceSelect = document.getElementById('bookingService');
    
    // Set service type if provided
    if (serviceType) {
        serviceSelect.value = serviceType;
    }
    
    bookingModal.show();
}

function submitBooking() {
    const form = document.getElementById('bookingForm');
    
    if (form.checkValidity()) {
        const bookingData = {
            name: document.getElementById('bookingName').value,
            phone: document.getElementById('bookingPhone').value,
            service: document.getElementById('bookingService').value,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            location: document.getElementById('bookingLocation').value,
            description: document.getElementById('bookingDescription').value
        };
        
        console.log('Booking submitted:', bookingData);
        
        // Show success message
        showToast('Booking confirmed! We\'ll contact you shortly.', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        modal.hide();
        
        // Reset form
        form.reset();
    } else {
        form.reportValidity();
    }
}

// Toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-primary';
    
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Set minimum date for booking to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
