import{r as i,u as ke,a as f,l as ge,p as k,D as V,E as Z,j as e,n as u,R as ve,e as ee,F as Ne,G as be,H as Be,I as Ce,J as Te,K as Pe,L as Ae,M as we,O as ye}from"./index-4850afdb.js";import{b as Ie,P as se}from"./pokemonsSelectors-eb1ebb9f.js";import{s as De,a as Fe,b as Se,c as Ge,d as $e,e as Me}from"./PokeDex-8be6a8da.js";const Ue="_battle_1dm8j_1",Ee="_chosenPokemons_1dm8j_10",Oe="_chosenPokemonsAI_1dm8j_13",Re="_arena_1dm8j_16",Le="_errorMessage_1dm8j_32",Ye="_moveBox_1dm8j_42",He="_list_1dm8j_47",ze="_item_1dm8j_53",Je="_itemAI_1dm8j_59",Ke="_pokeFrontBox_1dm8j_66",We="_name_1dm8j_69",Xe="_menuGear_1dm8j_77",qe="_menu_1dm8j_77",Qe="_menuBackdrop_1dm8j_105",Ve="_menuTitle_1dm8j_114",Ze="_menuList_1dm8j_122",es="_menuItem_1dm8j_128",ss="_difficultyBox_1dm8j_131",ts="_menuText_1dm8j_135",as="_menuRulesBox_1dm8j_145",ns="_menuRulesBoxOpen_1dm8j_161",os="_rulesTitle_1dm8j_164",ls="_rulesText_1dm8j_173",is="_btn_1dm8j_184",cs="_menuCloseBtn_1dm8j_207",ms="_pokemonArenaUser_1dm8j_229",rs="_defeated_1dm8j_239",ds="_pokemonArenaComputer_1dm8j_243",us="_pokeArenaImage_1dm8j_252",hs="_moveUpDown_1dm8j_1",_s="_userAtacking_1dm8j_257",fs="_attackAI_1dm8j_1",ps="_computerAtacking_1dm8j_271",xs="_attackUser_1dm8j_1",js="_healthBar_1dm8j_296",ks="_health_1dm8j_296",gs="_healthText_1dm8j_308",vs="_userGui_1dm8j_318",Ns="_guiPokemonName_1dm8j_326",bs="_userBtn_1dm8j_334",Bs="_userGuiPokemonStats_1dm8j_358",Cs="_statsText_1dm8j_365",Ts="_computerGui_1dm8j_372",Ps="_gameFinished_1dm8j_380",As="_gameFinishedModal_1dm8j_389",ws="_gameFinishedTitle_1dm8j_410",ys="_gameFinishedText_1dm8j_419",Is="_disabledBtn_1dm8j_426",Ds="_pokemonDefending_1dm8j_431",Fs="_pickedPokemonBar_1dm8j_436",Ss="_lostPokemon_1dm8j_454",Gs="_lostPokemonList_1dm8j_457",s={battle:Ue,chosenPokemons:Ee,chosenPokemonsAI:Oe,arena:Re,errorMessage:Le,moveBox:Ye,list:He,item:ze,itemAI:Je,pokeFrontBox:Ke,name:We,menuGear:Xe,menu:qe,menuBackdrop:Qe,menuTitle:Ve,menuList:Ze,menuItem:es,difficultyBox:ss,menuText:ts,menuRulesBox:as,menuRulesBoxOpen:ns,rulesTitle:os,rulesText:ls,btn:is,menuCloseBtn:cs,pokemonArenaUser:ms,defeated:rs,pokemonArenaComputer:ds,pokeArenaImage:us,moveUpDown:hs,userAtacking:_s,attackAI:fs,computerAtacking:ps,attackUser:xs,healthBar:js,health:ks,healthText:gs,userGui:vs,guiPokemonName:Ns,userBtn:bs,userGuiPokemonStats:Bs,statsText:Cs,computerGui:Ts,gameFinished:Ps,gameFinishedModal:As,gameFinishedTitle:ws,gameFinishedText:ys,disabledBtn:Is,pokemonDefending:Ds,pickedPokemonBar:Fs,lostPokemon:Ss,lostPokemonList:Gs},Es=()=>{const[te,M]=i.useState(0),[ae,U]=i.useState([""]),[g,P]=i.useState(!0),[E,A]=i.useState(!1),[h,B]=i.useState(!1),[ne,v]=i.useState(!1),[N,O]=i.useState(""),[oe,R]=i.useState(!1),[le,w]=i.useState(!1),[j,ie]=i.useState(),[_,C]=i.useState(0),[T,y]=i.useState(0),[ce,me]=i.useState(!1),[L,re]=i.useState([]),[de,ue]=i.useState([""]),[he,Y]=i.useState(!1),[_e,H]=i.useState(!1),r=ke(),I=f(De),p=I.cards,x=f(Fe),D=f(ge),F=f(Se),z=f(Ge),m=f($e),fe=f(Me);let n=I.pokemonOnArena,o=x.pokemonOnArena;const J=f(Ie),S=J.filter(t=>{const a=t.name;return p.some(l=>l.overview.name===a)}),G=J.filter(t=>{const a=t.name;return x.cards.some(l=>l.name===a)});i.useEffect(()=>{m===!1&&(o=null)},[m]);const K=t=>{r(Ne(t)),ie(t)},pe=t=>{const a=p.filter(l=>l.overview.name===t);r(Z(a[0]))},W=(t,a)=>{if(F===!1)return k.Notify.failure("wait for youre turn User!");console.log("user atakuje");let l=o.stats[0].base_stat;const d=o.stats[2].base_stat/10;if(console.log(h,"poza warunkiem"),h){console.log(h);let c=a-d;c<0&&(c=0),l-=c,B(!1),setTimeout(()=>{v(!1)},2e3)}else l-=a;const b=l.toFixed(2);r(be({healtForDispatch:b,id:t})),_!==3&&(C(c=>c+=1),console.log(_)),Y(!0),setTimeout(()=>{Y(!1)},1500)},X=t=>{if(z===!1)return k.Notify.failure("wait for youre turn Computer!");console.log(h,"poza warunkiem"),B(!1),v(!1);const a=n.overview.id,l=n.overview.stats[2].base_stat/10;let d=n.overview.stats[0].base_stat;if(E){let c=t-l;c<0&&(c=0),d-=c,setTimeout(()=>{A(!1)},2e3)}else d-=t;T!==3&&(y(c=>c+=1),console.log(_)),H(!0);const b=d.toFixed(2);r(Be({healtForDispatch:b,id:a})),setTimeout(()=>{H(!1)},1500)},xe=()=>{A(!0),_!==3&&C(t=>t+=1),r(Ce()),B(!1),setTimeout(()=>{v(!1)},2e3)},q=()=>{v(!0),B(!0),setTimeout(()=>{A(!1)},2e3),T!==3&&(y(t=>t+=1),console.log(_)),r(Te()),setTimeout(()=>{v(!1)},2e3)},je=()=>{if((p.length<3||x.cards.length<3)&&k.Notify.warning("Pick difficulty level or add pokemons for battle"),n)P(!1),r(Pe()),r(V(x.cards[te])),M(t=>t+=1);else{k.Notify.warning("U must pick pokemon to start");return}},$=()=>{r(Ae()),M(0),U([""]),C(0)},Q=(t,a)=>{if(t==="won"){let l=0;a==="easy"&&(l=1e3),a==="medium"&&(l=1500),r(we(l))}if(t==="lost"){const l=p.map(c=>c.overview.id);let d=[];if(a==="easy"&&d.push(l[Math.floor(Math.random()*l.length)]),a==="medium")for(;d.length<2;){const c=Math.floor(Math.random()*l.length);d.includes(l[c])||d.push(l[c])}const b=p.filter(c=>d.includes(c.overview.id));re(b),r(ye(d))}};return i.useEffect(()=>{if(m!==!1){if(console.log("game logic"),o.stats[0].base_stat<=0){const t=x.cards.findIndex(a=>a.stats[0].base_stat>0);if(t<0)return O("won"),R(!0),w(!0),$(),Q("won",j),k.Notify.success(`Congrats ${D.username}, You have won a battle!`);o.stats[0].base_stat<=0&&(setTimeout(()=>{r(V(x.cards[t]))},1500),setTimeout(()=>{ue(a=>[...a,o.name])},100))}if(F===!1&&z===!0){const t=o.stats[1].base_stat/10,a=o.stats[3].base_stat/10;console.log(T),T===3&&Math.random()>.1?(X(a),console.log("pc SUPERatakuje"),console.log(h),y(0)):Math.random()<.3||_===3&&Math.random()<.5?(q(),console.log("pc DEFENDUJE SIE"),console.log(h)):(X(t),console.log("pc ATAKUJE"),console.log(h))}if(n.overview.stats[0].base_stat<=0){const t=p.findIndex(a=>a.overview.stats[0].base_stat>0);if(t<0)return O("lost"),R(!0),w(!0),$(),Q("lost",j),k.Notify.success(`You lost! Dont worry ${D.username}, You can try again!`);t>=0&&(r(Z(p[t])),U(a=>[...a,n.overview.name]))}}}),e.jsx(e.Fragment,{children:e.jsxs("div",{className:s.battle,children:[e.jsxs("div",{className:s.chosenPokemons,children:[e.jsx("h2",{className:s.name,children:D.username}),I.cards.length<3?e.jsx("p",{className:s.errorMessage,children:"Add more cards to start battle!"}):e.jsx("ul",{className:s.list,children:S==null?void 0:S.map(t=>{let a=s.item;return n!==null&&(a=ae.includes(t.name)?`${s.item} ${s.defeated}`:s.item),e.jsx("li",{className:`${a} ${n!==null&&n.overview.name===t.name?s.pickedPokemonBar:""}`,onClick:()=>pe(t.name),children:e.jsx("div",{className:s.pokeFrontBox,children:e.jsx(se,{pokemon:t})})},u())})})]}),e.jsxs("div",{className:s.arena,style:{backgroundImage:"url(https://i.redd.it/dnlz6c3xni951.jpg)"},children:[m&&e.jsxs("p",{className:s.moveBox,children:["Move: ",F?e.jsx("span",{children:"User"}):e.jsx("span",{children:"Computer"})]}),g?null:e.jsx("div",{className:s.menuGear,onClick:()=>P(t=>!t),children:e.jsx(ve,{size:"36px"})}),g?e.jsxs("div",{className:s.menuBackdrop,children:[e.jsxs("div",{className:s.menu,children:[e.jsx("button",{type:"button",className:s.menuCloseBtn,onClick:()=>P(t=>!t),children:"X"}),e.jsx("h2",{className:s.menuTitle,children:"Menu"}),e.jsxs("ul",{className:s.menuList,children:[e.jsx("li",{className:s.menuItem,children:e.jsx("button",{className:`${s.btn} ${m===!1?"":s.disabledBtn}`,onClick:()=>je(),disabled:!!m,children:"Start game"})},u()),e.jsx("li",{className:s.menuItem,children:e.jsxs("div",{className:s.difficultyBox,children:[e.jsx("h3",{className:s.menuText,children:"Difficulty:"}),e.jsx("button",{className:`${s.btn} ${m===!1?"":s.disabledBtn}`,type:"button",onClick:()=>K("easy"),children:"Easy"}),e.jsx("button",{className:`${s.btn} ${m===!1?"":s.disabledBtn}`,type:"button",onClick:()=>K("medium"),children:"Medium"})]})},u()),e.jsx("li",{className:s.menuItem,children:e.jsx("button",{className:s.btn,onClick:()=>me(t=>!t),children:"Rules"})},u()),e.jsx("li",{className:s.menuItem,children:e.jsx("button",{className:`${s.btn} ${m?"":s.disabledBtn}`,onClick:()=>$(),disabled:!m,children:"End game"})},u())]})]}),e.jsxs("div",{className:`${s.menuRulesBox} ${ce?s.menuRulesBoxOpen:""}`,children:[e.jsx("h2",{className:s.rulesTitle,children:"Rules"}),e.jsx("p",{className:s.rulesText,children:"During the game you will use three of your pokemons. Use the buttons to perform the appropriate action, such as attack or defense. Your special attack takes 3 rounds to recharge. Attack and defence stats of pokemons stats are divided by 10. When you lose on easy you lose one pokemon. If you lose on Medium, you lose two Pokemon. When you win on easy you get 1000 coins. After winning on medium level you get 2000 coins. Have fun pokemon trainer!"})]})]}):null,fe&&g===!1&&oe===!0&&le===!0?e.jsx("div",{className:s.gameFinished,children:e.jsxs("div",{className:s.gameFinishedModal,children:[e.jsx("button",{type:"button",className:s.menuCloseBtn,onClick:()=>w(t=>!t),children:"X"}),e.jsx("h2",{className:s.gameFinishedTitle,children:N==="won"?e.jsx("span",{children:"Congrats You have won a duel!"}):e.jsx("span",{children:"You lost!"})}),N==="won"&&j==="easy"&&e.jsx("div",{children:e.jsx("p",{className:s.gameFinishedText,children:"You have won 1000 coins!"})}),N==="won"&&j==="medium"&&e.jsx("p",{className:s.gameFinishedText,children:"You have won 1500 coins!"}),N==="lost"&&j==="easy"&&e.jsxs("div",{children:[e.jsx("p",{className:s.gameFinishedText,children:"You have lost one of youre cards!. You didnt get coins for this!"}),e.jsx("ul",{children:L.map(t=>e.jsx("li",{className:s.lostPokemon,children:e.jsx(ee,{pokemon:t})},u()))})]}),N==="lost"&&j==="medium"&&e.jsxs("div",{children:[e.jsx("p",{className:s.gameFinishedText,children:"You have lost two of youre cards!. You didnt get coins for this!"}),e.jsx("ul",{className:s.lostPokemonList,children:L.map(t=>e.jsx("li",{className:s.lostPokemon,children:e.jsx(ee,{pokemon:t})},u()))})]})]})}):null,n===null||m===!1?null:e.jsxs("div",{className:s.pokemonArenaUser,children:[e.jsx("img",{className:`${s.pokeArenaImage} ${E?s.pokemonDefending:""} ${he?s.userAtacking:""}`,alt:"picked Pokemon",src:n.overview.sprites.back_default?n.overview.sprites.back_default:n.overview.sprites.front_default}),e.jsx("h2",{children:n.overview.name}),e.jsx("div",{className:s.healthBar,style:{width:`${n.overview.stats[0].base_stat}px`},children:e.jsx("div",{className:s.health,children:e.jsxs("div",{className:s.healthText,children:["HP:",n.overview.stats[0].base_stat]})})})]}),o===null&&m===!1?null:e.jsxs("div",{className:s.pokemonArenaComputer,children:[e.jsx("img",{className:`${s.pokeArenaImage} ${ne?s.pokemonDefending:""} ${_e?s.computerAtacking:""}`,alt:"picked Pokemon",src:o.sprites.front_default}),e.jsx("h2",{children:o.name}),e.jsx("div",{className:s.healthBar,style:{width:`${o.stats[0].base_stat}px`},children:e.jsx("div",{className:s.health,children:e.jsxs("div",{className:s.healthText,children:["HP:",o.stats[0].base_stat]})})})]}),n===null||m===!1||g===!0?null:e.jsxs("div",{className:s.userGui,children:[e.jsx("h2",{className:s.guiPokemonName,children:n.overview.name}),e.jsxs("div",{children:[e.jsxs("button",{className:s.userBtn,type:"button",onClick:()=>W(o.id,n.overview.stats[1].base_stat/10),children:["Hit ",n.overview.stats[1].base_stat]}),e.jsxs("button",{className:`${s.userBtn} ${_<3?s.disabledBtn:""}`,type:"button",onClick:()=>{W(o.id,n.overview.stats[3].base_stat/10),C(0)},disabled:_<3,children:["Special Attack"," ",n.overview.stats[3].base_stat]}),e.jsxs("button",{className:s.userBtn,type:"button",onClick:()=>xe(),children:["Defend ",n.overview.stats[2].base_stat]})]}),e.jsx("ul",{className:s.userGuiPokemonStats,children:n==null?void 0:n.overview.stats.map(t=>e.jsx("li",{children:e.jsxs("p",{className:s.statsText,children:[t.stat.name,":"," ",e.jsx("span",{className:s.statsTextOvrl,children:t.base_stat})]})},u()))})]}),o===null||m===!1||g===!0?null:e.jsxs("div",{className:s.computerGui,children:[e.jsx("h2",{className:s.guiPokemonName,children:o.name}),e.jsx("ul",{className:s.userGuiPokemonStats,children:o==null?void 0:o.stats.map(t=>e.jsx("li",{children:e.jsxs("p",{className:s.statsText,children:[t.stat.name,":"," ",e.jsx("span",{className:s.statsTextOvrl,children:t.base_stat})]})},u()))})]})]}),e.jsxs("div",{className:s.chosenPokemonsAI,children:[e.jsx("h2",{className:s.name,children:"AI"}),x.cards.length<3?e.jsx("ul",{className:s.list,children:e.jsx("li",{className:s.item,children:e.jsx("div",{className:s.pokeFrontBox})},u())}):e.jsx("ul",{className:s.list,children:G==null?void 0:G.map(t=>{let a=s.item;return o!==null&&(a=de.includes(t.name)?`${s.itemAI} ${s.defeated}`:s.item),e.jsx("li",{className:`${a} ${o!==null&&o.name===t.name?s.pickedPokemonBar:""}`,children:e.jsx("div",{className:s.pokeFrontBox,children:e.jsx(se,{pokemon:t})})},u())})})]})]})})};export{Es as default};
