import{u as x,a,s as S,b as B,c as F,d as D,r as p,f as C,j as e,P as f,N as g,e as I,g as _,h as M,i as b,n as $,k as y,l as R,m as E,S as U,o as O}from"./index-708ea387.js";const W="_wrapper_12nlx_1",T="_link_12nlx_9",k={wrapper:W,link:T},A=()=>{function n(){const u=new Date,L=u.getDate().toString().padStart(2,"0"),N=(u.getMonth()+1).toString().padStart(2,"0"),P=u.getFullYear().toString();return`${L}-${N}-${P}`}function o(){return Math.floor(Math.random()*898)+1}const s=x(),t=a(S),r=a(B),c=a(F),h=n(),l=a(D),w=()=>{if(t.overview===null&&t.details===null){s(_(o()));return}else if(t.overview!==null&&t.details!==null&&h!==l){s(_(o()));return}};return p.useEffect(()=>{w()},[]),p.useEffect(()=>{t.overview!==null&&t!=null&&t.overview.species&&s(C(t.overview.species.url))},[t.overview,s]),e.jsx(e.Fragment,{children:r?e.jsx(f,{}):e.jsx("div",{className:k.wrapper,children:t.overview===null||c||t.details===null?e.jsx("p",{children:"loading data..."}):e.jsx(e.Fragment,{children:e.jsx(g,{className:k.link,to:`/pokemon/${t.overview.id}`,children:e.jsx(I,{pokemon:t})})})})})},H="_card_182tl_2",G="_image_182tl_48",V="_info_182tl_60",Y="_name_182tl_64",m={card:H,image:G,info:V,name:Y},q=p.memo(({pokemon:{name:n,url:o}})=>{const s=r=>{const c=r[0].toUpperCase();return r.replace(c.toLocaleLowerCase(),c)},t=r=>r.split("").slice(0,length-1).slice(34).join("");return e.jsx(e.Fragment,{children:e.jsx(g,{to:`/pokemon/${t(o)}`,children:e.jsxs("div",{className:m.card,children:[e.jsx("img",{className:m.image,alt:n,src:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${t(o)}.png`,onError:r=>{const c=r.target;c.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${t(o)}.png`}}),e.jsx("div",{className:m.info,children:e.jsx("h2",{className:m.name,children:s(n)})})]})})})}),z="_listBox_1hi8c_1",J="_list_1hi8c_1",K="_btnBox_1hi8c_14",Q="_btn_1hi8c_14",X="_btnScrollWrapper_1hi8c_37",Z="_btnMoveScrollBox_1hi8c_42",ee="_notFound_1hi8c_45",i={listBox:z,list:J,btnBox:K,btn:Q,btnScrollWrapper:X,btnMoveScrollBox:Z,notFound:ee},te="_btnUp_1lxrj_1",ne="_btnDown_1lxrj_18",j={btnUp:te,btnDown:ne},v=({btnType:n})=>{const o=()=>{window.scrollTo({top:0,behavior:"smooth"})},s=()=>{window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})};return e.jsxs("div",{children:[n==="up"&&e.jsx("button",{className:j.btnUp,type:"button",onClick:o,children:"^"}),n==="down"&&e.jsx("button",{className:j.btnDown,type:"button",onClick:s,children:"^"}),n!=="down"&&n!=="up"&&e.jsx("p",{children:"Wrong button type! Allowed is down or up"})]})},oe=({pokemons:n})=>{const o=a(M),[s,t]=p.useState(12),r=a(b),c=n.slice(0,s),h=()=>{t(l=>l+=12)};return e.jsx(e.Fragment,{children:o?e.jsx(f,{}):e.jsxs("div",{className:i.listBox,children:[e.jsx("ul",{className:i.list,children:c.length!==0?c==null?void 0:c.map(l=>e.jsx("li",{children:e.jsx(q,{pokemon:l})},$())):e.jsx("div",{className:i.notFound,children:e.jsxs("p",{children:['There is no pokemon named: "',r,'".']})})}),e.jsx("div",{className:i.btnBox,children:e.jsx("button",{className:i.btn,type:"button",onClick:h,children:"Load more"})}),e.jsxs("div",{className:i.btnScrollWrapper,children:[e.jsx("div",{children:e.jsx(v,{btnType:"up"})}),e.jsx("div",{className:i.btnMoveScrollBox,children:e.jsx(v,{btnType:"down"})})]})]})})},se="_input_y6sav_1",re={input:se},ce=({filterType:n})=>{const o=x(),s=a(b),t=r=>{const c=r==null?void 0:r.target.value;o(y(c))};return e.jsx("div",{children:e.jsx("input",{className:re.input,type:"text",placeholder:"Input pokemon name",name:"pokeName",value:s,onChange:n==="home"?t:void 0})})},ae="_wrapper_r35rf_1",ie="_hotPokemon_r35rf_7",le="_pokeList_r35rf_14",de="_searchBar_r35rf_17",pe="_pokemonList_r35rf_23",d={wrapper:ae,hotPokemon:ie,pokeList:le,searchBar:de,pokemonList:pe},he=()=>{const n=x(),o=a(R),s=a(E),t=()=>{if(o.length===0&&o.length===0)return n(O())};return p.useEffect(()=>{t()},[]),e.jsx(e.Fragment,{children:e.jsx(U,{children:e.jsxs("div",{className:d.wrapper,children:[e.jsxs("div",{className:d.pokeList,children:[e.jsx("div",{className:d.searchBar,children:e.jsx(ce,{filterType:"home"})}),e.jsx("div",{className:d.pokemonList,children:e.jsx(oe,{pokemons:s})})]}),e.jsx("div",{className:d.hotPokemon,children:e.jsx(A,{})})]})})})};export{he as default};
