document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click', async function(){
      const pre = this.nextElementSibling;
      if(!pre) return;
      const text = pre.innerText;
      try{
        await navigator.clipboard.writeText(text);
        showSuccess(this);
      }catch(e){
        // fallback
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try{document.execCommand('copy'); showSuccess(this);}catch(err){console.error('copy failed', err)}
        sel.removeAllRanges();
      }
    });
  });

  function showSuccess(btn){
    let t = btn.parentElement.querySelector('.copy-success');
    if(!t){
      t = document.createElement('div');
      t.className = 'copy-success';
      t.textContent = 'Copied';
      btn.parentElement.appendChild(t);
    }
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),1200);
  }
});
