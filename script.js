
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'))});}
document.querySelectorAll('[data-search]').forEach(input=>input.addEventListener('input',e=>{
 const q=e.target.value.toLowerCase();document.querySelectorAll('.service-card[data-title]').forEach(card=>{
 card.style.display=card.dataset.title.toLowerCase().includes(q)?'flex':'none';
 });
}));
document.querySelectorAll('.category-tabs button').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.category-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const cat=btn.dataset.category;document.querySelectorAll('.service-card[data-category]').forEach(card=>{
 card.style.display=(cat==='todos'||card.dataset.category===cat)?'flex':'none';
 });
}));


document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    item.classList.toggle('open');
    btn.setAttribute('aria-expanded',item.classList.contains('open')?'true':'false');
  });
});

document.querySelectorAll('.docs-nav button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.docs-nav button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.doc-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    const panel=document.getElementById(btn.dataset.target);
    if(panel){panel.classList.add('active');panel.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

function buildMailto(form, recipient, subjectPrefix){
  const data=new FormData(form);
  const subject=encodeURIComponent(subjectPrefix+' - '+(data.get('tipo')||data.get('assunto')||'Solicitação'));
  const lines=[];
  for(const [key,value] of data.entries()){
    if(key==='consentimento') continue;
    const label={
      nome:'Nome',email:'E-mail',telefone:'Telefone',observacao:'Observação',
      tipo:'Tipo',assunto:'Assunto',mensagem:'Mensagem',partes:'Nome das partes',
      dataAto:'Data aproximada',livro:'Livro',folha:'Folha',numeroAto:'Número do ato',
      acervo:'Acervo',periodo:'Período aproximado',finalidade:'Finalidade'
    }[key]||key;
    if(String(value).trim()) lines.push(label+': '+value);
  }
  return `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
}

document.querySelectorAll('form[data-mailto]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const consent=form.querySelector('[name="consentimento"]');
    if(consent && !consent.checked){alert('É necessário autorizar o tratamento dos dados para enviar a solicitação.');return;}
    const recipient=form.dataset.mailto;
    const prefix=form.dataset.subject||'Contato pelo site';
    window.location.href=buildMailto(form,recipient,prefix);
  });
});
