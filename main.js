// Defining text characters for the empty and full hearts for you to use later.
// تعريف الأحرف للقلوب الفارغة والمليئة
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// اختيار العنصر الذي يعرض الرسائل الخطأ
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');

// إضافة مستمع للحدث لكل عنصر "like" في الصفحة
document.querySelectorAll('.like').forEach(item => {
  item.addEventListener('click', () => {
    // إيجاد رمز القلب في العنصر الذي تم النقر عليه
    const heart = item.querySelector('.like-glyph');
    
    // إظهار الرسالة في حالة الضغط على القلب الفارغ
    if (heart.innerText === EMPTY_HEART) {
      mimicServerCall()
        .then(() => {
          // تغيير شكل القلب إلى مليء وإضافة الصنف الذي يجعل القلب أحمر
          heart.innerText = FULL_HEART;
          heart.classList.add('activated-heart');
        })
        .catch(error => {
          // إظهار الرسالة الخطأ في حالة الفشل
          modalMessage.innerText = error;
          modal.classList.remove('hidden');
          setTimeout(() => {
            modal.classList.add('hidden');
          }, 3000);
        });
    } else {
      // إعادة القلب إلى شكله الفارغ وإزالة الصنف
      heart.innerText = EMPTY_HEART;
      heart.classList.remove('activated-heart');
    }
  });
});

// Your JavaScript code goes here!




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
