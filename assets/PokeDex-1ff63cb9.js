import{a as d,p as j,j as e,N as b,e as _,n as k,r as h,u,q as P,t as C,v as m,w as N,x as f,P as S,y,z as g,S as B}from"./index-fd3c8c60.js";const w="_pokeDex_49l12_1",q="_userWrapper_49l12_8",O="_list_49l12_15",$="_listBtn_49l12_21",p={pokeDex:w,userWrapper:q,list:O,listBtn:$},A="_list_1rxbc_1",D="_link_1rxbc_8",x={list:A,link:D},L=()=>{const s=d(j).cards.slice(1);return s.length===0?e.jsx("p",{children:"You don't have any Pokémon in your shelf. Buy packs to get Pokémon"}):e.jsx("ul",{className:x.list,children:s.map(o=>e.jsx("li",{style:{width:"400px"},children:e.jsx(b,{className:x.link,to:`/pokemon/${o.overview.id}`,children:e.jsx(_,{pokemon:o})})},k()))})},T="_card_eh3hp_1",W="_picked_eh3hp_22",I="_title_eh3hp_26",E="_price_eh3hp_39",M="_overlay_eh3hp_52",U="_btn_eh3hp_65",l={card:T,picked:W,title:I,price:E,overlay:M,btn:U},z=({type:n,handleOnClick:s})=>{const[o,t]=h.useState(!1);let i=0;return n==="gold"&&(i=500),n==="silver"&&(i=200),e.jsxs("div",{className:`${l.card} ${o?l.picked:""}`,onClick:()=>t(c=>!c),children:[e.jsx("h2",{className:l.title,children:"Gold Pack"}),e.jsxs("p",{className:l.price,children:[n==="gold"&&i,"$"]}),o&&e.jsxs("div",{className:l.overlay,children:[e.jsx("button",{className:l.btn,type:"button",onClick:c=>{c.stopPropagation(),s(c),t(!1)},children:"Buy"}),e.jsx("button",{className:l.btn,type:"button",onClick:c=>{c.stopPropagation(),t(!1)},children:"Cancel"})]})]})},G="_pokeShop_64qr0_1",Q="_packedPokemon_64qr0_7",Y="_packedPokemonWrapper_64qr0_20",F="_card_64qr0_25",R="_description_64qr0_29",H="_descriptionTitle_64qr0_34",J="_descriptionText_64qr0_45",K="_btnCardBox_64qr0_53",V="_btnAddCardBox_64qr0_56",a={pokeShop:G,packedPokemon:Q,packedPokemonWrapper:Y,card:F,description:R,descriptionTitle:H,descriptionText:J,btnCardBox:K,btnAddCardBox:V},v=n=>n.pokeShop.packedPokemon,X=n=>n.pokeShop.isLoadingOverview,Z=n=>n.pokeShop.isLoadingMoreDetails,ee="_btn_ylqld_1",se={btn:ee},ne=({price:n})=>{const s=u(),o=d(v),t=d(P),i=async()=>{const c=o;if(t<n)return console.error("not enough coins!");s(C({card:c})),s(m())};return e.jsx("button",{className:se.btn,type:"button",onClick:i,children:"Add card"})},oe="_btn_1v2yo_1",te={btn:oe},ce=({ovrl:n})=>{function s(){return Number(n*3)}const o=u(),t=s(),i=()=>{o(N(t)),o(m())};return e.jsxs("button",{className:te.btn,type:"button",onClick:i,children:["Quick Sell for ",t]})},ie=()=>{const n=u(),s=d(v),o=d(X),t=d(Z);function i(){return Math.floor(Math.random()*897)+1}const c=r=>{r.stopPropagation(),console.log("kupiono paczke"),n(y(500)),n(g(i()))};return h.useEffect(()=>{var r;(s==null?void 0:s.overview)!==null&&(r=s==null?void 0:s.overview)!=null&&r.species&&n(f(s.overview.species.url))},[s.overview,n]),e.jsxs("div",{className:a.pokeShop,children:[e.jsx("ul",{children:e.jsx("li",{children:e.jsx(z,{type:"gold",handleOnClick:c})})}),e.jsx("div",{children:o?e.jsx(S,{}):e.jsx("div",{className:a.wrapper,children:s.overview===null||t||s.details===null?null:e.jsx(e.Fragment,{children:e.jsx("div",{className:a.packedPokemon,children:e.jsxs("div",{className:a.packedPokemonWrapper,children:[e.jsx("div",{className:a.card,children:e.jsx(_,{pokemon:s})}),e.jsxs("div",{children:[e.jsxs("div",{className:a.description,children:[e.jsx("h2",{className:a.descriptionTitle,children:"Congratulations!"}),e.jsxs("p",{className:a.descriptionText,children:['Congratulations on your find! Your pack has brought you a Pokémon named "',s.overview.name,'". Now you have the option to add it to your Pokédex list or the quick sell option to earn coins.']})]}),e.jsxs("div",{className:a.btnAddCardBox,children:[e.jsx(ne,{price:500}),e.jsx("div",{className:a.btnCardBox,children:e.jsx(ce,{ovrl:s.overview.base_experience})})]})]})]})})})})})]})},re=()=>{const[n,s]=h.useState(!1),[o,t]=h.useState(!1),i=()=>{s(r=>!r),t(!1)},c=()=>{t(r=>!r),s(!1)};return e.jsxs("div",{className:p.pokeDex,children:[e.jsxs("ul",{className:p.list,children:[e.jsx("li",{children:e.jsx("button",{className:p.listBtn,type:"button",onClick:()=>i(),children:"Shelf"})},k()),e.jsx("li",{children:e.jsx("button",{className:p.listBtn,type:"button",onClick:()=>c(),children:"Store"})},k())]}),e.jsx(B,{children:e.jsxs("div",{className:p.userWrapper,children:[n?e.jsx(L,{}):null,o?e.jsx(ie,{}):null]})})]})};export{re as default};