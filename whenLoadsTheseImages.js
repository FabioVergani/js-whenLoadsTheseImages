const onceWhen=(e,s,c)=>{const x=o=>{e.removeEventListener(s,x);c(o)};e.addEventListener(s,x)},
safeLength=e=>(e &&('length' in e))?Math.max(e.length|0,0):0,
whenLoadsTheseImages=(nodes,safe=false)=>{
	const P=Promise;
	return new P((q,r)=>{
		const m=nodes;
		let i=safe?safeLength(m):m.length;
		if(i!==0){
			const g=[],b=[],a=Array(i);
			i=0;
			for(const e of m){
				(a[i]=(++i,new P(f=>{
					if(e.complete){
						f(e)
					}else{
						const a=onceWhen,b=()=>f(e);
						a(e,'load',b);
						a(e,'error',b)
					}
				}))).then(e=>{const m=(e.naturalHeight!==0?g:b);m[m.length]=e})
			};
			P.all(a).then(m=>{q([g,b,m])})//resolve
		}else{
			r(m)//reject
		}
	})
};
/*
//=== test: ========================================
const prova=(n,list,verify=false)=>{
	whenLoadsTheseImages(list,verify).then(m=>{//resolved
		console.log('#%d\ngood:%O\nbroken:%O\nall:%O',n,m[0],m[1],m[2]);
	}).catch(list=>{
		console.log('#%d\nbad:%O',n,list)//rejected
	})
};
//
console.clear();
prova(1,null,true);
prova(2,{length:2},true);
prova(3,document.body.querySelectorAll('img'));
*/
