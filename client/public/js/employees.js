$(document).ready(function(e){
buildDataTable('tableEmployees');
// function buildDataTable(id_table){
//     $('#'+id_table).DataTable({
//         responsive:true,
//         paging:true,
//         ordering:true,
//         pageLength:10,
//         bLengthChange:false,
//         language:{
//             sProcessing: 'Processing'
//         }
//     })
// }
$('#tableEmployees').DataTable({
    columnDefs: [{
        targets: [0],
        orderData: [0, 1]
    }, {
        targets: [1],
        orderData: [1, 0]
    }, {
        targets: [4],
        orderData: [4, 0]
    }]
});
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
                url:"http://localhost:3000/employee/add",
                contentType: 'application/json',
                data:JSON.stringify({
                    field
                }),
                processData: true,
                cache:false,
                timeout: 6000,
                success: function(data){
                    if (data.mensaje){
                        alert('Ingresado');
                        window.location.reload();
                    }else{
                        alert('Error');
                    }
                }
            })
        }
    
})

