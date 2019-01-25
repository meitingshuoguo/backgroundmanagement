export default {
    formatDate(date){
        if(!date){
            return ''
        }else{
            let time = new Date()
            return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()
            +' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
        }
    }
}