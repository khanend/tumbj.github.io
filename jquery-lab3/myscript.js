$(document).ready(function () {
    $('#adv-search').hide();
    
    var advProvince = null;
    $('#submit-btn').click(function () {
        $("tbody").html("");
        $("#result").text("");
        $('#adv-search').hide();
        console.log("first");

        $.getJSON("data.json", function (data) {
            var input;
            if(advProvince == null){
                input = $("#input-text").val();
            }else{
                 input = $("#input-text").val()+" && "+advProvince;
                 
            }
            console.log(input);
            var regex = new RegExp(input, 'i');
            var output;
            $.each(data, function (key, val) {
                if ((val.nameTH.search(regex) != -1) || (val.nameENG.search(regex) != -1) ||
                    (val.province.search(regex) != -1) || (val.height.search(regex) != -1)) {
                    // if((val.name.search(regex)!= -1) || (val.age.search(regex)!= -1)){
                    output += "<tr>";
                    output += "<td id='" + key + "'>" + val.nameTH + "</td>";
                    output += "<td id='" + key + "'>" + val.nameENG + "</td>";
                    output += "<td id='" + key + "'>" + val.province + "</td>";
                    output += "<td id='" + key + "'>" + val.height + "</td>";
                    output += "</tr>";
                    // $("#result").text("");   
                }
                // $("#ans-provinces").text(null);
            });
            if (output == null) {
                $("#result").text("Search not founded.");
            }
            $("#result").val("");
            $("#input-text").val("");
            $("tbody").html(output);
            $("#ans-provinces").text(null);
        });
        console.log("last");
    });

    $("#adv-btn").click(function () {
        $('#adv-search').show(500);
        console.log("adv");
    });

    $("#ans-provinces").change(function(){
        advProvince = ( $("#ans-provinces :selected").val());
    })

    $.ajax({
        url: "data.json",
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        var out;
        response.forEach(element => {

            out += "<tr>";
            out += "<td>" + element.nameTH + "</td>";
            out += "<td>" + element.nameENG + "</td>";
            out += "<td>" + element.province + "</td>";
            out += "<td>" + element.height + "</td>";
            out += "</tr>";

        })
        $("tbody").html(out);
        $("#result").text("");
       


   


    });
});