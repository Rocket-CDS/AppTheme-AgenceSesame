
function validatePayment() {

    var form = $("#Form");
    form.validate({
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        errorPlacement: function () {
            return false;  // suppresses error message text
        },
        invalidHandler: function (e, validator) {
            $('input').removeClass('w3-pale-red');
            $('input').removeClass('w3-border-red');
            for (var i in validator.errorMap) {
                $('#' + i).addClass('w3-pale-red');
                $('#' + i).addClass('w3-border-red')
            }
        },
        amount: {
            required: true,
            digits: true
        },
    });
    if (!form.valid()) {
        $('.dovalidate').attr('s-stop', 'stop')
    }
}

function updateQty(productid, addvalue) {
    var qty = parseInt($('#qty' + productid).val());
    var newqty = qty + addvalue;
    if (newqty < 1) newqty = 1;
    $('#qty' + productid).val(newqty);
}

function beforebuy() {
    $('.w3-modal').hide();
}
function afterbuy() {
    simplisitypanelecommercetag();
}
function showproductmodel(productid) {
    $('#qty' + productid).val('1');
    document.getElementById('productmodelid' + productid).style.display = 'block'
}

function popupImage(element) {
    document.getElementById("imgPopup").src = $(element).attr("popupsrc");
    document.getElementById("modalimgPopup").style.display = "block";
}

function simplisitypanelecommercetag() {
    $('#ecommerce-tag').activateSimplisityPanel('/Desktopmodules/dnnrocket/api/rocket/action');
}

function firstLoadMove() {
    var toastedfirstload = sessionStorage.getItem("toastedfirstload");
    if (toastedfirstload !== 'false') {
        $('html, body').animate({
            scrollTop: $('.productlist').offset().top
        }, 500, function () {
        });
    }
    sessionStorage.setItem("toastedfirstload", "false");
}
