document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contractForm');
    const input = document.getElementById('contractNumber');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Фокус на поле ввода при загрузке страницы
    input.focus();
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contractNumber = input.value.trim();
        
        if (!contractNumber) {
            input.focus();
            return;
        }
        
        // Блокируем кнопку во время перехода
        submitBtn.disabled = true;
        submitBtn.textContent = 'Переход...';
        
        // Формируем URL и перенаправляем
        const url = `https://artelmik.ru/external-payment.html?contract=${encodeURIComponent(contractNumber)}`;
        
        // Небольшая задержка для лучшего UX
        setTimeout(function() {
            window.location.href = url;
        }, 300);
    });
    
    // Обработка Enter в поле ввода
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });
    
    // Фильтрация ввода - только цифры
    input.addEventListener('input', function(e) {
        // Удаляем все символы кроме цифр
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    // Предотвращаем вставку нецифровых символов
    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        const numbersOnly = paste.replace(/[^0-9]/g, '');
        this.value = numbersOnly;
    });
});
