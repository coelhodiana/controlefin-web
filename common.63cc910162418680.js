"use strict";(self.webpackChunkboilerplate_angular=self.webpackChunkboilerplate_angular||[]).push([[592],{2630:(T,c,o)=>{o.d(c,{v:()=>l});var r=o(9646),i=o(1223),e=o(520);let l=(()=>{class s{constructor(t){this.http=t,this.localTransactions=[]}getTransaction(t){const a=JSON.parse(localStorage.getItem("transactions")).filter(g=>g.id===t);return(0,r.of)(a[0])}listTransactions(){return localStorage.getItem("transactions")||localStorage.setItem("transactions",JSON.stringify(this.localTransactions)),this.localTransactions=JSON.parse(localStorage.getItem("transactions")),(0,r.of)(this.localTransactions)}postTransaction(t){return t.id=Math.random().toString(36).substr(2,9),localStorage.setItem("transactions",JSON.stringify([...this.localTransactions,t])),(0,r.of)("success")}putTransaction(t){const n=this.localTransactions.map(a=>a.id===t.id?a=t:a);return localStorage.setItem("transactions",JSON.stringify(n)),(0,r.of)(n)}deleteTransaction(t){const n=this.localTransactions.filter(a=>a.id!==t);return localStorage.setItem("transactions",JSON.stringify(n)),(0,r.of)(n)}postTransactions(t){localStorage.setItem("transactions",JSON.stringify([...this.localTransactions,...t]))}}return s.\u0275fac=function(t){return new(t||s)(i.LFG(e.eN))},s.\u0275prov=i.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);