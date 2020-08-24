$(document).ready(function(e){

});


$('.ui.form.segment.error').form({
    inline:true,
    on:'blur',
    fields:{
        id:{
            indentifier:'id',
            optional:false,
            rules: [{
                type:'integer',
                prompt: 'Only numeric values allowed'
            }]
        }
        ,
        // fullname:{
        //     indentifier:'fullname',
        //     optional:false,
        //     rules: [{
        //         type:'text',
        //         prompt: 'Only numeric values allowed'
        //     }]
        // },
        // func:{
        //     indentifier:'func',
        //     optional:false,
        //     rules: [{
        //         type:'text',
        //         prompt: 'Only numeric values allowed'
        //     }]
        // },
        boss:{
            indentifier:'boss',
            optional:false,
            rules: [{
                type:'integer',
                prompt: 'Only numeric values allowed'
            }]
        }
    },
        onSuccess: function (event, field){
            $.ajax({
                type:"POST",
                url:"http://localhost:5000/employee/add",
                contentType: 'application/json',
                data:JSON.stringify({
                    field
                }),
                processData: true,
                cache:false,
                timeout: 6000,
                success: function(data){
                    console.log(data)
                    if (data.mensaje){
                        alert('Employee Added!');
                        window.location.reload();
                    }else if(data.error){
                        if(data.errorcode){
                            alert('Already exists and employee with that ID number');
                        }else{
                            alert('Error, try again');
                        }
                        
                    }
                }
            })
        }
    
})

