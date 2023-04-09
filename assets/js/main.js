$(document).ready(function(){
    function view_data() {
        $.ajax({
            url: 'https://api.spacexdata.com/v3/capsules/past',
            type: 'GET',
            success: function (response) {
                console.log(response);
                let data = response;
                let str = "";
                data.map(data_item => {
                    str += `
                    <div id="item_${data_item.capsule_serial}">
                        <p><label>Serial:</label>${data_item.capsule_serial}</p>
                        <p><label>status:</label>${data_item.status}</p>
                        <button id="button_${data_item.capsule_serial}" data-id="${data_item.capsule_serial}">view Info</button>
                    </div>
                `
                    $("#box").append(str);
                })
                $("#box").css({ "display": "flex", "flex-wrap": "wrap" });
                $("div[id^=item_]").css({
                    "border-radius": "29px", "width": "25%", "height":
                        "128px", "background": "#f0f8ff54", "text-align": "center"
                });
                $("div[id^=item_]").css({
                    "margin": "1% auto", "padding": "1%",
                    "font-family": "cursive", "font-size": "23px", "line-height": "0.6"
                })
            },
            error: function (error) {
                console.log("error", error);
            }
        })
    }
    $("#btn").click(function () {
        view_data();
    })
    $(document).on("click", "button[id^=button_]", function () {
        // $("button[data-id^=C]").click
        let button_id = $(this).attr("data-id");
        let api_url = 'https://api.spacexdata.com/v3/capsules/' + button_id;
        $.ajax({
            url: api_url,
            type: 'GET',
            success: function (response_card) {
                console.log("Res", response_card);
                let str = "";
                let obj = response_card.missions;
                console.log(obj);
                console.log("data", obj[0].name);

                str += `
                <div id="card_${response_card.capsule_serial}">
                <p> User_Id: ${response_card.capsule_id}</p>
                <p> User_Details: ${response_card.details}</p>
                <p> name: ${obj[0].name}</p>
                <p> flight: ${obj[0].flight}</p>
                <button id="back" data-id="${response_card.capsule_serial}">back</button>
                </div>
                `
                $("#box").html(str);
                $("#btn").hide();
                $("div[id^=card_]").css({"padding":"2%", "border-radius": "28px", "margin": "10% auto","background": "#f0f8ff54","font-family": "cursive", "font-size": "23px", "line-height": "0.6" });
            }
        })
    })
    $(document).on("click", "#back", function () {
        $("div[id^=card_]").hide();
        view_data();
    })
})