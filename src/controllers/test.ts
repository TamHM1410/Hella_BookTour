'use strict'


class TourController {
    test =async()=>{
   
        try{
          
        return {
            msg:'success'
        }
    
        }catch(error){
            console.log(error)
        }
    
    }

}
const tourController= new TourController()
export default tourController