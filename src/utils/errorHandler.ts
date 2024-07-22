export const errorHandle=(err:any)=>{
    if(err.Code===11000){
        return 'Email is already registered'
    }
    else if(err.name==='CastError'){
        return 'Invalid ID'
    }
    else if (err.name==='ValidationError'){
        return 'Validation Error'
    }else{
        return err.message
    }
}