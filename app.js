
$(document).ready(function(){

    let drinks=[];
    let price=0;
    
    function addDrink(drinks,drink){
        let uslov=0;
        
        for(let i=0;i<drinks.length;i++){
            if(drinks[i].name==drink.name){
                drinks[i].quantity+=1;
                let value=parseInt(parseInt($(".js-remove-drink").val())+1);
                $(".js-remove-drink").val(value);
                $(".js-input").val(value);
                uslov++;
            }
        }
        if(!uslov){
            drinks.push(drink);
            let drinkHTML=`
            <div class="order-list-element">
                        <li class='list-group-item '>`+ drink.name+`</li>
                        <button type="button" class="btn js-decrement" data-drink-id="${drink.id}">-</button>
                        <button type="button" class="btn js-increment" data-drink-id="${drink.id}">+ </button>
                        <input id="${drink.name}" style="text-align:center" type="text" name="qty" class="js-input" value="${drink.quantity}" maxlength="12"/>

                        <button type="button" class="btn js-remove-drink" data-drink-id="`+ drink.id + `" data-drink-price = "` + drink.price + `" value="${drink.quantity}"">X</button>
                        </div></br>`;

            $("#orderContent").append(drinkHTML);
        }
    }

    

    

    $("#firstTable").on("click",".js-add",function(){
        let drink={};
        drink.id=parseInt($(this).attr("data-item-id"));
        drink.name=$(this).attr("name");
        drink.price=parseFloat($(this).val());
        drink.quantity=1;
        addDrink(drinks,drink);
        price+=drink.price;
        $("#price").text("Price: $"+(price));
    });

    $("#orderContent").on("click",".js-remove-drink",function(){
        console.log(drinks);
        let button = $(this);
        let id = button.attr("data-drink-id");
        let qty=button.val();
        for(let i=0;i<qty;i++){
            price-=parseFloat($(this).attr("data-drink-price"));
                if(price<0)
                    price=0;
        }
        drinks.pop(id);
        $("#price").text("Price: $"+(price));
        $(this).closest("div").remove();
        console.log(drinks);       
    });   


    $("#orderContent").on("click",".js-increment",function(){
        let id=$(this).attr("data-drink-id");
        for(let i=0;i<drinks.length;i++){
            if(drinks[i].id==id){
                drinks[i].quantity+=1;
                price+=drinks[i].price;
                $("#"+drinks[i].name).val(drinks[i].quantity);
                $(".js-remove-drink").val(drinks[i].quantity);

            }
        }
        $("#price").text("Price: $"+(price));
    });   

    $("#orderContent").on("click",".js-decrement",function(){
        let id=$(this).attr("data-drink-id");
        for(let i=0;i<drinks.length;i++){
            if(drinks[i].id==id){
                if(drinks[i].quantity==1){
                    toastr.error("Click X in order to remove drink");
                }else{
                    drinks[i].quantity-=1;
                    if(price<0){
                        price=0;
                    }
                    price-=drinks[i].price;
                    $("#"+drinks[i].name).val(drinks[i].quantity);
                    $(".js-remove-drink").val(drinks[i].quantity);
                }
            }
        }
        $("#price").text("Price: $"+(price));
    });  



    $("#save").on("click",function(){
        if(drinks.length==0){
            toastr.error("You didnt ordered anything!");
        }else{
            console.log(drinks);
            toastr.success("Data ready for ajax POST!");
            setTimeout(function(){
                location.reload();
            },2000);
            /*
            $.ajax({....})
            */
        }
    });

});

