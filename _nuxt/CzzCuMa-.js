const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BrHmrDFG.js","./Di26m6CG.js","./entry.ChawcsYk.css","./B4-F0pqr.js"])))=>i.map(i=>d[i]);
import{R as h,ap as m,aq as f,_ as p}from"./Di26m6CG.js";import{t as g}from"./B4-F0pqr.js";const w=h("/static-media-frontend/pliant/logo-comics.svg"),T=h("/static-media-frontend/pliant/logo-collections.svg"),l=(o,i)=>{const t=o._conditions;return t.length>0?`(${t.join(` ${i} `)})`:""},d=o=>{const i=[],t={_conditions:i,where(n,s,e){let r;switch(s.toUpperCase()){case"IN":case"NOT IN":if(Array.isArray(e)){const c=e.map(a=>u(a)).join(", ");r=`"${String(n)}" ${s.toUpperCase()} (${c})`}else throw new TypeError(`Value for ${s} must be an array`);break;case"BETWEEN":case"NOT BETWEEN":if(Array.isArray(e)&&e.length===2)r=`"${String(n)}" ${s.toUpperCase()} ${u(e[0])} AND ${u(e[1])}`;else throw new Error(`Value for ${s} must be an array with two elements`);break;case"IS NULL":case"IS NOT NULL":r=`"${String(n)}" ${s.toUpperCase()}`;break;case"LIKE":case"NOT LIKE":r=`"${String(n)}" ${s.toUpperCase()} ${u(e)}`;break;default:r=`"${String(n)}" ${s} ${u(typeof e=="boolean"?Number(e):e)}`}return i.push(`${r}`),t},andWhere(n){const s=n(d());return i.push(l(s,"AND")),t},orWhere(n){const s=n(d());return i.push(l(s,"OR")),t}};return t},y=(o,i)=>{const t={conditions:[],selectedFields:[],offset:0,limit:0,orderBy:[],count:{field:"",distinct:!1}},n={__params:t,andWhere(e){const r=e(d());return t.conditions.push(l(r,"AND")),n},orWhere(e){const r=e(d());return t.conditions.push(l(r,"OR")),n},path(e){return n.where("path","=",m(e))},skip(e){return t.offset=e,n},where(e,r,c){return n.andWhere(a=>a.where(String(e),r,c)),n},limit(e){return t.limit=e,n},select(...e){return e.length&&t.selectedFields.push(...e),n},order(e,r){return t.orderBy.push(`"${String(e)}" ${r}`),n},async all(){return i(o,s()).then(e=>e||[])},async first(){return i(o,s({limit:1})).then(e=>e[0]||null)},async count(e="*",r=!1){return i(o,s({count:{field:String(e),distinct:r}})).then(c=>c[0].count)}};function s(e={}){let r="SELECT ";if(e!=null&&e.count)r+=`COUNT(${e.count.distinct?"DISTINCT ":""}${e.count.field}) as count`;else{const a=Array.from(new Set(t.selectedFields));r+=a.length>0?a.map($=>`"${String($)}"`).join(", "):"*"}r+=` FROM ${g[String(o)]}`,t.conditions.length>0&&(r+=` WHERE ${t.conditions.join(" AND ")}`),t.orderBy.length>0?r+=` ORDER BY ${t.orderBy.join(", ")}`:r+=" ORDER BY stem ASC";const c=(e==null?void 0:e.limit)||t.limit;return c>0&&(t.offset>0?r+=` LIMIT ${c} OFFSET ${t.offset}`:r+=` LIMIT ${c}`),r}return n};function u(o){return`'${String(o).replace(/'/g,"''")}'`}const A=o=>{var t,n;const i=(n=(t=f())==null?void 0:t.ssrContext)==null?void 0:n.event;return y(o,(s,e)=>S(i,s,e))};async function S(o,i,t){return E(i,t)}async function E(o,i){return await p(()=>import("./BrHmrDFG.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(n=>n.loadDatabaseAdapter(o)).then(n=>n.all(i))}export{w as _,T as a,A as q};
