import{u as y,j as e,q as U,k as A,a as f,l as $,N as H,e as O,n as v,m as Y,o as M,p as D,t as Q,r as _,v as J,w as K,x as V,P as L,y as N,z as P,A as Z,B as X,G as ee,C as F,D as se,E as te,_ as ae,S as ce}from"./index-7a4af7cb.js";const oe="_pokeDex_b8zi6_1",ne="_userWrapper_b8zi6_9",ie="_list_b8zi6_18",re="_listBtn_b8zi6_25",ue="_btnActive_b8zi6_44",b={pokeDex:oe,userWrapper:ne,list:ie,listBtn:re,btnActive:ue},ke="_list_1hh5e_1",le="_link_1hh5e_10",he="_btnBox_1hh5e_13",de="_item_1hh5e_18",fe="_btn_1hh5e_13",ge="_noActiveBtn_1hh5e_50",g={list:ke,link:le,btnBox:he,item:de,btn:fe,noActiveBtn:ge},me="_btn_1v2yo_1",be={btn:me},B=s=>Number(s*3),pe=({ovrl:s})=>{const t=y(),a=B(s),c=()=>{t(U(a)),t(A())};return e.jsxs("button",{className:be.btn,type:"button",onClick:c,children:["Quick Sell for ",a]})},_e=s=>s.battle.user,$s=s=>s.battle.computer,Ls=s=>s.battle.game.isStarted,Ms=s=>s.battle.game.isEnded,Fs=s=>s.battle.game.userMove,As=s=>s.battle.game.computerMove,je=()=>{const t=f($).cards.slice(1),a=f(_e),c=a.cards,n=y(),r=(o,u)=>{const i=B(u);n(Y({id:o,price:i})),n(M(o))},h=o=>{var i;if(((i=a.cards)==null?void 0:i.length)>=3){D.Notify.failure("You reach limit of pokemons for battle 3/3");return}const u=t.find(j=>j.overview.id===o);console.log(u),n(Q(u))},l=o=>{n(M(o))};return t.length===0?e.jsx("p",{children:"You don't have any Pokémon in your shelf. Buy packs to get Pokémon"}):e.jsx("ul",{className:g.list,children:t.map(o=>{var u;return e.jsxs("li",{className:g.item,children:[e.jsx(H,{className:g.link,to:`/pokemon/${o.overview.id}`,children:e.jsx(O,{pokemon:o})}),e.jsxs("div",{className:g.btnBox,children:[e.jsxs("button",{className:`${g.btn} ${c.map(i=>i.overview.name).includes(o.overview.name)?g.noActiveBtn:""}`,type:"button",onClick:()=>r(o.overview.id,o.overview.base_experience),children:["Quick Sell for ",B(o.overview.base_experience)]}),e.jsxs("button",{className:`${g.btn} ${c.map(i=>i.overview.name).includes(o.overview.name)?g.noActiveBtn:""}`,type:"button",onClick:()=>h(o.overview.id),children:["Take for battle: ",(u=a.cards)==null?void 0:u.length,"/3"]}),e.jsx("button",{className:`${g.btn} ${c.map(i=>i.overview.name).includes(o.overview.name)?"":g.noActiveBtn}`,type:"button",onClick:()=>l(o.overview.id),children:"Unpick"})]})]},v())})})},xe="_card_81w81_1",ye="_picked_81w81_22",we="_title_81w81_26",ve="_price_81w81_42",ze="_overlay_81w81_55",Ce="_legendaryChance_81w81_68",Ne="_btn_81w81_76",x={card:xe,picked:ye,title:we,price:ve,overlay:ze,legendaryChance:Ce,btn:Ne},S=({type:s,handleOnClick:t})=>{const[a,c]=_.useState(!1);let n,r=0,h;return s==="Gold"&&(r=1e3,h=9,n="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/6606818d-b1ce-47ce-99b9-c2e7043f0a46/Leonardo_Diffusion_pokemon_pack_background_golden_background_v_2.jpg"),s==="Silver"&&(r=500,h=2,n="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/acead86b-1e48-4ef9-ae3a-5d49cb4d2695/Leonardo_Diffusion_Squirtle_pokemon_pack_background_Silver_col_0.jpg"),s==="Legendary"&&(r=5e3,h=100,n="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/7ff1a077-f5c6-44f6-bf9a-9b096834f2a5/Leonardo_Diffusion_Legendary_pokemon_pack_background_epic_colo_1.jpg"),e.jsxs("div",{className:`${x.card} ${a?x.picked:""}`,style:{backgroundImage:`url(${n})`},onClick:()=>c(l=>!l),children:[e.jsxs("h2",{className:x.title,children:[s," Pack"]}),e.jsxs("p",{className:x.price,children:[r,"$"]}),a&&e.jsxs("div",{className:x.overlay,children:[e.jsxs("p",{className:x.legendaryChance,children:["Chance for legendary: ",h,"%"]}),e.jsxs("div",{children:[e.jsx("button",{className:x.btn,type:"button",onClick:l=>{l.stopPropagation(),t(l),c(!1)},children:"Buy"}),e.jsx("button",{className:x.btn,type:"button",onClick:l=>{l.stopPropagation(),c(!1)},children:"Cancel"})]})]})]})},Pe="_pokeShop_1tj2o_1",Se="_packedPokemon_1tj2o_8",Be="_packedPokemonWrapper_1tj2o_24",$e="_card_1tj2o_31",Le="_description_1tj2o_35",Me="_descriptionTitle_1tj2o_40",Fe="_descriptionText_1tj2o_52",Ae="_btnCardBox_1tj2o_60",Oe="_btnAddCardBox_1tj2o_63",De="_packList_1tj2o_69",Ie="_loaderBox_1tj2o_76",d={pokeShop:Pe,packedPokemon:Se,packedPokemonWrapper:Be,card:$e,description:Le,descriptionTitle:Me,descriptionText:Fe,btnCardBox:Ae,btnAddCardBox:Oe,packList:De,loaderBox:Ie},I=s=>s.pokeShop.packedPokemon,Ee=s=>s.pokeShop.isLoadingOverview,Te=s=>s.pokeShop.isLoadingMoreDetails,We="_btn_ylqld_1",Ge={btn:We},qe=()=>{const s=y(),t=f(I),a=async()=>{s(J({card:t})),s(A())};return e.jsx("button",{className:Ge.btn,type:"button",onClick:a,children:"Add card"})},Re=()=>{const s=y(),t=f(I),a=f(Ee),c=f(Te),n=f(K),r=[144,145,146,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,638,639,640,641,642,643,644,645,646,647,648,649,716,717,718,719,720,721,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,807,808,809,888,889,890];function h(){return Math.floor(Math.random()*897)+1}function l(){if(Math.random()<=.02){const k=Math.floor(Math.random()*r.length);return r[k]}else return Math.floor(Math.random()*898)+1}function o(){const k=Math.floor(Math.random()*r.length);return r[k]}const u=k=>{k.stopPropagation(),!(n<1e3)&&(console.log("kupiono paczke"),s(N(1e3)),s(P(h())))},i=k=>{k.stopPropagation(),!(n<500)&&(console.log("kupiono paczke"),s(N(500)),s(P(l())))},j=k=>{k.stopPropagation(),!(n<5e3)&&(console.log("kupiono paczke"),s(N(5e3)),s(P(o())))};return _.useEffect(()=>{var k;(t==null?void 0:t.overview)!==null&&(k=t==null?void 0:t.overview)!=null&&k.species&&s(V(t.overview.species.url))},[t.overview,s]),e.jsxs("div",{className:d.pokeShop,children:[e.jsxs("ul",{className:d.packList,children:[e.jsx("li",{children:e.jsx(S,{type:"Silver",handleOnClick:i})}),e.jsx("li",{children:e.jsx(S,{type:"Gold",handleOnClick:u})}),e.jsx("li",{children:e.jsx(S,{type:"Legendary",handleOnClick:j})})]}),e.jsx("div",{children:a?e.jsx("div",{className:d.loaderBox,children:e.jsx(L,{})}):e.jsx("div",{className:d.wrapper,children:t.overview===null||c||t.details===null?null:e.jsx(e.Fragment,{children:e.jsx("div",{className:d.packedPokemon,children:e.jsxs("div",{className:d.packedPokemonWrapper,children:[e.jsx("div",{className:d.card,children:e.jsx(O,{pokemon:t})}),e.jsxs("div",{children:[e.jsxs("div",{className:d.description,children:[e.jsx("h2",{className:d.descriptionTitle,children:"Congratulations!"}),e.jsxs("p",{className:d.descriptionText,children:['Congratulations on your find! Your pack has brought you a Pokémon named "',t.overview.name,'". Now you have the option to add it to your Pokédex list or the quick sell option to earn coins.']})]}),e.jsxs("div",{className:d.btnAddCardBox,children:[e.jsx(qe,{}),e.jsx("div",{className:d.btnCardBox,children:e.jsx(pe,{ovrl:t.overview.base_experience})})]})]})]})})})})})]})},Ue="_table_1jgwu_1",He="_list_1jgwu_7",Ye="_form_1jgwu_15",Qe="_input_1jgwu_23",Je="_textarea_1jgwu_31",Ke="_button_1jgwu_39",Ve="_refreshBtn_1jgwu_61",Ze="_card_1jgwu_77",Xe="_title_1jgwu_80",es="_description_1jgwu_85",p={table:Ue,list:He,form:Ye,input:Qe,textarea:Je,button:Ke,refreshBtn:Ve,card:Ze,title:Xe,description:es},ss=s=>s.pokeNews.posts,ts=s=>s.pokeNews.isLoading,as="_card_ndkz1_1",cs="_image_ndkz1_10",os="_title_ndkz1_15",ns="_description_ndkz1_28",is="_button_ndkz1_38",rs="_imgBox_ndkz1_60",us="_postInfo_ndkz1_63",ks="_author_ndkz1_67",ls="_source_ndkz1_76",m={card:as,image:cs,title:os,description:ns,button:is,imgBox:rs,postInfo:us,author:ks,source:ls},hs=({post:s})=>{const t=y(),c=f($).username,n=r=>{window.confirm("Are you sure you want to delete this post?")&&t(Z(r))};return e.jsxs("div",{className:m.card,children:[e.jsxs("div",{className:m.postInfo,children:[e.jsx("p",{className:m.author,children:s.author}),e.jsx("p",{className:m.author,children:s.date})]}),e.jsx("h2",{className:m.title,children:s.title}),e.jsxs("div",{className:m.imgBox,children:[e.jsx("img",{className:m.image,src:s.imgLink,alt:"pic"}),e.jsxs("p",{className:m.source,children:["src: ",s.imgLink]})]}),e.jsx("p",{className:m.description,children:s.message}),c==="yellowduck"||c===s.author?e.jsx("button",{className:m.button,onClick:()=>n(s.id),children:"Delete post"}):null]})},ds=["ahole","anus","ash0le","ash0les","asholes","ass","Ass Monkey","Assface","assh0le","assh0lez","asshole","assholes","assholz","asswipe","azzhole","bassterds","bastard","bastards","bastardz","basterds","basterdz","Biatch","bitch","bitches","Blow Job","boffing","butthole","buttwipe","c0ck","c0cks","c0k","Carpet Muncher","cawk","cawks","Clit","cnts","cntz","cock","cockhead","cock-head","cocks","CockSucker","cock-sucker","crap","cum","cunt","cunts","cuntz","dick","dild0","dild0s","dildo","dildos","dilld0","dilld0s","dominatricks","dominatrics","dominatrix","dyke","enema","f u c k","f u c k e r","fag","fag1t","faget","fagg1t","faggit","faggot","fagg0t","fagit","fags","fagz","faig","faigs","fart","flipping the bird","fuck","fucker","fuckin","fucking","fucks","Fudge Packer","fuk","Fukah","Fuken","fuker","Fukin","Fukk","Fukkah","Fukken","Fukker","Fukkin","g00k","God-damned","h00r","h0ar","h0re","hells","hoar","hoor","hoore","jackoff","jap","japs","jerk-off","jisim","jiss","jizm","jizz","knob","knobs","knobz","kunt","kunts","kuntz","Lezzian","Lipshits","Lipshitz","masochist","masokist","massterbait","masstrbait","masstrbate","masterbaiter","masterbate","masterbates","Motha Fucker","Motha Fuker","Motha Fukkah","Motha Fukker","Mother Fucker","Mother Fukah","Mother Fuker","Mother Fukkah","Mother Fukker","mother-fucker","Mutha Fucker","Mutha Fukah","Mutha Fuker","Mutha Fukkah","Mutha Fukker","n1gr","nastt","nigger;","nigur;","niiger;","niigr;","orafis","orgasim;","orgasm","orgasum","oriface","orifice","orifiss","packi","packie","packy","paki","pakie","paky","pecker","peeenus","peeenusss","peenus","peinus","pen1s","penas","penis","penis-breath","penus","penuus","Phuc","Phuck","Phuk","Phuker","Phukker","polac","polack","polak","Poonani","pr1c","pr1ck","pr1k","pusse","pussee","pussy","puuke","puuker","qweir","recktum","rectum","retard","sadist","scank","schlong","screwing","semen","sex","sexy","Sh!t","sh1t","sh1ter","sh1ts","sh1tter","sh1tz","shit","shits","shitter","Shitty","Shity","shitz","Shyt","Shyte","Shytty","Shyty","skanck","skank","skankee","skankey","skanks","Skanky","slag","slut","sluts","Slutty","slutz","son-of-a-bitch","tit","turd","va1jina","vag1na","vagiina","vagina","vaj1na","vajina","vullva","vulva","w0p","wh00r","wh0re","whore","xrated","xxx","b!+ch","bitch","blowjob","clit","arschloch","fuck","shit","ass","asshole","b!tch","b17ch","b1tch","bastard","bi+ch","boiolas","buceta","c0ck","cawk","chink","cipa","clits","cock","cum","cunt","dildo","dirsa","ejakulate","fatass","fcuk","fuk","fux0r","hoer","hore","jism","kawk","l3itch","l3i+ch","masturbate","masterbat*","masterbat3","motherfucker","s.o.b.","mofo","nazi","nigga","nigger","nutsack","phuck","pimpis","pusse","pussy","scrotum","sh!t","shemale","shi+","sh!+","slut","smut","teets","tits","boobs","b00bs","teez","testical","testicle","titt","w00se","jackoff","wank","whoar","whore","*damn","*dyke","*fuck*","*shit*","@$$","amcik","andskota","arse*","assrammer","ayir","bi7ch","bitch*","bollock*","breasts","butt-pirate","cabron","cazzo","chraa","chuj","Cock*","cunt*","d4mn","daygo","dego","dick*","dike*","dupa","dziwka","ejackulate","Ekrem*","Ekto","enculer","faen","fag*","fanculo","fanny","feces","feg","Felcher","ficken","fitt*","Flikker","foreskin","Fotze","Fu(*","fuk*","futkretzn","gook","guiena","h0r","h4x0r","hell","helvete","hoer*","honkey","Huevon","hui","injun","jizz","kanker*","kike","klootzak","kraut","knulle","kuk","kuksuger","Kurac","kurwa","kusi*","kyrpa*","lesbo","mamhoon","masturbat*","merd*","mibun","monkleigh","mouliewop","muie","mulkku","muschi","nazis","nepesaurio","nigger*","orospu","paska*","perse","picka","pierdol*","pillu*","pimmel","piss*","pizda","poontsee","poop","porn","p0rn","pr0n","preteen","pula","pule","puta","puto","qahbeh","queef*","rautenberg","schaffer","scheiss*","schlampe","schmuck","screw","sh!t*","sharmuta","sharmute","shipal","shiz","skribz","skurwysyn","sphencter","spic","spierdalaj","splooge","suka","b00b*","testicle*","titt*","twat","vittu","wank*","wetback*","wichser","wop*","yed","zabourah"],fs={words:ds};var gs={"4r5e":1,"5h1t":1,"5hit":1,a55:1,anal:1,anus:1,ar5e:1,arrse:1,arse:1,ass:1,"ass-fucker":1,asses:1,assfucker:1,assfukka:1,asshole:1,assholes:1,asswhole:1,a_s_s:1,"b!tch":1,b00bs:1,b17ch:1,b1tch:1,ballbag:1,balls:1,ballsack:1,bastard:1,beastial:1,beastiality:1,bellend:1,bestial:1,bestiality:1,"bi+ch":1,biatch:1,bitch:1,bitcher:1,bitchers:1,bitches:1,bitchin:1,bitching:1,bloody:1,"blow job":1,blowjob:1,blowjobs:1,boiolas:1,bollock:1,bollok:1,boner:1,boob:1,boobs:1,booobs:1,boooobs:1,booooobs:1,booooooobs:1,breasts:1,buceta:1,bugger:1,bum:1,"bunny fucker":1,butt:1,butthole:1,buttmuch:1,buttplug:1,c0ck:1,c0cksucker:1,"carpet muncher":1,cawk:1,chink:1,cipa:1,cl1t:1,clit:1,clitoris:1,clits:1,cnut:1,cock:1,"cock-sucker":1,cockface:1,cockhead:1,cockmunch:1,cockmuncher:1,cocks:1,cocksuck:1,cocksucked:1,cocksucker:1,cocksucking:1,cocksucks:1,cocksuka:1,cocksukka:1,cok:1,cokmuncher:1,coksucka:1,coon:1,cox:1,crap:1,cum:1,cummer:1,cumming:1,cums:1,cumshot:1,cunilingus:1,cunillingus:1,cunnilingus:1,cunt:1,cuntlick:1,cuntlicker:1,cuntlicking:1,cunts:1,cyalis:1,cyberfuc:1,cyberfuck:1,cyberfucked:1,cyberfucker:1,cyberfuckers:1,cyberfucking:1,d1ck:1,damn:1,dick:1,dickhead:1,dildo:1,dildos:1,dink:1,dinks:1,dirsa:1,dlck:1,"dog-fucker":1,doggin:1,dogging:1,donkeyribber:1,doosh:1,duche:1,dyke:1,ejaculate:1,ejaculated:1,ejaculates:1,ejaculating:1,ejaculatings:1,ejaculation:1,ejakulate:1,"f u c k":1,"f u c k e r":1,f4nny:1,fag:1,fagging:1,faggitt:1,faggot:1,faggs:1,fagot:1,fagots:1,fags:1,fanny:1,fannyflaps:1,fannyfucker:1,fanyy:1,fatass:1,fcuk:1,fcuker:1,fcuking:1,feck:1,fecker:1,felching:1,fellate:1,fellatio:1,fingerfuck:1,fingerfucked:1,fingerfucker:1,fingerfuckers:1,fingerfucking:1,fingerfucks:1,fistfuck:1,fistfucked:1,fistfucker:1,fistfuckers:1,fistfucking:1,fistfuckings:1,fistfucks:1,flange:1,fook:1,fooker:1,fuck:1,fucka:1,fucked:1,fucker:1,fuckers:1,fuckhead:1,fuckheads:1,fuckin:1,fucking:1,fuckings:1,fuckingshitmotherfucker:1,fuckme:1,fucks:1,fuckwhit:1,fuckwit:1,"fudge packer":1,fudgepacker:1,fuk:1,fuker:1,fukker:1,fukkin:1,fuks:1,fukwhit:1,fukwit:1,fux:1,fux0r:1,f_u_c_k:1,gangbang:1,gangbanged:1,gangbangs:1,gaylord:1,gaysex:1,goatse:1,God:1,"god-dam":1,"god-damned":1,goddamn:1,goddamned:1,hardcoresex:1,hell:1,heshe:1,hoar:1,hoare:1,hoer:1,homo:1,hore:1,horniest:1,horny:1,hotsex:1,"jack-off":1,jackoff:1,jap:1,"jerk-off":1,jism:1,jiz:1,jizm:1,jizz:1,kawk:1,knob:1,knobead:1,knobed:1,knobend:1,knobhead:1,knobjocky:1,knobjokey:1,kock:1,kondum:1,kondums:1,kum:1,kummer:1,kumming:1,kums:1,kunilingus:1,"l3i+ch":1,l3itch:1,labia:1,lust:1,lusting:1,m0f0:1,m0fo:1,m45terbate:1,ma5terb8:1,ma5terbate:1,masochist:1,"master-bate":1,masterb8:1,"masterbat*":1,masterbat3:1,masterbate:1,masterbation:1,masterbations:1,masturbate:1,"mo-fo":1,mof0:1,mofo:1,mothafuck:1,mothafucka:1,mothafuckas:1,mothafuckaz:1,mothafucked:1,mothafucker:1,mothafuckers:1,mothafuckin:1,mothafucking:1,mothafuckings:1,mothafucks:1,"mother fucker":1,motherfuck:1,motherfucked:1,motherfucker:1,motherfuckers:1,motherfuckin:1,motherfucking:1,motherfuckings:1,motherfuckka:1,motherfucks:1,muff:1,mutha:1,muthafecker:1,muthafuckker:1,muther:1,mutherfucker:1,n1gga:1,n1gger:1,nazi:1,nigg3r:1,nigg4h:1,nigga:1,niggah:1,niggas:1,niggaz:1,nigger:1,niggers:1,nob:1,"nob jokey":1,nobhead:1,nobjocky:1,nobjokey:1,numbnuts:1,nutsack:1,orgasim:1,orgasims:1,orgasm:1,orgasms:1,p0rn:1,pawn:1,pecker:1,penis:1,penisfucker:1,phonesex:1,phuck:1,phuk:1,phuked:1,phuking:1,phukked:1,phukking:1,phuks:1,phuq:1,pigfucker:1,pimpis:1,piss:1,pissed:1,pisser:1,pissers:1,pisses:1,pissflaps:1,pissin:1,pissing:1,pissoff:1,poop:1,porn:1,porno:1,pornography:1,pornos:1,prick:1,pricks:1,pron:1,pube:1,pusse:1,pussi:1,pussies:1,pussy:1,pussys:1,rectum:1,retard:1,rimjaw:1,rimming:1,"s hit":1,"s.o.b.":1,sadist:1,schlong:1,screwing:1,scroat:1,scrote:1,scrotum:1,semen:1,sex:1,"sh!+":1,"sh!t":1,sh1t:1,shag:1,shagger:1,shaggin:1,shagging:1,shemale:1,"shi+":1,shit:1,shitdick:1,shite:1,shited:1,shitey:1,shitfuck:1,shitfull:1,shithead:1,shiting:1,shitings:1,shits:1,shitted:1,shitter:1,shitters:1,shitting:1,shittings:1,shitty:1,skank:1,slut:1,sluts:1,smegma:1,smut:1,snatch:1,"son-of-a-bitch":1,spac:1,spunk:1,s_h_i_t:1,t1tt1e5:1,t1tties:1,teets:1,teez:1,testical:1,testicle:1,tit:1,titfuck:1,tits:1,titt:1,tittie5:1,tittiefucker:1,titties:1,tittyfuck:1,tittywank:1,titwank:1,tosser:1,turd:1,tw4t:1,twat:1,twathead:1,twatty:1,twunt:1,twunter:1,v14gra:1,v1gra:1,vagina:1,viagra:1,vulva:1,w00se:1,wang:1,wank:1,wanker:1,wanky:1,whoar:1,whore:1,willies:1,willy:1,xrated:1,xxx:1},ms=["4r5e","5h1t","5hit","a55","anal","anus","ar5e","arrse","arse","ass","ass-fucker","asses","assfucker","assfukka","asshole","assholes","asswhole","a_s_s","b!tch","b00bs","b17ch","b1tch","ballbag","balls","ballsack","bastard","beastial","beastiality","bellend","bestial","bestiality","bi+ch","biatch","bitch","bitcher","bitchers","bitches","bitchin","bitching","bloody","blow job","blowjob","blowjobs","boiolas","bollock","bollok","boner","boob","boobs","booobs","boooobs","booooobs","booooooobs","breasts","buceta","bugger","bum","bunny fucker","butt","butthole","buttmuch","buttplug","c0ck","c0cksucker","carpet muncher","cawk","chink","cipa","cl1t","clit","clitoris","clits","cnut","cock","cock-sucker","cockface","cockhead","cockmunch","cockmuncher","cocks","cocksuck","cocksucked","cocksucker","cocksucking","cocksucks","cocksuka","cocksukka","cok","cokmuncher","coksucka","coon","cox","crap","cum","cummer","cumming","cums","cumshot","cunilingus","cunillingus","cunnilingus","cunt","cuntlick","cuntlicker","cuntlicking","cunts","cyalis","cyberfuc","cyberfuck","cyberfucked","cyberfucker","cyberfuckers","cyberfucking","d1ck","damn","dick","dickhead","dildo","dildos","dink","dinks","dirsa","dlck","dog-fucker","doggin","dogging","donkeyribber","doosh","duche","dyke","ejaculate","ejaculated","ejaculates","ejaculating","ejaculatings","ejaculation","ejakulate","f u c k","f u c k e r","f4nny","fag","fagging","faggitt","faggot","faggs","fagot","fagots","fags","fanny","fannyflaps","fannyfucker","fanyy","fatass","fcuk","fcuker","fcuking","feck","fecker","felching","fellate","fellatio","fingerfuck","fingerfucked","fingerfucker","fingerfuckers","fingerfucking","fingerfucks","fistfuck","fistfucked","fistfucker","fistfuckers","fistfucking","fistfuckings","fistfucks","flange","fook","fooker","fuck","fucka","fucked","fucker","fuckers","fuckhead","fuckheads","fuckin","fucking","fuckings","fuckingshitmotherfucker","fuckme","fucks","fuckwhit","fuckwit","fudge packer","fudgepacker","fuk","fuker","fukker","fukkin","fuks","fukwhit","fukwit","fux","fux0r","f_u_c_k","gangbang","gangbanged","gangbangs","gaylord","gaysex","goatse","God","god-dam","god-damned","goddamn","goddamned","hardcoresex","hell","heshe","hoar","hoare","hoer","homo","hore","horniest","horny","hotsex","jack-off","jackoff","jap","jerk-off","jism","jiz","jizm","jizz","kawk","knob","knobead","knobed","knobend","knobhead","knobjocky","knobjokey","kock","kondum","kondums","kum","kummer","kumming","kums","kunilingus","l3i+ch","l3itch","labia","lust","lusting","m0f0","m0fo","m45terbate","ma5terb8","ma5terbate","masochist","master-bate","masterb8","masterbat*","masterbat3","masterbate","masterbation","masterbations","masturbate","mo-fo","mof0","mofo","mothafuck","mothafucka","mothafuckas","mothafuckaz","mothafucked","mothafucker","mothafuckers","mothafuckin","mothafucking","mothafuckings","mothafucks","mother fucker","motherfuck","motherfucked","motherfucker","motherfuckers","motherfuckin","motherfucking","motherfuckings","motherfuckka","motherfucks","muff","mutha","muthafecker","muthafuckker","muther","mutherfucker","n1gga","n1gger","nazi","nigg3r","nigg4h","nigga","niggah","niggas","niggaz","nigger","niggers","nob","nob jokey","nobhead","nobjocky","nobjokey","numbnuts","nutsack","orgasim","orgasims","orgasm","orgasms","p0rn","pawn","pecker","penis","penisfucker","phonesex","phuck","phuk","phuked","phuking","phukked","phukking","phuks","phuq","pigfucker","pimpis","piss","pissed","pisser","pissers","pisses","pissflaps","pissin","pissing","pissoff","poop","porn","porno","pornography","pornos","prick","pricks","pron","pube","pusse","pussi","pussies","pussy","pussys","rectum","retard","rimjaw","rimming","s hit","s.o.b.","sadist","schlong","screwing","scroat","scrote","scrotum","semen","sex","sh!+","sh!t","sh1t","shag","shagger","shaggin","shagging","shemale","shi+","shit","shitdick","shite","shited","shitey","shitfuck","shitfull","shithead","shiting","shitings","shits","shitted","shitter","shitters","shitting","shittings","shitty","skank","slut","sluts","smegma","smut","snatch","son-of-a-bitch","spac","spunk","s_h_i_t","t1tt1e5","t1tties","teets","teez","testical","testicle","tit","titfuck","tits","titt","tittie5","tittiefucker","titties","tittyfuck","tittywank","titwank","tosser","turd","tw4t","twat","twathead","twatty","twunt","twunter","v14gra","v1gra","vagina","viagra","vulva","w00se","wang","wank","wanker","wanky","whoar","whore","willies","willy","xrated","xxx"],bs=/\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi,ps={object:gs,array:ms,regex:bs};const _s=fs.words,js=ps.array;class xs{constructor(t={}){Object.assign(this,{list:t.emptyList&&[]||Array.prototype.concat.apply(_s,[js,t.list||[]]),exclude:t.exclude||[],splitRegex:t.splitRegex||/\b/,placeHolder:t.placeHolder||"*",regex:t.regex||/[^a-zA-Z0-9|\$|\@]|\^/g,replaceRegex:t.replaceRegex||/\w/g})}isProfane(t){return this.list.filter(a=>{const c=new RegExp(`\\b${a.replace(/(\W)/g,"\\$1")}\\b`,"gi");return!this.exclude.includes(a.toLowerCase())&&c.test(t)}).length>0||!1}replaceWord(t){return t.replace(this.regex,"").replace(this.replaceRegex,this.placeHolder)}clean(t){return t.split(this.splitRegex).map(a=>this.isProfane(a)?this.replaceWord(a):a).join(this.splitRegex.exec(t)[0])}addWords(){let t=Array.from(arguments);this.list.push(...t),t.map(a=>a.toLowerCase()).forEach(a=>{this.exclude.includes(a)&&this.exclude.splice(this.exclude.indexOf(a),1)})}removeWords(){this.exclude.push(...Array.from(arguments).map(t=>t.toLowerCase()))}}var ys=xs;const ws=X(ys),vs=new ws,zs=s=>!vs.isProfane(s);function Cs(s){return ee({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",stroke:"#000",strokeWidth:"2",d:"M17.3333333,9.33333333 C16.3982691,7.36020781 14.3579813,6 12,6 C8.6862915,6 6,8.6862915 6,12 C6,15.3137085 8.6862915,18 12,18 C15.3137085,18 18,15.3137085 18,12 M18.5,6 L18.5,10 L14.5,10"}}]})(s)}const Ns=()=>{const s=y(),a=f($).username,c=f(ss),n=f(ts),[r,h]=_.useState(20);_.useEffect(()=>{c.length===0&&(console.log("fetching posts"),s(F()))},[s]);const l=i=>{i.preventDefault();const j=i.currentTarget,k=j.elements.namedItem("title"),z=j.elements.namedItem("msg"),C=j.elements.namedItem("img"),w=new Date,E=w.getFullYear(),T=w.getMonth()+1,W=w.getDate(),G=w.getHours(),q=w.getMinutes();if(zs(z.value)){const R={author:a,title:(k==null?void 0:k.value)||"",message:(z==null?void 0:z.value)||"",imgLink:(C==null?void 0:C.value)||"",id:v(),date:`${G}:${q} ${W}.${T}.${E}`};s(se(R)),j.reset()}else return D.Notify.failure("You cant use bad words!!")},o=()=>{s(F())},u=()=>{s(te(r)),h(i=>i+10)};return e.jsxs("div",{className:p.table,children:[e.jsx("h2",{children:"Add post"}),e.jsxs("form",{className:p.form,onSubmit:l,children:[e.jsx("input",{name:"title",className:p.input,type:"text",placeholder:"Title"}),e.jsx("input",{name:"img",className:p.input,type:"text",placeholder:"Link to picture"}),e.jsx("textarea",{name:"msg",className:p.textarea,placeholder:"Message"}),e.jsx("button",{className:p.button,type:"submit",children:"Submit"})]}),e.jsx("button",{onClick:()=>o(),className:p.refreshBtn,children:e.jsx(Cs,{size:"24px"})}),e.jsx("ul",{className:p.list,children:c.length===0?e.jsx("p",{children:"No posts found"}):n?e.jsx(L,{}):c.map(i=>e.jsx("li",{children:e.jsx(hs,{post:i})},i.id))}),e.jsx("button",{onClick:()=>u(),className:p.button,children:"Load more"})]})},Ps=_.lazy(()=>ae(()=>import("./Battle-18fe763d.js"),["assets/Battle-18fe763d.js","assets/index-7a4af7cb.js","assets/index-b001b5b8.css","assets/pokemonsSelectors-2a7a770f.js","assets/pokemonsSelectors-e8bb40ed.css","assets/Battle-e7b27179.css"])),Ss=()=>{const[s,t]=_.useState(!1),[a,c]=_.useState(!1),[n,r]=_.useState(!1),h=()=>{t(u=>!u),c(!1),r(!1)},l=()=>{c(u=>!u),t(!1),r(!1)},o=()=>{r(u=>!u),t(!1),c(!1)};return e.jsxs("div",{className:b.pokeDex,children:[e.jsxs("ul",{className:b.list,children:[e.jsx("li",{children:e.jsx("button",{className:`${b.listBtn} ${s?b.btnActive:""}`,type:"button",onClick:()=>h(),children:"Shelf"})},v()),e.jsx("li",{children:e.jsx("button",{className:`${b.listBtn} ${a?b.btnActive:""}`,type:"button",onClick:()=>l(),children:"Store"})},v()),e.jsx("li",{children:e.jsx("button",{className:`${b.listBtn} ${n?b.btnActive:""}`,type:"button",onClick:()=>o(),children:"Battle vs AI"})},v())]}),e.jsx(ce,{children:e.jsx("div",{className:b.userWrapper,children:e.jsxs(_.Suspense,{fallback:e.jsx(L,{}),children:[s?e.jsx(je,{}):null,a?e.jsx(Re,{}):null,!s&&!a&&!n&&e.jsx(Ns,{}),n?e.jsx(Ps,{}):null]})})})]})},Os=Object.freeze(Object.defineProperty({__proto__:null,default:Ss},Symbol.toStringTag,{value:"Module"}));export{Os as P,$s as a,Fs as b,As as c,Ls as d,Ms as e,_e as s};
