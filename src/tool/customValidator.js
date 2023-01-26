import { 
  checkLower, 
  checkNumber, 
  checkCapital, 
  checkAllNumber, 
  checkAllLower,
  charReg,
  includesString,
  everyObject
} from '../tool/util.js'

  let customValidator = (options) => {
    let { input, typeform, value, methods, needs } = options
    let { setComplete,setNim,setPassword,setUsername,setNamaLengkap } = methods

  	if(typeform === "password"){

  		let modifiedState = {
  			capitalcase:false,
  			minimum:false,
  			lowercase:false,
  			number:false,
  			spesialchar:false,
  		}

  		//check one by one
  		checkCapital(value) ? modifiedState.capitalcase=true : modifiedState.capitalcase=false;
  		checkLower(value) ? modifiedState.lowercase=true : modifiedState.lowercase=false;
  		value.length >= 8 ? modifiedState.minimum=true : modifiedState.minimum=false;
  		checkNumber(value) ? modifiedState.number=true : modifiedState.number=false;
  		charReg.test(value) ? modifiedState.spesialchar=true : modifiedState.spesialchar=false;

		  setComplete({...needs, password:{...modifiedState}})

      if(everyObject(modifiedState, bool=>bool)){
        setPassword(value)
      }else{
        setPassword(null)
      }

  	}else if(typeform === "username"){
      
      let usernameReg = /^[a-z]+$/i;
      let modifiedState = {
        lowercase:false,
      }

      checkAllLower(value) && usernameReg.test(value)? modifiedState.lowercase=true : modifiedState.lowercase=false;
      setComplete({...needs, username:{...modifiedState}})

      if(everyObject(modifiedState, bool=>bool)){
        setUsername(value)
      }else{
        setUsername(null)
      }
    }else if(typeform === "namaLengkap"){

      let modifiedState = {
        letter:false,
        minimum:false
      }

      value.length > 3 && value.length <= 30 ? modifiedState.minimum = true : modifiedState.minimum = false;
      if(checkAllNumber(value)){
        modifiedState.letter = false
      }else{
        let regex = /\w/g
        if(regex.test(value)){
          modifiedState.letter = true
        }
      }
      setComplete({...needs, namaLengkap:{...modifiedState}})

      if(everyObject(modifiedState, bool=>bool)){
        setNamaLengkap(value)
      }else{
        setNamaLengkap(null)
      }

    }else if(typeform === "nim"){
      
      let modifiedState = {
        minimum:false,
        number:false,
      }

      String(value).length <= 10 ? modifiedState.minimum=true : modifiedState.minimum=false;
      checkAllNumber(value) ? modifiedState.number=true : modifiedState.minimum=false

      setComplete({...needs, nim:{...modifiedState}})

      if(everyObject(modifiedState, bool=>bool)){
        setNim(value)
      }else{
        setNim(null)
      }

    }else{
      return false
    }

  };

export { customValidator }