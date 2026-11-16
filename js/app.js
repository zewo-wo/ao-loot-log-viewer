let data = [];
let filtered = [];
let page = 1;
const pageSize = 25;
const $ = id => document.getElementById(id);
const fmt = n => new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(Number(n)||0);
const silver = n => fmt(n) + ' silver';
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Item artwork is fetched from Albion Online's public render service. No local assets folder is required.
// Albion item identifiers may include an enchantment suffix such as @1, @2, or @3.
const itemUrl = (id, quality=1, enchantment='') => {
  let identifier = String(id ?? '').trim();
  if (!identifier) return '';
  if (enchantment !== '' && !/@[0-3]$/.test(identifier)) identifier += '@' + String(enchantment).replace(/[^0-3]/g, '').slice(0,1);
  const safeId = encodeURIComponent(identifier).replace(/%40/gi, '@');
  const q = Math.min(5, Math.max(1, Number(quality) || 1));
  return `https://render.albiononline.com/v1/item/${safeId}.png?quality=${q}&size=64`;
};
const value = r => Number(r.quantity||0) * Number(r.average_est_market_value||0);
const dateVal = r => Date.parse(r.timestamp_utc) || 0;

function itemImage(id,name,extraClass='',quality=1,enchantment='') {
  const cls = ('item-icon ' + extraClass).trim();
  const src = itemUrl(id,quality,enchantment);
  return `<span class="item-cell-image">${`<img class="${cls}" loading="lazy" src="${src}" alt="${esc(name)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="item-icon item-fallback" hidden aria-hidden="true">⚔</span>`}</span>`;
}
function fillFilters() {
  const players = [...new Set(data.map(x=>x.looted_by__name).filter(Boolean))].sort();
  const clusters = [...new Set(data.map(x=>x.cluster).filter(Boolean))].sort();
  const guilds = [...new Set(data.map(x=>x.looted_by__guild).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  $('playerFilter').innerHTML = '<option value="">All looters</option>' + players.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
  $('guildFilter').innerHTML = '<option value="">Guild</option>' + guilds.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
  $('clusterFilter').innerHTML = '<option value="">All clusters</option>' + clusters.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
}
function update() {
  const q=$('search').value.trim().toLowerCase(), p=$('playerFilter').value, g=$('guildFilter').value, c=$('clusterFilter').value;
  filtered=data.filter(r=>(!p||r.looted_by__name===p)&&(!g||r.looted_by__guild===g)&&(!c||r.cluster===c)&&(!q||[r.item_name,r.item_id,r.looted_by__name,r.looted_by__guild,r.looted_from__name,r.looted_from__guild,r.cluster,r.looted_from__alliance].join(' ').toLowerCase().includes(q)));
  const s=$('sort').value;
  filtered.sort((a,b)=>s==='value'?value(b)-value(a):s==='quantity'?Number(b.quantity)-Number(a.quantity):s==='item'?String(a.item_name).localeCompare(String(b.item_name)):dateVal(b)-dateVal(a));
  page=1; render();
}
function render() {
  const sum=filtered.reduce((a,r)=>a+value(r),0), qty=filtered.reduce((a,r)=>a+Number(r.quantity||0),0);
  $('totalValue').textContent=silver(sum); $('recordCount').textContent=fmt(filtered.length); $('itemCount').textContent=fmt(qty);
  $('playerCount').textContent=fmt(new Set(filtered.map(r=>r.looted_by__name).filter(Boolean)).size);
  $('resultCount').textContent=data.length ? fmt(filtered.length)+' matching records' : 'Waiting for CSV upload';
  const pages=Math.max(1,Math.ceil(filtered.length/pageSize)); page=Math.min(page,pages);
  const rows=filtered.slice((page-1)*pageSize,page*pageSize);
  $('lootBody').innerHTML=rows.map(r=>`<tr>
    <td><div class="item-cell">${itemImage(r.item_id,r.item_name,'',r.quality,r.enchantment)}<div><strong>${esc(r.item_name)}</strong></div></div></td>
    <td><strong>${esc(r.looted_by__name)}</strong><br><span class="muted">${esc(r.looted_by__guild||'—')}</span></td>
    <td>${esc(r.looted_from__name||'—')}<br><span class="muted">${esc(r.looted_from__guild||'')}</span></td>
    <td>${esc(r.cluster)}</td><td class="num">${fmt(r.quantity)}</td><td class="num gold">${silver(value(r))}</td>
    <td class="muted">${esc((r.timestamp_utc||'').replace('T',' ').replace('Z','').slice(0,19))}</td></tr>`).join('') || (data.length ? '<tr><td colspan="7" class="muted">No matching loot records.</td></tr>' : '<tr><td colspan="7" class="empty-state"><strong>No loot data loaded yet.</strong><br>Choose <b>Import CSV</b> above to load your own Albion loot report.</td></tr>');
  $('pageInfo').textContent=`Page ${page} of ${pages} · Showing ${rows.length} of ${filtered.length}`;
  $('prevButton').disabled=page<=1 || !filtered.length; $('nextButton').disabled=page>=pages || !filtered.length;
  $('exportButton').disabled=!filtered.length;
  renderItems(); renderPlayers(); renderPlayerLoot();
}
function renderItems() {
  const map=new Map();
  filtered.forEach(r=>{const x=map.get(r.item_id)||{id:r.item_id,name:r.item_name,quality:r.quality,enchantment:r.enchantment,qty:0,val:0,count:0};x.qty+=Number(r.quantity||0);x.val+=value(r);x.count++;map.set(r.item_id,x);});
  $('itemCards').innerHTML=[...map.values()].sort((a,b)=>b.val-a.val).slice(0,24).map(x=>`<article class="item-card">${itemImage(x.id,x.name,'',x.quality,x.enchantment)}<div><strong>${esc(x.name)}</strong><small>${fmt(x.qty)} units · ${x.count} records</small><div class="gold">${silver(x.val)}</div></div></article>`).join('') || '<p class="muted">No items to show.</p>';
}
function renderPlayers() {
  const map=new Map();
  filtered.forEach(r=>{const n=r.looted_by__name||'Unknown',x=map.get(n)||{v:0,q:0,rows:0};x.v+=value(r);x.q+=Number(r.quantity||0);x.rows++;map.set(n,x);});
  const top=[...map.entries()].sort((a,b)=>b[1].v-a[1].v), max=top[0]?.[1].v||1;
  $('playerStats').innerHTML=top.map(([n,x])=>`<div class="player-row"><strong>${esc(n)}</strong><div><div class="bar"><span style="width:${x.v/max*100}%"></span></div><small class="muted">${fmt(x.q)} items · ${x.rows} records</small></div><strong class="gold" style="text-align:right">${silver(x.v)}</strong></div>`).join('') || '<p class="muted">No player data.</p>';
}

function deathDetails(raw) {
  const v = String(raw ?? '').trim();
  if (!v) return { dead: false, fame: 0 };
  const n = Number(v.replace(/,/g, ''));
  if (Number.isFinite(n) && n > 0) return { dead: true, fame: n };
  const truthy = /^(true|yes|y|dead|died|1)$/i.test(v);
  return { dead: truthy, fame: 0 };
}
function compactNumber(n) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(Number(n) || 0);
}
function renderPlayerLoot() {
  const players = new Map();
  filtered.forEach(r => {
    const name = r.looted_by__name || 'Unknown player';
    const guild = r.looted_by__guild || '';
    const playerKey = `${name}\u0000${guild}`;
    let player = players.get(playerKey);
    if (!player) {
      player = { name, guild, value: 0, quantity: 0, records: 0, dead: false, fame: 0, items: new Map() };
      players.set(playerKey, player);
    }
    const death = deathDetails(r.died);
    player.dead = player.dead || death.dead;
    player.fame = Math.max(player.fame, death.fame);
    player.value += value(r);
    player.quantity += Number(r.quantity || 0);
    player.records++;
    const key = `${r.item_id || r.item_name}|${r.quality || ''}|${r.enchantment || ''}`;
    let item = player.items.get(key);
    if (!item) {
      item = { id: r.item_id, name: r.item_name, quality: r.quality, enchantment: r.enchantment, quantity: 0, value: 0, records: 0 };
      player.items.set(key, item);
    }
    item.quantity += Number(r.quantity || 0);
    item.value += value(r);
    item.records++;
  });
  const sorted = [...players.values()].sort((a,b) => b.value - a.value || a.name.localeCompare(b.name));
  $('playerLootCount').textContent = `${sorted.length} players · ${fmt(filtered.length)} matching loot records`;
  $('playerLootGroups').innerHTML = sorted.map(player => {
    const items = [...player.items.values()].sort((a,b) => b.value - a.value);
    const fame = player.fame ? `<span class="player-fame" title="Death fame"><span aria-hidden="true">☠</span> ${compactNumber(player.fame)}</span>` : '';
    return `<article class="player-loot-card ${player.dead ? 'player-dead' : 'player-alive'}">
      <div class="player-loot-heading">
        <div class="player-identity"><h3>${esc(player.name)}</h3><div class="player-guild">${esc(player.guild || 'No guild listed')}</div></div>
        <div class="player-loot-totals">${fame}<small>${fmt(player.quantity)} items · ${silver(player.value)}</small></div>
      </div>
      <div class="player-item-strip">${items.map(item => `<div class="player-item-icon" title="${esc(item.name)} · ${fmt(item.quantity)} units · ${silver(item.value)}">
        ${itemImage(item.id,item.name,'',item.quality,item.enchantment)}
        <span class="player-item-quantity">${fmt(item.quantity)}</span>
      </div>`).join('')}</div>
    </article>`;
  }).join('') || '<p class="muted">No player loot matches the selected filters.</p>';
}

function parseCsv(text) {
  // Handles comma/semicolon delimiters, quoted fields, escaped quotes and newlines inside quotes.
  text = text.replace(/^\uFEFF/, '');
  const firstLine = text.split(/\r?\n/, 1)[0] || '';
  const delimiter = firstLine.includes(';') ? ';' : ',';
  const rows=[]; let row=[], field='', quoted=false;
  for(let i=0;i<text.length;i++) {
    const ch=text[i];
    if(ch==='"' && quoted && text[i+1]==='"') { field+='"'; i++; }
    else if(ch==='"') quoted=!quoted;
    else if(ch===delimiter && !quoted) { row.push(field); field=''; }
    else if((ch==='\n'||ch==='\r') && !quoted) {
      if(ch==='\r' && text[i+1]==='\n') i++;
      row.push(field); if(row.some(v=>v!=='')) rows.push(row); row=[]; field='';
    } else field+=ch;
  }
  row.push(field); if(row.some(v=>v!=='')) rows.push(row);
  if(rows.length<2) throw Error('The CSV has a header but no data rows.');
  const headers=rows[0].map((h,i)=>String(h).trim().replace(/^\uFEFF/,''));
  if(!headers.includes('item_id') || !headers.includes('item_name')) throw Error('Missing required columns: item_id and item_name.');
  return rows.slice(1).map(vals=>{
    const r={}; headers.forEach((h,i)=>r[h]=vals[i]??'');
    r.quantity=Number(String(r.quantity??'').replace(/,/g,''))||0;
    r.average_est_market_value=Number(String(r.average_est_market_value??'').replace(/,/g,''))||0;
    return r;
  }).filter(r=>r.item_id || r.item_name);
}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));['loot','items','players','playerLoot'].forEach(id=>$(id).classList.toggle('hidden',id!==b.dataset.tab));}));
['search','playerFilter','guildFilter','clusterFilter','sort'].forEach(id=>$(id).addEventListener('input',update));
$('prevButton').onclick=()=>{page--;render();}; $('nextButton').onclick=()=>{page++;render();};
$('exportButton').onclick=()=>{const cols=Object.keys(data[0]||{});const csv=[cols.join(';'),...filtered.map(r=>cols.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(';'))].join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='albion-loot-filtered.csv';a.click();URL.revokeObjectURL(a.href);};
$('fileInput').onchange=async e=>{
  const file=e.target.files[0]; if(!file)return;
  try {
    const next=parseCsv(await file.text());
    if(!next.length) throw Error('No valid loot rows were found in this CSV.');
    data=next; fillFilters(); update();
    $('search').value=''; $('playerFilter').value=''; $('guildFilter').value=''; $('clusterFilter').value=''; update();
  } catch(err) { alert('Could not import CSV: '+err.message); }
  e.target.value='';
};
// Start intentionally empty. Nothing is loaded until the visitor selects their own CSV.
function start(){ data=[]; fillFilters(); update(); }
start();
