import{j as e,n as x,u as j,a as o,s as f,b as y,c as k,d as B,r as m,f as $,e as h,g as L,h as D,i as F}from"./index-20186483.js";const I="_wrapper_1tjdb_1",R={wrapper:I},S="_pokeball_bewmb_1",C="_frames_bewmb_1",v={pokeball:S,frames:C},b=()=>e.jsx("div",{children:e.jsx("div",{className:v.wrapper,children:e.jsx("div",{className:v.pokeball})})}),M="_wrapper_1tabi_1",O="_headBar_1tabi_9",q="_titleBox_1tabi_16",E="_title_1tabi_16",P="_image_1tabi_40",A="_cardBox_1tabi_44",G="_card_1tabi_44",H="_name_1tabi_74",U="_nameTag_1tabi_81",V="_overall_1tabi_89",Y="_typesBox_1tabi_117",z="_typeText_1tabi_123",J="_typeTextmodifier_1tabi_132",K="_overview_1tabi_144",Q="_overviewTitleBox_1tabi_151",W="_overviewTitle_1tabi_151",X="_stats_1tabi_164",Z="_statsText_1tabi_172",ee="_statsTextOvrl_1tabi_181",se="_abilities_1tabi_185",te="_ability_1tabi_188",ae="_abilitiesText_1tabi_193",ie="_checkDescription_1tabi_207",ne="_description_1tabi_218",re="_checkDescriptionText_1tabi_221",ce="_descriptionText_1tabi_241",t={wrapper:M,headBar:O,titleBox:q,title:E,image:P,cardBox:A,card:G,name:H,nameTag:U,overall:V,typesBox:Y,typeText:z,typeTextmodifier:J,overview:K,overviewTitleBox:Q,overviewTitle:W,stats:X,statsText:Z,statsTextOvrl:ee,abilities:se,ability:te,abilitiesText:ae,checkDescription:ie,description:ne,checkDescriptionText:re,descriptionText:ce},oe=({pokemon:n})=>{var a,c;const r=i=>{const l=i[0].toUpperCase();return i.replace(l.toLocaleLowerCase(),l)},s=n;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:t.cardBox,children:[e.jsx("div",{className:t.titleBox,children:e.jsx("h2",{className:t.title,children:"Pokemon of a day!"})}),e.jsxs("div",{className:t.card,style:{background:`radial-gradient(circle,${s==null?void 0:s.details.color.name} 10%,rgba(255, 255, 255, 0) 87%)`},children:[e.jsxs("div",{className:t.headBar,children:[e.jsxs("div",{children:[e.jsxs("h2",{className:t.name,children:[r((a=s==null?void 0:s.overview)==null?void 0:a.name),e.jsxs("span",{className:t.nameTag,children:["#",(c=s==null?void 0:s.overview)==null?void 0:c.id]})]}),e.jsxs("div",{className:t.typesBox,children:[e.jsx("p",{className:t.typeText,children:"Type: "}),e.jsx("ul",{children:s==null?void 0:s.overview.types.map(i=>e.jsx("li",{children:e.jsx("p",{className:t.typeTextmodifier,children:i.type.name})},`${i.type.name}+${x()}`))})]})]}),e.jsx("div",{children:e.jsx("p",{className:t.overall,children:s==null?void 0:s.overview.base_experience})})]}),e.jsx("img",{className:t.image,src:s==null?void 0:s.overview.sprites.other.home.front_default}),e.jsx("div",{className:t.checkDescription,children:e.jsx("p",{className:t.checkDescriptionText,children:"?"})}),e.jsx("div",{className:t.description,children:e.jsx("p",{className:t.descriptionText,children:s.details.flavor_text_entries.find(i=>i.language.name==="en").flavor_text})}),e.jsxs("div",{className:t.overview,children:[e.jsxs("div",{children:[e.jsx("h2",{className:t.overviewTitle,children:"Statistics"}),e.jsx("ul",{className:t.stats,children:s==null?void 0:s.overview.stats.map(i=>e.jsx("li",{children:e.jsxs("p",{className:t.statsText,children:[i.stat.name,":"," ",e.jsx("span",{className:t.statsTextOvrl,children:i.base_stat})]})},x()))})]}),e.jsxs("div",{children:[e.jsx("h2",{className:t.overviewTitle,children:"Abilities"}),e.jsx("ul",{className:t.abilities,children:s==null?void 0:s.overview.abilities.map(i=>e.jsx("li",{className:t.ability,children:e.jsx("p",{className:t.abilitiesText,style:{background:`linear-gradient(180deg, ${s==null?void 0:s.details.color.name} 40%, rgba(40,40,40,1) 100%)`},children:i.ability.name})},`${i.ability.name}+${x()}`))})]})]})]})]})})},le=()=>{function n(){const p=new Date,w=p.getDate().toString().padStart(2,"0"),T=(p.getMonth()+1).toString().padStart(2,"0"),N=p.getFullYear().toString();return`${w}-${T}-${N}`}function r(){return Math.floor(Math.random()*898)+1}const s=j(),a=o(f),c=o(y),i=o(k),l=n(),u=o(B),g=()=>{if(a.overview===null&&a.details===null){s(h(r()));return}else if(a.overview!==null&&a.details!==null&&l!==u){s(h(r()));return}};return m.useEffect(()=>{g()},[]),m.useEffect(()=>{a.overview!==null&&a.details===null&&a!=null&&a.overview.species&&s($(a.overview.species.url))},[a.overview,s]),e.jsx(e.Fragment,{children:c?e.jsx(b,{}):e.jsx("div",{className:R.wrapper,children:a.overview===null||i||a.details===null?e.jsx("p",{children:"loading data..."}):e.jsx(e.Fragment,{children:e.jsx(oe,{pokemon:a})})})})},de="_card_1s37y_1",_e="_image_1s37y_47",xe="_info_1s37y_59",pe="_name_1s37y_63",d={card:de,image:_e,info:xe,name:pe},me=({pokemon:{name:n,url:r}})=>{const s=c=>{const i=c[0].toUpperCase();return c.replace(i.toLocaleLowerCase(),i)},a=c=>c.split("").slice(0,length-1).slice(34).join("");return e.jsx(e.Fragment,{children:e.jsxs("div",{className:d.card,children:[e.jsx("img",{className:d.image,alt:n,src:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${a(r)}.png`}),e.jsx("div",{className:d.info,children:e.jsx("h2",{className:d.name,children:s(n)})})]})})},he="_list_1um1a_1",ve={list:he},je=()=>{const n=o(L),r=o(D);return e.jsx(e.Fragment,{children:r?e.jsx(b,{}):e.jsx("ul",{className:ve.list,children:n.length!==0?n==null?void 0:n.map(s=>e.jsx("li",{children:e.jsx(me,{pokemon:s})},x())):e.jsx("p",{children:" Poke Array is null "})})})},be="_input_y6sav_1",ue={input:be},ge=()=>{const n=j(),r=s=>{const a=s==null?void 0:s.target.value;n(F(a))};return e.jsx("div",{children:e.jsx("input",{className:ue.input,type:"text",placeholder:"Input pokemon name",name:"pokeName",onChange:r})})},we="_container_15vfh_1",Te={container:we},Ne=({children:n})=>e.jsx("section",{className:Te.container,children:n}),fe="_wrapper_qdhs2_1",ye="_hotPokemon_qdhs2_7",ke="_pokeList_qdhs2_13",Be="_searchBar_qdhs2_16",_={wrapper:fe,hotPokemon:ye,pokeList:ke,searchBar:Be},Le=()=>e.jsx(e.Fragment,{children:e.jsx(Ne,{children:e.jsxs("div",{className:_.wrapper,children:[e.jsxs("div",{className:_.pokeList,children:[e.jsx("div",{className:_.searchBar,children:e.jsx(ge,{})}),e.jsx(je,{})]}),e.jsx("div",{className:_.hotPokemon,children:e.jsx(le,{})})]})})});export{Le as default};
