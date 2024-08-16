var product_id = 0;
$(document).ready(function () {
    GetData();

    $("#btnProduct").click(function () {
        $("#productModal").modal("show");
    })
    $("#btnsub").click(function () {
        NewProduct();
    })

    $("#btnupd").click(function () {
        UpdateProduct();
    })
})

function NewProduct() {
    var Pname = $("#txtpro").val();
    var Prate = $("#prort").val();
    var Ptax = $("#protax").val();
    var Pquantity = $("#proqnty").val();

    var st = { "Product_name": Pname, "Rate": Prate, "Tax": Ptax, "Stock_quantity": Pquantity };

    $.ajax({
        url: '/Product/AddProduct/',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(st),
        success: function (result) {
            alert(result);
            ClearData();
            GetData();
        }
    })
}

function GetData() {
    $.ajax({
        url: '/Product/GetProduct/',
        method: 'get',
        contentType: 'application/json',
        success: function (response) {
            $("#ptable").empty();
            $.each(response, function (i, d) {
                $("#ptable").append("<tr><td>" + (i + 1) + "</td><td>" + d.Product_name + "</td><td>" + d.Rate + "</td><td>" + d.Tax + "</td><td>" + d.Stock_quantity + "</td><td><input type='button' value='View' onclick='View(" + d.Product_id + ")' class='btn btn-info' />&nbsp<input type='button' value='Delete' onclick='Delete(" + d.Product_id +")' class='btn btn-danger' /></td></tr>");
            })
        }
    })
}


function View(pid) {
    $.ajax({
        url: '/Product/GetProductBYId/' + pid,
        method: 'get',
        contentType: 'application/json',
        success: function (response) {
            product_id = pid;
            $("#txtpro").val(response.Product_name);
            $("#prort").val(response.Rate);
            $("#protax").val(response.Tax);
            $("#proqnty").val(response.Stock_quantity);

            $("#btnsub").hide();
            $("#btnupd").show();
        }
    })
}

function UpdateProduct() {
    var Pname = $("#txtpro").val();
    var Prate = $("#prort").val();
    var Ptax = $("#protax").val();
    var Pquantity = $("#proqnty").val();

    var st = { "Product_id": product_id, "Product_name": Pname, "Rate": Prate, "Tax": Ptax, "Stock_quantity": Pquantity };

    $.ajax({
        url: '/Product/UpdateProduct/',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(st),
        success: function (result) {
            alert(result);
            ClearData();
            GetData();
        }
    })
}

function Delete(pid) {
    $.ajax({
        url: '/Product/DeleteProduct/' + pid,
        method: 'post',
        contentType: 'application/json',
        success: function (response) {
            alert(response);
            GetData();
        }
    })
}


function ClearData() {
    $("#txtpro").val("");
    $("#prort").val("");
    $("#protax").val("");
    $("#proqnty").val("");

    $("#btnsub").show();
    $("#btnupd").hide();
}