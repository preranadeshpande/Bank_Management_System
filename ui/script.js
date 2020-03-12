var active_customer = {};
var active_account = "";
var branches = [];

$.ajax({
    url: "http://localhost:3000/user/branches",
    method: "POST",
    data: {
        token: localStorage.getItem("token")
    },
    success: function (result) {
        branches = result;
        branches.forEach(b => {
            $("select[name='select_branch']").append("<option value='" + b.Branch_Id + "'>" + b.Branch_Name + "</option>")
            $("select[name='accountMoreInfo-info-edit-select_branch']").append("<option value='" + b.Branch_Id + "'>" + b.Branch_Name + "</option>")
        })
    },
    error: function (err) {

    }
});



function updateData() {

    $("#customerInfoDetailed-id").html(active_customer.customer.Customer_Id);
    $("#customerInfoDetailed-name").html(active_customer.customer.Customer_Name);
    $("#customerInfoDetailed-address").html(active_customer.customer.Address);
    $("#customerInfoDetailed-phone").html(active_customer.customer.Phone);
    $("#customerInfoDetailed-email").html(active_customer.customer.Email_Id);
    $("#customerInfoDetailed-gender").html(active_customer.customer.Gender);


    $("#editCustomerInfo input[name='customerInfoDetailed-name']").val(active_customer.customer.Customer_Name);
    $("#editCustomerInfo input[name='customerInfoDetailed-address']").val(active_customer.customer.Address);
    $("#editCustomerInfo input[name='customerInfoDetailed-phone']").val(active_customer.customer.Phone);
    $("#editCustomerInfo input[name='customerInfoDetailed-email']").val(active_customer.customer.Email_Id);
    $("#editCustomerInfo select[name='customerInfoDetailed-gender']").val(active_customer.customer.Gender);
    $("#editCustomerInfo select[name='customerInfoDetailed-status']").val(active_customer.customer.Customer_Status);


    if (active_customer.customer.Customer_Status == 1) {
        $("#accountsSpan").show();
        $("#customerInfoDetailed-status").html("Active");
    } else {
        $("#customerInfoDetailed-status").html("Inactive");
    }

    $("#accountListBody").html("");


    let tbody = "";

    active_customer.accounts.forEach(account => {
        tbody += `<tr style='cursor:pointer;' class="account-row" data-account-id="${account.Account_No}">
                            <td>${account.Account_No}</td>
                            <td>${account.Account_Type}</td>
                            <td>${account.Branch_Name}</td>
                            <td>${account.Balance}</td>
                            <td>${account.Interest_Rate}</td>
                            <td>${account.Account_Status ? "Active" : "Inactive"}</td>
                        </tr>`;
    });

    $("#accountListBody").append(tbody);

    setTimeout(() => {


        $(".account-row").click((ev) => {
            $("#accountMoreInfo").show();
            $("#accountList").hide();

            $("#accountMoreInfo-info-edit").hide();
            $("#accountMoreInfo-info").show();

            let account_id = ev.currentTarget.attributes['data-account-id'].nodeValue;
            active_account = account_id;


            loadTransactions();




        });
    }, 500);


    loadTransactions();


}

function loadTransactions() {
    $("#addTransactionBtn").hide();
    let account = {};
    active_customer.accounts.forEach(acc => {
        if (active_account == acc.Account_No) {
            account = acc;
        }
    });


    $("#accountMoreInfo-info").html("");


    $("#accountMoreInfo-info").append(`
        <table class="table table-bordered table-striped">
            <tbody>
                <tr>
                    <td><b>Account No:</b></td>
                    <td>${account.Account_No}</td>
                    <td><b>Account Type:</b></td>
                    <td>${account.Account_Type}</td>
                </tr>
                <tr>
                    <td><b>Branch:</b></td>
                    <td>${account.Branch_Name}</td>
                    <td><b>Status:</b></td>
                    <td>${account.Account_Status ? "Active" : "Inactive"}</td>
                </tr>

                <tr>
                    <td><b>Balance:</b></td>
                    <td>${account.Balance}</td>
                    <td><b>Interest Rate:</b></td>
                    <td>${account.Interest_Rate}</td>
                </tr>
            </tbody>
        </table>
    `);

    $("#accountMoreInfo-info-edit select[name='accountMoreInfo-info-edit-select_branch']").val(account.Branch_Id);
    $("#accountMoreInfo-info-edit select[name='accountMoreInfo-info-edit-account_type']").val(account.Account_Type);
    $("#accountMoreInfo-info-edit select[name='accountMoreInfo-info-edit-status']").val(account.Account_Status);
    $("#accountMoreInfo-info-edit input[name='accountMoreInfo-info-edit-interest']").val(account.Interest_Rate);


    if(account.Account_Status) $("#addTransactionBtn").show();

    $("#accountMoreInfo-transactions").html("");

    let toAppend = "";
    active_customer.transactions.forEach(trans => {
        if (trans.Account_No == active_account) {
            toAppend += `
                <tr>
                    <td>${trans.Transaction_Id}</td>
                    <td>${trans.Transaction_Info}</td>
                    <td>${new Date(trans.Date).toDateString()}</td>
                    <td>${trans.Transaction_Type}</td>
                    <td>${trans.Amount}</td>
                    <td>${trans.Balance}</td>
                </tr>
            `
        }
    });

    $("#accountMoreInfo-transactions").append(toAppend);

}

function loadCustomer(customer_id) {

    $("#accountsSpan").hide();

    $.ajax({
        url: "http://localhost:3000/user/customerDetails",
        method: "POST",
        data: {
            customer_id: customer_id,
            token: localStorage.getItem("token")
        },
        success: function (result) {
            active_customer = result;
            updateData();
        },
        error: function (err) {

        }
    });
}

$("#searchCustomer").click(() => {
    $("#customerListBody").html("");
    $.ajax({
        url: "http://localhost:3000/user/searchUser",
        method: "POST",
        data: {
            param: $("#searchParam").val(),
            token: localStorage.getItem("token")
        },
        success: function (result) {
            if (result.length == 0) {
                $("#customerListBody").html("<tr class='text-center'> <td  colspan=5>No Customers Found </td></tr>")
            } else {
                result.forEach(customer => {
                    $("#customerListBody").append("<tr class='cust' data-customer-id='" + customer.Customer_Id + "'><td>" + customer.Customer_Id + "</td><td>" + customer.Customer_Name + "</td><td>" + customer.Phone + "</td><td>" + customer.Email_Id + "</td><td>" + (customer.Customer_Status ? 'Active' : 'Inactive') + "</td></tr>");
                });
            }

            setTimeout(() => {
                $("#customerListBody .cust").on("click", (ev) => {
                    $("#accountMoreInfo").hide();
                    $("#accountList").show();

                    $("#showHideInfo").html("Hide Info");
                    $("#showHideInfo").addClass("btn-danger").removeClass("btn-success");
                    $("#customerInfoSection").show();

                    $("#accountMoreInfo-info-edit").hide();
                    $("#accountMoreInfo-info").show();

                    let customer_id = ev.currentTarget.attributes['data-customer-id'].nodeValue;
                    $("#customerInfo").modal("show");


                    $("#active_customer_id").data['customer-id'] = customer_id;

                    loadCustomer(customer_id);
                });
            }, 500);
        }
    });
});

$("#login-button").click(() => {

    $.ajax({
        url: "http://localhost:3000/user/login",
        method: "POST",
        data: {
            email: $("#email").val(),
            password: $("#password").val()
        },
        success: function (result) {
            localStorage.setItem("token", result.token);
            $("#login").hide();
            $("#customerPage").show();
        },
        error: function (err) {
            $("#login-error").show();
            setTimeout(() => {
                $("#login-error").hide();
            }, 2000);
        }
    });
});



$("#saveCustomer").click(() => {
    $.ajax({
        url: "http://localhost:3000/user/saveCustomer",
        method: "POST",
        data: {
            name: $("#addCustomer input[name='customer_name']").val(),
            address: $("#addCustomer input[name='customer_address']").val(),
            phone: $("#addCustomer input[name='customer_phone']").val(),
            email: $("#addCustomer input[name='customer_email']").val(),
            gender: $("#addCustomer input[name='customer_gender']").val(),
            token: localStorage.getItem("token")
        },
        success: function (result) {
            $("#addCustomer .modal-header button").click();

            $("#addCustomer input[name='customer_name']").val("");
            $("#addCustomer input[name='customer_address']").val("");
            $("#addCustomer input[name='customer_phone']").val("");
            $("#addCustomer input[name='customer_email']").val("");
            $("#addCustomer input[name='customer_gender']").val("");

        },
        error: function (err) {

        }
    });
});

$("#addAccountBtn").click(() => {
    setTimeout(() => {
        $(".modal-backdrop.fade.show")[1].style.zIndex = 1080;
    }, 200);
});

$("#addTransactionBtn").click(() => {
    setTimeout(() => {
        $(".modal-backdrop.fade.show")[1].style.zIndex = 1080;
    }, 200);
})

$("#saveAccount").click(() => {
    $.ajax({
        url: "http://localhost:3000/user/createAccount",
        method: "POST",
        data: {
            acc_type: $("#addAccount select[name='account_type']").val(),
            interest_rate: $("#addAccount input[name='interest_rate']").val(),
            branch_id: $("#addAccount select[name='select_branch']").val(),
            customer_id: active_customer.customer.Customer_Id,
            token: localStorage.getItem("token")
        },
        success: function (result) {
            $("#addAccount .modal-header button").click();
            $("#addAccount input[name='interest_rate']").val("");
            loadCustomer(active_customer.customer.Customer_Id);

        },
        error: function (err) {

        }
    });
});

$("#saveTransaction").click(() => {

    
    $.ajax({
        url: "http://localhost:3000/user/createTransaction",
        method: "POST",
        data: {
            account_id: active_account,
            amount: $("#addTransactionDialog input[name='transaction_amount']").val(),
            info: $("#addTransactionDialog input[name='transaction_info']").val(),
            type: $("#addTransactionDialog select[name='transaction_type']").val(),
            token: localStorage.getItem("token")
        },
        success: function (result) {
            $("#addTransactionDialog .modal-header button").click();

            $("#addTransactionDialog input[name='transaction_amount']").val(""),
            $("#addTransactionDialog input[name='transaction_info']").val(""),

            loadCustomer(active_customer.customer.Customer_Id);

        },
        error: function (err) {

        }
    });
});



$("#showAccounts").click(() => {
    $("#accountMoreInfo").hide();
    $("#accountList").show();
});


$("#editCustomerButton").click(() => {
    $("#editCustomerInfo").show();
    $("#nonEditCustomerInfo").hide();
});


$("#updateCustomerCancel").click(() => {
    $("#editCustomerInfo").hide();
    $("#nonEditCustomerInfo").show();
});

$("#updateCustomerSave").click(() => {
    $.ajax({
        url: "http://localhost:3000/user/updateCustomer",
        method: "POST",
        data: {
            id: active_customer.customer.Customer_Id,
            name: $("#editCustomerInfo input[name='customerInfoDetailed-name']").val(),
            address: $("#editCustomerInfo input[name='customerInfoDetailed-address']").val(),
            phone: $("#editCustomerInfo input[name='customerInfoDetailed-phone']").val(),
            email: $("#editCustomerInfo input[name='customerInfoDetailed-email']").val(),
            gender: $("#editCustomerInfo select[name='customerInfoDetailed-gender']").val(),
            status: $("#editCustomerInfo select[name='customerInfoDetailed-status']").val(),
            token: localStorage.getItem("token")
        },
        success: function (result) {

            $("#searchCustomer").click();
            loadCustomer(active_customer.customer.Customer_Id);
        },
        error: function (err) {

        }
    });

    $("#editCustomerInfo").hide();
    $("#nonEditCustomerInfo").show();
});


$("#showHideInfo").click(() => {
    if ($("#showHideInfo").html() == "Hide Info") {
        $("#customerInfoSection").hide();
        $("#showHideInfo").html("Show Info");
        $("#showHideInfo").addClass("btn-success").removeClass("btn-danger");
    } else {
        $("#customerInfoSection").show();
        $("#showHideInfo").html("Hide Info");
        $("#showHideInfo").addClass("btn-danger").removeClass("btn-success");
    }
})

$("#editAccountInfo").click(()=> {
    $("#accountMoreInfo-info").hide();

    $("#accountMoreInfo-info-edit").show();

});


$("#updateAccountCancel").click(() => {
    $("#accountMoreInfo-info").show();

    $("#accountMoreInfo-info-edit").hide();
});



$("#updateAccountSave").click(() => {
    $.ajax({
        url: "http://localhost:3000/user/updateAccount",
        method: "POST",
        data: {
            id: active_account,
            branch_id: $("#accountMoreInfo-info-edit select[name='accountMoreInfo-info-edit-select_branch']").val(),
            acc_type: $("#accountMoreInfo-info-edit select[name='accountMoreInfo-info-edit-account_type']").val(),
            status: $("#accountMoreInfo-info-edit select[name='accountMoreInfo-info-edit-status']").val(),
            interest: $("#accountMoreInfo-info-edit input[name='accountMoreInfo-info-edit-interest']").val(),
            token: localStorage.getItem("token")
        },
        success: function (result) {

            $("#searchCustomer").click();
            loadCustomer(active_customer.customer.Customer_Id);
        },
        error: function (err) {

        }
    });

    $("#accountMoreInfo-info").show();
    $("#accountMoreInfo-info-edit").hide();
});