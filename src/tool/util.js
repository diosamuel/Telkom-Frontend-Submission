let charReg = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
let checkCapital = function(s){
  		let t = s.split('')
  		.filter(x=>x === x.toUpperCase() && !Number(x))
  		.filter(y=>!charReg.test(y));
  		return !!t.length
  	}

let checkLower = function(s){
  		let t = s.split('')
  		.filter(x=>x === x.toLowerCase() && !Number(x))
  		.filter(y=>!charReg.test(y));
  		return !!t.length
  	}

let checkAllLower = function(s){return s.toLowerCase() === s}
let checkNumber = function(s){
  		let t = s.split('').filter(x=>!!Number(x))
  		return !!t.length
  	}
let checkAllNumber = function(s){return s.length ? /\d/g.test(Number(s)) : false}
let includesString = function(s){return !!s.match(/\D/g)}
let everyObject = function (obj,el){
	return Object.values(obj).every(el)
}
export {
	charReg,
	checkCapital,
	checkLower,
	checkAllLower,
	checkNumber,
	checkAllNumber,
	includesString,
	everyObject
}