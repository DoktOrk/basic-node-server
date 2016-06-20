$(function(){
    $.get("/redirectedtotest", appendToList);

    function appendToList (blocks){
        var list = [];
        var content, block;
        for (var i in blocks){
            block = blocks[i];
            var normalizedNameInAppender = block[0].toUpperCase() + block.slice(1).toLowerCase();
            content = '<a href="/redirectedtotest/'+normalizedNameInAppender+'">'+normalizedNameInAppender+'</a> ' + 
            '<a href="#" data-block="'+normalizedNameInAppender+'"><img src="delete.png"></a>';
            list.push($("<li>", {html: content}));
        }
        $(".menu-list").append(list);
    }

    $("form").on("submit", function(event){
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();
        console.log(blockData);

        $.ajax({type: "POST", url: "/redirectedtotest", data: blockData}).done(function(blockName){
            var normalizedNameInAjax = blockName[0].toUpperCase() + blockName.slice(1).toLowerCase();
            appendToList([normalizedNameInAjax]);
            form.trigger("reset");
        });
    });

    $('.menu-list').on('click', 'a[data-block]', function(event){
        if(!confirm("Are you sure?")){
            return false;
        }
        var target = $(event.currentTarget);
        $.ajax({type: "DELETE", url: "/redirectedtotest/" + target.data('block')}).done(function(){
            target.parents('li').remove();
        });
    });
});