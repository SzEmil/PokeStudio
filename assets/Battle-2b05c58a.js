import{u as j,a as o,w as k,l as p,j as s,n as r,I as N}from"./index-e6aeb932.js";import{s as b,a as y}from"./PokeDex-033f62d5.js";import{P as x}from"./pokeFront-6e1f67ea.js";const A="_battle_d95r7_1",B="_chosenPokemons_d95r7_7",I="_chosenPokemonsAI_d95r7_10",P="_arena_d95r7_13",v="_list_d95r7_23",F="_item_d95r7_29",C="_itemAI_d95r7_34",g="_pokeFrontBox_d95r7_41",D="_name_d95r7_44",T="_menu_d95r7_53",w="_difficultyBox_d95r7_60",E="_difficultyText_d95r7_63",U="_btn_d95r7_74",e={battle:A,chosenPokemons:B,chosenPokemonsAI:I,arena:P,list:v,item:F,itemAI:C,pokeFrontBox:g,name:D,menu:T,difficultyBox:w,difficultyText:E,btn:U},S=()=>{const u=j(),i=o(b),_=i.cards,a=o(y),h=o(k),m=o(p),c=m.filter(t=>{const n=t.name;return _.some(l=>l.overview.name===n)}),f=m.filter(t=>{const n=t.name;return a.cards.some(l=>l.name===n)}),d=t=>{var n;((n=a.cards)==null?void 0:n.length)>0||u(N(t))};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:e.menu,children:[s.jsx("h3",{className:e.difficultyText,children:"Difficulty:"}),s.jsxs("div",{className:e.difficultyBox,children:[s.jsx("button",{className:e.btn,type:"button",onClick:()=>d("easy"),children:"Easy"}),s.jsx("button",{className:e.btn,type:"button",onClick:()=>d("medium"),children:"Medium"})]})]}),s.jsxs("div",{className:e.battle,children:[s.jsxs("div",{className:e.chosenPokemons,children:[s.jsx("h2",{className:e.name,children:h.username}),i.cards.length<3?s.jsx("p",{children:"Add more cards to start battle"}):s.jsx("ul",{className:e.list,children:c==null?void 0:c.map(t=>s.jsx("li",{className:e.item,children:s.jsx("div",{className:e.pokeFrontBox,children:s.jsx(x,{pokemon:t})})},r()))})]}),s.jsx("div",{className:e.arena}),s.jsxs("div",{className:e.chosenPokemonsAI,children:[s.jsx("h2",{className:e.name,children:"AI"}),a.cards.length<3?s.jsx("ul",{className:e.list,children:s.jsx("li",{className:e.item,children:s.jsx("div",{className:e.pokeFrontBox})},r())}):s.jsx("ul",{className:e.list,children:f.map(t=>s.jsx("li",{className:e.itemAI,children:s.jsx("div",{className:e.pokeFrontBox,children:s.jsx(x,{pokemon:t})})},r()))})]})]})]})};export{S as default};