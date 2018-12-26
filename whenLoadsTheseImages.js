const onceWhen=(e,s,c)=>{const x=o=>{e.removeEventListener(s,x);c(o)};e.addEventListener(s,x)};
//
const whenLoadsTheseImages=(nodes,check=false)=>{
	const P=Promise;
	return new P((resolve,reject)=>{
		const m=nodes;
		let i=check?(m &&('length' in m)?~~m.length:0):m.length;
		if(i!==0){
			const good=[],broken=[],b=e=>{const x=(e.naturalHeight!==0?good:broken);x[x.length]=e},a=Array(i);
			i=0;
			for(const e of m){
				(a[i]=(++i,new P(f=>{
					if(e.complete){
						f(e)
					}else{
						const g=onceWhen,h=()=>f(e);
						g(e,'load',h);
						g(e,'error',h)
					}
				}))).then(b)
			};
			P.all(a).then(all=>{resolve([good,broken,all])});
		}else{
			reject(m)
		}
	})
};

//=== test: =========================================
let list=document.body.querySelectorAll('img');
//list=null;,true
whenLoadsTheseImages(list).then(resolved=>{
	console.dir(resolved);
}).catch(rejected=>{
	console.error(rejected)
});
